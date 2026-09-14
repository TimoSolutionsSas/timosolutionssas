import {
  FiAlertTriangle,
  FiCheck,
  FiCopy,
  FiFileText,
  FiHelpCircle,
  FiLock,
  FiSearch,
  FiUploadCloud,
  FiX,
} from "react-icons/fi";
import { DsmChip, DsmScreenHead } from "./DsmAppWindow";

/**
 * Representaciones ilustrativas de las pantallas de DeclaraSinMiedo.
 * Las cifras son de ejemplo: sirven para explicar qué hace cada paso, no
 * corresponden a ningún contribuyente real.
 */

/* ─────────────────────────── 4 · ¿Debo declarar? ─────────────────────── */

const CONDICIONES = [
  { texto: "Patrimonio bruto igual o superior a 4.500 UVT", cumple: false },
  { texto: "Ingresos brutos iguales o superiores a 1.400 UVT", cumple: true },
  { texto: "Consumos con tarjeta de crédito por 1.400 UVT o más", cumple: false },
  { texto: "Compras y consumos totales por 1.400 UVT o más", cumple: false },
  { texto: "Consignaciones, depósitos o inversiones por 1.400 UVT o más", cumple: true },
  { texto: "Ser responsable de IVA al cierre del año gravable", cumple: false },
];

export function PantallaObligacion() {
  return (
    <>
      <DsmScreenHead
        titulo="Evaluemos las 6 condiciones (año gravable 2025)"
        ayuda="Basta con cumplir una sola para quedar obligado a declarar. La app las evalúa con los valores que ya extrajo de tus documentos."
      />
      <ul className="flex flex-col gap-1.5">
        {CONDICIONES.map((c) => (
          <li
            key={c.texto}
            className={`flex items-start gap-2.5 rounded-md border px-3 py-2 ${
              c.cumple ? "border-[#f0d4a8] bg-[#fdf8ef]" : "border-[#e6ecf3] bg-white"
            }`}
          >
            <span
              className={`mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full ${
                c.cumple ? "bg-[#b26a00] text-white" : "bg-[#e6ecf3] text-[#98a6b5]"
              }`}
            >
              {c.cumple ? <FiCheck size={10} strokeWidth={3} /> : <FiX size={10} strokeWidth={3} />}
            </span>
            <span className="font-sans text-[12px] leading-snug text-[#14202e]">{c.texto}</span>
            {c.cumple && (
              <span className="ml-auto">
                <DsmChip tono="aviso">Se cumple</DsmChip>
              </span>
            )}
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-start gap-3 rounded-md border-l-[3px] border-[#1668d6] bg-[#e8f0fb] px-3.5 py-3">
        <FiHelpCircle className="mt-0.5 shrink-0 text-[#1668d6]" size={15} />
        <p className="font-sans text-[12px] leading-relaxed text-[#0a2a5e]">
          <strong className="font-semibold">Sí estás obligada a declarar</strong> por 2 de las 6
          condiciones. Esto no significa que vayas a pagar: muchas declaraciones terminan en ceros o
          con saldo a favor.
        </p>
      </div>
    </>
  );
}

/* ─────────────────────────── 5 · Documentos ──────────────────────────── */

const DOCUMENTOS = [
  { nombre: "Certificado bancario — Bancolombia.pdf", tipo: "Certificado bancario", valores: 4, confianza: "alta" },
  { nombre: "Ingresos y retenciones 2025 (F-220).pdf", tipo: "Certificado del empleador", valores: 9, confianza: "alta" },
  { nombre: "Exógena_2025.xlsx", tipo: "Información exógena DIAN", valores: 37, confianza: "alta" },
  { nombre: "Certificado fondo de pensiones.pdf", tipo: "Certificado de fondo", valores: 3, confianza: "media" },
  { nombre: "Retención honorarios — escaneado.jpg", tipo: "Retención de terceros · OCR", valores: 2, confianza: "revisar" },
  { nombre: "Declaración renta 2024.pdf", tipo: "Declaración año anterior", valores: 6, confianza: "alta" },
] as const;

export function PantallaDocumentos() {
  return (
    <>
      <DsmScreenHead
        titulo="Sube tus documentos y deja que la app proponga los datos"
        ayuda="Súbelos tal como te los entregaron. La app reconoce el tipo de documento y extrae los valores que importan."
      />
      <div className="mb-3 flex flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-[#b9c6d4] bg-[#f7f9fc] py-5">
        <FiUploadCloud className="text-[#1668d6]" size={22} />
        <p className="font-sans text-[12px] font-medium text-[#14202e]">
          Arrastra aquí tus certificados
        </p>
        <p className="font-sans text-[11px] text-[#7c8b9c]">
          PDF, Excel, imágenes escaneadas · también PDF con contraseña
        </p>
      </div>

      <div className="overflow-hidden rounded-md border border-[#e6ecf3]">
        {DOCUMENTOS.map((d, i) => (
          <div
            key={d.nombre}
            className={`flex items-center gap-3 px-3 py-2 ${i % 2 === 1 ? "bg-[#f9fbfd]" : "bg-white"}`}
          >
            <FiFileText className="shrink-0 text-[#7c8b9c]" size={14} />
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-[11.5px] font-medium text-[#14202e]">{d.nombre}</p>
              <p className="font-sans text-[10.5px] text-[#7c8b9c]">
                {d.tipo} · {d.valores} valores extraídos
              </p>
            </div>
            {d.confianza === "alta" && <DsmChip tono="ok">Confianza alta</DsmChip>}
            {d.confianza === "media" && <DsmChip tono="info">Confirmar 1 dato</DsmChip>}
            {d.confianza === "revisar" && <DsmChip tono="aviso">Revisar</DsmChip>}
          </div>
        ))}
      </div>

      <p className="mt-3 font-sans text-[11px] leading-relaxed text-[#55636f]">
        Ningún valor entra al cálculo sin que lo confirmes. Cada cifra queda vinculada al documento
        del que salió.
      </p>
    </>
  );
}

/* ─────────────────────────── 6 · Cruce con exógena ───────────────────── */

const HALLAZGOS = [
  {
    tono: "riesgo" as const,
    etiqueta: "Falta declarar",
    titulo: "Rendimientos financieros reportados que no están en tu hoja",
    detalle:
      "Davivienda reportó $1.284.600 en rendimientos que no aparecen en ningún certificado que subiste.",
    accion: "Agregar a la hoja maestra",
  },
  {
    tono: "aviso" as const,
    etiqueta: "Posible duplicado",
    titulo: "El mismo ingreso aparece en dos documentos",
    detalle:
      "«BANCOLOMBIA S.A.» y «Bancolombia» son la misma entidad (mismo NIT). Estás contando $3.400.000 dos veces.",
    accion: "Dejar solo uno",
  },
  {
    tono: "aviso" as const,
    etiqueta: "Valores distintos",
    titulo: "Dos fuentes reportan cifras diferentes del mismo ingreso",
    detalle:
      "El certificado dice $18.240.000 y la exógena $18.244.000. Prevalece el certificado del pagador; la diferencia es redondeo.",
    accion: "Usar el certificado",
  },
  {
    tono: "riesgo" as const,
    etiqueta: "Otro año gravable",
    titulo: "Este certificado corresponde a 2024, no a 2025",
    detalle: "El documento trae la vigencia del año anterior. Incluirlo desajusta toda la declaración.",
    accion: "Excluir del cálculo",
  },
  {
    tono: "info" as const,
    etiqueta: "Dato de control",
    titulo: "«Movimientos en cuentas: $66.740.241» no es patrimonio",
    detalle:
      "Es el volumen de movimientos del año, no un saldo. Tomarlo como patrimonio lo inflaría en 66 millones.",
    accion: "Entendido, no declarar",
  },
];

export function PantallaCruce() {
  return (
    <>
      <DsmScreenHead
        titulo="Esto es lo que encontramos al cruzar con la DIAN"
        ayuda="La app compara en las dos direcciones: lo que tú declaraste contra lo que los terceros le reportaron a la DIAN."
      />
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <DsmChip tono="riesgo">2 omisiones</DsmChip>
        <DsmChip tono="aviso">2 por revisar</DsmChip>
        <DsmChip tono="info">1 aclaración</DsmChip>
        <span className="ml-auto font-sans text-[10.5px] text-[#7c8b9c]">37 renglones de exógena leídos</span>
      </div>
      <div className="flex flex-col gap-2">
        {HALLAZGOS.map((h) => (
          <div key={h.titulo} className="rounded-md border border-[#e6ecf3] bg-white p-3">
            <div className="mb-1.5 flex items-center gap-2">
              <DsmChip tono={h.tono}>{h.etiqueta}</DsmChip>
              <p className="font-sans text-[11.5px] font-semibold text-[#14202e]">{h.titulo}</p>
            </div>
            <p className="font-sans text-[11px] leading-relaxed text-[#55636f]">{h.detalle}</p>
            <button className="mt-2 rounded border border-[#1668d6] px-2.5 py-1 font-sans text-[10.5px] font-semibold text-[#1668d6]">
              {h.accion}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

/* ─────────────────────────── 7 · Hoja maestra ────────────────────────── */

const PARTIDAS = [
  { concepto: "Salarios — Grupo Éxito S.A.", cedula: "Rentas de trabajo", valor: "18.240.000", origen: "F-220" },
  { concepto: "Honorarios — Consultoría independiente", cedula: "Rentas de trabajo", valor: "6.800.000", origen: "Certificado" },
  { concepto: "Rendimientos financieros", cedula: "Rentas de capital", valor: "1.284.600", origen: "Exógena" },
  { concepto: "Arrendamiento apartamento", cedula: "Rentas de capital", valor: "9.600.000", origen: "Manual" },
  { concepto: "Aportes obligatorios a salud y pensión", cedula: "Ingreso no constitutivo", valor: "−2.188.800", origen: "F-220" },
  { concepto: "Apartamento (avalúo catastral)", cedula: "Patrimonio", valor: "148.000.000", origen: "Manual" },
  { concepto: "Saldo cuenta de ahorros", cedula: "Patrimonio", valor: "7.412.300", origen: "Certificado" },
];

export function PantallaHojaMaestra() {
  return (
    <>
      <DsmScreenHead
        titulo="Registra cada ingreso, bien, deuda o retención"
        ayuda="Una sola tabla con todo lo tuyo. Cada fila sabe de qué documento salió y a qué cédula pertenece."
      />
      <div className="overflow-x-auto rounded-md border border-[#e6ecf3]">
        <table className="w-full border-collapse font-sans text-[11px]">
          <thead>
            <tr className="bg-[#f4f6fa] text-left text-[10px] font-semibold text-[#55636f]">
              <th className="px-3 py-2">Concepto</th>
              <th className="px-3 py-2">Cédula</th>
              <th className="px-3 py-2 text-right">Valor</th>
              <th className="px-3 py-2">Origen</th>
            </tr>
          </thead>
          <tbody>
            {PARTIDAS.map((p, i) => (
              <tr key={p.concepto} className={i % 2 === 1 ? "bg-[#f9fbfd]" : "bg-white"}>
                <td className="px-3 py-2 text-[#14202e]">{p.concepto}</td>
                <td className="px-3 py-2 text-[#55636f]">{p.cedula}</td>
                <td className="px-3 py-2 text-right font-medium tabular-nums text-[#14202e]">
                  ${p.valor}
                </td>
                <td className="px-3 py-2">
                  <span className="rounded bg-[#eef2f6] px-1.5 py-0.5 text-[9.5px] text-[#55636f]">
                    {p.origen}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-3 flex items-start gap-2.5 rounded-md bg-[#e6f5ef] px-3 py-2.5">
        <FiSearch className="mt-0.5 shrink-0 text-[#0e7a56]" size={13} />
        <p className="font-sans text-[11px] leading-relaxed text-[#0a4a37]">
          Cada partida conserva su trazabilidad. Si algún día llega un requerimiento, puedes mostrar
          exactamente de dónde salió cada cifra.
        </p>
      </div>
    </>
  );
}

/* ─────────────────────────── 8 · Resultado (paywall) ─────────────────── */

export function PantallaResultado() {
  return (
    <>
      <DsmScreenHead
        titulo="Resultado de tu declaración"
        ayuda="Toda la depuración por cédulas está hecha y visible. El resultado final es lo único que requiere licencia."
      />
      <div className="mb-3 overflow-hidden rounded-md border border-[#e6ecf3]">
        {[
          ["Renta líquida cedular — trabajo", "21.132.480"],
          ["Renta líquida cedular — capital", "9.483.410"],
          ["Límite del artículo 336 aplicado", "−7.984.200"],
          ["Renta exenta 25% (art. 206)", "−5.283.120"],
          ["Renta líquida gravable", "17.348.570"],
        ].map(([label, valor], i) => (
          <div
            key={label}
            className={`flex items-center justify-between px-3 py-2 font-sans text-[11.5px] ${
              i % 2 === 1 ? "bg-[#f9fbfd]" : "bg-white"
            }`}
          >
            <span className="text-[#55636f]">{label}</span>
            <span className="font-medium tabular-nums text-[#14202e]">${valor}</span>
          </div>
        ))}
      </div>

      {/* Estado de versión gratuita */}
      <div className="relative overflow-hidden rounded-md border border-[#c9d6e6] bg-[#f4f6fa] px-4 py-5 text-center">
        <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#0a2a5e]">
          <FiLock className="text-white" size={15} />
        </div>
        <p className="font-sans text-[12px] font-semibold text-[#0a2a5e]">
          Impuesto a cargo o saldo a favor
        </p>
        <p className="mx-auto mt-1 max-w-sm font-sans text-[11px] leading-relaxed text-[#55636f]">
          Ya comprobaste con tus propios documentos que la app leyó tus certificados, entendió tu
          exógena y te encontró lo que faltaba. El resultado se entrega al activar la licencia — el
          trabajo que ya hiciste no se pierde.
        </p>
        <button className="mt-3 rounded-md bg-[#1668d6] px-4 py-1.5 font-sans text-[11px] font-semibold text-white">
          Activar licencia
        </button>
      </div>
    </>
  );
}

/* ─────────────────────────── 9 · Resumen final ───────────────────────── */

const MODULOS = [
  { modulo: "Documentos leídos", estado: "ok" as const, nota: "6 de 6 procesados" },
  { modulo: "Cruce con exógena", estado: "ok" as const, nota: "Sin omisiones pendientes" },
  { modulo: "Cédulas y topes", estado: "ok" as const, nota: "Art. 336 y 206 aplicados" },
  { modulo: "Patrimonio", estado: "aviso" as const, nota: "Falta el avalúo del vehículo" },
  { modulo: "Retenciones", estado: "ok" as const, nota: "Cuadran con la exógena" },
  { modulo: "Conciliación patrimonial", estado: "aviso" as const, nota: "Variación por explicar: $4.100.000" },
];

export function PantallaResumen() {
  return (
    <>
      <DsmScreenHead
        titulo="Esto es lo que encontramos — revísalo antes de exportar"
        ayuda="Un semáforo por módulo: qué está sólido y qué está flojo. La app no te deja llegar al final sin saberlo."
      />
      <div className="grid gap-2 sm:grid-cols-2">
        {MODULOS.map((m) => (
          <div
            key={m.modulo}
            className="flex items-center gap-2.5 rounded-md border border-[#e6ecf3] bg-white px-3 py-2.5"
          >
            <span
              className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                m.estado === "ok" ? "bg-[#0e7a56]" : "bg-[#b26a00]"
              }`}
            />
            <div className="min-w-0">
              <p className="font-sans text-[11.5px] font-semibold text-[#14202e]">{m.modulo}</p>
              <p className="truncate font-sans text-[10.5px] text-[#7c8b9c]">{m.nota}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-3 flex items-start gap-2.5 rounded-md border-l-[3px] border-[#b26a00] bg-[#fdf3e3] px-3.5 py-3">
        <FiAlertTriangle className="mt-0.5 shrink-0 text-[#b26a00]" size={14} />
        <p className="font-sans text-[11px] leading-relaxed text-[#5c3d00]">
          Dos módulos en ámbar. Ninguno impide presentar, pero conviene resolverlos: la conciliación
          patrimonial es justamente lo que la DIAN revisa cuando el patrimonio sube más de lo que la
          renta del año explica.
        </p>
      </div>
    </>
  );
}

/* ─────────────────────────── 10 · Guía DIAN ──────────────────────────── */

const CASILLAS = [
  { n: "36", nombre: "Ingresos brutos por rentas de trabajo", valor: "25.040.000" },
  { n: "38", nombre: "Ingresos no constitutivos de renta", valor: "2.188.800" },
  { n: "40", nombre: "Rentas exentas y deducciones imputables", valor: "13.267.320" },
  { n: "43", nombre: "Renta líquida cedular de trabajo", valor: "21.132.480" },
  { n: "58", nombre: "Renta líquida gravable", valor: "17.348.570" },
  { n: "89", nombre: "Total retenciones año gravable", valor: "1.906.400" },
];

export function PantallaGuiaDian() {
  return (
    <>
      <DsmScreenHead
        titulo="Qué escribir en cada casilla del Formulario 210"
        ayuda="La app no presenta por ti: te dice exactamente qué número va en cada casilla del portal de la DIAN."
      />
      <div className="overflow-hidden rounded-md border border-[#e6ecf3]">
        {CASILLAS.map((c, i) => (
          <div
            key={c.n}
            className={`flex items-center gap-3 px-3 py-2.5 ${i % 2 === 1 ? "bg-[#f9fbfd]" : "bg-white"}`}
          >
            <span className="flex h-6 w-8 shrink-0 items-center justify-center rounded bg-[#0a2a5e] font-sans text-[10.5px] font-bold tabular-nums text-white">
              {c.n}
            </span>
            <p className="min-w-0 flex-1 truncate font-sans text-[11.5px] text-[#14202e]">{c.nombre}</p>
            <span className="font-sans text-[11.5px] font-semibold tabular-nums text-[#14202e]">
              ${c.valor}
            </span>
            <FiCopy className="shrink-0 text-[#7c8b9c]" size={13} />
          </div>
        ))}
      </div>
      <p className="mt-3 font-sans text-[11px] leading-relaxed text-[#55636f]">
        Cada casilla se copia con un clic. El formulario se diligencia en el portal oficial de la
        DIAN, donde siempre ha estado — la app prepara, tú presentas.
      </p>
    </>
  );
}

/* ─────────────────────────── 11 · Mora y sanción ─────────────────────── */

export function PantallaMora() {
  return (
    <>
      <DsmScreenHead
        titulo="¿Se te pasó la fecha? Cuánto costaría ponerte al día"
        ayuda="Si ya venció tu plazo, la sanción crece cada mes que pasa. Aquí ves el costo real de seguir esperando."
      />
      <div className="mb-3 grid gap-2 sm:grid-cols-3">
        {[
          { label: "Meses de mora", valor: "3", tono: "text-[#b26a00]" },
          { label: "Sanción estimada", valor: "$1.240.000", tono: "text-[#b3261e]" },
          { label: "Intereses de mora", valor: "$186.400", tono: "text-[#b3261e]" },
        ].map((k) => (
          <div key={k.label} className="rounded-md border border-[#e6ecf3] bg-[#f9fbfd] px-3 py-2.5">
            <p className="font-sans text-[10.5px] text-[#7c8b9c]">{k.label}</p>
            <p className={`font-sans text-[17px] font-bold tabular-nums ${k.tono}`}>{k.valor}</p>
          </div>
        ))}
      </div>
      <div className="rounded-md border border-[#e6ecf3] bg-white p-3">
        <p className="mb-2 font-sans text-[11px] font-semibold text-[#14202e]">
          Lo que cuesta cada mes que sigues esperando
        </p>
        <div className="flex items-end gap-1.5">
          {[28, 42, 56, 70, 84, 100].map((alto, i) => (
            <div key={alto} className="flex flex-1 flex-col items-center gap-1">
              <div
                className={`w-full rounded-t ${i < 3 ? "bg-[#b26a00]" : "bg-[#f0d4a8]"}`}
                style={{ height: `${alto * 0.5}px` }}
              />
              <span className="font-sans text-[9px] text-[#7c8b9c]">M{i + 1}</span>
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 font-sans text-[11px] leading-relaxed text-[#55636f]">
        La sanción por extemporaneidad no se congela: crece por cada mes o fracción de mes de
        retraso. Saber el número exacto es lo que permite decidir con cabeza fría.
      </p>
    </>
  );
}
