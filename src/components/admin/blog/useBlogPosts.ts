"use client";

import { useState, useEffect, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import type { BlogPostRow } from "./types";

export function useBlogPosts() {
  const [posts, setPosts] = useState<BlogPostRow[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchPosts = useCallback(async () => {
    const res = await fetch("/api/blog");
    if (res.ok) {
      const data = await res.json();
      setPosts(data);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchPosts();
      setLoading(false);
    })();
  }, [fetchPosts]);

  const createOrUpdate = useCallback(
    async (
      payload: {
        slug: string;
        title: string;
        excerpt: string;
        content: string;
        date: string;
        updatedDate: string | null;
        categories: string[];
        tags: string[];
        featured: boolean;
        image: string | null;
      },
      id?: string
    ) => {
      if (id) {
        const res = await fetch(`/api/blog/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Update failed");
        toast({ title: "Публикацията е обновена" });
      } else {
        const res = await fetch("/api/blog", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Create failed");
        toast({ title: "Публикацията е създадена" });
      }
      await fetchPosts();
    },
    [fetchPosts, toast]
  );

  const remove = useCallback(
    async (id: string) => {
      const res = await fetch(`/api/blog/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      toast({ title: "Публикацията е изтрита" });
      await fetchPosts();
    },
    [fetchPosts, toast]
  );

  return { posts, loading, fetchPosts, createOrUpdate, remove };
}
