"use server";

import { httpClient } from "@/lib/axios/httpClient";
import { IPublicTestimonial, ITestimonial } from "@/types/testimonial.types";

export const getPublicTestimonials = async () => {
  try {
    return await httpClient.get<IPublicTestimonial[]>("/testimonials/public");
  } catch (error: any) {
    console.error(
      "Error fetching public testimonials:",
      error?.response?.data?.message || error?.message || error,
    );
    return {
      success: false,
      message: error?.response?.data?.message || "Failed to fetch public testimonials",
      data: [] as IPublicTestimonial[],
    };
  }
};

export const getTestimonials = async () => {
  try {
    return await httpClient.get<ITestimonial[]>("/testimonials");
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    throw error;
  }
};

export const createTestimonial = async (formData: FormData) => {
  try {
    return await httpClient.post<ITestimonial>("/testimonials", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error creating testimonial:", error);
    throw error;
  }
};

export const updateTestimonial = async (id: string, formData: FormData) => {
  try {
    return await httpClient.patch<ITestimonial>(`/testimonials/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } catch (error) {
    console.error("Error updating testimonial:", error);
    throw error;
  }
};

export const reorderTestimonials = async (ids: string[]) => {
  try {
    return await httpClient.put<ITestimonial[]>("/testimonials/reorder", { ids });
  } catch (error) {
    console.error("Error reordering testimonials:", error);
    throw error;
  }
};

export const deleteTestimonial = async (id: string) => {
  try {
    return await httpClient.delete<null>(`/testimonials/${id}`);
  } catch (error) {
    console.error("Error deleting testimonial:", error);
    throw error;
  }
};
