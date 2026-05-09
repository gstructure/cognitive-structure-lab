import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  component: LoginPage,
  head: () => ({
    meta: [{ title: "Acceso admin | G-Structure" }, { name: "robots", content: "noindex,nofollow" }],
  }),
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true); setError(null);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setBusy(false);
    if (error) setError(error.message);
    else navigate({ to: "/admin/reservas" });
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 py-16 bg-background">
      <div className="w-full max-w-sm">
        <h1 className="font-display text-2xl mb-1">Acceso administrador</h1>
        <p className="text-sm text-muted-foreground mb-8">Panel de reservas G-Structure.</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required value={email}
              onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          </div>
          <div>
            <Label htmlFor="pwd">Contraseña</Label>
            <Input id="pwd" type="password" required value={password}
              onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
          </div>
          {error && (
            <p className="text-sm text-destructive border border-destructive/30 bg-destructive/5 p-2">{error}</p>
          )}
          <button type="submit" disabled={busy}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-medium bg-foreground text-background hover:opacity-90 disabled:opacity-50">
            {busy ? <><Loader2 size={14} className="animate-spin" /> Ingresando…</> : "Ingresar"}
          </button>
        </form>
      </div>
    </main>
  );
}
