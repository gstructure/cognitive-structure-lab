import * as React from "react";
import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface AdminNotificationProps {
  name?: string;
  email?: string;
  phone?: string;
  country?: string;
  notes?: string;
  packageName?: string;
  slotLabel?: string;
  priceLabel?: string;
  bookingId?: string;
}

const BookingAdminNotificationEmail = ({
  name,
  email,
  phone,
  country,
  notes,
  packageName,
  slotLabel,
  priceLabel,
  bookingId,
}: AdminNotificationProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>
      Nueva reserva — {name ?? "cliente"} ({packageName ?? ""})
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nueva reserva recibida</Heading>
        <Text style={text}>
          {name ?? "Un cliente"} acaba de reservar{" "}
          <strong>{packageName ?? "una sesión"}</strong>.
        </Text>

        <Section style={card}>
          <Row label="Paquete" value={packageName ?? "—"} />
          <Hr style={hr} />
          <Row label="Fecha y hora" value={slotLabel ?? "—"} />
          {priceLabel ? (
            <>
              <Hr style={hr} />
              <Row label="Inversión" value={priceLabel} />
            </>
          ) : null}
        </Section>

        <Heading as="h2" style={h2}>
          Datos del cliente
        </Heading>
        <Section style={card}>
          <Row label="Nombre" value={name ?? "—"} />
          <Hr style={hr} />
          <Row label="Email" value={email ?? "—"} />
          {phone ? (
            <>
              <Hr style={hr} />
              <Row label="WhatsApp / Tel." value={phone} />
            </>
          ) : null}
          {country ? (
            <>
              <Hr style={hr} />
              <Row label="País / Ciudad" value={country} />
            </>
          ) : null}
        </Section>

        {notes ? (
          <>
            <Heading as="h2" style={h2}>
              Notas del cliente
            </Heading>
            <Text style={quote}>{notes}</Text>
          </>
        ) : null}

        {bookingId ? (
          <Text style={footer}>ID de reserva: {bookingId}</Text>
        ) : null}
      </Container>
    </Body>
  </Html>
);

const Row = ({ label, value }: { label: string; value: string }) => (
  <>
    <Text style={cardLabel}>{label}</Text>
    <Text style={cardValue}>{value}</Text>
  </>
);

export const template = {
  component: BookingAdminNotificationEmail,
  subject: (data: Record<string, any>) =>
    `Nueva reserva — ${data?.name ?? "cliente"} (${data?.packageName ?? ""})`,
  displayName: "Booking admin notification",
  previewData: {
    name: "María Pérez",
    email: "maria@example.com",
    phone: "+593 99 999 9999",
    country: "Quito, Ecuador",
    notes: "Quiero trabajar la procrastinación con tareas técnicas.",
    packageName: "REESTRUCTURA 1:1 — Reencuadre (6 sesiones)",
    slotLabel: "lunes, 18 de mayo de 2026, 10:00",
    priceLabel: "USD 285",
    bookingId: "abc123",
  },
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};
const container = { padding: "32px 28px", maxWidth: "560px" };
const h1 = {
  fontSize: "20px",
  fontWeight: 600,
  color: "#0a0a0a",
  margin: "0 0 14px",
};
const h2 = {
  fontSize: "14px",
  fontWeight: 600,
  color: "#0a0a0a",
  margin: "24px 0 8px",
};
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 14px" };
const card = {
  border: "1px solid #e5e7eb",
  padding: "16px 18px",
  margin: "8px 0",
};
const cardLabel = {
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  color: "#6b7280",
  margin: "0 0 3px",
};
const cardValue = {
  fontSize: "14px",
  color: "#0a0a0a",
  fontWeight: 500,
  margin: "0",
};
const hr = { borderColor: "#e5e7eb", margin: "12px 0" };
const quote = {
  fontSize: "14px",
  color: "#3f3f46",
  lineHeight: "1.6",
  margin: "0 0 14px",
  padding: "12px 16px",
  borderLeft: "3px solid #0a0a0a",
  backgroundColor: "#fafafa",
};
const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  margin: "28px 0 0",
};
