import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";

interface BookingConfirmationProps {
  name: string;
}

export function BookingConfirmation({ name }: BookingConfirmationProps) {
  return (
    <Html lang="bg">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Кайлас Йогалайф</Heading>
          <Section>
            <Text style={text}>Здравей {name},</Text>
            <Text style={text}>
              Благодарим за интереса! Получихме запитването ти и ще се свържем с
              теб в рамките на 24 часа, за да намерим най-подходящия ретрийт за теб.
            </Text>
            <Text style={text}>
              Ако имаш спешни въпроси, свържи се с нас на kailas.yogalife@gmail.com
              или +359 877 844 235.
            </Text>
          </Section>
          <Hr style={hr} />
          <Text style={footer}>Кайлас Йогалайф & Пракрити Йога</Text>
        </Container>
      </Body>
    </Html>
  );
}

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  borderRadius: "8px",
};

const heading = {
  color: "#1a1a1a",
  fontSize: "24px",
  fontWeight: "600",
  marginBottom: "24px",
};

const text = {
  color: "#333",
  fontSize: "16px",
  lineHeight: "24px",
  margin: "0 0 16px",
};

const hr = {
  borderColor: "#e2e8f0",
  margin: "24px 0",
};

const footer = {
  color: "#64748b",
  fontSize: "12px",
  margin: "0",
};
