import * as React from "react";
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text, Link, Button,
} from "@react-email/components";
import type { TemplateEntry } from "./registry";

interface Props {
  name?: string;
  packageName?: string;
  slotLabel?: string;
  priceLabel?: string;
  depositLabel?: string;
  bank?: { bank: string; accountType: string; accountNumber: string; holder: string; idNumber: string };
  contact?: { email: string; whatsappNumber: string; whatsappLink: string; whatsappReceiptLink: string };
}

const Email = ({ name, packageName, slotLabel, priceLabel, depositLabel, bank, contact }: Props) => (
  <Html lang="es" dir="ltr">
    <Head />
    <Preview>Solicitud de reserva recibida — pendiente de pago</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>{name ? `Hola, ${name}.` : "Hola."}</Heading>
        <Text style={text}>Hemos recibido tu solicitud de reserva.</Text>

        <Section style={card}>
          <Text style={cardLabel}>Servicio</Text>
          <Text style={cardValue}>{packageName ?? "—"}</Text>
          <Hr style={hr} />
          <Text style={cardLabel}>Fecha y hora</Text>
          <Text style={cardValue}>{slotLabel ?? "—"}</Text>
          <Text style={muted}>Zona horaria: Ecuador (UTC−5)</Text>
          {priceLabel ? (<><Hr style={hr} /><Text style={cardLabel}>Inversión total</Text><Text style={cardValue}>{priceLabel}</Text></>) : null}
          <Hr style={hr} />
          <Text style={cardLabel}>Estado</Text>
          <Text style={statusValue}>Pendiente de pago</Text>
        </Section>

        <Heading as="h2" style={h2}>Confirmación de la reserva</Heading>
        <Text style={text}>
          Para confirmar el espacio, se requiere el pago del anticipo
          {depositLabel ? <> correspondiente a <strong>{depositLabel}</strong></> : <> del 50% del valor del servicio</>}{" "}
          mediante transferencia bancaria.
        </Text>

        <Heading as="h2" style={h2}>Datos para la transferencia</Heading>
        <Section style={bankBox}>
          <Row label="Banco" value={bank?.bank ?? ""} />
          <Row label="Tipo de cuenta" value={bank?.accountType ?? ""} />
          <Row label="Número de cuenta" value={bank?.accountNumber ?? ""} />
          <Row label="Titular" value={bank?.holder ?? ""} />
          <Row label="Identificación" value={bank?.idNumber ?? ""} />
        </Section>

        <Heading as="h2" style={h2}>Envío del comprobante</Heading>
        <Text style={text}>
          Una vez realizada la transferencia, envía el comprobante a:
        </Text>
        <Text style={text}>
          Email: <Link href={`mailto:${contact?.email}`} style={link}>{contact?.email}</Link>
          <br />
          WhatsApp: <Link href={contact?.whatsappLink} style={link}>{contact?.whatsappNumber}</Link>
        </Text>
        {contact?.whatsappReceiptLink ? (
          <Section style={{ textAlign: "center", margin: "20px 0" }}>
            <Button href={contact.whatsappReceiptLink} style={button}>
              Enviar comprobante por WhatsApp
            </Button>
          </Section>
        ) : null}

        <Heading as="h2" style={h2}>Datos para factura</Heading>
        <Text style={text}>
          Junto con el comprobante, envía los siguientes datos:
        </Text>
        <Text style={list}>
          • Nombre o razón social<br />
          • Cédula / RUC<br />
          • Dirección<br />
          • Teléfono<br />
          • Email<br />
          • Servicio reservado
        </Text>

        <Section style={notice}>
          <Text style={noticeText}>
            <strong>Importante:</strong> la reserva será confirmada únicamente después
            de validar el pago del anticipo. Recibirás un segundo correo cuando tu
            reserva haya sido confirmada oficialmente.
          </Text>
        </Section>

        <Text style={footer}>
          Gracias por tu interés en G-Structure.
          <br /><br />
          G-Structure<br />
          Ingeniería de resultados cognitivo-conductuales<br />
          <Link href="https://www.g-structure.co" style={link}>www.g-structure.co</Link>
        </Text>
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
  component: Email,
  subject: () => "Solicitud de reserva recibida | G-Structure",
  displayName: "Booking — Solicitud recibida",
  previewData: {
    name: "María",
    packageName: "REESTRUCTURA 1:1 — Reencuadre (6 sesiones)",
    slotLabel: "lunes, 18 de mayo de 2026, 10:00",
    priceLabel: "USD 285",
    depositLabel: "USD 143 (50% de USD 285)",
    bank: {
      bank: "Banco Bolivariano", accountType: "Cuenta de ahorros",
      accountNumber: "1821134449", holder: "José Guillermo Suco Gómez", idNumber: "0918718834",
    },
    contact: {
      email: "guillermo@g-structure.co", whatsappNumber: "+593986875121",
      whatsappLink: "https://wa.me/593986875121",
      whatsappReceiptLink: "https://wa.me/593986875121?text=Hola",
    },
  },
} satisfies TemplateEntry;

const main = { backgroundColor: "#ffffff", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif" };
const container = { padding: "32px 28px", maxWidth: "600px" };
const h1 = { fontSize: "22px", fontWeight: 600, color: "#0a0a0a", margin: "0 0 12px" };
const h2 = { fontSize: "14px", fontWeight: 600, color: "#0a0a0a", margin: "26px 0 10px", textTransform: "uppercase" as const, letterSpacing: "0.06em" };
const text = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.65", margin: "0 0 14px" };
const list = { fontSize: "14px", color: "#3f3f46", lineHeight: "1.9", margin: "0 0 14px" };
const card = { border: "1px solid #e5e7eb", padding: "18px 20px", margin: "16px 0" };
const bankBox = { border: "1px solid #0a0a0a", padding: "18px 20px", margin: "8px 0 16px", backgroundColor: "#fafafa" };
const cardLabel = { fontSize: "11px", textTransform: "uppercase" as const, letterSpacing: "0.06em", color: "#6b7280", margin: "0 0 3px" };
const cardValue = { fontSize: "15px", color: "#0a0a0a", fontWeight: 500, margin: "0 0 4px" };
const statusValue = { fontSize: "15px", color: "#b45309", fontWeight: 600, margin: "0" };
const muted = { fontSize: "12px", color: "#6b7280", margin: "0" };
const hr = { borderColor: "#e5e7eb", margin: "12px 0" };
const link = { color: "#0a0a0a", textDecoration: "underline" };
const button = { backgroundColor: "#0a0a0a", color: "#ffffff", padding: "12px 22px", fontSize: "14px", fontWeight: 600, textDecoration: "none", display: "inline-block" };
const notice = { border: "1px solid #e5e7eb", borderLeft: "3px solid #0a0a0a", padding: "14px 16px", margin: "20px 0", backgroundColor: "#fafafa" };
const noticeText = { fontSize: "13px", color: "#0a0a0a", lineHeight: "1.6", margin: 0 };
const footer = { fontSize: "13px", color: "#6b7280", margin: "32px 0 0", lineHeight: "1.6" };
