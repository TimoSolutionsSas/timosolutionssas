import { FiSearch, FiX } from "react-icons/fi";
import type { CatalogCategory, ItemType } from "@/types/product";
import { ENABLED_CATEGORIES, SORT_OPTIONS, type SortOption } from "@/config/catalog";
import { formatCOP } from "@/utils/formatPrice";
import { Input } from "@/components/common/Input";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";

export interface CatalogFiltersState {
  type: ItemType | "todos";
  category: CatalogCategory | "todas";
  brand: string | "todas";
  maxPrice: number;
  search: string;
  sort: SortOption;
}

interface FiltersProps {
  filters: CatalogFiltersState;
  brands: string[];
  maxPriceLimit: number;
  onChange: (patch: Partial<CatalogFiltersState>) => void;
  onReset: () => void;
}

export function Filters({
  filters,
  brands,
  maxPriceLimit,
  onChange,
  onReset,
}: FiltersProps) {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-border bg-background p-6">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Filtros</h3>
        <button
          onClick={onReset}
          className="focus-ring flex items-center gap-1 text-sm text-foreground-muted hover:text-primary"
        >
          <FiX size={14} /> Limpiar
        </button>
      </div>

      <div className="relative">
        <Input
          label="Buscar"
          placeholder="Nombre o código..."
          value={filters.search}
          onChange={(e) => onChange({ search: e.target.value })}
          className="pl-10"
        />
        <FiSearch className="absolute bottom-3 left-3 text-foreground-muted" />
      </div>

      <fieldset className="flex flex-col gap-2">
        <legend className="mb-1 text-sm font-medium text-foreground">Tipo</legend>
        {/* "Todos" arriba, Servicios/Productos abajo en 2 columnas: en fila
            única (flex-1) el texto "Productos" no cabía en los ~230px del
            panel de filtros y la fila se salía de la tarjeta. */}
        <div className="grid grid-cols-2 gap-2">
          {(["todos", "servicio", "producto"] as const).map((type) => (
            <button
              key={type}
              onClick={() => onChange({ type })}
              className={`focus-ring rounded-full border px-3 py-2 text-sm font-medium transition-colors ${
                type === "todos" ? "col-span-2" : ""
              } ${
                filters.type === type
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border text-foreground-muted hover:border-primary hover:text-primary"
              }`}
            >
              {type === "todos" ? "Todos" : type === "servicio" ? "Servicios" : "Productos"}
            </button>
          ))}
        </div>
      </fieldset>

      <Select
        label="Categoría"
        value={filters.category}
        onChange={(e) =>
          onChange({ category: e.target.value as CatalogFiltersState["category"] })
        }
        options={[
          { label: "Todas las categorías", value: "todas" },
          ...ENABLED_CATEGORIES.map((cat) => ({
            label: cat.name,
            value: cat.slug,
          })),
        ]}
      />

      {brands.length > 0 && (
        <Select
          label="Marca"
          value={filters.brand}
          onChange={(e) => onChange({ brand: e.target.value })}
          options={[
            { label: "Todas las marcas", value: "todas" },
            ...brands.map((brand) => ({ label: brand, value: brand })),
          ]}
        />
      )}

      <div>
        <label className="mb-2 flex items-center justify-between text-sm font-medium text-foreground">
          <span>Precio máximo</span>
          <span className="text-primary">{formatCOP(filters.maxPrice)}</span>
        </label>
        <input
          type="range"
          min={0}
          max={maxPriceLimit}
          step={10000}
          value={filters.maxPrice}
          onChange={(e) => onChange({ maxPrice: Number(e.target.value) })}
          className="w-full accent-primary"
        />
      </div>

      <Select
        label="Ordenar por"
        value={filters.sort}
        onChange={(e) => onChange({ sort: e.target.value as SortOption })}
        options={SORT_OPTIONS.map((opt) => ({ label: opt.label, value: opt.value }))}
      />

      <Button variant="outline" onClick={onReset} fullWidth>
        Restablecer filtros
      </Button>
    </div>
  );
}
