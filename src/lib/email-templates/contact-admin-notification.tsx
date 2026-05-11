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

interface Props {
  name?: string;
  email?: string;
  organization?: string;
  role?: string;
  whatsapp?: string;
  country?: string;
  requestType?: string;
  message?: string;
  pageOrigin?: string;
  language?: string;
  submittedAt?: string;
}

const ContactAdminNotificationEmail = ({
  name,
  email,
  organization,
  role,
  whatsapp,
  country,
  requestType,
  message,
  pageOrigin,
  language,
  submittedAt,
}: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Nueva solicitud desde G-Structure — {requestType ?? "contacto"}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nueva solicitud desde el website</Heading>
        <Text style={text}>
          {name ?? "Una persona"} envió un mensaje desde el formulario de contacto.
        </Text>

        <Section style={card}>
          <Row label="Nombre" value={name ?? "—"} />
          <Hr style={hr} />
          <Row label="Email" value={email ?? "—"} />
          {whatsapp ? (<><Hr style={hr} /><Row label="WhatsApp" value={whatsapp} /></>) : null}
          {organization ? (<><Hr style={hr} /><Row label="Empresa / institución" value={organization} /></>) : null}
          {role ? (<><Hr style={hr} /><Row label="Cargo" value={role} /></>) : null}
          {country ? (<><Hr style={hr} /><Row label="País / ciudad" value={country} /></>) : null}
          <Hr style={hr} />
          <Row label="Tipo de solicitud" value={requestType ?? "—"} />
        </Section>

        <Heading as="h2" style={h2}>Mensaje</Heading>
        <Text style={quote}>{message ?? "—"}</Text>

        <Section style={card}>
          {submittedAt ? (<Row label="Fecha de envío" value={submittedAt} />) : null}
          {pageOrigin ? (<><Hr style={hr} /><Row label="Página de origen" value={pageOrigin} /></>) : null}
          {language ? (<><Hr style={hr} /><Row label="Idioma" value={language} /></>) : null}
        </Section>
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
  component: ContactAdminNotificationEmail,
  to: "guillermo@g-structure.co",
  subject: (data: Record<string, any>) =>
    `Nueva solicitud desde G-Structure | ${data?.requestType ?? "contacto"}`,
  displayName: "Contact admin notification",
  previewData: {
    name: "Ana López",
    email: "ana@example.com",
    organization: "Acme",
    role: "COO",
    whatsapp: "+593 99 999 9999",
    country: "Quito, Ecuador",
    requestType: "Enterprise / equipo",
    message: "Quisiéramos explorar el workshop de diagnóstico para nuestro equipo.",
    pageOrigin: "/contacto",
    language: "es",
    submittedAt: "11 de mayo de 2026, 10:00",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "560px" };
const h1 = { fontSize: "20px", fontWeight: 600, color: "#0a0a0a", margin: "0 0 14px" };
const h2 = { fontSize: "14px", fontWeight: 600, color: "#0a0a0a", margin: "24px 0 8px" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 14px" };
const card = { border: "1px solid #e5e7eb", padding: "16px 18px", margin: "8px 0" };
const cardLabel = { fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#6b7280", margin: "0 0 3px" };
const cardValue = { fontSize: "14px", color: "#0a0a0a", fontWeight: 500, margin: "0" };
const hr = { borderColor: "#e5e7eb", margin: "12px 0" };
const quote = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 14px", padding: "12px 16px", borderLeft: "3px solid #0a0a0a", backgroundColor: "#fafafa", whiteSpace: "pre-wrap" as const };
