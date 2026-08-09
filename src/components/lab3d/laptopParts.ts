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
}

export const LAPTOP_PARTS: Record<PartId, LaptopPart> = {
  pantalla: {
    id: "pantalla",
    label: "Pantalla",
    description:
      "Panel de alta resolución. Revisamos píxeles muertos, bisagras y cables flex antes de cualquier entrega.",
    category: "exterior",
  },
  teclado: {
    id: "teclado",
    label: "Teclado",
    description:
      "Limpiamos debajo de cada tecla y revisamos el flex del teclado en cada mantenimiento preventivo.",
    category: "exterior",
    relatedService: "Mantenimiento preventivo",
  },
  trackpad: {
    id: "trackpad",
    label: "Trackpad",
    description: "Superficie de precisión. Verificamos su calibración y respuesta en cada revisión.",
    category: "exterior",
  },
  puertos: {
    id: "puertos",
    label: "Puertos",
    description:
      "USB, video y carga. Diagnosticamos puertos que ya no cargan o no reconocen dispositivos.",
    category: "exterior",
    relatedService: "Soporte técnico",
  },
  bisagra: {
    id: "bisagra",
    label: "Bisagra",
    description: "Punto de mayor desgaste mecánico del equipo — la revisamos en cada mantenimiento.",
    category: "exterior",
  },
  chasis: {
    id: "chasis",
    label: "Chasis",
    description: "Estructura del equipo. Limpieza externa e interna incluida en el mantenimiento preventivo.",
    category: "exterior",
    relatedService: "Limpieza profunda",
  },
  "placa-base": {
    id: "placa-base",
    label: "Placa base",
    description:
      "El corazón del portátil: aquí se conectan RAM, almacenamiento, batería y sistema de enfriamiento.",
    category: "interior",
  },
  ram: {
    id: "ram",
    label: "Memoria RAM",
    description:
      "Ampliar la RAM es una de las mejoras más notorias en equipos lentos con varias aplicaciones abiertas.",
    category: "interior",
    relatedService: "Instalación de memoria RAM",
  },
  ssd: {
    id: "ssd",
    label: "Almacenamiento SSD",
    description:
      "Migrar de disco duro a SSD reduce drásticamente los tiempos de encendido y carga de programas.",
    category: "interior",
    relatedService: "Instalación de SSD",
  },
  bateria: {
    id: "bateria",
    label: "Batería",
    description: "Revisamos ciclos de carga y salud de la batería como parte del diagnóstico general.",
    category: "interior",
  },
  ventilacion: {
    id: "ventilacion",
    label: "Ventilador y disipador",
    description:
      "El polvo acumulado aquí es la causa más común de sobrecalentamiento — clave en la limpieza profunda.",
    category: "interior",
    relatedService: "Limpieza profunda",
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
