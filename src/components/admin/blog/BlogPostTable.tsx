"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import type { BlogPostRow } from "./types";

type BlogPostTableProps = {
  posts: BlogPostRow[];
  onEdit: (post: BlogPostRow) => void;
  onDelete: (id: string) => void;
};

export function BlogPostTable({ posts, onEdit, onDelete }: BlogPostTableProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground px-4 py-8">
        Няма публикации. Добавете първа.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Заглавие</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Дата</TableHead>
            <TableHead>Категории</TableHead>
            <TableHead className="w-24"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {posts.map((post) => (
            <TableRow key={post.id}>
              <TableCell className="font-medium">{post.title}</TableCell>
              <TableCell className="text-muted-foreground font-mono text-sm">
                {post.slug}
              </TableCell>
              <TableCell>{post.date}</TableCell>
              <TableCell>
                {post.categories?.length
                  ? post.categories.join(", ")
                  : "–"}
              </TableCell>
              <TableCell>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(post)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive hover:text-destructive"
                    onClick={() => onDelete(post.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
