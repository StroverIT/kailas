"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Check } from "lucide-react";
import { revealConfig } from "@/lib/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const problems = [
  "Постоянен стрес",
  "Лош сън",
  "Прегаряне",
  "Липса на концентрация",
  "Тревожност",
  "Нужда от тишина",
];

const ProblemSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
      itemRefs.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(
          item,
          { opacity: 0, y: revealConfig.y.content },
          {
            opacity: 1,
            y: 0,
            duration: revealConfig.duration.fast,
            delay: i * revealConfig.stagger,
            ease: revealConfig.ease,
            scrollTrigger: { trigger: listRef.current, start: revealConfig.startContent },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="problem" className="section-padding bg-gradient-section">
      <div className="container mx-auto max-w-3xl">
        <div ref={headerRef} className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            За кого е това място?
          </p>
          <h2 className="section-heading mb-6">Това е за теб, ако имаш...</h2>
        </div>

        <div ref={listRef} className="grid sm:grid-cols-2 gap-3">
          {problems.map((problem, i) => (
            <div
              key={problem}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="flex items-center gap-3 glass-card px-6 py-4"
            >
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center shrink-0">
                <Check className="w-4 h-4 text-secondary" />
              </div>
              <span className="font-body text-foreground font-medium">{problem}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
