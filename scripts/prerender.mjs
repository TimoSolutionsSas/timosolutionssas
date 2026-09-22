import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { dirname, resolve } from "node:path";
import { BASE, todasLasRutas } from "./rutas.mjs";

/**
 * Convierte el SPA en HTML estático: escribe un archivo por cada ruta dentro
 * de dist/, con el contenido ya renderizado y las etiquetas de <head> de esa
 * página.
 *
 * Por qué hace falta. GitHub Pages solo sirve archivos que existen. Sin este
 * paso, pedir /catalogo devolvía el 404.html del repositorio —con estado HTTP
 * 404— que redirige al SPA por JavaScript. El visitante no lo nota, pero
 * Google sí: no indexa una URL que responde 404. Con un dist/catalogo/index.html
 * real, esa misma URL responde 200 y con el texto dentro del HTML.
 *
 * El resultado sigue siendo la misma aplicación: React se monta encima y a
 * partir de ahí la navegación es la del SPA, sin recargas.
 */

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const DIST = resolve(RAIZ, "dist");
// El bundle de servidor vive fuera de dist/ a propósito: solo sirve para
// generar el HTML en el build y no debe publicarse en GitHub Pages.
const SSR = resolve(RAIZ, "dist-ssr");

// pathToFileURL: en Windows, import() de una ruta absoluta necesita el
// esquema file://, si no Node la interpreta como protocolo "c:".
const { render } = await import(
  pathToFileURL(resolve(SSR, "entry-server.js")).href
);

const plantilla = readFileSync(resolve(DIST, "index.html"), "utf-8");

// La ruta "/" se escribe sobre este mismo archivo. Si se ejecutara el script
// dos veces sin volver a compilar, la plantilla ya vendría con la portada
// dentro y todas las páginas saldrían con ese contenido. Mejor detenerse.
if (!plantilla.includes('<div id="root"></div>')) {
  console.error(
    "dist/index.html ya está pre-renderizado. Ejecuta `npm run build`, que " +
      "regenera la plantilla antes de llamar a este script.",
  );
  process.exit(1);
}

// Etiquetas de la plantilla que cada página sustituye con las suyas. Se quitan
// antes de insertar las de Helmet para no dejar dos <title>, dos canonical ni
// dos og:title en el mismo documento. Lo que no depende de la página
// —keywords, author, JSON-LD del negocio, fuentes, iconos— se conserva.
const ETIQUETAS_SUSTITUIBLES = new RegExp(
  [
    "\\s*<title>[\\s\\S]*?</title>",
    '\\s*<meta\\s+name="(?:description|robots)"[^>]*>',
    '\\s*<meta\\s+property="og:(?:title|description|url|type|image)"[^>]*>',
    '\\s*<meta\\s+name="twitter:(?:title|description|image)"[^>]*>',
    '\\s*<link\\s+rel="canonical"[^>]*>',
  ].join("|"),
  "g",
);

let escritas = 0;
const incompletas = [];

for (const { ruta } of todasLasRutas()) {
  const { html, head, incompleta } = await render(`${BASE}${ruta}`, BASE);
  if (incompleta) incompletas.push(ruta);

  const documento = plantilla
    .replace(ETIQUETAS_SUSTITUIBLES, "")
    .replace("</head>", `  ${head}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

  // "/" -> dist/index.html ; "/catalogo" -> dist/catalogo/index.html
  const destino =
    ruta === "/"
      ? resolve(DIST, "index.html")
      : resolve(DIST, `.${ruta}`, "index.html");

  mkdirSync(dirname(destino), { recursive: true });
  writeFileSync(destino, documento, "utf-8");
  escritas++;
}

console.log(`pre-renderizadas ${escritas} rutas a HTML estático`);
if (incompletas.length) {
  console.warn(
    `aviso: estas rutas quedaron en el cargador, sin contenido indexable: ${incompletas.join(", ")}`,
  );
}
