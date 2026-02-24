"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Compass } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const PurposeSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: contentRef.current, start: "top 85%" },
        },
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="purpose"
      className="section-padding bg-background"
    >
      <div ref={contentRef} className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
            <Compass className="w-7 h-7 text-primary" />
          </div>
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body">
              Предназначение
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Място за изучаване и споделяне на йога като начин на живот
            </h2>
          </div>
        </div>
        <div className="space-y-6 text-muted-foreground font-body leading-relaxed text-base md:text-lg">
          <p>
            Центърът е изграден като{" "}
            <strong className="text-foreground">
              място за изучаване и споделяне на йога като начин на живот
            </strong>
            . По време на участието в ежедневните дейности се запознавате и
            изучавате различни видове йога и се учите как да ги вграждате в
            ежедневието си, за да подобрите качеството си на живот.
          </p>
          <p>
            Нашата мисия е да осигурим пространство и достъп до преживяване на
            йога като цялостна система за живот. Постепенно, с опознаването на{" "}
            <strong className="text-foreground">
              философията и практиките на йога
            </strong>
            , се свързвате по-пълноценно с вътрешния си свят и се научавате да
            хармонизирате този свят със света, който ви обгражда в ежедневието.
          </p>
          <p>
            Центърът предлага и{" "}
            <strong className="text-foreground">
              класически йога практики на място и онлайн
            </strong>
            , с които да придобиете базови познания и умения в йога, да
            обогатите преживяването си, да се фокусирате върху конкретни
            здравословни проблеми или житейски дилеми.
          </p>
          <p className="font-heading text-lg text-foreground/90">
            За кратко или по-дълго сте{" "}
            <strong className="text-secondary">
              добре дошли в{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-forest-light">
                „Кайлас“
              </span>{" "}
              йога център
            </strong>
            , за да се върнете към себе си, да преосмислите пътя си и да
            продължите напред.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PurposeSection;
