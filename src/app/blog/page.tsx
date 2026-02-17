import Image from "next/image";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import { getBlogPostsByPage, getTotalPages } from "@/lib/blog";
import FooterSection from "@/components/FooterSection";
import { Calendar } from "lucide-react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Блог | Кайлас Йогалайф",
  description:
    "Йога практики, знания и събития от Йога център Кайлас. Да приложим познанието на йога за един по-добър живот.",
};

export default async function BlogPage() {
  const [posts, totalPages] = await Promise.all([
    getBlogPostsByPage(1),
    getTotalPages(),
  ]);

  return (
    <div className="min-h-screen">
      <section className="pt-28 pb-16 section-padding bg-gradient-section">
        <div className="container mx-auto max-w-4xl">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Блог
          </h1>
          <p className="text-muted-foreground font-body text-lg">
            Йога практики, знания и събития. Да приложим познанието на йога за един по-добър живот.
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
          {totalPages > 1 && (
            <nav
              className="mt-12 pt-8 border-t border-border"
              aria-label="Разделяне на публикациите на страници"
            >
              <div className="flex justify-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (num) =>
                    num === 1 ? (
                      <span
                        key={num}
                        className="px-4 py-2 rounded-lg bg-secondary/20 text-secondary font-medium"
                      >
                        1
                      </span>
                    ) : (
                      <AnimatedLink
                        key={num}
                        href={`/blog/page/${num}`}
                        className="px-4 py-2 rounded-lg bg-muted hover:bg-muted/80 text-foreground font-body transition-colors"
                      >
                        {num}
                      </AnimatedLink>
                    )
                )}
              </div>
            </nav>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
