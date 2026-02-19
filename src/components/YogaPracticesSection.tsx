"use client";

import Link from "next/link";
import Image from "next/image";

const practices = [
  {
    image: "/images/blog-yoga-v-delnika.png",
    title: "Йога в делника",
    description:
      "Практиките през седмицата са насочени към хора с траен интерес към йога, търсещи развитие и задълбочаване на познанията, уменията и ефектите на йога. Заниманията интегрират знания и практики от различни видове...",
    slug: "yoga-v-delnika",
  },
  {
    image: "/images/blog-yoga-nidra.png",
    title: "Йога Нидра",
    description:
      "Пълната почивка, без да заспите, е основното предимство на практиката, без да се задълбочавате в процеса на самопознание. Овладяването на умението за преместване на съзнанието, без да се концентрирате върху случващото...",
    slug: "yoga-nidra",
  },
  {
    image: "/images/blog-purvi-stapki-yoga.png",
    title: "Първи стъпки в Йога",
    description:
      "Целта на този цикъл от практики е да ви даде ясно знание за това какво е йога и какво може да допринесе тя в живота ви. В този курс ви представяме...",
    slug: "yoga-first-steps",
  },
  {
    image: "/images/blog-yoga-za-vichki.png",
    title: "Йога за всички",
    description:
      "Практиката цели да премахне натрупаната умора, да освободи блокажите в тялото, да го направи по-подвижно и по-гъвкаво. Едновременно се подобрява мускулният тонус и се увеличава общото усещане за виталност. Умът става...",
    slug: "yoga-for-everyone",
  },
];

const YogaPracticesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {practices.map((practice) => (
            <div
              key={practice.slug}
              className="group rounded-2xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-lg transition-shadow duration-300"
            >
              <div className="aspect-[705/368] overflow-hidden relative">
                <Image
                  src={practice.image}
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
                <p className="text-muted-foreground text-sm leading-relaxed mb-4 font-body">
                  {practice.description}
                </p>
                <Link
                  href={`/yoga/${practice.slug}`}
                  className="inline-block text-sm font-semibold text-primary hover:text-primary/80 transition-colors font-body"
                >
                  Прочети повече &quot;{practice.title}&quot; →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default YogaPracticesSection;
