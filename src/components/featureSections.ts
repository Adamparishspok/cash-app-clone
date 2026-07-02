export interface FeatureSectionConfig {
  id: string;
  theme: "light" | "dark";
  headline: string[];
  paragraph?: string;
  bullets?: string[];
  quote?: string;
  cta: {
    label: string;
    href: string;
    variant: "outline-black" | "outline-white";
  };
  video: {
    src: string;
    poster?: string;
    hasAudio?: boolean;
  };
  glow: "light" | "dark";
  legal: boolean;
}

export const featureSections: Record<string, FeatureSectionConfig> = {
  green: {
    id: "green",
    theme: "light",
    headline: ["Earn, save, and", "do more with", "Cash App Green"],
    paragraph:
      "It's easier than ever to earn our best benefits yet—higher Borrow limits, up to 3.25% savings interest, free overdraft coverage, and free withdrawals from 40k in-network ATMs.",
    cta: {
      label: "Learn about Green",
      href: "https://cash.app/green",
      variant: "outline-black",
    },
    video: {
      src: "/videos/cash-green.mp4",
      poster: "/images/posters/green-poster.webp",
    },
    glow: "light",
    legal: true,
  },
  tags: {
    id: "tags",
    theme: "light",
    headline: ["Meet the all-new", "Cash App Tags"],
    paragraph:
      "It's a more whimsical way to tap to pay. Tags are linked to Cash App Card, and you can lock them anytime for security.",
    cta: {
      label: "Explore tags",
      href: "https://cash.app/tags",
      variant: "outline-black",
    },
    video: {
      src: "/videos/tags-9x16.mp4",
      poster: "/images/posters/tags-poster.webp",
    },
    glow: "light",
    legal: true,
  },
  savings: {
    id: "savings",
    theme: "light",
    headline: ["Make your money", "go even further"],
    paragraph:
      "We make it easy to save and grow your money with up to 3.25% interest, automatic savings tools*, and the ability to turn spare change into stocks or bitcoin.**",
    cta: {
      label: "Learn how to save and grow",
      href: "https://cash.app/save",
      variant: "outline-black",
    },
    video: {
      src: "/videos/savings.mp4",
      poster: "/images/posters/savings-poster.webp",
    },
    glow: "light",
    legal: true,
  },
  p2p: {
    id: "p2p",
    theme: "light",
    headline: ["Sending money", "is fast, free, and", "made for you"],
    bullets: [
      "Personalize payments with stickers and text",
      "Collect money from a group with pools*",
      "Sync your contacts to pay friends easily",
      "Send money confidently with Security Lock",
    ],
    cta: {
      label: "Send money",
      href: "https://cash.app/send-money",
      variant: "outline-black",
    },
    video: {
      src: "/videos/p2p.mp4",
      poster: "/images/posters/p2p-poster.webp",
    },
    glow: "light",
    legal: false,
  },
  security: {
    id: "security",
    theme: "dark",
    headline: ["Security built", "into every swipe,", "tap, and send"],
    paragraph:
      "Since 2020, we've prevented $2 billion+ in scams—while protecting what matters with real-time monitoring, Zero Fraud Liability, and FDIC insurance, subject to terms.*",
    cta: {
      label: "Learn about security",
      href: "https://cash.app/security",
      variant: "outline-white",
    },
    video: {
      src: "/videos/security.mp4",
      poster: "/images/posters/security-poster.webp",
    },
    glow: "dark",
    legal: true,
  },
  reviews: {
    id: "reviews",
    theme: "light",
    headline: ["The money", "app 59 million+", "people trust"],
    quote:
      "Cash App makes it so easy to manage everything—I use it for saving, splitting bills, and getting paid. It's all-in-one.",
    cta: {
      label: "Read reviews",
      href: "https://cash.app/reviews",
      variant: "outline-black",
    },
    video: {
      src: "/videos/testimonial.mp4",
      poster: "/images/posters/reviews-poster.webp",
      hasAudio: true,
    },
    glow: "light",
    legal: false,
  },
};
