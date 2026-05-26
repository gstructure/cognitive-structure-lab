import * as React from "react";
import {
  Body, Container, Head, Heading, Html, Link, Preview, Text, Hr,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

const SITE_NAME = "G-Frame";

const Email = () => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Estás en la lista — G-Frame te avisa cuando esté listo</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Hola,</Heading>
        <Text style={text}>
          Recibimos tu solicitud de acceso anticipado a {SITE_NAME}.
        </Text>
        <Text style={text}>
          Eres parte del primer grupo de usuarios en Ecuador que tendrá acceso
          antes del lanzamiento oficial en Q3 2026.
        </Text>
        <Text style={textBold}>Lo que viene:</Text>
        <Text style={list}>· Acceso anticipado al prototipo antes del lanzamiento público</Text>
        <Text style={list}>· Precio especial de fundadores — solo para la lista de espera</Text>
        <Text style={list}>· Actualizaciones directas cuando haya algo real que decir</Text>
        <Text style={text}>
          No vas a recibir spam. Solo te escribimos cuando haya algo que valga la pena.
        </Text>
        <Text style={text}>
          Si tienes preguntas, responde este email o escríbenos por WhatsApp:{" "}
          <Link href="https://wa.me/593986875121" style={link}>+593 98 687 5121</Link>
        </Text>
        <Text style={signature}>— Guillermo Suco<br />Fundador, G-Frame</Text>
        <Hr style={hr} />
        <Text style={footerSmall}>
          G-Structure · Guayaquil, Ecuador<br />
          <Link href="https://g-structure.co" style={link}>g-structure.co</Link>
        </Text>
        <Text style={disclaimer}>
          No sustituye atención psicológica, médica o psiquiátrica.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: "Estás en la lista — G-Frame te avisa cuando esté listo",
  displayName: "Waitlist confirmation",
  previewData: {},
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "600px" };
const h1 = { fontSize: "20px", fontWeight: 600 as const, color: "#05325a", margin: "0 0 18px" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 14px" };
const textBold = { ...text, fontWeight: 600 as const, color: "#05325a", marginTop: "8px" };
const list = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 4px" };
const signature = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "20px 0 0" };
const hr = { borderColor: "#e5e7eb", margin: "24px 0" };
const footerSmall = { fontSize: "12px", color: "#697783", margin: "0 0 8px", lineHeight: "1.6" };
const disclaimer = { fontSize: "11px", color: "#697783", margin: 0, fontStyle: "italic" as const };
const link = { color: "#05325a", textDecoration: "underline" };
