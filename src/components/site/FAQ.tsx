import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLocale } from "@/lib/i18n";

export type FAQItem = { q: string; a: string };

const DEFAULT_ES: FAQItem[] = [
  {
    q: "¿G-Structure es terapia?",
    a: "No. Es un proceso de coaching cognitivo-conductual aplicado a la ejecución profesional. Si necesitas atención clínica de salud mental, te recomendamos un psicólogo o psicólogo clínico.",
  },
  {
    q: "¿Cómo empieza un proceso?",
    a: "Con una conversación inicial breve. Permite revisar tu contexto, definir si G-Structure es adecuado y proponer una ruta clara: workshop, proceso individual, intervención Enterprise o continuidad.",
  },
  {
    q: "¿Trabajan con empresas o solo con individuos?",
    a: "Ambos. Enterprise está diseñado para equipos, founders y organizaciones. REESTRUCTURA 1:1 es para profesionales, líderes y emprendedores que quieren intervenir su propio patrón de ejecución.",
  },
  {
    q: "¿Qué pasa si no tengo claro qué necesito?",
    a: "Justamente esa es la función de la conversación inicial. No hace falta llegar con un diagnóstico previo; lo construimos juntos.",
  },
  {
    q: "¿Estoy hablando con una startup o con una firma de coaching?",
    a: "Con una tech startup. G-Struct es el producto principal. REESTRUCTURA 1:1, Enterprise y workshops son canales de validación, revenue temprano e insight para entrenar el método I-R-O™ antes del lanzamiento.",
  },
  {
    q: "¿Qué es G-Struct y cuándo estará disponible?",
    a: "G-Struct es la plataforma tecnológica impulsada por el método I-R-O™. Está en desarrollo junto a ÉPICO y su lanzamiento público está previsto para Q3 2026. Puedes sumarte a la lista de espera desde la página G-Struct.",
  },
];

const DEFAULT_EN: FAQItem[] = [
  {
    q: "Is G-Structure therapy?",
    a: "No. It’s a cognitive-behavioral coaching process applied to professional execution. If you need clinical mental-health care, we recommend a licensed psychologist or clinical psychologist.",
  },
  {
    q: "How does an engagement begin?",
    a: "With a short initial conversation. We review your context, define whether G-Structure is the right fit, and propose a clear path: workshop, 1:1 process, Enterprise intervention, or continuity.",
  },
  {
    q: "Do you work with companies or only with individuals?",
    a: "Both. Enterprise is built for teams, founders, and organizations. RESTRUCTURE 1:1 is for professionals, leaders, and entrepreneurs who want to work on their own execution pattern.",
  },
  {
    q: "What if I’m not sure what I need?",
    a: "That’s precisely what the initial conversation is for. You don’t need to arrive with a diagnosis; we build it together.",
  },
  {
    q: "Is this a startup or a coaching firm?",
    a: "A tech startup. G-Struct is the main product. RESTRUCTURE 1:1, Enterprise, and workshops are validation, early revenue, and insight channels that help train the I-R-O™ Method before launch.",
  },
  {
    q: "What is G-Struct and when will it be available?",
    a: "G-Struct is the technology platform powered by the I-R-O™ Method. It is in development with ÉPICO and its public launch is planned for Q3 2026. You can join the waitlist from the G-Struct page.",
  },
];

export function FAQ({ items }: { items?: FAQItem[] } = {}) {
  const { locale } = useLocale();
  const FAQS = items ?? (locale === "en" ? DEFAULT_EN : DEFAULT_ES);
  return (
    <Accordion type="single" collapsible className="border-y border-border">
      {FAQS.map((f, i) => (
        <AccordionItem
          key={f.q}
          value={`item-${i}`}
          className="border-b border-border last:border-b-0"
        >
          <AccordionTrigger className="py-6 text-left font-display text-base md:text-lg font-semibold text-foreground hover:no-underline">
            {f.q}
          </AccordionTrigger>
          <AccordionContent className="pb-6 text-sm md:text-[15px] text-muted-foreground leading-relaxed">
            {f.a}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
