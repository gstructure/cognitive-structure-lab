import { ArticleSubscribeForm } from "@/components/articles/ArticleSubscribeForm";
import { Section } from "@/components/site/Section";

export function NewsletterPage({ locale }: { locale: "es" | "en" }) {
  const copy = locale === "en"
    ? {
        eyebrow: "G-STRUCTURE NOTES",
        title: "Essays, product updates, and the method behind G-Struct.",
        body:
          "A quiet newsletter about cognitive-behavioral execution, the I-R-O(TM) Method, and what we are learning while building G-Struct for Q3.",
        points: [
          "Founder notes on what we are building.",
          "Product updates from the G-Struct prototype.",
          "Practical essays on friction, habits, and execution.",
        ],
      }
    : {
        eyebrow: "NOTAS DE G-STRUCTURE",
        title: "Articulos, updates del producto y el metodo detras de G-Struct.",
        body:
          "Una newsletter sobria sobre ejecucion cognitivo-conductual, el Metodo I-R-O(TM) y lo que estamos aprendiendo mientras construimos G-Struct para Q3.",
        points: [
          "Founder notes sobre lo que estamos construyendo.",
          "Updates del prototipo de G-Struct.",
          "Ensayos practicos sobre friccion, habitos y ejecucion.",
        ],
      };

  return (
    <Section className="pt-14 md:pt-20">
      <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
        <div>
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1 className="mt-5 max-w-4xl font-display text-4xl leading-[1.05] md:text-6xl">
            {copy.title}
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {copy.body}
          </p>
          <ul className="mt-8 grid gap-3 text-sm text-muted-foreground">
            {copy.points.map((point) => (
              <li key={point} className="border-l border-border pl-4">
                {point}
              </li>
            ))}
          </ul>
        </div>
        <ArticleSubscribeForm />
      </div>
    </Section>
  );
}
