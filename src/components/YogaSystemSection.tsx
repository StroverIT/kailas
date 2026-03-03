"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRouter } from "next/navigation";
import { revealConfig } from "@/lib/animationConfig";
import { practices } from "@/app/praktiki/data";

gsap.registerPlugin(ScrollTrigger);

const YogaSystemSection = () => {
  const router = useRouter();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const practiceRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: revealConfig.y.header },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.header,
          ease: revealConfig.ease,
          scrollTrigger: {
            trigger: textRef.current,
            start: revealConfig.start,
          },
        },
      );
      practiceRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: revealConfig.y.card },
          {
            opacity: 1,
            y: 0,
            duration: revealConfig.duration.fast,
            delay: i * revealConfig.stagger,
            ease: revealConfig.ease,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: revealConfig.start,
            },
          },
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="yoga-system"
      className="section-padding bg-primary text-primary-foreground"
    >
      <div className="container mx-auto max-w-7xl">
        {/* Text Section - Full Width */}
        <div ref={textRef} className="text-center max-w-4xl mx-auto mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-primary-foreground/60 font-body mb-3">
            Нашите практики
          </p>
          <p className="text-primary-foreground/90 font-body mb-4">
            Какво получавате от практиките, които провеждаме (групово или
            индивидуално)?
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight mb-6">
            Йога като житейска философия и практика
          </h2>
          <p className="text-primary-foreground/80 leading-relaxed mb-6 font-body text-lg">
            Практиките през седмицата са насочени към хора с траен интерес към
            йога, търсещи развитие и задълбочаване на познанията, уменията и
            ефектите на йога. Заниманията интегрират знания и практики от
            различни видове.
          </p>
          <p className="text-primary-foreground/60 font-body text-sm italic">
            Йога Нидра, Първи стъпки в йога, Йога за всички
          </p>
        </div>

        {/* Practice grid - Full Width */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {practices.map((p, i) => (
            <button
              key={p.title}
              ref={(el) => {
                practiceRefs.current[i] = el;
              }}
              type="button"
              onClick={() => router.push(`/praktiki?practice=${i}`)}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-primary-foreground/15 transition-all duration-300 hover:scale-105 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-secondary"
            >
              <div className="flex flex-col items-center text-center">
                <div className="bg-primary-foreground/10 rounded-full p-4 mb-4">
                  <p.icon className="w-8 h-8 text-secondary" />
                </div>
                <h4 className="font-heading text-lg font-semibold mb-3">
                  {p.title}
                </h4>
                <p className="text-sm text-primary-foreground/70 font-body leading-relaxed">
                  {p.description}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YogaSystemSection;
