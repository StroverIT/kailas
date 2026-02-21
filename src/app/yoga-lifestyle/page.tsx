"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterSection from "@/components/FooterSection";
import { Heart, Sparkles, Sun, Leaf, Mountain, BookOpen } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

export default function YogaLifestylePage() {
  const heroRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const benefitsRef = useRef<HTMLDivElement>(null);
  const principlesRef = useRef<HTMLDivElement>(null);
  const programRef = useRef<HTMLDivElement>(null);

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
        benefitsRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: benefitsRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        principlesRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: principlesRef.current, start: "top 85%" },
        },
      );
      gsap.fromTo(
        programRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: { trigger: programRef.current, start: "top 85%" },
        },
      );
    });
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
            Начин на живот
          </p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Йога - път към осъзнат живот
          </h1>
          <p className="text-xl md:text-2xl font-body leading-relaxed text-muted-foreground max-w-3xl mx-auto">
            Оцветете живота си в осъзната радост, истинска любов и безпричинно
            щастие!
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section ref={introRef} className="py-16 section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card p-8 md:p-12 rounded-2xl shadow-lg border border-border">
            <div className="prose prose-lg max-w-none">
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Внедрете йога в ежедневието си – постепенно и с малки стъпки.
                Това ще промени призмата, през която виждате и разбирате
                случващото се с вас, с хорта около вас и света наоколо!
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Йогийската практика и познание, събрани в личното ви преживяване
                и осъзната промяна, ще ви помогнат да се оздравите, не само
                физически. Прилагането на йога – нейното познание и практики, в
                живия живот е в състояние да пречисти ума и емоциите ви, да
                премахне негативите и тъмнината, покриващи с дебели пластове
                непресъхващия извор на светлина от Вселенското съзнание, която
                грее винаги в нас, и е източник на живота ни.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                Малко по малко ще премахнете пластовете на замърсяване,
                усвоените погрешни модели на поведение и мислене, вредните
                навици, всичко което пречи на светлината и извора на
                непресъхваща жизненост, радост и любов да се прояви в своята
                пълнота и изобилие в живота ви.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mb-6">
                За това ще ви помогнат инструментите на йога, така добре
                съчетани и отработени в хилядолетията, интегрирани в цялостна
                система за трансформация на личността, водеща до разгръщане на
                пълния потенциал, изначално заложен във всеки от нас, още до
                раждането ни в това тяло.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 section-padding bg-gradient-section">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-lg font-body text-foreground">
                Адаптирайте се към себе си и Вселената
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Sparkles className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-lg font-body text-foreground">
                Практикувайте и хармонизирайте ума и емоциите си
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                <Sun className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-lg font-body text-foreground">
                Върнете се към изначалната истина за себе си
              </p>
            </div>
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-foreground mb-8">
            Вземете решение ДА ОЗДРАВИТЕ ЖИВОТА СИ!
          </h2>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section ref={programRef} className="py-20 section-padding">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12">
            КАКВО ЩЕ ПОЛУЧИТЕ?
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Leaf className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Кратко обучение
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Йога капсули за ежедневните стъпки – 5 или 10 дневен курс
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Mountain className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Дълъг престой
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Потапяне в йогийския ритъм на живот според индивидуалните
                    желания и възможности
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Докосване до природата
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Осъзнаване как връзката ни с нейната енергия и благодат
                    задълбочава ефекта на практиките
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card p-8 rounded-xl shadow-lg border border-border">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-foreground">
                    Философия на йога
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Постепенно навлизане във философията на йога, която е
                    източник на знание за всички аспекти на природата на човека
                    и света
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-section p-8 md:p-12 rounded-xl">
            <p className="text-lg leading-relaxed text-muted-foreground text-center">
              Докато участвате в ежедневните дейности на Центъра, се запознавате
              и практикувате различни видове йога. Учите как да вграждате
              наученото в ежедневието си, така че да подобрите качеството на
              живота си.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section ref={principlesRef} className="py-20 section-padding bg-card">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-12">
            Три основни момента
          </h2>
          <div className="space-y-8">
            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold text-lg">1</span>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Животът е това, което се живее чрез ума си. Това означава,
                    че животът е израз на вашия ум и прана, като осъзнаване и
                    жизненост, или ум и прана съществуват едновременно.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold text-lg">2</span>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground mb-4">
                    Целта или намерението на йога има два етапа:
                  </p>
                  <ul className="space-y-3 text-muted-foreground">
                    <li className="flex items-start gap-3">
                      <span className="text-secondary mt-1">•</span>
                      <span>
                        <strong>Първият етап:</strong> Пробуждане на творческите
                        способности – усилието и садханата, през които
                        преминаваме, за да развием положителното
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-secondary mt-1">•</span>
                      <span>
                        <strong>Вторият етап:</strong> Култивиране на духовно
                        съзнание – проявяването на тези творчески и положителни
                        способности или начин на живот, който е благоприятен за
                        постигане на духовно осъзнаване
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-background p-8 rounded-xl border border-border">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-secondary font-bold text-lg">3</span>
                </div>
                <div>
                  <p className="text-lg leading-relaxed text-muted-foreground">
                    Необходимостта от интегриране на йога в живота – йогийски
                    живот, към което се стремим.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Wisdom Section */}
      <section ref={benefitsRef} className="py-20 section-padding">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-section p-8 md:p-12 rounded-2xl">
            <div className="text-center mb-8">
              <Sparkles className="w-12 h-12 text-secondary mx-auto mb-4" />
              <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground mb-6">
                Йога е начин на живот
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
              <p>
                В крайна сметка йога е начин на живот. Не е практика. Защото
                след като йогийските принципи бъдат усвоени и станат част от
                живота, нагласите, възприятията, взаимодействията, умът,
                действията и поведението ще се подобрят.
              </p>
              <p>
                За да се отговори на предизвикателството на втората глава,
                експресивните и поведенческите компоненти на йога, аспектите на
                антаранга и бахиранга, трябва да се обединят.
              </p>
              <p className="font-semibold text-foreground">
                Когато главата, сърцето и ръцете се обединят, един обикновен
                момент може да стане божествен. Един обикновен живот може да се
                превърне в божествен живот.
              </p>
              <p className="text-sm italic text-center mt-8">
                Из „Yoga Dharma Yoga Lifestyle Yamas and Niyamas"
              </p>
            </div>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
