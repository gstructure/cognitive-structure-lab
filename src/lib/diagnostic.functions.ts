import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

async function assertAdmin(userId: string): Promise<boolean> {
  const { data } = await supabaseAdmin
    .from("user_roles").select("id").eq("user_id", userId).eq("role", "admin").maybeSingle();
  return !!data;
}

export const adminListDiagnostics = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    if (!(await assertAdmin(context.userId))) return { ok: false as const, rows: [] };
    const { data } = await supabaseAdmin
      .from("diagnostic_users")
      .select("id, created_at, full_name, email, company, role, responsibility_level, main_reason, diagnostic_results(ife_gs_score, friction_level, dominant_pattern, recommended_program, recommended_duration), admin_followup_recommendations(follow_up_status, sales_priority)")
      .order("created_at", { ascending: false })
      .limit(500);
    return { ok: true as const, rows: data ?? [] };
  });

export const adminGetDiagnostic = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: { id: string }) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context.userId))) return { ok: false as const, error: "no_auth" };
    const [{ data: user }, { data: results }, { data: responses }, { data: followup }] = await Promise.all([
      supabaseAdmin.from("diagnostic_users").select("*").eq("id", data.id).maybeSingle(),
      supabaseAdmin.from("diagnostic_results").select("*").eq("user_id", data.id).maybeSingle(),
      supabaseAdmin.from("diagnostic_responses").select("*").eq("user_id", data.id).maybeSingle(),
      supabaseAdmin.from("admin_followup_recommendations").select("*").eq("user_id", data.id).maybeSingle(),
    ]);
    return { ok: true as const, user, results, responses, followup };
  });

export const adminUpdateDiagnosticFollowup = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({
    id: z.string().uuid(),
    follow_up_status: z.string().max(40),
    admin_notes: z.string().max(4000).optional(),
  }).parse(i))
  .handler(async ({ context, data }) => {
    if (!(await assertAdmin(context.userId))) return { ok: false as const, error: "no_auth" };
    const patch: Record<string, any> = { follow_up_status: data.follow_up_status };
    if (data.admin_notes !== undefined) patch.admin_notes = data.admin_notes;
    const { error } = await supabaseAdmin
      .from("admin_followup_recommendations").update(patch).eq("user_id", data.id);
    if (error) return { ok: false as const, error: error.message };
    return { ok: true as const };
  });

export const adminCheckDiagRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => ({ isAdmin: await assertAdmin(context.userId) }));
