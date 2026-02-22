"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatedLink } from "@/components/transitions/PageTransition";

const navLinks = [
  { label: "Начало", href: "/#hero" },
  { label: "Йога център", href: "/za-nas" },
  { label: "Практиките", href: "/praktiki" },
  { label: "Йога лайф стайл", href: "/yoga-lifestyle" },
  { label: "Събития", href: "/#events" },
  { label: "Блог", href: "/blog" },
];

const MENU_ANIMATION = {
  duration: 0.35,
  ease: "power3.inOut",
  stagger: 0.05,
};

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const menuInnerRef = useRef<HTMLDivElement>(null);
  const menuLinksRef = useRef<HTMLDivElement>(null);
  const hasBeenOpenRef = useRef(false);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  }, []);

  // Mobile menu GSAP animations
  useEffect(() => {
    const menu = menuRef.current;
    const menuInner = menuInnerRef.current;
    const menuLinks = menuLinksRef.current;

    if (!menu || !menuInner || !menuLinks) return;

    const linkItems = menuLinks.querySelectorAll("a, button");
    const { duration, ease, stagger } = MENU_ANIMATION;

    if (mobileOpen) {
      hasBeenOpenRef.current = true;
      gsap.killTweensOf([menu, menuInner, linkItems]);

      // Enter animation
      gsap.set(menu, { height: "auto", overflow: "hidden" });
      const fullHeight = menu.offsetHeight;
      gsap.set(menu, { height: 0 });
      gsap.set(menuInner, { opacity: 0, y: -12 });
      gsap.set(linkItems, { opacity: 0, y: 8 });

      const tl = gsap.timeline({ defaults: { duration, ease } });
      tl.to(menu, { height: fullHeight, duration: duration * 1.2 })
        .to(menuInner, { opacity: 1, y: 0 }, "-=0.25")
        .to(
          linkItems,
          { opacity: 1, y: 0, stagger, overwrite: true },
          "-=0.2",
        );
    } else {
      gsap.killTweensOf([menu, menuInner, linkItems]);

      if (!hasBeenOpenRef.current) {
        // Initial closed state - set instantly
        gsap.set(menu, { height: 0, overflow: "hidden" });
        gsap.set(menuInner, { opacity: 0, y: -12 });
        gsap.set(linkItems, { opacity: 0, y: 8 });
      } else {
        // Exit animation
        const tl = gsap.timeline({ defaults: { duration, ease } });
        tl.to(linkItems, { opacity: 0, y: -8, stagger: stagger / 2 })
          .to(menuInner, { opacity: 0, y: -12 }, "-=0.2")
          .to(menu, { height: 0, overflow: "hidden", duration: duration * 1.2 }, "-=0.1");
      }
    }
  }, [mobileOpen]);

  // Handle hash navigation after page load
  useEffect(() => {
    const hash = window.location.hash;
    if (hash && pathname === "/") {
      // Scroll to top immediately to prevent browser's default hash scroll
      window.scrollTo(0, 0);

      const scrollToElement = () => {
        const element = document.getElementById(hash.substring(1));
        if (element) {
          // Use requestAnimationFrame to ensure rendering is complete
          requestAnimationFrame(() => {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
          });
        }
      };

      // Wait for page transition animation to complete
      const timer = setTimeout(scrollToElement, 1300);

      return () => clearTimeout(timer);
    }
  }, [pathname]);

  if (pathname?.includes("/admin")) return null;

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-md py-3 transition-all duration-500"
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
              className="text-sm font-medium text-foreground hover:text-secondary transition-colors duration-300"
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
          className="md:hidden text-foreground transition-colors duration-500"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu - always mounted for exit animation */}
      <div ref={menuRef} className="md:hidden overflow-hidden h-0">
        <div
          ref={menuInnerRef}
          className="bg-background/98 backdrop-blur-lg border-t border-border"
        >
          <div
            ref={menuLinksRef}
            className="flex flex-col gap-4 px-6 py-6"
          >
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
            <Button
              variant="nav"
              className="w-full"
              onClick={() => {
                setMobileOpen(false);
                if (pathname === "/") {
                  const bookingSection = document.getElementById("booking");
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  router.push("/#booking");
                }
              }}
            >
              Запази място
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
