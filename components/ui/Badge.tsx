import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "forest" | "lime" | "gold" | "white";
  className?: string;
}

export function Badge({ children, variant = "forest", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-block rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider",
        {
          "bg-forest/80 text-lime backdrop-blur-sm": variant === "forest",
          "bg-lime text-forest": variant === "lime",
          "bg-gold text-white": variant === "gold",
          "bg-white/90 text-forest backdrop-blur-sm": variant === "white",
        },
        className
      )}
    >
      {children}
    </span>
  );
}
