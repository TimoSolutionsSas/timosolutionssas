import { ETAPAS_CONTADOR, MIEDOS_CIUDADANO } from "./dsmData";

/**
 * El problema, contado desde los dos lados: el ciudadano que no entiende y
 * el contador que entiende pero no tiene el tiempo. Sigue siendo territorio
 * oscuro — la página no se aclara hasta la bisagra del 90/10.
 */
export function DsmProblema() {
  return (
    <section className="bg-[#0a2a5e] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2 className="max-w-[20ch] font-serif text-3xl font-semibold leading-tight text-white sm:text-[38px]">
          El problema tiene dos caras, y ninguna es culpa de quien la vive
        </h2>

        {/* Cara 1 · el ciudadano */}
        <div className="mt-14">
          <h3 className="font-sans text-[15px] font-semibold text-[#7fb0f5]">
            La persona que debe declarar
          </h3>
          <p className="mt-2 max-w-[62ch] font-sans text-[15px] leading-relaxed text-[#b8cbe6]">
            Un salario, un arriendo, unos honorarios y unos dividendos no se tratan igual, aunque
            todos sean dinero que entró. Esto es lo que realmente le pasa:
          </p>

          <ul className="mt-8 flex flex-col gap-px overflow-hidden rounded-md bg-white/10">
            {MIEDOS_CIUDADANO.map((m) => (
              <li
                key={m.situacion}
                className="grid gap-3 bg-[#0a2a5e] px-5 py-5 md:grid-cols-[1.1fr_1fr_1.1fr] md:gap-6"
              >
                <p className="font-sans text-[13.5px] leading-relaxed text-[#d7e3f2]">{m.situacion}</p>
                <p className="font-serif text-[15px] italic leading-relaxed text-white">
                  «{m.siente}»
                </p>
                <p className="font-sans text-[13px] leading-relaxed text-[#f0a9a4]">{m.riesgo}</p>
              </li>
            ))}
          </ul>

          <p className="mt-8 max-w-[60ch] border-l-2 border-[#7fb0f5] pl-5 font-sans text-[15px] leading-relaxed text-[#d7e3f2]">
            Y el dato que más sorprende: muchísimas de estas personas{" "}
            <strong className="font-semibold text-white">no deben un solo peso</strong>. Terminan en
            ceros o con saldo a favor. La angustia no viene de tener que pagar — viene de no saber, y
            de que equivocarse tiene consecuencias.
          </p>
        </div>

        {/* Cara 2 · el contador */}
        <div className="mt-20">
          <h3 className="font-sans text-[15px] font-semibold text-[#7fb0f5]">
            El contador que intenta ayudarlo
          </h3>
          <p className="mt-2 max-w-[62ch] font-sans text-[15px] leading-relaxed text-[#b8cbe6]">
            Es fácil culparlo. Pero cuando uno mira cómo trabaja en temporada de renta, el problema
            deja de parecer de actitud y pasa a ser de capacidad. Así se le va el tiempo con cada
            cliente:
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {ETAPAS_CONTADOR.map((e) => (
              <div key={e.etapa} className="grid gap-2 md:grid-cols-[1fr_1.6fr_auto] md:items-center md:gap-6">
                <p className="font-sans text-[14px] font-medium text-white">{e.etapa}</p>
                <div className="flex items-center gap-4">
                  <div className="h-[7px] flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#7fb0f5]"
                      style={{ width: `${(e.max / 90) * 100}%` }}
                    />
                  </div>
                </div>
                <p className="font-sans text-[13px] tabular-nums text-[#b8cbe6] md:w-20 md:text-right">
                  {e.minutos}
                </p>
                <p className="font-sans text-[12.5px] leading-relaxed text-[#8fa8c6] md:col-span-3 md:-mt-1 md:max-w-[70ch]">
                  {e.aMano}
                </p>
              </div>
            ))}
          </div>

          <p className="mt-10 max-w-[60ch] border-l-2 border-[#f0a9a4] pl-5 font-sans text-[15px] leading-relaxed text-[#d7e3f2]">
            Entre <strong className="font-semibold text-white">3 y 7 horas por declaración</strong>, y
            solo la última media hora es trabajo que de verdad requiere un contador. Todo lo anterior
            es transcribir, comparar y ordenar: exactamente el tipo de tarea en la que un humano se
            cansa y una máquina no.
          </p>
        </div>
      </div>
    </section>
  );
}
