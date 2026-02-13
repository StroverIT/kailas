import nodemailer from "nodemailer";
import { render } from "@react-email/components";
import { EventRegistrationConfirmation } from "@/emails/EventRegistrationConfirmation";
import { EventRegistrationAdmin } from "@/emails/EventRegistrationAdmin";
import { BookingConfirmation } from "@/emails/BookingConfirmation";
import { BookingAdmin } from "@/emails/BookingAdmin";

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const refreshToken = process.env.REFRESH_TOKEN;

  if (!user || !clientId || !clientSecret || !refreshToken) return null;

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      clientId,
      clientSecret,
      refreshToken,
    },
  });
}

const adminEmail = process.env.NEXT_PUBLIC_EMAIL ?? process.env.ADMIN_EMAIL;

export async function sendEventRegistrationEmails({
  userName,
  userEmail,
  phone,
  note,
  eventTitle,
  eventDate,
  eventLocation,
  eventTime,
}: {
  userName: string;
  userEmail: string;
  phone?: string | null;
  note?: string | null;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  eventTime?: string | null;
}) {
  const transporter = getTransporter();
  if (!transporter) return;

  const from = `Kailas <${process.env.GMAIL_USER}>`;

  const promises: Promise<unknown>[] = [];

  const userHtml = await render(
    EventRegistrationConfirmation({
      name: userName,
      eventTitle,
      eventDate,
      eventLocation,
      eventTime,
    })
  );

  promises.push(
    transporter.sendMail({
      from,
      to: userEmail,
      subject: `Потвърждение за запис – ${eventTitle}`,
      html: userHtml,
    })
  );

  if (adminEmail) {
    const adminHtml = await render(
      EventRegistrationAdmin({
        name: userName,
        email: userEmail,
        phone,
        note,
        eventTitle,
        eventDate,
        eventLocation,
      })
    );

    promises.push(
      transporter.sendMail({
        from,
        to: adminEmail,
        subject: `[Кайлас] Нова регистрация – ${eventTitle} – ${userName}`,
        html: adminHtml,
      })
    );
  }

  await Promise.allSettled(promises);
}

export async function sendBookingEmails({
  name,
  email,
  phone,
  message,
}: {
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
}) {
  const transporter = getTransporter();
  if (!transporter) return;

  const from = `Kailas <${process.env.GMAIL_USER}>`;

  const promises: Promise<unknown>[] = [];

  const userHtml = await render(BookingConfirmation({ name }));

  promises.push(
    transporter.sendMail({
      from,
      to: email,
      subject: "Получихме запитването ти – Кайлас Йогалайф",
      html: userHtml,
    })
  );

  if (adminEmail) {
    const adminHtml = await render(
      BookingAdmin({ name, email, phone, message })
    );

    promises.push(
      transporter.sendMail({
        from,
        to: adminEmail,
        subject: `[Кайлас] Ново запитване за резервация – ${name}`,
        html: adminHtml,
      })
    );
  }

  await Promise.allSettled(promises);
}
