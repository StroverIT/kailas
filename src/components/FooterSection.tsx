"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { revealConfig } from "@/lib/animationConfig";
import { Mail, Phone, MapPin } from "lucide-react";
import { AnimatedLink } from "@/components/transitions/PageTransition";

gsap.registerPlugin(ScrollTrigger);

const FooterSection = () => {
  const footerRef = useRef<HTMLElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      [brandRef, navRef, contactRef].forEach((ref, i) => {
        gsap.fromTo(
          ref.current,
          { opacity: 0, y: revealConfig.y.content },
          {
            opacity: 1,
            y: 0,
            duration: revealConfig.duration.content,
            delay: i * revealConfig.stagger,
            ease: revealConfig.ease,
            scrollTrigger: { trigger: ref.current, start: revealConfig.startContent },
          }
        );
      });
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: revealConfig.duration.fast,
          delay: revealConfig.stagger * 3,
          scrollTrigger: { trigger: bottomRef.current, start: revealConfig.startContent },
        }
      );
    }, footerRef);
    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="bg-foreground text-primary-foreground section-padding pb-8">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand */}
          <div ref={brandRef}>
            <AnimatedLink href="/" className="inline-block mb-4">
              <Image
                src="/logo.png"
                alt="Kailas Yogalife"
                width={400}
                height={1000}
                className="h-36 w-auto object-contain"
              />
            </AnimatedLink>
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed mb-4">
              „Да предоставим пространство, в което да преоткрием богатството на йога –
              за по-добър, по-щастлив и осъзнат живот."
            </p>
            <blockquote className="text-primary-foreground/50 font-body text-xs italic border-l-2 border-primary-foreground/20 pl-3">
              „Нека всеки следва пътя си според възможностите, разбиранията и темперамента си." — Св. Шивананда
            </blockquote>
          </div>

          {/* Navigation */}
          <div ref={navRef}>
            <h4 className="font-heading text-lg font-semibold mb-4">Навигация</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Начало", href: "/#hero" },
                { label: "За нас", href: "/za-nas" },
                { label: "Предлагаме ви", href: "/#yoga-system" },
                { label: "Ретрийт база", href: "/#space" },
                { label: "Събития", href: "/#events" },
                { label: "Блог", href: "/blog" },
                { label: "Фондация", href: "/#foundation" },
                { label: "Запази място", href: "/#booking" },
              ].map((link) => (
                <AnimatedLink
                  key={link.href}
                  href={link.href}
                  className="text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-body"
                >
                  {link.label}
                </AnimatedLink>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div ref={contactRef}>
            <h4 className="font-heading text-lg font-semibold mb-4">Контакти</h4>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:kailas.yogalife@gmail.com"
                className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-body"
              >
                <Mail className="w-4 h-4 shrink-0" />
                kailas.yogalife@gmail.com
              </a>
              <a
                href="tel:+359877844235"
                className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-body"
              >
                <Phone className="w-4 h-4 shrink-0" />
                +359 877 844 235
              </a>
              <div className="flex items-start gap-3 text-sm text-primary-foreground/60 font-body">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span>Природен парк „Врачански Балкан", 2 км от пещера Леденика, България</span>
              </div>
            </div>
          </div>
        </div>

        <div ref={bottomRef} className="border-t border-primary-foreground/10 pt-10 pb-4 text-center">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} Кайлас Йогалайф & Пракрити Йога. Всички права запазени.
          </p>
          <p className="text-sm text-primary-foreground/50 font-body mt-3">
            POWERED by{" "}
            <a
              href="https://strover.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline transition-colors"
            >
              STROVER
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
