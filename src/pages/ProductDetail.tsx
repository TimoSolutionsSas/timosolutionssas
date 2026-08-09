import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiCheck, FiClock, FiShield, FiTag } from "react-icons/fi";
import { SEO } from "@/components/common/SEO";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Badge } from "@/components/common/Badge";
import { Button } from "@/components/common/Button";
import { Gallery } from "@/components/product/Gallery";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { productRepository } from "@/services/productRepository";
import { CATEGORY_LABELS } from "@/config/catalog";
import { formatItemPrice } from "@/utils/formatPrice";
import { whatsAppUrlForItem, whatsAppUrlForPurchase } from "@/utils/whatsapp";
import { fadeUp, staggerContainer } from "@/animations/variants";
import { NotFound } from "@/pages/NotFound";

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const item = slug ? productRepository.getBySlug(slug) : undefined;

  if (!item) return <NotFound />;

  const related = productRepository.getRelated(item, 4);
  const isService = item.type === "servicio";

  return (
    <>
      <SEO
        title={item.name}
        description={item.shortDescription}
        path={`/catalogo/${item.slug}`}
        type="product"
      />

      <section className="pb-16 pt-32">
        <div className="container-page">
          <Breadcrumbs
            items={[
              { label: "Catálogo", path: "/catalogo" },
              {
                label: CATEGORY_LABELS[item.category],
                path: `/catalogo?categoria=${item.category}`,
              },
              { label: item.name },
            ]}
          />

          <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-2">
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
            >
              <Gallery images={item.images} name={item.name} />
            </motion.div>

            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-5"
            >
              <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
                <Badge variant={isService ? "primary" : "accent"}>
                  {isService ? "Servicio" : "Producto"}
                </Badge>
                {item.isNew && <Badge variant="success">Nuevo</Badge>}
                {item.isBestSeller && <Badge variant="muted">Más vendido</Badge>}
                {!item.available && <Badge variant="error">No disponible</Badge>}
              </motion.div>

              <motion.h1
                variants={fadeUp}
                className="font-display text-3xl font-bold sm:text-4xl"
              >
                {item.name}
              </motion.h1>

              <motion.div variants={fadeUp} className="flex items-center gap-3">
                <span className="font-display text-3xl font-bold text-primary">
                  {formatItemPrice(item)}
                </span>
                <span className="text-sm text-foreground-muted">
                  SKU {item.sku}
                </span>
              </motion.div>

              {item.priceNote && (
                <motion.p
                  variants={fadeUp}
                  className="rounded-xl bg-background-alt px-4 py-3 text-sm text-foreground-muted"
                >
                  {item.priceNote}
                </motion.p>
              )}

              <motion.p variants={fadeUp} className="text-foreground-muted">
                {item.description}
              </motion.p>

              <motion.ul variants={fadeUp} className="flex flex-col gap-2">
                {item.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm">
                    <FiCheck className="mt-0.5 shrink-0 text-success" />
                    <span>{feature}</span>
                  </li>
                ))}
              </motion.ul>

              <motion.div
                variants={fadeUp}
                className="grid grid-cols-1 gap-3 sm:grid-cols-2"
              >
                {isService ? (
                  <>
                    {item.duration && (
                      <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                        <FiClock className="shrink-0 text-primary" />
                        <div>
                          <p className="text-xs text-foreground-muted">
                            Tiempo estimado
                          </p>
                          <p className="text-sm font-medium">{item.duration}</p>
                        </div>
                      </div>
                    )}
                    {item.warranty && (
                      <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                        <FiShield className="shrink-0 text-primary" />
                        <div>
                          <p className="text-xs text-foreground-muted">Garantía</p>
                          <p className="text-sm font-medium">{item.warranty}</p>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {item.brand && (
                      <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                        <FiTag className="shrink-0 text-primary" />
                        <div>
                          <p className="text-xs text-foreground-muted">Marca</p>
                          <p className="text-sm font-medium">{item.brand}</p>
                        </div>
                      </div>
                    )}
                    {item.warranty && (
                      <div className="flex items-center gap-3 rounded-xl border border-border p-3">
                        <FiShield className="shrink-0 text-primary" />
                        <div>
                          <p className="text-xs text-foreground-muted">Garantía</p>
                          <p className="text-sm font-medium">{item.warranty}</p>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </motion.div>

              {isService && (
                <motion.p variants={fadeUp} className="text-sm text-foreground-muted">
                  Si tu equipo es un portátil, recuerda traerlo junto con su
                  cargador.
                </motion.p>
              )}

              <motion.div variants={fadeUp} className="flex flex-col gap-3 pt-2 sm:flex-row">
                <a
                  href={whatsAppUrlForPurchase(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    variant="whatsapp"
                    size="lg"
                    icon={<FaWhatsapp size={20} />}
                    fullWidth
                  >
                    {isService ? "Cotizar por WhatsApp" : "Comprar por WhatsApp"}
                  </Button>
                </a>
                <a
                  href={whatsAppUrlForItem(item)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button variant="outline" size="lg" fullWidth>
                    Preguntar algo antes
                  </Button>
                </a>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <RelatedProducts items={related} />
    </>
  );
}
