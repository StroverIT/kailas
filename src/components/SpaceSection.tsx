"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import { Eye, Wind, Sunrise, Trees } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const spaces = [
  {
    image: "/images/HALL-2.png",
    icon: Eye,
    title: 'Зала „Панорама"',
    description:
      "100 кв.м. пространство с панорама от три страни. Оборудвана с постелки и помощни средства за практики. Професионално озвучаване, мултимедиен проектор, екран и микрофони.",
  },
  {
    image: "/images/20231029_1025372-2048x1197.jpg",
    icon: Wind,
    title: "Условия за въздушна йога",
    description:
      "До 11 люлки за въздушна йога при необходимост. Предоставяме пространството – ти избираш свой инструктор или практикуваш самостоятелно. Декомпресия на гръбнака и дълбока релаксация над земята.",
  },
  {
    image: "/images/20220521_202838-2-768x958.jpg",
    icon: Sunrise,
    title: "Настаняване",
    description:
      "Просторно общо спално помещение с 12 легла и панорамен изглед. 4 двойни стаи с отделен вход, самостоятелно санитарно помещение и тераса с изглед към изгрева. Съблекални, тоалетни и бани с топла вода.",
  },
  {
    image: "/images/20220520_201852-scaled.jpg",
    icon: Trees,
    title: "Тераса",
    description:
      "Просторна тераса за практики на открито, релаксация или медитация. Дишай с планината и природата около теб.",
  },
];

const SpaceSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
            },
          }
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
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            Ретрийт база
          </p>
          <h2 className="section-heading mb-6">Пространството Кайлас</h2>
          <p className="section-subheading mx-auto">
            Разположени на 10.6 декара в Природен парк „Врачански Балкан",
            нашите съоръжения съчетават природната красота с модерен комфорт.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
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
