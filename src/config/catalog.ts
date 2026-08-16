import categoriesData from "@/data/categories.json";
import type { Category } from "@/types/content";
import type { CatalogCategory } from "@/types/product";

export const ALL_CATEGORIES = categoriesData as Category[];

export const ENABLED_CATEGORIES: Category[] = ALL_CATEGORIES.filter(
  (c) => c.enabled
);

export const ENABLED_CATEGORY_SLUGS: CatalogCategory[] = ENABLED_CATEGORIES.map(
  (c) => c.slug
);

export function isCategoryEnabled(slug: CatalogCategory): boolean {
  return ENABLED_CATEGORY_SLUGS.includes(slug);
}

export function getCategoryBySlug(slug: CatalogCategory): Category | undefined {
  return ALL_CATEGORIES.find((c) => c.slug === slug);
}

export const CATEGORY_LABELS: Record<CatalogCategory, string> = ALL_CATEGORIES.reduce(
  (acc, c) => {
    acc[c.slug] = c.name;
    return acc;
  },
  {} as Record<CatalogCategory, string>
);

export const SERVICE_CATEGORY_SLUGS: CatalogCategory[] = [
  "mantenimiento",
  "reparacion",
  "actualizacion-hardware",
  "instalacion-software",
  "formateo-y-optimizacion",
  "recuperacion-de-datos",
  "paginas-web",
];

export const PRODUCT_CATEGORY_SLUGS: CatalogCategory[] = [
  "laptops",
  "computadores-de-escritorio",
  "repuestos",
  "perifericos",
  "software-y-licencias",
  "accesorios",
];

export const MAX_PRICE_RANGE = 2100000;

export const SORT_OPTIONS = [
  { label: "Más vendidos", value: "best-sellers" },
  { label: "Más recientes", value: "newest" },
  { label: "Menor precio", value: "price-asc" },
  { label: "Mayor precio", value: "price-desc" },
] as const;

export type SortOption = (typeof SORT_OPTIONS)[number]["value"];
