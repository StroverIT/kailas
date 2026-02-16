"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Leaf } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const FoodSection = () => {
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
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="food"
      className="section-padding bg-muted/30"
    >
      <div ref={contentRef} className="container mx-auto max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
            <Leaf className="w-7 h-7 text-secondary" />
          </div>
          <div>
            <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body">
              Хранене
            </p>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Здравословна традиционна и аюрведична храна
            </h2>
          </div>
        </div>
        <div className="space-y-4 text-muted-foreground font-body leading-relaxed">
          <p>
            Йога като начин на живот включва и храненето. В центъра се придържаме
            към вегетарианско и аюрведично хранене. Приготвяме храната си заедно.
            Винаги има топъл чай от билките, които берем и събираме в района.
          </p>
          <p>
            На място отглеждаме подправки и зеленчуци, които влагаме в храната ни.
            В приготвянето на храната участваме всички, като тези, които желаят
            могат да получат основни познания в подготовката на продуктите,
            готвенето и здравословното хранене.
          </p>
          <blockquote className="border-l-4 border-secondary/50 pl-6 py-4 mt-8 italic text-foreground/90">
            „Нека всеки следва пътя си според възможностите, разбиранията и
            темперамента си." – Св. Шивананда
          </blockquote>
        </div>
      </div>
    </section>
  );
};

export default FoodSection;
