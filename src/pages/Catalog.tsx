import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { FiFilter, FiX } from "react-icons/fi";
import { SEO } from "@/components/common/SEO";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Pagination } from "@/components/common/Pagination";
import { ProductCard } from "@/components/product/Card";
import { Filters, type CatalogFiltersState } from "@/components/product/Filters";
import { productRepository } from "@/services/productRepository";
import { MAX_PRICE_RANGE, type SortOption } from "@/config/catalog";
import { useDebounce } from "@/hooks/useDebounce";
import { fadeUp, staggerContainer } from "@/animations/variants";
import type { CatalogCategory, ItemType } from "@/types/product";

const PAGE_SIZE = 12;

export function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState<CatalogFiltersState>({
    type: (searchParams.get("tipo") as ItemType) || "todos",
    category: (searchParams.get("categoria") as CatalogCategory) || "todas",
    brand: searchParams.get("marca") || "todas",
    maxPrice: Number(searchParams.get("precio")) || MAX_PRICE_RANGE,
    search: searchParams.get("buscar") || "",
    sort: (searchParams.get("orden") as SortOption) || "best-sellers",
  });
  const [page, setPage] = useState(Number(searchParams.get("pagina")) || 1);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const debouncedSearch = useDebounce(filters.search, 300);
  const brands = useMemo(() => productRepository.getBrands(), []);

  const filteredItems = useMemo(
    () =>
      productRepository.getAll({
        type: filters.type === "todos" ? undefined : filters.type,
        category: filters.category === "todas" ? undefined : filters.category,
        brand: filters.brand === "todas" ? undefined : filters.brand,
        maxPrice: filters.maxPrice,
        search: debouncedSearch,
        sort: filters.sort,
      }),
    [
      filters.type,
      filters.category,
      filters.brand,
      filters.maxPrice,
      filters.sort,
      debouncedSearch,
    ]
  );

  const totalPages = Math.max(1, Math.ceil(filteredItems.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  useEffect(() => {
    setPage(1);
  }, [
    filters.type,
    filters.category,
    filters.brand,
    filters.maxPrice,
    filters.sort,
    debouncedSearch,
  ]);

  useEffect(() => {
    const params: Record<string, string> = {};
    if (filters.type !== "todos") params.tipo = filters.type;
    if (filters.category !== "todas") params.categoria = filters.category;
    if (filters.brand !== "todas") params.marca = filters.brand;
    if (filters.maxPrice !== MAX_PRICE_RANGE)
      params.precio = String(filters.maxPrice);
    if (debouncedSearch) params.buscar = debouncedSearch;
    if (filters.sort !== "best-sellers") params.orden = filters.sort;
    if (currentPage !== 1) params.pagina = String(currentPage);
    setSearchParams(params, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters, debouncedSearch, currentPage]);

  function handleFilterChange(patch: Partial<CatalogFiltersState>) {
    setFilters((prev) => ({ ...prev, ...patch }));
  }

  function handleReset() {
    setFilters({
      type: "todos",
      category: "todas",
      brand: "todas",
      maxPrice: MAX_PRICE_RANGE,
      search: "",
      sort: "best-sellers",
    });
  }

  return (
    <>
      <SEO
        title="Catálogo"
        description="Explora nuestro catálogo de servicios técnicos y productos: mantenimiento, actualización de hardware, repuestos, software y licencias."
        path="/catalogo"
      />

      <section className="bg-hero-gradient pb-14 pt-32 text-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Catálogo" }]} />
          <h1 className="mt-6 font-display text-4xl font-bold sm:text-5xl">
            Catálogo de servicios y productos
          </h1>
          <p className="mt-3 max-w-xl text-white/75">
            Filtra por tipo, categoría, marca o precio para encontrar
            exactamente lo que necesitas.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr]">
          <aside className="hidden lg:block">
            <div className="sticky top-28">
              <Filters
                filters={filters}
                brands={brands}
                maxPriceLimit={MAX_PRICE_RANGE}
                onChange={handleFilterChange}
                onReset={handleReset}
              />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between lg:justify-end">
              <button
                onClick={() => setIsMobileFiltersOpen(true)}
                className="focus-ring flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium lg:hidden"
              >
                <FiFilter size={16} /> Filtros
              </button>
              <p className="text-sm text-foreground-muted">
                {filteredItems.length}{" "}
                {filteredItems.length === 1 ? "resultado" : "resultados"}
              </p>
            </div>

            {paginatedItems.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border py-20 text-center">
                <p className="font-display text-lg font-semibold">
                  No encontramos resultados
                </p>
                <p className="text-foreground-muted">
                  Prueba ajustando o restableciendo los filtros.
                </p>
              </div>
            ) : (
              <motion.div
                key={`${currentPage}-${filters.type}-${filters.category}-${filters.brand}-${filters.maxPrice}-${filters.sort}-${debouncedSearch}`}
                variants={staggerContainer(0.06)}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3"
              >
                {paginatedItems.map((item) => (
                  <motion.div key={item.id} variants={fadeUp}>
                    <ProductCard item={item} />
                  </motion.div>
                ))}
              </motion.div>
            )}

            <div className="mt-10">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            </div>
          </div>
        </div>
      </section>

      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-[95] flex lg:hidden">
          <div
            className="absolute inset-0 bg-secondary/70 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative ml-auto flex h-full w-full max-w-sm flex-col overflow-y-auto bg-background p-6">
            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              aria-label="Cerrar filtros"
              className="focus-ring mb-4 ml-auto flex h-10 w-10 items-center justify-center rounded-full hover:bg-background-alt"
            >
              <FiX size={20} />
            </button>
            <Filters
              filters={filters}
              brands={brands}
              maxPriceLimit={MAX_PRICE_RANGE}
              onChange={handleFilterChange}
              onReset={handleReset}
            />
          </div>
        </div>
      )}
    </>
  );
}
