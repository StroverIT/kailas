import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { sendEventRegistrationEmails } from "@/lib/email";

function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay(); // 0 (Sun) - 6 (Sat)
  const diff = (day + 6) % 7; // days since Monday
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - diff);
  return d;
}

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const { scheduleEntryId, name, email, phone, note } = body as {
      scheduleEntryId?: string;
      name?: string;
      email?: string;
      phone?: string;
      note?: string;
    };

    if (!scheduleEntryId || !name || !email) {
      return NextResponse.json(
        { error: "Missing required fields: scheduleEntryId, name, email" },
        { status: 400 }
      );
    }

    const entry = await prisma.scheduleEntry.findUnique({
      where: { id: scheduleEntryId },
    });

    if (!entry) {
      return NextResponse.json(
        { error: "Schedule entry not found" },
        { status: 404 }
      );
    }

    const now = new Date();
    const weekStart = getWeekStart(now);
    const id = `c${Date.now().toString(36)}${Math.random().toString(36).slice(2, 11)}`;

    // Use raw SQL so this works even if the Prisma client delegate is missing (e.g. stale cache)
    await prisma.$executeRaw`
      INSERT INTO "ScheduleSignup" ("id", "scheduleEntryId", "name", "email", "phone", "note", "weekStart", "createdAt")
      VALUES (${id}, ${entry.id}, ${name}, ${email}, ${phone ?? null}, ${note ?? null}, ${weekStart}, ${now})
    `;

    const signup = {
      id,
      scheduleEntryId: entry.id,
      name,
      email,
      phone: phone ?? null,
      note: note ?? null,
      weekStart,
      createdAt: now,
    };

    // Reuse event registration emails for schedule signups
    await sendEventRegistrationEmails({
      userName: name,
      userEmail: email,
      phone,
      note,
      eventTitle: entry.title,
      eventDate: `${entry.day} ${entry.startTime}–${entry.endTime}`,
      eventLocation: "Кайлас база",
      eventTime: undefined,
    });

    return NextResponse.json(signup, { status: 201 });
  } catch (error) {
    console.error("POST /api/schedule-signups", error);
    return NextResponse.json(
      { error: "Failed to create signup" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Use raw SQL so this works even if the Prisma client delegate is missing
    const rows = await prisma.$queryRaw<
      Array<{
        id: string;
        scheduleEntryId: string;
        name: string;
        email: string;
        phone: string | null;
        note: string | null;
        weekStart: Date;
        createdAt: Date;
        entryTitle: string | null;
      }>
    >`
      SELECT s.*, e.title as "entryTitle"
      FROM "ScheduleSignup" s
      LEFT JOIN "ScheduleEntry" e ON e.id = s."scheduleEntryId"
      ORDER BY s."weekStart" DESC, s."createdAt" DESC
    `;

    const signups = rows.map((row) => ({
      id: row.id,
      scheduleEntryId: row.scheduleEntryId,
      name: row.name,
      email: row.email,
      phone: row.phone,
      note: row.note,
      weekStart: row.weekStart,
      createdAt: row.createdAt,
      scheduleEntry: row.entryTitle
        ? { id: row.scheduleEntryId, title: row.entryTitle, day: "", startTime: "", endTime: "" }
        : null,
    }));

    return NextResponse.json(signups);
  } catch (error) {
    console.error("GET /api/schedule-signups", error);
    return NextResponse.json(
      { error: "Failed to fetch schedule signups" },
      { status: 500 }
    );
  }
}

