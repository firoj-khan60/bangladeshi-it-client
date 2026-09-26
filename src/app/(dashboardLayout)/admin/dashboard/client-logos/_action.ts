"use server";

import {
  createClientLogo,
  deleteClientLogo,
  reorderClientLogos,
  updateClientLogo,
} from "@/services/clientLogo.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { IClientLogo } from "@/types/clientLogo.types";
import { revalidatePath } from "next/cache";

const toErrorResponse = (error: unknown, fallbackMessage: string): ApiErrorResponse => {
  // Axios errors carry the API's message in response.data
  const apiMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
  return {
    success: false,
    message: apiMessage || (error instanceof Error ? error.message : fallbackMessage),
  };
};

const revalidateLogoPages = () => {
  revalidatePath("/");
  revalidatePath("/admin/dashboard/client-logos");
};

export const createClientLogoAction = async (
  formData: FormData,
): Promise<ApiResponse<IClientLogo> | ApiErrorResponse> => {
  try {
    const result = await createClientLogo(formData);
    if (result.success) revalidateLogoPages();
    return result;
  } catch (error) {
    return toErrorResponse(error, "Failed to add client logo");
  }
};

export const updateClientLogoAction = async (
  id: string,
  formData: FormData,
): Promise<ApiResponse<IClientLogo> | ApiErrorResponse> => {
  try {
    const result = await updateClientLogo(id, formData);
    if (result.success) revalidateLogoPages();
    return result;
  } catch (error) {
    return toErrorResponse(error, "Failed to update client logo");
  }
};

export const reorderClientLogosAction = async (
  ids: string[],
): Promise<ApiResponse<IClientLogo[]> | ApiErrorResponse> => {
  try {
    const result = await reorderClientLogos(ids);
    if (result.success) revalidateLogoPages();
    return result;
  } catch (error) {
    return toErrorResponse(error, "Failed to reorder client logos");
  }
};

export const deleteClientLogoAction = async (
  id: string,
): Promise<ApiResponse<null> | ApiErrorResponse> => {
  try {
    const result = await deleteClientLogo(id);
    if (result.success) revalidateLogoPages();
    return result;
  } catch (error) {
    return toErrorResponse(error, "Failed to delete client logo");
  }
};
