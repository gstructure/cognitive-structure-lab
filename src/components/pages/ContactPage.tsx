import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { Eyebrow } from "@/components/site/Eyebrow";
import { Mail, Phone, Globe, ArrowRight, ArrowUpRight, Building2, User, Cpu, Handshake, Users, CheckCircle2 } from "lucide-react";
import { SocialLinks } from "@/components/site/SocialLinks";
import { BriefDownloadCard } from "@/components/site/BriefDownloadCard";
import { trackContactClick, trackConversion } from "@/lib/analytics";
import type { Locale } from "@/lib/i18n";

type RequestKey = "enterprise" | "reestructura" | "diagnostico" | "g-struct" | "aliados" | "equipo" | "otro";

const COPY = {
  es: {
    eyebrow: "CONTACTO",
    h1: "Antes de intervenir, conversamos.",
    lead:
      "Una conversación inicial permite revisar si G-Structure es adecuado para tu contexto y qué ruta tendría más sentido: diagnóstico, proceso individual, intervención Enterprise o continuidad.",
    routeEyebrow: "ELIGE TU RUTA",
    routeTitle: "¿Qué te trae a G-Structure?",
    routeSubtitle:
      "Si ya sabes qué te interesa explorar, ve directo a la página correspondiente. Si no, completa el formulario y nos coordinamos.",
    open: "Ir a la página",
    routes: [
      { to: "/enterprise", icon: Building2, t: "Enterprise", d: "Workshop, REESTRUCTURA Enterprise y continuidad." },
      { to: "/reestructura-1-1", icon: User, t: "REESTRUCTURA 1:1", d: "Proceso individual de coaching cognitivo-conductual." },
      { to: "/g-struct", icon: Cpu, t: "G-Struct", d: "Lista de espera de la app del método." },
      { to: "/aliados-etw-2026", icon: Handshake, t: "Aliados ETW 2026", d: "Sumarse al Workshop en Ecuador Tech Week 2026." },
      { to: "/unete-al-equipo", icon: Users, t: "Únete al equipo", d: "Construir desde una etapa temprana." },
    ],
    requestTypes: {
      enterprise: "Enterprise / equipo",
      reestructura: "REESTRUCTURA 1:1",
      diagnostico: "Workshop de Diagnóstico",
      "g-struct": "G-Struct",
      aliados: "Alianza / sponsorship ETW 2026",
      equipo: "Unirme al equipo",
      otro: "Otro",
    },
    labels: {
      name: "Nombre",
      email: "Email",
      organization: "Empresa / institución (opcional)",
      role: "Cargo (opcional)",
      whatsapp: "WhatsApp (opcional)",
      country: "País / ciudad (opcional)",
      context: "Tipo de solicitud",
      message: "Mensaje",
      consent: "He leído y acepto las",
      legal: "Políticas Legales",
      privacy: "y la Política de Privacidad.",
      submit: "Enviar mensaje",
      sending: "Enviando...",
      otherMessage: "Enviar otro mensaje",
      whatsappNow: "Hablar por WhatsApp",
      emailNow: "Enviar correo",
    },
    validation: {
      name: "Por favor, ingresa tu nombre.",
      email: "Por favor, ingresa un correo válido.",
      context: "Selecciona el tipo de solicitud.",
      message: "Escribe tu mensaje.",
      consent: "Debes aceptar las Políticas Legales para enviar el formulario.",
      error: "No pudimos enviar tu mensaje en este momento. Por favor intenta nuevamente o escríbenos por WhatsApp.",
    },
    successTitle: "Mensaje enviado",
    successBody: "Gracias por escribirnos. Hemos recibido tu solicitud y revisaremos tu mensaje para responderte a la brevedad.",
    successUrgent: "Si tu solicitud es urgente, también puedes escribir directamente por WhatsApp.",
    directChannels: "Canales directos",
    expectTitle: "Qué esperar",
    expectBody:
      "Una respuesta breve para coordinar una primera llamada. No enviamos newsletters ni promociones. La idea es entender tu contexto y proponer la ruta correcta.",
    footerNote: "También puedes escribir directamente a guillermo@g-structure.co o por WhatsApp al +593 98 687 5121.",
    legalTo: "/politicas-legales",
  },
  en: {
    eyebrow: "CONTACT",
    h1: "Before we intervene, we talk.",
    lead:
      "An initial conversation helps us see whether G-Structure fits your context and which path makes the most sense: diagnostic, individual process, Enterprise intervention, or continuity.",
    routeEyebrow: "CHOOSE YOUR PATH",
    routeTitle: "What brings you to G-Structure?",
    routeSubtitle:
      "If you already know what you want to explore, go directly to the relevant page. If not, complete the form and we will coordinate from there.",
    open: "Open page",
    routes: [
      { to: "/en/enterprise", icon: Building2, t: "Enterprise", d: "Workshop, RESTRUCTURE Enterprise, and continuity for teams." },
      { to: "/en/restructure-1-1", icon: User, t: "RESTRUCTURE 1:1", d: "Individual cognitive-behavioral process." },
      { to: "/en/g-struct", icon: Cpu, t: "G-Struct", d: "Product waitlist, early access, or collaboration." },
      { to: "/en/etw-2026-partners", icon: Handshake, t: "ETW 2026 Partners", d: "Partnerships for the Diagnostic Workshop." },
      { to: "/en/join-the-team", icon: Users, t: "Join the team", d: "Build with us from an early stage." },
    ],
    requestTypes: {
      enterprise: "Enterprise / team",
      reestructura: "RESTRUCTURE 1:1",
      diagnostico: "Diagnostic Workshop",
      "g-struct": "G-Struct",
      aliados: "Partnership / ETW 2026 sponsorship",
      equipo: "Join the team",
      otro: "Other",
    },
    labels: {
      name: "Name",
      email: "Email",
      organization: "Company / institution (optional)",
      role: "Role (optional)",
      whatsapp: "WhatsApp (optional)",
      country: "Country / city (optional)",
      context: "Request type",
      message: "Message",
      consent: "I have read and accept the",
      legal: "Legal Policies",
      privacy: "and the Privacy Policy.",
      submit: "Send message",
      sending: "Sending...",
      otherMessage: "Send another message",
      whatsappNow: "Talk on WhatsApp",
      emailNow: "Send email",
    },
    validation: {
      name: "Please enter your name.",
      email: "Please enter a valid email address.",
      context: "Select the type of request.",
      message: "Write your message.",
      consent: "You must accept the Legal Policies before sending the form.",
      error: "We could not send your message right now. Please try again or write to us on WhatsApp.",
    },
    successTitle: "Message sent",
    successBody: "Thanks for reaching out. We received your request and will review your message so we can reply soon.",
    successUrgent: "If your request is urgent, you can also write directly on WhatsApp.",
    directChannels: "Direct channels",
    expectTitle: "What to expect",
    expectBody:
      "A brief reply to coordinate a first call. We do not send newsletters or promotions from this form. The goal is to understand your context and suggest the right path.",
    footerNote: "You can also write directly to guillermo@g-structure.co or on WhatsApp at +593 98 687 5121.",
    legalTo: "/politicas-legales",
  },
} as const;

type FormState = {
  name: string;
  email: string;
  organization: string;
  role: string;
  whatsapp: string;
  country: string;
  context: RequestKey;
  message: string;
  consent: boolean;
  website: string;
};

export function ContactPage({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 grid-bg opacity-50" aria-hidden />
        <div className="container-x relative py-20 md:py-28">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h1 className="mt-6 max-w-3xl font-display text-4xl md:text-5xl leading-[1.05]">{c.h1}</h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{c.lead}</p>
        </div>
      </section>

      <Section>
        <BriefDownloadCard />
      </Section>

      <Section tone="muted">
        <SectionHeader eyebrow={c.routeEyebrow} title={c.routeTitle} subtitle={c.routeSubtitle} />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {c.routes.map((r) => {
            const Icon = r.icon;
            return (
              <Link key={r.to} to={r.to} className="lift group flex h-full flex-col border border-border bg-[color:var(--color-surface)] p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center border border-border bg-[color:var(--color-brand-soft)]/40">
                  <Icon size={18} />
                </span>
                <h3 className="mt-5 font-display text-base font-semibold">{r.t}</h3>
                <p className="mt-2 flex-1 text-[13px] text-muted-foreground leading-relaxed">{r.d}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[12px] font-medium text-foreground">
                  {c.open} <ArrowUpRight size={13} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <ContactForm locale={locale} />
          </div>
          <aside className="lg:col-span-5 space-y-6">
            <DirectChannel icon={<Mail size={18} />} label="Email" value="guillermo@g-structure.co" href="mailto:guillermo@g-structure.co" />
            <DirectChannel icon={<Phone size={18} />} label={locale === "en" ? "Phone / WhatsApp" : "Teléfono / WhatsApp"} value="+593 98 687 5121" href="https://wa.me/593986875121" />
            <DirectChannel icon={<Globe size={18} />} label="Web" value="g-structure.co" />
            <div className="border border-border bg-[color:var(--color-surface)] p-7">
              <p className="eyebrow mb-4">{c.directChannels}</p>
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
                  onClick={() => trackContactClick("whatsapp", { source: `${locale}_contact_card` })}
                  className="inline-flex items-center gap-2 bg-foreground px-4 py-2.5 text-[12.5px] font-medium text-background hover:opacity-90"
                >
                  {c.labels.whatsappNow} <ArrowRight size={13} />
                </a>
                <a
                  href="mailto:guillermo@g-structure.co"
                  onClick={() => trackContactClick("email", { source: `${locale}_contact_card` })}
                  className="inline-flex items-center gap-2 border border-foreground/30 px-4 py-2.5 text-[12.5px] font-medium text-foreground hover:border-foreground"
                >
                  {c.labels.emailNow} <ArrowRight size={13} />
                </a>
              </div>
            </div>
            <div className="border border-border p-7 bg-[color:var(--color-brand-soft)]/30">
              <p className="eyebrow mb-3">{c.expectTitle}</p>
              <p className="text-sm text-foreground/85 leading-relaxed">{c.expectBody}</p>
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
  return href ? (
    <a
      href={href}
      className="block"
      onClick={() => {
        trackContactClick(href.startsWith("https://wa.me") ? "whatsapp" : "email", {
          source: "contact_direct_channel",
          label,
        });
      }}
    >
      {inner}
    </a>
  ) : inner;
}

function ContactForm({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  const [data, setData] = useState<FormState>({
    name: "", email: "", organization: "", role: "", whatsapp: "", country: "",
    context: "diagnostico", message: "", consent: false, website: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  const onChange = (k: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const v = e.target instanceof HTMLInputElement && e.target.type === "checkbox" ? e.target.checked : e.target.value;
      setData((d) => ({ ...d, [k]: v as never }));
    };

  const validate = (): string | null => {
    if (!data.name.trim()) return c.validation.name;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email.trim())) return c.validation.email;
    if (!data.context) return c.validation.context;
    if (!data.message.trim()) return c.validation.message;
    if (!data.consent) return c.validation.consent;
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFieldError(null);
    setErrorMsg(null);
    const v = validate();
    if (v) { setFieldError(v); return; }

    setStatus("sending");
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name.trim(),
          email: data.email.trim(),
          organization: data.organization.trim(),
          role: data.role.trim(),
          whatsapp: data.whatsapp.trim(),
          country: data.country.trim(),
          requestType: c.requestTypes[data.context],
          message: data.message.trim(),
          consent: data.consent,
          website: data.website,
          pageOrigin: typeof window !== "undefined" ? window.location.pathname : "",
          language: locale,
        }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json?.error || `HTTP ${res.status}`);
      }
      trackConversion("contact_form_submit", {
        request_type: c.requestTypes[data.context],
        has_org: data.organization.trim().length > 0,
        locale,
      });
      setStatus("success");
    } catch (err) {
      console.error("[contact] submit failed", err);
      setStatus("error");
      setErrorMsg(c.validation.error);
    }
  };

  if (status === "success") {
    return (
      <div className="border border-border bg-[color:var(--color-surface)] p-8 md:p-10">
        <div className="flex items-center gap-3 text-foreground">
          <CheckCircle2 size={22} />
          <h2 className="font-display text-2xl font-semibold">{c.successTitle}</h2>
        </div>
        <p className="mt-4 text-sm text-foreground/85 leading-relaxed">{c.successBody}</p>
        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{c.successUrgent}</p>
        <div className="mt-6 flex flex-wrap gap-2">
          <a
            href="https://wa.me/593986875121"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackContactClick("whatsapp", { source: `${locale}_contact_success` })}
            className="inline-flex items-center gap-2 bg-foreground px-5 py-3 text-[13px] font-medium text-background hover:opacity-90"
          >
            {c.labels.whatsappNow} <ArrowRight size={15} />
          </a>
          <button
            type="button"
            onClick={() => {
              setData({ name: "", email: "", organization: "", role: "", whatsapp: "", country: "", context: "diagnostico", message: "", consent: false, website: "" });
              setStatus("idle");
            }}
            className="inline-flex items-center gap-2 border border-foreground/30 px-5 py-3 text-[13px] font-medium text-foreground hover:border-foreground"
          >
            {c.labels.otherMessage}
          </button>
        </div>
      </div>
    );
  }

  const sending = status === "sending";

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-[color:var(--color-surface)] p-7 md:p-9 space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={c.labels.name} required>
          <input required value={data.name} onChange={onChange("name")} className="form-input" autoComplete="name" />
        </Field>
        <Field label={c.labels.email} required>
          <input required type="email" value={data.email} onChange={onChange("email")} className="form-input" autoComplete="email" />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={c.labels.organization}>
          <input value={data.organization} onChange={onChange("organization")} className="form-input" autoComplete="organization" />
        </Field>
        <Field label={c.labels.role}>
          <input value={data.role} onChange={onChange("role")} className="form-input" autoComplete="organization-title" />
        </Field>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label={c.labels.whatsapp}>
          <input value={data.whatsapp} onChange={onChange("whatsapp")} className="form-input" inputMode="tel" autoComplete="tel" placeholder="+593 ..." />
        </Field>
        <Field label={c.labels.country}>
          <input value={data.country} onChange={onChange("country")} className="form-input" autoComplete="country-name" />
        </Field>
      </div>
      <Field label={c.labels.context} required>
        <select value={data.context} onChange={onChange("context")} className="form-input">
          {Object.entries(c.requestTypes).map(([k, v]) => (
            <option key={k} value={k}>{v}</option>
          ))}
        </select>
      </Field>
      <Field label={c.labels.message} required>
        <textarea required rows={5} value={data.message} onChange={onChange("message")} className="form-input resize-none" />
      </Field>

      <div aria-hidden className="hidden" style={{ position: "absolute", left: "-10000px" }}>
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={data.website} onChange={onChange("website")} />
        </label>
      </div>

      <label className="flex items-start gap-3 text-[13px] text-foreground/85 leading-relaxed">
        <input type="checkbox" checked={data.consent} onChange={onChange("consent")} className="mt-0.5 h-4 w-4 accent-foreground" />
        <span>
          {c.labels.consent}{" "}
          <Link to={c.legalTo} className="underline">{c.labels.legal}</Link>{" "}
          {c.labels.privacy} *
        </span>
      </label>

      {fieldError ? <p className="text-[13px] font-medium text-destructive">{fieldError}</p> : null}
      {status === "error" && errorMsg ? (
        <div className="border border-destructive/30 bg-destructive/5 p-4 text-[13px] text-foreground/90">
          <p>{errorMsg}</p>
          <a
            href="https://wa.me/593986875121"
            target="_blank"
            rel="noreferrer"
            onClick={() => trackContactClick("whatsapp", { source: `${locale}_contact_error` })}
            className="mt-3 inline-flex items-center gap-2 bg-foreground px-4 py-2 text-[12.5px] font-medium text-background hover:opacity-90"
          >
            {c.labels.whatsappNow} <ArrowRight size={13} />
          </a>
        </div>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex items-center justify-center gap-2 bg-foreground px-5 py-3 text-[13px] font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {sending ? c.labels.sending : c.labels.submit}
        {!sending ? <ArrowRight size={15} /> : null}
      </button>
      <p className="text-xs text-muted-foreground">{c.footerNote}</p>
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
