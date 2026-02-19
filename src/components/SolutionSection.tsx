"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CheckCircle2 } from "lucide-react";
import { revealConfig } from "@/lib/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  "Ще намалиш нивата на стрес",
  "Ще подобриш съня",
  "Ще възстановиш енергията си",
  "Ще се научиш на техники за ежедневието",
];

const SolutionSection = () => {
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
    <section ref={sectionRef} id="solution" className="section-padding bg-primary text-primary-foreground">
      <div className="container mx-auto max-w-4xl">
        <div ref={headerRef} className="text-center mb-12">
          <p className="text-sm tracking-[0.2em] uppercase text-primary-foreground/60 font-body mb-3">
            Как ще ти помогнем
          </p>
          <h2 className="section-heading mb-6 text-primary-foreground">
            Какво ще получиш от ретрийта
          </h2>
        </div>

        <div ref={listRef} className="space-y-4">
          {benefits.map((benefit, i) => (
            <div
              key={benefit}
              ref={(el) => { itemRefs.current[i] = el; }}
              className="flex items-center gap-4 bg-primary-foreground/10 rounded-xl px-6 py-5"
            >
              <CheckCircle2 className="w-8 h-8 text-secondary shrink-0" />
              <span className="font-body text-lg text-primary-foreground/95">{benefit}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
