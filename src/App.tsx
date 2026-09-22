import { BrowserRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ToastProvider } from "@/components/common/Toast";
import { AppRoutes } from "@/routes";

/**
 * El build genera el HTML de cada ruta ya renderizado (ver
 * scripts/prerender.mjs), así que al abrir el sitio el contenido se ve antes
 * incluso de que cargue React. Por eso ya no hay pantalla de carga inicial con
 * temporizador: taparía algo que el visitante ya está viendo. InitialLoader
 * sigue en uso como fallback de <Suspense> en las rutas que van en chunk
 * aparte (ver src/routes.tsx).
 */
export default function App() {
  return (
    <HelmetProvider>
      <ToastProvider>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
          <AppRoutes />
        </BrowserRouter>
      </ToastProvider>
    </HelmetProvider>
  );
}
