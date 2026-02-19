/**
 * Shared animation configuration for consistent scroll-triggered reveals across the site.
 * Use these values in GSAP animations for uniform timing and stagger.
 */
export const revealConfig = {
  /** Vertical distance elements travel on reveal (px) */
  y: {
    header: 40,
    content: 30,
    card: 40,
  },
  /** Animation duration (seconds) */
  duration: {
    header: 0.8,
    content: 0.8,
    card: 0.7,
    fast: 0.6,
  },
  /** Stagger delay between sequential items (seconds) */
  stagger: 0.08,
  /** Easing curve */
  ease: "power3.out" as const,
  /** ScrollTrigger start position */
  start: "top 85%" as const,
  startContent: "top 88%" as const,
} as const;
