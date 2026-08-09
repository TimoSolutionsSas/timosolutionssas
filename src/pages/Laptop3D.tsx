import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  FiArrowLeft,
  FiBox,
  FiLayers,
  FiRotateCw,
  FiX,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SEO } from "@/components/common/SEO";
import { LaptopExperience } from "@/components/lab3d/LaptopExperience";
import {
  EXTERIOR_PART_IDS,
  INTERIOR_PART_IDS,
  LAPTOP_PARTS,
  type PartId,
} from "@/components/lab3d/laptopParts";
import { assetUrl } from "@/utils/assetUrl";
import { buildWhatsAppUrl, SITE, WHATSAPP_MESSAGES } from "@/config/site";
import { cn } from "@/utils/cn";

export default function Laptop3D() {
  const [isExploded, setIsExploded] = useState(false);
  const [activePart, setActivePart] = useState<PartId | null>(null);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const activePartData = activePart ? LAPTOP_PARTS[activePart] : null;
  const partIds = isExploded
    ? [...EXTERIOR_PART_IDS, ...INTERIOR_PART_IDS]
    : EXTERIOR_PART_IDS;

  function selectPart(id: PartId | null) {
    setAutoRotate(false);
    setActivePart((prev) => (prev === id ? null : id));
  }

  return (
    <div className="fixed inset-0 flex flex-col bg-[#050914] text-white">
      <SEO
        title="Portátil 3D interactivo"
        description="Explora un portátil moderno en 3D, parte por parte: pantalla, teclado, RAM, SSD, batería y sistema de enfriamiento. Una experiencia interactiva de TI.MO SOLUTIONS."
        path="/laptop-3d"
      />

      {/* Barra superior */}
      <header className="z-20 flex shrink-0 items-center justify-between border-b border-white/10 bg-[#050914]/80 px-4 py-3 backdrop-blur-md sm:px-6">
        <Link
          to="/"
          className="focus-ring flex items-center gap-2 text-sm font-medium text-white/70 hover:text-accent"
        >
          <FiArrowLeft />
          <span className="hidden sm:inline">Volver a</span>
          <img
            src={assetUrl("/images/logo.png")}
            alt={SITE.name}
            className="h-7 w-7 rounded-md bg-white object-contain p-0.5"
          />
          <span className="hidden sm:inline">TI.MO SOLUTIONS</span>
        </Link>
        <span className="rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-accent">
          Experiencia 3D · Demo interactiva
        </span>
      </header>

      {/* Escena 3D + panel */}
      <div className="relative flex-1 overflow-hidden lg:flex">
        <div className="absolute inset-0 lg:relative lg:flex-1">
          <LaptopExperience
            isExploded={isExploded}
            activePart={activePart}
            onSelectPart={selectPart}
            autoRotate={autoRotate}
          />

          {/* Ayuda de controles */}
          <div className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/40 px-4 py-2 text-center text-xs text-white/60 backdrop-blur-sm lg:bottom-6">
            Arrastra para rotar · Desliza para acercar
          </div>

          {/* Botón para abrir panel en móvil */}
          <button
            onClick={() => setIsPanelOpen(true)}
            className={cn(
              "focus-ring absolute right-4 top-4 flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-md lg:hidden",
              isPanelOpen && "hidden"
            )}
          >
            <FiLayers /> Controles
          </button>
        </div>

        {/* Panel HUD */}
        <AnimatePresence>
          {isPanelOpen && (
            <motion.aside
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.25 }}
              className="absolute inset-x-0 bottom-0 z-30 max-h-[46vh] overflow-y-auto rounded-t-3xl border-t border-white/10 bg-[#0a1020]/95 p-5 backdrop-blur-xl lg:static lg:inset-auto lg:z-10 lg:h-full lg:w-[360px] lg:max-h-none lg:overflow-y-auto lg:rounded-none lg:rounded-l-3xl lg:border-l lg:border-t-0"
            >
              <div className="mb-4 flex items-start justify-between gap-3">
                <div>
                  <h1 className="font-display text-xl font-bold">
                    Portátil 3D interactivo
                  </h1>
                  <p className="mt-1 text-sm text-white/55">
                    Visualización educativa: así distribuye un portátil moderno
                    sus componentes por dentro.
                  </p>
                </div>
                <button
                  onClick={() => setIsPanelOpen(false)}
                  aria-label="Cerrar panel"
                  className="focus-ring flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 lg:hidden"
                >
                  <FiX />
                </button>
              </div>

              {/* Controles principales */}
              <div className="mb-5 flex flex-col gap-2 sm:flex-row lg:flex-col">
                <button
                  onClick={() => {
                    setIsExploded((prev) => !prev);
                    setActivePart(null);
                  }}
                  className={cn(
                    "focus-ring flex flex-1 items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                    isExploded
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-white/15 bg-white/5 text-white hover:border-accent/50"
                  )}
                >
                  <FiBox />
                  {isExploded ? "Ver ensamblado" : "Ver por dentro"}
                </button>
                <button
                  onClick={() => setAutoRotate((prev) => !prev)}
                  className={cn(
                    "focus-ring flex items-center justify-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition-colors",
                    autoRotate
                      ? "border-primary-light bg-primary/20 text-primary-light"
                      : "border-white/15 bg-white/5 text-white hover:border-primary-light/50"
                  )}
                >
                  <FiRotateCw className={autoRotate ? "animate-spin-slow" : ""} />
                  Girar
                </button>
              </div>

              {/* Tarjeta de la parte activa */}
              <AnimatePresence mode="wait">
                {activePartData ? (
                  <motion.div
                    key={activePartData.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="mb-5 rounded-2xl border border-accent/30 bg-accent/10 p-4"
                  >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-accent">
                      {activePartData.category === "interior"
                        ? "Componente interno"
                        : "Parte externa"}
                    </p>
                    <h3 className="mb-2 font-display text-lg font-semibold">
                      {activePartData.label}
                    </h3>
                    <p className="text-sm text-white/70">
                      {activePartData.description}
                    </p>
                    {activePartData.relatedService && (
                      <a
                        href={buildWhatsAppUrl(
                          `Hola, quiero cotizar: ${activePartData.relatedService}.`
                        )}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="focus-ring mt-3 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white hover:bg-[#1ebe57]"
                      >
                        <FaWhatsapp /> Cotizar: {activePartData.relatedService}
                      </a>
                    )}
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Lista de partes */}
              <div className="flex flex-col gap-1">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/40">
                  {isExploded ? "Toca una parte" : "Partes externas"}
                </p>
                {partIds.map((id) => {
                  const part = LAPTOP_PARTS[id];
                  return (
                    <button
                      key={id}
                      onClick={() => selectPart(id)}
                      className={cn(
                        "focus-ring flex items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm transition-colors",
                        activePart === id
                          ? "bg-white/10 text-accent"
                          : "text-white/70 hover:bg-white/5 hover:text-white"
                      )}
                    >
                      {part.label}
                      <span
                        className={cn(
                          "h-1.5 w-1.5 rounded-full",
                          activePart === id ? "bg-accent" : "bg-white/20"
                        )}
                      />
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="mb-3 text-sm text-white/60">
                  ¿Necesitas actualizar la RAM, el SSD o hacerle mantenimiento
                  a tu equipo real?
                </p>
                <a
                  href={buildWhatsAppUrl(WHATSAPP_MESSAGES.laptop3d)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="focus-ring flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1ebe57]">
                    <FaWhatsapp size={18} /> Cotizar mi equipo
                  </span>
                </a>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
