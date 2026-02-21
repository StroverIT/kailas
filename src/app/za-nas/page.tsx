"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterSection from "@/components/FooterSection";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import { Heart, Users, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function AboutPage() {
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const missionRef = useRef<HTMLDivElement>(null);
  const founderRef = useRef<HTMLDivElement>(null);
  const valuesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        introRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: introRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        missionRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: missionRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        founderRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: founderRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        valuesRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: valuesRef.current, start: "top 85%" },
        },
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero with image */}
      <section
        ref={heroRef}
        className="pt-28 pb-20 section-padding bg-gradient-section"
      >
        <div className="container mx-auto max-w-4xl">
          <div className="relative w-full aspect-video max-h-[400px] rounded-2xl overflow-hidden mb-12">
            <Image
              src="/images/about-header.png"
              alt="Йога център Кайлас"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 896px"
              priority
            />
          </div>
          <div className="text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
              За нас
            </p>
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              Йога център „Кайлас"
            </h1>
            <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-2xl mx-auto">
              Йога център „Кайлас“ е резултат от вдъхновението от опита на
              неговия създател да трансформира живота си. Той е израз на
              желанието да сподели този опит и натрупаните познания, и умения, с
              всички желаещи да поемат пътя на себеопознаване и личностна
              промяна, за да внесат в живота си здраве на всички нива, радост и
              удовлетвореност.
            </p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="section-padding section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-8 text-center">
            Галерия
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/gallery-20220605.jpg"
                alt="Йога център Кайлас – практики"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/gallery-DSC09196.jpeg"
                alt="Йога център Кайлас – пространство"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden">
              <Image
                src="/images/gallery-20220129.jpg"
                alt="Йога център Кайлас – природа"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-muted/30">
        <div ref={missionRef} className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Heart className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Мисия
            </h2>
          </div>
          <blockquote className="border-l-4 border-secondary/50 pl-6 py-4 text-lg md:text-xl text-muted-foreground font-body italic leading-relaxed">
            <ul className="flex flex-col space-y-4">
              <li>
                Нашата мисия е да предоставим пространство, опит, знания и
                умения, споделеност и подкрепа, за всеки, който желае да извърви
                пътя към истинската си същност – за по-добър и щастлив живот.
              </li>
              <li>
                Да практикуваме, да се учим, да се подкрепяме, да живеем и
                работим заедно!
              </li>
              <li>
                Да споделим опита на едно по-здравословно, по-хармонично,
                по-балансирано пътуване!
              </li>
              <li>
                Да усъвършенстваме личностното си проявление, да хармонизираме
                ума и сърцето си, да подобрим комуникацията си със самите нас и
                света наоколо!
              </li>
              <li>
                С мъдростта, знанията и опита, под ръководството и напътствията
                на нашите Учители, да проявим най-доброто от себе си!
              </li>
              <li>
                Нашият инструмент за това е древното познание и практиката на
                йога, богатото духовно наследство на човечеството.
              </li>
            </ul>
          </blockquote>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-background">
        <div ref={founderRef} className="container mx-auto max-w-4xl">
          {/* 
          Write it here the text
          */}
          <div className="mt-12 p-6 rounded-2xl bg-muted/50 border border-border">
            <p className="font-heading text-lg font-semibold text-foreground mb-2">
              Работим в малки групи.
            </p>
            <p className="text-muted-foreground font-body">
              Обстановката е комфортна, спокойна и приятелска.
            </p>
          </div>
        </div>
      </section>

      {/* Values / CTA */}
      <section className="section-padding bg-gradient-section">
        <div
          ref={valuesRef}
          className="container mx-auto max-w-4xl text-center"
        >
          <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-7 h-7 text-secondary" />
          </div>
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">
            Запознайте се с практиките и видовете йога
          </h2>
          <p className="text-muted-foreground font-body mb-8 max-w-xl mx-auto">
            Разгледайте нашите практики, прочетете за различните видове йога и
            се запишете за следващото събитие.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <AnimatedLink href="/#yoga-system">
              <span className="inline-flex items-center justify-center rounded-lg bg-secondary px-6 py-3 text-sm font-medium text-secondary-foreground hover:bg-secondary/90 transition-colors">
                Предлагаме ви
              </span>
            </AnimatedLink>
            <AnimatedLink href="/#yoga-types">
              <span className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Видове йога
              </span>
            </AnimatedLink>
            <AnimatedLink href="/#events">
              <span className="inline-flex items-center justify-center rounded-lg border border-border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-muted transition-colors">
                Събития
              </span>
            </AnimatedLink>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
