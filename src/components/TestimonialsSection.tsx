"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

function useCalmCarousel() {
  const [active, setActiveState] = useState(0);
  const slideRefs = useRef<(HTMLDivElement | null)[]>([]);

  const goTo = (index: number) => {
    if (index === active) return;
    const outgoing = slideRefs.current[active];
    const incoming = slideRefs.current[index];
    if (outgoing && incoming) {
      gsap.to(outgoing, {
        opacity: 0,
        scale: 0.98,
        duration: 0.4,
        ease: "power2.in",
      });
      gsap.fromTo(
        incoming,
        { opacity: 0, scale: 1.02 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => setActiveState(index),
        }
      );
    } else {
      setActiveState(index);
    }
  };

  return { active, goTo, slideRefs };
}

const testimonials = [
  {
    quote:
      "Невероятно място за вътрешен мир. Първият ми ретрийт беше предизвикателство, но напуснах с чувство за пълно обновяване.",
    author: "Мария И.",
    role: "Участвала в ретрийт през май 2025",
  },
  {
    quote:
      "Кайлас е магическо място – планината, практиките, хората. Препоръчвам на всеки, който търси истинска йога опитност.",
    author: "Димитър П.",
    role: "Редовен участник",
  },
  {
    quote:
      "Тук времето наистина спира. Йога Нидра с Мариана беше едно от най-дълбоките преживявания в живота ми.",
    author: "Елена К.",
    role: "Първа практика на място",
  },
];

export default function TestimonialsSection() {
  const { active, goTo, slideRefs } = useCalmCarousel();

  const next = () => goTo((active + 1) % testimonials.length);
  const prev = () => goTo((active - 1 + testimonials.length) % testimonials.length);

  return (
    <section className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            Отзиви
          </p>
          <h2 className="section-heading mb-6">Какво казват участниците</h2>
        </div>

        <div className="relative min-h-[200px]">
          {testimonials.map((t, i) => (
            <div
              key={i}
              ref={(el) => {
                slideRefs.current[i] = el;
              }}
              className={`absolute inset-0 flex flex-col items-center justify-center text-center ${
                i === active ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
              }`}
            >
              <Quote className="w-10 h-10 text-secondary/50 mb-4" />
              <blockquote className="font-heading text-xl md:text-2xl italic text-foreground/90 mb-6 leading-relaxed">
                {t.quote}
              </blockquote>
              <footer>
                <cite className="font-body font-semibold text-foreground not-italic">
                  {t.author}
                </cite>
                <p className="text-sm text-muted-foreground font-body mt-1">{t.role}</p>
              </footer>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-4 mt-8">
          <button
            onClick={prev}
            className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
            aria-label="Предишен отзив"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex gap-2 items-center">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === active ? "bg-secondary scale-125" : "bg-muted-foreground/40"
                }`}
                aria-label={`Отзив ${i + 1}`}
              />
            ))}
          </div>
          <button
            onClick={next}
            className="w-12 h-12 rounded-full border border-border bg-background hover:bg-muted transition-colors flex items-center justify-center"
            aria-label="Следващ отзив"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
