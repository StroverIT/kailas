"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import EventRegistrationModal from "./EventRegistrationModal";

gsap.registerPlugin(ScrollTrigger);

export type Event = {
  id: string;
  date: string;
  title: string;
  type: string;
  location: string;
  spots: number;
  description: string;
  time?: string | null;
  duration?: string | null;
  month: string;
};

const months = [
  { key: "all", label: "Всички" },
  { key: "mar", label: "Март" },
  { key: "apr", label: "Април" },
  { key: "may", label: "Май" },
  { key: "jun", label: "Юни" },
  { key: "jul", label: "Юли" },
  { key: "aug", label: "Август" },
  { key: "sep", label: "Септември" },
  { key: "oct", label: "Октомври" },
  { key: "nov", label: "Ноември" },
  { key: "dec", label: "Декември" },
];

const typeColors: Record<string, string> = {
  "Уикенд ретрийт": "bg-secondary/15 text-secondary",
  "Тематичен уикенд": "bg-primary/10 text-primary",
  "Еднодневно събитие": "bg-accent/30 text-accent-foreground",
  "Трансформационен ретрийт": "bg-secondary/20 text-secondary",
  "Открита практика": "bg-green-100 text-green-800",
  "Уикенд практика": "bg-primary/10 text-primary",
  "Уикенд уъркшоп": "bg-primary/10 text-primary",
};

const EventsSection = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeMonth, setActiveMonth] = useState("all");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/events");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setEvents(data);
      } catch {
        setError("Неуспешно зареждане на събития.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const filtered = activeMonth === "all" ? events : events.filter((e) => e.month === activeMonth);

  useEffect(() => {
    if (loading || error) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%" },
        }
      );
      gsap.fromTo(
        filterRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: filterRef.current, start: "top 90%" },
        }
      );
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, error, filtered.length]);

  return (
    <section ref={sectionRef} id="events" className="section-padding bg-background">
      <div className="container mx-auto max-w-6xl">
        <div ref={headerRef} className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            Календар 2026
          </p>
          <h2 className="section-heading mb-6">Предстоящи събития и практики</h2>
          <p className="section-subheading mx-auto">
            Присъедини се към нашите ретрийти, уъркшопи и уикенд практики в сърцето на планината.
          </p>
        </div>

        <div ref={filterRef} className="flex flex-wrap justify-center gap-2 mb-8">
          {months.map((m) => (
            <button
              key={m.key}
              onClick={() => setActiveMonth(m.key)}
              className={cn(
                "rounded-full px-5 py-2 text-sm font-body transition-colors",
                activeMonth === m.key
                  ? "bg-secondary text-secondary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        {loading && (
          <p className="text-center text-muted-foreground py-12">Зареждане...</p>
        )}
        {error && (
          <p className="text-center text-destructive py-12">{error}</p>
        )}
        {!loading && !error && (
          <div ref={gridRef} className="grid sm:grid-cols-2 gap-5">
            {filtered.map((e, i) => (
              <div
                key={e.id}
                ref={(el) => { cardRefs.current[i] = el; }}
                className="glass-card p-6 lg:p-7 hover-lift group flex flex-col"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full font-body ${typeColors[e.type] || "bg-muted text-muted-foreground"}`}
                  >
                    {e.type}
                  </span>
                  {e.spots <= 14 && (
                    <span className="text-xs font-body text-destructive font-medium">
                      Ограничени места
                    </span>
                  )}
                </div>

                <p className="font-heading text-secondary text-lg font-semibold mb-1">
                  {e.date}
                </p>
                <h3 className="font-heading text-xl font-semibold text-foreground mb-3">
                  {e.title}
                </h3>
                <p className="text-sm text-muted-foreground font-body mb-4 leading-relaxed flex-1">
                  {e.description}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground font-body mb-5">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" />
                    {e.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5" />
                    {e.spots} места
                  </span>
                  {e.time && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {e.time}
                    </span>
                  )}
                  {e.duration && (
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {e.duration}
                    </span>
                  )}
                </div>

                <Button
                  variant="default"
                  size="sm"
                  className="w-full group/btn"
                  onClick={() => setSelectedEvent(e)}
                >
                  Запази място
                  <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover/btn:translate-x-1" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-muted-foreground font-body py-12">
            Няма планирани събития за този месец. Следете ни за актуализации!
          </p>
        )}
      </div>

      <EventRegistrationModal
        event={selectedEvent}
        open={!!selectedEvent}
        onOpenChange={(open) => !open && setSelectedEvent(null)}
      />
    </section>
  );
};

export default EventsSection;
