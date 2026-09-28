"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IFaqItem, IUpdateFaqsPayload } from "@/types/faq.types";

export const getFaqs = async () => {
  try {
    return await httpClient.get<IFaqItem[]>("/faqs");
  } catch (error) {
    console.error("Error fetching faqs:", error);
    throw error;
  }
};

export const getPublicFaqs = async () => {
  try {
    return await httpClient.get<IFaqItem[]>("/faqs/public");
  } catch (error: any) {
    console.error(
      "Error fetching public faqs:",
      error?.response?.data?.message || error?.message || error,
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch public faqs",
      data: [] as IFaqItem[],
    };
  }
};

export const updateFaqs = async (payload: IUpdateFaqsPayload) => {
  try {
    return await httpClient.put<IFaqItem[]>("/faqs", payload);
  } catch (error) {
    console.error("Error updating faqs:", error);
    throw error;
  }
};
