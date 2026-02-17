export type BlogPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  updatedDate: string | null;
  categories: string[];
  tags: string[];
  featured: boolean;
  image: string | null;
};

export const emptyPost: Omit<BlogPostRow, "id"> = {
  slug: "",
  title: "",
  excerpt: "",
  content: "[]",
  date: "",
  updatedDate: null,
  categories: [],
  tags: [],
  featured: false,
  image: null,
};

export type BlogPostFormState = BlogPostRow | (Omit<BlogPostRow, "id"> & { id?: string });
