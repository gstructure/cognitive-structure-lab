import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/gstruct-waitlist-count")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { count, error } = await supabaseAdmin
            .from("gstruct_waitlist")
            .select("*", { count: "exact", head: true });
          if (error) {
            return Response.json({ count: 0 }, { status: 200 });
          }
          return Response.json(
            { count: count ?? 0 },
            {
              status: 200,
              headers: { "Cache-Control": "public, max-age=30" },
            },
          );
        } catch {
          return Response.json({ count: 0 }, { status: 200 });
        }
      },
    },
  },
});
