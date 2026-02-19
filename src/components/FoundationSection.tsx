"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Heart } from "lucide-react";
import { revealConfig } from "@/lib/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const FoundationSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: revealConfig.y.content },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.content,
          ease: revealConfig.ease,
          scrollTrigger: { trigger: contentRef.current, start: revealConfig.start },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="foundation"
      ref={sectionRef}
      className="section-padding bg-gradient-section"
    >
      <div className="container mx-auto max-w-4xl text-center">
        <div ref={contentRef}>
          <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="w-7 h-7 text-secondary" />
          </div>
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            Фондация
          </p>
          <h2 className="section-heading mb-6">
            Пракрити за хармоничен живот
          </h2>
          <p className="text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto">
            Очаквайте скоро пълно представяне на Фондация „Пракрити за хармоничен живот".
            В процес на подготовка сме съдържанието и визията.
          </p>
        </div>
      </div>
    </section>
  );
};

export default FoundationSection;
