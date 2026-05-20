import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const adminCheckCurrentUser = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const db = supabaseAdmin as any;
    const { data, error } = await db
      .from("user_roles")
      .select("id, role")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .maybeSingle();

    if (error) {
      console.error("[adminCheckCurrentUser] role check failed", error);
      return { ok: false as const, isAdmin: false, error: "role_check_failed" };
    }

    return { ok: true as const, isAdmin: Boolean(data) };
  });
