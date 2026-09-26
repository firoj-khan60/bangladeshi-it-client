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
import { ILead } from "@/types/lead.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteLeadAction } from "../_action";

interface DeleteLeadConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lead: ILead | null;
}

const DeleteLeadConfirmationDialog = ({
  open,
  onOpenChange,
  lead,
}: DeleteLeadConfirmationDialogProps) => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteLeadAction,
  });

  const handleConfirmDelete = async () => {
    if (!lead) {
      toast.error("Lead not found");
      return;
    }

    const result = await mutateAsync(lead.id);

    if (!result.success) {
      toast.error(result.message || "Failed to delete lead");
      return;
    }

    toast.success(result.message || "Lead deleted successfully");
    onOpenChange(false);
    void queryClient.invalidateQueries({ queryKey: ["leads"] });
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Lead</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the lead from{" "}
            <strong>{lead?.name}</strong> ({lead?.phone})? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isPending}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={(event) => {
              event.preventDefault();
              void handleConfirmDelete();
            }}
            disabled={isPending}
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteLeadConfirmationDialog;
