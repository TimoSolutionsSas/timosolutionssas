import { Html } from "@react-three/drei";
import { cn } from "@/utils/cn";
import type { LaptopPart } from "./laptopParts";

interface PartHotspotProps {
  position: [number, number, number];
  part: LaptopPart;
  isActive: boolean;
  onSelect: (id: LaptopPart["id"]) => void;
}

export function PartHotspot({ position, part, isActive, onSelect }: PartHotspotProps) {
  return (
    <Html position={position} center distanceFactor={4} zIndexRange={[15, 0]} sprite>
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onSelect(part.id);
        }}
        className="focus-ring group relative flex -translate-y-1/2 items-center gap-1.5 rounded-full"
        aria-label={part.label}
      >
        <span className="relative flex h-3 w-3 shrink-0 items-center justify-center">
          <span
            className={cn(
              "absolute h-full w-full animate-ping rounded-full opacity-60",
              isActive ? "bg-accent" : "bg-white"
            )}
          />
          <span
            className={cn(
              "relative h-2 w-2 rounded-full border border-white shadow-[0_0_6px_rgba(0,0,0,0.4)] transition-colors",
              isActive ? "bg-accent" : "bg-primary group-hover:bg-accent"
            )}
          />
        </span>
        <span
          className={cn(
            "whitespace-nowrap rounded-full px-2 py-0.5 text-[10px] font-semibold backdrop-blur-md transition-colors",
            isActive
              ? "bg-accent text-secondary"
              : "bg-secondary/70 text-white group-hover:bg-secondary/90"
          )}
        >
          {part.label}
        </span>
      </button>
    </Html>
  );
}
