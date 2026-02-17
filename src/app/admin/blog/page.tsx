"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  BlogPostTable,
  BlogPostFormDialog,
  useBlogPosts,
  emptyPost,
} from "@/components/admin/blog";
import type { BlogPostFormState } from "@/components/admin/blog";

export default function AdminBlogPage() {
  const { posts, loading, createOrUpdate, remove } = useBlogPosts();
  const [editing, setEditing] = useState<BlogPostFormState | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    const contentStr =
      typeof editing.content === "string"
        ? editing.content
        : JSON.stringify(editing.content);
    const categories = Array.isArray(editing.categories)
      ? editing.categories
      : String(editing.categories || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);
    const tags = Array.isArray(editing.tags)
      ? editing.tags
      : String(editing.tags || "")
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean);

    const payload = {
      slug: editing.slug,
      title: editing.title,
      excerpt: editing.excerpt,
      content: contentStr,
      date: editing.date,
      updatedDate: editing.updatedDate || null,
      categories,
      tags,
      featured: editing.featured,
      image: editing.image || null,
    };

    try {
      await createOrUpdate(payload, editing.id);
      setDialogOpen(false);
      setEditing(null);
    } catch {
      // toast handled in useBlogPosts
    }
  };

  const openNew = () => {
    setEditing({ ...emptyPost, content: "[]" });
    setDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <p className="text-muted-foreground">Зареждане...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="container mx-auto px-4 py-4 max-w-5xl flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold text-foreground">
          Управление на блог
        </h1>
        <Button onClick={openNew}>
          <Plus className="w-4 h-4 mr-1" />
          Нова публикация
        </Button>
      </div>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="bg-background rounded-lg border border-border overflow-hidden">
          <BlogPostTable
            posts={posts}
            onEdit={(post) => {
              setEditing(post);
              setDialogOpen(true);
            }}
            onDelete={remove}
          />
        </div>
      </main>

      <BlogPostFormDialog
        open={dialogOpen}
        editing={editing}
        onOpenChange={setDialogOpen}
        onEditingChange={setEditing}
        onSave={handleSave}
      />
    </div>
  );
}
