import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

const Email = ({ locale = "es" }: { locale?: "es" | "en" }) => {
  const copy = locale === "en"
    ? {
        preview: "You are subscribed to G-Structure notes.",
        title: "You are in.",
        intro:
          "Thanks for subscribing to G-Structure notes. This is where we share essays, product updates, and the thinking behind G-Frame.",
        promise:
          "Expect useful notes on the I-R-O™ Method, cognitive-behavioral execution, and what we are learning while building G-Frame for Q3.",
        cadence:
          "No noise. No generic productivity tips. Only updates when there is something worth reading.",
        signature: "Guillermo Suco\nFounder, G-Structure",
        subject: "Welcome to G-Structure notes",
      }
    : {
        preview: "Ya estás suscrito a las notas de G-Structure.",
        title: "Estás dentro.",
        intro:
          "Gracias por suscribirte a las notas de G-Structure. Aquí compartimos artículos, updates del producto y el pensamiento detrás de G-Frame.",
        promise:
          "Vas a recibir notas útiles sobre el Método I-R-O™, ejecución cognitivo-conductual y lo que estamos aprendiendo mientras construimos G-Frame para Q3.",
        cadence:
          "Sin ruido. Sin tips genéricos de productividad. Solo escribimos cuando hay algo que vale la pena leer.",
        signature: "Guillermo Suco\nFundador, G-Structure",
        subject: "Bienvenido a las notas de G-Structure",
      };

  return (
    <Html lang={locale} dir="ltr">
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={h1}>{copy.title}</Heading>
          <Text style={text}>{copy.intro}</Text>
          <Text style={text}>{copy.promise}</Text>
          <Text style={text}>{copy.cadence}</Text>
          <Text style={signature}>
            {copy.signature.split("\n").map((line) => (
              <React.Fragment key={line}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </Text>
          <Hr style={hr} />
          <Text style={footerSmall}>
            G-Structure · Guayaquil, Ecuador
            <br />
            <Link href="https://g-structure.co" style={link}>
              g-structure.co
            </Link>
          </Text>
          <Text style={disclaimer}>
            No sustituye atención psicológica, médica o psiquiátrica.
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: Email,
  subject: (data: Record<string, any>) =>
    data.locale === "en" ? "Welcome to G-Structure notes" : "Bienvenido a las notas de G-Structure",
  displayName: "Newsletter welcome",
  previewData: { locale: "es" },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "600px" };
const h1 = { fontSize: "20px", fontWeight: 600 as const, color: "#05325a", margin: "0 0 18px" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 14px" };
const signature = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "20px 0 0" };
const hr = { borderColor: "#e5e7eb", margin: "24px 0" };
const footerSmall = { fontSize: "12px", color: "#697783", margin: "0 0 8px", lineHeight: "1.6" };
const disclaimer = { fontSize: "11px", color: "#697783", margin: 0, fontStyle: "italic" as const };
const link = { color: "#05325a", textDecoration: "underline" };
