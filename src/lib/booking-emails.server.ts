// Email dispatcher for bookings. Uses Lovable Emails infrastructure once
// the email domain has been provisioned (see Cloud → Emails). Until then,
// this safely no-ops and just logs the attempt — the booking itself is
// already saved to the database.

interface BookingEmailPayload {
  bookingId: string;
  packageName: string;
  slotAtISO: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  notes: string | null;
  priceLabel: string;
}

const ADMIN_EMAIL = process.env.BOOKING_ADMIN_EMAIL ?? "guillermo@g-structure.co";

function formatSlot(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-EC", {
      timeZone: "America/Guayaquil",
      dateStyle: "full",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

async function tryEnqueue(
  template: string,
  recipient: string,
  templateData: Record<string, unknown>,
  idempotencyKey: string,
): Promise<void> {
  // Try to use the Lovable Emails queue if available. The send pipeline is
  // set up by `setup_email_infra` + `scaffold_transactional_email`. If the
  // RPC isn't there yet, swallow the error so bookings still succeed.
  try {
    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } },
    );
    const { error } = await supabase.rpc("enqueue_email", {
      template_name: template,
      recipient_email: recipient,
      template_data: templateData,
      idempotency_key: idempotencyKey,
    });
    if (error) {
      console.warn(`[booking-email] enqueue skipped (${template}):`, error.message);
    }
  } catch (e) {
    console.warn("[booking-email] enqueue unavailable", (e as Error).message);
  }
}

export async function sendBookingEmails(p: BookingEmailPayload): Promise<void> {
  const slotLabel = formatSlot(p.slotAtISO);
  const baseData = {
    name: p.name,
    email: p.email,
    phone: p.phone ?? "",
    country: p.country ?? "",
    notes: p.notes ?? "",
    packageName: p.packageName,
    priceLabel: p.priceLabel,
    slotLabel,
    slotISO: p.slotAtISO,
    bookingId: p.bookingId,
  };

  console.log("[booking-email] dispatching for booking", p.bookingId, "→", p.email);

  await Promise.all([
    tryEnqueue("booking-confirmation", p.email, baseData, `booking-confirm-${p.bookingId}`),
    tryEnqueue("booking-admin-notification", ADMIN_EMAIL, baseData, `booking-admin-${p.bookingId}`),
  ]);
}
