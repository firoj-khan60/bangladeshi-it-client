"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { ILead, LeadStatus } from "@/types/lead.types";

export const getLeads = async (queryParams?: Record<string, string>) => {
  try {
    return await httpClient.get<ILead[]>("/leads", { params: queryParams });
  } catch (error) {
    console.error("Error fetching leads:", error);
    throw error;
  }
};

export const updateLeadStatus = async (id: string, status: LeadStatus) => {
  try {
    return await httpClient.patch<ILead>(`/leads/${id}/status`, { status });
  } catch (error) {
    console.error("Error updating lead status:", error);
    throw error;
  }
};

export const deleteLead = async (id: string) => {
  try {
    return await httpClient.delete<null>(`/leads/${id}`);
  } catch (error) {
    console.error("Error deleting lead:", error);
    throw error;
  }
};
