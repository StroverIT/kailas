"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Начало", href: "/#hero" },
  { label: "За нас", href: "/#concept" },
  { label: "Услуги", href: "/#yoga-system" },
  { label: "Ретрийт база", href: "/#space" },
  { label: "Събития", href: "/#events" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-4 lg:px-8">
        <a href="/" className={`font-heading text-xl md:text-2xl font-bold transition-colors duration-500 ${scrolled ? "text-primary" : "text-white"}`}>
          Kailas <span className={`transition-colors duration-500 ${scrolled ? "text-secondary" : "text-secondary"}`}>Yogalife</span>
        </a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors duration-300 ${
                scrolled ? "text-foreground hover:text-secondary" : "text-white/90 hover:text-white"
              }`}
            >
              {link.label}
            </a>
          ))}
          <a href="/#booking">
            <Button variant="nav" size="default">
              Запази място
            </Button>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className={`md:hidden transition-colors duration-500 ${scrolled ? "text-foreground" : "text-white"}`}
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
              <a
                key={link.href}
                href={link.href}
                className="text-foreground font-medium py-2 hover:text-secondary transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a href="#booking" onClick={() => setMobileOpen(false)}>
              <Button variant="nav" className="w-full">
                Запази място
              </Button>
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
