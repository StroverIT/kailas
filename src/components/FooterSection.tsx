"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: ref.current, start: "top 92%" },
          }
        );
      });
      gsap.fromTo(
        bottomRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          delay: 0.3,
          scrollTrigger: { trigger: bottomRef.current, start: "top 95%" },
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
            <p className="text-primary-foreground/60 font-body text-sm leading-relaxed mb-6">
              „Да предоставим пространство, в което да преоткрием богатството на йога –
              за по-добър, по-щастлив и осъзнат живот."
            </p>
          </div>

          {/* Navigation */}
          <div ref={navRef}>
            <h4 className="font-heading text-lg font-semibold mb-4">Навигация</h4>
            <div className="flex flex-col gap-3">
              {[
                { label: "Начало", href: "/#hero" },
                { label: "За нас", href: "/#concept" },
                { label: "Услуги", href: "/#yoga-system" },
                { label: "Ретрийт база", href: "/#space" },
                { label: "Събития", href: "/#events" },
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
                href="mailto:info@prakriti-yoga.eu"
                className="flex items-center gap-3 text-sm text-primary-foreground/60 hover:text-secondary transition-colors font-body"
              >
                <Mail className="w-4 h-4 shrink-0" />
                info@prakriti-yoga.eu
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

        <div ref={bottomRef} className="border-t border-primary-foreground/10 pt-8 text-center">
          <p className="text-xs text-primary-foreground/40 font-body">
            © {new Date().getFullYear()} Кайлас Йогалайф & Пракрити Йога. Всички права запазени.
          </p>
          <p className="text-xs text-primary-foreground/40 font-body mt-2">
            POWERED by{" "}
            <a
              href="https://strover.bg"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline transition-colors"
            >
              strover
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
