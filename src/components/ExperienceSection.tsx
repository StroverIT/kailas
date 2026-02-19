"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sunrise, Moon } from "lucide-react";
import { revealConfig } from "@/lib/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const day1 = [
  {
    time: "Следобед",
    activities: [
      "Пристигане и настаняване",
      "Запознаване с пространството и групата",
      "Въвеждане в програмата на ретрийта",
    ],
  },
  {
    time: "Вечер",
    activities: [
      "Вечерна йога практика",
      "Дихателни техники (Пранаяма)",
      "Спокойна вегетарианска вечеря",
      "Време за тишина и адаптация към природния ритъм",
    ],
  },
];

const day2 = [
  {
    time: "Сутрин",
    activities: [
      "Сутрешна медитация",
      "Йога практика за събуждане на тялото",
      "Пранаяма",
      "Йога Нидра (дълбока водена релаксация)",
    ],
  },
  {
    time: "Следобед",
    activities: [
      "Разходка сред природата",
      "Осъзнато време за почивка и интеграция",
      "Участие в ежедневни дейности в Центъра",
    ],
  },
];

const ExperienceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const day1Ref = useRef<HTMLDivElement>(null);
  const day2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: revealConfig.y.header },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.header,
          ease: revealConfig.ease,
          scrollTrigger: { trigger: headerRef.current, start: revealConfig.start },
        }
      );
      gsap.fromTo(
        day1Ref.current,
        { opacity: 0, y: revealConfig.y.content },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.content,
          ease: revealConfig.ease,
          scrollTrigger: { trigger: day1Ref.current, start: revealConfig.startContent },
        }
      );
      gsap.fromTo(
        day2Ref.current,
        { opacity: 0, y: revealConfig.y.content },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.content,
          delay: revealConfig.stagger,
          ease: revealConfig.ease,
          scrollTrigger: { trigger: day2Ref.current, start: revealConfig.startContent },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="experience" className="section-padding bg-background">
      <div className="container mx-auto max-w-5xl">
        <div ref={headerRef} className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            Опитност
          </p>
          <h2 className="section-heading mb-6">Как преминава един уикенд ретрийт</h2>
          <div className="space-y-4 max-w-2xl mx-auto text-muted-foreground font-body leading-relaxed">
            <p>
              Хората не идват тук само за практика – идват, за да се откъснат от ежедневието и да се потопят в един различен ритъм на живот.
            </p>
            <p>
              По време на ретрийта ще бъдеш част от ежедневния живот в Кайлас – място, където йога не е просто практика, а начин на живот.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Ден 1 */}
          <div
            ref={day1Ref}
            className="glass-card overflow-hidden"
          >
            <div className="bg-secondary/10 px-6 py-4 flex items-center gap-3">
              <Moon className="w-6 h-6 text-secondary" />
              <h3 className="font-heading text-xl font-semibold text-foreground">Ден 1</h3>
            </div>
            <div className="p-6 space-y-6">
              {day1.map((block, i) => (
                <div key={i}>
                  <p className="text-sm font-body text-secondary font-semibold mb-2">{block.time}</p>
                  <ul className="space-y-1">
                    {block.activities.map((activity, j) => (
                      <li key={j} className="flex gap-2 font-body text-muted-foreground">
                        <span className="text-secondary">–</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Ден 2 */}
          <div
            ref={day2Ref}
            className="glass-card overflow-hidden"
          >
            <div className="bg-secondary/10 px-6 py-4 flex items-center gap-3">
              <Sunrise className="w-6 h-6 text-secondary" />
              <h3 className="font-heading text-xl font-semibold text-foreground">Ден 2</h3>
            </div>
            <div className="p-6 space-y-6">
              {day2.map((block, i) => (
                <div key={i}>
                  <p className="text-sm font-body text-secondary font-semibold mb-2">{block.time}</p>
                  <ul className="space-y-1">
                    {block.activities.map((activity, j) => (
                      <li key={j} className="flex gap-2 font-body text-muted-foreground">
                        <span className="text-secondary">–</span>
                        <span>{activity}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-10 space-y-2">
          <p className="text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            През целия уикенд ще имаш възможност да се запознаеш с принципите на йогийския начин на живот и да научиш практики, които можеш да приложиш и след като се върнеш в ежедневието си.
          </p>
          <p className="text-sm text-muted-foreground font-body">
            Програмата може да варира в зависимост от темата на ретрийта.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
