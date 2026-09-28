export interface ITestimonial {
  id: string;
  name: string;
  role: string | null;
  content: string;
  avatar: string | null;
  rating: number;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IPublicTestimonial = Pick<ITestimonial, "id" | "name" | "role" | "content" | "avatar" | "rating">;
