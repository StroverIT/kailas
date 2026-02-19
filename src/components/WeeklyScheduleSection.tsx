"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock } from "lucide-react";
import {
  allDays,
  type ScheduleEntry,
  groupScheduleByDay,
} from "@/lib/scheduleUtils";

const WeeklyScheduleSection = () => {
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const res = await fetch("/api/schedule");
        if (!res.ok) {
          throw new Error("Failed to load schedule");
        }
        const data = (await res.json()) as ScheduleEntry[];
        if (isMounted) {
          setEntries(Array.isArray(data) ? data : []);
        }
      } catch {
        if (isMounted) {
          setEntries([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  const grouped = useMemo(
    () => groupScheduleByDay(entries),
    [entries]
  );

  return (
    <section id="schedule" className="section-padding bg-gradient-section">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-14">
          <h2 className="section-heading mb-4">Актуален график на практиките</h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-4" />
          <p className="section-subheading mx-auto">
            Седмична програма на редовните практики в Кайлас
          </p>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">
            Зареждане на графика...
          </p>
        ) : (
          <div className="space-y-3">
            {allDays.map((day) => {
              const entriesForDay = grouped[day] ?? [];
              const hasEntries = entriesForDay.length > 0;

              return (
                <div
                  key={day}
                  className={`rounded-xl border border-border overflow-hidden ${
                    hasEntries ? "bg-card" : "bg-muted/30"
                  }`}
                >
                  <div className="flex items-start gap-4 p-4 md:p-5">
                    <div className="w-32 md:w-40 shrink-0">
                      <span
                        className={`font-heading text-sm md:text-base font-semibold ${
                          hasEntries ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {day}
                      </span>
                    </div>

                    <div className="flex-1">
                      {hasEntries ? (
                        <div className="space-y-3">
                          {entriesForDay.map((entry) => (
                            <div
                              key={entry.id}
                              className="flex items-start gap-3"
                            >
                              <div className="flex items-center gap-1.5 text-secondary shrink-0 mt-0.5">
                                <Clock className="w-3.5 h-3.5" />
                                <span className="text-sm font-medium whitespace-nowrap">
                                  {entry.startTime} – {entry.endTime}
                                </span>
                              </div>
                              <div>
                                <span className="text-sm md:text-base font-medium text-foreground">
                                  {entry.title}
                                </span>
                                {entry.description && (
                                  <span className="text-sm text-muted-foreground ml-2">
                                    ({entry.description})
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground italic">
                          Няма планирани практики
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default WeeklyScheduleSection;

