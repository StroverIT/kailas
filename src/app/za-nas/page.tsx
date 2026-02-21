"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FooterSection from "@/components/FooterSection";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import {
  Heart,
  Users,
  BookOpen,
  Sparkles,
  Mountain,
  Award,
} from "lucide-react";

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
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center shadow-sm">
              <Mountain className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Традицията – класическа интегрална йога на Бихарската школа
            </h2>
          </div>

          {/* Satyananda Yoga */}
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center flex-shrink-0 mt-1">
                <Sparkles className="w-5 h-5 text-secondary" />
              </div>
              <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground">
                Сатянанда йога
              </h3>
            </div>
            <div className="space-y-4 text-muted-foreground font-body leading-relaxed pl-13">
              <p>
                Разработена от Шри Свами Сатянанда и доразвивана от неговите
                ученици, традицията на Сатянанда йога ни предоставя пълноценна
                система за изучаване, практикуване и навлизане в дълбочина в
                познанието и практиката на йога в пълнотата и многообразието на
                това древно учение.
              </p>
              <p>
                Интегрирането на различните дялове на йога позволява на
                практикуващия да обхване всички аспекти на своя живот,
                благоприятства пълноценното му израстване в личностен план и
                създава условия за неговата духовна еволюция.
              </p>
              <p className="font-medium text-foreground/90">
                Тук йога не е изолирана практика, която се случва в рамките на
                класа по йога, а метод, който позволява да живееш йога - в
                осъзнат избор на житейско поведение и образ на живот.
              </p>
            </div>
          </div>

          {/* Yoga Chakra */}
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/20">
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="text-secondary">◉</span> Йога чакра или Колелото
              на йога
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Тук са видовете йога Бахиранга и Антаранга:{" "}
              <span className="font-semibold text-foreground">хатха йога</span>,{" "}
              <span className="font-semibold text-foreground">раджа йога</span>,{" "}
              <span className="font-semibold text-foreground">гяна йога</span>,{" "}
              <span className="font-semibold text-foreground">крия йога</span>,{" "}
              <span className="font-semibold text-foreground">бхакти йога</span>
              ,{" "}
              <span className="font-semibold text-foreground">карма йога</span>.
            </p>
          </div>

          {/* Yoga Vidya */}
          <div className="mb-12 p-8 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
            <h3 className="font-heading text-xl md:text-2xl font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="text-secondary">◉</span> Йога видя
            </h3>
            <p className="text-muted-foreground font-body leading-relaxed">
              Познанието на Ведите, Упанишадите и Пураните, запознаване с извори
              на йога от древността и мъдростта на адептите в йога. Връзката
              между древното познание и съвременните научни изследвания.
            </p>
          </div>

          {/* Working Environment */}
          <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30 shadow-lg">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center flex-shrink-0">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div>
                <p className="font-heading text-xl font-semibold text-foreground mb-2">
                  Работим в малки групи
                </p>
                <p className="text-muted-foreground font-body text-lg">
                  Обстановката е комфортна, спокойна и приятелска.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Inspiration */}
      <section className="section-padding bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center shadow-sm">
              <Heart className="w-6 h-6 text-secondary" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-semibold text-foreground">
              Вдъхновението
            </h2>
          </div>

          <div className="space-y-6 text-muted-foreground font-body leading-relaxed">
            {/* Timeline */}
            <div className="p-8 rounded-2xl bg-gradient-to-br from-secondary/5 to-transparent border border-secondary/20">
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 font-semibold text-secondary">
                    2010
                  </div>
                  <p>
                    Началото беше поставено с къща за киртан и духовни
                    споделяния, и обособено място за ведически ритуали.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 font-semibold text-secondary">
                    2019
                  </div>
                  <p>
                    Беше построена основната сграда – панорамна зала и споделено
                    пространство за сън с всички удобства.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-20 font-semibold text-secondary">
                    2023
                  </div>
                  <p>Къща с четири двойни стаи с всички удобства.</p>
                </div>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border-l-4 border-secondary">
              <p className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-secondary" />В основата - едно
                несекващо вдъхновение, пробудено от вълшебството на йога, което
                продължава вече 19 години.
              </p>
            </div>

            {/* Mariana Karlova */}
            <div className="mt-12 pt-12 border-t-2 border-secondary/20">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-secondary/20 to-secondary/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <h3 className="font-heading text-2xl font-semibold text-foreground">
                  Движещата сила
                </h3>
              </div>

              <div className="space-y-6 p-8 rounded-2xl bg-gradient-to-br from-muted/30 to-muted/10 border border-border/50">
                <div className="prose prose-lg max-w-none">
                  <p className="text-lg font-semibold text-foreground mb-6">
                    Мариана Кърлова - Даятма
                  </p>

                  <p>
                    Казвам се Мариана Кърлова, а духовното име, което ми дадоха
                    моите учители е{" "}
                    <span className="font-semibold text-foreground">
                      Даятма
                    </span>{" "}
                    – милосърдна, състрадателна душа, даваща светлина. То
                    очертава посоката, в която да се развивам занапред и
                    качествата към които да се стремя.
                  </p>

                  <div className="p-6 my-6 rounded-xl bg-secondary/5 border-l-4 border-secondary/50">
                    <p className="italic text-foreground">
                      Срещнах йога през пролетта на 2007 година. Впечатлението
                      от тази първа среща остана незабравимо за мен! Този момент
                      положи начало на пълно преобразяване в живота ми.
                    </p>
                  </div>

                  <p>
                    Йога се оказа това, към което подсъзнателно съм се стремяла
                    от детството си. Оттогава пътят, познанието, практиките и
                    мъдростта на йога станаха мое ежедневно вдъхновение и начин
                    на живот.
                  </p>

                  <p>
                    Йога, като практика и житейска философия, преобрази живота
                    ми и ме научи да се вглеждам по-задълбочено в себе си, в
                    околните и в заобикалящия ме свят. Започнах да откривам
                    красотата и доброто навсякъде около мен, да харесвам и
                    обичам себе си и живота, да обичам другите, и да бъда
                    съпричастна с тях. Сега всеки мой ден е изпълнен с усмивка,
                    добро настроение и радост. Благодарение на йога се оздравих,
                    станах по-жизнена и по-енергична, по-спокойна и балансирана,
                    по-радостна и по-креативна.
                  </p>

                  <div className="p-6 my-6 rounded-xl bg-muted/50">
                    <h4 className="font-heading text-lg font-semibold text-foreground mb-3">
                      Сатянанда йога / Бихарска школа
                    </h4>
                    <p>
                      Системата, по която практикувам, е известна в цял свят
                      като Сатянанда йога или Бихарска школа по йога. Това е
                      обучение по интегрална йога и включва:{" "}
                      <span className="font-medium">
                        асани, пранаяма, очистващи и енергийни практики,
                        релаксация, Йога Нидра и други медитативни практики,
                        мантра джапа и медитация, киртан, карма йога, сева йога,
                        раджа йога, бакти йога, сатсанг
                      </span>{" "}
                      – докосване до мъдростта на духовните учители на света и
                      древните ведически знания.
                    </p>
                  </div>

                  <p>
                    През август 2016 година завърших курс за инструктори по йога
                    в Сатянанда Ашрам Хелас в Гърция и оттогава започна моя път
                    като сертифициран преподавател по йога от Международния Йога
                    Алианс. Имах щастието да завърша и шест месечен курс за
                    преподаватели по медитация, воден от един от
                    най-квалифицираните учители с международно признание Свами
                    Ведантананда, която преподава на учители по йога от цял свят
                    повече от 20 години.
                  </p>

                  <p>
                    Продължавам да практикувам и уча задълбочено, и да навлизам
                    все по-навътре в необятния свят на йога – науката за живота.
                    Посещавам ашрамите на Гуру в Индия, минавам през множество
                    обучения и практикуми, организирани от уважавани учители на
                    международното йога общество.
                  </p>

                  <div className="p-6 my-6 rounded-xl bg-secondary/5">
                    <p className="font-medium text-foreground">
                      Преподавам йога в светлината на философията на йогийската
                      науката и ведическото познание.
                    </p>
                  </div>

                  <p>
                    Практиките са съчетание на хатха йога, мантра, релаксация и
                    медитация, работа с дъха и праничните потоци. В нашите
                    занимания се запознаваме и мъдростта на ведите и
                    упанишадите. Древните йогически текстове и преките препоръки
                    на учителите. Насочени са към цялостно хармонизиране и
                    постигане на баланс на всички нива на човека.
                  </p>

                  <p>
                    Междувременно, в годините, израстна и се реализира идеята за
                    обособяване на мястото в център за йога като начин на живот
                    – Йога център „Кайлас" на територията на Природен парк
                    „Врачански Балкан".
                  </p>

                  <p>
                    Тук всеки, който желае, да може да изучава йога като
                    практика на ежедневието и начин на живот. С благословията на
                    Свами Ниранджанананда – Гуру на Бихарската школа по йога и
                    незаменим учител и вдъхновител за мен, този център действа и
                    продължава да се развива и оформя облика си с подкрепата на
                    моето семейство, приятели и съмишленици.
                  </p>

                  <div className="p-8 my-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-secondary/5 border-2 border-secondary/30">
                    <p className="text-xl font-semibold text-foreground text-center">
                      Ако и вие искате да надзърнете в света на йога, да
                      преоткриете силата и енергията си, да опознаете себе си,
                      се оздравите, да се радвате повече на ежедневието си и
                      света, в който живеете, заповядайте при нас!
                    </p>
                  </div>
                </div>
              </div>
            </div>
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
