import { Link } from "@tanstack/react-router";
import { ArrowRight, Check, Loader2 } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Section } from "@/components/site/Section";
import { SectionHeader } from "@/components/site/SectionHeader";
import { useLocale } from "@/lib/i18n";
import { SUPPORT_TIERS, type SupportTierId } from "@/lib/support-tiers";

declare global {
  interface Window {
    paypal?: any;
  }
}

const ETW_URL = "https://luma.com/lm4njhiu";

type PaymentStatus = "idle" | "loading" | "ready" | "success" | "cancelled" | "error";

type FormState = {
  name: string;
  email: string;
  publicRecognition: boolean;
  message: string;
  acceptedTerms: boolean;
};

const initialForm: FormState = {
  name: "",
  email: "",
  publicRecognition: true,
  message: "",
  acceptedTerms: false,
};

const TIER_COPY: Record<"es" | "en", Array<{
  id: SupportTierId;
  title: string;
  price: string;
  description: string;
  cta: string;
}>> = {
  es: [
    {
      id: "early",
      title: "Early Supporter",
      price: "$25",
      description: "Ayuda a cubrir materiales del evento, recursos de validación y herramientas básicas para el lanzamiento del 14 de julio.",
      cta: "Apoyar con $25",
    },
    {
      id: "builder",
      title: "Builder Supporter",
      price: "$50",
      description: "Apoya investigación con usuarios, pruebas del prototipo, levantamiento de retroalimentación y operación inicial de la validación.",
      cta: "Apoyar con $50",
    },
    {
      id: "founding",
      title: "Founding Supporter",
      price: "$100",
      description: "Contribuye directamente a la transición de G-Struct desde prototipo validado hacia MVP, incluyendo mejoras de experiencia, flujos de reestructuración y preparación técnica.",
      cta: "Apoyar con $100",
    },
    {
      id: "strategic",
      title: "Strategic Supporter",
      price: "$250+",
      description: "Para personas que quieren apoyar de forma más estratégica el desarrollo temprano de G-Structure y tener una conversación directa con el founder sobre la visión, el producto y las próximas etapas.",
      cta: "Apoyar estratégicamente",
    },
  ],
  en: [
    {
      id: "early",
      title: "Early Supporter",
      price: "$25",
      description: "Helps cover event materials, validation resources, and basic tools for the July 14 launch.",
      cta: "Support with $25",
    },
    {
      id: "builder",
      title: "Builder Supporter",
      price: "$50",
      description: "Supports user research, prototype testing, feedback collection, and the initial validation operation.",
      cta: "Support with $50",
    },
    {
      id: "founding",
      title: "Founding Supporter",
      price: "$100",
      description: "Contributes directly to moving G-Struct from validated prototype toward MVP, including UX improvements, restructuring flows, and technical preparation.",
      cta: "Support with $100",
    },
    {
      id: "strategic",
      title: "Strategic Supporter",
      price: "$250+",
      description: "For people who want to support G-Structure more strategically and have a direct conversation with the founder about the vision, product, and next stages.",
      cta: "Support strategically",
    },
  ],
};

export function SupportLaunchSection() {
  const { locale } = useLocale();
  const [selectedTier, setSelectedTier] = useState<SupportTierId>("early");
  const [form, setForm] = useState<FormState>(initialForm);
  const [status, setStatus] = useState<PaymentStatus>("idle");
  const [message, setMessage] = useState("");
  const checkoutRef = useRef<HTMLDivElement | null>(null);
  const selected = SUPPORT_TIERS[selectedTier];
  const tiers = TIER_COPY[locale];
  const handlePaymentStatus = useCallback((nextStatus: PaymentStatus, nextMessage?: string) => {
    setStatus(nextStatus);
    setMessage(nextMessage ?? "");
  }, []);
  const chooseTier = useCallback((tier: SupportTierId) => {
    setSelectedTier(tier);
    setStatus("idle");
    setMessage("");
    window.setTimeout(() => {
      checkoutRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 80);
  }, []);

  const copy = locale === "en"
    ? {
        eyebrow: "EARLY-STAGE STARTUP SUPPORT",
        title: "Support the Launch",
        subtitle: "Help us take G-Struct from prototype to MVP.",
        intro1: "G-Structure is entering a key validation stage.",
        intro2: "On July 14, 2026, we will have our official launch inside Ecuador Tech Week with the Execution Diagnostic Workshop at EPICO, Plaza Guayarte, Guayaquil. That day will also be part of the initial validation of G-Struct, the cognitive-behavioral platform we are building to help professionals, founders, and teams identify, reframe, and optimize their execution patterns.",
        intro3: "Before raising institutional investment, we need to strengthen traction, validate with real users, improve the prototype, and prepare the path toward MVP.",
        intro4: "That is why we are opening an early support path for people who believe in the vision and want to help us build from this first stage.",
        levelsTitle: "Early support levels",
        levelsIntro: "If you believe in G-Structure and want to help us take G-Struct from prototype to MVP, you can join as an early supporter in this initial validation stage.",
        receivesTitle: "What does an early supporter receive?",
        receivesBody: "All supporters receive recognition as early supporters of G-Structure, unless they prefer to remain anonymous; private accountability updates on how early support is being used, the progress of G-Struct, the workshop, and the transition toward MVP; priority to learn about the beta or first public tests of G-Struct when available; and early access to updates, materials, or invitations related to G-Structure.",
        strategicBody: "Strategic Supporters also receive a direct 30-minute conversation with Guillermo Suco, founder of G-Structure, to learn about the vision, product, and explore additional forms of support, connection, or collaboration.",
        transparencyTitle: "Transparency",
        transparencyBody: "G-Structure is not a nonprofit organization. This is not a donation campaign or an investment offering. Early support contributions do not grant equity, company participation, financial return, or rights over the company. They are voluntary contributions to support validation, launch, and early construction of G-Struct before a formal investment round. Funds will go toward product development, user validation, launch operations, technology tools, design, communications, and MVP preparation.",
        finalTitle: "Be part of G-Structure's first stage.",
        finalBody: "G-Struct is being built from Ecuador to solve a real problem: the gap between knowing what to do and executing it with clarity, structure, and consistency.",
        formTitle: "Support checkout",
        name: "Name",
        email: "Email",
        publicRecognition: "I authorize public recognition as an early supporter.",
        note: "Optional message",
        terms: "I understand this contribution is not an investment, donation to a nonprofit, purchase of shares, or promise of financial return.",
        legal: "This contribution supports the early validation and development phase of G-Struct. It does not grant equity, company participation, financial return, or ownership rights over G-Structure or G-Struct.",
        recognitionNote: "G-Structure will only publicly recognize supporters if they authorize their name.",
        payHint: "Complete the form and accept the acknowledgement to enable PayPal.",
        paypalConfiguring: "PayPal checkout is being configured. Please contact us directly to support the launch.",
        success: "Thank you for supporting the early construction of G-Struct. Your contribution helps validate and build a platform created from Ecuador to move professionals, founders, and teams from cognitive friction to structured execution.",
        cancelled: "Your payment was not completed. You can try again or contact us if you need help.",
        error: "We could not process the payment right now. Please try again or contact us.",
        returnSite: "Back to site",
        share: "Share G-Structure",
        workshop: "Register for the July 14 workshop",
        talk: "Talk to the founder",
        info: "Request information",
      }
    : {
        eyebrow: "APOYO TEMPRANO DE STARTUP",
        title: "Apoya el lanzamiento",
        subtitle: "Ayúdanos a llevar G-Struct del prototipo al MVP.",
        intro1: "G-Structure está entrando en una etapa clave de validación.",
        intro2: "El 14 de julio de 2026 tendremos nuestro lanzamiento oficial dentro de Ecuador Tech Week, con el Workshop de Diagnóstico de Ejecución en ÉPICO, Plaza Guayarte, Guayaquil. Ese día también será parte de la validación inicial de G-Struct, la plataforma cognitivo-conductual que estamos construyendo para ayudar a profesionales, founders y equipos a identificar, reencuadrar y optimizar sus patrones de ejecución.",
        intro3: "Antes de levantar inversión institucional, necesitamos fortalecer tracción, validar con usuarios reales, mejorar el prototipo y preparar el camino hacia el MVP.",
        intro4: "Por eso estamos abriendo una vía de apoyo temprano para personas que creen en la visión y quieren ayudarnos a construir desde esta primera etapa.",
        levelsTitle: "Niveles de apoyo temprano",
        levelsIntro: "Si crees en la visión de G-Structure y quieres ayudarnos a llevar G-Struct del prototipo al MVP, puedes sumarte como early supporter en esta etapa inicial de validación.",
        receivesTitle: "¿Qué recibe un early supporter?",
        receivesBody: "Todos los supporters reciben reconocimiento como early supporter de G-Structure, salvo que prefieran mantenerse anónimos; actualizaciones privadas de rendición de cuentas sobre cómo se está usando el apoyo, el avance de G-Struct, el workshop y la transición hacia MVP; prioridad para conocer la beta o primeras pruebas públicas de G-Struct cuando estén disponibles; y acceso anticipado a novedades, materiales o invitaciones relacionadas con G-Structure.",
        strategicBody: "Los Strategic Supporters reciben además una conversación directa de 30 minutos con Guillermo Suco, founder de G-Structure, para conocer la visión, el producto y explorar formas adicionales de apoyo, conexión o colaboración.",
        transparencyTitle: "Transparencia",
        transparencyBody: "G-Structure no es una organización sin fines de lucro. Esta no es una campaña de donaciones ni una oferta de inversión. Los aportes de apoyo temprano no otorgan equity, participación societaria, retorno financiero ni derechos sobre la empresa. Son contribuciones voluntarias para apoyar la etapa de validación, lanzamiento y construcción inicial de G-Struct antes de una ronda formal de inversión. Los fondos serán destinados a desarrollo de producto, validación con usuarios, operación del lanzamiento, herramientas tecnológicas, diseño, comunicación y preparación del MVP.",
        finalTitle: "Sé parte de la primera etapa de G-Structure.",
        finalBody: "G-Struct está siendo construido desde Ecuador para resolver un problema real: la brecha entre saber qué hacer y lograr ejecutarlo con claridad, estructura y consistencia.",
        formTitle: "Checkout de apoyo",
        name: "Nombre",
        email: "Email",
        publicRecognition: "Autorizo aparecer públicamente como early supporter.",
        note: "Mensaje opcional",
        terms: "Entiendo que este aporte no constituye inversión, donación a una organización sin fines de lucro, compra de acciones ni promesa de retorno financiero.",
        legal: "Este aporte apoya la fase temprana de validación y desarrollo de G-Struct. No otorga equity, participación societaria, retorno financiero ni derechos de propiedad sobre G-Structure o G-Struct.",
        recognitionNote: "G-Structure se reserva el derecho de reconocer públicamente a los supporters únicamente si estos autorizan su nombre.",
        payHint: "Completa el formulario y acepta el reconocimiento legal para habilitar PayPal.",
        paypalConfiguring: "El checkout de PayPal se está configurando. Contáctanos directamente si quieres apoyar el lanzamiento.",
        success: "Gracias por apoyar la construcción temprana de G-Struct. Tu aporte ayuda a validar y construir una plataforma creada desde Ecuador para llevar a profesionales, founders y equipos de la fricción cognitiva a la ejecución estructurada.",
        cancelled: "Tu pago no fue completado. Puedes intentarlo nuevamente o contactarnos si necesitas ayuda.",
        error: "No pudimos procesar el pago en este momento. Inténtalo otra vez o contáctanos.",
        returnSite: "Volver al sitio",
        share: "Compartir G-Structure",
        workshop: "Registrarme al workshop del 14 de julio",
        talk: "Hablar con el founder",
        info: "Solicitar información",
      };

  const canPay = Boolean(form.email && form.acceptedTerms);

  return (
    <Section tone="muted" id="support-launch">
      <SectionHeader eyebrow={copy.eyebrow} title={copy.title} subtitle={copy.subtitle} />

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-4 text-base text-muted-foreground leading-relaxed">
          <p className="text-foreground">{copy.intro1}</p>
          <p>{copy.intro2}</p>
          <p>{copy.intro3}</p>
          <p>{copy.intro4}</p>
        </div>
        <div className="lg:col-span-5 border border-border bg-background p-6">
          <p className="eyebrow text-[10px]">{copy.transparencyTitle}</p>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.transparencyBody}</p>
        </div>
      </div>

      <div className="mt-14">
        <h3 className="font-display text-2xl md:text-3xl">{copy.levelsTitle}</h3>
        <p className="mt-3 max-w-3xl text-sm text-muted-foreground leading-relaxed">{copy.levelsIntro}</p>
        <div className="mt-8 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {tiers.map((tier) => (
            <button
              key={tier.id}
              type="button"
              onClick={() => chooseTier(tier.id)}
              aria-pressed={selectedTier === tier.id}
              className={`group flex min-h-[300px] flex-col bg-[color:var(--color-surface)] p-6 text-left transition-all hover:-translate-y-1 hover:bg-background hover:shadow-[0_18px_42px_-24px_rgba(5,50,90,0.45)] focus:outline-none focus:ring-2 focus:ring-foreground ${selectedTier === tier.id ? "ring-1 ring-foreground" : ""}`}
            >
              <div className="flex items-start justify-between gap-4">
                <h4 className="font-display text-lg font-semibold">{tier.title}</h4>
                <span className="font-display text-xl font-semibold">{tier.price}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{tier.description}</p>
              <span className={`mt-auto inline-flex items-center justify-center gap-2 border px-4 py-2.5 text-sm font-medium transition-colors ${selectedTier === tier.id ? "border-foreground bg-foreground text-background" : "border-border bg-background text-foreground group-hover:border-foreground"}`}>
                {selectedTier === tier.id ? <Check size={15} /> : <ArrowRight size={15} />}
                {tier.cta}
              </span>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-5 border border-border bg-background p-6">
          <h3 className="font-display text-2xl">{copy.receivesTitle}</h3>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{copy.receivesBody}</p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/85">{copy.strategicBody}</p>
        </div>

        <div ref={checkoutRef} className="scroll-mt-24 lg:col-span-7 border border-border bg-[color:var(--color-surface)] p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[10px]">{copy.formTitle}</p>
              <h3 className="mt-2 font-display text-2xl">{selected.label} · ${selected.amount}</h3>
            </div>
            <span className="text-xs text-muted-foreground">PayPal · USD</span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="text-sm">
              <span className="text-xs text-muted-foreground">{copy.name}</span>
              <input
                value={form.name}
                onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                className="mt-1 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
              />
            </label>
            <label className="text-sm">
              <span className="text-xs text-muted-foreground">{copy.email}</span>
              <input
                type="email"
                required
                value={form.email}
                onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
                className="mt-1 w-full border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
              />
            </label>
          </div>

          <label className="mt-4 block text-sm">
            <span className="text-xs text-muted-foreground">{copy.note}</span>
            <textarea
              value={form.message}
              onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
              rows={3}
              className="mt-1 w-full resize-none border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-foreground"
            />
          </label>

          <div className="mt-5 space-y-3 text-sm">
            <label className="flex gap-3">
              <input
                type="checkbox"
                checked={form.publicRecognition}
                onChange={(event) => setForm((prev) => ({ ...prev, publicRecognition: event.target.checked }))}
                className="mt-1"
              />
              <span>{copy.publicRecognition}</span>
            </label>
            <label className="flex gap-3">
              <input
                type="checkbox"
                checked={form.acceptedTerms}
                onChange={(event) => setForm((prev) => ({ ...prev, acceptedTerms: event.target.checked }))}
                className="mt-1"
              />
              <span>{copy.terms}</span>
            </label>
          </div>

          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{copy.legal}</p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{copy.recognitionNote}</p>

          <div className="mt-6">
            {!canPay ? (
              <p className="border border-border bg-background px-4 py-3 text-sm text-muted-foreground">{copy.payHint}</p>
            ) : (
              <PayPalSupportButton
                tier={selectedTier}
                locale={locale}
                form={form}
                onStatus={handlePaymentStatus}
                copy={{ success: copy.success, cancelled: copy.cancelled, error: copy.error, paypalConfiguring: copy.paypalConfiguring }}
              />
            )}
          </div>

          {status === "loading" ? (
            <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" /> PayPal
            </p>
          ) : null}
          {message ? (
            <div className={`mt-4 border px-4 py-3 text-sm leading-relaxed ${status === "success" ? "border-emerald-300 bg-emerald-50 text-emerald-950" : "border-border bg-background text-foreground"}`}>
              {message}
              {status === "success" ? (
                <div className="mt-4 flex flex-wrap gap-2">
                  <a href={locale === "en" ? "/en" : "/"} className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-medium">{copy.returnSite}</a>
                  <button
                    type="button"
                    onClick={() => navigator.share?.({ title: "G-Structure", url: "https://g-structure.co" })}
                    className="inline-flex items-center gap-2 border border-border px-3 py-2 text-xs font-medium"
                  >
                    {copy.share}
                  </button>
                  <a href={ETW_URL} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-foreground px-3 py-2 text-xs font-medium text-background">
                    {copy.workshop}
                  </a>
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>

      <div className="mt-12 border border-foreground bg-[color:var(--color-brand-deep)] p-7 text-[color:var(--color-background)]">
        <h3 className="font-display text-2xl md:text-3xl">{copy.finalTitle}</h3>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[color:var(--color-background)]/80">{copy.finalBody}</p>
        <div className="mt-6 flex flex-wrap gap-3">
          <a href="#support-launch" className="inline-flex items-center gap-2 bg-[color:var(--color-background)] px-4 py-2.5 text-sm font-medium text-foreground">
            {copy.title}
          </a>
          <a href="https://wa.me/593986875121" className="inline-flex items-center gap-2 border border-[color:var(--color-background)]/40 px-4 py-2.5 text-sm font-medium">
            {copy.talk}
          </a>
          <Link to={locale === "en" ? "/en/contact" : "/contacto"} className="inline-flex items-center gap-2 border border-[color:var(--color-background)]/40 px-4 py-2.5 text-sm font-medium">
            {copy.info}
          </Link>
        </div>
      </div>
    </Section>
  );
}

function PayPalSupportButton({
  tier,
  locale,
  form,
  onStatus,
  copy,
}: {
  tier: SupportTierId;
  locale: "es" | "en";
  form: FormState;
  onStatus: (status: PaymentStatus, message?: string) => void;
  copy: { success: string; cancelled: string; error: string; paypalConfiguring: string };
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const formRef = useRef(form);
  const statusRef = useRef(onStatus);
  const copyRef = useRef(copy);
  const [clientId, setClientId] = useState("");
  const [configured, setConfigured] = useState(false);

  useEffect(() => {
    formRef.current = form;
    statusRef.current = onStatus;
    copyRef.current = copy;
  }, [copy, form, onStatus]);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/public/paypal-support-config", { cache: "no-store" })
      .then((res) => res.ok ? res.json() : null)
      .then((data) => {
        if (cancelled || !data) return;
        setClientId(data.clientId ?? "");
        setConfigured(Boolean(data.configured && data.clientId));
      })
      .catch(() => setConfigured(false));
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!configured || !clientId || !containerRef.current) return;
    let cancelled = false;

    const renderButtons = async () => {
      try {
        await loadPayPalScript(clientId);
        if (cancelled || !containerRef.current || !window.paypal?.Buttons) return;
        containerRef.current.innerHTML = "";
        window.paypal.Buttons({
          style: { layout: "vertical", shape: "rect", label: "paypal" },
          createOrder: async () => {
            statusRef.current("loading");
            const response = await fetch("/api/public/paypal-support-create-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ tier }),
            });
            if (!response.ok) throw new Error("create_order_failed");
            const data = await response.json();
            return data.id;
          },
          onApprove: async (data: { orderID: string }) => {
            const currentForm = formRef.current;
            statusRef.current("loading");
            const response = await fetch("/api/public/paypal-support-capture-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                orderId: data.orderID,
                supporterName: currentForm.name,
                supporterEmail: currentForm.email,
                wantsPublicRecognition: currentForm.publicRecognition,
                message: currentForm.message,
                acceptedTerms: currentForm.acceptedTerms,
                locale,
              }),
            });
            if (!response.ok) throw new Error("capture_failed");
            statusRef.current("success", copyRef.current.success);
          },
          onCancel: () => statusRef.current("cancelled", copyRef.current.cancelled),
          onError: () => statusRef.current("error", copyRef.current.error),
        }).render(containerRef.current);
      } catch {
        statusRef.current("error", copyRef.current.error);
      }
    };

    renderButtons();
    return () => {
      cancelled = true;
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [clientId, configured, locale, tier]);

  if (!configured) {
    return (
      <p className="border border-border bg-background px-4 py-3 text-sm text-muted-foreground">
        {copy.paypalConfiguring}
      </p>
    );
  }

  return <div ref={containerRef} />;
}

function loadPayPalScript(clientId: string) {
  const existing = document.querySelector<HTMLScriptElement>("script[data-gstructure-paypal]");
  if (existing) return Promise.resolve();

  return new Promise<void>((resolve, reject) => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(clientId)}&currency=USD&intent=capture`;
    script.async = true;
    script.dataset.gstructurePaypal = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("paypal_sdk_failed"));
    document.head.appendChild(script);
  });
}
