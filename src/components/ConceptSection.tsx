"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealConfig } from "@/lib/animationConfig";
import { Mountain, Users, Sunrise } from "lucide-react";
import { ScrollReveal } from "./ScrollReveal";
import { SandSweepAccent } from "./animations/SandSweepAccent";
import { LeafMountainLogo } from "./animations/LeafMountainLogo";

gsap.registerPlugin(ScrollTrigger);

const ConceptSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const kailasCardRef = useRef<HTMLDivElement>(null);
  const prakritiCardRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const shapeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (shapeRef.current) {
        gsap.fromTo(
          shapeRef.current,
          { rotation: -4, opacity: 0 },
          {
            rotation: 3,
            opacity: 1,
            duration: revealConfig.duration.content,
            ease: revealConfig.ease,
            scrollTrigger: {
              trigger: shapeRef.current,
              start: revealConfig.startContent,
            },
          },
        );
      }

      gsap.fromTo(
        kailasCardRef.current,
        { opacity: 0, y: revealConfig.y.content },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.content,
          ease: revealConfig.ease,
          scrollTrigger: {
            trigger: kailasCardRef.current,
            start: revealConfig.start,
          },
        },
      );

      gsap.fromTo(
        prakritiCardRef.current,
        { opacity: 0, y: revealConfig.y.content },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.content,
          delay: revealConfig.stagger,
          ease: revealConfig.ease,
          scrollTrigger: {
            trigger: prakritiCardRef.current,
            start: revealConfig.start,
          },
        },
      );

      gsap.fromTo(
        missionRef.current,
        { opacity: 0, y: revealConfig.y.content },
        {
          opacity: 1,
          y: 0,
          duration: revealConfig.duration.content,
          delay: revealConfig.stagger * 2,
          ease: revealConfig.ease,
          scrollTrigger: {
            trigger: missionRef.current,
            start: revealConfig.startContent,
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="concept"
      className="section-padding bg-gradient-section"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 relative">
          <SandSweepAccent>
            <ScrollReveal>
              <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
                Мястото
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-heading mb-6">
                Йога център{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-light">
                  „Кайлас“
                </span>
              </h2>
            </ScrollReveal>
          </SandSweepAccent>
          <ScrollReveal delay={0.2}>
            <p className="section-subheading mx-auto">
              Чиста природа и спокойствие. Йога център <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-light">„Кайлас"</span> се намира в
              сърцето на Природен парк Врачански Балкан, само на 2 км от
              пещерата Леденика. Разположен е върху площ от 10.6 дка с панорамна
              гледка към изгрева и равнината. Замислен и построен през 2010
              година първоначално като място за ведически практики с огън и
              киртан (йогиски песни). От 2020 година функционира като цялостен
              комплекс за йога и духовни практики.
            </p>
          </ScrollReveal>
        </div>

        <div ref={shapeRef} className="flex justify-center mb-8 opacity-0">
          <LeafMountainLogo size={64} className="text-secondary" />
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          <div
            ref={kailasCardRef}
            className="glass-card overflow-hidden hover-lift opacity-0"
          >
            <div className="h-48 overflow-hidden relative">
              <Image
                src="/images/20220520_201852-scaled.jpg"
                alt="Кайлас Йогалайф – ретрийт център"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8 lg:p-10">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Mountain className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                Място за изучаване и споделяне на йога
              </h3>
              <p className="text-muted-foreground leading-relaxed font-body">
                Центърът е изграден като място за изучаване и споделяне на йога
                като начин на живот. По време на участието в ежедневните
                дейности, се запознавате и изучавате различни видове йога и се
                учите как да ги вграждате в ежедневието си и така да подобрявате
                качеството си на живот.
              </p>
            </div>
          </div>

          <div
            ref={prakritiCardRef}
            className="glass-card overflow-hidden hover-lift opacity-0"
          >
            <div className="h-48 overflow-hidden relative">
              <Image
                src="/images/348380709_1268910913994703_7611136873201903571_n-768x615.jpg"
                alt="Пракрити Йога – общност"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="p-8 lg:p-10">
              <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                Предназначение
              </h3>
              <p className="text-muted-foreground leading-relaxed font-body">
                Нашата мисия е да осигурим пространство и достъп до преживяване
                на йога като цялостна система за живот. Постепенно, с
                опознаването на философията и практиките на йога, се свързвате
                по-пълноценно с вътрешния си свят и се научавате да
                хармонизирате този свят със света, който ви обгражда в
                ежедневието.
              </p>
            </div>
          </div>
        </div>

        <div ref={missionRef} className="mt-16 text-center opacity-0">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sunrise className="w-5 h-5 text-secondary" />
            <span className="text-sm tracking-[0.15em] uppercase text-secondary font-body">
              Добре дошли
            </span>
          </div>
          <blockquote className="font-heading text-xl md:text-2xl italic text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            Центърът предлага класически йога практики на място и онлайн, с
            които да придобиете базисни познания и умения в йога, да обогатите
            преживяването си, да се фокусирате върху конкретни здравословни
            проблеми или житейски дилеми. За кратко или по-дълго сте добре дошли
            в <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-light">„Кайлас"</span> йога център, за да се върнете към себе си, да
            преосмислите пътя си и да продължите напред.
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
