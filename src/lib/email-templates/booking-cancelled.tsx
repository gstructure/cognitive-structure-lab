import * as React from "react";
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text, Link,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  packageName?: string;
  slotLabel?: string;
  contact?: { email: string; whatsappNumber: string; whatsappLink: string };
}

const Email = ({ name, packageName, slotLabel, contact }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Actualización sobre tu solicitud de reserva</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `Hola, ${name}.` : "Hola."}</Heading>
        <Text style={text}>
          Te escribimos para informarte que tu solicitud de reserva no ha sido confirmada.
        </Text>

        <Section style={card}>
          <Text style={cardLabel}>Servicio</Text>
          <Text style={cardValue}>{packageName ?? "—"}</Text>
          <Hr style={hr} />
          <Text style={cardLabel}>Fecha y hora</Text>
          <Text style={cardValue}>{slotLabel ?? "—"}</Text>
        </Section>

        <Text style={text}>
          Esto puede deberse a que no se recibió o no se pudo validar el pago del
          anticipo dentro del plazo indicado.
        </Text>

        <Text style={text}>
          Si deseas solicitar una nueva fecha o revisar tu caso, escríbenos a:
        </Text>
        <Text style={text}>
          Email: <Link href={`mailto:${contact?.email}`} style={link}>{contact?.email}</Link>
          <br />
          WhatsApp: <Link href={contact?.whatsappLink} style={link}>{contact?.whatsappNumber}</Link>
        </Text>

        <Text style={footer}>
          G-Structure<br />
          <Link href="https://www.g-structure.co" style={link}>www.g-structure.co</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: () => "Actualización sobre tu solicitud de reserva | G-Structure",
  displayName: "Booking — Cancelada / no validada",
  previewData: {
    name: "María",
    packageName: "REESTRUCTURA 1:1 — Reencuadre (6 sesiones)",
    slotLabel: "lunes, 18 de mayo de 2026, 10:00",
    contact: {
      email: "guillermo@g-structure.co", whatsappNumber: "+593986875121",
      whatsappLink: "https://wa.me/593986875121",
    },
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "600px" };
const h1 = { fontSize: "22px", fontWeight: 600, color: "#0a0a0a", margin: "0 0 12px" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.65", margin: "0 0 14px" };
const card = { border: "1px solid #e5e7eb", padding: "18px 20px", margin: "16px 0" };
const cardLabel = { fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#6b7280", margin: "0 0 3px" };
const cardValue = { fontSize: "15px", color: "#0a0a0a", fontWeight: 500, margin: "0 0 4px" };
const hr = { borderColor: "#e5e7eb", margin: "12px 0" };
const link = { color: "#0a0a0a", textDecoration: "underline" };
const footer = { fontSize: "13px", color: "#6b7280", margin: "32px 0 0", lineHeight: "1.6" };
