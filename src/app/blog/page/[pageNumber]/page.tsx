import Image from "next/image";
import { notFound } from "next/navigation";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import {
  getBlogPostsByPage,
  getTotalPages,
} from "@/data/blogData";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ pageNumber: string }>;
}

export async function generateStaticParams() {
  const totalPages = getTotalPages();
  return Array.from({ length: totalPages - 1 }, (_, i) => ({
    pageNumber: String(i + 2),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { pageNumber } = await params;
  const num = parseInt(pageNumber, 10);
  return {
    title: `Блог - Страница ${num} | Кайлас Йогалайф`,
    description:
      "Йога практики, знания и събития от Йога център Кайлас. Страница " + num,
  };
}

export default async function BlogPagePage({ params }: PageProps) {
  const { pageNumber } = await params;
  const num = parseInt(pageNumber, 10);
  const totalPages = getTotalPages();

  if (isNaN(num) || num < 2 || num > totalPages) {
    notFound();
  }

  const posts = getBlogPostsByPage(num);

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 section-padding bg-gradient-section">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Блог
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Йога практики, знания и събития. Страница {num} от {totalPages}.
          </p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="space-y-8">
            {posts.map((post) => (
              <article
                key={post.slug}
                className="glass-card overflow-hidden hover-lift group"
              >
                <div className="flex flex-col md:flex-row">
                  {post.image && (
                    <div className="relative w-full md:w-64 aspect-video md:aspect-[4/3] shrink-0">
                      <AnimatedLink href={`/blog/${post.slug}`} className="block h-full">
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 256px"
                        />
                      </AnimatedLink>
                    </div>
                  )}
                <div className="flex flex-col gap-4 p-6 md:p-8 flex-1">
                  <div className="flex flex-wrap gap-3 text-xs font-body text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {post.date}
                      {post.updatedDate && ` – ${post.updatedDate}`}
                    </span>
                    {post.categories.map((cat) => (
                      <span
                        key={cat}
                        className="px-2 py-0.5 rounded-full bg-secondary/10 text-secondary"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                  <AnimatedLink href={`/blog/${post.slug}`} className="block">
                    <h2 className="font-heading text-xl md:text-2xl font-semibold text-foreground group-hover:text-secondary transition-colors mb-3">
                      {post.title}
                    </h2>
                  </AnimatedLink>
                  <p className="text-muted-foreground font-body leading-relaxed">
                    {post.excerpt}
                  </p>
                  <AnimatedLink
                    href={`/blog/${post.slug}`}
                    className="text-sm font-medium text-secondary hover:underline inline-flex items-center gap-1 mt-2"
                  >
                    Прочети повече
                    <span aria-hidden>→</span>
                  </AnimatedLink>
                </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <nav
            className="mt-12 pt-8 border-t border-border"
            aria-label="Разделяне на публикациите на страници"
          >
            <div className="flex justify-center gap-2 flex-wrap">
              <AnimatedLink
                href="/blog"
                className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-body transition-colors"
              >
                1
              </AnimatedLink>
              {Array.from({ length: totalPages - 1 }, (_, i) => i + 2).map(
                (p) =>
                  p === num ? (
                    <span
                      key={p}
                      className="px-4 py-2 rounded-lg bg-secondary/20 text-secondary font-medium"
                    >
                      {p}
                    </span>
                  ) : (
                    <AnimatedLink
                      key={p}
                      href={`/blog/page/${p}`}
                      className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-body transition-colors"
                    >
                      {p}
                    </AnimatedLink>
                  )
              )}
            </div>
          </nav>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
