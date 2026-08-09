import { SITE } from "@/config/site";

export function GoogleMap({ className }: { className?: string }) {
  const query = encodeURIComponent(SITE.address.full);

  return (
    <div className={className}>
      <iframe
        title={`Ubicación de ${SITE.name}`}
        src={`https://www.google.com/maps?q=${query}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-full w-full rounded-2xl border border-border"
        allowFullScreen
      />
    </div>
  );
}
