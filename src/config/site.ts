import type { NavLink } from "@/interfaces/navigation";

export const SITE = {
  name: "TI.MO SOLUTIONS",
  legalName: "TI.MO SOLUTIONS S.A.S.",
  tagline: "Mantenimiento y tecnología para tu computador",
  description:
    "Mantenimiento, actualización y venta de software y hardware para computadores portátiles y de escritorio, en Chía y la Sabana de Bogotá.",
  url: "https://timosolutionssas.github.io/timosolutionssas",
  email: "timosolutionssas@hotmail.com",
  whatsappNumber: import.meta.env.VITE_WHATSAPP_NUMBER || "573203935186",
  address: {
    line: "Conjunto San Valentín, Barrio El Cairo",
    city: "Chía",
    region: "Cundinamarca",
    country: "Colombia",
    full: "Conjunto San Valentín, Barrio El Cairo, Chía, Cundinamarca, Colombia",
  },
  serviceArea:
    "Chía y toda la Sabana de Bogotá. Atención de emergencias fuera de Chía con tarifa adicional.",
  hours: {
    weekdays: "Lunes a sábado: 7:00 a.m. – 5:00 p.m.",
    note: "Atendemos casos urgentes en la Sabana de Bogotá fuera de horario, con un costo adicional por la urgencia.",
  },
  social: {
    tiktok: "https://www.tiktok.com/@timosolutions",
  },
} as const;

export const NAV_LINKS: NavLink[] = [
  { label: "Inicio", path: "/" },
  { label: "Catálogo", path: "/catalogo" },
  { label: "Nosotros", path: "/nosotros" },
  { label: "Contacto", path: "/contacto" },
];

export const WHATSAPP_MESSAGES = {
  general: "Hola, quiero información sobre los servicios de TI.MO SOLUTIONS.",
  catalogo: "Hola, quiero conocer el catálogo de productos y servicios.",
  servicio: (nombre: string, sku: string) =>
    `Hola, quiero cotizar este servicio: ${nombre} (código ${sku}).`,
  producto: (nombre: string, sku: string) =>
    `Hola, deseo información sobre este producto: ${nombre} (código ${sku}).`,
  compra: (nombre: string, sku: string) =>
    `Hola, quiero comprar: ${nombre} (código ${sku}). ¿Me ayudas con el proceso?`,
  soporteUrgente:
    "Hola, tengo un problema urgente con mi equipo, ¿me pueden ayudar?",
  laptop3d:
    "Hola, vi la experiencia 3D del portátil en la página y quiero información sobre actualizar mi equipo.",
  contacto: "Hola, vi la página de TI.MO SOLUTIONS y quiero más información.",
};

export function buildWhatsAppUrl(message: string): string {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}
