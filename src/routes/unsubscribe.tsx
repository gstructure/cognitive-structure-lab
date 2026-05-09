import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/unsubscribe")({
  component: UnsubscribePage,
});

type Status = "loading" | "valid" | "already" | "invalid" | "submitting" | "done" | "error";

function UnsubscribePage() {
  const [status, setStatus] = useState<Status>("loading");
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = new URLSearchParams(window.location.search).get("token");
    setToken(t);
    if (!t) {
      setStatus("invalid");
      return;
    }
    fetch(`/email/unsubscribe?token=${encodeURIComponent(t)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.valid) setStatus("valid");
        else if (data.reason === "already_unsubscribed") setStatus("already");
        else setStatus("invalid");
      })
      .catch(() => setStatus("invalid"));
  }, []);

  const confirm = async () => {
    if (!token) return;
    setStatus("submitting");
    try {
      const res = await fetch("/email/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await res.json();
      if (data.success) setStatus("done");
      else if (data.reason === "already_unsubscribed") setStatus("already");
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  };

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md w-full text-center">
        <h1 className="font-display text-3xl">Cancelar suscripción</h1>
        {status === "loading" && (
          <p className="mt-4 text-muted-foreground">Verificando enlace…</p>
        )}
        {status === "valid" && (
          <>
            <p className="mt-4 text-muted-foreground">
              Confirma para no recibir más correos de g-structure.
            </p>
            <button
              onClick={confirm}
              className="mt-6 px-6 py-3 bg-foreground text-background text-sm font-medium hover:opacity-90"
            >
              Confirmar baja
            </button>
          </>
        )}
        {status === "submitting" && (
          <p className="mt-4 text-muted-foreground">Procesando…</p>
        )}
        {status === "done" && (
          <p className="mt-4 text-muted-foreground">
            Listo. Tu correo fue dado de baja.
          </p>
        )}
        {status === "already" && (
          <p className="mt-4 text-muted-foreground">
            Tu correo ya estaba dado de baja.
          </p>
        )}
        {status === "invalid" && (
          <p className="mt-4 text-muted-foreground">
            El enlace no es válido o ha expirado.
          </p>
        )}
        {status === "error" && (
          <p className="mt-4 text-destructive">
            No pudimos procesar tu solicitud. Intenta más tarde.
          </p>
        )}
      </div>
    </main>
  );
}
