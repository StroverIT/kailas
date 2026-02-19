"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const DEFAULT_IMAGES: Record<string, string> = {
  "yoga-v-delnika": "/images/blog-yoga-v-delnika.png",
  "yoga-nidra": "/images/blog-yoga-nidra.png",
  "purvi-stapki-yoga": "/images/blog-purvi-stapki-yoga.png",
  "yoga-za-vichki": "/images/blog-yoga-za-vichki.png",
};

type YogaPracticePost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string | null;
};

const YogaPracticesSection = () => {
  const [practices, setPractices] = useState<YogaPracticePost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?yogaPractices=1")
      .then((res) => (res.ok ? res.json() : []))
      .then((data: YogaPracticePost[]) => setPractices(Array.isArray(data) ? data : []))
      .catch(() => setPractices([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden border border-border bg-card h-80 animate-pulse"
              />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (practices.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practices.map((practice) => {
            const image =
              practice.image || DEFAULT_IMAGES[practice.slug] || "/images/blog-yoga-v-delnika.png";
            return (
              <div
                key={practice.id}
                className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-[705/368] overflow-hidden relative">
                  <Image
                    src={image}
                    alt={practice.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3 font-heading">
                    {practice.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-body line-clamp-3">
                    {practice.excerpt}
                  </p>
                  <Link
                    href={`/blog/${practice.slug}`}
                    className="inline-block text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-body"
                  >
                    Прочети повече &quot;{practice.title}&quot; →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YogaPracticesSection;
