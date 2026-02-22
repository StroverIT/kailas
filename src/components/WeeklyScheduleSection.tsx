"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Clock, Users } from "lucide-react";
import {
  allDays,
  type ScheduleEntry,
  groupScheduleByDay,
} from "@/lib/scheduleUtils";
import { revealConfig } from "@/lib/animationConfig";
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
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";

gsap.registerPlugin(ScrollTrigger);

type ScheduleSignupForm = {
  name: string;
  email: string;
  phone: string;
  note: string;
};

const WeeklyScheduleSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
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

  // Recalculate ScrollTrigger positions after schedule content loads (fixes production
  // bug where sections below only reveal near bottom due to layout settling late).
  useEffect(() => {
    if (loading) return;
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
    return () => cancelAnimationFrame(raf);
  }, [loading]);

  const grouped = useMemo(() => groupScheduleByDay(entries), [entries]);

  useEffect(() => {
    if (loading) return;
    cardRefs.current = cardRefs.current.slice(0, allDays.length);
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.fromTo(
          headerRef.current,
          { opacity: 0, y: revealConfig.y.header },
          {
            opacity: 1,
            y: 0,
            duration: revealConfig.duration.header,
            ease: revealConfig.ease,
            scrollTrigger: {
              trigger: headerRef.current,
              start: revealConfig.start,
            },
          },
        );
      }
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: revealConfig.y.card },
          {
            opacity: 1,
            y: 0,
            duration: revealConfig.duration.card,
            delay: i * revealConfig.stagger,
            ease: revealConfig.ease,
            scrollTrigger: {
              trigger: listRef.current ?? card,
              start: revealConfig.startContent,
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loading]);

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
        err instanceof Error ? err.message : "Неуспешно записване",
      );
    }
    setSignupLoading(false);
  };

  return (
    <section
      ref={sectionRef}
      id="schedule"
      className="section-padding bg-gradient-section"
    >
      <div className="container mx-auto max-w-5xl">
        <div ref={headerRef} className="text-center mb-14">
          <h2 className="section-heading mb-4">
            Актуален график на практиките
          </h2>
          <div className="w-16 h-1 bg-secondary mx-auto mb-4" />
          <p className="section-subheading mx-auto">
            Седмична програма на редовните практики в{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-light">
              Кайлас
            </span>
          </p>
        </div>

        {loading ? (
          <div className="space-y-3">
            {allDays.map((day) => (
              <div
                key={day}
                className="rounded-xl border border-border overflow-hidden bg-card"
              >
                <div className="p-3 md:p-4 md:flex md:items-start md:gap-4">
                  <Skeleton className="h-5 w-24 mb-3 md:mb-0 md:w-40 md:shrink-0" />
                  <div className="space-y-2 md:flex-1">
                    <Skeleton className="h-4 w-full max-w-[280px]" />
                    <Skeleton className="h-4 w-full max-w-[240px]" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div ref={listRef} className="space-y-3">
            {allDays.map((day, i) => {
              const entriesForDay = grouped[day] ?? [];
              const hasEntries = entriesForDay.length > 0;

              return (
                <div
                  key={day}
                  ref={(el) => {
                    cardRefs.current[i] = el;
                  }}
                  className={`rounded-xl border border-border overflow-hidden ${
                    hasEntries ? "bg-card" : "bg-muted/30"
                  }`}
                >
                  {/* Mobile Layout */}
                  <div className="p-3 md:hidden">
                    <div className="mb-3">
                      <span
                        className={`font-heading text-base font-semibold ${
                          hasEntries ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {day}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {hasEntries ? (
                        entriesForDay.map((entry) => (
                          <div
                            key={entry.id}
                            className="flex flex-col gap-2.5 pb-3 last:pb-0 border-b last:border-b-0 border-border/50"
                          >
                            <div className="flex items-center gap-1.5 text-secondary">
                              <Clock className="w-4 h-4 shrink-0" />
                              <span className="text-sm font-medium">
                                {entry.startTime} – {entry.endTime}
                              </span>
                            </div>

                            <div className="flex flex-col gap-1">
                              <span className="text-sm font-medium text-foreground">
                                {entry.title}
                              </span>
                              {entry.description && (
                                <span className="text-xs text-muted-foreground">
                                  {entry.description}
                                </span>
                              )}
                            </div>

                            <div className="flex items-center pt-1">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-xs w-full"
                                onClick={() => handleOpenSignup(entry)}
                              >
                                <Users className="w-3.5 h-3.5 mr-1.5" />
                                Запиши се
                              </Button>
                            </div>
                          </div>
                        ))
                      ) : (
                        <span className="text-sm text-muted-foreground italic">
                          Няма планирани практики
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-start gap-4 p-5">
                    <div className="w-40 shrink-0">
                      <span
                        className={`font-heading text-base font-semibold ${
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
                              className="flex items-center justify-between gap-4"
                            >
                              <div className="flex items-start gap-3">
                                <div className="flex items-center gap-1.5 text-secondary shrink-0 mt-0.5">
                                  <Clock className="w-3.5 h-3.5" />
                                  <span className="text-sm font-medium whitespace-nowrap">
                                    {entry.startTime} – {entry.endTime}
                                  </span>
                                </div>
                                <div>
                                  <span className="text-base font-medium text-foreground">
                                    {entry.title}
                                  </span>
                                  {entry.description && (
                                    <span className="text-sm text-muted-foreground ml-2">
                                      ({entry.description})
                                    </span>
                                  )}
                                </div>
                              </div>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-sm shrink-0"
                                onClick={() => handleOpenSignup(entry)}
                              >
                                <Users className="w-3.5 h-3.5 mr-1" />
                                Запиши се
                              </Button>
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
