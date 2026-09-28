"use server";

import {
  createTestimonial,
  deleteTestimonial,
  reorderTestimonials,
  updateTestimonial,
} from "@/services/testimonial.services";
import { ApiErrorResponse, ApiResponse } from "@/types/api.types";
import { ITestimonial } from "@/types/testimonial.types";
import { revalidatePath } from "next/cache";

const toErrorResponse = (error: unknown, fallbackMessage: string): ApiErrorResponse => {
  // Axios errors carry the API's message in response.data
  const apiMessage = (error as { response?: { data?: { message?: string } } })?.response?.data?.message;
  return {
    success: false,
    message: apiMessage || (error instanceof Error ? error.message : fallbackMessage),
  };
};

const revalidateTestimonialPages = () => {
  revalidatePath("/");
  revalidatePath("/admin/dashboard/testimonials");
};

export const createTestimonialAction = async (
  formData: FormData,
): Promise<ApiResponse<ITestimonial> | ApiErrorResponse> => {
  try {
    const result = await createTestimonial(formData);
    if (result.success) revalidateTestimonialPages();
    return result;
  } catch (error) {
    return toErrorResponse(error, "Failed to add testimonial");
  }
};

export const updateTestimonialAction = async (
  id: string,
  formData: FormData,
): Promise<ApiResponse<ITestimonial> | ApiErrorResponse> => {
  try {
    const result = await updateTestimonial(id, formData);
    if (result.success) revalidateTestimonialPages();
    return result;
  } catch (error) {
    return toErrorResponse(error, "Failed to update testimonial");
  }
};

export const reorderTestimonialsAction = async (
  ids: string[],
): Promise<ApiResponse<ITestimonial[]> | ApiErrorResponse> => {
  try {
    const result = await reorderTestimonials(ids);
    if (result.success) revalidateTestimonialPages();
    return result;
  } catch (error) {
    return toErrorResponse(error, "Failed to reorder testimonials");
  }
};

export const deleteTestimonialAction = async (
  id: string,
): Promise<ApiResponse<null> | ApiErrorResponse> => {
  try {
    const result = await deleteTestimonial(id);
    if (result.success) revalidateTestimonialPages();
    return result;
  } catch (error) {
    return toErrorResponse(error, "Failed to delete testimonial");
  }
};
