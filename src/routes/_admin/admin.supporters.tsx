import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Download, Loader2, Mail, RefreshCcw } from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { adminListSupporters } from "@/lib/supporter.functions";

export const Route = createFileRoute("/_admin/admin/supporters")({
  component: AdminSupporters,
  head: () => ({
    meta: [
      { title: "Supporters | Admin G-Structure" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
});

type Tier = "all" | "early" | "builder" | "founding" | "strategic";
type Recognition = "all" | "public" | "anonymous";

interface SupporterRow {
  id: string;
  support_tier: "early" | "builder" | "founding" | "strategic";
  amount_usd: number | string;
  supporter_name: string | null;
  supporter_email: string;
  wants_public_recognition: boolean;
  supporter_message: string | null;
  payment_status: "captured" | "refunded" | "disputed";
  paypal_order_id: string;
  paypal_capture_id: string | null;
  paypal_payer_email: string | null;
  captured_at: string;
  created_at: string;
}

const TIER_LABELS: Record<SupporterRow["support_tier"], string> = {
  early: "Early",
  builder: "Builder",
  founding: "Founding",
  strategic: "Strategic",
};

const TIER_FILTERS: Array<{ value: Tier; label: string }> = [
  { value: "all", label: "Todos" },
  { value: "early", label: "Early" },
  { value: "builder", label: "Builder" },
  { value: "founding", label: "Founding" },
  { value: "strategic", label: "Strategic" },
];

const RECOGNITION_FILTERS: Array<{ value: Recognition; label: string }> = [
  { value: "all", label: "Reconocimiento: todos" },
  { value: "public", label: "Públicos" },
  { value: "anonymous", label: "Anónimos" },
];

function AdminSupporters() {
  const list = useServerFn(adminListSupporters);
  const [rows, setRows] = useState<SupporterRow[]>([]);
  const [tier, setTier] = useState<Tier>("all");
  const [recognition, setRecognition] = useState<Recognition>("all");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async (nextTier = tier, nextRecognition = recognition) => {
    setLoading(true);
    setError(null);
    const result = await list({ data: { tier: nextTier, recognition: nextRecognition } });
    if (result.ok) {
      setRows(((result.rows ?? []) as unknown) as SupporterRow[]);
    } else {
      setRows([]);
      setError(result.error ?? "No se pudieron cargar los supporters.");
    }
    setLoading(false);
  };

  useEffect(() => {
    refresh(tier, recognition);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tier, recognition]);

  const filtered = useMemo(() => {
    if (!search.trim()) return rows;
    const needle = search.trim().toLowerCase();
    return rows.filter((row) =>
      [
        row.supporter_name,
        row.supporter_email,
        row.supporter_message,
        row.paypal_capture_id,
        row.paypal_payer_email,
      ].some((value) => String(value ?? "").toLowerCase().includes(needle)),
    );
  }, [rows, search]);

  const totalAmount = rows.reduce((sum, row) => sum + Number(row.amount_usd || 0), 0);
  const capturedCount = rows.filter((row) => row.payment_status === "captured").length;
  const publicCount = rows.filter((row) => row.wants_public_recognition).length;
  const emails = filtered.map((row) => row.supporter_email).filter(Boolean).join(", ");

  const exportCsv = () => {
    const header = [
      "captured_at",
      "support_tier",
      "amount_usd",
      "supporter_name",
      "supporter_email",
      "wants_public_recognition",
      "supporter_message",
      "payment_status",
      "paypal_capture_id",
      "paypal_order_id",
      "paypal_payer_email",
    ];
    const lines = [header.join(",")].concat(
      filtered.map((row) =>
        [
          row.captured_at,
          row.support_tier,
          row.amount_usd,
          row.supporter_name ?? "",
          row.supporter_email,
          row.wants_public_recognition ? "yes" : "no",
          row.supporter_message ?? "",
          row.payment_status,
          row.paypal_capture_id ?? "",
          row.paypal_order_id,
          row.paypal_payer_email ?? "",
        ]
          .map((value) => `"${String(value).replace(/"/g, '""')}"`)
          .join(","),
      ),
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `launch-supporters-${new Date().toISOString().slice(0, 10)}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const copyEmails = async () => {
    if (!emails) return;
    await navigator.clipboard.writeText(emails);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="mx-auto max-w-7xl">
        <header className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Launch Supporters
            </p>
            <h1 className="mt-1 text-2xl font-semibold">Supporters de lanzamiento</h1>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Personas que apoyaron económicamente la validación de G-Frame. Usa esta lista para
              enviar updates privados, reportes de avance y rendición de cuentas.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button type="button" size="sm" variant="outline" onClick={() => refresh()}>
              <RefreshCcw className="mr-1 h-4 w-4" />
              Refrescar
            </Button>
            <Button type="button" size="sm" variant="outline" onClick={copyEmails} disabled={!emails}>
              <Mail className="mr-1 h-4 w-4" />
              Copiar emails
            </Button>
            <Button type="button" size="sm" onClick={exportCsv} disabled={filtered.length === 0}>
              <Download className="mr-1 h-4 w-4" />
              Exportar CSV
            </Button>
          </div>
        </header>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          <Stat label="Supporters capturados" value={String(capturedCount)} />
          <Stat label="Total registrado" value={`$${totalAmount.toFixed(2)}`} />
          <Stat label="Autorizan reconocimiento" value={String(publicCount)} />
        </div>

        <div className="mb-4 grid gap-3 lg:grid-cols-[1fr_auto_auto]">
          <input
            type="search"
            placeholder="Buscar por nombre, email, mensaje o PayPal ID..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-10 w-full border border-border bg-card px-3 text-sm outline-none focus:border-foreground"
          />
          <select
            value={tier}
            onChange={(event) => setTier(event.target.value as Tier)}
            className="h-10 border border-border bg-card px-3 text-sm outline-none focus:border-foreground"
          >
            {TIER_FILTERS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
          <select
            value={recognition}
            onChange={(event) => setRecognition(event.target.value as Recognition)}
            className="h-10 border border-border bg-card px-3 text-sm outline-none focus:border-foreground"
          >
            {RECOGNITION_FILTERS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        {error ? (
          <div className="mb-4 rounded-md border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        ) : null}

        {loading ? (
          <div className="py-12 text-center text-sm text-muted-foreground">
            <Loader2 className="mr-2 inline h-5 w-5 animate-spin" />
            Cargando supporters...
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <Th>Fecha</Th>
                  <Th>Supporter</Th>
                  <Th>Nivel</Th>
                  <Th>Monto</Th>
                  <Th>Reconocimiento</Th>
                  <Th>Mensaje</Th>
                  <Th>Pago</Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((row) => (
                  <tr key={row.id} className="border-t">
                    <Td>{new Date(row.captured_at).toLocaleString("es-EC")}</Td>
                    <Td>
                      <div className="font-medium">{row.supporter_name || "Sin nombre"}</div>
                      <div className="text-xs text-muted-foreground">{row.supporter_email}</div>
                      {row.paypal_payer_email && row.paypal_payer_email !== row.supporter_email ? (
                        <div className="text-xs text-muted-foreground">
                          PayPal: {row.paypal_payer_email}
                        </div>
                      ) : null}
                    </Td>
                    <Td>
                      <span className="inline-flex border border-border bg-background px-2 py-1 text-xs font-medium">
                        {TIER_LABELS[row.support_tier]}
                      </span>
                    </Td>
                    <Td>${Number(row.amount_usd).toFixed(2)}</Td>
                    <Td>{row.wants_public_recognition ? "Sí" : "No / anónimo"}</Td>
                    <Td className="max-w-xs">
                      <p className="whitespace-pre-wrap text-xs leading-relaxed text-muted-foreground">
                        {row.supporter_message || "Sin mensaje"}
                      </p>
                    </Td>
                    <Td>
                      <div className="font-medium">{row.payment_status}</div>
                      <div className="max-w-[220px] truncate text-xs text-muted-foreground">
                        Capture: {row.paypal_capture_id || "-"}
                      </div>
                      <div className="max-w-[220px] truncate text-xs text-muted-foreground">
                        Order: {row.paypal_order_id}
                      </div>
                    </Td>
                  </tr>
                ))}
                {filtered.length === 0 ? (
                  <tr>
                    <td className="px-4 py-8 text-center text-muted-foreground" colSpan={7}>
                      Todavía no hay supporters con estos filtros.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}

        <div className="mt-6 border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
          <h2 className="font-medium text-foreground">Cómo usar esta lista</h2>
          <p className="mt-2">
            Estos correos deben tratarse como una lista privada de rendición de cuentas para
            supporters: avances de G-Frame, uso general de fondos, aprendizajes de validación,
            estado del workshop, preparación del MVP y próximos hitos. No los mezcles con marketing
            general a menos que la persona también se suscriba explícitamente al newsletter.
          </p>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="text-xs text-muted-foreground">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
    </div>
  );
}

function Th({ children }: { children: ReactNode }) {
  return <th className="px-4 py-3 text-xs font-medium uppercase tracking-wide">{children}</th>;
}

function Td({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <td className={`px-4 py-3 align-top ${className}`}>{children}</td>;
}
