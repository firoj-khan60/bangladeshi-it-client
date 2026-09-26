"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { ILead, LeadStatus } from "@/types/lead.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateLeadStatusAction } from "../_action";
import { LEAD_STATUS_OPTIONS } from "./leadConfig";

const LeadStatusSelect = ({ lead }: { lead: ILead }) => {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (status: LeadStatus) => updateLeadStatusAction(lead.id, status),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message);
        queryClient.invalidateQueries({ queryKey: ["leads"] });
      } else {
        toast.error(result.message);
      }
    },
  });

  const current = LEAD_STATUS_OPTIONS.find((option) => option.value === lead.status);

  return (
    <Select
      value={lead.status}
      disabled={isPending}
      onValueChange={(value) => mutate(value as LeadStatus)}
    >
      <SelectTrigger size="sm" className={cn("h-7! w-32 rounded-full border text-xs font-semibold", current?.className)}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {LEAD_STATUS_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LeadStatusSelect;
