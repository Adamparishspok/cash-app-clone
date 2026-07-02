"use client";

import { Fragment } from "react";
import { GalleryButton } from "@/components/GalleryButton";
import type { FeatureSectionConfig } from "@/components/featureSections";

interface FeatureSectionProps {
  active: boolean;
  config: FeatureSectionConfig;
}

/*
 * Feature section on the original's full-bleed grid (12 cols, 20px gaps,
 * 20px outer margin): headline cols 1-3, phone placeholder cols 5-8 (the
 * actual video lives in the viewport-locked PhoneStage), description +
 * CTA cols 10-12. Content is vertically centered inside 10vh vertical
 * padding. There are no opacity entrances — text simply inherits the page
 * color, which crossfades 0.6s when the section theme flips.
 */
export function FeatureSection({ config }: FeatureSectionProps) {
  return (
    <section
      data-section-id={config.id}
      className="cash-grid relative h-full items-center py-[10vh]"
    >
      {/* Headline: columns 1-3 (bleeds one gap right) */}
      <h2 className="col-start-1 col-span-3 text-[2.5em] leading-[1.1] tracking-[-0.03em] font-normal">
        {config.headline.map((line, i) => (
          <Fragment key={line}>
            {line}
            {i < config.headline.length - 1 ? <br /> : null}
          </Fragment>
        ))}
      </h2>

      {/* Phone placeholder: columns 5-8 (PhoneStage renders the video) */}
      <div
        aria-hidden
        className="col-start-5 col-span-4 h-[80vh] max-h-[80vh]"
      />

      {/* Description + CTA: columns 10-12 (bleeds both gaps) */}
      <div className="col-start-10 col-span-3">
        {config.paragraph ? (
          <p className="mb-[clamp(24px,2em,32px)] text-[1.125em] leading-[1.4] tracking-[-0.03em]">
            {config.paragraph}
          </p>
        ) : config.bullets ? (
          <ul className="mb-[clamp(24px,2em,32px)] list-disc pl-[1em] text-[1.125em] leading-[1.4] tracking-[-0.03em]">
            {config.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : config.quote ? (
          <blockquote className="mb-[clamp(24px,2em,32px)] flex text-[1.125em] leading-[1.2] tracking-[-0.03em]">
            <span>&ldquo;</span>
            <span>{config.quote}&rdquo;</span>
          </blockquote>
        ) : null}
        <GalleryButton
          href={config.cta.href}
          variant={config.cta.variant}
          className="border-current text-current"
        >
          {config.cta.label}
        </GalleryButton>
      </div>

      {/* Legal disclaimer: bottom-left, 3vh above the section edge */}
      {config.legal ? (
        <div className="absolute bottom-[3vh] left-[max(20px,calc((100vw-1440px)/2))] text-[0.75em] leading-[1.2] tracking-[-0.02em]">
          <a href="#legal-disclaimers" className="underline">
            *See legal disclaimers
          </a>
        </div>
      ) : null}
    </section>
  );
}
