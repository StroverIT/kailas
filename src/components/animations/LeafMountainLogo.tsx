"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";

interface LeafMountainLogoProps {
  className?: string;
  size?: number;
}

export function LeafMountainLogo({ className = "", size = 80 }: LeafMountainLogoProps) {
  const mountainRef = useRef<SVGPathElement>(null);
  const leafRef = useRef<SVGPathElement>(null);
  const fillRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    const mountain = mountainRef.current;
    const leaf = leafRef.current;
    const fill = fillRef.current;
    if (!mountain || !leaf || !fill) return;

    const mountainLen = mountain.getTotalLength();
    const leafLen = leaf.getTotalLength();
    mountain.style.strokeDasharray = String(mountainLen);
    mountain.style.strokeDashoffset = String(mountainLen);
    leaf.style.strokeDasharray = String(leafLen);
    leaf.style.strokeDashoffset = String(leafLen);

    const tl = gsap.timeline({ delay: 0.3 });
    tl.to(mountain, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
    })
      .to(
        leaf,
        { strokeDashoffset: 0, duration: 0.8, ease: "power2.inOut" },
        "-=0.4"
      )
      .to(fill, { opacity: 1, duration: 0.5, ease: "power2.out" }, "-=0.2");
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        ref={mountainRef}
        d="M15 80 L30 50 L45 65 L55 45 L70 55 L85 80"
        stroke="#117047"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        ref={leafRef}
        d="M55 50 Q60 35 50 20"
        stroke="#117047"
        strokeWidth="2.5"
        strokeLinecap="round"
        fill="none"
      />
      <circle
        ref={fillRef}
        cx="50"
        cy="20"
        r="5"
        fill="#D1B170"
        opacity={0}
      />
    </svg>
  );
}
