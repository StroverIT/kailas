"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUpStat } from "./animations/CountUpStat";
import { revealConfig } from "@/lib/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 300, suffix: "+", label: "Участници" },
  { value: 8, label: "Ретрийта годишно" },
  { value: 10, label: "Декара природа" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const statRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      statRefs.current.forEach((stat, i) => {
        if (!stat) return;
        gsap.fromTo(
          stat,
          { opacity: 0, y: revealConfig.y.content },
          {
            opacity: 1,
            y: 0,
            duration: revealConfig.duration.content,
            delay: i * revealConfig.stagger,
            ease: revealConfig.ease,
            scrollTrigger: { trigger: sectionRef.current, start: revealConfig.startContent },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-padding bg-primary text-primary-foreground py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-3 gap-8 text-center">
          {stats.map((s, i) => (
            <div
              key={s.label}
              ref={(el) => { statRefs.current[i] = el; }}
              className="opacity-0"
            >
              <p className="font-heading text-3xl md:text-4xl font-semibold text-secondary mb-1">
                <CountUpStat value={s.value} suffix={s.suffix || ""} />
              </p>
              <p className="text-sm text-primary-foreground/70 font-body">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
