import { useState, type ReactNode } from "react";
import { FiImage } from "react-icons/fi";
import { assetUrl } from "@/utils/assetUrl";
import { cn } from "@/utils/cn";

interface ImageWithFallbackProps {
  src?: string;
  alt: string;
  className?: string;
  icon?: ReactNode;
}

export function ImageWithFallback({
  src,
  alt,
  className,
  icon,
}: ImageWithFallbackProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-hero-gradient text-white/70",
          className
        )}
      >
        {icon ?? <FiImage size={32} aria-hidden />}
      </div>
    );
  }

  return (
    <img
      src={assetUrl(src)}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
