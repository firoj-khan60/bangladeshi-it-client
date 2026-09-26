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
import { getClientLogos } from "@/services/clientLogo.services";
import { IClientLogo } from "@/types/clientLogo.types";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ArrowRight, Eye, EyeOff, ImageOff, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  deleteClientLogoAction,
  reorderClientLogosAction,
  updateClientLogoAction,
} from "../_action";
import AddClientLogoForm from "./AddClientLogoForm";

const ClientLogoManager = () => {
  const queryClient = useQueryClient();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<IClientLogo | null>(null);
  const [isDeletePending, setIsDeletePending] = useState(false);

  const { data, isLoading } = useQuery({
    queryKey: ["client-logos"],
    queryFn: () => getClientLogos(),
  });
  const logos = data?.data ?? [];
  const activeCount = logos.filter((logo) => logo.isActive).length;

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["client-logos"] });

  const toggleActive = async (logo: IClientLogo) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify({ isActive: !logo.isActive }));
    setBusyId(logo.id);
    const result = await updateClientLogoAction(logo.id, formData);
    setBusyId(null);
    if (!result.success) return toast.error(result.message);
    toast.success(logo.isActive ? "Logo hidden from the home page" : "Logo shown on the home page");
    await refresh();
  };

  const move = async (index: number, direction: -1 | 1) => {
    const target = index + direction;
    if (target < 0 || target >= logos.length) return;
    const ids = logos.map((logo) => logo.id);
    [ids[index], ids[target]] = [ids[target], ids[index]];

    setBusyId(logos[index].id);
    const result = await reorderClientLogosAction(ids);
    setBusyId(null);
    if (!result.success) return toast.error(result.message);
    await refresh();
  };

  const confirmDelete = async () => {
    if (!deleting) return;
    setIsDeletePending(true);
    const result = await deleteClientLogoAction(deleting.id);
    setIsDeletePending(false);
    if (!result.success) return toast.error(result.message);
    toast.success(result.message);
    setDeleting(null);
    await refresh();
  };

  return (
    <div className="space-y-6">
      <AddClientLogoForm />

      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold">All logos</h3>
        <p className="text-sm text-muted-foreground">
          {activeCount} shown on the home page · {logos.length} total
        </p>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-44 rounded-2xl" />
          ))}
        </div>
      ) : logos.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-dashed py-16 text-center">
          <ImageOff className="h-8 w-8 text-muted-foreground" />
          <p className="font-medium">No client logos yet</p>
          <p className="text-sm text-muted-foreground">
            Add a logo above — it appears in the home page marquee right away.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo, index) => (
            <li
              key={logo.id}
              className={cn(
                "overflow-hidden rounded-2xl border bg-card transition-opacity",
                !logo.isActive && "opacity-60",
                busyId === logo.id && "pointer-events-none opacity-50",
              )}
            >
              <div className="relative h-24 bg-white">
                <Image src={logo.image} alt={logo.name} fill sizes="200px" className="object-contain p-4" />
                <span className="absolute left-2 top-2 rounded-md bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  #{index + 1}
                </span>
              </div>
              <div className="space-y-2 p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="truncate text-sm font-semibold" title={logo.name}>
                    {logo.name}
                  </p>
                  <Badge variant={logo.isActive ? "default" : "secondary"} className="shrink-0 text-[10px]">
                    {logo.isActive ? "Shown" : "Hidden"}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Move earlier"
                      disabled={index === 0}
                      onClick={() => move(index, -1)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title="Move later"
                      disabled={index === logos.length - 1}
                      onClick={() => move(index, 1)}
                    >
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      title={logo.isActive ? "Hide from home page" : "Show on home page"}
                      onClick={() => toggleActive(logo)}
                    >
                      {logo.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive"
                      title="Delete"
                      onClick={() => setDeleting(logo)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      <AlertDialog open={!!deleting} onOpenChange={(open) => !open && setDeleting(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete logo</AlertDialogTitle>
            <AlertDialogDescription>
              Delete the <strong>{deleting?.name}</strong> logo? It will be removed from the home page and
              this cannot be undone.
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

export default ClientLogoManager;
