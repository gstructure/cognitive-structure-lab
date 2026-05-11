import { FileText, Download } from "lucide-react";
import { trackBriefDownload } from "@/lib/analytics";

const handleBriefDownload = (e: React.MouseEvent<HTMLAnchorElement>, source: "card" | "compact") => {
  e.preventDefault();
  trackBriefDownload(PDF_HREF, { source, file: "g-structure-brief-comercial.pdf" });
};

type Props = {
  /** "default" = light card on muted bg; "compact" = inline minimal block. */
  variant?: "default" | "compact";
  className?: string;
};

const PDF_HREF = "/downloads/g-structure-brief-comercial.pdf";
const PDF_LABEL = "Descargar brief comercial de G-Structure en PDF";

export function BriefDownloadCard({ variant = "default", className }: Props) {
  if (variant === "compact") {
    return (
      <a
        href={PDF_HREF}
        target="_blank"
        rel="noopener"
        download
        aria-label={PDF_LABEL}
        onClick={() => handleBriefDownload("compact")}
        className={`group inline-flex items-center gap-2.5 border border-border bg-[color:var(--color-surface)] px-4 py-2.5 text-[13px] font-medium text-foreground transition-colors hover:border-foreground ${className ?? ""}`}
      >
        <FileText size={15} className="text-muted-foreground group-hover:text-foreground transition-colors" />
        Descargar brief comercial (PDF)
        <Download size={14} className="transition-transform group-hover:translate-y-0.5" />
      </a>
    );
  }

  return (
    <aside
      aria-labelledby="brief-download-title"
      className={`relative overflow-hidden border border-border bg-[color:var(--color-surface)] ${className ?? ""}`}
    >
      <div className="grid gap-8 p-7 md:grid-cols-12 md:gap-10 md:p-10 md:items-center">
        {/* Mock cover */}
        <div className="md:col-span-4">
          <div
            className="relative mx-auto aspect-[1/1.414] w-full max-w-[220px] border border-[color:var(--color-brand-deep)]/15 shadow-[0_24px_50px_-22px_rgba(5,50,90,0.45)]"
            style={{ backgroundColor: "var(--color-brand)" }}
            aria-hidden
          >
            {/* faint grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px)",
                backgroundSize: "20% 100%",
              }}
            />
            <div className="absolute left-4 top-4 right-4 flex items-center justify-between text-[8px] tracking-[0.18em] text-white/70">
              <span className="font-semibold">G-STRUCTURE</span>
              <span>BRIEF · 2026</span>
            </div>
            <div className="absolute left-4 right-4 bottom-10">
              <span className="block text-[9px] font-semibold tracking-[0.2em] text-white/60">
                <span className="mr-1 inline-block h-[6px] w-[6px] translate-y-[-1px] bg-white/50" />
                INGENIERÍA DE EJECUCIÓN
              </span>
              <h3 className="mt-3 font-display text-[26px] leading-none font-bold text-white">
                G&#8209;Structure
              </h3>
              <p className="mt-2 text-[10px] leading-snug text-white/70">
                Ingeniería de resultados<br />cognitivo-conductuales.
              </p>
            </div>
            <div className="absolute left-4 bottom-3 right-4 flex items-center justify-between text-[8px] tracking-[0.18em] text-white/50">
              <span>WWW.G-STRUCTURE.CO</span>
              <span>08 PP</span>
            </div>
          </div>
        </div>

        {/* Copy + CTA */}
        <div className="md:col-span-8">
          <p className="eyebrow text-muted-foreground">RECURSO DESCARGABLE</p>
          <h3
            id="brief-download-title"
            className="mt-3 font-display text-2xl md:text-3xl leading-[1.1] text-foreground"
          >
            Descarga el brief comercial de G-Structure.
          </h3>
          <p className="mt-4 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
            Un documento breve, sobrio y directo para conocer la metodología I-R-O,
            las soluciones, el ecosistema G-Struct y el equipo detrás. Pensado para
            empresas, aliados, sponsors y potenciales colaboradores.
          </p>
          <ul className="mt-5 grid gap-1.5 text-[12.5px] text-muted-foreground sm:grid-cols-2">
            <li>· 8 páginas · A4 vertical</li>
            <li>· Método, soluciones y founder</li>
            <li>· Apto para lectura digital e impresión</li>
            <li>· Actualizado 2026</li>
          </ul>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <a
              href={PDF_HREF}
              target="_blank"
              rel="noopener"
              download
              aria-label={PDF_LABEL}
              onClick={() => handleBriefDownload("card")}
              className="group inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-[13px] font-medium tracking-wide text-background transition-opacity hover:opacity-90"
            >
              Descargar PDF
              <Download size={15} className="transition-transform group-hover:translate-y-0.5" />
            </a>
            <span className="inline-flex items-center gap-2 text-[12px] text-muted-foreground">
              <FileText size={13} /> g-structure-brief-comercial.pdf · ~7 MB
            </span>
          </div>
        </div>
      </div>
    </aside>
  );
}
