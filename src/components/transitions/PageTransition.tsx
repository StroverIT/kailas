"use client";

import {
  createContext,
  useContext,
  useRef,
  useMemo,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import gsap from "gsap";

// ---------------------------------------------------------------------------
// Context & Provider (curtain-style: scaleY cover + content blur)
// ---------------------------------------------------------------------------

type PageTransitionContextValue = {
  transitionTo: (href: string) => void;
};

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
);

export function usePageTransition() {
  const ctx = useContext(PageTransitionContext);
  return ctx;
}

// ---------------------------------------------------------------------------
// Provider: curtain overlay (scaleY from bottom) + content blur
// ---------------------------------------------------------------------------

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isRunningRef = useRef(false);

  const transitionTo = useMemo(() => {
    return (href: string) => {
      if (isRunningRef.current) return;
      isRunningRef.current = true;

      const overlay = overlayRef.current;
      const content = contentRef.current;
      if (!overlay) {
        router.push(href);
        isRunningRef.current = false;
        return;
      }

      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        onComplete: () => {
          isRunningRef.current = false;
        },
      });

      // Prep
      tl.set(overlay, { pointerEvents: "auto", autoAlpha: 1 })
        .set(overlay, { transformOrigin: "50% 100%", scaleY: 0 });
      if (content) tl.set(content, { filter: "blur(0px)" });

      // Cover (leave): curtain rises from bottom
      tl.to(overlay, { duration: 0.45, scaleY: 1 });
      if (content) {
        tl.to(content, { duration: 0.25, filter: "blur(4px)" }, "<");
      }

      // Navigate at peak cover
      tl.add(() => router.push(href));

      // Uncover (enter): curtain lowers from top
      tl.set(overlay, { transformOrigin: "50% 0%" });
      if (content) {
        tl.to(content, { duration: 0.25, filter: "blur(0px)" }, "+=0.05");
      }
      tl.to(overlay, { duration: 0.55, scaleY: 0 })
        .set(overlay, { autoAlpha: 0, pointerEvents: "none" });
    };
  }, [router]);

  const value = useMemo(() => ({ transitionTo }), [transitionTo]);

  return (
    <PageTransitionContext.Provider value={value}>
      {/* Curtain overlay */}
      <div
        ref={overlayRef}
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 9999,
          opacity: 0,
          visibility: "hidden",
          pointerEvents: "none",
          background: "hsl(var(--background))",
          transformOrigin: "50% 100%",
        }}
      />
      {/* Content wrapper (blur target) */}
      <div ref={contentRef} style={{ willChange: "filter" }}>
        {children}
      </div>
    </PageTransitionContext.Provider>
  );
}


// ---------------------------------------------------------------------------
// AnimatedLink – use instead of Next Link for internal page navigations
// ---------------------------------------------------------------------------

type AnimatedLinkProps = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof { href: string }
> & {
  href: string;
  className?: string;
  children: ReactNode;
};

function isInternalPageLink(href: string): boolean {
  if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return false;
  }
  if (href.startsWith("/")) return true;
  try {
    if (typeof window === "undefined") return false;
    const url = new URL(href);
    return url.origin === window.location.origin;
  } catch {
    return false;
  }
}

function isHashOnly(href: string): boolean {
  return href === "#" || href.startsWith("#");
}

export function AnimatedLink({
  href,
  className,
  children,
  onClick,
  ...rest
}: AnimatedLinkProps) {
  const ctx = usePageTransition();
  const pathname = usePathname();

  const isInternal = isInternalPageLink(href);
  const isHash = isHashOnly(href);

  const targetPath = href.split("#")[0] || "/";
  const isSamePage = targetPath === pathname || (targetPath === "/" && pathname === "/");

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;

    // Only use transition when navigating to a different page
    if (ctx && isInternal && !isSamePage) {
      e.preventDefault();
      ctx.transitionTo(href);
    }
  };

  // Hash-only links (same page anchors)
  if (isHash) {
    return (
      <a href={href} className={className} onClick={onClick} {...rest}>
        {children}
      </a>
    );
  }

  // External links
  if (!isInternal) {
    return (
      <a
        href={href}
        className={className}
        onClick={onClick}
        target="_blank"
        rel="noopener noreferrer"
        {...rest}
      >
        {children}
      </a>
    );
  }

  // Internal page link – use transition only when changing page
  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </Link>
  );
}
