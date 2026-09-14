import { useState, useRef } from "react";
import { Link, NavLink as RouterNavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiBox, FiMenu, FiMoon, FiSun } from "react-icons/fi";
import { NAV_LINKS, SITE } from "@/config/site";
import { SERVICE_CATEGORY_SLUGS, ENABLED_CATEGORIES } from "@/config/catalog";
import { useDarkMode } from "@/hooks/useDarkMode";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { assetUrl } from "@/utils/assetUrl";
import { cn } from "@/utils/cn";
import { Button } from "@/components/common/Button";
import { MobileMenu } from "./MobileMenu";

// Rutas cuya primera sección es el fondo oscuro "hero-gradient": solo ahí el
// navbar puede quedar transparente con texto claro. El resto de páginas
// (ficha de producto, 404) empiezan con el fondo normal de la página, así
// que necesitan el navbar sólido con texto según el tema desde el inicio.
const HERO_PAGES = ["/", "/catalogo", "/nosotros", "/contacto"];

export function Navbar() {
  const scrolled = useScrollPosition(20);
  const { isDark, toggleDarkMode } = useDarkMode();
  const [isMegaOpen, setIsMegaOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const megaRef = useRef<HTMLLIElement>(null!);
  const location = useLocation();

  useOnClickOutside(megaRef, () => setIsMegaOpen(false));

  const isOverHero = HERO_PAGES.includes(location.pathname) && !scrolled;

  const serviceCategories = ENABLED_CATEGORIES.filter((c) =>
    SERVICE_CATEGORY_SLUGS.includes(c.slug)
  );
  const productCategories = ENABLED_CATEGORIES.filter(
    (c) => !SERVICE_CATEGORY_SLUGS.includes(c.slug)
  );

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          isOverHero
            ? "bg-transparent"
            : "bg-background/90 shadow-card backdrop-blur-md"
        )}
      >
        <div className="container-page flex h-20 items-center justify-between">
          <Link to="/" className="focus-ring flex items-center gap-3">
            <img
              src={assetUrl("/images/logo.png")}
              alt={SITE.name}
              className="h-11 w-11 rounded-xl bg-white object-contain p-1"
            />
            <span
              className={cn(
                "hidden font-display text-lg font-bold sm:block",
                isOverHero ? "text-white" : "text-foreground"
              )}
            >
              TI.MO{" "}
              <span className={isOverHero ? "text-accent" : "text-primary"}>
                SOLUTIONS
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <ul className="flex items-center gap-1">
              {NAV_LINKS.map((link) =>
                link.path === "/catalogo" ? (
                  <li key={link.path} ref={megaRef} className="relative">
                    <button
                      onClick={() => setIsMegaOpen((prev) => !prev)}
                      className={cn(
                        "focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors hover:bg-background-alt",
                        isOverHero
                          ? "text-white hover:text-accent hover:bg-white/10"
                          : "text-foreground hover:text-primary"
                      )}
                      aria-expanded={isMegaOpen}
                    >
                      {link.label}
                    </button>
                    <AnimatePresence>
                      {isMegaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 8 }}
                          transition={{ duration: 0.18 }}
                          className="absolute left-1/2 top-full mt-2 w-[560px] -translate-x-1/2 rounded-2xl border border-border bg-background p-6 shadow-card-hover"
                        >
                          <div className="grid grid-cols-2 gap-8">
                            <div>
                              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-primary">
                                Servicios
                              </p>
                              <ul className="flex flex-col gap-2">
                                {serviceCategories.map((cat) => (
                                  <li key={cat.id}>
                                    <Link
                                      to={`/catalogo?categoria=${cat.slug}`}
                                      onClick={() => setIsMegaOpen(false)}
                                      className="focus-ring block rounded-lg px-2 py-1.5 text-sm text-foreground hover:bg-background-alt hover:text-primary"
                                    >
                                      {cat.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-accent">
                                Productos
                              </p>
                              <ul className="flex flex-col gap-2">
                                {productCategories.map((cat) => (
                                  <li key={cat.id}>
                                    <Link
                                      to={`/catalogo?categoria=${cat.slug}`}
                                      onClick={() => setIsMegaOpen(false)}
                                      className="focus-ring block rounded-lg px-2 py-1.5 text-sm text-foreground hover:bg-background-alt hover:text-primary"
                                    >
                                      {cat.name}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <Link
                            to="/catalogo"
                            onClick={() => setIsMegaOpen(false)}
                            className="focus-ring mt-5 block rounded-xl bg-background-alt px-4 py-3 text-center text-sm font-semibold text-primary hover:bg-primary/10"
                          >
                            Ver catálogo completo
                          </Link>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.path}>
                    <RouterNavLink
                      to={link.path}
                      className={({ isActive }) =>
                        cn(
                          "focus-ring block rounded-full px-4 py-2 text-sm font-medium transition-colors",
                          isOverHero
                            ? cn(
                                "hover:bg-white/10",
                                isActive ? "text-accent" : "text-white hover:text-accent"
                              )
                            : cn(
                                "hover:bg-background-alt",
                                isActive ? "text-primary" : "text-foreground hover:text-primary"
                              )
                        )
                      }
                    >
                      {link.label}
                    </RouterNavLink>
                  </li>
                )
              )}
              <li>
                <a
                  href={assetUrl("/laptop-3d")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "focus-ring flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    isOverHero
                      ? "bg-accent/15 text-accent hover:bg-accent/25"
                      : "bg-accent/10 text-accent hover:bg-accent/20"
                  )}
                >
                  <FiBox size={15} />
                  3D
                  <span className="rounded-full bg-accent px-1.5 py-0.5 text-[10px] font-bold uppercase text-secondary">
                    Nuevo
                  </span>
                </a>
              </li>
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              aria-label={isDark ? "Activar modo claro" : "Activar modo oscuro"}
              className={cn(
                "focus-ring flex h-10 w-10 items-center justify-center rounded-full transition-colors",
                isOverHero
                  ? "text-white/80 hover:bg-white/10 hover:text-accent"
                  : "text-foreground-muted hover:bg-background-alt hover:text-primary"
              )}
            >
              {isDark ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
            <Link to="/contacto" className="hidden sm:block">
              <Button size="sm">Cotizar ahora</Button>
            </Link>
            <button
              onClick={() => setIsMobileOpen(true)}
              aria-label="Abrir menú"
              className={cn(
                "focus-ring flex h-10 w-10 items-center justify-center rounded-full transition-colors lg:hidden",
                isOverHero
                  ? "text-white hover:bg-white/10"
                  : "text-foreground hover:bg-background-alt"
              )}
            >
              <FiMenu size={22} />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        serviceCategories={serviceCategories}
        productCategories={productCategories}
      />
    </>
  );
}
