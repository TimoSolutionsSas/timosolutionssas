import { useState } from "react";
import { FiChevronDown, FiSlash } from "react-icons/fi";
import { LIMITES, PREGUNTAS, SEGURIDAD } from "./dsmData";
import { cn } from "@/utils/cn";

export function DsmConfianza() {
  const [abierta, setAbierta] = useState<number | null>(0);

  return (
    <section className="bg-white py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Privacidad */}
        <h2 className="max-w-[24ch] font-serif text-3xl font-semibold leading-tight text-[#071d42] sm:text-[38px]">
          Tus datos financieros no van a ninguna parte
        </h2>
        <p className="mt-4 max-w-[62ch] font-sans text-[15.5px] leading-relaxed text-[#3f5063]">
          No es una promesa de política de privacidad: es una consecuencia de cómo está construido el
          producto. Funciona completamente en tu computador, sin nube y sin enviar información a
          ningún servidor — ni siquiera al fabricante.
        </p>

        <dl className="mt-10 grid gap-x-12 gap-y-7 md:grid-cols-2">
          {SEGURIDAD.map((s) => (
            <div key={s.caracteristica} className="border-t border-[#e3e9f1] pt-4">
              <dt className="font-sans text-[14.5px] font-semibold text-[#14202e]">
                {s.caracteristica}
              </dt>
              <dd className="mt-1.5 font-sans text-[13.5px] leading-relaxed text-[#55636f]">
                {s.significa}
              </dd>
            </div>
          ))}
        </dl>

        {/* Lo que NO hace */}
        <div className="mt-20 bg-[#071d42] px-6 py-12 sm:px-12">
          <h3 className="max-w-[24ch] font-serif text-[26px] font-semibold leading-snug text-white sm:text-[32px]">
            Lo que el producto no hace, dicho de frente
          </h3>
          <p className="mt-4 max-w-[62ch] font-sans text-[15px] leading-relaxed text-[#b8cbe6]">
            Una herramienta seria se define tanto por sus límites como por sus capacidades. Estos
            están declarados dentro de la propia aplicación, no solo aquí.
          </p>

          <ul className="mt-9 grid gap-7 md:grid-cols-2">
            {LIMITES.map((l) => (
              <li key={l.titulo} className="flex gap-3.5">
                <FiSlash className="mt-1 shrink-0 text-[#f0a9a4]" size={16} />
                <div>
                  <p className="font-sans text-[14.5px] font-semibold text-white">{l.titulo}</p>
                  <p className="mt-1 font-sans text-[13.5px] leading-relaxed text-[#b8cbe6]">
                    {l.detalle}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-9 max-w-[60ch] border-l-2 border-[#7fb0f5] pl-5 font-sans text-[14.5px] leading-relaxed text-[#d7e3f2]">
            Esta franqueza no es una debilidad comercial: es lo que hace que un contador pueda
            recomendarlo sin poner en riesgo su nombre.
          </p>
        </div>

        {/* Preguntas */}
        <div className="mt-20">
          <h3 className="font-serif text-[26px] font-semibold leading-snug text-[#071d42] sm:text-[30px]">
            Preguntas que conviene responder de frente
          </h3>

          <div className="mt-8 border-t border-[#e3e9f1]">
            {PREGUNTAS.map((p, i) => {
              const activa = abierta === i;
              return (
                <div key={p.pregunta} className="border-b border-[#e3e9f1]">
                  <button
                    onClick={() => setAbierta(activa ? null : i)}
                    aria-expanded={activa}
                    className="focus-ring flex w-full items-center justify-between gap-6 py-5 text-left"
                  >
                    <span className="font-serif text-[18px] leading-snug text-[#071d42] sm:text-[20px]">
                      {p.pregunta}
                    </span>
                    <FiChevronDown
                      className={cn(
                        "shrink-0 text-[#1668d6] transition-transform duration-200",
                        activa && "rotate-180"
                      )}
                      size={19}
                    />
                  </button>
                  {activa && (
                    <p className="max-w-[72ch] pb-6 font-sans text-[14.5px] leading-relaxed text-[#3f5063]">
                      {p.respuesta}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
