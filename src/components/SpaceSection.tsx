"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Eye, Wind, Sunrise, Trees } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealConfig } from "@/lib/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    image: "/images/20231029_1025372-2048x1197.jpg",
    icon: Eye,
    title: "Зала за събития",
    description:
      "Разполага с площ от 100 кв.м. и панорама от три страни. Оборудвана е с постелки и помощни средства за практики по йога. Предлага възможност за окачване до 11 люлки за въздушна йога при необходимост. Мултимедиен проектор, екран, озвучаване, микрофони.",
  },
  {
    image: "/images/HALL-2.png",
    icon: Wind,
    title: "Тераса",
    description:
      "Просторна тераса за практики на открито, релаксация или медитация.",
  },
  {
    image: "/images/20220521_202838-2-768x958.jpg",
    icon: Sunrise,
    title: "Настаняване",
    description:
      "Просторни общо спално помещение с 12 легла и панорамен изглед. Удобни съблекални към общото спално и залата с прилежащи тоалетни и бани с топла вода. Място за личен багаж. 4-ри стаи за двама души с отделен вход, самостоятелно санитарно помещение, тераса с изглед към изгрева.",
  },
  {
    image: "/images/20220520_201852-scaled.jpg",
    icon: Trees,
    title: "Природа",
    description: `Йога център „Кайлас" се намира в сърцето на Природен парк Врачански Балкан, само на 2 км от пещерата Леденика. Разположен е върху площ от 10.6 дка с панорамна гледка към изгрева и равнината.`,
  },
];

const SpaceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
          scrollTrigger: {
            trigger: headerRef.current,
            start: revealConfig.start,
          },
        },
      );
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: revealConfig.y.card },
          {
            opacity: 1,
            y: 0,
            duration: revealConfig.duration.card,
            delay: i * revealConfig.stagger,
            ease: revealConfig.ease,
            scrollTrigger: {
              trigger: sectionRef.current,
              start: revealConfig.startContent,
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="space"
      ref={sectionRef}
      className="section-padding bg-background"
    >
      <div className="container mx-auto max-w-6xl">
        <div ref={headerRef} className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            Мястото
          </p>
          <h2 className="section-heading mb-6">Чиста природа и спокойствие</h2>
          <p className="section-subheading mx-auto">
            Йога център{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-light">
              „Кайлас“
            </span>{" "}
            – 10.6 декара в Природен парк „Врачански Балкан", на 2 км от пещера
            Леденика. Панорамна гледка към изгрева и равнината.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {spaces.map((space, i) => (
            <div
              key={space.title}
              ref={(el) => {
                cardRefs.current[i] = el;
              }}
              className="group hover-lift rounded-2xl overflow-hidden bg-card border border-border/50 opacity-0"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={space.image}
                  alt={space.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-foreground/10 group-hover:bg-foreground/0 transition-colors duration-500" />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <space.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground">
                  {space.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed font-body">
                  {space.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpaceSection;
