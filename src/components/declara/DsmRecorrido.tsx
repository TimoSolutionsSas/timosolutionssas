import { useState } from "react";
import { motion } from "framer-motion";
import { DsmAppWindow } from "./DsmAppWindow";
import {
  PantallaCruce,
  PantallaDocumentos,
  PantallaGuiaDian,
  PantallaHojaMaestra,
  PantallaMora,
  PantallaObligacion,
  PantallaResultado,
  PantallaResumen,
} from "./DsmScreens";
import { cn } from "@/utils/cn";

interface Parada {
  clave: string;
  /** Índice del paso dentro del riel de 12 pasos de la app. */
  pasoApp: number;
  titulo: string;
  /** La pregunta que esta pantalla le responde al usuario. */
  pregunta: string;
  cuerpo: string;
  pantalla: () => JSX.Element;
}

const PARADAS: Parada[] = [
  {
    clave: "obligacion",
    pasoApp: 3,
    titulo: "¿Debo declarar?",
    pregunta: "Antes de nada: ¿esto me aplica a mí?",
    cuerpo:
      "La app evalúa las seis condiciones de ley con los valores que ya extrajo de tus documentos, y te dice cuáles se cumplen y cuáles no. Sin esta respuesta, mucha gente decide no declarar y termina con una sanción que crece cada mes.",
    pantalla: PantallaObligacion,
  },
  {
    clave: "documentos",
    pasoApp: 4,
    titulo: "Documentos",
    pregunta: "Tengo 18 certificados y no sé qué número sacar de cada uno.",
    cuerpo:
      "Se suben tal como los entregaron: PDF, Excel, fotos de un escáner, archivos con contraseña. La app reconoce el tipo de documento, extrae los valores y marca su nivel de confianza. Lo que no está seguro, lo dice y pide confirmación.",
    pantalla: PantallaDocumentos,
  },
  {
    clave: "cruce",
    pasoApp: 5,
    titulo: "Cruce con la DIAN",
    pregunta: "¿Me falta algo que la DIAN ya sabe?",
    cuerpo:
      "Este es el paso que un contador hace a ojo y donde aparecen los errores silenciosos. La app compara tu información contra la exógena en las dos direcciones: lo que omitiste, lo que contaste dos veces, lo que dos fuentes reportan distinto, y lo que parece ingreso pero es un dato de control.",
    pantalla: PantallaCruce,
  },
  {
    clave: "hoja",
    pasoApp: 6,
    titulo: "Hoja maestra",
    pregunta: "¿Dónde queda registrado todo esto?",
    cuerpo:
      "Una sola tabla con cada ingreso, bien, deuda y retención, ya clasificado en su cédula. Cada fila conserva de qué documento salió — que es exactamente lo que necesitas si algún día llega un requerimiento.",
    pantalla: PantallaHojaMaestra,
  },
  {
    clave: "resultado",
    pasoApp: 7,
    titulo: "Resultado",
    pregunta: "¿Me toca pagar o me devuelven?",
    cuerpo:
      "El motor aplica la depuración completa del Estatuto: límite del artículo 336, renta exenta del 25%, exención de cesantías por tramos, deducciones con tope, renta presuntiva y ganancias ocasionales. Toda la depuración es visible gratis; la cifra final es lo único que requiere licencia.",
    pantalla: PantallaResultado,
  },
  {
    clave: "resumen",
    pasoApp: 9,
    titulo: "Semáforo final",
    pregunta: "¿Puedo presentar tranquilo?",
    cuerpo:
      "Un semáforo por módulo dice qué quedó sólido y qué quedó flojo, antes de exportar. La app nunca deja pasar una debilidad en silencio: si algo falta o no cuadra, aparece aquí con su explicación.",
    pantalla: PantallaResumen,
  },
  {
    clave: "guia",
    pasoApp: 10,
    titulo: "Guía DIAN",
    pregunta: "Ya tengo el número. ¿Y ahora qué escribo en el portal?",
    cuerpo:
      "La app no presenta por ti: te entrega el instructivo casilla por casilla del Formulario 210, con el valor que va en cada una y un botón para copiarlo. Tú presentas en el portal oficial, que es donde siempre ha estado.",
    pantalla: PantallaGuiaDian,
  },
  {
    clave: "mora",
    pasoApp: 11,
    titulo: "Mora y sanción",
    pregunta: "Se me pasó la fecha. ¿Qué tan grave es?",
    cuerpo:
      "Calcula lo que costaría ponerse al día hoy y lo que costará cada mes que siga pasando. Para quien lleva años sin declarar por miedo a la cifra, saber el número exacto es lo que destraba la decisión.",
    pantalla: PantallaMora,
  },
];

export function DsmRecorrido() {
  const [activa, setActiva] = useState(0);
  const parada = PARADAS[activa];
  const Pantalla = parada.pantalla;

  return (
    <section id="recorrido" className="bg-[#eef2f7] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mb-10 max-w-2xl">
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#071d42] sm:text-[38px]">
            Ocho momentos de una declaración, resueltos
          </h2>
          <p className="mt-4 font-sans text-[15px] leading-relaxed text-[#3f5063]">
            Cada pantalla responde una pregunta concreta que hoy deja a la gente atascada. Toca
            cualquiera para verla.
          </p>
        </div>

        {/* Selector de paradas */}
        <div
          className="-mx-5 mb-6 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0"
          role="tablist"
          aria-label="Pantallas de la aplicación"
        >
          {PARADAS.map((p, i) => (
            <button
              key={p.clave}
              role="tab"
              aria-selected={i === activa}
              onClick={() => setActiva(i)}
              className={cn(
                "focus-ring shrink-0 rounded-full px-4 py-2 font-sans text-[13px] font-medium transition-colors",
                i === activa
                  ? "bg-[#0a2a5e] text-white"
                  : "bg-white text-[#3f5063] ring-1 ring-[#d8e0e9] hover:ring-[#0a2a5e]/40"
              )}
            >
              {p.titulo}
            </button>
          ))}
        </div>

        {/* Dos decisiones para que cambiar de pantalla no mueva la página:
            1. Sin AnimatePresence: al desmontar el contenido saliente antes de
               montar el entrante, la sección colapsaba a altura cero por un
               instante. Con `key` basta para animar la entrada.
            2. overflow-anchor:none: las pantallas tienen alturas distintas y el
               anclaje de scroll de Chrome compensaba ese cambio moviendo
               scrollY cientos de píxeles, que es lo que se percibía como salto.
               Desactivado, la barra de pestañas se queda quieta y el contenido
               crece o se encoge hacia abajo. */}
        <div className="grid items-start gap-8 [overflow-anchor:none] lg:grid-cols-[minmax(0,1fr)_minmax(0,1.45fr)]">
          {/* Explicación de la parada */}
          <div className="lg:sticky lg:top-24">
            <motion.div
              key={parada.clave}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22 }}
            >
              <p className="font-serif text-[21px] italic leading-snug text-[#0a2a5e]">
                «{parada.pregunta}»
              </p>
              <div className="my-5 h-px w-14 bg-[#b9c6d4]" />
              <p className="font-sans text-[14.5px] leading-relaxed text-[#3f5063]">{parada.cuerpo}</p>
              <p className="mt-6 font-sans text-[12px] text-[#7c8b9c]">
                Pantalla {activa + 1} de {PARADAS.length} · representación ilustrativa, cifras de
                ejemplo
              </p>
            </motion.div>
          </div>

          {/* Ventana de la aplicación */}
          <motion.div
            key={parada.clave}
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.22 }}
          >
            <DsmAppWindow pasoActivo={parada.pasoApp}>
              <Pantalla />
            </DsmAppWindow>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
