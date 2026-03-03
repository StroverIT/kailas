"use client";

import { useRef, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Heart,
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
import { Button } from "@/components/ui/button";

gsap.registerPlugin(ScrollTrigger);

const practices = [
  {
    icon: Heart,
    title: "Класове по йога",
    description:
      "Интегрират практики на асани (физически упражнения с фокус на ума и осъзнавания), дихателни техники (пранаяма), мантра, релаксация, медитация",
    details:
      "Нашите класове по йога са интегриран подход, който съчетава физическата практика с ментална дисциплина. Всяка сесия включва работа с тялото чрез асани, контрол на дишането чрез пранаяма, използване на мантри за фокусиране на ума, задълбочена релаксация и медитативни практики.",
    benefits: [
      "Физическа сила и гъвкавост",
      "Ментална яснота",
      "Емоционален баланс",
    ],
  },
  {
    icon: Moon,
    title: "Практики за осъзната релаксация",
    description: "Йога Нидра, Йогическа дрямка и др.",
    details:
      "Йога Нидра е древна техника за дълбока релаксация, която води до състояние между будност и сън. Тази практика намалява стреса, подобрява качеството на съня и води до дълбока регенерация на тялото и ума.",
    benefits: ["Намаляване на стреса", "По-добър сън", "Дълбока регенерация"],
  },
  {
    icon: Flame,
    title: "Класове по медитация",
    description: "Различни техники на медитация за вътрешен мир и осъзнаване",
    details:
      "Практикуваме различни форми на медитация - от концентрация върху дишането до випасана и любяща доброта медитация. Всяка техника има своя уникален ефект върху ума и съзнанието.",
    benefits: [
      "Вътрешен мир",
      "По-добра концентрация",
      "Емоционална стабилност",
    ],
  },
  {
    icon: Sparkles,
    title: "Раджа йога",
    description: "Царският път на йога - контрол на ума и медитативни практики",
    details:
      "Раджа йога е систематичен подход за контрол на ума чрез осемте стъпки на Патанджали. Това е пътят към самопознание чрез дисциплина, самоконтрол и медитация.",
    benefits: ["Контрол на ума", "Вътрешна дисциплина", "Духовно развитие"],
  },
  {
    icon: BookOpen,
    title: "Йога видя",
    description: "Свързване с познанието и мъдростта",
    details:
      "Йога видя е пътят на познанието и мъдростта. Чрез изучаване на древните текстове, философски размисъл и дискусии се разкрива дълбокото разбиране на реалността и себе си.",
    benefits: ["Дълбоко разбиране", "Философска мъдрост", "Самопознание"],
  },
  {
    icon: HandHeart,
    title: "Карма йога и сева",
    description: "Йога на безкористното действие и служене",
    details:
      "Карма йога учи на безкористно действие без привързаност към резултата. Сева (служене) е практическото приложение на тази философия чрез помощ на другите без очакване за награда.",
    benefits: ["Безкористност", "Чувство за цел", "Духовен растеж"],
  },
  {
    icon: Heart,
    title: "Бхакти йога",
    description: "Йога на преданието и любовта",
    details:
      "Бхакти йога е пътят на предаността и божествената любов. Чрез пеене, молитва и ритуали се развива дълбока връзка с божественото и се отваря сърцето.",
    benefits: [
      "Отвореност на сърцето",
      "Емоционална трансформация",
      "Духовна връзка",
    ],
  },
  {
    icon: Music,
    title: "Практики със звуци. Мантри. Киртан",
    description: "Използване на звук и вибрации за хармонизиране",
    details:
      "Звукът и вибрациите имат мощен ефект върху съзнанието. Чрез мантри и киртан (групово пеене) се създават вибрации, които хармонизират ума, тялото и духа.",
    benefits: ["Хармонизация на енергията", "Общност", "Радост и вдъхновение"],
  },
  {
    icon: Church,
    title: "Ведически практики и ритуали",
    description: "Древни традиционни практики от йогическата традиция",
    details:
      "Ведическите практики са древни ритуали и церемонии, предавани през вековете. Те включват пуджи, хавани и други свещени действия, които създават свещено пространство и подпомагат духовния растеж.",
    benefits: [
      "Свещено пространство",
      "Традиционна мъдрост",
      "Духовна трансформация",
    ],
  },
];

export default function PraktikiPage() {
  const router = useRouter();
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const practicesGridRef = useRef<HTMLDivElement>(null);
  const practiceCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [expandedCard, setExpandedCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setExpandedCard(expandedCard === index ? null : index);
  };

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
            delay: i * 0.08,
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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="pt-28 pb-20 section-padding bg-gradient-section"
      >
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            Нашите практики
          </p>
          <h1
            ref={titleRef}
            className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6"
          >
            Практиките в{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-light">
              „Кайлас“
            </span>
          </h1>
          <p
            ref={subtitleRef}
            className="text-xl md:text-2xl font-body leading-relaxed text-muted-foreground max-w-3xl mx-auto"
          >
            Интегриран подход към йога, обединяващ древни традиции с модерни
            практики за цялостно развитие
          </p>
        </div>
      </section>

      {/* Practices Section */}
      <section className="py-16 section-padding">
        <div className="container mx-auto max-w-7xl">
          {/* Section intro */}
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Разнообразие от практики
            </h2>
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Изберете практиката, която резонира с вас. Кликнете върху всяка
              карта за повече информация.
            </p>
          </div>

          <div
            ref={practicesGridRef}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {practices.map((practice, index) => {
              const isExpanded = expandedCard === index;

              return (
                <div
                  key={practice.title}
                  ref={(el) => {
                    practiceCardRefs.current[index] = el;
                  }}
                  className={`group bg-card/50 backdrop-blur-sm border-2 border-border rounded-3xl overflow-hidden transition-all duration-500 cursor-pointer ${
                    isExpanded
                      ? "md:col-span-2 lg:col-span-3 shadow-2xl border-secondary/50 bg-card"
                      : "hover:shadow-xl hover:border-secondary/30 hover:scale-[1.02] hover:-translate-y-1"
                  }`}
                  onClick={() => toggleCard(index)}
                >
                  <div className="p-6">
                    <div
                      className={`flex ${isExpanded ? "flex-col md:flex-row items-start gap-8" : "flex-col items-center"} transition-all duration-500`}
                    >
                      {/* Icon */}
                      <div
                        className={`flex-shrink-0 rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 ${
                          isExpanded ? "w-20 h-20" : "w-14 h-14 mb-4"
                        }`}
                      >
                        <practice.icon
                          className={`text-primary transition-all duration-500 group-hover:text-secondary ${
                            isExpanded ? "w-10 h-10" : "w-7 h-7"
                          }`}
                        />
                      </div>

                      {/* Content */}
                      <div
                        className={`flex-1 ${isExpanded ? "text-left" : ""}`}
                      >
                        {!isExpanded ? (
                          <>
                            <h3 className="font-heading text-lg md:text-xl font-bold text-foreground transition-colors duration-300 group-hover:text-secondary text-center mb-3 leading-snug">
                              {practice.title}
                            </h3>
                            <p className="text-muted-foreground font-body leading-relaxed text-sm text-center mb-4">
                              {practice.description}
                            </p>
                            <div className="flex justify-center">
                              <span className="text-xs font-medium text-secondary/70 group-hover:text-secondary transition-colors flex items-center gap-2">
                                Виж повече
                                <Sparkles className="w-3 h-3 animate-pulse" />
                              </span>
                            </div>
                          </>
                        ) : (
                          <>
                            <h3 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">
                              {practice.title}
                            </h3>
                            <p className="text-muted-foreground font-body leading-relaxed text-lg mb-3">
                              {practice.description}
                            </p>
                          </>
                        )}

                        {/* Expanded content */}
                        {isExpanded && (
                          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-700">
                            <div className="border-t-2 border-border/50 pt-6">
                              <p className="text-foreground/90 font-body leading-relaxed text-lg mb-6">
                                {practice.details}
                              </p>

                              {practice.benefits && (
                                <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-2xl p-6 border border-border/50">
                                  <h4 className="font-heading text-xl font-bold text-foreground flex items-center gap-3 mb-4">
                                    <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-secondary/20">
                                      <Sparkles className="w-5 h-5 text-secondary" />
                                    </div>
                                    Ползи от практиката
                                  </h4>
                                  <ul className="space-y-3">
                                    {practice.benefits.map((benefit, i) => (
                                      <li
                                        key={i}
                                        className="text-foreground/80 font-body text-base flex items-start gap-3 group/item"
                                      >
                                        <span className="flex items-center justify-center w-6 h-6 rounded-full bg-secondary/20 text-secondary text-sm font-bold flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform">
                                          ✓
                                        </span>
                                        {benefit}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}

                              <button className="mt-6 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2 mx-auto md:mx-0">
                                Затвори
                                <span className="text-xs">✕</span>
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center max-w-4xl mx-auto">
            <div className="bg-card p-6 md:p-8 rounded-2xl shadow-lg border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 mb-4">
                <Heart className="w-6 h-6 text-primary" />
              </div>

              <h3 className="font-heading text-2xl md:text-3xl font-semibold mb-4 text-foreground">
                Интегриран подход
              </h3>

              <p className="text-muted-foreground font-body leading-relaxed text-base md:text-lg mb-6 max-w-2xl mx-auto">
                Практиките през седмицата са насочени към хора с траен интерес
                към йога, търсещи развитие и задълбочаване на познанията,
                уменията и ефектите на йога. Заниманията интегрират знания и
                практики от различните йогически традиции.
              </p>

              <Button
                variant="default"
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                onClick={() => {
                  router.push("/#booking");
                }}
              >
                <span className="flex items-center gap-3 justify-center">
                  Запази място в клас
                  <Sparkles className="w-5 h-5" />
                </span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
