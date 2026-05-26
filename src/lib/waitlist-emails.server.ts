// Email dispatcher for the waitlist confirmation.
import * as React from "react";
import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { TEMPLATES } from "./email-templates/registry";

const SITE_NAME = "G-Frame";
const SENDER_DOMAIN = "notify.g-structure.co";
const FROM_DOMAIN = "g-structure.co";
const FROM_LOCAL = "hola";

function getSupabase(): any | null {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}

function genToken(): string {
  const b = new Uint8Array(32);
  crypto.getRandomValues(b);
  return Array.from(b).map((x) => x.toString(16).padStart(2, "0")).join("");
}

async function getOrCreateUnsubToken(supabase: any, email: string): Promise<string | null> {
  const norm = email.toLowerCase();
  const { data: existing } = await supabase
    .from("email_unsubscribe_tokens").select("token, used_at").eq("email", norm).maybeSingle();
  if (existing && !existing.used_at) return existing.token;
  if (existing && existing.used_at) return null;
  const token = genToken();
  await supabase.from("email_unsubscribe_tokens")
    .upsert({ token, email: norm }, { onConflict: "email", ignoreDuplicates: true });
  const { data: stored } = await supabase
    .from("email_unsubscribe_tokens").select("token").eq("email", norm).maybeSingle();
  return stored?.token ?? token;
}

export async function sendWaitlistConfirmationEmail(params: {
  recipientEmail: string;
  idempotencyKey: string;
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "server_misconfigured" };

  const tpl = TEMPLATES["waitlist-confirmation"];
  if (!tpl) return { ok: false, error: "template_not_found" };

  const recipient = params.recipientEmail;
  const { data: suppressed } = await supabase
    .from("suppressed_emails").select("id").eq("email", recipient.toLowerCase()).maybeSingle();
  if (suppressed) return { ok: true };

  const messageId = crypto.randomUUID();
  const unsub = await getOrCreateUnsubToken(supabase, recipient);
  if (!unsub) return { ok: true };

  const element = React.createElement(tpl.component, {});
  const html = await render(element);
  const text = await render(element, { plainText: true });
  const subject = typeof tpl.subject === "function" ? tpl.subject({}) : tpl.subject;

  await supabase.from("email_send_log").insert({
    message_id: messageId, template_name: "waitlist-confirmation",
    recipient_email: recipient, status: "pending",
  });

  const { error } = await supabase.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload: {
      message_id: messageId,
      to: recipient,
      from: `${SITE_NAME} <${FROM_LOCAL}@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject, html, text,
      purpose: "transactional",
      label: "waitlist-confirmation",
      idempotency_key: params.idempotencyKey,
      unsubscribe_token: unsub,
      queued_at: new Date().toISOString(),
    },
  });

  if (error) {
    console.error("[waitlist-email] enqueue failed", error.message);
    await supabase.from("email_send_log").insert({
      message_id: messageId, template_name: "waitlist-confirmation",
      recipient_email: recipient, status: "failed",
      error_message: error.message.slice(0, 1000),
    });
    return { ok: false, error: error.message };
  }
  return { ok: true };
}

export async function sendWaitlistAdminNotificationEmail(params: {
  email: string;
  name?: string | null;
  source?: string | null;
  pattern?: string | null;
  idempotencyKey: string;
}): Promise<{ ok: boolean; error?: string }> {
  const supabase = getSupabase();
  if (!supabase) return { ok: false, error: "server_misconfigured" };

  const tpl = TEMPLATES["waitlist-admin-notification"];
  if (!tpl) return { ok: false, error: "template_not_found" };
  const recipient = tpl.to;
  if (!recipient) return { ok: false, error: "no_recipient" };

  // Total count for context.
  let total: number | undefined;
  try {
    const { count } = await supabase
      .from("waitlist").select("id", { count: "exact", head: true });
    if (typeof count === "number") total = count;
  } catch { /* non-fatal */ }

  let submittedAt: string;
  try {
    submittedAt = new Intl.DateTimeFormat("es-EC", {
      timeZone: "America/Guayaquil", dateStyle: "full", timeStyle: "short",
    }).format(new Date());
  } catch { submittedAt = new Date().toISOString(); }

  const data = {
    email: params.email,
    name: params.name ?? undefined,
    source: params.source ?? undefined,
    pattern: params.pattern ?? undefined,
    total,
    submittedAt,
  };

  const messageId = crypto.randomUUID();
  const element = React.createElement(tpl.component, data);
  const html = await render(element);
  const text = await render(element, { plainText: true });
  const subject = typeof tpl.subject === "function" ? tpl.subject(data) : tpl.subject;

  await supabase.from("email_send_log").insert({
    message_id: messageId, template_name: "waitlist-admin-notification",
    recipient_email: recipient, status: "pending",
  });

  const { error } = await supabase.rpc("enqueue_email", {
    queue_name: "transactional_emails",
    payload: {
      message_id: messageId,
      to: recipient,
      from: `${SITE_NAME} <${FROM_LOCAL}@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject, html, text,
      purpose: "transactional",
      label: "waitlist-admin-notification",
      idempotency_key: params.idempotencyKey,
      queued_at: new Date().toISOString(),
    },
  });

  if (error) {
    console.error("[waitlist-admin-email] enqueue failed", error.message);
    await supabase.from("email_send_log").insert({
      message_id: messageId, template_name: "waitlist-admin-notification",
      recipient_email: recipient, status: "failed",
      error_message: error.message.slice(0, 1000),
    });
    return { ok: false, error: error.message };
  }
  return { ok: true };
}