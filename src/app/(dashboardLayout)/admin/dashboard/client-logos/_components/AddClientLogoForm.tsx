"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useQueryClient } from "@tanstack/react-query";
import { ImagePlus, Loader2, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { createClientLogoAction } from "../_action";

const AddClientLogoForm = () => {
  const queryClient = useQueryClient();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [name, setName] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Free the object URL when the preview changes or the form unmounts
  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] ?? null;
    setFile(selected);
    setPreview(selected ? URL.createObjectURL(selected) : null);
    // Prefill the name from the file name when empty
    if (selected && !name.trim()) {
      setName(selected.name.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " "));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please choose a logo image");
      return;
    }
    if (!name.trim()) {
      toast.error("Please enter the client name");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);
    formData.append("data", JSON.stringify({ name: name.trim() }));

    setIsSaving(true);
    const result = await createClientLogoAction(formData);
    setIsSaving(false);

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success(result.message);
    setName("");
    setFile(null);
    setPreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    void queryClient.invalidateQueries({ queryKey: ["client-logos"] });
  };

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border bg-card p-5 md:p-6">
      <h3 className="text-lg font-bold">Add a client logo</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        PNG or SVG with a transparent background looks best. Logos are shown on a white tile.
      </p>

      <div className="mt-5 grid gap-5 md:grid-cols-[180px_1fr_auto] md:items-end">
        <label
          htmlFor="client-logo-file"
          className="flex h-24 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed bg-white p-3 transition-colors hover:border-primary/60"
        >
          {preview ? (
            // eslint-disable-next-line @next/next/no-img-element -- local blob preview
            <img src={preview} alt="Logo preview" className="max-h-full max-w-full object-contain" />
          ) : (
            <span className="flex flex-col items-center gap-1 text-xs font-medium text-slate-500">
              <ImagePlus className="h-5 w-5" />
              Choose image
            </span>
          )}
        </label>
        <input
          ref={fileInputRef}
          id="client-logo-file"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />

        <div className="space-y-2">
          <Label htmlFor="client-logo-name">Client name</Label>
          <Input
            id="client-logo-name"
            placeholder="e.g. City Bank"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <Button type="submit" disabled={isSaving} className="h-9">
          {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Plus className="h-4 w-4" />}
          Add logo
        </Button>
      </div>
    </form>
  );
};

export default AddClientLogoForm;
