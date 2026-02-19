"use client";

import { useEffect, useMemo, useState } from "react";
import { Clock, Users } from "lucide-react";
import {
  allDays,
  type ScheduleEntry,
  groupScheduleByDay,
} from "@/lib/scheduleUtils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type ScheduleSignupForm = {
  name: string;
  email: string;
  phone: string;
  note: string;
};

const WeeklyScheduleSection = () => {
  const [entries, setEntries] = useState<ScheduleEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [signupEntry, setSignupEntry] = useState<ScheduleEntry | null>(null);
  const [signupOpen, setSignupOpen] = useState(false);
  const [signupForm, setSignupForm] = useState<ScheduleSignupForm>({
    name: "",
    email: "",
    phone: "",
    note: "",
  });
  const [signupError, setSignupError] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupSubmitted, setSignupSubmitted] = useState(false);

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

  const grouped = useMemo(() => groupScheduleByDay(entries), [entries]);

  const handleOpenSignup = (entry: ScheduleEntry) => {
    setSignupEntry(entry);
    setSignupOpen(true);
    setSignupSubmitted(false);
    setSignupError("");
  };

  const handleCloseSignup = () => {
    setSignupOpen(false);
    setTimeout(() => {
      setSignupEntry(null);
      setSignupForm({ name: "", email: "", phone: "", note: "" });
      setSignupError("");
      setSignupSubmitted(false);
    }, 300);
  };

  const handleSubmitSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupEntry) return;
    setSignupError("");
    setSignupLoading(true);
    try {
      const res = await fetch("/api/schedule-signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scheduleEntryId: signupEntry.id,
          name: signupForm.name,
          email: signupForm.email,
          phone: signupForm.phone || undefined,
          note: signupForm.note || undefined,
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Неуспешно записване");
      }
      setSignupSubmitted(true);
    } catch (err) {
      setSignupError(
        err instanceof Error ? err.message : "Неуспешно записване"
      );
    }
    setSignupLoading(false);
  };

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
                              className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between"
                            >
                              <div className="flex items-start gap-3">
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
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-xs sm:text-sm"
                                  onClick={() => handleOpenSignup(entry)}
                                >
                                  <Users className="w-3.5 h-3.5 mr-1" />
                                  Запиши се
                                </Button>
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
      <Dialog open={signupOpen} onOpenChange={handleCloseSignup}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              {signupEntry?.title ?? "Записване за практика"}
            </DialogTitle>
            <DialogDescription className="sr-only">
              Форма за записване за практика от седмичния график
            </DialogDescription>
          </DialogHeader>
          {signupSubmitted ? (
            <div className="flex flex-col items-center py-6 text-center gap-3">
              <p className="text-lg font-heading font-semibold text-foreground">
                Записването е успешно!
              </p>
              <p className="text-sm text-muted-foreground">
                Ще се свържем с теб на <strong>{signupForm.email}</strong> с
                допълнителна информация.
              </p>
              <Button onClick={handleCloseSignup} className="mt-2">
                Затвори
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitSignup} className="space-y-4">
              {signupError && (
                <p className="text-sm text-destructive">{signupError}</p>
              )}
              <div className="space-y-2">
                <Label htmlFor="schedule-name">Име *</Label>
                <Input
                  id="schedule-name"
                  required
                  value={signupForm.name}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, name: e.target.value })
                  }
                  placeholder="Вашето име"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule-email">Имейл *</Label>
                <Input
                  id="schedule-email"
                  type="email"
                  required
                  value={signupForm.email}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, email: e.target.value })
                  }
                  placeholder="email@example.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule-phone">Телефон</Label>
                <Input
                  id="schedule-phone"
                  type="tel"
                  value={signupForm.phone}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, phone: e.target.value })
                  }
                  placeholder="+359 ..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="schedule-note">Бележка</Label>
                <Textarea
                  id="schedule-note"
                  rows={2}
                  value={signupForm.note}
                  onChange={(e) =>
                    setSignupForm({ ...signupForm, note: e.target.value })
                  }
                  placeholder="Имате ли въпроси или специални изисквания?"
                />
              </div>
              <Button type="submit" className="w-full" disabled={signupLoading}>
                {signupLoading ? "Изпращане..." : "Запиши се"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default WeeklyScheduleSection;

