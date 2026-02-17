"use client";

import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { AnimatedLink } from "@/components/transitions/PageTransition";
import { Button } from "@/components/ui/button";
import { LayoutDashboard, FileText, Calendar, ArrowLeft, LogOut, ChevronLeft } from "lucide-react";

export function AdminNav() {
  const pathname = usePathname();
  if (!pathname || pathname === "/admin/login") return null;

  const isSubPage = pathname !== "/admin" && pathname.startsWith("/admin");

  return (
    <header className="bg-background border-b border-border sticky top-0 z-40">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <nav className="flex items-center gap-1">
          {isSubPage && (
            <AnimatedLink href="/admin">
              <Button variant="outline" size="sm">
                <ChevronLeft className="w-4 h-4 mr-1" />
                Назад
              </Button>
            </AnimatedLink>
          )}
          <AnimatedLink href="/admin">
            <Button
              variant={pathname === "/admin" ? "secondary" : "ghost"}
              size="sm"
            >
              <LayoutDashboard className="w-4 h-4 mr-1" />
              Начало
            </Button>
          </AnimatedLink>
          <AnimatedLink href="/admin/blog">
            <Button
              variant={pathname.startsWith("/admin/blog") ? "secondary" : "ghost"}
              size="sm"
            >
              <FileText className="w-4 h-4 mr-1" />
              Блог
            </Button>
          </AnimatedLink>
          <AnimatedLink href="/admin/events">
            <Button
              variant={pathname.startsWith("/admin/events") ? "secondary" : "ghost"}
              size="sm"
            >
              <Calendar className="w-4 h-4 mr-1" />
              Събития
            </Button>
          </AnimatedLink>
        </nav>
        <div className="flex items-center gap-2">
          <AnimatedLink href="/">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Към сайта
            </Button>
          </AnimatedLink>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
          >
            <LogOut className="w-4 h-4 mr-1" />
            Изход
          </Button>
        </div>
      </div>
    </header>
  );
}
