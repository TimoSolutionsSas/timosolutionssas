import { Link } from "react-router-dom";
import { FiChevronRight, FiHome } from "react-icons/fi";

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm">
      <Link
        to="/"
        className="focus-ring flex items-center text-foreground-muted hover:text-primary"
        aria-label="Inicio"
      >
        <FiHome size={15} />
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <FiChevronRight size={14} className="text-foreground-muted" />
          {item.path ? (
            <Link
              to={item.path}
              className="focus-ring text-foreground-muted hover:text-primary"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-foreground">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
