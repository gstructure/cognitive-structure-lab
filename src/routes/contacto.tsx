import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Mail, Phone, Globe, ArrowRight, ArrowUpRight, Building2, User, Cpu, Handshake, Users } from "lucide-react";
import { SocialLinks } from "@/components/site/SocialLinks";
import { buildSeo, canonicalLink, jsonLdScript, breadcrumbSchema } from "@/lib/seo";
import { BriefDownloadCard } from "@/components/site/BriefDownloadCard";
import { trackConversion } from "@/lib/analytics";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: buildSeo({
      path: "/contacto",
      title: "Contacto | G-Structure",
      description:
        "Conversemos sobre tu contexto: diagnóstico, REESTRUCTURA 1:1, intervención Enterprise, alianzas o equipo. Email, WhatsApp y formulario directo con G-Structure.",
    }),
    links: canonicalLink("/contacto"),
    scripts: [
      jsonLdScript(breadcrumbSchema([
        { name: "Inicio", path: "/" },
        { name: "Contacto", path: "/contacto" },
      ])),
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
        <BriefDownloadCard />
      </Section>

      <Section tone="muted">
        <SectionHeader
          eyebrow="ELIGE TU RUTA"
          title="¿Qué te trae a G-Structure?"
          subtitle="Si ya sabes qué te interesa explorar, ve directo a la página correspondiente. Si no, completa el formulario y nos coordinamos."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {[
            { to: "/enterprise", icon: <Building2 size={18} />, t: "Enterprise", d: "Workshop, REESTRUCTURA Enterprise y continuidad." },
            { to: "/reestructura-1-1", icon: <User size={18} />, t: "REESTRUCTURA 1:1", d: "Proceso individual de coaching cognitivo-conductual." },
            { to: "/g-struct", icon: <Cpu size={18} />, t: "G-Struct", d: "Lista de espera de la app del método." },
            { to: "/aliados-etw-2026", icon: <Handshake size={18} />, t: "Aliados ETW 2026", d: "Sumarse al Workshop en Ecuador Tech Week 2026." },
            { to: "/unete-al-equipo", icon: <Users size={18} />, t: "Únete al equipo", d: "Construir desde una etapa temprana." },
          ].map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="lift group flex h-full flex-col border border-border bg-[color:var(--color-surface)] p-6"
            >
              <span className="inline-flex h-9 w-9 items-center justify-center border border-border bg-[color:var(--color-brand-soft)]/40">
                {r.icon}
              </span>
              <h3 className="mt-5 font-display text-base font-semibold">{r.t}</h3>
              <p className="mt-2 flex-1 text-[13px] text-muted-foreground leading-relaxed">{r.d}</p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-foreground">
                Ir a la página <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </Section>

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
            <div className="border border-border bg-[color:var(--color-surface)] p-7">
              <p className="eyebrow mb-4">Canales directos</p>
              <ul className="space-y-2 text-sm text-foreground/85">
                <li><span className="text-muted-foreground">Instagram · </span>@g.structurecbc</li>
                <li><span className="text-muted-foreground">Facebook · </span>G-Structure</li>
                <li><span className="text-muted-foreground">LinkedIn · </span>Guillermo Suco</li>
              </ul>
              <div className="mt-5">
                <SocialLinks only={["instagram", "facebook", "linkedin", "whatsapp", "email"]} />
              </div>
              <div className="mt-6 flex flex-wrap gap-2">
                <a
                  href="https://wa.me/593986875121"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-[12.5px] font-medium text-background hover:opacity-90"
                >
                  Hablar por WhatsApp <ArrowRight size={13} />
                </a>
                <a
                  href="mailto:guillermo@g-structure.co"
                  className="inline-flex items-center gap-2 border border-foreground/30 px-4 py-2.5 text-[12.5px] font-medium text-foreground hover:border-foreground"
                >
                  Enviar correo <ArrowRight size={13} />
                </a>
              </div>
            </div>
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
    trackConversion("contact_form_submit", {
      context: data.context,
      has_org: data.org.trim().length > 0,
    });
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
