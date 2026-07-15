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
    q: "¿Qué hace KAIRON cuando me bloqueo?",
    a: "Kai te guía para separar la situación, la emoción y la interpretación que está cargando tu ejecución. Después convierte esa lectura en una acción concreta para avanzar.",
  },
  {
    q: "¿Qué hace KAIRON?",
    a: "KAIRON ayuda a profesionales, founders y creators a separar la situación, la emoción y la interpretación que bloquea su ejecución. Kai guía una lectura más precisa y la convierte en una acción concreta en menos de 12 minutos.",
  },
  {
    q: "¿Cómo trabaja Kai dentro de KAIRON?",
    a: "Kai funciona como coach de ejecución con IA: pregunta con estructura, ordena la fricción mental y ayuda a elegir el siguiente movimiento dentro del flujo I-R-O™.",
  },
  {
    q: "¿Trabajan con empresas o solo con individuos?",
    a: "Ambos. KAIRON es el producto principal; el Workshop de Diagnóstico es la puerta B2B para aprender con equipos reales, generar tracción y fortalecer el producto.",
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
    q: "What does KAIRON do when I get blocked?",
    a: "Kai guides you to separate the situation, the emotion, and the interpretation that is loading your execution. Then it turns that reading into a concrete action to move forward.",
  },
  {
    q: "What does KAIRON do?",
    a: "KAIRON helps professionals, founders, and creators separate the situation, the emotion, and the interpretation that blocks execution. Kai guides a more precise reading and turns it into a concrete action in under 12 minutes.",
  },
  {
    q: "How does Kai work inside KAIRON?",
    a: "Kai works as an AI execution coach: it asks with structure, organizes mental friction, and helps choose the next movement inside the I-R-O™ flow.",
  },
  {
    q: "Do you work with companies or only with individuals?",
    a: "Both. KAIRON is the main product; the Diagnostic Workshop is the B2B entry point to learn with real teams, generate traction, and strengthen the product.",
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
