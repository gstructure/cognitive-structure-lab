import { createFileRoute, Outlet } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { adminCheckCurrentUser } from "@/lib/admin-auth.functions";

export const Route = createFileRoute("/_admin")({
  component: AdminLayout,
});

type State = "loading" | "unauthed" | "forbidden" | "ok";

function AdminLayout() {
  const [state, setState] = useState<State>("loading");
  const checkAdmin = useServerFn(adminCheckCurrentUser);

  useEffect(() => {
    let cancelled = false;

    const verify = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const session = sessionData.session;
      if (!session) {
        if (!cancelled) setState("unauthed");
        return;
      }

      try {
        const result = await checkAdmin({});
        if (cancelled) return;
        setState(result.ok && result.isAdmin ? "ok" : "forbidden");
      } catch (error) {
        console.error("[AdminLayout] admin check failed", error);
        if (cancelled) return;
        setState("forbidden");
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
