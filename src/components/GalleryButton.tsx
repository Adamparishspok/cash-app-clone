import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRightIcon } from "@/components/icons";

export type GalleryButtonVariant =
  | "filled-white"
  | "filled-green"
  | "filled-black"
  | "outline-black"
  | "outline-white";

const variantClasses: Record<GalleryButtonVariant, string> = {
  "filled-white": "bg-white text-black",
  "filled-green": "bg-cash-green text-black",
  "filled-black": "bg-black text-white",
  "outline-black": "border border-black text-black",
  "outline-white": "border border-white text-white",
};

interface GalleryButtonProps {
  href: string;
  variant: GalleryButtonVariant;
  withArrow?: boolean;
  size?: "sm" | "md";
  className?: string;
  children: React.ReactNode;
}

/*
 * Pill CTA measured on cash.app: radius 100px, 14px/-0.28px label,
 * md = 48px tall (padding 16/20), sm = 42px tall (padding 14/20).
 */
export function GalleryButton({
  href,
  variant,
  withArrow = false,
  size = "md",
  className,
  children,
}: GalleryButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center gap-2 rounded-full text-[0.875em] leading-none tracking-[-0.02em] font-medium transition-opacity duration-300 hover:opacity-80",
        size === "md" ? "px-[1.45em] py-[1.15em]" : "px-[1.45em] py-[1em]",
        variantClasses[variant],
        className
      )}
    >
      {children}
      {withArrow ? <ArrowRightIcon className="size-2.5" /> : null}
    </Link>
  );
}
