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

const SITE_NAME = "g-structure";

interface BookingConfirmationProps {
  name?: string;
  packageName?: string;
  slotLabel?: string;
  priceLabel?: string;
  notes?: string;
}

const BookingConfirmationEmail = ({
  name,
  packageName,
  slotLabel,
  priceLabel,
  notes,
}: BookingConfirmationProps) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>
      Reserva confirmada — {packageName ?? "tu sesión"} ({slotLabel ?? ""})
    </Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>
          {name ? `Hola ${name},` : "Hola,"} tu reserva está confirmada
        </Heading>
        <Text style={text}>
          Gracias por reservar con {SITE_NAME}. Estos son los detalles de tu sesión:
        </Text>

        <Section style={card}>
          <Text style={cardLabel}>Paquete</Text>
          <Text style={cardValue}>{packageName ?? "—"}</Text>

          <Hr style={hr} />

          <Text style={cardLabel}>Fecha y hora</Text>
          <Text style={cardValue}>{slotLabel ?? "—"}</Text>
          <Text style={muted}>Zona horaria: Ecuador (UTC−5)</Text>

          {priceLabel ? (
            <>
              <Hr style={hr} />
              <Text style={cardLabel}>Inversión</Text>
              <Text style={cardValue}>{priceLabel}</Text>
            </>
          ) : null}
        </Section>

        <Heading as="h2" style={h2}>
          ¿Qué sigue?
        </Heading>
        <Text style={text}>
          Te contactaremos por WhatsApp antes de la sesión con el enlace de la
          videollamada y los pasos previos. Si necesitas reprogramar, escríbenos
          con al menos 24 horas de anticipación.
        </Text>

        {notes ? (
          <>
            <Heading as="h2" style={h2}>
              Lo que compartiste
            </Heading>
            <Text style={text}>{notes}</Text>
          </>
        ) : null}

        <Text style={footer}>
          Un abrazo,
          <br />
          Equipo {SITE_NAME}
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: BookingConfirmationEmail,
  subject: (data: Record<string, any>) =>
    `Reserva confirmada — ${data?.packageName ?? "tu sesión"}`,
  displayName: "Booking confirmation",
  previewData: {
    name: "María",
    packageName: "REESTRUCTURA 1:1 — Reencuadre (6 sesiones)",
    slotLabel: "lunes, 18 de mayo de 2026, 10:00",
    priceLabel: "USD 285",
    notes: "Quiero trabajar la procrastinación con tareas técnicas.",
  },
} satisfies TemplateEntry;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
};
const container = { padding: "32px 28px", maxWidth: "560px" };
const h1 = {
  fontSize: "22px",
  fontWeight: 600,
  color: "#0a0a0a",
  margin: "0 0 18px",
  lineHeight: "1.25",
};
const h2 = {
  fontSize: "15px",
  fontWeight: 600,
  color: "#0a0a0a",
  margin: "28px 0 10px",
};
const text = {
  fontSize: "14px",
  color: "#3f3f46",
  lineHeight: "1.6",
  margin: "0 0 14px",
};
const card = {
  border: "1px solid #e5e7eb",
  padding: "18px 20px",
  margin: "20px 0 8px",
};
const cardLabel = {
  fontSize: "11px",
  textTransform: "uppercase" as const,
  letterSpacing: "0.06em",
  color: "#6b7280",
  margin: "0 0 4px",
};
const cardValue = {
  fontSize: "15px",
  color: "#0a0a0a",
  fontWeight: 500,
  margin: "0 0 4px",
};
const muted = { fontSize: "12px", color: "#6b7280", margin: "0" };
const hr = { borderColor: "#e5e7eb", margin: "14px 0" };
const footer = {
  fontSize: "13px",
  color: "#6b7280",
  margin: "32px 0 0",
  lineHeight: "1.5",
};
