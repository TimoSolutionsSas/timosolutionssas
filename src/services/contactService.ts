import type { ContactFormData, ContactSubmissionPayload } from "@/types/contact";

const ENDPOINT = import.meta.env.VITE_GOOGLE_SHEETS_ENDPOINT as
  | string
  | undefined;

async function getVisitorIp(): Promise<string> {
  try {
    const response = await fetch("https://api.ipify.org?format=json");
    if (!response.ok) return "desconocida";
    const data = (await response.json()) as { ip?: string };
    return data.ip ?? "desconocida";
  } catch {
    return "desconocida";
  }
}

export async function submitContactForm(data: ContactFormData): Promise<void> {
  if (!ENDPOINT) {
    throw new Error(
      "El formulario de contacto aún no está conectado. Configura VITE_GOOGLE_SHEETS_ENDPOINT."
    );
  }

  const now = new Date();
  const ip = await getVisitorIp();

  const payload: ContactSubmissionPayload = {
    ...data,
    type: "contacto",
    date: now.toLocaleDateString("es-CO"),
    time: now.toLocaleTimeString("es-CO"),
    ip,
  };

  // Content-Type text/plain evita el preflight CORS con Google Apps Script.
  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error("No se pudo enviar el mensaje. Intenta de nuevo.");
  }
}

export async function submitNewsletterSignup(email: string): Promise<void> {
  if (!ENDPOINT) {
    throw new Error(
      "La suscripción aún no está conectada. Configura VITE_GOOGLE_SHEETS_ENDPOINT."
    );
  }

  const now = new Date();

  const response = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "text/plain" },
    body: JSON.stringify({
      type: "newsletter",
      email,
      date: now.toLocaleDateString("es-CO"),
      time: now.toLocaleTimeString("es-CO"),
    }),
  });

  if (!response.ok) {
    throw new Error("No se pudo completar la suscripción. Intenta de nuevo.");
  }
}
