import type { ReactNode } from "react";
import { FiCheck, FiLock } from "react-icons/fi";
import { cn } from "@/utils/cn";

/**
 * Chrome de la aplicación de escritorio: barra de título, riel con los 12
 * pasos reales del flujo y área de contenido. Las pantallas que van dentro
 * son representaciones ilustrativas del flujo, no capturas del producto.
 */

const PASOS_APP = [
  "Antes de empezar",
  "Expediente",
  "Contribuyente",
  "¿Debo declarar?",
  "Documentos",
  "Cruce con exógena",
  "Hoja maestra",
  "Resultado",
  "Conciliación",
  "Resumen final",
  "Guía DIAN",
  "Mora y sanción",
  "Retención",
];

interface DsmAppWindowProps {
  /** Índice (0-based) del paso activo dentro de PASOS_APP. */
  pasoActivo: number;
  children: ReactNode;
}

export function DsmAppWindow({ pasoActivo, children }: DsmAppWindowProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-[#c3d0e0] bg-white shadow-[0_24px_60px_-30px_rgba(7,29,66,0.55)]">
      {/* Barra de título */}
      <div className="flex items-center gap-3 bg-[#0a2a5e] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
        </div>
        <p className="font-sans text-[12px] font-medium text-white/80">
          DeclaraSinMiedo
          <span className="hidden text-white/45 sm:inline"> — expediente de Laura R. · año gravable 2025</span>
        </p>
        <span className="ml-auto flex items-center gap-1.5 rounded-full bg-[#0e7a56]/25 px-2.5 py-0.5 text-[10.5px] font-medium text-[#7fe0bb]">
          <FiLock size={10} />
          Cifrado · sin conexión
        </span>
      </div>

      <div className="grid lg:grid-cols-[164px_1fr]">
        {/* Riel de pasos */}
        <nav className="hidden flex-col gap-0.5 border-r border-[#dde5ee] bg-[#f4f6fa] p-2.5 lg:flex">
          {PASOS_APP.map((paso, i) => {
            const completado = i < pasoActivo;
            const activo = i === pasoActivo;
            return (
              <div
                key={paso}
                className={cn(
                  "flex items-center gap-2 rounded-md px-2 py-1.5 font-sans text-[11.5px] leading-tight",
                  activo && "bg-[#1668d6] font-semibold text-white",
                  !activo && completado && "text-[#0e7a56]",
                  !activo && !completado && "text-[#7c8b9c]"
                )}
              >
                <span
                  className={cn(
                    "flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold",
                    activo && "bg-white text-[#1668d6]",
                    !activo && completado && "bg-[#0e7a56] text-white",
                    !activo && !completado && "bg-[#d8e0e9] text-[#7c8b9c]"
                  )}
                >
                  {completado ? <FiCheck size={9} strokeWidth={3} /> : i + 1}
                </span>
                {paso}
              </div>
            );
          })}
        </nav>

        {/* Contenido de la pantalla */}
        <div className="min-w-0 bg-white p-4 sm:p-5 lg:min-h-[500px]">{children}</div>
      </div>
    </div>
  );
}

/** Encabezado estándar de una pantalla de la app. */
export function DsmScreenHead({
  titulo,
  ayuda,
}: {
  titulo: string;
  ayuda?: string;
}) {
  return (
    <div className="mb-4 border-b border-[#e6ecf3] pb-3">
      <h4 className="font-sans text-[15px] font-semibold text-[#14202e]">{titulo}</h4>
      {ayuda && <p className="mt-1 font-sans text-[12px] text-[#55636f]">{ayuda}</p>}
    </div>
  );
}

/** Etiqueta de estado reutilizable dentro de las pantallas. */
export function DsmChip({
  tono,
  children,
}: {
  tono: "ok" | "aviso" | "riesgo" | "info" | "neutro";
  children: ReactNode;
}) {
  const tonos = {
    ok: "bg-[#e6f5ef] text-[#0e7a56]",
    aviso: "bg-[#fdf3e3] text-[#b26a00]",
    riesgo: "bg-[#fdecec] text-[#b3261e]",
    info: "bg-[#e8f0fb] text-[#1668d6]",
    neutro: "bg-[#eef2f6] text-[#55636f]",
  } as const;

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 whitespace-nowrap rounded px-1.5 py-0.5 font-sans text-[10px] font-semibold",
        tonos[tono]
      )}
    >
      {children}
    </span>
  );
}
