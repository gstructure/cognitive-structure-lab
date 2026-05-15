import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

type State = "loading" | "unauthed" | "forbidden" | "ok";

function AdminLayout() {
  const [state, setState] = useState<State>("loading");

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        if (!cancelled) setState("unauthed");
        return;
      }
      const { data: roles, error } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (cancelled) return;
      if (error || !roles) {
        setState("forbidden");
      } else {
        setState("ok");
      }
    };

    verify();
    const { data: sub } = supabase.auth.onAuthStateChange(() => {
      setState("loading");
      verify();
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">
        Verificando acceso…
      </div>
    );
  }
  if (state === "unauthed") {
    if (typeof window !== "undefined") window.location.href = "/login";
    return null;
  }
  if (state === "forbidden") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-3 p-8 text-center">
        <h1 className="text-xl font-semibold">Acceso restringido</h1>
        <p className="text-sm text-muted-foreground max-w-md">
          Tu cuenta no tiene permisos de administrador. Si crees que esto es un error, contacta al equipo.
        </p>
        <button
          onClick={() => supabase.auth.signOut().then(() => (window.location.href = "/login"))}
          className="text-sm underline text-muted-foreground hover:text-foreground"
        >
          Cerrar sesión
        </button>
      </div>
    );
  }
  return <Outlet />;
}
