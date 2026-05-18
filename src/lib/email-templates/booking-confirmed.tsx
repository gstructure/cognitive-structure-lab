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
    <Preview>Tu reserva está confirmada</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `Hola, ${name}.` : "Hola."}</Heading>
        <Text style={text}>Tu reserva ha sido confirmada.</Text>

        <Section style={card}>
          <Text style={cardLabel}>Servicio</Text>
          <Text style={cardValue}>{packageName ?? "—"}</Text>
          <Hr style={hr} />
          <Text style={cardLabel}>Fecha y hora</Text>
          <Text style={cardValue}>{slotLabel ?? "—"}</Text>
          <Text style={muted}>Zona horaria: Ecuador (UTC−5)</Text>
          <Hr style={hr} />
          <Text style={cardLabel}>Estado</Text>
          <Text style={statusValue}>Confirmada</Text>
        </Section>

        <Text style={text}>
          Hemos validado el pago del anticipo correspondiente al 50% del valor del servicio.
        </Text>
        <Text style={text}>
          Te recomendamos guardar este correo como respaldo de tu reserva.
        </Text>

        <Heading as="h2" style={h2}>¿Necesitas reprogramar?</Heading>
        <Text style={text}>
          Si necesitas reprogramar o tienes alguna pregunta antes de la sesión, escríbenos a:
        </Text>
        <Text style={text}>
          Email: <Link href={`mailto:${contact?.email}`} style={link}>{contact?.email}</Link>
          <br />
          WhatsApp: <Link href={contact?.whatsappLink} style={link}>{contact?.whatsappNumber}</Link>
        </Text>

        <Text style={footer}>
          Gracias por confiar en G-Structure.
          <br /><br />
          G-Structure<br />
          Ingeniería de resultados cognitivo-conductuales<br />
          <Link href="https://g-structure.co" style={link}>g-structure.co</Link>
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: () => "Reserva confirmada | G-Structure",
  displayName: "Booking — Confirmada",
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
const h2 = { fontSize: "14px", fontWeight: 600, color: "#0a0a0a", margin: "26px 0 10px", textTransform: "uppercase" as const, letterSpacing: "0.06em" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.65", margin: "0 0 14px" };
const card = { border: "1px solid #e5e7eb", padding: "18px 20px", margin: "16px 0" };
const cardLabel = { fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#6b7280", margin: "0 0 3px" };
const cardValue = { fontSize: "15px", color: "#0a0a0a", fontWeight: 500, margin: "0 0 4px" };
const statusValue = { fontSize: "15px", color: "#15803d", fontWeight: 600, margin: "0" };
const muted = { fontSize: "12px", color: "#6b7280", margin: "0" };
const hr = { borderColor: "#e5e7eb", margin: "12px 0" };
const link = { color: "#0a0a0a", textDecoration: "underline" };
const footer = { fontSize: "13px", color: "#6b7280", margin: "32px 0 0", lineHeight: "1.6" };
