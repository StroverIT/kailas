"use client";

import React, { useCallback, useEffect, useState } from "react";
import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bold, Italic, Underline, ImagePlus, Upload } from "lucide-react";
import { contentToHtml } from "./utils";

type RichTextEditorProps = {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: string;
};

function Toolbar({ editor }: { editor: Editor | null }) {
  const [imageUrl, setImageUrl] = useState("");
  const [imageOpen, setImageOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const insertImage = useCallback(
    (url: string) => {
      if (!editor || !url.trim()) return;
      editor.chain().focus().setImage({ src: url.trim() }).run();
      setImageUrl("");
      setImageOpen(false);
    },
    [editor]
  );

  const handleFile = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      e.target.value = "";
      if (!file || !file.type.startsWith("image/")) return;
      setUploading(true);
      try {
        const formData = new FormData();
        formData.set("file", file);
        const res = await fetch("/api/upload/blog", { method: "POST", body: formData });
        if (!res.ok) throw new Error("Upload failed");
        const data = await res.json();
        if (data.url) insertImage(data.url);
      } catch {
        // silent or toast
      } finally {
        setUploading(false);
      }
    },
    [insertImage]
  );

  if (!editor) return null;

  return (
    <div className="flex flex-wrap items-center gap-1 p-2 border-b border-border bg-muted/30 rounded-t-md">
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        data-state={editor.isActive("bold") ? "on" : "off"}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        data-state={editor.isActive("italic") ? "on" : "off"}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        disabled={!editor.can().chain().focus().toggleUnderline().run()}
        data-state={editor.isActive("underline") ? "on" : "off"}
      >
        <Underline className="h-4 w-4" />
      </Button>
      <Popover open={imageOpen} onOpenChange={setImageOpen}>
        <PopoverTrigger asChild>
          <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
            <ImagePlus className="h-4 w-4" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80" align="start">
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFile}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="w-full"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
            >
              <Upload className="h-4 w-4 mr-2" />
              {uploading ? "Качване..." : "Качи и вмъкни изображение"}
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <span className="relative px-2 text-xs text-muted-foreground bg-popover">или URL</span>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="https://..."
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), insertImage(imageUrl))
                }
              />
              <Button
                type="button"
                size="sm"
                onClick={() => insertImage(imageUrl)}
                disabled={!imageUrl.trim()}
              >
                Вмъкни по URL
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Напишете съдържание...",
  minHeight = "200px",
}: RichTextEditorProps) {
  const initialHtml = contentToHtml(value);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        // Ensure underline is available (StarterKit v2 may need @tiptap/extension-underline)
      }),
      Image.configure({ inline: false, allowBase64: false }),
    ],
    content: initialHtml,
    editorProps: {
      attributes: {
        class:
          "prose prose-sm max-w-none min-h-[120px] px-3 py-2 focus:outline-none font-body text-foreground",
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;
    const next = contentToHtml(value);
    if (editor.getHTML() !== next) {
      editor.commands.setContent(next, { emitUpdate: false });
    }
  }, [value, editor]);

  return (
    <div
      className="rounded-md border border-input bg-background overflow-hidden"
      style={{ minHeight }}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
