import { useState } from "react";
import { FiZoomIn } from "react-icons/fi";
import { ImageWithFallback } from "@/components/common/ImageWithFallback";
import { Modal } from "@/components/common/Modal";
import { assetUrl } from "@/utils/assetUrl";
import { cn } from "@/utils/cn";

export function Gallery({ images, name }: { images: string[]; name: string }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const activeImage = images[activeIndex];

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => activeImage && setIsZoomOpen(true)}
        disabled={!activeImage}
        aria-label="Ampliar imagen"
        className="focus-ring group relative overflow-hidden rounded-2xl border border-border disabled:cursor-default"
      >
        <ImageWithFallback
          src={activeImage}
          alt={name}
          className="aspect-square w-full object-cover"
        />
        {activeImage && (
          <span className="absolute bottom-3 right-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary/70 text-white opacity-0 transition-opacity group-hover:opacity-100">
            <FiZoomIn size={16} />
          </span>
        )}
      </button>

      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-2">
          {images.map((img, index) => (
            <button
              key={img}
              onClick={() => setActiveIndex(index)}
              aria-label={`Imagen ${index + 1} de ${name}`}
              className={cn(
                "focus-ring overflow-hidden rounded-lg border-2 transition-colors",
                index === activeIndex ? "border-primary" : "border-transparent"
              )}
            >
              <ImageWithFallback
                src={img}
                alt=""
                className="aspect-square w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {activeImage && (
        <Modal
          isOpen={isZoomOpen}
          onClose={() => setIsZoomOpen(false)}
          size="xl"
          title={name}
        >
          <img
            src={assetUrl(activeImage)}
            alt={name}
            className="max-h-[75vh] w-full rounded-xl object-contain"
          />
        </Modal>
      )}
    </div>
  );
}
