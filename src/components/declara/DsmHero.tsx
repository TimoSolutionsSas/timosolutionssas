import { motion, useReducedMotion } from "framer-motion";
import { FiArrowDown } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl } from "@/config/site";

/**
 * Certificados amontonados: el escritorio real de alguien en temporada de
 * renta. Se superponen a propósito, pero cada uno deja ver su encabezado y su
 * cifra — el desorden tiene que leerse, no solo verse. El último del array
 * queda encima: es el que plantea la pregunta que da nombre al producto.
 */
const PAPELES = [
  { titulo: "Certificado bancario", linea: "Rendimientos financieros", cifra: "$1.284.600", rot: -5, x: 2, y: 0 },
  { titulo: "Ingresos y retenciones", linea: "Formulario 220 · 2025", cifra: "$18.240.000", rot: 3, x: 44, y: 112 },
  { titulo: "Certificado de fondo", linea: "Aportes voluntarios", cifra: "$2.188.800", rot: -2, x: 8, y: 224 },
  { titulo: "Información exógena", linea: "Movimientos en cuentas", cifra: "$66.740.241", rot: 4, x: 50, y: 336, alerta: true },
];

export function DsmHero() {
  const sinMovimiento = useReducedMotion();

  return (
    <header className="relative overflow-hidden bg-[#071d42]">
      {/* Trama de formulario: rejilla de casillas, apenas perceptible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.055]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-5 pb-20 pt-16 sm:px-8 md:pb-28 md:pt-24 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="mb-6 font-sans text-[13px] font-medium tracking-wide text-[#7fb0f5]">
            Un producto de TI.MO SOLUTIONS
          </p>

          <h1 className="max-w-[17ch] font-serif text-[40px] font-semibold leading-[1.08] text-white sm:text-[54px] lg:text-[62px]">
            Declarar renta da miedo porque nadie te explica nada.
          </h1>

          <p className="mt-7 max-w-[54ch] font-sans text-[16px] leading-relaxed text-[#b8cbe6] sm:text-[17px]">
            Cerca de seis millones de colombianos quedan obligados a declarar cada año. La mayoría no
            son empresarios: son empleados, independientes, conductores, comerciantes. Hicieron todo
            bien y aun así se enfrentan a un formulario de más de 140 casillas con la sensación de
            que cualquier error les puede costar caro.
          </p>

          <p className="mt-5 max-w-[54ch] font-serif text-[19px] italic leading-relaxed text-white">
            DeclaraSinMiedo hace el 90% mecánico de ese trabajo, y deja por escrito el porqué de cada
            cifra.
          </p>

          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#recorrido"
              className="focus-ring inline-flex items-center gap-2.5 rounded-md bg-white px-6 py-3 font-sans text-[14px] font-semibold text-[#071d42] transition-colors hover:bg-[#dce8f8]"
            >
              Ver la aplicación por dentro
              <FiArrowDown size={15} />
            </a>
            <a
              href={buildWhatsAppUrl(
                "Hola, vi la página de DeclaraSinMiedo y quiero agendar una demostración de la aplicación."
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2.5 rounded-md border border-white/25 px-6 py-3 font-sans text-[14px] font-semibold text-white transition-colors hover:border-white/60"
            >
              <FaWhatsapp size={16} />
              Agendar demostración
            </a>
          </div>
        </div>

        {/* Pila de certificados */}
        <div aria-hidden className="relative mx-auto hidden h-[500px] w-full max-w-[380px] lg:block">
          {PAPELES.map((p, i) => (
            <motion.div
              key={p.titulo}
              initial={sinMovimiento ? false : { opacity: 0, y: 24, rotate: 0 }}
              animate={{ opacity: 1, y: p.y, rotate: p.rot }}
              transition={{ delay: 0.15 + i * 0.11, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              style={{ left: p.x, top: 0 }}
              className="absolute w-[268px] rounded-sm bg-[#fbfcfe] p-4 shadow-[0_18px_40px_-18px_rgba(0,0,0,0.75)]"
            >
              <div className="mb-2.5 h-1 w-9 rounded bg-[#c3d0e0]" />
              <p className="font-sans text-[11px] font-semibold uppercase tracking-wide text-[#7c8b9c]">
                {p.titulo}
              </p>
              <p className="mt-1.5 font-sans text-[12.5px] text-[#55636f]">{p.linea}</p>
              <p
                className={`mt-1 font-sans text-[19px] font-bold tabular-nums ${
                  p.alerta ? "text-[#b3261e]" : "text-[#14202e]"
                }`}
              >
                {p.cifra}
              </p>
              {p.alerta && (
                <p className="mt-1.5 font-sans text-[11px] leading-snug text-[#b3261e]">
                  ¿Esto es mío? ¿Lo declaro?
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </header>
  );
}
