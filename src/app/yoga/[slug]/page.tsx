import { notFound } from "next/navigation";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import { yogaTypes } from "@/data/yogaTypesData";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return yogaTypes.map((yoga) => ({ slug: yoga.slug }));
}

export default async function YogaTypePage({ params }: PageProps) {
  const { slug } = await params;
  const yoga = yogaTypes.find((y) => y.slug === slug);

  if (!yoga) {
    notFound();
  }

  const Icon = yoga.icon;

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero banner */}
      <section className="pt-28 pb-16 section-padding bg-gradient-section">
        <div className="container mx-auto max-w-4xl">
          <AnimatedLink
            href="/#yoga-types"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Към видове йога
          </AnimatedLink>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
              <Icon className="w-7 h-7 text-secondary" />
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
                {yoga.title}
              </h1>
              <p className="text-muted-foreground font-body">{yoga.subtitle}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 text-xs font-body text-muted-foreground">
            <span>{yoga.date}</span>
            {yoga.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Quote */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <blockquote className="border-l-4 border-secondary/50 pl-6 py-2">
            <p className="text-lg md:text-xl text-muted-foreground font-body italic leading-relaxed">
              {yoga.quote}
            </p>
            <cite className="text-sm text-secondary font-body not-italic mt-3 block">
              — {yoga.quoteAuthor}
            </cite>
          </blockquote>
        </div>
      </section>

      {/* Full content */}
      <section className="section-padding">
        <div className="container mx-auto max-w-4xl space-y-6">
          {yoga.fullContent.map((paragraph, i) => (
            <p
              key={i}
              className="text-muted-foreground font-body leading-relaxed text-base md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </section>

      {/* Navigation to other types */}
      <section className="section-padding bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="font-heading text-2xl font-semibold text-foreground mb-6">
            Другите видове йога
          </h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {yogaTypes
              .filter((y) => y.slug !== slug)
              .map((y) => {
                const OtherIcon = y.icon;
                return (
                  <AnimatedLink
                    key={y.slug}
                    href={`/yoga/${y.slug}`}
                    className="glass-card p-4 flex items-center gap-3 hover-lift"
                  >
                    <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                      <OtherIcon className="w-5 h-5 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-heading text-sm font-semibold text-foreground">
                        {y.title}
                      </h3>
                      <p className="text-xs text-muted-foreground font-body">
                        {y.subtitle}
                      </p>
                    </div>
                  </AnimatedLink>
                );
              })}
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
