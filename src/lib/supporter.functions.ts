import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

async function assertAdmin(userId: string): Promise<boolean> {
  const db = supabaseAdmin as any;
  const { data } = await db
    .from("user_roles")
    .select("id")
    .eq("user_id", userId)
    .eq("role", "admin")
    .maybeSingle();
  return !!data;
}

export const adminListSupporters = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        tier: z.enum(["all", "early", "builder", "founding", "strategic"]).optional(),
        recognition: z.enum(["all", "public", "anonymous"]).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context.userId))) {
      return { ok: false as const, rows: [], error: "no_auth" };
    }

    const db = supabaseAdmin as any;
    let query = db
      .from("support_payments")
      .select(
        "id, support_tier, amount_usd, supporter_name, supporter_email, wants_public_recognition, supporter_message, payment_status, paypal_order_id, paypal_capture_id, paypal_payer_email, captured_at, created_at",
      )
      .order("captured_at", { ascending: false })
      .limit(1000);

    if (data.tier && data.tier !== "all") {
      query = query.eq("support_tier", data.tier);
    }

    if (data.recognition === "public") {
      query = query.eq("wants_public_recognition", true);
    } else if (data.recognition === "anonymous") {
      query = query.eq("wants_public_recognition", false);
    }

    const { data: rows, error } = await query;
    if (error) return { ok: false as const, rows: [], error: error.message };

    return { ok: true as const, rows: rows ?? [] };
  });
