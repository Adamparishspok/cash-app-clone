"use client";

import {
  XLogoIcon,
  InstagramIcon,
  TikTokIcon,
  LinkedInIcon,
  TwitchIcon,
} from "@/components/icons";
import { cn } from "@/lib/utils";

interface MenuOverlayProps {
  open: boolean;
}

interface MenuTile {
  title: string;
  image: string;
  href: string;
}

interface IconLink {
  icon: string;
  label: string;
  href: string;
}

interface RailLink {
  label: string;
  href: string;
}

interface SocialLink {
  Icon: React.ComponentType<{ className?: string }>;
  label: string;
  href: string;
}

const tiles: MenuTile[] = [
  {
    title: "Bank* on your terms",
    image: "/images/nav/nav-bank.png",
    href: "https://cash.app/bank",
  },
  {
    title: "Order a Cash App Card",
    image: "/images/nav/nav-card.png",
    href: "https://cash.app/card",
  },
  {
    title: "Send money for free",
    image: "/images/nav/nav-send.png",
    href: "https://cash.app/send-money",
  },
  {
    title: "Save for your goals",
    image: "/images/nav/nav-save.png",
    href: "https://cash.app/save",
  },
  {
    title: "Know your money is safe",
    image: "/images/nav/nav-security.png",
    href: "https://cash.app/security",
  },
  {
    title: "Deposit your paychecks",
    image: "/images/nav/nav-paychecks.png",
    href: "https://cash.app/paychecks",
  },
];

const iconLinks: IconLink[] = [
  {
    icon: "/images/nav/icon-afterpay.svg",
    label: "Pay over time with Cash App Afterpay",
    href: "https://cash.app/afterpay",
  },
  {
    icon: "/images/nav/icon-offers.svg",
    label: "Save on everyday spending",
    href: "https://cash.app/offers",
  },
  {
    icon: "/images/nav/icon-stocks.svg",
    label: "Buy stocks with no commission fees",
    href: "https://cash.app/stocks",
  },
  {
    icon: "/images/nav/icon-bitcoin.svg",
    label: "Buy and sell bitcoin easily",
    href: "https://cash.app/bitcoin",
  },
  {
    icon: "/images/nav/icon-taxes.svg",
    label: "File your taxes for free",
    href: "https://cash.app/taxes",
  },
  {
    icon: "/images/nav/icon-family.svg",
    label: "Get a secure debit card for your teens",
    href: "https://cash.app/family",
  },
];

const railLinks: RailLink[] = [
  { label: "Careers", href: "https://careers.cash.app" },
  { label: "Press", href: "https://cash.app/press" },
  { label: "Outsmart scams", href: "https://cash.app/outsmart-scams" },
  { label: "No hidden fees", href: "https://cash.app/no-hidden-fees" },
  { label: "Reviews", href: "https://cash.app/reviews" },
  { label: "Help", href: "https://cash.app/help" },
];

const socialLinks: SocialLink[] = [
  { Icon: XLogoIcon, label: "X", href: "https://x.com/CashApp" },
  {
    Icon: InstagramIcon,
    label: "Instagram",
    href: "https://www.instagram.com/cashapp",
  },
  {
    Icon: TikTokIcon,
    label: "TikTok",
    href: "https://www.tiktok.com/@cashapp",
  },
  {
    Icon: LinkedInIcon,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/cash-app",
  },
  { Icon: TwitchIcon, label: "Twitch", href: "https://www.twitch.tv/cashapp" },
];

export function MenuOverlay({ open }: MenuOverlayProps) {
  return (
    <div
      aria-hidden={!open}
      className={cn(
        "fixed inset-0 z-40 overflow-y-auto bg-black text-white transition-opacity duration-[400ms] ease-[ease]",
        open ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      <div
        className={cn(
          "flex px-9 pt-[88px] transition-transform duration-[400ms] ease-[ease]",
          open ? "translate-y-0" : "translate-y-3"
        )}
      >
        <div className="grid grid-cols-3 gap-[17px]">
          {tiles.map((tile) => (
            <a
              key={tile.href}
              href={tile.href}
              className="relative block h-[284px] w-[284px] rounded-[20px] bg-[#1a1a1a] p-6 transition-opacity hover:opacity-90"
            >
              <span className="text-[20.45px] font-normal leading-snug text-white">
                {tile.title}
              </span>
              <img
                src={tile.image}
                alt=""
                className="absolute bottom-6 left-6 max-h-[55%] max-w-[calc(100%-48px)] object-contain"
              />
            </a>
          ))}
        </div>

        <div className="ml-[82px] flex w-[227px] shrink-0 flex-col gap-[25px]">
          {iconLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-start gap-3 transition-opacity hover:opacity-70"
            >
              <img src={link.icon} alt="" className="h-6 w-6 shrink-0" />
              <span className="text-[15px] leading-snug text-white">
                {link.label}
              </span>
            </a>
          ))}
        </div>

        <div className="ml-[67px] w-[178px] shrink-0">
          <p className="mb-3 text-[15.3px] text-[#999]">Learn more</p>
          <div className="flex flex-col items-start gap-[14px]">
            {railLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[15.3px] text-white transition-opacity hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </div>
          <p className="mb-4 mt-11 text-[15.3px] text-[#999]">Stay in Touch</p>
          <div className="grid w-fit grid-cols-2 gap-5">
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={href}
                href={href}
                aria-label={label}
                className="text-white transition-opacity hover:opacity-70"
              >
                <Icon className="h-[21px] w-[21px]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
