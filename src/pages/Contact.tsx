import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { FiCheckCircle, FiClock, FiMail, FiMapPin } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { SEO } from "@/components/common/SEO";
import { Breadcrumbs } from "@/components/common/Breadcrumbs";
import { Input } from "@/components/common/Input";
import { Textarea } from "@/components/common/Textarea";
import { Select } from "@/components/common/Select";
import { Button } from "@/components/common/Button";
import { GoogleMap } from "@/components/shared/GoogleMap";
import { SocialLinks } from "@/components/shared/SocialLinks";
import { submitContactForm } from "@/services/contactService";
import { validateContactForm, isContactFormValid } from "@/utils/validators";
import { buildWhatsAppUrl, SITE, WHATSAPP_MESSAGES } from "@/config/site";
import { fadeUp, staggerContainer } from "@/animations/variants";
import type { ContactFormData } from "@/types/contact";

const EMPTY_FORM: ContactFormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  equipmentType: "no-aplica",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<ContactFormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField<K extends keyof ContactFormData>(
    field: K,
    value: ContactFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const validationErrors = validateContactForm(form);
    setErrors(validationErrors);
    if (!isContactFormValid(validationErrors)) return;

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await submitContactForm(form);
      setIsSuccess(true);
      setForm(EMPTY_FORM);
    } catch (err) {
      setSubmitError(
        err instanceof Error
          ? err.message
          : "No se pudo enviar el mensaje. Intenta de nuevo."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <SEO
        title="Contacto"
        description="Escríbenos por WhatsApp o completa el formulario de contacto de TI.MO SOLUTIONS. Atendemos en Chía y toda la Sabana de Bogotá."
        path="/contacto"
      />

      <section className="bg-hero-gradient pb-14 pt-32 text-white">
        <div className="container-page">
          <Breadcrumbs items={[{ label: "Contacto" }]} />
          <h1 className="mt-6 font-display text-4xl font-bold sm:text-5xl">
            Hablemos de tu equipo
          </h1>
          <p className="mt-3 max-w-xl text-white/75">
            Escríbenos por WhatsApp o completa el formulario y te
            respondemos lo antes posible.
          </p>
        </div>
      </section>

      <section className="section-y">
        <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.1fr]">
          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-6"
          >
            <motion.div variants={fadeUp}>
              <a
                href={buildWhatsAppUrl(WHATSAPP_MESSAGES.contacto)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="whatsapp"
                  size="lg"
                  icon={<FaWhatsapp size={20} />}
                  fullWidth
                >
                  Escríbenos por WhatsApp
                </Button>
              </a>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl border border-border p-4"
            >
              <FiMapPin className="mt-1 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Ubicación</p>
                <p className="text-sm text-foreground-muted">
                  {SITE.address.full}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {SITE.serviceArea}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl border border-border p-4"
            >
              <FiClock className="mt-1 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Horario</p>
                <p className="text-sm text-foreground-muted">
                  {SITE.hours.weekdays}
                </p>
                <p className="mt-1 text-sm text-foreground-muted">
                  {SITE.hours.note}
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex items-start gap-3 rounded-2xl border border-border p-4"
            >
              <FiMail className="mt-1 shrink-0 text-primary" />
              <div>
                <p className="font-medium">Correo</p>
                <a
                  href={`mailto:${SITE.email}`}
                  className="text-sm text-foreground-muted hover:text-primary"
                >
                  {SITE.email}
                </a>
              </div>
            </motion.div>

            <motion.div variants={fadeUp}>
              <SocialLinks />
            </motion.div>

            <motion.div variants={fadeUp} className="h-64 overflow-hidden">
              <GoogleMap className="h-full" />
            </motion.div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="rounded-3xl border border-border bg-background p-6 sm:p-8"
          >
            {isSuccess ? (
              <div className="flex flex-col items-center gap-4 py-12 text-center">
                <FiCheckCircle className="text-success" size={56} />
                <h3 className="font-display text-xl font-semibold">
                  Mensaje enviado correctamente.
                </h3>
                <p className="text-foreground-muted">
                  Gracias por escribirnos. Te responderemos muy pronto.
                </p>
                <Button variant="outline" onClick={() => setIsSuccess(false)}>
                  Enviar otro mensaje
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="Nombre"
                    value={form.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    error={errors.firstName}
                    placeholder="Tu nombre"
                  />
                  <Input
                    label="Apellido"
                    value={form.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    error={errors.lastName}
                    placeholder="Tu apellido"
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="Correo electrónico"
                    type="email"
                    value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    error={errors.email}
                    placeholder="tucorreo@ejemplo.com"
                  />
                  <Input
                    label="Celular"
                    type="tel"
                    value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    error={errors.phone}
                    placeholder="300 000 0000"
                  />
                </div>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Input
                    label="Ciudad"
                    value={form.city}
                    onChange={(e) => updateField("city", e.target.value)}
                    error={errors.city}
                    placeholder="Chía, Bogotá..."
                  />
                  <Select
                    label="Tipo de equipo (opcional)"
                    value={form.equipmentType}
                    onChange={(e) =>
                      updateField(
                        "equipmentType",
                        e.target.value as ContactFormData["equipmentType"]
                      )
                    }
                    options={[
                      { label: "No especifica", value: "no-aplica" },
                      { label: "Portátil", value: "portatil" },
                      { label: "Escritorio", value: "escritorio" },
                    ]}
                  />
                </div>
                <Textarea
                  label="Mensaje"
                  value={form.message}
                  onChange={(e) => updateField("message", e.target.value)}
                  error={errors.message}
                  placeholder="Cuéntanos qué necesitas..."
                />

                {submitError && (
                  <p className="rounded-xl bg-error/10 px-4 py-3 text-sm text-error">
                    {submitError}
                  </p>
                )}

                <Button type="submit" size="lg" isLoading={isSubmitting} fullWidth>
                  Enviar mensaje
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </section>
    </>
  );
}
