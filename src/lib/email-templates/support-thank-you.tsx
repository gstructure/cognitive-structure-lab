import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";

interface Props {
  name?: string;
  tierLabel?: string;
  amountLabel?: string;
  locale?: "es" | "en";
}

const body = {
  backgroundColor: "#f8f8f4",
  fontFamily: "Montserrat, Arial, sans-serif",
  margin: 0,
  padding: "32px 16px",
};

const container = {
  backgroundColor: "#ffffff",
  border: "1px solid #e5e7eb",
  maxWidth: "600px",
  padding: "32px",
};

const eyebrow = {
  color: "#697783",
  fontSize: "11px",
  fontWeight: 700,
  letterSpacing: "0.08em",
  margin: "0 0 12px",
  textTransform: "uppercase" as const,
};

const h1 = {
  color: "#05325a",
  fontSize: "26px",
  lineHeight: "1.25",
  margin: "0 0 18px",
};

const text = {
  color: "#26323b",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 16px",
};

const muted = {
  color: "#697783",
  fontSize: "13px",
  lineHeight: "1.6",
  margin: "0",
};

const box = {
  backgroundColor: "#f8f8f4",
  border: "1px solid #e5e7eb",
  padding: "18px",
  margin: "22px 0",
};

const link = {
  color: "#05325a",
  fontWeight: 700,
  textDecoration: "underline",
};

const SUBJECT = {
  es: "Gracias por apoyar la construcción temprana de G-Frame",
  en: "Thank you for supporting the early construction of G-Frame",
};

const COPY = {
  es: {
    preview: "Gracias por apoyar la construcción temprana de G-Frame.",
    title: "Gracias por apoyar la construcción temprana de G-Frame.",
    greeting: (name?: string) => `${name ? `${name}, gracias` : "Gracias"} por convertirte en early supporter de G-Structure.`,
    intro:
      "Tu aporte ayuda a validar y construir G-Frame, una plataforma creada desde Ecuador para llevar a profesionales, founders y equipos de la fricción cognitiva a la ejecución estructurada.",
    tier: "Nivel",
    amount: "Aporte",
    use:
      "Este apoyo no se toma como una donación informal ni como una inversión. Lo trataremos como parte de una etapa seria de validación: producto, workshop, herramientas, operación, aprendizajes con usuarios y preparación del MVP.",
    accountability:
      "También recibirás updates privados de rendición de cuentas sobre cómo se está usando el apoyo y qué estamos aprendiendo mientras G-Frame avanza hacia su lanzamiento.",
    contactBefore: "Si tienes alguna pregunta o quieres conversar directamente, puedes responder este email o escribir a ",
    transparency:
      "Nota de transparencia: este aporte no otorga equity, participación societaria, retorno financiero ni derechos de propiedad sobre G-Structure o G-Frame.",
  },
  en: {
    preview: "Thank you for supporting the early construction of G-Frame.",
    title: "Thank you for supporting the early construction of G-Frame.",
    greeting: (name?: string) => `${name ? `${name}, thank you` : "Thank you"} for becoming an early supporter of G-Structure.`,
    intro:
      "Your contribution helps validate and build G-Frame, a platform created from Ecuador to move professionals, founders, and teams from cognitive friction to structured execution.",
    tier: "Tier",
    amount: "Contribution",
    use:
      "This support is not treated as an informal donation or as an investment. We will treat it as part of a serious validation stage: product, workshop, tools, operations, user learning, and MVP preparation.",
    accountability:
      "You will also receive private accountability updates on how early support is being used and what we are learning as G-Frame moves toward launch.",
    contactBefore: "If you have any questions or want to speak directly, you can reply to this email or write to ",
    transparency:
      "Transparency note: this contribution does not grant equity, company participation, financial return, or ownership rights over G-Structure or G-Frame.",
  },
};

const Email = ({ name, tierLabel = "Early Supporter", amountLabel = "$25", locale = "es" }: Props) => {
  const copy = COPY[locale];

  return (
    <Html>
      <Head />
      <Preview>{copy.preview}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={eyebrow}>G-Structure · Launch Support</Text>
          <Text style={h1}>{copy.title}</Text>
          <Text style={text}>
            {copy.greeting(name)} {copy.intro}
          </Text>

          <Section style={box}>
            <Text style={{ ...text, marginBottom: "8px" }}>
              <strong>{copy.tier}:</strong> {tierLabel}
            </Text>
            <Text style={{ ...text, marginBottom: 0 }}>
              <strong>{copy.amount}:</strong> {amountLabel} USD
            </Text>
          </Section>

          <Text style={text}>{copy.use}</Text>
          <Text style={text}>{copy.accountability}</Text>
          <Text style={text}>
            {copy.contactBefore}
            <Link href="mailto:guillermo@g-structure.co" style={link}>
              guillermo@g-structure.co
            </Link>
            .
          </Text>

          <Hr style={{ borderColor: "#e5e7eb", margin: "26px 0" }} />
          <Text style={muted}>{copy.transparency}</Text>
        </Container>
      </Body>
    </Html>
  );
};

export const template = {
  component: Email,
  subject: (data: Record<string, any>) => SUBJECT[data.locale === "en" ? "en" : "es"],
  displayName: "Support thank you",
  previewData: {
    name: "Maria",
    tierLabel: "Builder Supporter",
    amountLabel: "$50",
    locale: "en",
  },
};
