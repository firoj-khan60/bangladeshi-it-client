"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { ITestimonial } from "@/types/testimonial.types";
import { ImagePlus, Loader2, Star, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createTestimonialAction, updateTestimonialAction } from "../_action";

interface TestimonialFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** null → add a new testimonial */
  testimonial: ITestimonial | null;
  onSaved: () => void;
}

const MAX_CONTENT = 1000;

const TestimonialFormDialog = ({ open, onOpenChange, testimonial, onSaved }: TestimonialFormDialogProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [isActive, setIsActive] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [removeAvatar, setRemoveAvatar] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Reset the form each time the dialog opens
  useEffect(() => {
    if (!open) return;
    /* eslint-disable react-hooks/set-state-in-effect -- syncing form state to the opened record */
    setName(testimonial?.name ?? "");
    setRole(testimonial?.role ?? "");
    setContent(testimonial?.content ?? "");
    setRating(testimonial?.rating ?? 5);
    setIsActive(testimonial?.isActive ?? true);
    setFile(null);
    setPreview(testimonial?.avatar ?? null);
    setRemoveAvatar(false);
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [open, testimonial]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
    setRemoveAvatar(false);
  };

  const clearPhoto = () => {
    setFile(null);
    setPreview(null);
    setRemoveAvatar(Boolean(testimonial?.avatar));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return toast.error("Please enter the client's name");
    if (!content.trim()) return toast.error("Please enter the testimonial");

    const formData = new FormData();
    if (file) formData.append("avatar", file);
    formData.append(
      "data",
      JSON.stringify({
        name: name.trim(),
        role: role.trim(),
        content: content.trim(),
        rating,
        isActive,
        ...(testimonial && removeAvatar && { removeAvatar: true }),
      }),
    );

    setIsSaving(true);
    const result = testimonial
      ? await updateTestimonialAction(testimonial.id, formData)
      : await createTestimonialAction(formData);
    setIsSaving(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }
    toast.success(result.message);
    onOpenChange(false);
    onSaved();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{testimonial ? "Edit testimonial" : "Add testimonial"}</DialogTitle>
          <DialogDescription>Shown in the testimonial slider on the home page.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="relative flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-dashed bg-muted transition-colors hover:border-primary/60"
              aria-label="Choose photo"
            >
              {preview ? (
                // eslint-disable-next-line @next/next/no-img-element -- blob or remote preview
                <img src={preview} alt="" className="h-full w-full object-cover" />
              ) : (
                <ImagePlus className="h-6 w-6 text-muted-foreground" />
              )}
            </button>
            <div className="space-y-1.5">
              <p className="text-sm font-medium">Photo (optional)</p>
              <div className="flex gap-2">
                <Button type="button" variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                  {preview ? "Change" : "Upload"}
                </Button>
                {preview && (
                  <Button type="button" variant="ghost" size="sm" onClick={clearPhoto}>
                    <X className="h-4 w-4" /> Remove
                  </Button>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Without a photo, the name&apos;s first letter is shown.</p>
            </div>
            <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="t-name">Client name *</Label>
              <Input id="t-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Rafiqul Islam" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="t-role">Role / company</Label>
              <Input id="t-role" value={role} onChange={(e) => setRole(e.target.value)} placeholder="e.g. CEO, ABC Fashion" />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="t-content">Testimonial *</Label>
              <span className="text-xs text-muted-foreground">
                {content.length}/{MAX_CONTENT}
              </span>
            </div>
            <Textarea
              id="t-content"
              rows={5}
              maxLength={MAX_CONTENT}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What the client said about working with you…"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="space-y-1.5">
              <Label>Rating</Label>
              <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={rating === value}
                    aria-label={`${value} star${value > 1 ? "s" : ""}`}
                    onClick={() => setRating(value)}
                    className="rounded p-0.5 transition-transform hover:scale-110"
                  >
                    <Star
                      className={cn(
                        "h-6 w-6",
                        value <= rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/40",
                      )}
                    />
                  </button>
                ))}
              </div>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-sm font-medium">
              <Checkbox checked={isActive} onCheckedChange={(checked) => setIsActive(checked === true)} />
              Show on home page
            </label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              {testimonial ? "Save changes" : "Add testimonial"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialFormDialog;
