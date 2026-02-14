"use client";

import { useRef, useEffect, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface SandSweepAccentProps {
  children: ReactNode;
  className?: string;
}

export function SandSweepAccent({ children, className = "" }: SandSweepAccentProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const sweep = sweepRef.current;
    if (!wrapper || !sweep) return;

    gsap.fromTo(
      sweep,
      { scaleX: 0, transformOrigin: "left center" },
      {
        scaleX: 1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
          trigger: wrapper,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <div ref={wrapperRef} className={`relative ${className}`}>
      <div
        ref={sweepRef}
        className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 h-24 -z-10 origin-left"
        style={{
          background: "radial-gradient(ellipse 80% 50% at center, #FFE49B 0%, transparent 70%)",
          opacity: 0.6,
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
