"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
  Wind,
  Moon,
  Flame,
  Music,
  HandHeart,
  Sparkles,
  BookOpen,
  Church,
} from "lucide-react";
import FooterSection from "@/components/FooterSection";
import { revealConfig } from "@/lib/animationConfig";

gsap.registerPlugin(ScrollTrigger);

const practices = [
  {
    icon: Heart,
    title: "Класове по йога",
    description:
      "Интегрират практики на асани (физически упражнения с фокус на ума и осъзнавания), дихателни техники (пранаяма), мантра, релаксация, медитация",
  },
  {
    icon: Moon,
    title: "Практики за осъзната релаксация",
    description: "Йога Нидра, Йогическа дрямка и др.",
  },
  {
    icon: Flame,
    title: "Класове по медитация",
    description: "Различни техники на медитация за вътрешен мир и осъзнаване",
  },
  {
    icon: Sparkles,
    title: "Раджа йога",
    description: "Царският път на йога - контрол на ума и медитативни практики",
  },
  {
    icon: BookOpen,
    title: "Йога видя",
    description: "Свързване с познанието и мъдростта",
  },
  {
    icon: HandHeart,
    title: "Карма йога и сева",
    description: "Йога на безкористното действие и служене",
  },
  {
    icon: Heart,
    title: "Бхакти йога",
    description: "Йога на преданието и любовта",
  },
  {
    icon: Music,
    title: "Практики със звуци. Мантри. Киртан",
    description: "Използване на звук и вибрации за хармонизиране",
  },
  {
    icon: Church,
    title: "Ведически практики и ритуали",
    description: "Древни традиционни практики от йогическата традиция",
  },
];

export default function PraktikiPage() {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const practicesGridRef = useRef<HTMLDivElement>(null);
  const practiceCardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      // Hero animations
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
        },
      );

      // Practice cards animation
      practiceCardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top bottom-=100",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-20 md:pt-40 md:pb-28 bg-gradient-to-b from-primary/5 to-background"
      >
        <div className="container mx-auto max-w-4xl px-4">
          <div className="text-center">
            <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground font-body mb-4">
              Нашите практики
            </p>
            <h1
              ref={titleRef}
              className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground"
            >
              Практиките в Кайлас
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-muted-foreground font-body leading-relaxed max-w-2xl mx-auto"
            >
              Интегриран подход към йога, обединяващ древни традиции с модерни
              практики за цялостно развитие
            </p>
          </div>
        </div>
      </section>

      {/* Practices Section */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-6xl">
          <div
            ref={practicesGridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {practices.map((practice, index) => (
              <div
                key={practice.title}
                ref={(el) => {
                  practiceCardRefs.current[index] = el;
                }}
                className="group bg-card border border-border rounded-2xl p-6 hover:shadow-lg hover:border-secondary/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors duration-300">
                    <practice.icon className="w-7 h-7 text-primary group-hover:text-secondary transition-colors duration-300" />
                  </div>
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-secondary transition-colors duration-300 text-center">
                  {practice.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed text-sm text-center">
                  {practice.description}
                </p>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center max-w-3xl mx-auto">
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-8">
              <h3 className="font-heading text-2xl font-semibold mb-4 text-foreground">
                Интегриран подход
              </h3>
              <p className="text-muted-foreground font-body leading-relaxed">
                Практиките през седмицата са насочени към хора с траен интерес
                към йога, търсещи развитие и задълбочаване на познанията,
                уменията и ефектите на йога. Заниманията интегрират знания и
                практики от различните йогически традиции.
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
