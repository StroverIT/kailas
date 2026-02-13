"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart, Wind, Moon, Music, Flame, HandHeart } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const practices = [
  { icon: Heart, name: "Асана", desc: "Тялото като инструмент за осъзнаване" },
  { icon: Wind, name: "Пранаяма", desc: "Дихателни техники за енергия и баланс" },
  { icon: Moon, name: "Йога Нидра", desc: "Дълбока релаксация – съзнателен сън" },
  { icon: Flame, name: "Медитация", desc: "Пътят навътре към вътрешния мир" },
  { icon: Music, name: "Киртан", desc: "Мантра пеене за хармонизиране на ума" },
  { icon: HandHeart, name: "Карма йога", desc: "Безкористно действие като практика" },
];

const YogaSystemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const practiceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 85%" },
        }
      );
      practiceRefs.current.forEach((card, i) => {
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
            scrollTrigger: { trigger: cardsRef.current, start: "top 85%" },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="yoga-system" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text */}
          <div ref={textRef}>
            <p className="text-sm tracking-[0.2em] uppercase text-primary-foreground/60 font-body mb-3">
              Системата Сатянанда
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
              Йога като начин на живот, а не просто упражнение
            </h2>
            <p className="text-primary-foreground/80 leading-relaxed mb-6 font-body text-lg">
              Следваме традицията на Бихарската школа – интегрален подход, който
              хармонизира тялото, ума и емоциите. Под ръководството на Мариана Кърлова
              (Даятма), обучена в Индия и Европа, ти черпиш знания директно от извора.
            </p>
            <p className="text-primary-foreground/60 font-body text-sm italic">
              Основател на Пракрити Йога · Bihar School of Yoga · Satyananda Yoga
            </p>
          </div>

          {/* Practice grid */}
          <div ref={cardsRef} className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {practices.map((p, i) => (
              <div
                key={p.name}
                ref={(el) => { practiceRefs.current[i] = el; }}
                className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-5 text-center hover:bg-primary-foreground/15 transition-colors duration-300"
              >
                <p.icon className="w-8 h-8 mx-auto mb-3 text-secondary" />
                <h4 className="font-heading text-base font-semibold mb-1">{p.name}</h4>
                <p className="text-xs text-primary-foreground/70 font-body">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default YogaSystemSection;
