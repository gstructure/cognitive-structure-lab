import { createFileRoute } from "@tanstack/react-router";
import { ProductLayout } from "@/components/layouts/ProductLayout";
import { ProductHeader } from "@/components/product/ProductHeader";
import { KaironHero } from "@/components/product/KaironHero";

export const Route = createFileRoute("/mockup/kairon-hero")({
  component: MockupKaironHero,
});

/**
 * MOCKUP ROUTE — for visual approval only.
 * Shows the KAIRON product surface: ProductHeader + KaironHero on #110C08.
 * Remove this route after approval.
 */
function MockupKaironHero() {
  return (
    <ProductLayout>
      <ProductHeader />
      <KaironHero locale="es" />

      {/* Spacer to demonstrate scroll behavior */}
      <section style={{ padding: "6rem 2rem", borderTop: "1px solid rgb(239 168 49 / 12%)" }}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <p style={{ color: "#BDB0A3", fontSize: "0.875rem", letterSpacing: "0.16em", fontWeight: 600, textTransform: "uppercase" }}>
            MOCKUP · BELOW THE FOLD
          </p>
          <h2 style={{ color: "#F8F1E8", fontSize: "clamp(2rem, 4vw, 3rem)", marginTop: "1.5rem", lineHeight: 1.1, fontFamily: "var(--font-display, Manrope, sans-serif)" }}>
            Sections below would continue here:
          </h2>
          <ul style={{ color: "#BDB0A3", marginTop: "1.5rem", lineHeight: 2, fontSize: "1rem" }}>
            <li>→ Proof block (52 users, testimonials)</li>
            <li>→ Four patterns: procrastination, perfectionism, impostor, self-sabotage</li>
            <li>→ I-R-O method explanation</li>
            <li>→ Product system walkthrough</li>
            <li>→ Nocturno (evening voice mode)</li>
            <li>→ Safety & privacy boundaries</li>
            <li>→ Pricing (Basic / Pro)</li>
            <li>→ Final CTA</li>
          </ul>
        </div>
      </section>
    </ProductLayout>
  );
}
