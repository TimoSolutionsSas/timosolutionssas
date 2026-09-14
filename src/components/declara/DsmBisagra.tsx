import { REPARTO_TRABAJO } from "./dsmData";

/**
 * La bisagra del argumento: el trabajo de declarar es 90% mecánico y 10%
 * criterio. Es el único momento centrado de toda la página, porque es una
 * sola afirmación — y el punto donde la página pasa de oscuro a claro.
 */
export function DsmBisagra() {
  return (
    <section className="bg-[#f4f6fa] py-20 md:py-28">
      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <p className="mx-auto max-w-[24ch] text-center font-serif text-[30px] font-semibold leading-[1.15] text-[#071d42] sm:text-[42px]">
          El trabajo es 90% mecánico y 10% criterio.
        </p>
        <p className="mx-auto mt-5 max-w-[52ch] text-center font-sans text-[15.5px] leading-relaxed text-[#3f5063]">
          Hoy ese 90% lo hace un ser humano: el ciudadano, que no sabe cómo, o el contador, que sabe
          pero no tiene el tiempo. Ahí es exactamente donde interviene DeclaraSinMiedo.
        </p>

        {/* La barra: una sola imagen del reparto */}
        <div className="mx-auto mt-12 max-w-3xl">
          <div className="flex h-14 overflow-hidden rounded-md">
            <div className="flex w-[90%] items-center justify-center bg-[#1668d6]">
              <span className="font-sans text-[13px] font-semibold text-white">
                90% · la máquina
              </span>
            </div>
            <div className="flex w-[10%] items-center justify-center bg-[#0e7a56]">
              <span className="font-sans text-[13px] font-semibold text-white">10%</span>
            </div>
          </div>
          <div className="mt-2 flex justify-between font-sans text-[12px] text-[#7c8b9c]">
            <span>Transcribir, cruzar, clasificar, calcular</span>
            <span>Criterio humano</span>
          </div>
        </div>

        {/* Qué cae de cada lado */}
        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="font-sans text-[14px] font-semibold text-[#1668d6]">
              Lo que la máquina debe hacer
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {REPARTO_TRABAJO.mecanico.map((t) => (
                <li
                  key={t}
                  className="border-l-2 border-[#c3d9f5] pl-4 font-sans text-[14px] leading-relaxed text-[#3f5063]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-sans text-[14px] font-semibold text-[#0e7a56]">
              Lo que solo un humano decide
            </h3>
            <ul className="mt-4 flex flex-col gap-3">
              {REPARTO_TRABAJO.criterio.map((t) => (
                <li
                  key={t}
                  className="border-l-2 border-[#b5ddcb] pl-4 font-sans text-[14px] leading-relaxed text-[#3f5063]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mx-auto mt-14 max-w-[62ch] text-center font-sans text-[15px] leading-relaxed text-[#3f5063]">
          No para reemplazar al contador — el criterio profesional sigue siendo insustituible y hay
          casos que exigen sí o sí a un experto — sino para quitarle de encima el 90% mecánico a
          quien sea que lo esté cargando.
        </p>
      </div>
    </section>
  );
}
