import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

/**
 * Fuente única de verdad de las URLs públicas del sitio. La usan tanto
 * scripts/generar-sitemap.mjs como scripts/prerender.mjs, para que el sitemap
 * no pueda listar una URL que no se generó ni quedarse sin listar una nueva.
 */

const AQUI = dirname(fileURLToPath(import.meta.url));
const RAIZ = resolve(AQUI, "..");

export const REPO = "timosolutionssas";
export const BASE = `/${REPO}`;
export const DOMINIO = `https://timosolutionssas.github.io${BASE}`;

/** Rutas fijas. `prioridad` y `frecuencia` solo afectan al sitemap. */
const FIJAS = [
  { ruta: "/", prioridad: "1.0", frecuencia: "weekly" },
  { ruta: "/catalogo", prioridad: "0.9", frecuencia: "weekly" },
  { ruta: "/declarasinmiedo", prioridad: "0.8", frecuencia: "monthly" },
  { ruta: "/nosotros", prioridad: "0.7", frecuencia: "monthly" },
  { ruta: "/contacto", prioridad: "0.6", frecuencia: "monthly" },
  { ruta: "/laptop-3d", prioridad: "0.5", frecuencia: "monthly" },
];

/**
 * Cada producto y servicio visible tiene su propia página de detalle, con su
 * propio título y descripción. Se replica aquí el mismo filtro que aplica
 * src/services/productRepository.ts —solo las categorías habilitadas— para no
 * publicar en el sitemap URLs que la app resolvería como "no encontrado".
 */
function rutasDeCatalogo() {
  const items = JSON.parse(
    readFileSync(resolve(RAIZ, "src/data/products.json"), "utf-8"),
  );
  const categorias = JSON.parse(
    readFileSync(resolve(RAIZ, "src/data/categories.json"), "utf-8"),
  );
  const habilitadas = new Set(
    categorias.filter((c) => c.enabled).map((c) => c.slug),
  );

  return items
    .filter((p) => p.slug && habilitadas.has(p.category))
    .map((p) => ({
      ruta: `/catalogo/${p.slug}`,
      prioridad: "0.6",
      frecuencia: "monthly",
    }));
}

export function todasLasRutas() {
  return [...FIJAS, ...rutasDeCatalogo()];
}

/** Fecha de hoy en formato AAAA-MM-DD, para <lastmod>. */
export function hoy() {
  return new Date().toISOString().slice(0, 10);
}
