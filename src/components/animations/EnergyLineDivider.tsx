"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface EnergyLineDividerProps {
  className?: string;
}

export function EnergyLineDivider({ className = "" }: EnergyLineDividerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const goldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const line = lineRef.current;
    const gold = goldRef.current;
    if (!container || !line || !gold) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: container,
            start: "top 90%",
            end: "top 55%",
            scrub: 0.8,
          },
        }
      );

      gsap.fromTo(
        gold,
        { scaleX: 0, transformOrigin: "left center" },
        {
          scaleX: 1,
          scrollTrigger: {
            trigger: container,
            start: "top 70%",
            end: "top 40%",
            scrub: 0.5,
          },
        }
      );
    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`w-full flex justify-center py-8 ${className}`}>
      <div className="relative w-full max-w-2xl h-px overflow-hidden">
        <div
          ref={lineRef}
          className="absolute inset-0 h-px origin-left bg-[#659B7F]"
        />
        <div
          ref={goldRef}
          className="absolute inset-0 h-px origin-left bg-[#D1B170]"
        />
      </div>
    </div>
  );
}
