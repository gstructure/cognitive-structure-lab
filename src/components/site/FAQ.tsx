import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQS = [
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
    q: "¿Qué es G-Struct y cuándo estará disponible?",
    a: "G-Struct es la capa tecnológica del método, en desarrollo junto a ÉPICO. Aún no está disponible al público. Puedes sumarte a la lista de espera desde la página G-Struct.",
  },
];

export function FAQ() {
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
