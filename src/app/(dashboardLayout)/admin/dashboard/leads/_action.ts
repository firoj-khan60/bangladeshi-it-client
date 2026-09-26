"use server";

import { deleteLead, updateLeadStatus } from "@/services/lead.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { ILead, LeadStatus } from "@/types/lead.types";

export const updateLeadStatusAction = async (
  id: string,
  status: LeadStatus,
): Promise<ApiResponse<ILead> | ApiErrorResponse> => {
  try {
    return await updateLeadStatus(id, status);
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update lead status",
    };
  }
};

export const deleteLeadAction = async (
  id: string,
): Promise<ApiResponse<null> | ApiErrorResponse> => {
  try {
    return await deleteLead(id);
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to delete lead",
    };
  }
};
