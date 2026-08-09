import type { ContactFormData } from "@/types/contact";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+()\s-]{7,15}$/;

export type ContactFormErrors = Partial<Record<keyof ContactFormData, string>>;

export function validateContactForm(data: ContactFormData): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!data.firstName.trim()) {
    errors.firstName = "Ingresa tu nombre.";
  }

  if (!data.lastName.trim()) {
    errors.lastName = "Ingresa tu apellido.";
  }

  if (!data.email.trim()) {
    errors.email = "Ingresa tu correo electrónico.";
  } else if (!EMAIL_REGEX.test(data.email.trim())) {
    errors.email = "Ingresa un correo electrónico válido.";
  }

  if (!data.phone.trim()) {
    errors.phone = "Ingresa tu número de celular.";
  } else if (!PHONE_REGEX.test(data.phone.trim())) {
    errors.phone = "Ingresa un número de celular válido.";
  }

  if (!data.city.trim()) {
    errors.city = "Ingresa tu ciudad.";
  }

  if (!data.message.trim()) {
    errors.message = "Cuéntanos brevemente qué necesitas.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Danos un poco más de detalle (mínimo 10 caracteres).";
  }

  return errors;
}

export function isContactFormValid(errors: ContactFormErrors): boolean {
  return Object.keys(errors).length === 0;
}
