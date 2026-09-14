import { FiCheck, FiLock } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl } from "@/config/site";
import { ACTIVACION, VERSION_GRATUITA, VERSIONES } from "./dsmData";
import { cn } from "@/utils/cn";

export function DsmPrecios() {
  return (
    <section id="precios" className="bg-[#eef2f7] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* La política de la versión gratuita, primero: es el argumento más fuerte */}
        <h2 className="max-w-[26ch] font-serif text-3xl font-semibold leading-tight text-[#071d42] sm:text-[38px]">
          Compruébalo con tus propios documentos antes de pagar nada
        </h2>
        <p className="mt-4 max-w-[64ch] font-sans text-[15.5px] leading-relaxed text-[#3f5063]">
          Cualquiera puede descargar DeclaraSinMiedo y usarlo sin pagar, sin registro y sin límite de
          tiempo. Lo único reservado es el resultado que viniste a buscar — porque una prueba que no
          deja ver nada no convence a nadie, y una que lo entrega todo no deja razón para pagar.
        </p>

        <div className="mt-10 grid gap-px overflow-hidden rounded-lg bg-[#d8e0e9] md:grid-cols-2">
          <div className="bg-white p-6 sm:p-8">
            <h3 className="font-sans text-[14px] font-semibold text-[#0e7a56]">
              Gratis, con tus documentos reales
            </h3>
            <ul className="mt-5 flex flex-col gap-3">
              {VERSION_GRATUITA.incluido.map((t) => (
                <li key={t} className="flex gap-3 font-sans text-[13.5px] leading-relaxed text-[#3f5063]">
                  <FiCheck className="mt-0.5 shrink-0 text-[#0e7a56]" size={15} strokeWidth={2.5} />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-[#f9fbfd] p-6 sm:p-8">
            <h3 className="font-sans text-[14px] font-semibold text-[#0a2a5e]">Requiere licencia</h3>
            <ul className="mt-5 flex flex-col gap-3">
              {VERSION_GRATUITA.conLicencia.map((t) => (
                <li key={t} className="flex gap-3 font-sans text-[13.5px] leading-relaxed text-[#3f5063]">
                  <FiLock className="mt-0.5 shrink-0 text-[#7c8b9c]" size={14} />
                  {t}
                </li>
              ))}
            </ul>
            <p className="mt-6 border-t border-[#e3e9f1] pt-4 font-sans text-[12.5px] leading-relaxed text-[#7c8b9c]">
              El trabajo que ya hiciste no se pierde: al activar la licencia, el resultado aparece de
              inmediato sobre lo que ya construiste.
            </p>
          </div>
        </div>

        {/* Las dos versiones */}
        <h3 className="mt-20 font-serif text-[26px] font-semibold leading-snug text-[#071d42] sm:text-[30px]">
          Pago único, sin suscripción y sin cobro por declaración
        </h3>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {VERSIONES.map((v) => (
            <div
              key={v.nombre}
              className={cn(
                "flex flex-col rounded-lg p-7 sm:p-8",
                v.destacada ? "bg-[#0a2a5e] text-white" : "bg-white ring-1 ring-[#d8e0e9]"
              )}
            >
              <h4
                className={cn(
                  "font-sans text-[14px] font-semibold",
                  v.destacada ? "text-[#7fb0f5]" : "text-[#1668d6]"
                )}
              >
                {v.nombre}
              </h4>
              <p
                className={cn(
                  "mt-3 font-serif text-[40px] font-semibold leading-none tabular-nums",
                  v.destacada ? "text-white" : "text-[#071d42]"
                )}
              >
                {v.precio}
              </p>
              <p
                className={cn(
                  "mt-2 font-sans text-[13px]",
                  v.destacada ? "text-[#b8cbe6]" : "text-[#55636f]"
                )}
              >
                {v.vigencia} · {v.porAno}
              </p>

              <p
                className={cn(
                  "mt-5 font-sans text-[14px] leading-relaxed",
                  v.destacada ? "text-[#d7e3f2]" : "text-[#3f5063]"
                )}
              >
                {v.paraQuien}
              </p>
              <p
                className={cn(
                  "mt-2 font-sans text-[13px] leading-relaxed",
                  v.destacada ? "text-[#b8cbe6]" : "text-[#55636f]"
                )}
              >
                {v.alcance}
              </p>

              <ul className="mt-6 flex flex-1 flex-col gap-2.5">
                {v.extras.map((e) => (
                  <li
                    key={e}
                    className={cn(
                      "flex gap-2.5 font-sans text-[13px] leading-relaxed",
                      v.destacada ? "text-[#d7e3f2]" : "text-[#55636f]"
                    )}
                  >
                    <FiCheck
                      className={cn("mt-0.5 shrink-0", v.destacada ? "text-[#7fe0bb]" : "text-[#0e7a56]")}
                      size={14}
                      strokeWidth={2.5}
                    />
                    {e}
                  </li>
                ))}
              </ul>

              <a
                href={buildWhatsAppUrl(
                  `Hola, quiero información sobre la licencia ${v.nombre} de DeclaraSinMiedo (${v.precio} COP, ${v.vigencia}). ¿Me ayudan con el proceso de compra y activación?`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "focus-ring mt-7 inline-flex items-center justify-center gap-2.5 rounded-md px-5 py-3 font-sans text-[14px] font-semibold transition-colors",
                  v.destacada
                    ? "bg-white text-[#0a2a5e] hover:bg-[#dce8f8]"
                    : "bg-[#0a2a5e] text-white hover:bg-[#071d42]"
                )}
              >
                <FaWhatsapp size={16} />
                Consultar licencia {v.nombre}
              </a>
            </div>
          ))}
        </div>

        {/* Comparación de precio, en prosa */}
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <p className="max-w-[52ch] border-l-2 border-[#1668d6] pl-5 font-sans text-[14.5px] leading-relaxed text-[#3f5063]">
            Encargarle la declaración a un tercero cuesta entre $150.000 y $400.000{" "}
            <strong className="font-semibold text-[#071d42]">cada año</strong>. La licencia Personal
            cuesta $100.000 <strong className="font-semibold text-[#071d42]">una vez</strong> y cubre
            tres años — y además te deja entendiendo tu propia declaración.
          </p>
          <p className="max-w-[52ch] border-l-2 border-[#0e7a56] pl-5 font-sans text-[14.5px] leading-relaxed text-[#3f5063]">
            Para un contador, el retorno de la versión Profesional no está en el ahorro por
            declaración sino en la{" "}
            <strong className="font-semibold text-[#071d42]">capacidad</strong>: atender más clientes
            en la misma ventana de tiempo, o dedicar el tiempo liberado a revisar mejor los que ya
            tiene.
          </p>
        </div>

        {/* Activación */}
        <h3 className="mt-20 font-serif text-[24px] font-semibold leading-snug text-[#071d42] sm:text-[28px]">
          Cómo se compra y se activa
        </h3>
        <ol className="mt-7 grid gap-x-8 gap-y-5 sm:grid-cols-2 lg:grid-cols-5">
          {ACTIVACION.map((a, i) => (
            <li key={a.paso} className="border-t-2 border-[#0a2a5e] pt-4">
              <p className="font-sans text-[12px] tabular-nums text-[#7c8b9c]">Paso {i + 1}</p>
              <p className="mt-1 font-sans text-[14px] font-semibold text-[#14202e]">{a.paso}</p>
              <p className="mt-1.5 font-sans text-[13px] leading-relaxed text-[#55636f]">{a.que}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
