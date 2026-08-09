import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import type { CatalogItem } from "@/types/product";
import { formatItemPrice } from "@/utils/formatPrice";
import { whatsAppUrlForItem } from "@/utils/whatsapp";
import { CATEGORY_LABELS } from "@/config/catalog";
import { Badge } from "@/components/common/Badge";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

export function ProductCard({ item }: { item: CatalogItem }) {
  const image = item.images[0];

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-card transition-shadow hover:shadow-card-hover"
    >
      <Link to={`/catalogo/${item.slug}`} className="focus-ring relative block">
        <ImageWithFallback
          src={image}
          alt={item.name}
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge variant={item.type === "servicio" ? "primary" : "accent"}>
            {item.type === "servicio" ? "Servicio" : "Producto"}
          </Badge>
          {item.isNew && <Badge variant="success">Nuevo</Badge>}
          {item.isBestSeller && <Badge variant="muted">Más vendido</Badge>}
        </div>
        {!item.available && (
          <div className="absolute inset-0 flex items-center justify-center bg-secondary/60">
            <Badge variant="error">No disponible</Badge>
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs font-semibold uppercase tracking-wide text-foreground-muted">
          {CATEGORY_LABELS[item.category]}
        </p>
        <Link to={`/catalogo/${item.slug}`} className="focus-ring">
          <h3 className="font-display text-lg font-semibold leading-snug text-foreground hover:text-primary">
            {item.name}
          </h3>
        </Link>
        <p className="line-clamp-2 flex-1 text-sm text-foreground-muted">
          {item.shortDescription}
        </p>

        <div className="flex items-end justify-between gap-2 pt-1">
          <span className="font-display text-lg font-bold text-primary">
            {formatItemPrice(item)}
          </span>
          <span className="text-xs text-foreground-muted">
            SKU {item.sku}
          </span>
        </div>

        <div className="mt-2 flex items-center gap-2">
          <a
            href={whatsAppUrlForItem(item)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Cotizar ${item.name} por WhatsApp`}
            className="focus-ring flex h-10 flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] text-sm font-semibold text-white transition-colors hover:bg-[#1ebe57]"
          >
            <FaWhatsapp />
            Cotizar
          </a>
          <Link
            to={`/catalogo/${item.slug}`}
            aria-label={`Ver más sobre ${item.name}`}
            className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:border-primary hover:text-primary"
          >
            <FiArrowRight />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
