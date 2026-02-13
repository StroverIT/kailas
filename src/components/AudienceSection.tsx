"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Briefcase, Compass, Sprout } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const audiences = [
  {
    icon: Briefcase,
    title: "Претовареният професионалист",
    description: "Върни си съня и устойчивостта на стрес. Намери баланс между работа и вътрешен мир чрез доказани техники за дълбока релаксация.",
    benefits: ["По-добър сън", "Управление на стреса", "Повече енергия"],
  },
  {
    icon: Compass,
    title: "Търсещият дух",
    description: "Потопи се в мантра джапа и сатсанг сред природата. Открий автентичния път на ведическата традиция в тишината на планината.",
    benefits: ["Духовни практики", "Ведически ритуали", "Сатсанг"],
  },
  {
    icon: Sprout,
    title: "Начинаещият",
    description: "Намери сигурна среда за първите си стъпки в йога – онлайн или на място. Опитни учители ще те въведат нежно в практиката.",
    benefits: ["Основи на йога", "Онлайн и на място", "Подкрепяща среда"],
  },
];

const AudienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
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
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-gradient-section">
      <div className="container mx-auto max-w-6xl">
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">За кого е това?</p>
          <h2 className="section-heading mb-6">Намери своя път</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {audiences.map((a, i) => (
            <div
              key={a.title}
              ref={(el) => { cardRefs.current[i] = el; }}
              className="glass-card p-8 hover-lift text-center"
            >
              <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center mx-auto mb-6">
                <a.icon className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-4 text-foreground">{a.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed font-body mb-6">{a.description}</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {a.benefits.map((b) => (
                  <span
                    key={b}
                    className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary font-body"
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;
