import { buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/site";
import type { CatalogItem } from "@/types/product";

export function whatsAppUrlForItem(
  item: Pick<CatalogItem, "type" | "name" | "sku">
): string {
  const message =
    item.type === "servicio"
      ? WHATSAPP_MESSAGES.servicio(item.name, item.sku)
      : WHATSAPP_MESSAGES.producto(item.name, item.sku);
  return buildWhatsAppUrl(message);
}

export function whatsAppUrlForPurchase(
  item: Pick<CatalogItem, "name" | "sku">
): string {
  return buildWhatsAppUrl(WHATSAPP_MESSAGES.compra(item.name, item.sku));
}

export { buildWhatsAppUrl, WHATSAPP_MESSAGES };
