// Server-side email dispatcher for the public contact form.
// Renders React Email templates and enqueues directly into the Lovable Emails
// queue (transactional_emails) using the service role.
import * as React from "react";
import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { TEMPLATES } from "./email-templates/registry";

const SITE_NAME = "g-structure";
const SENDER_DOMAIN = "notify.g-structure.co";
const FROM_DOMAIN = "g-structure.co";
const ADMIN_EMAIL = process.env.BOOKING_ADMIN_EMAIL ?? "guillermo@g-structure.co";

export interface ContactPayload {
  name: string;
  email: string;
  organization?: string;
  role?: string;
  whatsapp?: string;
  country?: string;
  requestType: string;
  message: string;
  pageOrigin?: string;
  language?: string;
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
): Promise<{ ok: boolean; error?: string }> {
  const tpl = TEMPLATES[templateName];
  if (!tpl) return { ok: false, error: `template_not_found:${templateName}` };
  const effectiveRecipient = tpl.to || recipient;
  if (!effectiveRecipient) return { ok: false, error: "no_recipient" };

  const { data: suppressed } = await supabase
    .from("suppressed_emails").select("id").eq("email", effectiveRecipient.toLowerCase()).maybeSingle();
  if (suppressed) return { ok: true }; // silently skip

  const messageId = crypto.randomUUID();
  const unsubscribeToken = await getOrCreateUnsubscribeToken(supabase, effectiveRecipient);
  if (!unsubscribeToken) return { ok: true };

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
    console.error("[contact-email] enqueue failed", templateName, error.message);
    await supabase.from("email_send_log").insert({
      message_id: messageId, template_name: templateName,
      recipient_email: effectiveRecipient, status: "failed",
      error_message: error.message.slice(0, 1000),
    });
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

function getSupabase(): any | null {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !serviceKey) {
    console.error("[contact-email] missing supabase env vars");
    return null;
  }
  return createClient(supabaseUrl, serviceKey, { auth: { persistSession: false } });
}

function formatNow(): string {
  try {
    return new Intl.DateTimeFormat("es-EC", {
      timeZone: "America/Guayaquil", dateStyle: "full", timeStyle: "short",
    }).format(new Date());
  } catch { return new Date().toISOString(); }
}

export async function sendContactEmails(p: ContactPayload): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "server_misconfigured" };

  const idempotencyBase = crypto.randomUUID();
  const submittedAt = formatNow();

  const adminData = {
    name: p.name,
    email: p.email,
    organization: p.organization || "",
    role: p.role || "",
    whatsapp: p.whatsapp || "",
    country: p.country || "",
    requestType: p.requestType,
    message: p.message,
    pageOrigin: p.pageOrigin || "",
    language: p.language || "",
    submittedAt,
  };
  const userData = {
    name: p.name,
    requestType: p.requestType,
    message: p.message,
  };

  // Admin notification is the critical one — fail the request if it fails.
  const adminRes = await enqueueOne(
    supabase, "contact-admin-notification", ADMIN_EMAIL, adminData,
    `contact-admin-${idempotencyBase}`,
  );
  if (!adminRes.ok) return { ok: false, error: adminRes.error };

  // User confirmation is best-effort.
  await enqueueOne(
    supabase, "contact-user-confirmation", p.email, userData,
    `contact-user-${idempotencyBase}`,
  ).catch((e) => console.error("[contact-email] user confirmation failed", e));

  return { ok: true };
}
