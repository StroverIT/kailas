"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 0.7, y: 0, duration: 0.8 }
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6"
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4"
        );

      gsap.to(scrollIndicatorRef.current, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image - add sunset-view.jpg to public/images/ */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage:
            "url(/images/sunset-view.jpg), linear-gradient(180deg, hsl(var(--warm-dark) / 0.6) 0%, hsl(var(--warm-dark) / 0.3) 50%, hsl(var(--primary) / 0.4) 100%)",
        }}
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-hero z-[1]" />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <p
          ref={taglineRef}
          className="text-sm md:text-base font-body tracking-[0.3em] uppercase text-primary-foreground/70 mb-6"
        >
          Врачански Балкан · 10.6 декара тишина
        </p>
        <h1
          ref={titleRef}
          className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
        >
          Твоето убежище в сърцето на планината
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-10 leading-relaxed font-body"
        >
          Кайлас Йогалайф не е просто студио. Това са 10 декара тишина, панорамни
          гледки и автентична йога, създадени за твоята пълна трансформация.
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a href="#events">
            <Button variant="hero" size="lg" className="text-base px-8 py-6">
              Открий своя ретрийт
            </Button>
          </a>
          <a href="#concept">
            <Button variant="hero-outline" size="lg" className="text-base px-8 py-6">
              Научи повече
            </Button>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 rounded-full border-2 border-primary-foreground/40 flex justify-center pt-2">
          <div className="w-1 h-3 bg-primary-foreground/60 rounded-full animate-pulse" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
