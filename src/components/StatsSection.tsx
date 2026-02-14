"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CountUpStat } from "./animations/CountUpStat";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 300, suffix: "+", label: "Участници" },
  { value: 8, label: "Ретрийта годишно" },
  { value: 10, label: "Декара природа" },
];

export default function StatsSection() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="section-padding bg-primary text-primary-foreground py-16">
      <div className="container mx-auto max-w-4xl">
        <div className="grid grid-cols-3 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
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
