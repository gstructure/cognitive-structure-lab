import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/_admin/admin/waitlist")({
  component: WaitlistAdmin,
});

interface Row {
  id: string;
  email: string;
  name: string | null;
  source: string | null;
  pattern: string | null;
  created_at: string;
}

function WaitlistAdmin() {
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("waitlist" as any)
        .select("id, email, name, source, pattern, created_at")
        .order("created_at", { ascending: false });
      setRows(((data as unknown) as Row[]) || []);
      setLoading(false);
    })();
  }, []);

  const exportCsv = () => {
    const header = ["email", "name", "pattern", "source", "created_at"];
    const lines = [header.join(",")].concat(
      rows.map((r) =>
        [r.email, r.name ?? "", r.pattern ?? "", r.source ?? "", r.created_at]
          .map((v) => `"${String(v).replace(/"/g, '""')}"`)
          .join(","),
      ),
    );
    const blob = new Blob([lines.join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-semibold">Lista de espera G-Frame</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Total en lista de espera: {rows.length}
            </p>
          </div>
          <Button onClick={exportCsv} disabled={rows.length === 0}>
            Exportar CSV
          </Button>
        </div>

        {loading ? (
          <p className="text-sm text-muted-foreground">Cargando…</p>
        ) : (
          <div className="border rounded-lg overflow-x-auto bg-card">
            <table className="w-full text-sm">
              <thead className="bg-muted/40 text-left">
                <tr>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Patrón</th>
                  <th className="px-4 py-3 font-medium">Origen</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.id} className="border-t">
                    <td className="px-4 py-3">{r.email}</td>
                    <td className="px-4 py-3">{r.name ?? "—"}</td>
                    <td className="px-4 py-3">{r.pattern ?? "—"}</td>
                    <td className="px-4 py-3">{r.source ?? "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {new Date(r.created_at).toLocaleString("es-EC")}
                    </td>
                  </tr>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-muted-foreground" colSpan={5}>
                      Aún no hay registros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
