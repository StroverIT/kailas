import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import { Button } from "@/components/ui/button";
import { FileText, Calendar } from "lucide-react";

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="font-heading text-2xl font-bold text-foreground mb-2">
          Админ панел
        </h1>
        <p className="text-muted-foreground font-body mb-8">
          Изберете секция за управление.
        </p>
        <div className="grid gap-4 sm:grid-cols-2">
          <AnimatedLink href="/admin/blog">
            <Button
              variant="outline"
              className="w-full h-auto flex flex-col items-start gap-2 p-6 text-left"
            >
              <FileText className="w-8 h-8 text-secondary" />
              <span className="font-heading font-semibold">Управление на блог</span>
              <span className="text-sm text-muted-foreground font-body">
                Създаване и редакция на публикации
              </span>
            </Button>
          </AnimatedLink>
          <AnimatedLink href="/admin/events">
            <Button
              variant="outline"
              className="w-full h-auto flex flex-col items-start gap-2 p-6 text-left"
            >
              <Calendar className="w-8 h-8 text-secondary" />
              <span className="font-heading font-semibold">Събития и имейли</span>
              <span className="text-sm text-muted-foreground font-body">
                Събития, записвания и събрани имейли
              </span>
            </Button>
          </AnimatedLink>
        </div>
      </main>
    </div>
  );
}
