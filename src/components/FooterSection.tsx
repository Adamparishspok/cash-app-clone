"use client";

import {
  ArrowRightIcon,
  XLogoIcon,
  InstagramIcon,
  TwitchIcon,
  TikTokIcon,
} from "@/components/icons";

interface FooterSectionProps {
  active: boolean;
}

interface StatCard {
  stat: string;
  captionLines: [string, string];
}

const STAT_CARDS: StatCard[] = [
  { stat: "5★", captionLines: ["Editor’s Choice", "on the App Store"] },
  { stat: "9.9m+", captionLines: ["Apple App Store and", "Google Play reviews"] },
  { stat: "4.5★", captionLines: ["Rated Excellent", "on Trustpilot"] },
];

const NAV_LINKS: { label: string; href: string }[] = [
  { label: "Careers", href: "https://careers.cash.app" },
  { label: "Press", href: "https://cash.app/press" },
  { label: "Help", href: "https://cash.app/help" },
  { label: "Status", href: "https://status.cash.app" },
  { label: "Legal", href: "https://cash.app/legal" },
  { label: "Licenses", href: "https://cash.app/licenses" },
  { label: "Privacy Notice", href: "https://cash.app/legal/us/en-us/privacy" },
  { label: "Your Privacy Choices", href: "#" },
];

const SOCIAL_LINKS: {
  label: string;
  href: string;
  Icon: typeof XLogoIcon;
}[] = [
  { label: "X", href: "https://x.com/CashApp", Icon: XLogoIcon },
  {
    label: "Instagram",
    href: "https://www.instagram.com/cashapp",
    Icon: InstagramIcon,
  },
  { label: "Twitch", href: "https://www.twitch.tv/cashapp", Icon: TwitchIcon },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@cashapp",
    Icon: TikTokIcon,
  },
];

function LegalLink({ label, href = "#" }: { label: string; href?: string }) {
  return (
    <strong>
      <a href={href} className="underline">
        {label}
      </a>
    </strong>
  );
}

export function FooterSection({ active: _active }: FooterSectionProps) {
  return (
    <div>
      {/* Part 1 */}
      <div className="relative mx-auto h-dvh max-w-[1480px] px-5 pt-[10vh]">
        <h2 className="text-[3.5em] font-normal leading-[0.95] tracking-[-0.03em] text-white">
          Cash App makes
          <br />
          money simple
        </h2>
        <div className="mt-[14vh] grid grid-cols-4 gap-5">
          {STAT_CARDS.map((card) => (
            <div
              key={card.stat}
              className="flex aspect-square flex-col justify-between rounded-[14.3%] border border-white/30 p-8 text-white"
            >
              <p className="text-[2.5em] font-normal leading-none">
                {card.stat}
              </p>
              <p className="text-[1em] leading-[1.3]">
                {card.captionLines[0]}
                <br />
                {card.captionLines[1]}
              </p>
            </div>
          ))}
          <a
            href="https://cash.app/account/signup"
            className="flex aspect-square flex-col justify-between rounded-[14.3%] bg-cash-green p-8 text-black transition-opacity hover:opacity-90"
          >
            <span className="text-[2.5em] leading-[0.95] tracking-[-0.03em]">
              Sign up now
            </span>
            <ArrowRightIcon className="size-12" />
          </a>
        </div>
      </div>

      {/* Part 2 */}
      <div className="mx-auto max-w-[1480px] px-5 pb-16">
        <div className="flex justify-between pt-24">
          <p className="text-[1.125em] leading-[1.55] text-white">
            1 (800) 969-1940
            <br />
            Available daily
            <br />
            8AM to 9:30PM ET
          </p>
          <nav>
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="mb-[1.45em] block text-[1.125em] text-white hover:opacity-70"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex gap-6 text-white">
            {SOCIAL_LINKS.map(({ label, href, Icon }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                className="hover:opacity-70"
              >
                <Icon className="size-5" />
              </a>
            ))}
          </div>
        </div>
        <div
          id="legal-disclaimers"
          className="mt-24 max-w-[1440px] text-[0.75em] leading-[1.5] text-[#b3b3b3]"
        >
          <p className="mb-4">
            Cash App is a financial services platform, and not an FDIC-insured
            bank. Prepaid debit cards issued by Sutton Bank, Member FDIC. Cash
            App Visa® Debit Flex Cards issued by Sutton Bank, Member FDIC, and
            The Bancorp Bank, N.A., pursuant to a license from Visa U.S.A. Inc.
            See terms and conditions for the{" "}
            <LegalLink label="Sutton prepaid card" />,{" "}
            <LegalLink label="Sutton debit flex card" />, and{" "}
            <LegalLink label="Bancorp debit flex card" />. Offers provided by
            Cash App, a Block, Inc. brand. Offers not affiliated with third
            party merchants.
          </p>
          <p className="mb-4">
            Brokerage services provided by Cash App Investing LLC, member{" "}
            <LegalLink label="FINRA/SIPC" />, subsidiary of Block, Inc. Bitcoin
            services provided by Block, Inc. Bitcoin services are not
            licensable activity in all U.S. states and territories. Block, Inc.
            operates in New York as Block of Delaware and is licensed to engage
            in virtual currency business activity by the New York State
            Department of Financial Services. Investing and bitcoin are
            non-deposit, non-bank products that are not FDIC insured and
            involve risk, including monetary loss. Cash App Investing does not
            trade bitcoin and Block, Inc. is not a member of FINRA or SIPC. For
            additional information, see the <LegalLink label="Bitcoin" /> and{" "}
            <LegalLink label="Cash App Investing" /> disclosures.
          </p>
          <p className="mb-4">
            Additional fees for securities may apply such as regulatory fees
            and fees to transfer securities externally. Please see our{" "}
            <LegalLink label="House Rules" /> for more information.
          </p>
          <p className="mb-4">
            P2P services and Savings are provided by Block, Inc. and not Cash
            App Investing LLC.
          </p>
          <p className="mb-4">
            Tax Filing Preparation services are provided by Cash App Taxes,
            Inc. and not Cash App Investing LLC.
          </p>
        </div>
      </div>
    </div>
  );
}
