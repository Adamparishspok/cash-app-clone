export type SectionTheme = "light" | "dark" | "green";

export interface SectionDef {
  /** data-identifier from the original site */
  id: string;
  /** page background color while this section is active */
  background: string;
  theme: SectionTheme;
}

export interface CtaDef {
  label: string;
  href: string;
  /** pill button variant */
  variant: "filled-white" | "filled-green" | "filled-black" | "outline-black" | "outline-white";
  withArrow?: boolean;
}

export interface FeatureSectionContent {
  id: string;
  theme: SectionTheme;
  headline: string[];
  /** paragraph text OR bullet list */
  description?: string;
  bullets?: string[];
  quote?: string;
  cta: CtaDef;
  video: {
    src: string;
    poster?: string;
    /** aspect frame size on desktop */
    width: number;
    height: number;
    hasAudio?: boolean;
  };
  legalDisclaimer?: boolean;
}

export interface BorrowCard {
  media: { type: "video" | "image"; src: string };
  caption: string[];
}

export interface StatCard {
  stat: string;
  /** true if the stat ends with a star glyph */
  withStar?: boolean;
  caption: string[];
}

export interface MenuTile {
  title: string[];
  image: string;
  href: string;
}

export interface MenuIconLink {
  icon: string;
  label: string;
  href: string;
}
