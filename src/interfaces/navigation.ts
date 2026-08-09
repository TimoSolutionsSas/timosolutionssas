import type { CatalogCategory } from "@/types/product";

export interface NavLink {
  label: string;
  path: string;
}

export interface MegaMenuColumn {
  title: string;
  items: {
    label: string;
    slug: CatalogCategory;
  }[];
}
