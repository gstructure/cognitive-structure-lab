import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { findPackage, MIN_NOTICE_HOURS } from "./booking-catalog";

// --- List unavailable slots within a date range ---
export const getUnavailableSlots = createServerFn({ method: "POST" })
  .inputValidator((input: { startISO: string; endISO: string }) => {
    return z
      .object({
        startISO: z.string().datetime(),
        endISO: z.string().datetime(),
      })
      .parse(input);
  })
  .handler(async ({ data }) => {
    const [{ data: bookings, error: bErr }, { data: blocked, error: blErr }] = await Promise.all([
      supabaseAdmin
        .from("bookings")
        .select("slot_at")
        .eq("status", "confirmed")
        .gte("slot_at", data.startISO)
        .lt("slot_at", data.endISO),
      supabaseAdmin
        .from("blocked_slots")
        .select("slot_at")
        .gte("slot_at", data.startISO)
        .lt("slot_at", data.endISO),
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

// --- Create a booking ---
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

    // Check availability
    const { data: existing } = await supabaseAdmin
      .from("bookings")
      .select("id")
      .eq("slot_at", data.slotAtISO)
      .maybeSingle();
    if (existing) {
      return { ok: false as const, error: "Ese horario ya fue reservado. Por favor elige otro." };
    }
    const { data: blocked } = await supabaseAdmin
      .from("blocked_slots")
      .select("id")
      .eq("slot_at", data.slotAtISO)
      .maybeSingle();
    if (blocked) {
      return { ok: false as const, error: "Ese horario no está disponible." };
    }

    const { data: booking, error } = await supabaseAdmin
      .from("bookings")
      .insert({
        package_slug: pkg.slug,
        package_name: pkg.name,
        package_kind: pkg.kind,
        price_usd: pkg.priceUsd,
        slot_at: data.slotAtISO,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        notes: data.notes || null,
        status: "confirmed",
      })
      .select("id")
      .single();

    if (error) {
      // Unique violation = race condition
      if ((error as { code?: string }).code === "23505") {
        return { ok: false as const, error: "Ese horario acaba de ser reservado. Elige otro." };
      }
      console.error("createBooking insert error", error);
      return { ok: false as const, error: "No se pudo guardar la reserva. Intenta nuevamente." };
    }

    // Trigger emails (non-blocking; failures logged but don't break the booking)
    try {
      const { sendBookingEmails } = await import("./booking-emails.server");
      await sendBookingEmails({
        bookingId: booking.id,
        packageName: pkg.name,
        slotAtISO: data.slotAtISO,
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        country: data.country || null,
        notes: data.notes || null,
        priceLabel: pkg.priceLabel,
      });
    } catch (e) {
      console.error("sendBookingEmails failed", e);
    }

    return { ok: true as const, bookingId: booking.id };
  });
