import { useState, type FormEvent } from "react";
import { FiSend } from "react-icons/fi";
import { submitNewsletterSignup } from "@/services/contactService";
import { useToast } from "@/hooks/useToast";
import { Button } from "@/components/common/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showToast } = useToast();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    setIsLoading(true);
    try {
      await submitNewsletterSignup(email.trim());
      showToast("¡Gracias por suscribirte!", "success");
      setEmail("");
    } catch {
      showToast(
        "No pudimos completar la suscripción. Escríbenos por WhatsApp mientras tanto.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Tu correo electrónico"
        aria-label="Correo electrónico para novedades"
        className="focus-ring w-full rounded-full border border-white/20 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/50"
      />
      <Button
        type="submit"
        variant="secondary"
        size="sm"
        isLoading={isLoading}
        icon={<FiSend />}
        aria-label="Suscribirme"
        className="!bg-accent !text-secondary hover:!bg-accent/90"
      />
    </form>
  );
}
