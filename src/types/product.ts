export type ItemType = "servicio" | "producto";

export type ServiceCategory =
  | "mantenimiento"
  | "reparacion"
  | "actualizacion-hardware"
  | "instalacion-software"
  | "formateo-y-optimizacion"
  | "recuperacion-de-datos";

export type ProductCategory =
  | "laptops"
  | "computadores-de-escritorio"
  | "repuestos"
  | "perifericos"
  | "software-y-licencias"
  | "accesorios";

export type CatalogCategory = ServiceCategory | ProductCategory;

export type PriceType = "fijo" | "desde" | "cotizar" | "rango";

export interface CatalogItem {
  id: string;
  slug: string;
  sku: string;
  type: ItemType;
  category: CatalogCategory;
  name: string;
  brand?: string;
  price: number;
  priceMax?: number;
  priceType: PriceType;
  priceNote?: string;
  compareAtPrice?: number;
  description: string;
  shortDescription: string;
  features: string[];
  duration?: string;
  warranty?: string;
  images: string[];
  available: boolean;
  isNew: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  stock?: number;
  createdAt: string;
  relatedIds?: string[];
}
