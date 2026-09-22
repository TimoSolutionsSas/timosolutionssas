import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";

// Repo de GitHub: TimoSolutionsSas/timosolutionssas -> publica bajo subpath
const REPO_NAME = "timosolutionssas";

export default defineConfig(({ mode, isSsrBuild }) => ({
  base: mode === "production" ? `/${REPO_NAME}/` : "/",
  plugins: [
    react(),
    // El build de servidor (vite build --ssr) solo existe para generar el
    // HTML estático de cada ruta; no es un sitio que alguien vaya a abrir,
    // así que no necesita service worker ni manifiesto.
    !isSsrBuild &&
      VitePWA({
        registerType: "autoUpdate",
        includeAssets: ["favicon.svg", "apple-touch-icon.png"],
        manifest: {
          name: "TI.MO SOLUTIONS",
          short_name: "TI.MO",
          description:
            "Mantenimiento, actualización y venta de tecnología para computadores portátiles y de escritorio.",
          theme_color: "#0B1E3D",
          background_color: "#FFFFFF",
          display: "standalone",
          start_url: mode === "production" ? `/${REPO_NAME}/` : "/",
          icons: [
            {
              src: "icons/icon-192.png",
              sizes: "192x192",
              type: "image/png",
            },
            {
              src: "icons/icon-512.png",
              sizes: "512x512",
              type: "image/png",
            },
          ],
        },
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ssr: {
    // react-helmet-async se publica como CommonJS. Si Vite lo deja como
    // dependencia externa, Node no encuentra sus exportaciones con nombre al
    // pre-renderizar; incluyéndolo en el bundle, Vite resuelve la interoperación.
    noExternal: ["react-helmet-async"],
  },
  build: {
    // El chunk de la experiencia 3D (three.js + R3F + drei) es grande a
    // propósito: solo se descarga si el usuario visita /laptop-3d, nunca
    // afecta la carga del sitio principal. Se sube el límite para no
    // generar una advertencia ruidosa por ese chunk aislado; el bundle
    // principal se mantiene muy por debajo de este umbral.
    chunkSizeWarningLimit: 1100,
  },
}));
