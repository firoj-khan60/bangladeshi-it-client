export interface IClientLogo {
  id: string;
  name: string;
  image: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export type IPublicClientLogo = Pick<IClientLogo, "id" | "name" | "image">;
