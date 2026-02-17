"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Upload, Loader2, X } from "lucide-react";
import Image from "next/image";

type BlogPostImageUploadProps = {
  value: string | null;
  onChange: (url: string | null) => void;
  disabled?: boolean;
};

export function BlogPostImageUpload({
  value,
  onChange,
  disabled,
}: BlogPostImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Изберете изображение (JPG, PNG, WebP и др.)");
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.set("file", file);
      const res = await fetch("/api/upload/blog", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Качването не успя");
      }
      const data = await res.json();
      if (data.url) onChange(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Качването не успя");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Label>Изображение</Label>
      <div className="flex flex-col gap-3">
        {value && (
          <div className="relative inline-flex max-w-xs">
            <div className="relative w-full aspect-video rounded-md border border-border overflow-hidden bg-muted">
              {value.startsWith("http") ? (
                <Image
                  src={value}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="320px"
                  unoptimized={value.includes("supabase") || value.includes("127.0.0.1")}
                />
              ) : (
                <span className="text-muted-foreground text-sm p-2 break-all">
                  {value}
                </span>
              )}
            </div>
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                onClick={() => onChange(null)}
              >
                <X className="w-3.5 h-3.5" />
              </Button>
            )}
          </div>
        )}
        {!disabled && (
          <>
            <input
              ref={inputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => inputRef.current?.click()}
            >
              {uploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Качване...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  {value ? "Смени изображение" : "Качи изображение"}
                </>
              )}
            </Button>
          </>
        )}
      </div>
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
