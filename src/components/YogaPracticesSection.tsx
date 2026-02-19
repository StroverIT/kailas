"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealConfig } from "@/lib/animationConfig";
import { AnimatedLink } from "./transitions";

gsap.registerPlugin(ScrollTrigger);

const DEFAULT_IMAGES: Record<string, string> = {
  "yoga-v-delnika": "/images/blog-yoga-v-delnika.png",
  "yoga-nidra": "/images/blog-yoga-nidra.png",
  "purvi-stapki-yoga": "/images/blog-purvi-stapki-yoga.png",
  "yoga-za-vichki": "/images/blog-yoga-za-vichki.png",
};

type YogaPracticePost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
};

const YogaPracticesSection = () => {
  const [practices, setPractices] = useState<YogaPracticePost[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    fetch("/api/blog?yogaPractices=1")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: YogaPracticePost[]) => setPractices(Array.isArray(data) ? data : []))
      .catch(() => setPractices([]))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (loading || practices.length === 0) return;
    cardRefs.current = cardRefs.current.slice(0, practices.length);
    const ctx = gsap.context(() => {
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
            scrollTrigger: { trigger: gridRef.current, start: revealConfig.startContent },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [loading, practices]);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-border bg-card h-80 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (practices.length === 0) {
    return null;
  }

  return (
    <section ref={sectionRef} className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practices.map((practice, index) => {
            const image =
              practice.image || DEFAULT_IMAGES[practice.slug] || "/images/blog-yoga-v-delnika.png";
            return (
              <div
                ref={(el) => { cardRefs.current[index] = el; }}
                key={practice.id}
                className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-[705/368] overflow-hidden relative">
                  <Image
                    src={image}
                    alt={practice.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 font-heading">
                    {practice.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-body line-clamp-3">
                    {practice.excerpt}
                  </p>
                  <AnimatedLink
                    href={`/blog/${practice.slug}`}
                    className="group/link inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-body"
                  >
                    <span>Прочети повече &quot;{practice.title}&quot;</span>
                    <span className="inline-block transition-transform duration-300 group-hover/link:translate-x-1">→</span>
                  </AnimatedLink>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YogaPracticesSection;
