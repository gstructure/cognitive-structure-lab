import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { adminListDiagnostics, adminGetDiagnostic, adminUpdateDiagnosticFollowup, adminCheckDiagRole } from "@/lib/diagnostic.functions";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, RefreshCcw } from "lucide-react";

export const Route = createFileRoute("/_admin/admin/diagnosticos")({
  component: AdminDiagnostics,
  head: () => ({ meta: [{ title: "Diagnósticos | Admin G-Structure" }, { name: "robots", content: "noindex,nofollow" }] }),
});

const STATUSES = ["nuevo", "contactado", "agendado", "en_proceso", "cerrado", "no_interesado"];

function AdminDiagnostics() {
  const list = useServerFn(adminListDiagnostics);
  const get = useServerFn(adminGetDiagnostic);
  const update = useServerFn(adminUpdateDiagnosticFollowup);
  const check = useServerFn(adminCheckDiagRole);

  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<any>(null);
  const [filter, setFilter] = useState<string>("");

  useEffect(() => {
    check({}).then((r) => {
      setIsAdmin(r.isAdmin);
      if (r.isAdmin) refresh();
    }).catch(() => setIsAdmin(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = async () => {
    setLoading(true);
    const r = await list({});
    setRows(r.rows || []);
    setLoading(false);
  };

  const openDetail = async (id: string) => {
    setSelected(id);
    setDetail(null);
    const r = await get({ data: { id } });
    if (r.ok) setDetail(r);
  };

  const exportCsv = () => {
    const header = ["created_at", "full_name", "email", "company", "role", "ife_gs", "friction_level", "dominant_pattern", "program", "status"];
    const lines = [header.join(",")].concat(rows.map((r) => {
      const res = r.diagnostic_results?.[0] || {};
      const fu = r.admin_followup_recommendations?.[0] || {};
      return [r.created_at, r.full_name, r.email, r.company, r.role, res.ife_gs_score?.toFixed?.(0) ?? "", res.friction_level ?? "", res.dominant_pattern ?? "", `${res.recommended_program ?? ""} ${res.recommended_duration ?? ""}`, fu.follow_up_status ?? ""]
        .map((v) => `"${String(v ?? "").replace(/"/g, '""')}"`).join(",");
    }));
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `diagnosticos-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
  };

  if (isAdmin === null) return <div className="p-8 text-center text-sm text-muted-foreground">Verificando…</div>;
  if (!isAdmin) return <div className="p-8 text-center"><p>No autorizado.</p></div>;

  const filtered = rows.filter((r) => {
    if (!filter) return true;
    const f = filter.toLowerCase();
    return [r.full_name, r.email, r.company, r.role].some((x) => String(x ?? "").toLowerCase().includes(f));
  });

  const total = rows.length;
  const ifes = rows.map((r) => r.diagnostic_results?.[0]?.ife_gs_score).filter((x) => typeof x === "number");
  const avg = ifes.length ? ifes.reduce((a, b) => a + b, 0) / ifes.length : 0;
  const highCrit = rows.filter((r) => (r.diagnostic_results?.[0]?.ife_gs_score ?? 0) >= 61).length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f8f8f4" }}>
      <header className="border-b bg-white">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold" style={{ color: "#05325a" }}>Diagnósticos de Fricción Ejecutiva</h1>
            <p className="text-xs" style={{ color: "#697783" }}>Panel de administración</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={refresh}><RefreshCcw className="w-4 h-4 mr-1" /> Refrescar</Button>
            <Button variant="outline" size="sm" onClick={exportCsv}>Exportar CSV</Button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-6 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <Stat label="Total diagnósticos" value={String(total)} />
          <Stat label="IFE-GS promedio" value={avg.toFixed(0)} />
          <Stat label="Fricción alta/crítica" value={String(highCrit)} />
          <Stat label="Leads enterprise" value={String(rows.filter((r) => r.main_reason === "Llevar este diagnóstico a mi empresa").length)} />
        </div>

        <input
          type="text" placeholder="Buscar por nombre, email, empresa…"
          value={filter} onChange={(e) => setFilter(e.target.value)}
          className="w-full h-10 px-3 rounded-md border bg-white text-sm"
          style={{ borderColor: "#e5e7eb" }}
        />

        {loading ? (
          <div className="text-center py-12"><Loader2 className="w-5 h-5 animate-spin inline" /></div>
        ) : (
          <div className="bg-white border rounded-md overflow-x-auto" style={{ borderColor: "#e5e7eb" }}>
            <table className="w-full text-sm">
              <thead style={{ backgroundColor: "#f8f8f4", color: "#697783" }}>
                <tr>
                  <Th>Fecha</Th><Th>Nombre</Th><Th>Empresa</Th><Th>Cargo</Th><Th>IFE-GS</Th><Th>Patrón</Th><Th>Programa</Th><Th>Estado</Th><Th></Th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((r) => {
                  const res = r.diagnostic_results?.[0] || {};
                  const fu = r.admin_followup_recommendations?.[0] || {};
                  return (
                    <tr key={r.id} className="border-t" style={{ borderColor: "#e5e7eb" }}>
                      <Td>{new Date(r.created_at).toLocaleDateString("es-EC")}</Td>
                      <Td>{r.full_name}<div className="text-xs" style={{ color: "#697783" }}>{r.email}</div></Td>
                      <Td>{r.company}</Td>
                      <Td>{r.role}</Td>
                      <Td>{res.ife_gs_score?.toFixed?.(0) ?? "—"} <span className="text-xs" style={{ color: "#697783" }}>{res.friction_level}</span></Td>
                      <Td className="text-xs">{res.dominant_pattern ?? "—"}</Td>
                      <Td className="text-xs">{res.recommended_program} {res.recommended_duration}</Td>
                      <Td className="text-xs">{fu.follow_up_status ?? "—"}</Td>
                      <Td><Button size="sm" variant="outline" onClick={() => openDetail(r.id)}>Ver</Button></Td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {selected && (
          <DetailPanel
            id={selected} detail={detail}
            onClose={() => { setSelected(null); setDetail(null); }}
            onUpdated={async (status, notes) => {
              await update({ data: { id: selected, follow_up_status: status, admin_notes: notes } });
              refresh();
              openDetail(selected);
            }}
          />
        )}
      </main>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white border rounded-md p-4" style={{ borderColor: "#e5e7eb" }}>
      <div className="text-xs" style={{ color: "#697783" }}>{label}</div>
      <div className="text-2xl font-bold" style={{ color: "#05325a" }}>{value}</div>
    </div>
  );
}
function Th({ children }: { children: any }) { return <th className="text-left px-3 py-2 font-semibold text-xs uppercase tracking-wide">{children}</th>; }
function Td({ children, className }: { children: any; className?: string }) { return <td className={`px-3 py-2 align-top ${className || ""}`}>{children}</td>; }

function DetailPanel({ id, detail, onClose, onUpdated }: { id: string; detail: any; onClose: () => void; onUpdated: (status: string, notes?: string) => void }) {
  const [status, setStatus] = useState<string>("");
  const [notes, setNotes] = useState<string>("");
  useEffect(() => {
    if (detail?.followup) {
      setStatus(detail.followup.follow_up_status || "nuevo");
      setNotes(detail.followup.admin_notes || "");
    }
  }, [detail]);

  if (!detail) {
    return <div className="bg-white border rounded-md p-6" style={{ borderColor: "#e5e7eb" }}><Loader2 className="w-4 h-4 animate-spin inline" /> Cargando…</div>;
  }
  const u = detail.user; const r = detail.results; const fu = detail.followup;
  const waSummary = `Hola ${u?.full_name?.split(" ")[0]}, gracias por completar el Diagnóstico de Fricción Ejecutiva. Tu patrón dominante es ${r?.dominant_pattern} (IFE-GS ${r?.ife_gs_score?.toFixed?.(0)}). Recomendación: ${r?.recommended_program} ${r?.recommended_duration}.`;

  return (
    <div className="bg-white border rounded-md p-6 space-y-4" style={{ borderColor: "#05325a" }}>
      <div className="flex justify-between items-start">
        <div>
          <h2 className="font-semibold text-lg" style={{ color: "#05325a" }}>{u?.full_name}</h2>
          <p className="text-xs" style={{ color: "#697783" }}>{u?.email} · {u?.company} · {u?.role}</p>
        </div>
        <Button variant="outline" size="sm" onClick={onClose}>Cerrar</Button>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 text-sm">
        <Info label="País / Ciudad" value={`${u?.country ?? ""} / ${u?.city ?? ""}`} />
        <Info label="Nivel responsabilidad" value={u?.responsibility_level} />
        <Info label="Motivo" value={u?.main_reason} />
        <Info label="Sector / Tamaño" value={`${u?.sector ?? "—"} / ${u?.company_size ?? "—"}`} />
        <Info label="Patrón dominante" value={`${r?.dominant_pattern} (${r?.p_percent?.toFixed?.(0) ?? r?.pe_percent?.toFixed?.(0) ?? ""}%)`} />
        <Info label="Patrón secundario" value={r?.secondary_pattern} />
        <Info label="Perfil mixto" value={`${r?.mixed_profile_type} ${r?.mixed_profile_name ? "· " + r.mixed_profile_name : ""}`} />
        <Info label="IFE-GS" value={`${r?.ife_gs_score?.toFixed?.(0)} (${r?.friction_level})`} />
        <Info label="Trigger / Emoción / Conducta" value={`${r?.dominant_trigger} · ${r?.dominant_emotion} · ${r?.dominant_response_behavior}`} />
        <Info label="Recomendación" value={`${r?.recommended_program} — ${r?.recommended_duration}`} />
      </div>

      {r?.report_text && (
        <div className="border-t pt-4" style={{ borderColor: "#e5e7eb" }}>
          <h3 className="font-semibold text-sm mb-2" style={{ color: "#05325a" }}>Reporte</h3>
          <pre className="text-xs whitespace-pre-wrap" style={{ color: "#3f3f46", fontFamily: "inherit" }}>{r.report_text}</pre>
        </div>
      )}

      {fu && (
        <div className="border-t pt-4" style={{ borderColor: "#e5e7eb" }}>
          <h3 className="font-semibold text-sm mb-2" style={{ color: "#05325a" }}>Ruta sugerida ({fu.recommended_duration})</h3>
          <ol className="text-xs space-y-1 list-decimal list-inside" style={{ color: "#3f3f46" }}>
            {[fu.week_1_focus, fu.week_2_focus, fu.week_3_focus, fu.week_4_focus, fu.week_5_focus, fu.week_6_focus, fu.week_7_focus, fu.week_8_focus].filter(Boolean).map((w: string, i: number) => <li key={i}>{w}</li>)}
          </ol>
        </div>
      )}

      <div className="border-t pt-4 space-y-3" style={{ borderColor: "#e5e7eb" }}>
        <h3 className="font-semibold text-sm" style={{ color: "#05325a" }}>Seguimiento</h3>
        <div className="flex gap-2 items-center">
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 px-2 border rounded text-sm" style={{ borderColor: "#e5e7eb" }}>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <Button size="sm" onClick={() => onUpdated(status, notes)} style={{ backgroundColor: "#05325a", color: "#fff" }}>Guardar</Button>
          <Button size="sm" variant="outline" onClick={() => navigator.clipboard.writeText(waSummary)}>Copiar para WhatsApp</Button>
        </div>
        <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notas internas…" />
      </div>
    </div>
  );
}
function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <div className="text-xs" style={{ color: "#697783" }}>{label}</div>
      <div className="text-sm" style={{ color: "#05325a" }}>{value ?? "—"}</div>
    </div>
  );
}
