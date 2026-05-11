import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  requestType?: string;
  message?: string;
}

const ContactUserConfirmationEmail = ({ name, requestType, message }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Hemos recibido tu mensaje | G-Structure</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Gracias por contactar a G-Structure</Heading>
        <Text style={text}>Hola, {name ?? "—"}.</Text>
        <Text style={text}>
          Hemos recibido tu solicitud sobre <strong>{requestType ?? "tu mensaje"}</strong>.
          Revisaremos tu mensaje y nos pondremos en contacto contigo a la brevedad.
        </Text>

        {message ? (
          <>
            <Heading as="h2" style={h2}>Resumen de tu mensaje</Heading>
            <Text style={quote}>{message}</Text>
          </>
        ) : null}

        <Text style={text}>
          Si necesitas añadir información adicional, puedes responder a este correo o
          escribir directamente a:
        </Text>
        <Text style={text}>
          Email: <Link href="mailto:guillermo@g-structure.co" style={link}>guillermo@g-structure.co</Link><br />
          WhatsApp: <Link href="https://wa.me/593986875121" style={link}>+593 98 687 5121</Link>
        </Text>

        <Section style={footerBox}>
          <Text style={footerStrong}>G-Structure</Text>
          <Text style={footerSmall}>Ingeniería de resultados cognitivo-conductuales</Text>
          <Text style={footerSmall}>
            <Link href="https://www.g-structure.co" style={link}>www.g-structure.co</Link>
          </Text>
          <Text style={footerNote}>
            G-Structure ofrece servicios de coaching y formación cognitivo-conductual aplicada
            a la ejecución. No sustituye atención psicológica, médica o psiquiátrica.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: ContactUserConfirmationEmail,
  subject: "Hemos recibido tu mensaje | G-Structure",
  displayName: "Contact user confirmation",
  previewData: {
    name: "Ana",
    requestType: "Enterprise / equipo",
    message: "Quisiéramos explorar el workshop de diagnóstico.",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "560px" };
const h1 = { fontSize: "20px", fontWeight: 600, color: "#0a0a0a", margin: "0 0 14px" };
const h2 = { fontSize: "14px", fontWeight: 600, color: "#0a0a0a", margin: "24px 0 8px" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 14px" };
const link = { color: "#0a0a0a", textDecoration: "underline" };
const quote = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 14px", padding: "12px 16px", borderLeft: "3px solid #0a0a0a", backgroundColor: "#fafafa", whiteSpace: "pre-wrap" as const };
const footerBox = { marginTop: "28px", padding: "16px 0 0", borderTop: "1px solid #e5e7eb" };
const footerStrong = { fontSize: "13px", color: "#0a0a0a", fontWeight: 600, margin: "0 0 2px" };
const footerSmall = { fontSize: "12px", color: "#6b7280", margin: "0 0 4px" };
const footerNote = { fontSize: "11px", color: "#9ca3af", margin: "10px 0 0", lineHeight: "1.5" };
