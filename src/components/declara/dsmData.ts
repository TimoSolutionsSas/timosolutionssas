/**
 * Contenido de la página de DeclaraSinMiedo.
 *
 * Todas las cifras, tablas y afirmaciones vienen de la documentación
 * comercial del producto (docs/comercial, documentos 01 a 03) y del flujo
 * real de pantallas de la aplicación. No hay datos inventados aquí: si algo
 * no está en la documentación, no está en esta página.
 */

export interface MiedoCiudadano {
  situacion: string;
  siente: string;
  riesgo: string;
}

/** Documento 01 · Parte 1 — lo que le pasa a una persona normal. */
export const MIEDOS_CIUDADANO: MiedoCiudadano[] = [
  {
    situacion: "Le llegan 10, 15 o 20 certificados de bancos, empleadores y fondos, cada uno con formato distinto.",
    siente: "No sé cuáles sirven ni qué número sacar de cada uno.",
    riesgo: "Omitir un ingreso que la DIAN ya conoce, o declarar dos veces el mismo por venir en dos documentos.",
  },
  {
    situacion: "Descarga su información exógena y ve decenas de renglones con lenguaje técnico.",
    siente: "Esto está en otro idioma. ¿Qué hago con esto?",
    riesgo: "Ignorarla por completo — que es justamente lo que la DIAN va a cruzar contra su declaración.",
  },
  {
    situacion: "Ve cifras enormes: «movimientos en cuentas: $66.740.241».",
    siente: "¿Yo tuve eso? ¿Debo declararlo?",
    riesgo: "Confundir el volumen de movimientos del año con un saldo, e inflar su patrimonio.",
  },
  {
    situacion: "No sabe si le toca declarar o no.",
    siente: "Mejor no declaro, a ver si no me dicen nada.",
    riesgo: "Sanción por extemporaneidad, que crece cada mes que pasa.",
  },
  {
    situacion: "Paga a alguien que «sabe» y le entrega un número sin explicación.",
    siente: "Confío, pero no entendí nada.",
    riesgo: "La responsabilidad legal ante la DIAN sigue siendo suya, no de quien le ayudó.",
  },
];

export interface EtapaContador {
  etapa: string;
  aMano: string;
  minutos: string;
  /** Peso relativo para la barra de tiempo (minutos máximos). */
  max: number;
}

/** Documento 01 · Parte 2 — en qué se le va el tiempo a un contador. */
export const ETAPAS_CONTADOR: EtapaContador[] = [
  {
    etapa: "Recibir y ordenar documentos",
    aMano: "Perseguir al cliente por WhatsApp, recibir fotos borrosas y PDF con contraseña, renombrar y ordenar.",
    minutos: "30–60 min",
    max: 60,
  },
  {
    etapa: "Leer cada certificado",
    aMano: "Abrir uno por uno, ubicar la cifra correcta entre varias parecidas, transcribirla a Excel.",
    minutos: "45–90 min",
    max: 90,
  },
  {
    etapa: "Procesar la información exógena",
    aMano: "Interpretar renglón por renglón y decidir qué es ingreso, patrimonio o dato de control.",
    minutos: "40–80 min",
    max: 80,
  },
  {
    etapa: "Cruzar documentos contra exógena",
    aMano: "Comparar a ojo si lo que reportó el banco coincide con el certificado, buscar duplicados.",
    minutos: "30–60 min",
    max: 60,
  },
  {
    etapa: "Depurar cédulas y aplicar topes",
    aMano: "Clasificar cada ingreso, aplicar límites del art. 336, calcular rentas exentas.",
    minutos: "40–70 min",
    max: 70,
  },
  {
    etapa: "Explicarle al cliente",
    aMano: "Traducir el resultado a lenguaje entendible y responder «¿por qué me da esto?».",
    minutos: "20–40 min",
    max: 40,
  },
];

/** Documento 01 · Parte 3 — el reparto del trabajo. */
export const REPARTO_TRABAJO = {
  mecanico: [
    "Leer certificados de bancos, empleadores y fondos, y sacar la cifra correcta de cada uno.",
    "Interpretar la información exógena renglón por renglón.",
    "Cruzar documentos contra exógena y detectar lo que falta o se repite.",
    "Clasificar cada ingreso en su cédula y aplicar los topes de ley.",
    "Hacer las cuentas sin equivocarse en un dígito.",
  ],
  criterio: [
    "Si una situación patrimonial inusual amerita asesoría especializada.",
    "Cómo tratar una herencia, una venta de inmueble o un activo en el exterior.",
    "Si un gasto específico cumple los requisitos para ser deducible.",
    "La estrategia tributaria de un contribuyente con estructura compleja.",
    "La revisión final y la firma cuando la ley la exige.",
  ],
};

export interface Pilar {
  titulo: string;
  resumen: string;
  detalle: string[];
}

/** Documento 02 — los cuatro pilares del producto. */
export const PILARES: Pilar[] = [
  {
    titulo: "Lee los documentos por ti",
    resumen:
      "El usuario sube sus certificados tal como se los entregaron. La app identifica de qué documento se trata y extrae los valores que importan, cada uno con su nivel de confianza.",
    detalle: [
      "Certificados bancarios y de fondos: saldos, rendimientos, retenciones, GMF.",
      "Certificado de ingresos y retenciones del empleador (Formulario 220).",
      "Certificados de retención de terceros, con lectura flexible para formatos diversos.",
      "Información exógena de la DIAN, el archivo completo renglón por renglón.",
      "La declaración del año anterior, de la que extrae lo que el cálculo actual necesita.",
      "Documentos escaneados, con reconocimiento óptico cuando el PDF no trae texto.",
    ],
  },
  {
    titulo: "Cruza contra lo que la DIAN ya sabe",
    resumen:
      "El corazón del producto, y lo que hoy un contador hace a ojo: comparar en las dos direcciones lo que el usuario declaró contra lo que los terceros reportaron.",
    detalle: [
      "Ingresos, cuentas o retenciones que la DIAN conoce y no están en la declaración.",
      "El mismo hecho contado dos veces por venir en dos documentos distintos.",
      "La misma entidad con nombre comercial y razón social distintos.",
      "Dos fuentes que reportan valores distintos del mismo ingreso.",
      "Documentos que corresponden a otro año gravable.",
      "Renglones que parecen ingresos pero son datos de control.",
    ],
  },
  {
    titulo: "Calcula con el rigor del Estatuto Tributario",
    resumen:
      "Depuración completa de la cédula general y las demás cédulas, con sus topes y beneficios, hasta la liquidación final con retenciones, anticipos y saldos del año anterior.",
    detalle: [
      "Límite global del artículo 336 y renta exenta del 25%.",
      "Exención de cesantías por rangos salariales del artículo 206.",
      "Aportes voluntarios con su tope propio y deducciones con límite individual.",
      "Descuento por compras con factura electrónica y dependientes.",
      "Renta presuntiva y ganancias ocasionales con tarifas y exenciones diferenciadas.",
      "Los parámetros (UVT, topes, tarifas) viven en un archivo firmado criptográficamente, fuera del programa.",
    ],
  },
  {
    titulo: "Nunca decide en silencio",
    resumen:
      "Cuando el sistema no está seguro, lo dice. Cuando propone algo, explica por qué. Y cuando la decisión depende de un hecho que solo el usuario conoce, se la deja a él.",
    detalle: [
      "Ningún valor entra al cálculo sin que una persona lo haya confirmado.",
      "Cada advertencia dice qué revisar y por qué.",
      "Un semáforo por módulo muestra qué está sólido y qué está flojo antes de presentar.",
      "Cada valor extraído queda vinculado al documento del que salió.",
      "El usuario siempre puede responder «¿de dónde salió este número?».",
    ],
  },
];

export interface DeteccionCruce {
  detecta: string;
  importa: string;
  tono: "riesgo" | "duplicado" | "criterio";
}

/** Documento 02 — qué detecta el cruce con exógena. */
export const DETECCIONES: DeteccionCruce[] = [
  {
    detecta: "Ingresos, cuentas o retenciones que la DIAN conoce y no están en la declaración.",
    importa: "Es la omisión que después genera un requerimiento.",
    tono: "riesgo",
  },
  {
    detecta: "El mismo hecho contado dos veces por venir en dos documentos distintos.",
    importa: "Duplicar un ingreso hace pagar impuesto que no corresponde.",
    tono: "duplicado",
  },
  {
    detecta: "La misma entidad con nombre comercial y razón social distintos.",
    importa: "Reconoce que son la misma empresa aunque el nombre no coincida en absoluto.",
    tono: "criterio",
  },
  {
    detecta: "Dos fuentes que reportan valores distintos del mismo ingreso.",
    importa: "Indica cuál usar según la regla legal, y explica por qué difieren.",
    tono: "criterio",
  },
  {
    detecta: "Documentos que corresponden a otro año gravable.",
    importa: "Algunos certificados traen la vigencia del año siguiente; usarlos es un error silencioso.",
    tono: "riesgo",
  },
  {
    detecta: "Renglones que parecen ingresos pero son datos de control.",
    importa: "Confundir el volumen de movimientos de una cuenta con su saldo infla el patrimonio.",
    tono: "riesgo",
  },
];

/** Documento 02 — privacidad y seguridad por diseño. */
export const SEGURIDAD = [
  {
    caracteristica: "Funciona 100% local, sin nube",
    significa: "Los datos tributarios nunca salen del computador. No hay servidor que pueda ser vulnerado ni empresa que pueda venderlos.",
  },
  {
    caracteristica: "Expediente cifrado con clave maestra",
    significa: "Sin la clave, el archivo es ilegible incluso teniendo el equipo. Ni el fabricante puede abrirlo.",
  },
  {
    caracteristica: "Frase de recuperación de 12 palabras",
    significa: "Si olvida la clave, no pierde el trabajo — pero sigue siendo el único que puede acceder.",
  },
  {
    caracteristica: "Verificación de integridad del ejecutable",
    significa: "La aplicación detecta si su propio código fue alterado por un tercero.",
  },
  {
    caracteristica: "Licencia atada al equipo",
    significa: "Cada licencia se activa en el computador para el que fue emitida.",
  },
  {
    caracteristica: "Auditoría de seguridad y de dependencias",
    significa: "Sometido a revisión de vulnerabilidades y verificado sin detecciones de malware.",
  },
];

/** Documento 03 — qué incluye la versión gratuita y qué requiere licencia. */
export const VERSION_GRATUITA = {
  incluido: [
    "Subir todos sus documentos y que la app los lea y extraiga los valores.",
    "Cargar su información exógena completa y verla interpretada renglón por renglón.",
    "El cruce completo: qué le falta declarar, qué está repetido, qué no coincide.",
    "Construir su hoja maestra con todas sus partidas.",
    "El semáforo de riesgo y todos los hallazgos y advertencias.",
    "La depuración por cédulas y los avisos de lo que debe corregir.",
  ],
  conLicencia: [
    "Ver el resultado final: impuesto a cargo o saldo a favor.",
    "El desglose paso a paso de cómo se llegó a esa cifra.",
    "El reporte final en PDF y la hoja maestra en Excel.",
    "El instructivo para presentar la declaración en el portal de la DIAN.",
    "La conciliación patrimonial.",
  ],
};

export interface Version {
  nombre: string;
  precio: string;
  vigencia: string;
  porAno: string;
  paraQuien: string;
  alcance: string;
  extras: string[];
  destacada: boolean;
}

/** Documento 03 — las dos versiones. */
export const VERSIONES: Version[] = [
  {
    nombre: "Personal",
    precio: "$100.000",
    vigencia: "3 años de vigencia",
    porAno: "≈ $33.300 por año",
    paraQuien: "Una persona natural que declara su propia renta.",
    alcance: "Las declaraciones del titular de la licencia.",
    extras: [
      "Extracción de documentos completa",
      "Cruce con exógena completo",
      "Motor de cálculo completo",
      "Resumen final y exportables",
      "Instructivo para presentar ante la DIAN",
      "Parámetros actualizados cada año gravable",
    ],
    destacada: false,
  },
  {
    nombre: "Profesional",
    precio: "$1.500.000",
    vigencia: "4 años de vigencia",
    porAno: "≈ $375.000 por año",
    paraQuien: "Contadores, asesores tributarios y quien deba declarar por varias personas.",
    alcance: "Múltiples contribuyentes, cada uno en su propio expediente cifrado e independiente.",
    extras: [
      "Todo lo de la versión Personal",
      "Expedientes independientes por persona",
      "Sin el límite de declaraciones de la versión Personal",
      "Personalización con logo propio en los reportes",
      "Parámetros actualizados cada año gravable",
    ],
    destacada: true,
  },
];

/** Documento 02 — los límites declarados dentro de la propia aplicación. */
export const LIMITES = [
  {
    titulo: "No presenta la declaración ante la DIAN",
    detalle: "Prepara todo para que la persona la presente en el portal oficial.",
  },
  {
    titulo: "No reemplaza a un contador en casos complejos",
    detalle: "Negocios, activos en el exterior, herencias, venta de inmuebles. En esos casos, lo recomienda.",
  },
  {
    titulo: "No asume la responsabilidad legal",
    detalle: "La responsabilidad de la declaración es, por ley, del contribuyente.",
  },
  {
    titulo: "No inventa cifras",
    detalle: "Si un dato no está en ningún documento, lo pide en vez de estimarlo.",
  },
];

/** Documento 03 — objeciones respondidas de frente. */
export const PREGUNTAS = [
  {
    pregunta: "¿Y si el resultado está mal? ¿Quién responde?",
    respuesta:
      "La responsabilidad legal de una declaración es siempre del contribuyente — eso no cambia con ninguna herramienta, ni con un contador de por medio. Lo que hace DeclaraSinMiedo es dejar trazabilidad de cada cifra: de qué documento salió, por qué se clasificó así, y qué advertencias se mostraron. Eso es precisamente lo que permite defender una declaración si llega un requerimiento.",
  },
  {
    pregunta: "¿Esto no deja sin trabajo a los contadores?",
    respuesta:
      "Al contrario: la versión Profesional está construida para ellos. Lo que automatiza es la parte que un contador no cobra bien y le consume el día — transcribir certificados y comparar cifras. Lo que no automatiza es lo que un cliente sí paga con gusto: el criterio profesional, la interpretación de casos complejos y la firma cuando la ley la exige.",
  },
  {
    pregunta: "¿Mis datos financieros a dónde van?",
    respuesta:
      "A ninguna parte. La aplicación funciona completamente en el computador del usuario, sin nube y sin enviar información a ningún servidor — ni siquiera al fabricante. El expediente se guarda cifrado con una clave que solo conoce el usuario. Esta no es una promesa de política de privacidad: es una consecuencia de cómo está construido el producto.",
  },
  {
    pregunta: "¿Por qué no es una suscripción mensual?",
    respuesta:
      "Porque declarar renta es un trámite anual, no un servicio continuo. Cobrar una mensualidad por algo que se usa unas semanas al año sería cobrar por no usarlo. El pago único con vigencia de varios años se alinea con cómo la gente realmente usa la herramienta.",
  },
];

/** Documento 03 — cómo se compra y se activa. */
export const ACTIVACION = [
  { paso: "Descarga", que: "La persona descarga la aplicación y la usa gratis con sus documentos reales." },
  { paso: "Decisión", que: "Al llegar al resultado, decide activar la licencia." },
  { paso: "Identificador del equipo", que: "La aplicación muestra un identificador propio del computador. Se envía junto con el comprobante de pago." },
  { paso: "Emisión", que: "Se emite un código de activación válido únicamente para ese equipo." },
  { paso: "Activación", que: "Se ingresa el código y el resultado queda disponible de inmediato." },
];
