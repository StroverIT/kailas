"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { AnimatedLink } from "@/components/transitions/PageTransition";

const navLinks = [
  { label: "Начало", href: "/#hero" },
  { label: "За нас", href: "/za-nas" },
  { label: "Предлагаме ви", href: "/#yoga-system" },
  { label: "Ретрийт база", href: "/#space" },
  { label: "Събития", href: "/#events" },
  { label: "Блог", href: "/blog" },
  { label: "Фондация", href: "/#foundation" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  const isHomePage = pathname === "/";
  const showTransparentNav = isHomePage && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }
    );
  }, []);

  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${showTransparentNav
        ? "bg-transparent py-5"
        : "bg-background/95 backdrop-blur-md shadow-md py-3"
        }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <AnimatedLink href="/" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Kailas Yogalife"
            width={120}
            height={48}
            className="h-10 md:h-12 w-auto object-contain"
          />
        </AnimatedLink>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <AnimatedLink
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${showTransparentNav ? "text-white/90 hover:text-white" : "text-foreground hover:text-secondary"
                }`}
            >
              {link.label}
            </AnimatedLink>
          ))}
          <AnimatedLink href="/#booking">
            <Button variant="nav" size="default">
              Запази място
            </Button>
          </AnimatedLink>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors duration-500 ${showTransparentNav ? "text-white" : "text-foreground"}`}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-lg border-t border-border animate-fade-up">
          <div className="flex flex-col gap-4 px-6 py-6">
            {navLinks.map((link) => (
              <AnimatedLink
                key={link.href}
                href={link.href}
                className="text-foreground font-medium py-2 hover:text-secondary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </AnimatedLink>
            ))}
            <AnimatedLink href="/#booking" onClick={() => setMobileOpen(false)}>
              <Button variant="nav" className="w-full">
                Запази място
              </Button>
            </AnimatedLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
