import productsData from "@/data/products.json";
import { isCategoryEnabled, type SortOption } from "@/config/catalog";
import type { CatalogCategory, CatalogItem, ItemType } from "@/types/product";

const ALL_ITEMS = productsData as CatalogItem[];

export interface ProductQueryOptions {
  type?: ItemType;
  category?: CatalogCategory;
  brand?: string;
  maxPrice?: number;
  search?: string;
  sort?: SortOption;
}

export interface ProductRepository {
  getAll(options?: ProductQueryOptions): CatalogItem[];
  getBySlug(slug: string): CatalogItem | undefined;
  getById(id: string): CatalogItem | undefined;
  getFeatured(limit?: number): CatalogItem[];
  getBestSellers(limit?: number): CatalogItem[];
  getNewArrivals(limit?: number): CatalogItem[];
  getRelated(item: CatalogItem, limit?: number): CatalogItem[];
  search(query: string): CatalogItem[];
  getBrands(): string[];
}

function matchesSearch(item: CatalogItem, query: string): boolean {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return (
    item.name.toLowerCase().includes(q) ||
    item.description.toLowerCase().includes(q) ||
    item.shortDescription.toLowerCase().includes(q) ||
    item.sku.toLowerCase().includes(q) ||
    (item.brand?.toLowerCase().includes(q) ?? false)
  );
}

function sortItems(items: CatalogItem[], sort?: SortOption): CatalogItem[] {
  const sorted = [...items];
  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    case "best-sellers":
    default:
      return sorted.sort(
        (a, b) => Number(b.isBestSeller) - Number(a.isBestSeller)
      );
  }
}

class JsonProductRepository implements ProductRepository {
  private readonly enabledItems: CatalogItem[];

  constructor(items: CatalogItem[]) {
    this.enabledItems = items.filter((item) => isCategoryEnabled(item.category));
  }

  getAll(options: ProductQueryOptions = {}): CatalogItem[] {
    let result = this.enabledItems;

    if (options.type) {
      result = result.filter((item) => item.type === options.type);
    }
    if (options.category) {
      result = result.filter((item) => item.category === options.category);
    }
    if (options.brand) {
      result = result.filter((item) => item.brand === options.brand);
    }
    if (typeof options.maxPrice === "number") {
      result = result.filter((item) => item.price <= options.maxPrice!);
    }
    if (options.search) {
      result = result.filter((item) => matchesSearch(item, options.search!));
    }

    return sortItems(result, options.sort);
  }

  getBySlug(slug: string): CatalogItem | undefined {
    return this.enabledItems.find((item) => item.slug === slug);
  }

  getById(id: string): CatalogItem | undefined {
    return this.enabledItems.find((item) => item.id === id);
  }

  getFeatured(limit = 8): CatalogItem[] {
    return this.enabledItems.filter((item) => item.isFeatured).slice(0, limit);
  }

  getBestSellers(limit = 8): CatalogItem[] {
    return this.enabledItems
      .filter((item) => item.isBestSeller)
      .slice(0, limit);
  }

  getNewArrivals(limit = 8): CatalogItem[] {
    return this.enabledItems.filter((item) => item.isNew).slice(0, limit);
  }

  getRelated(item: CatalogItem, limit = 4): CatalogItem[] {
    const byIds = (item.relatedIds ?? [])
      .map((id) => this.getById(id))
      .filter((related): related is CatalogItem => Boolean(related));

    if (byIds.length >= limit) return byIds.slice(0, limit);

    const sameCategory = this.enabledItems.filter(
      (candidate) =>
        candidate.id !== item.id &&
        candidate.category === item.category &&
        !byIds.some((related) => related.id === candidate.id)
    );

    return [...byIds, ...sameCategory].slice(0, limit);
  }

  search(query: string): CatalogItem[] {
    return this.enabledItems.filter((item) => matchesSearch(item, query));
  }

  getBrands(): string[] {
    const brands = new Set<string>();
    for (const item of this.enabledItems) {
      if (item.brand) {
        item.brand
          .split("/")
          .map((b) => b.trim())
          .forEach((b) => brands.add(b));
      }
    }
    return Array.from(brands).sort();
  }
}

export const productRepository: ProductRepository = new JsonProductRepository(
  ALL_ITEMS
);
