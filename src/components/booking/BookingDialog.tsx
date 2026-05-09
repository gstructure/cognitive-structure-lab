import { useEffect, useMemo, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Calendar as CalendarIcon, Loader2, Check, ArrowLeft } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  type BookablePackage,
  BOOKING_TZ,
  BOOKING_WINDOW_DAYS,
  MIN_NOTICE_HOURS,
  SLOT_HOURS,
} from "@/lib/booking-catalog";
import { createBooking, getUnavailableSlots } from "@/lib/booking.functions";

type Props = {
  pkg: BookablePackage | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type Step = "datetime" | "details" | "success";

// Build the ISO timestamp for a given calendar date + hour in BOOKING_TZ.
// We use the Intl trick: construct a Date as if local, then adjust by the
// timezone offset for that date.
function makeSlotISO(date: Date, hour: number): string {
  // Compose YYYY-MM-DDTHH:00:00 in target TZ → real UTC.
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(hour).padStart(2, "0");
  // Ecuador is UTC-5 year-round (no DST). Hardcode to keep this deterministic.
  return `${y}-${m}-${d}T${h}:00:00-05:00`;
}

function formatHour(h: number): string {
  const ampm = h >= 12 ? "pm" : "am";
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:00 ${ampm}`;
}

export function BookingDialog({ pkg, open, onOpenChange }: Props) {
  const [step, setStep] = useState<Step>("datetime");
  const [date, setDate] = useState<Date | undefined>();
  const [hour, setHour] = useState<number | null>(null);
  const [unavailable, setUnavailable] = useState<Set<string>>(new Set());
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    notes: "",
  });

  const fetchUnavailable = useServerFn(getUnavailableSlots);
  const submitBooking = useServerFn(createBooking);

  // Reset on open/close or package change
  useEffect(() => {
    if (!open) {
      setStep("datetime");
      setDate(undefined);
      setHour(null);
      setError(null);
      setForm({ name: "", email: "", phone: "", country: "", notes: "" });
    }
  }, [open]);

  // Fetch unavailable slots for current month window
  useEffect(() => {
    if (!open) return;
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setDate(end.getDate() + BOOKING_WINDOW_DAYS + 1);
    setLoadingSlots(true);
    fetchUnavailable({ data: { startISO: start.toISOString(), endISO: end.toISOString() } })
      .then((res) => {
        setUnavailable(new Set(res.unavailable));
      })
      .catch(() => setUnavailable(new Set()))
      .finally(() => setLoadingSlots(false));
  }, [open, fetchUnavailable]);

  const minNoticeMs = MIN_NOTICE_HOURS * 3600_000;

  const slotsForDate = useMemo(() => {
    if (!date) return [] as { hour: number; iso: string; disabled: boolean }[];
    const now = Date.now();
    return SLOT_HOURS.map((h) => {
      const iso = makeSlotISO(date, h);
      const ts = new Date(iso).getTime();
      const taken = unavailable.has(iso);
      const tooSoon = ts - now < minNoticeMs;
      return { hour: h, iso, disabled: taken || tooSoon };
    });
  }, [date, unavailable, minNoticeMs]);

  const selectedISO = date && hour !== null ? makeSlotISO(date, hour) : null;

  const slotLabel = selectedISO
    ? new Intl.DateTimeFormat("es-EC", {
        timeZone: BOOKING_TZ,
        dateStyle: "full",
        timeStyle: "short",
      }).format(new Date(selectedISO))
    : "";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date(today);
  maxDate.setDate(maxDate.getDate() + BOOKING_WINDOW_DAYS);

  const handleConfirm = async () => {
    if (!pkg || !selectedISO) return;
    setError(null);
    setSubmitting(true);
    try {
      const res = await submitBooking({
        data: {
          packageSlug: pkg.slug,
          slotAtISO: selectedISO,
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          country: form.country.trim(),
          notes: form.notes.trim(),
        },
      });
      if (res.ok) {
        setStep("success");
      } else {
        setError(res.error);
      }
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Ocurrió un error inesperado. Intenta nuevamente.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const canContinue = !!selectedISO;
  const canSubmit =
    form.name.trim().length >= 2 &&
    /^\S+@\S+\.\S+$/.test(form.email.trim()) &&
    !submitting;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {pkg && (
          <DialogHeader>
            <DialogTitle className="font-display text-2xl">
              Reservar — {pkg.name}
            </DialogTitle>
            <DialogDescription>
              {pkg.sessions} · {pkg.duration} · {pkg.priceLabel}
            </DialogDescription>
          </DialogHeader>
        )}

        {step === "datetime" && (
          <div className="space-y-6">
            <div>
              <p className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                <CalendarIcon size={16} /> 1. Elige una fecha
              </p>
              <div className="border border-border rounded-md inline-block">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(d) => {
                    setDate(d);
                    setHour(null);
                  }}
                  fromDate={today}
                  toDate={maxDate}
                  disabled={(d) => {
                    const day = d.getDay();
                    return day === 0 || day === 6; // weekends off
                  }}
                  className={cn("p-3 pointer-events-auto")}
                />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Horarios en zona horaria de Ecuador (UTC−5). Lunes a viernes.
              </p>
            </div>

            {date && (
              <div>
                <p className="text-sm font-medium text-foreground mb-3">2. Elige un horario</p>
                {loadingSlots ? (
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Loader2 size={14} className="animate-spin" /> Cargando disponibilidad…
                  </p>
                ) : (
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                    {slotsForDate.map((s) => (
                      <button
                        key={s.iso}
                        type="button"
                        disabled={s.disabled}
                        onClick={() => setHour(s.hour)}
                        className={cn(
                          "px-3 py-2 text-sm border transition-colors",
                          s.disabled
                            ? "border-border bg-muted text-muted-foreground line-through cursor-not-allowed"
                            : hour === s.hour
                              ? "border-foreground bg-foreground text-background"
                              : "border-border hover:border-foreground",
                        )}
                      >
                        {formatHour(s.hour)}
                      </button>
                    ))}
                  </div>
                )}
                {slotsForDate.length > 0 && slotsForDate.every((s) => s.disabled) && (
                  <p className="mt-2 text-xs text-muted-foreground">
                    No hay horarios disponibles ese día. Elige otra fecha.
                  </p>
                )}
              </div>
            )}

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                disabled={!canContinue}
                onClick={() => setStep("details")}
                className={cn(
                  "px-5 py-2.5 text-sm font-medium transition-opacity",
                  canContinue
                    ? "bg-foreground text-background hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                )}
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {step === "details" && (
          <div className="space-y-5">
            <button
              type="button"
              onClick={() => setStep("datetime")}
              className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1"
            >
              <ArrowLeft size={12} /> Cambiar fecha/hora
            </button>
            <div className="border border-border bg-muted/40 p-3 text-sm">
              <p className="font-medium">{slotLabel}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Zona horaria: Ecuador (UTC−5)
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <Label htmlFor="b-name">Nombre completo *</Label>
                <Input
                  id="b-name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                  maxLength={120}
                />
              </div>
              <div>
                <Label htmlFor="b-email">Email *</Label>
                <Input
                  id="b-email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                  maxLength={200}
                />
              </div>
              <div>
                <Label htmlFor="b-phone">WhatsApp / Teléfono</Label>
                <Input
                  id="b-phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  maxLength={40}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="b-country">País / Ciudad</Label>
                <Input
                  id="b-country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                  maxLength={80}
                />
              </div>
              <div className="sm:col-span-2">
                <Label htmlFor="b-notes">¿Qué te gustaría trabajar? (opcional)</Label>
                <Textarea
                  id="b-notes"
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  maxLength={1000}
                  rows={3}
                />
              </div>
            </div>

            {error && (
              <p className="text-sm text-destructive border border-destructive/30 bg-destructive/5 p-3">
                {error}
              </p>
            )}

            <div className="text-xs text-muted-foreground space-y-2 border border-border bg-muted/40 p-3">
              <p>
                Las reservas se confirman con el pago del 50% del valor del servicio. Después
                de enviar tu solicitud recibirás las instrucciones para realizar la transferencia
                bancaria y enviar el comprobante.
              </p>
              <p>
                El envío de la solicitud no confirma automáticamente la reserva. La confirmación
                oficial se enviará por correo una vez validado el pago.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                disabled={!canSubmit}
                onClick={handleConfirm}
                className={cn(
                  "inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium transition-opacity",
                  canSubmit
                    ? "bg-foreground text-background hover:opacity-90"
                    : "bg-muted text-muted-foreground cursor-not-allowed",
                )}
              >
                {submitting ? (
                  <>
                    <Loader2 size={14} className="animate-spin" /> Enviando…
                  </>
                ) : (
                  "Solicitar reserva"
                )}
              </button>
            </div>
          </div>
        )}

        {step === "success" && (
          <div className="py-6 text-center">
            <div className="mx-auto w-12 h-12 rounded-full bg-amber-500 text-white flex items-center justify-center">
              <Check size={22} />
            </div>
            <h3 className="mt-5 font-display text-2xl font-semibold">Solicitud recibida</h3>
            <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
              Enviamos las instrucciones de pago a{" "}
              <span className="text-foreground font-medium">{form.email}</span>. Tu reserva queda
              en estado <strong className="text-foreground">pendiente de pago</strong> hasta que
              validemos manualmente la transferencia del anticipo (50%).
            </p>
            <div className="mt-4 text-sm border border-border bg-muted/30 p-3 inline-block text-left">
              <p className="font-medium">{pkg?.name}</p>
              <p className="text-xs text-muted-foreground mt-1">{slotLabel}</p>
            </div>
            <p className="mt-4 text-xs text-muted-foreground max-w-md mx-auto">
              Recibirás un segundo correo con la confirmación oficial una vez validado el pago.
            </p>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="px-5 py-2.5 text-sm bg-foreground text-background hover:opacity-90"
              >
                Cerrar
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
