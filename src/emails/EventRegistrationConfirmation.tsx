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

interface EventRegistrationConfirmationProps {
  name: string;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventTime?: string | null;
}

export function EventRegistrationConfirmation({
  name,
  eventTitle,
  eventDate,
  eventLocation,
  eventTime,
}: EventRegistrationConfirmationProps) {
  return (
    <Html lang="bg">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Кайлас Йогалайф</Heading>
          <Section>
            <Text style={text}>Здравей {name},</Text>
            <Text style={text}>
              Записването ти за събитието е успешно! Ето детайлите:
            </Text>
            <Section style={details}>
              <Text style={label}>Събитие:</Text>
              <Text style={value}>{eventTitle}</Text>
              <Text style={label}>Дата:</Text>
              <Text style={value}>{eventDate}</Text>
              {eventTime && (
                <>
                  <Text style={label}>Час:</Text>
                  <Text style={value}>{eventTime}</Text>
                </>
              )}
              <Text style={label}>Място:</Text>
              <Text style={value}>{eventLocation}</Text>
            </Section>
            <Text style={text}>
              Ще се свържем с теб на по-късен етап с допълнителна информация.
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

const details = {
  backgroundColor: "#f8fafc",
  padding: "20px",
  borderRadius: "8px",
  margin: "16px 0",
};

const label = {
  color: "#64748b",
  fontSize: "12px",
  margin: "8px 0 2px",
};

const value = {
  color: "#1a1a1a",
  fontSize: "14px",
  margin: "0 0 12px",
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
