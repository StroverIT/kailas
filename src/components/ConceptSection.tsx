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
            scrollTrigger: { trigger: shapeRef.current, start: revealConfig.startContent },
          }
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
          scrollTrigger: { trigger: kailasCardRef.current, start: revealConfig.start },
        }
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
          scrollTrigger: { trigger: prakritiCardRef.current, start: revealConfig.start },
        }
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
          scrollTrigger: { trigger: missionRef.current, start: revealConfig.startContent },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="concept" className="section-padding bg-gradient-section">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 relative">
          <SandSweepAccent>
            <ScrollReveal>
              <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
                Концепцията
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="section-heading mb-6">Кайлас &amp; Пракрити</h2>
            </ScrollReveal>
          </SandSweepAccent>
          <ScrollReveal delay={0.2}>
            <p className="section-subheading mx-auto">
              На 2 км от пещера Леденика, сред чистия въздух на планината,
              създадохме пространство, където времето спира. От ведически огнени
              ритуали до съвременни йога практики – тук всяка стъпка е път към теб
              самия.
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
                Кайлас Йогалайф
              </h3>
              <p className="text-muted-foreground leading-relaxed font-body">
                Пространството за пребиваване в сърцето на Врачанския
                Балкан. 10.6 декара природа, панорамна зала, условия за въздушна йога и стаи
                с тераси за изгрев. Тук тялото, умът и духът намират хармония.
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
                Пракрити Йога
              </h3>
              <p className="text-muted-foreground leading-relaxed font-body">
                Живата общност зад Кайлас – международно сертифицирани учители,
                обединени от мисията да направят древното знание достъпно за
                модерния човек. Уикенд практики, обучения и международни събития.
              </p>
            </div>
          </div>
        </div>

        <div ref={missionRef} className="mt-16 text-center opacity-0">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sunrise className="w-5 h-5 text-secondary" />
            <span className="text-sm tracking-[0.15em] uppercase text-secondary font-body">
              Нашата мисия
            </span>
          </div>
          <blockquote className="font-heading text-xl md:text-2xl italic text-foreground/80 max-w-3xl mx-auto leading-relaxed">
            „Да предоставим пространство, в което да преоткрием богатството на
            йога – за по-добър, по-щастлив и осъзнат живот."
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default ConceptSection;
