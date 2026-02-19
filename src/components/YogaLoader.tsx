"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Sun from "@/assets/svg/Sun";

type YogaLoaderProps = {
  show: boolean;
  label?: string;
};

export default function YogaLoader({ show, label = "Preparing..." }: YogaLoaderProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [mounted, setMounted] = useState(show);

  useEffect(() => {
    if (show) setMounted(true);
  }, [show]);

  useGSAP(() => {
    if (!mounted || !rootRef.current) return;

    const overlay = "[data-overlay]";
    const sunContainer = "[data-sun]";
    const sunGraphic = "[data-sun-graphic]";
    const labelEl = "[data-label]";
    const glow = "[data-sun-glow]";

    // 1. Initial Setup
    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(sunContainer, { scale: 0.4, opacity: 0, rotate: -15 });
    gsap.set(labelEl, { y: 15, autoAlpha: 0 });
    gsap.set(glow, { scale: 0.8, opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    // 2. Entrance (Premium "Elastic" Pop)
    tl.to(overlay, { autoAlpha: 1, duration: 0.6 })
      .to(sunContainer, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.4,
        ease: "elastic.out(1, 0.8)"
      }, "-=0.4")
      .to(glow, {
        scale: 1,
        opacity: 0.5,
        duration: 2
      }, "-=1.2")
      .to(labelEl, {
        y: 0,
        autoAlpha: 1,
        duration: 0.8
      }, "-=1.4");

    // 3. The "Solar" Loop Animations

    // Smooth, constant rotation of the sun
    gsap.to(sunGraphic, {
      rotation: 360,
      transformOrigin: "center center",
      duration: 25,
      repeat: -1,
      ease: "none",
    });

    // The "Pulsing Core" effect (Complex Heartbeat)
    gsap.to(sunGraphic, {
      scale: 1.12,
      transformOrigin: "center center",
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
    });

    // Atmospheric Glow Pulse
    gsap.to(glow, {
      scale: 1.4,
      opacity: 0.2,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // 4. Exit Animation
    if (!show) {
      gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          setMounted(false);
        },
      })
        .to(labelEl, { y: -10, autoAlpha: 0, duration: 0.2 })
        .to(sunContainer, {
          scale: 0.2,
          opacity: 0,
          rotate: 45,
          duration: 0.4,
          ease: "expo.in"
        }, "-=0.1")
        .to(overlay, { autoAlpha: 0, duration: 0.3 }, "-=0.2");
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, { dependencies: [mounted, show], scope: rootRef });

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[99]">
      <div
        data-overlay
        className="absolute inset-0 flex flex-col items-center justify-center bg-white/95 backdrop-blur-sm"
      >
        {/* The Solar Aura (Glow behind the sun) */}
        <div
          data-sun-glow
          className="absolute h-40 w-40 rounded-full bg-amber-200 blur-[40px] pointer-events-none"
        />

        <div data-sun className="relative flex h-36 w-36 items-center justify-center">
          <Sun
            data-sun-graphic
            className="h-full w-full overflow-visible text-amber-500 drop-shadow-[0_0_10px_rgba(245,158,11,0.3)]"
            style={{ transformBox: "fill-box" }}
          />
        </div>

        <p
          data-label
          className="mt-14 text-[11px] font-bold tracking-[0.4em] uppercase text-slate-400 select-none"
        >
          {label}
        </p>
      </div>
    </div>
  );
}