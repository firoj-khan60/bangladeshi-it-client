"use client";

import { createBlogAction, updateBlogAction } from "../_action";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { IBlog, IBlogBlock, IBlogFormValues } from "@/types/blog.types";
import BlogBlocksEditor, {
  createBlock,
  EditorBlock,
  newBlockId,
} from "./BlogBlocksEditor";
import { Loader2, Save, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

const getInitialValues = (blog?: IBlog | null): IBlogFormValues => ({
  title: blog?.title || "",
  excerpt: blog?.excerpt || "",
  author: blog?.author || "",
  isPublished: blog?.isPublished ?? false,
});

// Older posts only have `content` HTML - open them as a single description block.
const getInitialBlocks = (blog?: IBlog | null): EditorBlock[] => {
  if (blog?.blocks?.length) return blog.blocks;
  if (blog?.content) {
    return [{ id: newBlockId(), type: "text", html: blog.content }];
  }
  return [createBlock("heading"), createBlock("text")];
};

const isEmptyHtml = (html: string) => !html.replace(/<[^>]*>/g, "").trim();

interface BlogFormProps {
  mode: "create" | "edit";
  blog?: IBlog | null;
}

export default function BlogForm({ mode, blog }: BlogFormProps) {
  const router = useRouter();
  const [values, setValues] = useState<IBlogFormValues>(getInitialValues(blog));
  const [blocks, setBlocks] = useState<EditorBlock[]>(() =>
    getInitialBlocks(blog),
  );
  const [isSaving, setIsSaving] = useState(false);

  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    blog?.coverImage || null,
  );
  const [removeCoverImage, setRemoveCoverImage] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files?.[0];
      if (selectedFile) {
        setCoverImageFile(selectedFile);
        setRemoveCoverImage(false);
        const reader = new FileReader();
        reader.onloadend = () => setCoverImagePreview(reader.result as string);
        reader.readAsDataURL(selectedFile);
      }
    },
    [],
  );

  const handleRemoveCoverImage = () => {
    setCoverImageFile(null);
    setCoverImagePreview(null);
    setRemoveCoverImage(true);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!values.title.trim()) {
      toast.error("Please enter a title");
      return;
    }
    if (blocks.some((b) => b.type === "image" && !b.file && !b.url)) {
      toast.error("An image block has no image - upload one or remove it");
      return;
    }
    const hasContent = blocks.some((b) =>
      b.type === "heading"
        ? b.text.trim()
        : b.type === "text"
          ? !isEmptyHtml(b.html)
          : true,
    );
    if (!hasContent) {
      toast.error("Please add some content");
      return;
    }

    // Strip editor-only fields; new images travel as `blockImage_<id>` files
    const payloadBlocks: IBlogBlock[] = blocks.map((b) => {
      if (b.type === "image") {
        return { id: b.id, type: b.type, url: b.url, caption: b.caption };
      }
      if (b.type === "heading") {
        return { id: b.id, type: b.type, text: b.text, level: b.level };
      }
      return { id: b.id, type: b.type, html: b.html };
    });

    setIsSaving(true);
    try {
      const formData = new FormData();
      formData.append(
        "data",
        JSON.stringify({
          title: values.title,
          excerpt: values.excerpt,
          blocks: payloadBlocks,
          author: values.author,
          isPublished: values.isPublished,
          ...(mode === "edit" && { removeCoverImage }),
        }),
      );
      if (coverImageFile) formData.append("coverImage", coverImageFile);
      blocks.forEach((b) => {
        if (b.type === "image" && b.file) {
          formData.append(`blockImage_${b.id}`, b.file);
        }
      });

      const result =
        mode === "create"
          ? await createBlogAction(formData)
          : await updateBlogAction(blog!.id, formData);

      if (!result.success) {
        toast.error(result.message || "Failed to save blog post");
        return;
      }

      toast.success(
        mode === "create"
          ? "Blog post created successfully"
          : "Blog post updated successfully",
      );
      router.push("/admin/dashboard/blogs");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Something went wrong",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6 max-w-4xl">
      <div className="bg-card border rounded-xl p-6 shadow-sm space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="e.g. 10 Summer Fashion Trends"
              className="h-12 rounded-xl"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="author">Author</Label>
            <Input
              id="author"
              name="author"
              value={values.author}
              onChange={handleChange}
              placeholder="e.g. Bangladeshi IT Team"
              className="h-12 rounded-xl"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="excerpt">Excerpt</Label>
          <Textarea
            id="excerpt"
            name="excerpt"
            value={values.excerpt}
            onChange={handleChange}
            placeholder="A short summary shown on the blog listing card"
            rows={3}
          />
        </div>

        <BlogBlocksEditor blocks={blocks} onChange={setBlocks} />

        <div className="space-y-2">
          <Label>Cover Image</Label>
          {!coverImagePreview ? (
            <label className="flex h-40 w-full max-w-sm cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-muted-foreground/25 bg-muted/50 hover:bg-muted/80">
              <Upload className="mb-2 size-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground text-center px-4">
                Upload Cover Image
              </span>
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </label>
          ) : (
            <div className="relative h-40 w-full max-w-sm overflow-hidden rounded-xl border">
              <Image
                src={coverImagePreview}
                alt="Cover preview"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-cover"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute right-2 top-2 size-7 rounded-full"
                onClick={handleRemoveCoverImage}
              >
                <X className="size-3.5" />
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            id="isPublished"
            checked={values.isPublished}
            onCheckedChange={(checked) =>
              setValues((prev) => ({ ...prev, isPublished: checked === true }))
            }
          />
          <Label htmlFor="isPublished" className="cursor-pointer">
            Publish immediately
          </Label>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          disabled={isSaving}
          className="h-12 px-8 rounded-full font-bold"
        >
          {isSaving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              {mode === "create" ? "Create Blog Post" : "Save Changes"}
            </>
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-12 px-8 rounded-full font-bold"
          onClick={() => router.push("/admin/dashboard/blogs")}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
