import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/db";

export type EmailEntry = {
  id: string;
  email: string;
  name?: string | null;
  source: "lead_magnet" | "booking" | "registration";
  status?: string | null;
  eventTitle?: string | null;
  createdAt: string;
};

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const [leadMagnetSignups, bookingInquiries, registrations] = await Promise.all([
      prisma.leadMagnetSignup.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.bookingInquiry.findMany({
        orderBy: { createdAt: "desc" },
      }),
      prisma.registration.findMany({
        orderBy: { createdAt: "desc" },
        include: { event: true },
      }),
    ]);

    const leadMagnetEntries: EmailEntry[] = leadMagnetSignups.map((s) => ({
      id: s.id,
      email: s.email,
      name: null,
      source: "lead_magnet",
      status: s.status,
      eventTitle: null,
      createdAt: s.createdAt.toISOString(),
    }));

    const bookingEntries: EmailEntry[] = bookingInquiries.map((b) => ({
      id: b.id,
      email: b.email,
      name: b.name,
      source: "booking",
      status: null,
      eventTitle: null,
      createdAt: b.createdAt.toISOString(),
    }));

    const registrationEntries: EmailEntry[] = registrations.map((r) => ({
      id: r.id,
      email: r.email,
      name: r.name,
      source: "registration",
      status: null,
      eventTitle: r.event.title,
      createdAt: r.createdAt.toISOString(),
    }));

    const allEmails: EmailEntry[] = [
      ...leadMagnetEntries,
      ...bookingEntries,
      ...registrationEntries,
    ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return NextResponse.json(allEmails);
  } catch (error) {
    console.error("GET /api/emails", error);
    return NextResponse.json(
      { error: "Failed to fetch emails" },
      { status: 500 }
    );
  }
}
