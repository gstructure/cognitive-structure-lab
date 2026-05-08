import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/site/Section";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Mail, Phone, Globe, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto | G-Structure" },
      {
        name: "description",
        content:
          "Conversemos sobre tu contexto. Diagnóstico, proceso individual, intervención Enterprise o continuidad. Email, WhatsApp y formulario.",
      },
      { property: "og:title", content: "Contacto — G-Structure" },
      { property: "og:description", content: "Agenda una conversación inicial con G-Structure." },
    ],
  }),
  component: Page,
});

function Page() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28">
          <Eyebrow>CONTACTO</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-4xl md:text-5xl leading-[1.05]">
            Antes de intervenir, conversamos.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Una conversación inicial permite revisar si G-Structure es adecuado para tu contexto y
            qué ruta tendría más sentido: diagnóstico, proceso individual, intervención Enterprise o
            continuidad.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
          <aside className="lg:col-span-5 space-y-6">
            <DirectChannel
              icon={<Mail size={18} />}
              label="Email"
              value="guillermo@g-structure.co"
              href="mailto:guillermo@g-structure.co"
            />
            <DirectChannel
              icon={<Phone size={18} />}
              label="Teléfono / WhatsApp"
              value="+593 98 687 5121"
              href="https://wa.me/593986875121"
            />
            <DirectChannel
              icon={<Globe size={18} />}
              label="Web"
              value="www.g-structure.co"
            />
            <div className="border border-border p-7 bg-[color:var(--color-brand-soft)]/30">
              <p className="eyebrow mb-3">Qué esperar</p>
              <p className="text-sm text-foreground/85 leading-relaxed">
                Una respuesta breve para coordinar una primera llamada. No enviamos newsletters ni
                promociones. La idea es entender tu contexto y proponer la ruta correcta.
              </p>
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}

function DirectChannel({
  icon, label, value, href,
}: { icon: React.ReactNode; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-4 border border-border bg-[color:var(--color-surface)] p-6 hover:border-foreground/40 transition-colors">
      <span className="mt-0.5 text-foreground">{icon}</span>
      <div className="flex-1">
        <p className="eyebrow mb-1">{label}</p>
        <p className="font-display text-base md:text-lg font-semibold text-foreground">{value}</p>
      </div>
      {href ? <ArrowRight size={16} className="mt-1 text-muted-foreground" /> : null}
    </div>
  );
  return href ? <a href={href} className="block">{inner}</a> : inner;
}

function ContactForm() {
  const [data, setData] = useState({
    name: "", email: "", org: "", context: "diagnostico", message: "",
  });

  const onChange = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = `[G-Structure] ${data.context} — ${data.name}`;
    const body = `Nombre: ${data.name}\nEmail: ${data.email}\nOrganización: ${data.org}\nContexto: ${data.context}\n\n${data.message}`;
    window.location.href = `mailto:guillermo@g-structure.co?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-[color:var(--color-surface)] p-7 md:p-9 space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Nombre" required>
          <input required value={data.name} onChange={onChange("name")} className="form-input" />
        </Field>
        <Field label="Email" required>
          <input required type="email" value={data.email} onChange={onChange("email")} className="form-input" />
        </Field>
      </div>
      <Field label="Organización (opcional)">
        <input value={data.org} onChange={onChange("org")} className="form-input" />
      </Field>
      <Field label="¿Qué te interesa explorar?">
        <select value={data.context} onChange={onChange("context")} className="form-input">
          <option value="diagnostico">Workshop de Diagnóstico</option>
          <option value="enterprise">REESTRUCTURA Enterprise</option>
          <option value="reestructura">REESTRUCTURA 1:1</option>
          <option value="continuidad">Continuidad Enterprise</option>
          <option value="g-struct">G-Struct (lista de espera)</option>
          <option value="aliados">Aliados ETW 2026</option>
          <option value="equipo">Unirme al equipo</option>
          <option value="otro">Otro</option>
        </select>
      </Field>
      <Field label="Cuéntanos brevemente tu contexto" required>
        <textarea required rows={5} value={data.message} onChange={onChange("message")} className="form-input resize-none" />
      </Field>
      <button
        type="submit"
        className="inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-[13px] font-medium text-background transition-opacity hover:opacity-90"
      >
        Enviar mensaje <ArrowRight size={15} />
      </button>
      <p className="text-xs text-muted-foreground">
        También puedes escribir directamente a guillermo@g-structure.co o por WhatsApp al +593 98 687 5121.
      </p>
      <style>{`
        .form-input {
          width: 100%;
          background: var(--color-background);
          border: 1px solid var(--color-border);
          padding: 0.75rem 0.875rem;
          font-size: 14px;
          color: var(--color-foreground);
          outline: none;
          transition: border-color .15s ease;
        }
        .form-input:focus { border-color: var(--color-foreground); }
      `}</style>
    </form>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="eyebrow mb-2 block">
        {label}{required ? " *" : ""}
      </span>
      {children}
    </label>
  );
}
