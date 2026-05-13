import * as React from "react";
import {
  Body, Container, Head, Heading, Html, Link, Preview, Section, Text, Hr,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  company?: string;
  role?: string;
  dominantPattern?: string;
  secondaryPattern?: string;
  mixedProfile?: string;
  ifeGs?: number;
  frictionLevel?: string;
  dominantTrigger?: string;
  dominantEmotion?: string;
  dominantBehavior?: string;
  topImpactArea?: string;
  recommendedProgram?: string;
  recommendedDuration?: string;
  showEnterprise?: boolean;
}

const WA_INDIVIDUAL =
  "https://wa.me/593986875121?text=Tom%C3%A9%20el%20Diagn%C3%B3stico%20de%20Fricci%C3%B3n%20Ejecutiva%20y%20deseo%20dar%20el%20siguiente%20paso%20con%20REESTRUCTURA%201%3A1.";
const WA_ENTERPRISE =
  "https://wa.me/593986875121?text=Tom%C3%A9%20el%20Diagn%C3%B3stico%20de%20Fricci%C3%B3n%20Ejecutiva%20y%20quiero%20conocer%20REESTRUCTURA%20Enterprise%20para%20mi%20empresa.";

const Email = (p: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Tu Diagnóstico de Fricción Ejecutiva G-Structure está listo</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          <Text style={headerTitle}>G-Structure</Text>
          <Text style={headerSub}>Diagnóstico de Fricción Ejecutiva</Text>
        </Section>

        <Heading style={h1}>Hola {p.name ?? ""},</Heading>
        <Text style={text}>
          Gracias por completar el Diagnóstico de Fricción Ejecutiva G-Structure. Este reporte
          resume tu patrón dominante de ejecución, los principales factores que pueden estar
          afectando tu productividad y una ruta inicial recomendada para trabajar tu sistema
          de ejecución.
        </Text>

        <Section style={card}>
          <Row label="Patrón dominante" value={p.dominantPattern} />
          <Row label="Patrón secundario" value={p.secondaryPattern} />
          {p.mixedProfile ? <Row label="Perfil mixto" value={p.mixedProfile} /> : null}
          <Row label="IFE-GS" value={`${p.ifeGs?.toFixed(0)} (${p.frictionLevel})`} />
          <Row label="Trigger dominante" value={p.dominantTrigger} />
          <Row label="Emoción dominante" value={p.dominantEmotion} />
          <Row label="Conducta principal" value={p.dominantBehavior} />
          <Row label="Área productiva más afectada" value={p.topImpactArea} />
          <Row label="Recomendación" value={`${p.recommendedProgram} — ${p.recommendedDuration}`} />
        </Section>

        <Text style={cta}>
          <Link href={WA_INDIVIDUAL} style={ctaLink}>
            Agendar siguiente paso para REESTRUCTURA 1:1 →
          </Link>
        </Text>
        {p.showEnterprise ? (
          <Text style={cta}>
            <Link href={WA_ENTERPRISE} style={ctaLink}>
              Llevar este diagnóstico a mi empresa →
            </Link>
          </Text>
        ) : null}

        <Hr style={hr} />

        <Text style={disclaimer}>
          Este resultado no constituye diagnóstico clínico. Es una lectura funcional de
          autopercepción aplicada a coaching cognitivo-conductual y productividad profesional.
        </Text>

        <Section style={footerBox}>
          <Text style={footerStrong}>G-Structure</Text>
          <Text style={footerSmall}>Identify. Reframe. Optimize.</Text>
          <Text style={footerSmall}>
            <Link href="mailto:guillermo@g-structure.co" style={link}>guillermo@g-structure.co</Link>
            {" · "}
            <Link href="https://www.g-structure.co" style={link}>www.g-structure.co</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

const Row = ({ label, value }: { label: string; value?: string | null }) =>
  value ? (
    <Text style={rowText}>
      <span style={rowLabel}>{label}: </span>
      <span style={rowVal}>{value}</span>
    </Text>
  ) : null;

export const template = {
  component: Email,
  subject: "Tu Diagnóstico de Fricción Ejecutiva G-Structure está listo",
  displayName: "Diagnostic report",
  previewData: {
    name: "Ana",
    company: "Acme",
    role: "Directora",
    dominantPattern: "Perfeccionismo de Ejecución",
    secondaryPattern: "Patrón del Impostor en Ejecución",
    mixedProfile: "Sobrecontrol por validación",
    ifeGs: 62,
    frictionLevel: "Fricción alta",
    dominantTrigger: "Alta visibilidad",
    dominantEmotion: "Ansiedad",
    dominantBehavior: "Reviso en exceso",
    topImpactArea: "Cierre de tareas",
    recommendedProgram: "REESTRUCTURA 1:1",
    recommendedDuration: "8 semanas",
    showEnterprise: true,
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" };
const container = { padding: "0 0 32px", maxWidth: "600px" };
const header = { backgroundColor: "#05325a", padding: "24px 28px", marginBottom: "24px" };
const headerTitle = { color: "#ffffff", fontSize: "20px", fontWeight: 700 as const, margin: 0, letterSpacing: "0.04em" };
const headerSub = { color: "#cfd8e2", fontSize: "13px", margin: "4px 0 0" };
const h1 = { fontSize: "20px", fontWeight: 600 as const, color: "#05325a", margin: "0 28px 14px" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.6", margin: "0 28px 18px" };
const card = { margin: "0 28px 22px", padding: "16px 18px", border: "1px solid #e5e7eb", borderRadius: "8px", backgroundColor: "#f8f8f4" };
const rowText = { fontSize: "13px", color: "#3f3f46", lineHeight: "1.6", margin: "0 0 6px" };
const rowLabel = { color: "#697783", fontWeight: 600 as const };
const rowVal = { color: "#05325a", fontWeight: 600 as const };
const cta = { fontSize: "15px", margin: "0 28px 12px" };
const ctaLink = { color: "#05325a", fontWeight: 700 as const, textDecoration: "underline" };
const hr = { borderColor: "#e5e7eb", margin: "24px 28px" };
const disclaimer = { fontSize: "11px", color: "#697783", margin: "0 28px 14px", lineHeight: "1.6", fontStyle: "italic" as const };
const footerBox = { margin: "20px 28px 0", paddingTop: "16px", borderTop: "1px solid #e5e7eb" };
const footerStrong = { fontSize: "13px", color: "#05325a", fontWeight: 700 as const, margin: "0 0 2px" };
const footerSmall = { fontSize: "12px", color: "#697783", margin: "0 0 4px" };
const link = { color: "#05325a", textDecoration: "underline" };
