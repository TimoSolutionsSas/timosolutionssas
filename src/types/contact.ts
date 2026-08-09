export type EquipmentType = "portatil" | "escritorio" | "no-aplica";

export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  equipmentType: EquipmentType;
  message: string;
}

export interface ContactSubmissionPayload extends ContactFormData {
  type: "contacto";
  date: string;
  time: string;
  ip: string;
}
