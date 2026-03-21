import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import { Button } from "@/components/ui/button";
import { FileText, Calendar, Images } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container mx-auto px-4 py-10 max-w-5xl">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-2">
          Админ панел
        </h1>
        <p className="text-muted-foreground font-body mb-8 text-base">
          Изберете секция за управление.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatedLink href="/admin/blog">
            <Button
              variant="outline"
              className="w-full h-full min-h-40 flex flex-col items-start gap-3 p-6 text-left whitespace-normal leading-relaxed"
            >
              <FileText className="w-6 h-6 text-secondary shrink-0" />
              <span className="font-heading text-lg font-semibold">
                Управление на блог
              </span>
              <span className="text-sm text-muted-foreground font-body break-words">
                Създаване и редакция на публикации
              </span>
            </Button>
          </AnimatedLink>
          <AnimatedLink href="/admin/events">
            <Button
              variant="outline"
              className="w-full h-full min-h-40 flex flex-col items-start gap-3 p-6 text-left whitespace-normal leading-relaxed"
            >
              <Calendar className="w-6 h-6 text-secondary shrink-0" />
              <span className="font-heading text-lg font-semibold">
                Събития и имейли
              </span>
              <span className="text-sm text-muted-foreground font-body break-words">
                Събития, записвания и събрани имейли
              </span>
            </Button>
          </AnimatedLink>
          <AnimatedLink href="/admin/gallery">
            <Button
              variant="outline"
              className="w-full h-full min-h-40 flex flex-col items-start gap-3 p-6 text-left whitespace-normal leading-relaxed"
            >
              <Images className="w-6 h-6 text-secondary shrink-0" />
              <span className="font-heading text-lg font-semibold">Галерия</span>
              <span className="text-sm text-muted-foreground font-body break-words">
                Качване и изтриване на снимки
              </span>
            </Button>
          </AnimatedLink>
        </div>
      </main>
    </div>
  );
}
