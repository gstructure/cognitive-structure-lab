// Email dispatcher for the waitlist confirmation.
import * as React from "react";
import { render } from "@react-email/components";
import { createClient } from "@supabase/supabase-js";
import { TEMPLATES } from "./email-templates/registry";

const SITE_NAME = "G-Struct";
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
