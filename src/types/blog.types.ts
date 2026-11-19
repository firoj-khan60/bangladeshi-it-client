export type IBlogBlock =
  | { id: string; type: "heading"; text: string; level: 2 | 3 }
  | { id: string; type: "text"; html: string }
  | { id: string; type: "image"; url?: string; caption?: string };

export type BlogBlockType = IBlogBlock["type"];

export interface IBlog {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  blocks: IBlogBlock[] | null;
  coverImage: string | null;
  author: string | null;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IBlogFormValues {
  title: string;
  excerpt: string;
  author: string;
  isPublished: boolean;
}

export interface ICreateBlogPayload {
  title: string;
  excerpt?: string;
  content?: string;
  blocks?: IBlogBlock[];
  author?: string;
  isPublished: boolean;
}

export interface IUpdateBlogPayload {
  title?: string;
  excerpt?: string;
  content?: string;
  blocks?: IBlogBlock[];
  author?: string;
  isPublished?: boolean;
}
