"use client";

import { useRef, useState, type ReactNode } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface SunGlowButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  variant?: "hero" | "hero-outline";
  onClick?: () => void;
  as?: "button" | "a";
}

export function SunGlowButton({
  children,
  className,
  href,
  variant = "hero",
  onClick,
  as = "a",
}: SunGlowButtonProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const glowRef = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const MAGNET_STRENGTH = 8;
  const handleMouseMove = (e: React.MouseEvent) => {
    const el = wrapperRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = (e.clientX - centerX) / rect.width;
    const dy = (e.clientY - centerY) / rect.height;
    const x = Math.max(-1, Math.min(1, dx)) * MAGNET_STRENGTH;
    const y = Math.max(-1, Math.min(1, dy)) * MAGNET_STRENGTH;
    setPos({ x, y });
  };

  const handleMouseLeave = () => {
    setPos({ x: 0, y: 0 });
    gsap.to(glowRef.current, {
      scale: 1,
      opacity: 0.4,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleMouseEnter = () => {
    gsap.to(glowRef.current, {
      scale: 1.4,
      opacity: 0.7,
      duration: 0.4,
      ease: "power2.out",
    });
  };

  const handleClick = () => {
    if (btnRef.current) {
      gsap.fromTo(
        btnRef.current,
        { scale: 0.96 },
        { scale: 1, duration: 0.3, ease: "elastic.out(1, 0.5)" },
      );
      if (glowRef.current) {
        gsap.fromTo(
          glowRef.current,
          { scale: 1.5, opacity: 0.8 },
          { scale: 1.4, opacity: 0.6, duration: 0.25 },
        );
      }
    }
    onClick?.();
  };

  const variantClass =
    variant === "hero"
      ? "bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg hover:shadow-xl font-semibold tracking-wide"
      : "border-2 border-primary-foreground/60 text-primary-foreground hover:bg-primary-foreground/10 backdrop-blur-sm font-medium";

  const commonProps = {
    onClick: handleClick,
    className: cn(
      "relative inline-flex items-center justify-center text-sm sm:text-base px-6 py-4 sm:px-8 sm:py-6 rounded-md transition-transform duration-200 ease-out w-full sm:w-auto",
      variantClass,
      className,
    ),
    style: {
      transform: `translate(${pos.x}px, ${pos.y}px)`,
    } as React.CSSProperties,
  };

  return (
    <div
      ref={wrapperRef}
      className="relative inline-block"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <span
        ref={glowRef}
        className="absolute inset-0 rounded-lg bg-[#D1B170]/30 blur-xl scale-100 -z-10 pointer-events-none opacity-40"
        aria-hidden
      />
      {as === "a" && href ? (
        <a
          ref={btnRef as React.RefObject<HTMLAnchorElement>}
          href={href}
          {...commonProps}
        >
          {children}
        </a>
      ) : (
        <button
          ref={btnRef as React.RefObject<HTMLButtonElement>}
          type="button"
          {...commonProps}
        >
          {children}
        </button>
      )}
    </div>
  );
}
