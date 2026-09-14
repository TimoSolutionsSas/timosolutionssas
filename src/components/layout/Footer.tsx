import { Link } from "react-router-dom";
import { FiMail, FiMapPin, FiClock, FiPhone } from "react-icons/fi";
import { NAV_LINKS, SITE } from "@/config/site";
import { ENABLED_CATEGORIES, SERVICE_CATEGORY_SLUGS } from "@/config/catalog";
import { assetUrl } from "@/utils/assetUrl";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { Newsletter } from "@/components/shared/Newsletter";

export function Footer() {
  const serviceCategories = ENABLED_CATEGORIES.filter((c) =>
    SERVICE_CATEGORY_SLUGS.includes(c.slug)
  );

  return (
    <footer className="bg-secondary text-white/80">
      <div className="container-page grid grid-cols-1 gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link to="/" className="mb-4 flex items-center gap-3">
            <img
              src={assetUrl("/images/logo.png")}
              alt={SITE.name}
              className="h-11 w-11 rounded-xl bg-white object-contain p-1"
            />
            <span className="font-display text-lg font-bold text-white">
              TI.MO <span className="text-accent">SOLUTIONS</span>
            </span>
          </Link>
          <p className="mb-6 text-sm leading-relaxed text-white/60">
            {SITE.description}
          </p>
          <SocialLinks />
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Navegación
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.path}>
                <Link to={link.path} className="text-white/60 hover:text-accent">
                  {link.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/declarasinmiedo" className="text-white/60 hover:text-accent">
                DeclaraSinMiedo
              </Link>
            </li>
            <li>
              <a
                href={assetUrl("/laptop-3d")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-white"
              >
                Portátil 3D interactivo ↗
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Servicios
          </h4>
          <ul className="flex flex-col gap-2.5 text-sm">
            {serviceCategories.map((cat) => (
              <li key={cat.id}>
                <Link
                  to={`/catalogo?categoria=${cat.slug}`}
                  className="text-white/60 hover:text-accent"
                >
                  {cat.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 font-display text-sm font-semibold uppercase tracking-wide text-white">
            Contacto
          </h4>
          <ul className="mb-6 flex flex-col gap-3 text-sm">
            <li className="flex items-start gap-2.5">
              <FiMapPin className="mt-0.5 shrink-0 text-accent" />
              <span className="text-white/60">{SITE.address.full}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <FiClock className="mt-0.5 shrink-0 text-accent" />
              <span className="text-white/60">{SITE.hours.weekdays}</span>
            </li>
            <li className="flex items-start gap-2.5">
              <FiPhone className="mt-0.5 shrink-0 text-accent" />
              <a
                href={`https://wa.me/${SITE.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/60 hover:text-accent"
              >
                +{SITE.whatsappNumber}
              </a>
            </li>
            <li className="flex items-start gap-2.5">
              <FiMail className="mt-0.5 shrink-0 text-accent" />
              <a
                href={`mailto:${SITE.email}`}
                className="text-white/60 hover:text-accent"
              >
                {SITE.email}
              </a>
            </li>
          </ul>
          <p className="mb-2 text-sm font-medium text-white">
            Novedades y promociones
          </p>
          <Newsletter />
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.legalName}. Todos los derechos
            reservados.
          </p>
          <p>Chía, Cundinamarca, Colombia</p>
        </div>
      </div>
    </footer>
  );
}
