"use client";

import Link from "next/link";
import {
  ArrowRightIcon,
  CashLogoIcon,
  CloseIcon,
  HamburgerIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface NavHeaderProps {
  theme: "hero" | "light" | "dark";
  menuOpen: boolean;
  onMenuToggle: () => void;
}

export function NavHeader({ theme, menuOpen, onMenuToggle }: NavHeaderProps) {
  const activeTheme = menuOpen ? "dark" : theme;
  const isHero = activeTheme === "hero";

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex items-start justify-between p-5">
      <Link
        href="/"
        aria-label="Cash App home"
        className="pointer-events-auto block size-[47px]"
      >
        <CashLogoIcon
          className={cn(
            "size-[47px] [&_path]:transition-[fill] [&_path]:duration-300 [&_path]:ease-in-out [&_rect]:transition-[fill] [&_rect]:duration-300 [&_rect]:ease-in-out",
            /*
             * The lockup path is a rounded-square frame with the $ as an
             * evenodd hole; the rect shows through the hole.
             * Hero (green bg): green frame blends in → white $ glyph.
             * Light (white bg): the same colors read as a green chip + white $.
             * Dark (black bg): green chip + black $ (rect goes black).
             */
            activeTheme === "dark"
              ? "[&_rect]:fill-black [&_path]:fill-[#00e013]"
              : "[&_rect]:fill-white [&_path]:fill-[#00e013]"
          )}
        />
      </Link>
      <div className="pointer-events-auto flex items-center gap-[5px]">
        <a
          href="https://cash.app/account/signup"
          className={cn(
            "flex h-[47px] items-center gap-2 rounded-full px-5 text-xs font-medium whitespace-nowrap text-black transition-[background-color,color,opacity] duration-300 ease-in-out hover:opacity-80",
            isHero ? "bg-white" : "bg-cash-green"
          )}
        >
          Sign up
          <ArrowRightIcon className="size-[10px]" />
        </a>
        <a
          href="https://cash.app/login"
          className="flex h-[47px] items-center justify-center rounded-full bg-black px-5 text-xs font-normal whitespace-nowrap text-white transition-[background-color,color,opacity] duration-300 ease-in-out hover:opacity-80"
        >
          Log in
        </a>
        <button
          type="button"
          onClick={onMenuToggle}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="flex size-[47px] items-center justify-center rounded-full bg-black text-white transition-opacity duration-300 ease-in-out hover:opacity-90"
        >
          {menuOpen ? (
            <CloseIcon className="size-5" />
          ) : (
            <HamburgerIcon className="size-5" />
          )}
        </button>
      </div>
    </header>
  );
}
