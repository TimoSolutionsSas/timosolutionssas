import { Link, NavLink as RouterNavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiBox, FiX } from "react-icons/fi";
import { NAV_LINKS, SITE, buildWhatsAppUrl, WHATSAPP_MESSAGES } from "@/config/site";
import type { Category } from "@/types/content";
import { assetUrl } from "@/utils/assetUrl";
import { cn } from "@/utils/cn";
import { Button } from "@/components/common/Button";
import { SocialLinks } from "@/components/shared/SocialLinks";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  serviceCategories: Category[];
  productCategories: Category[];
}

export function MobileMenu({
  isOpen,
  onClose,
  serviceCategories,
  productCategories,
}: MobileMenuProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[95] bg-secondary/70 backdrop-blur-sm lg:hidden"
            onClick={onClose}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.25 }}
            className="fixed inset-y-0 right-0 z-[96] flex w-full max-w-sm flex-col overflow-y-auto bg-background p-6 lg:hidden"
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="font-display text-lg font-bold">
                TI.MO <span className="text-primary">SOLUTIONS</span>
              </span>
              <button
                onClick={onClose}
                aria-label="Cerrar menú"
                className="focus-ring flex h-10 w-10 items-center justify-center rounded-full hover:bg-background-alt"
              >
                <FiX size={22} />
              </button>
            </div>

            <nav className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <RouterNavLink
                  key={link.path}
                  to={link.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      "focus-ring rounded-xl px-3 py-3 text-base font-medium",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-foreground hover:bg-background-alt"
                    )
                  }
                >
                  {link.label}
                </RouterNavLink>
              ))}
              <a
                href={assetUrl("/laptop-3d")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="focus-ring flex items-center gap-2 rounded-xl bg-accent/10 px-3 py-3 text-base font-semibold text-accent hover:bg-accent/20"
              >
                <FiBox />
                Experiencia 3D
                <span className="ml-auto rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold uppercase text-secondary">
                  Nuevo
                </span>
              </a>
            </nav>

            <div className="mt-6 border-t border-border pt-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-primary">
                Servicios
              </p>
              <div className="flex flex-col">
                {serviceCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/catalogo?categoria=${cat.slug}`}
                    onClick={onClose}
                    className="focus-ring rounded-lg px-3 py-2 text-sm text-foreground-muted hover:bg-background-alt hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>

              <p className="mb-2 mt-4 text-xs font-semibold uppercase tracking-wide text-accent">
                Productos
              </p>
              <div className="flex flex-col">
                {productCategories.map((cat) => (
                  <Link
                    key={cat.id}
                    to={`/catalogo?categoria=${cat.slug}`}
                    onClick={onClose}
                    className="focus-ring rounded-lg px-3 py-2 text-sm text-foreground-muted hover:bg-background-alt hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-auto flex flex-col gap-4 pt-8">
              <a
                href={buildWhatsAppUrl(WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="whatsapp" fullWidth>
                  Escríbenos por WhatsApp
                </Button>
              </a>
              <p className="text-center text-sm text-foreground-muted">
                {SITE.email}
              </p>
              <SocialLinks className="justify-center" />
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
