import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendBookingEmails } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: name, email" },
        { status: 400 }
      );
    }

    const inquiry = await prisma.bookingInquiry.create({
      data: {
        name: String(name),
        email: String(email),
        phone: phone != null ? String(phone) : null,
        message: message != null ? String(message) : null,
      },
    });

    if (process.env.CLIENT_ID && process.env.REFRESH_TOKEN) {
      try {
        await sendBookingEmails({
          name: String(name),
          email: String(email),
          phone: phone != null ? String(phone) : null,
          message: message != null ? String(message) : null,
        });
      } catch (err) {
        console.error("Failed to send booking emails:", err);
      }
    }

    return NextResponse.json(inquiry);
  } catch (error) {
    console.error("POST /api/booking", error);
    return NextResponse.json(
      { error: "Failed to submit inquiry" },
      { status: 500 }
    );
  }
}
