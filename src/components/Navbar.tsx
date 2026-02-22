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

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
    );
  }, []);

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
            <Button
              variant="nav"
              className="w-full"
              onClick={() => {
                setMobileOpen(false);
                if (pathname === "/") {
                  // If already on home page, just scroll to booking section
                  const bookingSection = document.getElementById("booking");
                  if (bookingSection) {
                    bookingSection.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  // Navigate to home page with hash
                  router.push("/#booking");
                }
              }}
            >
              Запази място
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
