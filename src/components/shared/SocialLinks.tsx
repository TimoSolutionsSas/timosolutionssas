import { FaTiktok } from "react-icons/fa";
import { SITE } from "@/config/site";
import { cn } from "@/utils/cn";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
      <a
        href={SITE.social.tiktok}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="TI.MO SOLUTIONS en TikTok"
        className="focus-ring flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground-muted transition-colors hover:border-primary hover:text-primary"
      >
        <FaTiktok size={16} />
      </a>
    </div>
  );
}
