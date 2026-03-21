"use client";

import { type FC, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash2, Upload } from "lucide-react";

type TGalleryImage = {
  id: string;
  url: string;
  alt: string | null;
};

type TCreateImagePayload = {
  url: string;
  alt: string;
};

export const GalleryManager: FC = () => {
  const [images, setImages] = useState<TGalleryImage[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [altText, setAltText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const fetchGalleryImages = async () => {
    try {
      const response = await fetch("/api/gallery");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = (await response.json()) as TGalleryImage[];
      setImages(Array.isArray(data) ? data : []);
    } catch {
      toast({ title: "Грешка при зареждане", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchGalleryImages();
  }, []);

  const createGalleryImage = async ({ url, alt }: TCreateImagePayload) => {
    const response = await fetch("/api/gallery", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ url, alt }),
    });

    if (!response.ok) {
      const errorData = (await response.json().catch(() => ({}))) as {
        error?: string;
      };
      throw new Error(errorData.error || "Неуспешно записване");
    }

    const createdImage = (await response.json()) as TGalleryImage;
    setImages((previous) => [...previous, createdImage]);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast({
        title: "Изберете изображение",
        description: "Моля, качете JPG, PNG, WebP или друг image файл.",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      const formData = new FormData();
      formData.set("file", file);

      const uploadResponse = await fetch("/api/upload/gallery", {
        method: "POST",
        body: formData,
      });

      if (!uploadResponse.ok) {
        const errorData = (await uploadResponse.json().catch(() => ({}))) as {
          error?: string;
        };
        throw new Error(errorData.error || "Качването не успя");
      }

      const uploadData = (await uploadResponse.json()) as { url?: string };
      if (!uploadData.url) throw new Error("Липсва URL на каченото изображение");

      await createGalleryImage({ url: uploadData.url, alt: altText });
      setAltText("");
      toast({ title: "Снимката е добавена в галерията" });
    } catch (error) {
      toast({
        title: "Грешка",
        description:
          error instanceof Error ? error.message : "Качването не успя",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/gallery/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Delete failed");
      setImages((previous) => previous.filter((image) => image.id !== id));
      toast({ title: "Снимката е изтрита" });
    } catch {
      toast({ title: "Грешка при изтриване", variant: "destructive" });
    }
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
      <main className="container mx-auto px-4 py-8 max-w-6xl space-y-6">
        <section className="bg-background rounded-lg border border-border p-4 md:p-6 space-y-4">
          <h1 className="font-heading text-xl md:text-2xl font-semibold">
            Галерия
          </h1>
          <p className="text-sm text-muted-foreground">
            Качените тук снимки се показват в секцията „Галерия“ на страницата
            „За нас“.
          </p>
          <div className="grid gap-3 md:grid-cols-[1fr_auto]">
            <div className="space-y-2">
              <Label htmlFor="gallery-alt">Alt текст (по избор)</Label>
              <Input
                id="gallery-alt"
                placeholder="Напр. Йога практика в залата"
                value={altText}
                onChange={(event) => setAltText(event.target.value)}
                disabled={uploading}
              />
            </div>
            <div className="flex items-end">
              <input
                ref={inputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => inputRef.current?.click()}
                disabled={uploading}
                className="w-full md:w-auto"
              >
                {uploading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Качване...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4 mr-2" />
                    Качи снимка
                  </>
                )}
              </Button>
            </div>
          </div>
        </section>

        <section className="bg-background rounded-lg border border-border p-4 md:p-6">
          {images.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Все още няма качени снимки.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {images.map((image) => (
                <article
                  key={image.id}
                  className="rounded-lg overflow-hidden border border-border bg-muted/20"
                >
                  <div className="relative aspect-[4/3]">
                    <Image
                      src={image.url}
                      alt={image.alt || "Галерия"}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      unoptimized={image.url.includes("supabase")}
                    />
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <p className="text-xs text-muted-foreground truncate">
                      {image.alt || "Без alt текст"}
                    </p>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => void handleDelete(image.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};
