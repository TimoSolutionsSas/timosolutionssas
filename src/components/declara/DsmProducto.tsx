import { DETECCIONES, PILARES } from "./dsmData";

const TONO_DETECCION = {
  riesgo: { punto: "bg-[#b3261e]", etiqueta: "Omisión o error silencioso" },
  duplicado: { punto: "bg-[#b26a00]", etiqueta: "Duplicado" },
  criterio: { punto: "bg-[#1668d6]", etiqueta: "Criterio aplicado" },
} as const;

/**
 * Qué hace el producto. Los tres primeros pilares son literalmente el orden
 * de procesamiento (leer → cruzar → calcular), así que van numerados como la
 * secuencia que son. El cuarto es un principio de diseño transversal, no un
 * paso, y por eso se presenta aparte.
 */
export function DsmProducto() {
  const [leer, cruzar, calcular, silencio] = PILARES;
  const secuencia = [leer, cruzar, calcular];

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-[22ch] font-serif text-3xl font-semibold leading-tight text-[#071d42] sm:text-[38px]">
          Un motor de extracción, cruce y cálculo
        </h2>
        <p className="mt-4 max-w-[64ch] font-sans text-[15.5px] leading-relaxed text-[#3f5063]">
          No es una calculadora ni una plantilla de Excel. Está construido sobre el Estatuto
          Tributario colombiano y verificado contra declaraciones reales ya presentadas ante la DIAN.
        </p>

        {/* La secuencia de procesamiento */}
        <ol className="mt-14 flex flex-col gap-12">
          {secuencia.map((p, i) => (
            <li key={p.titulo} className="grid gap-6 md:grid-cols-[auto_1fr] md:gap-10">
              <div className="flex items-start gap-4 md:flex-col md:items-center md:gap-0">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#1668d6] font-sans text-[16px] font-semibold text-[#1668d6]">
                  {i + 1}
                </span>
                {i < secuencia.length - 1 && (
                  <span aria-hidden className="mt-3 hidden w-px flex-1 bg-[#dbe4ef] md:block" />
                )}
              </div>

              <div className="pb-2">
                <h3 className="font-serif text-[24px] font-semibold leading-snug text-[#071d42]">
                  {p.titulo}
                </h3>
                <p className="mt-3 max-w-[62ch] font-sans text-[15px] leading-relaxed text-[#3f5063]">
                  {p.resumen}
                </p>
                <ul className="mt-5 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
                  {p.detalle.map((d) => (
                    <li
                      key={d}
                      className="flex gap-2.5 font-sans text-[13.5px] leading-relaxed text-[#55636f]"
                    >
                      <span
                        aria-hidden
                        className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#9fb4cc]"
                      />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>

        {/* El principio transversal: presentado como lo que es, una regla de diseño */}
        <div className="mt-16 border-y border-[#dbe4ef] py-12">
          <h3 className="font-serif text-[26px] font-semibold leading-snug text-[#071d42] sm:text-[30px]">
            {silencio.titulo}
          </h3>
          <p className="mt-4 max-w-[64ch] font-serif text-[18px] italic leading-relaxed text-[#1668d6]">
            {silencio.resumen}
          </p>
          <ul className="mt-6 grid gap-x-10 gap-y-2.5 sm:grid-cols-2">
            {silencio.detalle.map((d) => (
              <li key={d} className="flex gap-2.5 font-sans text-[13.5px] leading-relaxed text-[#55636f]">
                <span aria-hidden className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#9fb4cc]" />
                {d}
              </li>
            ))}
          </ul>
        </div>

        {/* La validación más exigente */}
        <div className="mt-16 bg-[#f4f6fa] px-6 py-10 sm:px-10">
          <p className="max-w-[58ch] font-serif text-[20px] leading-relaxed text-[#071d42] sm:text-[23px]">
            En su prueba de validación más exigente, el sistema reconstruyó desde cero una declaración
            real —{" "}
            <em className="italic">sin conocer el resultado de antemano</em> — y coincidió casilla por
            casilla con la que el contribuyente ya había presentado ante la DIAN.
          </p>
          <p className="mt-4 font-sans text-[13.5px] text-[#55636f]">
            Las únicas diferencias fueron el redondeo a miles que aplica la propia DIAN.
          </p>
        </div>

        {/* Qué detecta el cruce */}
        <div className="mt-20">
          <h3 className="max-w-[26ch] font-serif text-[26px] font-semibold leading-snug text-[#071d42] sm:text-[30px]">
            Los seis errores que aparecen meses después, con el requerimiento encima
          </h3>
          <p className="mt-4 max-w-[62ch] font-sans text-[15px] leading-relaxed text-[#3f5063]">
            Todos son invisibles en una revisión a ojo: el número está ahí, se ve razonable, y nada
            avisa que está mal. El cruce los encuentra antes de presentar.
          </p>

          <div className="mt-8 flex flex-col">
            {DETECCIONES.map((d) => {
              const tono = TONO_DETECCION[d.tono];
              return (
                <div
                  key={d.detecta}
                  className="grid gap-2 border-t border-[#e3e9f1] py-5 md:grid-cols-[auto_1.15fr_1fr] md:items-baseline md:gap-6"
                >
                  <span
                    aria-label={tono.etiqueta}
                    title={tono.etiqueta}
                    className={`mt-2 h-2 w-2 shrink-0 rounded-full ${tono.punto}`}
                  />
                  <p className="font-sans text-[14.5px] font-medium leading-relaxed text-[#14202e]">
                    {d.detecta}
                  </p>
                  <p className="font-sans text-[13.5px] leading-relaxed text-[#55636f]">{d.importa}</p>
                </div>
              );
            })}
            <div className="border-t border-[#e3e9f1]" />
          </div>
        </div>
      </div>
    </section>
  );
}
