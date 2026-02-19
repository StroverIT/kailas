export type ScheduleEntry = {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  title: string;
  description?: string | null;
};

export const allDays: string[] = [
  "Понеделник",
  "Вторник",
  "Сряда",
  "Четвъртък",
  "Петък",
  "Събота",
  "Неделя",
];

export function groupScheduleByDay(
  entries: ScheduleEntry[]
): Record<string, ScheduleEntry[]> {
  const grouped: Record<string, ScheduleEntry[]> = {};

  for (const day of allDays) {
    grouped[day] = [];
  }

  for (const entry of entries) {
    if (!grouped[entry.day]) {
      grouped[entry.day] = [];
    }
    grouped[entry.day].push(entry);
  }

  for (const day of Object.keys(grouped)) {
    grouped[day].sort((a, b) => a.startTime.localeCompare(b.startTime));
  }

  return grouped;
}

