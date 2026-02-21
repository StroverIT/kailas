"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SunGlowButton } from "@/components/animations/SunGlowButton";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayPulseRef = useRef<HTMLDivElement>(null);
  const forestLightGreenRef = useRef<HTMLDivElement>(null);
  const forestLightGoldRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30 },
        { opacity: 0.7, y: 0, duration: 0.8 },
      )
        .fromTo(
          titleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.6",
        )
        .fromTo(
          scrollIndicatorRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          "-=0.4",
        );

      gsap.to(scrollIndicatorRef.current, {
        y: -10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Breath Hero: scale 1 -> 1.03 -> 1 (10s loop)
      gsap.to(bgRef.current, {
        scale: 1.03,
        duration: 5,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Parallax: bg moves slower on scroll (depth effect)
      gsap.to(bgRef.current, {
        yPercent: 15,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      // Overlay pulse (subtle opacity)
      gsap.to(overlayPulseRef.current, {
        opacity: 0.85,
        duration: 4,
        ease: "sine.inOut",
        repeat: -1,
        yoyo: true,
      });

      // Forest Light: scroll scrub green tint -> warmer gold tint
      gsap.to(forestLightGreenRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8,
        },
      });
      gsap.fromTo(
        forestLightGoldRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background image - Breath scale */}
      <div ref={bgRef} className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/20220520_201852-scaled.jpg"
          alt=""
          fill
          priority
          className="object-cover object-center scale-100"
          sizes="100vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, hsl(var(--warm-dark) / 0.6) 0%, hsl(var(--warm-dark) / 0.3) 50%, hsl(var(--primary) / 0.4) 100%)",
          }}
          aria-hidden
        />
      </div>
      {/* Overlay + pulse */}
      <div className="absolute inset-0 bg-gradient-hero z-[1]" />
      <div
        ref={overlayPulseRef}
        className="absolute inset-0 z-[1] bg-primary/20"
        aria-hidden
        style={{ opacity: 0.7 }}
      />
      {/* Forest Light: green -> gold tint on scroll */}
      <div
        ref={forestLightGreenRef}
        className="absolute inset-0 z-[1] pointer-events-none opacity-60"
        style={{
          background:
            "linear-gradient(180deg, rgba(101, 155, 127, 0.12) 0%, transparent 100%)",
        }}
        aria-hidden
      />
      <div
        ref={forestLightGoldRef}
        className="absolute inset-0 z-[1] pointer-events-none opacity-0"
        style={{
          background:
            "linear-gradient(180deg, transparent 0%, rgba(209, 177, 112, 0.15) 100%)",
        }}
        aria-hidden
      />

      <div className="relative z-10 container mx-auto px-4 text-center max-w-4xl">
        <p
          ref={taglineRef}
          className="text-sm md:text-base font-body tracking-[0.3em] uppercase text-primary-foreground/70 mb-6"
        >
          Да приложим познанието на йога за един по-добър живот
        </p>
        <h1
          ref={titleRef}
          className="font-heading text-4xl md:text-5xl lg:text-7xl font-bold text-primary-foreground leading-tight mb-6"
        >
          Живей с йога в прегръдката на природата
        </h1>
        <p
          ref={subtitleRef}
          className="text-lg md:text-xl text-primary-foreground/85 max-w-2xl mx-auto mb-10 leading-relaxed font-body"
        >
          Опознайте йога като житейска философия и практика, която внася в
          живота ви спокойствие и радост, осъзнатост и удовлетвореност
        </p>
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <SunGlowButton href="#schedule" variant="hero">
            Актуален график на практиките
          </SunGlowButton>
          <SunGlowButton href="#events" variant="hero-outline">
            Събития
          </SunGlowButton>
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
