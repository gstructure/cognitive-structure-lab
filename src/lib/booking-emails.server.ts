// Server-side email dispatcher for bookings.
// Renders React Email templates and enqueues directly into the Lovable Emails
// queue (transactional_emails) using the service role.
import * as React from "react";
import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { TEMPLATES } from "./email-templates/registry";
import { BANK, CONTACT, depositLabel } from "./booking-bank";

const SITE_NAME = "g-structure";
const SENDER_DOMAIN = "notify.g-structure.co";
const FROM_DOMAIN = "g-structure.co";
const ADMIN_EMAIL = process.env.BOOKING_ADMIN_EMAIL ?? "guillermo@g-structure.co";

interface BookingPayload {
  bookingId: string;
  packageName: string;
  slotAtISO: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  notes: string | null;
  priceLabel: string;
  priceUsd: number | null;
}

function formatSlot(iso: string): string {
  try {
    return new Intl.DateTimeFormat("es-EC", {
      timeZone: "America/Guayaquil", dateStyle: "full", timeStyle: "short",
    }).format(new Date(iso));
  } catch { return iso; }
}

function generateToken(): string {
  const bytes = new Uint8Array(32);
  crypto.getRandomValues(bytes);
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function getOrCreateUnsubscribeToken(supabase: any, email: string): Promise<string | null> {
  const normalized = email.toLowerCase();
  const { data: existing } = await supabase
    .from("email_unsubscribe_tokens").select("token, used_at").eq("email", normalized).maybeSingle();
  if (existing && !existing.used_at) return existing.token;
  if (existing && existing.used_at) return null;
  const token = generateToken();
  await supabase.from("email_unsubscribe_tokens")
    .upsert({ token, email: normalized }, { onConflict: "email", ignoreDuplicates: true });
  const { data: stored } = await supabase
    .from("email_unsubscribe_tokens").select("token").eq("email", normalized).maybeSingle();
  return stored?.token ?? token;
}

async function enqueueOne(
  supabase: any,
  templateName: string,
  recipient: string,
  templateData: Record<string, any>,
  idempotencyKey: string,
): Promise<void> {
  const tpl = TEMPLATES[templateName];
  if (!tpl) { console.error("[booking-email] template not found", templateName); return; }
  const effectiveRecipient = tpl.to || recipient;
  if (!effectiveRecipient) return;

  const { data: suppressed } = await supabase
    .from("suppressed_emails").select("id").eq("email", effectiveRecipient.toLowerCase()).maybeSingle();
  if (suppressed) return;

  const messageId = crypto.randomUUID();
  const unsubscribeToken = await getOrCreateUnsubscribeToken(supabase, effectiveRecipient);
  if (!unsubscribeToken) return;

  const element = React.createElement(tpl.component, templateData);
  const html = await render(element);
  const text = await render(element, { plainText: true });
  const subject = typeof tpl.subject === "function" ? tpl.subject(templateData) : tpl.subject;

  await supabase.from("email_send_log").insert({
    message_id: messageId, template_name: templateName,
    recipient_email: effectiveRecipient, status: "pending",
  });

  const { error } = await supabase.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload: {
      message_id: messageId,
      to: effectiveRecipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject, html, text,
      purpose: "transactional",
      label: templateName,
      idempotency_key: idempotencyKey,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  });

  if (error) {
    console.error("[booking-email] enqueue failed", templateName, error.message);
    await supabase.from("email_send_log").insert({
      message_id: messageId, template_name: templateName,
      recipient_email: effectiveRecipient, status: "failed",
      error_message: error.message.slice(0, 1000),
    });
  }
}

function getSupabase(): any | null {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.warn("[booking-email] missing supabase env vars; skipping send");
    return null;
  }
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

/** Sent on initial booking creation: client gets payment instructions, admin gets a heads-up. */
export async function sendBookingRequestEmails(p: BookingPayload): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  const slotLabel = formatSlot(p.slotAtISO);

  const clientData = {
    name: p.name,
    packageName: p.packageName,
    slotLabel,
    priceLabel: p.priceLabel,
    depositLabel: depositLabel(p.priceUsd),
    bank: BANK,
    contact: CONTACT,
  };
  const adminData = {
    name: p.name, email: p.email, phone: p.phone ?? "", country: p.country ?? "",
    notes: p.notes ?? "", packageName: p.packageName, slotLabel,
    priceLabel: p.priceLabel, bookingId: p.bookingId,
  };

  await Promise.all([
    enqueueOne(supabase, "booking-request-received", p.email, clientData, `booking-request-${p.bookingId}`),
    enqueueOne(supabase, "booking-admin-notification", ADMIN_EMAIL, adminData, `booking-admin-${p.bookingId}`),
  ]);
}

/** Sent when admin manually confirms the booking. */
export async function sendBookingConfirmedEmail(p: BookingPayload): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await enqueueOne(supabase, "booking-confirmed", p.email, {
    name: p.name, packageName: p.packageName,
    slotLabel: formatSlot(p.slotAtISO), contact: CONTACT,
  }, `booking-confirmed-${p.bookingId}`);
}

/** Sent when admin cancels the booking. */
export async function sendBookingCancelledEmail(p: BookingPayload): Promise<void> {
  const supabase = getSupabase();
  if (!supabase) return;
  await enqueueOne(supabase, "booking-cancelled", p.email, {
    name: p.name, packageName: p.packageName,
    slotLabel: formatSlot(p.slotAtISO), contact: CONTACT,
  }, `booking-cancelled-${p.bookingId}`);
}
