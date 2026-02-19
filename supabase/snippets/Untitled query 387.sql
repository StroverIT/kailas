CREATE TABLE IF NOT EXISTS "ScheduleSignup" (
  "id" text PRIMARY KEY,
  "scheduleEntryId" text NOT NULL,
  "name" text NOT NULL,
  "email" text NOT NULL,
  "phone" text,
  "note" text,
  "weekStart" timestamp(3) NOT NULL,
  "createdAt" timestamp(3) NOT NULL DEFAULT now(),
  CONSTRAINT "ScheduleSignup_scheduleEntry_fkey"
    FOREIGN KEY ("scheduleEntryId") REFERENCES "ScheduleEntry"("id") ON DELETE CASCADE
);