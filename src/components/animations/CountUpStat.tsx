"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface CountUpStatProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

export function CountUpStat({
  value,
  suffix = "",
  prefix = "",
  duration = 1.5,
  className = "",
}: CountUpStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    const wrapper = wrapperRef.current;
    if (!el || !wrapper) return;

    const obj = { val: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: wrapper, start: "top 85%" },
      });
      tl.to(obj, {
        val: value,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = `${prefix}${Math.round(obj.val)}${suffix}`;
        },
      }).to(
        wrapper,
        {
          boxShadow: "0 0 20px 2px rgba(209, 177, 112, 0.5)",
          duration: 0.3,
          yoyo: true,
          repeat: 1,
        },
        "-=0.2"
      );
    }, wrapper);

    return () => ctx.revert();
  }, [value, prefix, suffix, duration]);

  return (
    <span ref={wrapperRef} className={`inline-block px-2 py-1 rounded ${className}`}>
      <span ref={ref}>{prefix}0{suffix}</span>
    </span>
  );
}
