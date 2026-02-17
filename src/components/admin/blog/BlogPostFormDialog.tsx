"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { BlogPostImageUpload } from "./BlogPostImageUpload";
import { contentToEditable, editableToContent, slugFromTitle } from "./utils";
import type { BlogPostFormState } from "./types";

type BlogPostFormDialogProps = {
  open: boolean;
  editing: BlogPostFormState | null;
  onOpenChange: (open: boolean) => void;
  onEditingChange: (state: BlogPostFormState | null) => void;
  onSave: (e: React.FormEvent) => void;
};

export function BlogPostFormDialog({
  open,
  editing,
  onOpenChange,
  onEditingChange,
  onSave,
}: BlogPostFormDialogProps) {
  if (!editing) return null;

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) {
          onOpenChange(false);
          onEditingChange(null);
        }
      }}
    >
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading">
            {editing.id ? "Редактирай публикация" : "Нова публикация"}
          </DialogTitle>
          <DialogDescription className="sr-only">
            Форма за {editing.id ? "редактиране" : "създаване"} на публикация
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSave} className="space-y-4">
          <div className="space-y-2">
            <Label>Заглавие *</Label>
            <Input
              required
              value={editing.title}
              onChange={(e) => {
                const title = e.target.value;
                onEditingChange({
                  ...editing,
                  title,
                  slug:
                    editing.id && editing.slug
                      ? editing.slug
                      : slugFromTitle(title) || editing.slug,
                });
              }}
            />
          </div>
          <div className="space-y-2">
            <Label>Slug *</Label>
            <Input
              required
              value={editing.slug}
              onChange={(e) =>
                onEditingChange({ ...editing, slug: e.target.value })
              }
              placeholder="url-identifier"
            />
          </div>
          <div className="space-y-2">
            <Label>Кратко описание (excerpt) *</Label>
            <Textarea
              required
              rows={2}
              value={editing.excerpt}
              onChange={(e) =>
                onEditingChange({ ...editing, excerpt: e.target.value })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Съдържание (параграфи, разделени с празен ред)</Label>
            <Textarea
              rows={6}
              value={contentToEditable(editing.content)}
              onChange={(e) =>
                onEditingChange({
                  ...editing,
                  content: editableToContent(e.target.value),
                })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Дата *</Label>
              <Input
                required
                placeholder="DD/MM/YYYY"
                value={editing.date}
                onChange={(e) =>
                  onEditingChange({ ...editing, date: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label>Обновена дата</Label>
              <Input
                placeholder="DD/MM/YYYY"
                value={editing.updatedDate || ""}
                onChange={(e) =>
                  onEditingChange({
                    ...editing,
                    updatedDate: e.target.value || null,
                  })
                }
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label>Категории (разделени със запетая)</Label>
            <Input
              value={
                Array.isArray(editing.categories)
                  ? editing.categories.join(", ")
                  : editing.categories || ""
              }
              onChange={(e) =>
                onEditingChange({
                  ...editing,
                  categories: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
          <div className="space-y-2">
            <Label>Етикети (разделени със запетая)</Label>
            <Input
              value={
                Array.isArray(editing.tags)
                  ? editing.tags.join(", ")
                  : editing.tags || ""
              }
              onChange={(e) =>
                onEditingChange({
                  ...editing,
                  tags: e.target.value
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
                })
              }
            />
          </div>
          <BlogPostImageUpload
            value={editing.image}
            onChange={(url) => onEditingChange({ ...editing, image: url })}
          />
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="featured"
              checked={editing.featured}
              onChange={(e) =>
                onEditingChange({ ...editing, featured: e.target.checked })
              }
              className="rounded border-input"
            />
            <Label htmlFor="featured">Представена</Label>
          </div>
          <Button type="submit" className="w-full">
            {editing.id ? "Запази промените" : "Създай публикация"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
