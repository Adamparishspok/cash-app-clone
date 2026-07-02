"use client";

import { useState } from "react";
import { NavHeader } from "@/components/NavHeader";
import { MenuOverlay } from "@/components/MenuOverlay";
import { ScrollStage } from "@/components/ScrollStage";
import type { StageSection } from "@/components/ScrollStage";
import { HeroSection } from "@/components/HeroSection";
import { FeatureSection } from "@/components/FeatureSection";
import { featureSections } from "@/components/featureSections";
import { CardFanSection } from "@/components/CardFanSection";
import { BorrowSection } from "@/components/BorrowSection";
import { FooterSection } from "@/components/FooterSection";
import { PhoneStage } from "@/components/PhoneStage";
import type { PhoneStageItem } from "@/components/PhoneStage";

const WHITE = "#ffffff";
const BLACK = "#000000";

const sections: StageSection[] = [
  {
    id: "hero",
    background: WHITE,
    theme: "light",
    content: (active) => <HeroSection active={active} />,
  },
  {
    id: "cash-app-green",
    background: WHITE,
    theme: "light",
    content: (active) => (
      <FeatureSection active={active} config={featureSections.green} />
    ),
  },
  {
    id: "cash-app-card",
    background: BLACK,
    theme: "dark",
    content: () => <CardFanSection />,
  },
  {
    id: "borrow",
    background: BLACK,
    theme: "dark",
    content: (active) => <BorrowSection active={active} />,
  },
  {
    id: "tags",
    background: WHITE,
    theme: "light",
    content: (active) => (
      <FeatureSection active={active} config={featureSections.tags} />
    ),
  },
  {
    id: "savings",
    background: WHITE,
    theme: "light",
    content: (active) => (
      <FeatureSection active={active} config={featureSections.savings} />
    ),
  },
  {
    id: "p2p",
    background: WHITE,
    theme: "light",
    content: (active) => (
      <FeatureSection active={active} config={featureSections.p2p} />
    ),
  },
  {
    id: "security",
    background: BLACK,
    theme: "dark",
    content: (active) => (
      <FeatureSection active={active} config={featureSections.security} />
    ),
  },
  {
    id: "reviews",
    background: WHITE,
    theme: "light",
    content: (active) => (
      <FeatureSection active={active} config={featureSections.reviews} />
    ),
  },
  {
    id: "footer",
    background: BLACK,
    theme: "dark",
    tall: true,
    content: (active) => <FooterSection active={active} />,
  },
];

const sectionThemes = new Map(sections.map((s) => [s.id, s.theme]));

/* Section id → phone video shown in the viewport-locked PhoneStage.
   index = position in the sections array (drives the scroll-scrub math). */
const phoneStageItems: PhoneStageItem[] = [
  { id: "cash-app-green", config: featureSections.green },
  { id: "tags", config: featureSections.tags },
  { id: "savings", config: featureSections.savings },
  { id: "p2p", config: featureSections.p2p },
  { id: "security", config: featureSections.security },
  { id: "reviews", config: featureSections.reviews },
].map(({ id, config }) => ({
  id,
  index: sections.findIndex((s) => s.id === id),
  src: config.video.src,
  poster: config.video.poster,
  hasAudio: config.video.hasAudio,
  glow: config.glow,
  theme: config.theme,
}));

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");

  const navTheme = menuOpen
    ? "dark"
    : activeId === "hero"
      ? "hero"
      : (sectionThemes.get(activeId) ?? "light");

  return (
    <>
      <NavHeader
        theme={navTheme}
        menuOpen={menuOpen}
        onMenuToggle={() => setMenuOpen((open) => !open)}
      />
      <MenuOverlay open={menuOpen} />
      <ScrollStage
        sections={sections}
        onActiveChange={setActiveId}
        overlay={<PhoneStage activeId={activeId} items={phoneStageItems} />}
      />
    </>
  );
}
