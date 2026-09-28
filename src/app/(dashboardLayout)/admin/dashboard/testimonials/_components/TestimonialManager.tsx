"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { getTestimonials } from "@/services/testimonial.services";
import { ITestimonial } from "@/types/testimonial.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowDown, ArrowUp, Eye, EyeOff, MessageSquareQuote, Pencil, Plus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import { deleteTestimonialAction, reorderTestimonialsAction, updateTestimonialAction } from "../_action";
import TestimonialFormDialog from "./TestimonialFormDialog";

const TestimonialManager = () => {
  const queryClient = useQueryClient();
  const [formOpen, setFormOpen] = useState(false);
  const [editing, setEditing] = useState<ITestimonial | null>(null);
  const [deleting, setDeleting] = useState<ITestimonial | null>(null);
  const [isDeletePending, setIsDeletePending] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: () => getTestimonials(),
  });
  const testimonials = data?.data ?? [];
  const activeCount = testimonials.filter((t) => t.isActive).length;

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["testimonials"] });

  const openAdd = () => {
    setEditing(null);
    setFormOpen(true);
  };

  const openEdit = (testimonial: ITestimonial) => {
    setEditing(testimonial);
    setFormOpen(true);
  };

  const toggleActive = async (testimonial: ITestimonial) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ isActive: !testimonial.isActive }));
    setBusyId(testimonial.id);
    const result = await updateTestimonialAction(testimonial.id, formData);
    setBusyId(null);
    if (!result.success) return toast.error(result.message);
    toast.success(testimonial.isActive ? "Hidden from the home page" : "Shown on the home page");
    await refresh();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= testimonials.length) return;
    const ids = testimonials.map((t) => t.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];

    setBusyId(testimonials[index].id);
    const result = await reorderTestimonialsAction(ids);
    setBusyId(null);
    if (!result.success) return toast.error(result.message);
    await refresh();
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setIsDeletePending(true);
    const result = await deleteTestimonialAction(deleting.id);
    setIsDeletePending(false);
    if (!result.success) return toast.error(result.message);
    toast.success(result.message);
    setDeleting(null);
    await refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          {activeCount} shown on the home page · {testimonials.length} total
        </p>
        <Button onClick={openAdd}>
          <Plus className="h-4 w-4" /> Add testimonial
        </Button>
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
      ) : testimonials.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed py-16 text-center">
          <MessageSquareQuote className="h-8 w-8 text-muted-foreground" />
          <p className="font-medium">No testimonials yet</p>
          <p className="max-w-sm text-sm text-muted-foreground">
            Add what your clients say about you - the testimonial slider appears on the home page once
            there is at least one.
          </p>
          <Button onClick={openAdd} className="mt-2">
            <Plus className="h-4 w-4" /> Add the first testimonial
          </Button>
        </div>
      ) : (
        <ul className="space-y-3">
          {testimonials.map((t, index) => (
            <li
              key={t.id}
              className={cn(
                "flex flex-col gap-4 rounded-2xl border bg-card p-5 transition-opacity sm:flex-row sm:items-start",
                !t.isActive && "opacity-60",
                busyId === t.id && "pointer-events-none opacity-50",
              )}
            >
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 font-bold text-highlight">
                {t.avatar ? (
                  <Image src={t.avatar} alt={t.name} fill sizes="48px" className="object-cover" />
                ) : (
                  t.name.charAt(0).toUpperCase()
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <p className="font-semibold">{t.name}</p>
                  {t.role && <p className="text-sm text-muted-foreground">{t.role}</p>}
                  <span className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={cn("h-3.5 w-3.5", i < t.rating ? "fill-amber-400 text-amber-400" : "text-muted-foreground/30")}
                      />
                    ))}
                  </span>
                  <Badge variant={t.isActive ? "default" : "secondary"} className="text-[10px]">
                    {t.isActive ? "Shown" : "Hidden"}
                  </Badge>
                </div>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-muted-foreground">{t.content}</p>
              </div>

              <div className="flex shrink-0 items-center gap-0.5 self-end sm:self-start">
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Move up" disabled={index === 0} onClick={() => move(index, -1)}>
                  <ArrowUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title="Move down"
                  disabled={index === testimonials.length - 1}
                  onClick={() => move(index, 1)}
                >
                  <ArrowDown className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  title={t.isActive ? "Hide from home page" : "Show on home page"}
                  onClick={() => toggleActive(t)}
                >
                  {t.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Edit" onClick={() => openEdit(t)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                  title="Delete"
                  onClick={() => setDeleting(t)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <TestimonialFormDialog open={formOpen} onOpenChange={setFormOpen} testimonial={editing} onSaved={refresh} />

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete testimonial</AlertDialogTitle>
            <AlertDialogDescription>
              Delete the testimonial from <strong>{deleting?.name}</strong>? This cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeletePending}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeletePending}
              onClick={(event) => {
                event.preventDefault();
                void confirmDelete();
              }}
            >
              {isDeletePending ? "Deleting..." : "Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default TestimonialManager;
