import Image from "next/image";
import { notFound } from "next/navigation";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import { blogPosts, getBlogPostBySlug } from "@/data/blogData";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/FooterSection";
import { ArrowLeft, Calendar } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return { title: "Публикация не е намерена" };
  return {
    title: `${post.title} | Блог | Кайлас Йогалайф`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero banner with optional image */}
      <section className="pt-28 pb-16 section-padding bg-gradient-section">
        <div className="container mx-auto max-w-4xl">
          {post.image && (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-8">
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 896px"
                priority
              />
            </div>
          )}
          <AnimatedLink
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-secondary transition-colors mb-8 font-body"
          >
            <ArrowLeft className="w-4 h-4" />
            Към блога
          </AnimatedLink>

          <div className="flex flex-wrap gap-3 text-xs font-body text-muted-foreground mb-4">
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

          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground">
            {post.title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container mx-auto max-w-4xl">
          <article className="prose prose-lg max-w-none prose-headings:font-heading prose-p:font-body prose-p:text-muted-foreground prose-p:leading-relaxed">
            {post.content.map((paragraph, i) => (
              <p key={i} className="mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
          </article>

          {post.tags.length > 0 && (
            <div className="mt-10 pt-8 border-t border-border">
              <p className="text-sm text-muted-foreground font-body mb-3">
                Етикети:
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-muted text-sm font-body text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
