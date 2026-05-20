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

const Email = ({ name, tierLabel = "Early Supporter", amountLabel = "$25" }: Props) => (
  <Html>
    <Head />
    <Preview>Gracias por apoyar la construcción temprana de G-Struct.</Preview>
    <Body style={body}>
      <Container style={container}>
        <Text style={eyebrow}>G-Structure · Launch Support</Text>
        <Text style={h1}>Gracias por apoyar la construcción temprana de G-Struct.</Text>
        <Text style={text}>
          {name ? `${name}, gracias` : "Gracias"} por convertirte en early supporter de G-Structure.
          Tu aporte ayuda a validar y construir G-Struct, una plataforma creada desde Ecuador para
          llevar a profesionales, founders y equipos de la fricción cognitiva a la ejecución
          estructurada.
        </Text>

        <Section style={box}>
          <Text style={{ ...text, marginBottom: "8px" }}>
            <strong>Nivel:</strong> {tierLabel}
          </Text>
          <Text style={{ ...text, marginBottom: 0 }}>
            <strong>Aporte:</strong> {amountLabel} USD
          </Text>
        </Section>

        <Text style={text}>
          Este apoyo no se toma como una donación informal ni como una inversión. Lo trataremos como
          parte de una etapa seria de validación: producto, workshop, herramientas, operación,
          aprendizajes con usuarios y preparación del MVP.
        </Text>
        <Text style={text}>
          También recibirás updates privados de rendición de cuentas sobre cómo se está usando el
          apoyo y qué estamos aprendiendo mientras G-Struct avanza hacia su lanzamiento.
        </Text>
        <Text style={text}>
          Si tienes alguna pregunta o quieres conversar directamente, puedes responder este email o
          escribir a{" "}
          <Link href="mailto:guillermo@g-structure.co" style={link}>
            guillermo@g-structure.co
          </Link>
          .
        </Text>

        <Hr style={{ borderColor: "#e5e7eb", margin: "26px 0" }} />
        <Text style={muted}>
          Nota de transparencia: este aporte no otorga equity, participación societaria, retorno
          financiero ni derechos de propiedad sobre G-Structure o G-Struct.
        </Text>
      </Container>
    </Body>
  </Html>
);

export const template = {
  component: Email,
  subject: "Gracias por apoyar la construcción temprana de G-Struct",
  displayName: "Support thank you",
  previewData: {
    name: "María",
    tierLabel: "Builder Supporter",
    amountLabel: "$50",
  },
};
