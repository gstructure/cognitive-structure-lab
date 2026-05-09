import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useCallback } from "react";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import {
  adminListBookings, adminUpdateBooking, adminUpdateNotes, adminCheckRole,
} from "@/lib/booking.functions";
import { Loader2, LogOut, RefreshCcw } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_admin/admin/reservas")({
  component: AdminBookings,
  head: () => ({
    meta: [{ title: "Reservas | Admin G-Structure" }, { name: "robots", content: "noindex,nofollow" }],
  }),
});

type Booking = {
  id: string;
  package_name: string;
  package_kind: string;
  slot_at: string;
  status: string;
  name: string;
  email: string;
  phone: string | null;
  country: string | null;
  notes: string | null;
  internal_notes: string | null;
  price_usd: number | null;
  created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
  pending_payment: "Pendiente de pago",
  confirmed: "Confirmada",
  cancelled: "Cancelada",
};

const STATUS_COLORS: Record<string, string> = {
  pending_payment: "bg-amber-100 text-amber-900 border-amber-300",
  confirmed: "bg-emerald-100 text-emerald-900 border-emerald-300",
  cancelled: "bg-zinc-200 text-zinc-700 border-zinc-300",
};

function formatSlot(iso: string) {
  return new Intl.DateTimeFormat("es-EC", {
    timeZone: "America/Guayaquil", dateStyle: "medium", timeStyle: "short",
  }).format(new Date(iso));
}

function AdminBookings() {
  const list = useServerFn(adminListBookings);
  const update = useServerFn(adminUpdateBooking);
  const updateNotes = useServerFn(adminUpdateNotes);
  const checkRole = useServerFn(adminCheckRole);

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    setLoading(true); setError(null);
    try {
      const res = await list({ data: { status: filter } });
      if (res.ok) setBookings(res.bookings as Booking[]);
      else setError(res.error);
    } catch (e: any) {
      setError(e?.message ?? "Error");
    } finally { setLoading(false); }
  }, [filter, list]);

  useEffect(() => {
    checkRole({}).then((r) => setIsAdmin(r.isAdmin)).catch(() => setIsAdmin(false));
  }, [checkRole]);

  useEffect(() => { if (isAdmin) refresh(); }, [isAdmin, refresh]);

  const onLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  const onChangeStatus = async (b: Booking, status: string) => {
    if (status === b.status) return;
    const confirmMsg = status === "confirmed"
      ? `¿Confirmar la reserva de ${b.name}? Se enviará el email de confirmación oficial.`
      : status === "cancelled"
        ? `¿Cancelar la reserva de ${b.name}? Se enviará un email de notificación.`
        : `¿Volver a "Pendiente de pago"?`;
    if (!confirm(confirmMsg)) return;
    const res = await update({ data: { bookingId: b.id, status: status as any } });
    if (!res.ok) { alert(res.error); return; }
    refresh();
  };

  const onSaveNotes = async (b: Booking, notes: string) => {
    const res = await updateNotes({ data: { bookingId: b.id, internal_notes: notes } });
    if (!res.ok) alert(res.error);
  };

  if (isAdmin === null) {
    return <div className="min-h-screen flex items-center justify-center text-sm text-muted-foreground">Verificando…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="font-display text-xl mb-2">Sin permisos de admin</h1>
          <p className="text-sm text-muted-foreground mb-6">Tu cuenta no tiene rol de administrador.</p>
          <button onClick={onLogout} className="text-sm underline">Cerrar sesión</button>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div>
            <h1 className="font-display text-xl">Reservas</h1>
            <p className="text-xs text-muted-foreground">Panel de administración G-Structure</p>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={refresh} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <RefreshCcw size={12} /> Refrescar
            </button>
            <button onClick={onLogout} className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground">
              <LogOut size={12} /> Salir
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          {["all", "pending_payment", "confirmed", "cancelled"].map((s) => (
            <button key={s}
              onClick={() => setFilter(s)}
              className={cn("text-xs px-3 py-1.5 border",
                filter === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground")}
            >
              {s === "all" ? "Todas" : STATUS_LABELS[s]}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-sm text-muted-foreground flex items-center gap-2">
            <Loader2 size={14} className="animate-spin" /> Cargando reservas…
          </p>
        )}
        {error && <p className="text-sm text-destructive">{error}</p>}
        {!loading && bookings.length === 0 && (
          <p className="text-sm text-muted-foreground">No hay reservas en este filtro.</p>
        )}

        <div className="space-y-3">
          {bookings.map((b) => (
            <BookingCard key={b.id} booking={b} onChangeStatus={onChangeStatus} onSaveNotes={onSaveNotes} />
          ))}
        </div>
      </div>
    </main>
  );
}

function BookingCard({
  booking, onChangeStatus, onSaveNotes,
}: {
  booking: Booking;
  onChangeStatus: (b: Booking, s: string) => void;
  onSaveNotes: (b: Booking, n: string) => void;
}) {
  const [notes, setNotes] = useState(booking.internal_notes ?? "");
  const [savingNotes, setSavingNotes] = useState(false);

  return (
    <div className="border border-border bg-card p-5">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-medium">{booking.name}</h3>
            <span className={cn("text-[10px] uppercase tracking-wider px-2 py-0.5 border",
              STATUS_COLORS[booking.status] ?? "bg-muted text-muted-foreground border-border")}>
              {STATUS_LABELS[booking.status] ?? booking.status}
            </span>
          </div>
          <p className="text-xs text-muted-foreground mt-0.5">{booking.email}</p>
          {booking.phone && <p className="text-xs text-muted-foreground">{booking.phone}</p>}
        </div>
        <div className="text-right text-xs">
          <p className="font-medium text-foreground">{formatSlot(booking.slot_at)}</p>
          <p className="text-muted-foreground mt-0.5">{booking.package_name}</p>
          {booking.price_usd && <p className="text-muted-foreground">USD {booking.price_usd}</p>}
        </div>
      </div>

      {booking.notes && (
        <div className="text-xs bg-muted/40 border border-border p-2 mb-3">
          <span className="text-muted-foreground">Notas del cliente:</span> {booking.notes}
        </div>
      )}
      {booking.country && (
        <p className="text-xs text-muted-foreground mb-3">{booking.country}</p>
      )}

      <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border">
        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Cambiar estado</p>
          <div className="flex flex-wrap gap-1.5">
            {(["pending_payment", "confirmed", "cancelled"] as const).map((s) => (
              <button key={s} onClick={() => onChangeStatus(booking, s)}
                disabled={s === booking.status}
                className={cn("text-xs px-2.5 py-1 border",
                  s === booking.status ? "bg-muted text-muted-foreground border-border cursor-default"
                    : "border-border hover:border-foreground")}>
                {STATUS_LABELS[s]}
              </button>
            ))}
          </div>
          {booking.status !== "confirmed" && (
            <p className="text-[11px] text-muted-foreground mt-2">
              "Confirmada" envía el email oficial al cliente.
            </p>
          )}
        </div>

        <div>
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Notas internas</p>
          <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder="Pago recibido por transferencia el ___, comprobante por WhatsApp, factura enviada…"
            className="text-xs" />
          <button onClick={async () => { setSavingNotes(true); await onSaveNotes(booking, notes); setSavingNotes(false); }}
            disabled={savingNotes}
            className="mt-2 text-xs px-3 py-1 border border-border hover:border-foreground">
            {savingNotes ? "Guardando…" : "Guardar notas"}
          </button>
        </div>
      </div>
    </div>
  );
}
