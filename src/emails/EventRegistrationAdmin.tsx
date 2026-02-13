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

interface EventRegistrationAdminProps {
  name: string;
  email: string;
  phone?: string | null;
  note?: string | null;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
}

export function EventRegistrationAdmin({
  name,
  email,
  phone,
  note,
  eventTitle,
  eventDate,
  eventLocation,
}: EventRegistrationAdminProps) {
  return (
    <Html lang="bg">
      <Head />
      <Body style={main}>
        <Container style={container}>
          <Heading style={heading}>Нова регистрация за събитие</Heading>
          <Section>
            <Text style={subheading}>Детайли за събитието:</Text>
            <Text style={text}>
              <strong>{eventTitle}</strong>
            </Text>
            <Text style={text}>Дата: {eventDate}</Text>
            <Text style={text}>Място: {eventLocation}</Text>
          </Section>
          <Hr style={hr} />
          <Section>
            <Text style={subheading}>Данни на участника:</Text>
            <Text style={text}>Име: {name}</Text>
            <Text style={text}>Имейл: {email}</Text>
            {phone && (
              <Text style={text}>Телефон: {phone}</Text>
            )}
            {note && (
              <>
                <Text style={label}>Бележка:</Text>
                <Text style={text}>{note}</Text>
              </>
            )}
          </Section>
          <Hr style={hr} />
          <Text style={footer}>Кайлас Йогалайф – Админ панел</Text>
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
  fontSize: "20px",
  fontWeight: "600",
  marginBottom: "24px",
};

const subheading = {
  color: "#475569",
  fontSize: "14px",
  fontWeight: "600",
  marginBottom: "8px",
};

const text = {
  color: "#333",
  fontSize: "14px",
  lineHeight: "22px",
  margin: "0 0 8px",
};

const label = {
  color: "#64748b",
  fontSize: "12px",
  margin: "12px 0 4px",
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
