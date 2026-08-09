import type { CatalogCategory } from "./product";

export interface Category {
  id: string;
  name: string;
  slug: CatalogCategory;
  image: string;
  description: string;
  enabled: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  city?: string;
  quote: string;
  rating: number;
  avatar?: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}
