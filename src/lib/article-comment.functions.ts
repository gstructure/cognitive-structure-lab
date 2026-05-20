import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

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

export const adminListArticleComments = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        status: z.enum(["all", "pending", "approved", "rejected"]).optional(),
      })
      .parse(input ?? {}),
  )
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context.userId))) return { ok: false as const, rows: [] };
    const db = supabaseAdmin as any;

    let query = db
      .from("article_comments")
      .select("id, article_slug, author_name, author_email, body, status, created_at, approved_at")
      .order("created_at", { ascending: false })
      .limit(500);

    if (data.status && data.status !== "all") {
      query = query.eq("status", data.status);
    }

    const { data: rows, error } = await query;
    if (error) return { ok: false as const, rows: [], error: error.message };

    return { ok: true as const, rows: rows ?? [] };
  });

export const adminUpdateArticleCommentStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        status: z.enum(["approved", "rejected", "pending"]),
      })
      .parse(input),
  )
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context.userId))) return { ok: false as const, error: "no_auth" };
    const db = supabaseAdmin as any;

    const { error } = await db
      .from("article_comments")
      .update({
        status: data.status,
        approved_at: data.status === "approved" ? new Date().toISOString() : null,
      })
      .eq("id", data.id);

    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });
