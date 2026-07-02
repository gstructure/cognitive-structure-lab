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
    q: "¿KAIRON es terapia?",
    a: "No. KAIRON no es terapia, no diagnostica y no sustituye atención psicológica, médica o psiquiátrica. Es coaching cognitivo estructurado para procesar fricción mental y convertirla en acción.",
  },
  {
    q: "¿Qué hace KAIRON?",
    a: "KAIRON ayuda a profesionales, founders y creators a separar la situación, la emoción y la interpretación que bloquea su ejecución. Kai guía una lectura más precisa y la convierte en una acción concreta en menos de 12 minutos.",
  },
  {
    q: "¿KAIRON es un journal o un chatbot?",
    a: "No. No es un diario de pensamientos ni un chatbot genérico. Es una herramienta de coaching cognitivo con IA, guiada por Kai y estructurada por el método I-R-O™.",
  },
  {
    q: "¿Trabajan con empresas o solo con individuos?",
    a: "Ambos. KAIRON es el producto principal; Enterprise, REESTRUCTURA 1:1 y workshops son canales de validación, aprendizaje y revenue temprano para fortalecer el producto.",
  },
  {
    q: "¿Estoy hablando con una startup o con una firma de coaching?",
    a: "Con una tech startup. G-Structure construye KAIRON como producto principal: una herramienta de coaching cognitivo con IA para ejecución profesional.",
  },
  {
    q: "¿KAIRON ya está disponible?",
    a: "Sí. KAIRON ya está activo como MVP para usuarios tempranos. El producto comercial seguirá evolucionando hacia el lanzamiento público de Q3 2026.",
  },
];

const DEFAULT_EN: FAQItem[] = [
  {
    q: "Is KAIRON therapy?",
    a: "No. KAIRON is not therapy, does not diagnose, and does not replace psychological, medical, or psychiatric care. It is structured cognitive coaching for processing mental friction and turning it into action.",
  },
  {
    q: "What does KAIRON do?",
    a: "KAIRON helps professionals, founders, and creators separate the situation, the emotion, and the interpretation that blocks execution. Kai guides a more precise reading and turns it into a concrete action in under 12 minutes.",
  },
  {
    q: "Is KAIRON a journal or a chatbot?",
    a: "No. It is not a thought journal and not a generic chatbot. It is an AI cognitive coaching tool, guided by Kai and structured by the I-R-O™ Method.",
  },
  {
    q: "Do you work with companies or only with individuals?",
    a: "Both. KAIRON is the main product; Enterprise, RESTRUCTURE 1:1, and workshops are validation, learning, and early-revenue channels that strengthen the product.",
  },
  {
    q: "Is this a startup or a coaching firm?",
    a: "A tech startup. G-Structure is building KAIRON as its main product: an AI cognitive coaching tool for professional execution.",
  },
  {
    q: "Is KAIRON already available?",
    a: "Yes. KAIRON is already live as an MVP for early users. The commercial product will keep evolving toward the Q3 2026 public launch.",
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
