import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { yogaTypes } from "@/data/yogaTypesData";

const YogaTypesSection = () => {
  return (
    <section id="yoga-types" className="section-padding bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-6">
          <p className="text-sm tracking-[0.2em] uppercase text-secondary font-body mb-3">
            Традиция
          </p>
          <h2 className="section-heading mb-6">Видове йога</h2>
        </div>

        {/* Intro text */}
        <div className="max-w-3xl mx-auto text-center mb-12 space-y-4">
          <p className="text-muted-foreground font-body leading-relaxed">
            <strong className="text-foreground">БАХИРАНГА</strong> или външна йога — практикуваме я за постигане на баланс в живота и хармония в различните измерения на личността.
          </p>
          <p className="text-muted-foreground font-body leading-relaxed">
            <strong className="text-foreground">АНТАРАНГА</strong> или вътрешна йога — чрез нея развиваме способността да управляваме генетично присъщите ни и вградени в поведението, личността и природата ни черти.
          </p>
        </div>

        {/* Yoga types grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {yogaTypes.map((yoga) => {
            const Icon = yoga.icon;

            return (
              <Link
                key={yoga.slug}
                href={`/yoga/${yoga.slug}`}
                className="glass-card p-6 flex flex-col hover-lift transition-all duration-300 group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-11 h-11 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-secondary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-lg font-semibold text-foreground">
                      {yoga.title}
                    </h3>
                    <p className="text-xs text-muted-foreground font-body">
                      {yoga.subtitle}
                    </p>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 border-secondary/40 pl-4 mb-3">
                  <p className="text-sm text-muted-foreground font-body italic leading-relaxed line-clamp-3">
                    {yoga.quote}
                  </p>
                  <cite className="text-xs text-secondary font-body not-italic mt-1 block">
                    — {yoga.quoteAuthor}
                  </cite>
                </blockquote>

                <span className="inline-flex items-center gap-1 text-xs text-secondary font-body font-medium mt-auto pt-3 group-hover:gap-2 transition-all">
                  Прочети повече
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default YogaTypesSection;
