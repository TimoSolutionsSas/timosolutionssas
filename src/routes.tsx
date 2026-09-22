import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { InitialLoader } from "@/components/common/InitialLoader";
import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Catalog } from "@/pages/Catalog";
import { ProductDetail } from "@/pages/ProductDetail";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

/**
 * Árbol de rutas, sin el router que lo envuelve. El navegador lo monta bajo
 * <BrowserRouter> (src/App.tsx) y el paso de pre-renderizado lo monta bajo
 * <StaticRouter> (src/entry-server.tsx) para generar el HTML estático de cada
 * URL. Compartir este archivo evita que las dos listas de rutas se separen.
 */

// Three.js/React Three Fiber solo se descargan si el usuario visita esta
// ruta: import() dinámico -> Vite genera un chunk aparte, así el resto del
// sitio no carga ni un byte de la librería 3D.
const Laptop3D = lazy(() => import("@/pages/Laptop3D"));

// Página de producto de DeclaraSinMiedo: también en su propio chunk, para que
// no cargue en la navegación normal del sitio.
const DeclaraSinMiedo = lazy(() => import("@/pages/DeclaraSinMiedo"));

export function AppRoutes() {
  return (
    <Routes>
      {/* Fuera de MainLayout a propósito: es una experiencia inmersiva
          a pantalla completa, sin navbar/footer del sitio. */}
      <Route
        path="/laptop-3d"
        element={
          <Suspense fallback={<InitialLoader />}>
            <Laptop3D />
          </Suspense>
        }
      />
      <Route
        path="/declarasinmiedo"
        element={
          <Suspense fallback={<InitialLoader />}>
            <DeclaraSinMiedo />
          </Suspense>
        }
      />
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/nosotros" element={<About />} />
        <Route path="/catalogo" element={<Catalog />} />
        <Route path="/catalogo/:slug" element={<ProductDetail />} />
        <Route path="/contacto" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
