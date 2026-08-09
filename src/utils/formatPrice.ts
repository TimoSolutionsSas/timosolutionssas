import type { CatalogItem } from "@/types/product";

const COP_FORMATTER = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

export function formatCOP(value: number): string {
  return COP_FORMATTER.format(value);
}

export function formatItemPrice(
  item: Pick<CatalogItem, "price" | "priceMax" | "priceType">
): string {
  switch (item.priceType) {
    case "cotizar":
      return "A cotizar";
    case "desde":
      return item.price > 0 ? `Desde ${formatCOP(item.price)}` : "Gratis";
    case "rango":
      return item.priceMax
        ? `${formatCOP(item.price)} - ${formatCOP(item.priceMax)}`
        : formatCOP(item.price);
    case "fijo":
    default:
      return formatCOP(item.price);
  }
}
