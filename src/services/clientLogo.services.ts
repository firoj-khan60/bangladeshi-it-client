"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IClientLogo, IPublicClientLogo } from "@/types/clientLogo.types";

export const getPublicClientLogos = async () => {
  try {
    return await httpClient.get<IPublicClientLogo[]>("/client-logos/public");
  } catch (error) {
    console.error("Error fetching public client logos:", error);
    throw error;
  }
};

export const getClientLogos = async () => {
  try {
    return await httpClient.get<IClientLogo[]>("/client-logos");
  } catch (error) {
    console.error("Error fetching client logos:", error);
    throw error;
  }
};

export const createClientLogo = async (formData: FormData) => {
  try {
    return await httpClient.post<IClientLogo>("/client-logos", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error creating client logo:", error);
    throw error;
  }
};

export const updateClientLogo = async (id: string, formData: FormData) => {
  try {
    return await httpClient.patch<IClientLogo>(`/client-logos/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error updating client logo:", error);
    throw error;
  }
};

export const reorderClientLogos = async (ids: string[]) => {
  try {
    return await httpClient.put<IClientLogo[]>("/client-logos/reorder", { ids });
  } catch (error) {
    console.error("Error reordering client logos:", error);
    throw error;
  }
};

export const deleteClientLogo = async (id: string) => {
  try {
    return await httpClient.delete<null>(`/client-logos/${id}`);
  } catch (error) {
    console.error("Error deleting client logo:", error);
    throw error;
  }
};
