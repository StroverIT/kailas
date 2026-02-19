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

    gsap.set(overlay, { autoAlpha: 0 });
    gsap.set(sunContainer, { scale: 0, opacity: 0 });
    gsap.set(labelEl, { y: 10, autoAlpha: 0 });

    const enter = gsap.timeline();
    enter
      .to(overlay, { autoAlpha: 1, duration: 0.3 })
      .to(sunContainer, { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)" }, "-=0.1")
      .to(labelEl, { y: 0, autoAlpha: 1, duration: 0.4 }, "-=0.3");

    gsap.to(sunGraphic, {
      rotation: 360,
      transformOrigin: "center center",
      duration: 15,
      repeat: -1,
      ease: "none",
    });

    gsap.to(sunGraphic, {
      scale: 1.1,
      transformOrigin: "center center",
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    if (!show) {
      gsap.timeline({
        onComplete: () => {
          document.documentElement.style.overflow = "";
          setMounted(false);
        },
      })
        .to(sunContainer, { scale: 0, opacity: 0, duration: 0.3, ease: "power2.in" })
        .to(overlay, { autoAlpha: 0, duration: 0.3 }, "-=0.1");
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, { dependencies: [mounted, show], scope: rootRef });

  if (!mounted) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[9999]">
      <div
        data-overlay
        className="absolute inset-0 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md"
      >
        <div data-sun className="flex h-32 w-32 items-center justify-center">
          <Sun
            data-sun-graphic
            className="h-full w-full overflow-visible text-amber-500"
            style={{ transformBox: "fill-box" }}
          />
        </div>

        <p data-label className="mt-12 text-xs font-bold tracking-[0.3em] uppercase text-slate-500">
          {label}
        </p>
      </div>
    </div>
  );
}