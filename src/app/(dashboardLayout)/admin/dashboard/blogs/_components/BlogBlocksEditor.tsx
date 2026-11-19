"use client";

import { SimpleRichTextEditor } from "@/components/shared/form/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { BlogBlockType, IBlogBlock } from "@/types/blog.types";
import {
  ArrowDown,
  ArrowUp,
  GripVertical,
  Heading,
  ImagePlus,
  Pilcrow,
  Plus,
  Trash2,
  Upload,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

/** A block while it is being edited - image blocks may hold a not-yet-uploaded file. */
export type EditorBlock = IBlogBlock & { file?: File; preview?: string };

export const newBlockId = () =>
  typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;

export const createBlock = (type: BlogBlockType): EditorBlock => {
  const id = newBlockId();
  if (type === "heading") return { id, type, text: "", level: 2 };
  if (type === "text") return { id, type, html: "" };
  return { id, type, caption: "" };
};

const BLOCK_META: Record<
  BlogBlockType,
  { label: string; icon: typeof Heading }
> = {
  heading: { label: "Heading", icon: Heading },
  text: { label: "Description", icon: Pilcrow },
  image: { label: "Image", icon: ImagePlus },
};

interface BlogBlocksEditorProps {
  blocks: EditorBlock[];
  onChange: React.Dispatch<React.SetStateAction<EditorBlock[]>>;
}

export default function BlogBlocksEditor({
  blocks,
  onChange,
}: BlogBlocksEditorProps) {
  // Dragging is only armed from the grip handle, so selecting text inside an
  // editor never starts a drag by accident.
  const [armedId, setArmedId] = useState<string | null>(null);
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [dropIndex, setDropIndex] = useState<number | null>(null);

  const update = (id: string, patch: Partial<EditorBlock>) =>
    onChange((prev) =>
      prev.map((b) => (b.id === id ? ({ ...b, ...patch } as EditorBlock) : b)),
    );

  const move = (from: number, to: number) => {
    onChange((prev) => {
      if (from === to || to < 0 || to >= prev.length) return prev;
      const next = [...prev];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      return next;
    });
  };

  const remove = (id: string) =>
    onChange((prev) => prev.filter((b) => b.id !== id));

  const add = (type: BlogBlockType) =>
    onChange((prev) => [...prev, createBlock(type)]);

  const handleFile = (id: string, file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () =>
      update(id, { file, preview: reader.result as string });
    reader.readAsDataURL(file);
  };

  const resetDrag = () => {
    setArmedId(null);
    setDragIndex(null);
    setDropIndex(null);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label>Content</Label>
        <span className="text-xs text-muted-foreground">
          Drag the handle or use the arrows to reorder
        </span>
      </div>

      {blocks.length === 0 && (
        <div className="rounded-xl border-2 border-dashed p-8 text-center text-sm text-muted-foreground">
          No content yet. Add a heading, description or image below.
        </div>
      )}

      {blocks.map((block, index) => {
        const meta = BLOCK_META[block.type];
        const Icon = meta.icon;
        const isDragging = dragIndex === index;
        const showDropLine =
          dropIndex === index && dragIndex !== null && dragIndex !== index;

        return (
          <div
            key={block.id}
            draggable={armedId === block.id}
            onDragStart={(e) => {
              setDragIndex(index);
              e.dataTransfer.effectAllowed = "move";
              e.dataTransfer.setData("text/plain", block.id);
            }}
            onDragOver={(e) => {
              if (dragIndex === null) return;
              e.preventDefault();
              e.dataTransfer.dropEffect = "move";
              if (dropIndex !== index) setDropIndex(index);
            }}
            onDrop={(e) => {
              e.preventDefault();
              if (dragIndex !== null) move(dragIndex, index);
              resetDrag();
            }}
            onDragEnd={resetDrag}
            className={cn(
              "relative rounded-xl border bg-background shadow-sm transition",
              isDragging && "opacity-40",
              showDropLine &&
                (dragIndex! > index
                  ? "before:absolute before:-top-2 before:inset-x-0 before:h-1 before:rounded-full before:bg-primary"
                  : "after:absolute after:-bottom-2 after:inset-x-0 after:h-1 after:rounded-full after:bg-primary"),
            )}
          >
            <div className="flex items-center gap-2 border-b bg-muted/40 px-2 py-1.5 rounded-t-xl">
              <button
                type="button"
                aria-label="Drag to reorder"
                onMouseDown={() => setArmedId(block.id)}
                onMouseUp={() => setArmedId(null)}
                className="cursor-grab active:cursor-grabbing rounded-md p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <GripVertical className="size-4" />
              </button>
              <Icon className="size-4 text-primary" />
              <span className="text-sm font-semibold">{meta.label}</span>
              <span className="text-xs text-muted-foreground">#{index + 1}</span>

              {block.type === "heading" && (
                <div className="ml-2 flex rounded-md border bg-background p-0.5">
                  {([2, 3] as const).map((level) => (
                    <button
                      key={level}
                      type="button"
                      onClick={() => update(block.id, { level })}
                      className={cn(
                        "rounded px-2 py-0.5 text-xs font-bold",
                        block.level === level
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:text-foreground",
                      )}
                    >
                      H{level}
                    </button>
                  ))}
                </div>
              )}

              <div className="ml-auto flex items-center gap-0.5">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  aria-label="Move up"
                  disabled={index === 0}
                  onClick={() => move(index, index - 1)}
                >
                  <ArrowUp className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7"
                  aria-label="Move down"
                  disabled={index === blocks.length - 1}
                  onClick={() => move(index, index + 1)}
                >
                  <ArrowDown className="size-3.5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="size-7 text-destructive hover:text-destructive"
                  aria-label="Remove block"
                  onClick={() => remove(block.id)}
                >
                  <Trash2 className="size-3.5" />
                </Button>
              </div>
            </div>

            <div className="p-3">
              {block.type === "heading" && (
                <Input
                  value={block.text}
                  onChange={(e) => update(block.id, { text: e.target.value })}
                  placeholder="Section heading"
                  className={cn(
                    "h-11 rounded-lg font-bold",
                    block.level === 2 ? "text-lg" : "text-base",
                  )}
                />
              )}

              {block.type === "text" && (
                <SimpleRichTextEditor
                  id={`block-${block.id}`}
                  value={block.html}
                  onChange={(html) => update(block.id, { html })}
                  placeholder="Write the description..."
                  minHeight="140px"
                />
              )}

              {block.type === "image" && (
                <div className="space-y-2">
                  {block.preview || block.url ? (
                    <div className="relative aspect-[16/9] w-full max-w-xl overflow-hidden rounded-lg border">
                      <Image
                        src={block.preview || block.url!}
                        alt={block.caption || "Blog image"}
                        fill
                        sizes="(max-width: 768px) 100vw, 600px"
                        className="object-cover"
                      />
                      <label className="absolute bottom-2 right-2 cursor-pointer rounded-full bg-background/90 px-3 py-1 text-xs font-semibold shadow hover:bg-background">
                        Change
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleFile(block.id, e.target.files?.[0])
                          }
                        />
                      </label>
                    </div>
                  ) : (
                    <label className="flex h-36 w-full max-w-xl cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted/80">
                      <Upload className="mb-2 size-5 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        Upload Image
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleFile(block.id, e.target.files?.[0])}
                      />
                    </label>
                  )}
                  <Input
                    value={block.caption ?? ""}
                    onChange={(e) =>
                      update(block.id, { caption: e.target.value })
                    }
                    placeholder="Caption (optional)"
                    className="h-9 max-w-xl rounded-lg text-sm"
                  />
                </div>
              )}
            </div>
          </div>
        );
      })}

      <div className="flex flex-wrap gap-2 rounded-xl border border-dashed p-3">
        <span className="flex items-center gap-1 text-xs font-semibold text-muted-foreground mr-1">
          <Plus className="size-3.5" /> Add block
        </span>
        {(Object.keys(BLOCK_META) as BlogBlockType[]).map((type) => {
          const { label, icon: Icon } = BLOCK_META[type];
          return (
            <Button
              key={type}
              type="button"
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => add(type)}
            >
              <Icon className="mr-1.5 size-3.5" />
              {label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
