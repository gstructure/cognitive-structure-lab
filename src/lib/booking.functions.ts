import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { findPackage, MIN_NOTICE_HOURS } from "./booking-catalog";

// Slots are unavailable when there's a pending_payment OR confirmed booking,
// or an admin-blocked slot.
export const getUnavailableSlots = createServerFn({ method: "POST" })
  .inputValidator((input: { startISO: string; endISO: string }) =>
    z.object({ startISO: z.string().datetime(), endISO: z.string().datetime() }).parse(input))
  .handler(async ({ data }) => {
    const [{ data: bookings, error: bErr }, { data: blocked, error: blErr }] = await Promise.all([
      supabaseAdmin.from("bookings")
        .select("slot_at")
        .in("status", ["pending_payment", "confirmed"])
        .gte("slot_at", data.startISO).lt("slot_at", data.endISO),
      supabaseAdmin.from("blocked_slots")
        .select("slot_at").gte("slot_at", data.startISO).lt("slot_at", data.endISO),
    ]);
    if (bErr || blErr) {
      console.error("getUnavailableSlots error", bErr, blErr);
      return { unavailable: [] as string[] };
    }
    const set = new Set<string>([
      ...(bookings ?? []).map((r) => r.slot_at as string),
      ...(blocked ?? []).map((r) => r.slot_at as string),
    ]);
    return { unavailable: Array.from(set) };
  });

const bookingSchema = z.object({
  packageSlug: z.string().min(1).max(64),
  slotAtISO: z.string().datetime(),
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  notes: z.string().trim().max(1000).optional().or(z.literal("")),
});

export const createBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const pkg = findPackage(data.packageSlug);
    if (!pkg) return { ok: false as const, error: "Paquete no válido." };

    const slotDate = new Date(data.slotAtISO);
    const minDate = new Date(Date.now() + MIN_NOTICE_HOURS * 3600_000);
    if (slotDate < minDate) {
      return { ok: false as const, error: "Debe reservar con al menos 24 horas de anticipación." };
    }

    // Availability: only existing pending/confirmed reservations block.
    const { data: existing } = await supabaseAdmin
      .from("bookings").select("id, status").eq("slot_at", data.slotAtISO)
      .in("status", ["pending_payment", "confirmed"]).maybeSingle();
    if (existing) {
      return { ok: false as const, error: "Ese horario ya está reservado o pendiente. Por favor elige otro." };
    }
    const { data: blocked } = await supabaseAdmin
      .from("blocked_slots").select("id").eq("slot_at", data.slotAtISO).maybeSingle();
    if (blocked) {
      return { ok: false as const, error: "Ese horario no está disponible." };
    }

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        package_slug: pkg.slug, package_name: pkg.name, package_kind: pkg.kind,
        price_usd: pkg.priceUsd, slot_at: data.slotAtISO,
        name: data.name, email: data.email,
        phone: data.phone || null, country: data.country || null, notes: data.notes || null,
        status: "pending_payment",
      })
      .select("id").single();

    if (error) {
      if ((error as { code?: string }).code === "23505") {
        return { ok: false as const, error: "Ese horario acaba de ser solicitado. Elige otro." };
      }
      console.error("createBooking insert error", error);
      return { ok: false as const, error: "No se pudo guardar la solicitud. Intenta nuevamente." };
    }

    try {
      const { sendBookingRequestEmails } = await import("./booking-emails.server");
      await sendBookingRequestEmails({
        bookingId: booking.id, packageName: pkg.name, slotAtISO: data.slotAtISO,
        name: data.name, email: data.email,
        phone: data.phone || null, country: data.country || null, notes: data.notes || null,
        priceLabel: pkg.priceLabel, priceUsd: pkg.priceUsd,
      });
    } catch (e) {
      console.error("sendBookingRequestEmails failed", e);
    }

    return { ok: true as const, bookingId: booking.id, status: "pending_payment" as const };
  });

// ============================================================
// Admin server functions (require authenticated admin)
// ============================================================

async function assertAdmin(userId: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("user_roles").select("id").eq("user_id", userId).eq("role", "admin").maybeSingle();
  return !!data;
}

export const adminListBookings = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { status?: string } | undefined) =>
    z.object({ status: z.string().optional() }).optional().parse(input ?? {}))
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context.userId))) {
      return { ok: false as const, error: "No autorizado.", bookings: [] };
    }
    let q = supabaseAdmin.from("bookings").select("*").order("slot_at", { ascending: true });
    if (data?.status && data.status !== "all") q = q.eq("status", data.status);
    const { data: rows, error } = await q;
    if (error) return { ok: false as const, error: error.message, bookings: [] };
    return { ok: true as const, bookings: rows ?? [] };
  });

const updateSchema = z.object({
  bookingId: z.string().uuid(),
  status: z.enum(["pending_payment", "confirmed", "cancelled"]),
  internal_notes: z.string().max(2000).optional(),
});

export const adminUpdateBooking = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => updateSchema.parse(input))
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context.userId))) {
      return { ok: false as const, error: "No autorizado." };
    }

    const { data: prev, error: pErr } = await supabaseAdmin
      .from("bookings").select("*").eq("id", data.bookingId).maybeSingle();
    if (pErr || !prev) return { ok: false as const, error: "Reserva no encontrada." };

    const patch: Record<string, any> = { status: data.status };
    if (data.internal_notes !== undefined) patch.internal_notes = data.internal_notes;
    if (data.status === "confirmed" && prev.status !== "confirmed") patch.confirmed_at = new Date().toISOString();
    if (data.status === "cancelled" && prev.status !== "cancelled") patch.cancelled_at = new Date().toISOString();

    const { error } = await supabaseAdmin.from("bookings").update(patch).eq("id", data.bookingId);
    if (error) return { ok: false as const, error: error.message };

    // Trigger emails on status transitions.
    if (prev.status !== data.status) {
      try {
        const payload = {
          bookingId: prev.id,
          packageName: prev.package_name,
          slotAtISO: prev.slot_at,
          name: prev.name,
          email: prev.email,
          phone: prev.phone,
          country: prev.country,
          notes: prev.notes,
          priceLabel: prev.price_usd ? `USD ${prev.price_usd}` : "A coordinar",
          priceUsd: prev.price_usd,
        };
        if (data.status === "confirmed") {
          const { sendBookingConfirmedEmail } = await import("./booking-emails.server");
          await sendBookingConfirmedEmail(payload);
        } else if (data.status === "cancelled") {
          const { sendBookingCancelledEmail } = await import("./booking-emails.server");
          await sendBookingCancelledEmail(payload);
        }
      } catch (e) {
        console.error("status-change email failed", e);
      }
    }

    return { ok: true as const };
  });

export const adminUpdateNotes = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z.object({ bookingId: z.string().uuid(), internal_notes: z.string().max(2000) }).parse(input))
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context.userId))) {
      return { ok: false as const, error: "No autorizado." };
    }
    const { error } = await supabaseAdmin
      .from("bookings").update({ internal_notes: data.internal_notes }).eq("id", data.bookingId);
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });

export const adminCheckRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    return { isAdmin: await assertAdmin(context.userId) };
  });
