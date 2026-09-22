import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { DOMINIO, hoy, todasLasRutas } from "./rutas.mjs";

/**
 * Regenera public/sitemap.xml y public/robots.txt a partir de la lista real
 * de rutas. Se ejecuta antes de cada build (ver package.json), así que el
 * sitemap no puede quedarse desactualizado cuando se agrega un producto o una
 * página nueva.
 */

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const fecha = hoy();
const rutas = todasLasRutas();

const urls = rutas
  .map(({ ruta, prioridad, frecuencia }) => {
    // Todas con barra final: es la forma que GitHub Pages sirve directamente
    // desde <ruta>/index.html, y la misma que declara el canonical de cada
    // página (ver src/components/common/SEO.tsx).
    const loc = ruta === "/" ? `${DOMINIO}/` : `${DOMINIO}${ruta}/`;
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${fecha}</lastmod>
    <changefreq>${frecuencia}</changefreq>
    <priority>${prioridad}</priority>
  </url>`;
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generado por scripts/generar-sitemap.mjs. No editar a mano. -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;

writeFileSync(resolve(RAIZ, "public/sitemap.xml"), sitemap, "utf-8");

const robots = `User-agent: *
Allow: /

Sitemap: ${DOMINIO}/sitemap.xml
`;

writeFileSync(resolve(RAIZ, "public/robots.txt"), robots, "utf-8");

console.log(`sitemap.xml: ${rutas.length} URLs (${fecha})`);
console.log(`robots.txt: apunta a ${DOMINIO}/sitemap.xml`);
