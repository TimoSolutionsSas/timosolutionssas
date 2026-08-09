import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { productRepository } from "@/services/productRepository";
import { shuffle } from "@/utils/shuffle";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";

const ROTATE_MS = 4000;

export function HeroProductCarousel() {
  const items = useMemo(
    () => shuffle(productRepository.getAll()).slice(0, 8),
    []
  );
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (items.length < 2) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, ROTATE_MS);
    return () => clearInterval(interval);
  }, [items.length]);

  const current = items[index];
  if (!current) return null;

  return (
    <div className="relative mx-auto flex h-72 w-72 items-center justify-center sm:h-80 sm:w-80">
      {/* El anillo gira con CSS transform, así que necesita su propio
          recorte: sin este contenedor, el giro empuja el ancho de la
          página más allá del viewport en móvil. */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 h-full w-full animate-spin-slow text-accent/40"
        >
          <polygon
            points="100,6 176,50 176,150 100,194 24,150 24,50"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="6 10"
          />
        </svg>
      </div>
      <div className="absolute inset-6 rounded-full border border-white/20" />
      <div className="absolute inset-6 rounded-full bg-white/5 backdrop-blur-sm" />

      <Link
        to={`/catalogo/${current.slug}`}
        className="focus-ring relative z-10 flex h-48 w-48 flex-col items-center justify-center gap-3 rounded-full text-center sm:h-56 sm:w-56"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-3"
          >
            <ImageWithFallback
              src={current.images[0]}
              alt={current.name}
              className="h-28 w-28 rounded-full border-2 border-white/30 object-cover shadow-glow sm:h-32 sm:w-32"
            />
            <span className="max-w-[10rem] text-sm font-semibold leading-snug text-white">
              {current.name}
            </span>
          </motion.div>
        </AnimatePresence>
      </Link>

      {/* Puntos indicadores */}
      <div className="absolute -bottom-8 flex gap-1.5">
        {items.map((item, i) => (
          <span
            key={item.id}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? "w-5 bg-accent" : "w-1.5 bg-white/30"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
