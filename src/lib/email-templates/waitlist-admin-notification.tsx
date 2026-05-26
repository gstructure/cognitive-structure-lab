import * as React from "react";
import {
  Body, Container, Head, Heading, Html, Preview, Text, Hr,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  email?: string;
  name?: string;
  source?: string;
  pattern?: string;
  total?: number;
  submittedAt?: string;
}

const Email = ({ email, name, source, pattern, total, submittedAt }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>{`Nuevo registro en lista de espera G-Frame: ${email ?? ""}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Nuevo registro en lista de espera</Heading>
        <Text style={text}><strong>Email:</strong> {email}</Text>
        {name && <Text style={text}><strong>Nombre:</strong> {name}</Text>}
        <Text style={text}><strong>Origen:</strong> {source || "—"}</Text>
        {pattern && <Text style={text}><strong>Patrón (quiz):</strong> {pattern}</Text>}
        <Text style={text}><strong>Fecha:</strong> {submittedAt}</Text>
        {typeof total === "number" && (
          <>
            <Hr style={hr} />
            <Text style={textBold}>Total en lista de espera: {total}</Text>
          </>
        )}
        <Hr style={hr} />
        <Text style={footerSmall}>
          Notificación automática · G-Frame waitlist
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: (d: Record<string, any>) =>
    `Nuevo registro waitlist: ${d.email ?? ""}`,
  displayName: "Waitlist admin notification",
  to: "guillermo@g-structure.co",
  previewData: {
    email: "ejemplo@correo.com",
    name: "Ejemplo",
    source: "home",
    pattern: "Procrastinación",
    total: 42,
    submittedAt: "15 de mayo de 2026 — 10:30",
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "600px" };
const h1 = { fontSize: "20px", fontWeight: 600 as const, color: "#05325a", margin: "0 0 18px" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 8px" };
const textBold = { ...text, fontWeight: 600 as const, color: "#05325a" };
const hr = { borderColor: "#e5e7eb", margin: "20px 0" };
const footerSmall = { fontSize: "12px", color: "#697783", margin: 0, lineHeight: "1.6" };
