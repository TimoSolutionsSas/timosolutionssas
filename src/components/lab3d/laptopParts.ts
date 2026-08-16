export type PartId =
  | "pantalla"
  | "teclado"
  | "trackpad"
  | "puertos"
  | "bisagra"
  | "chasis"
  | "ram"
  | "ssd"
  | "bateria"
  | "ventilacion"
  | "placa-base";

export interface LaptopPart {
  id: PartId;
  label: string;
  description: string;
  category: "exterior" | "interior";
  /** Servicio real relacionado, para conectar la demo con el negocio. */
  relatedService?: string;
  /**
   * Mensaje de WhatsApp completo y específico para esta pieza: menciona el
   * componente exacto, si aplica mantenimiento y/o actualización, y pide
   * diagnóstico/precio puntual — para que la respuesta del asesor sea
   * directa y no un genérico "hola, quiero información".
   */
  whatsappMessage: string;
}

export const LAPTOP_PARTS: Record<PartId, LaptopPart> = {
  pantalla: {
    id: "pantalla",
    label: "Pantalla",
    description:
      "Panel de alta resolución. Revisamos píxeles muertos, bisagras y cables flex antes de cualquier entrega.",
    category: "exterior",
    whatsappMessage:
      "Hola, quiero información sobre mantenimiento o reparación de la pantalla de mi portátil (por ejemplo: píxeles dañados, mal contacto o problemas de imagen). ¿Me pueden dar un diagnóstico y el precio?",
  },
  teclado: {
    id: "teclado",
    label: "Teclado",
    description:
      "Limpiamos debajo de cada tecla y revisamos el flex del teclado en cada mantenimiento preventivo.",
    category: "exterior",
    relatedService: "Mantenimiento preventivo",
    whatsappMessage:
      "Hola, quiero cotizar el mantenimiento del teclado de mi portátil (limpieza profunda debajo de las teclas y revisión general). ¿Qué precio tiene ese servicio?",
  },
  trackpad: {
    id: "trackpad",
    label: "Trackpad",
    description: "Superficie de precisión. Verificamos su calibración y respuesta en cada revisión.",
    category: "exterior",
    whatsappMessage:
      "Hola, el trackpad de mi portátil no responde bien y quiero que lo revisen (calibración o posible daño). ¿Me pueden dar diagnóstico y precio?",
  },
  puertos: {
    id: "puertos",
    label: "Puertos",
    description:
      "USB, video y carga. Diagnosticamos puertos que ya no cargan o no reconocen dispositivos.",
    category: "exterior",
    relatedService: "Soporte técnico",
    whatsappMessage:
      "Hola, tengo problemas con uno o varios puertos de mi portátil (USB, carga o video que no funcionan). ¿Me pueden dar un diagnóstico y el precio del servicio?",
  },
  bisagra: {
    id: "bisagra",
    label: "Bisagra",
    description: "Punto de mayor desgaste mecánico del equipo — la revisamos en cada mantenimiento.",
    category: "exterior",
    whatsappMessage:
      "Hola, quiero que revisen la bisagra de mi portátil (para saber si necesita mantenimiento o reparación por desgaste). ¿Qué precio tiene ese servicio?",
  },
  chasis: {
    id: "chasis",
    label: "Chasis",
    description: "Estructura del equipo. Limpieza externa e interna incluida en el mantenimiento preventivo.",
    category: "exterior",
    relatedService: "Limpieza profunda",
    whatsappMessage:
      "Hola, quiero un mantenimiento y limpieza profunda del chasis (carcasa) de mi portátil. ¿Qué precio tiene ese servicio?",
  },
  "placa-base": {
    id: "placa-base",
    label: "Placa base",
    description:
      "El corazón del portátil: aquí se conectan RAM, almacenamiento, batería y sistema de enfriamiento.",
    category: "interior",
    whatsappMessage:
      "Hola, quiero un diagnóstico general de la placa base de mi portátil (sospecho una falla eléctrica o de encendido). ¿Qué precio tiene esa revisión?",
  },
  ram: {
    id: "ram",
    label: "Memoria RAM",
    description:
      "Ampliar la RAM es una de las mejoras más notorias en equipos lentos con varias aplicaciones abiertas.",
    category: "interior",
    relatedService: "Instalación de memoria RAM",
    whatsappMessage:
      "Hola, quiero información sobre mantenimiento y/o actualización de la memoria RAM de mi portátil (mi equipo está lento con varias aplicaciones abiertas). ¿Qué capacidades manejan, cuál me recomiendan y qué precio tiene, instalación incluida?",
  },
  ssd: {
    id: "ssd",
    label: "Almacenamiento SSD",
    description:
      "Migrar de disco duro a SSD reduce drásticamente los tiempos de encendido y carga de programas.",
    category: "interior",
    relatedService: "Instalación de SSD",
    whatsappMessage:
      "Hola, quiero información sobre mantenimiento y/o actualización del almacenamiento (SSD o M.2) de mi portátil, para mejorar la velocidad de encendido y carga de programas. ¿Qué capacidades manejan y qué precio tiene, instalación incluida?",
  },
  bateria: {
    id: "bateria",
    label: "Batería",
    description: "Revisamos ciclos de carga y salud de la batería como parte del diagnóstico general.",
    category: "interior",
    whatsappMessage:
      "Hola, quiero un diagnóstico de la batería de mi portátil (salud, ciclos de carga o duración). ¿Qué precio tiene esa revisión?",
  },
  ventilacion: {
    id: "ventilacion",
    label: "Ventilador y disipador",
    description:
      "El polvo acumulado aquí es la causa más común de sobrecalentamiento — clave en la limpieza profunda.",
    category: "interior",
    relatedService: "Limpieza profunda",
    whatsappMessage:
      "Hola, sospecho que mi portátil se está sobrecalentando y quiero una limpieza del ventilador y el disipador. ¿Qué precio tiene ese servicio?",
  },
};

export const EXTERIOR_PART_IDS: PartId[] = [
  "pantalla",
  "teclado",
  "trackpad",
  "puertos",
  "bisagra",
  "chasis",
];

export const INTERIOR_PART_IDS: PartId[] = [
  "placa-base",
  "ram",
  "ssd",
  "bateria",
  "ventilacion",
];
