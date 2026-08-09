import { lazy, Suspense, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AnimatePresence } from "framer-motion";
import { ToastProvider } from "@/components/common/Toast";
import { InitialLoader } from "@/components/common/InitialLoader";
import { MainLayout } from "@/layouts/MainLayout";
import { Home } from "@/pages/Home";
import { About } from "@/pages/About";
import { Catalog } from "@/pages/Catalog";
import { ProductDetail } from "@/pages/ProductDetail";
import { Contact } from "@/pages/Contact";
import { NotFound } from "@/pages/NotFound";

// Three.js/React Three Fiber solo se descargan si el usuario visita esta
// ruta: import() dinámico -> Vite genera un chunk aparte, así el resto del
// sitio no carga ni un byte de la librería 3D.
const Laptop3D = lazy(() => import("@/pages/Laptop3D"));

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 900);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <HelmetProvider>
      <ToastProvider>
        <AnimatePresence>{isLoading && <InitialLoader />}</AnimatePresence>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
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
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />
              <Route path="/nosotros" element={<About />} />
              <Route path="/catalogo" element={<Catalog />} />
              <Route path="/catalogo/:slug" element={<ProductDetail />} />
              <Route path="/contacto" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </HelmetProvider>
  );
}
