import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { HelmetProvider, type HelmetServerState } from "react-helmet-async";
import { ToastProvider } from "@/components/common/Toast";
import { AppRoutes } from "@/routes";

/**
 * Entrada del pre-renderizado. scripts/prerender.mjs llama a `render()` una
 * vez por cada URL del sitio y escribe el HTML resultante en su propio
 * archivo dentro de dist/, para que GitHub Pages sirva cada ruta con estado
 * 200 y con el texto ya presente, sin depender de que el rastreador ejecute
 * JavaScript.
 *
 * `basename` se pasa al StaticRouter para que los <Link> del HTML generado
 * apunten a /timosolutionssas/... y no a la raíz del dominio.
 */

export interface ResultadoRender {
  html: string;
  /** Etiquetas de <head> que react-helmet-async recogió durante el render. */
  head: string;
  /** true si la ruta se quedó en el fallback de <Suspense>. */
  incompleta: boolean;
}

/** Marca que InitialLoader deja en el HTML cuando <Suspense> no resolvió. */
const MARCA_FALLBACK = "data-initial-loader";

function unPaso() {
  return new Promise((resolve) => setTimeout(resolve, 0));
}

function renderizar(url: string, basename: string) {
  const contexto: { helmet?: HelmetServerState } = {};

  const html = renderToString(
    <HelmetProvider context={contexto}>
      <ToastProvider>
        <StaticRouter basename={basename} location={url}>
          <AppRoutes />
        </StaticRouter>
      </ToastProvider>
    </HelmetProvider>,
  );

  const h = contexto.helmet;
  const head = h
    ? [
        h.title.toString(),
        h.meta.toString(),
        h.link.toString(),
        h.script.toString(),
      ]
        .filter(Boolean)
        .join("\n    ")
    : "";

  return { html, head };
}

export async function render(
  url: string,
  basename: string,
): Promise<ResultadoRender> {
  // Las rutas en chunk aparte usan React.lazy, que solo entrega el componente
  // de forma síncrona cuando su import() ya se resolvió. La primera pasada
  // dispara esa carga y devuelve el fallback de <Suspense>; tras ceder el
  // turno al bucle de eventos, la siguiente ya renderiza la página completa.
  // Las rutas normales resuelven en la primera pasada y salen de inmediato.
  let resultado = renderizar(url, basename);

  for (let intento = 0; intento < 3; intento++) {
    if (!resultado.html.includes(MARCA_FALLBACK)) break;
    await unPaso();
    resultado = renderizar(url, basename);
  }

  return {
    ...resultado,
    incompleta: resultado.html.includes(MARCA_FALLBACK),
  };
}
