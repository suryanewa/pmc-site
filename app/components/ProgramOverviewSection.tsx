"use client";

import Image from "next/image";
import { useState } from "react";
import { FadeUp } from "./ScrollAnimations";
import { TextAnimate } from "@/components/ui/text-animate";
import AsciiHoverEffect from "@/components/AsciiHoverEffect";

interface ProgramOverviewSectionProps {
  description: React.ReactNode;
  whatToExpect: string[];
  requirements: string[];
  imageSrc?: string;
  imageAlt?: string;
  accentColor?: string;
  whatToExpectIntro?: string;
  timeCommitment?: string;
  timeCommitmentLabel?: string;
}

export function ProgramOverviewSection({
  description,
  whatToExpect,
  requirements,
  imageSrc = "/community/retreat-f2025.png", // Default fallback
  imageAlt = "Program overview image",
  accentColor = "#41C9C1",
  whatToExpectIntro = "Students will finish with 5+ portfolio projects including:",
  timeCommitment = "10-15 hrs / wk",
  timeCommitmentLabel = "Time commitment:",
}: ProgramOverviewSectionProps) {
  const [hoverTop, setHoverTop] = useState(false);
  const [hoverExpect, setHoverExpect] = useState(false);
  const [hoverReqs, setHoverReqs] = useState(false);

  const asciiEffectConfig = {
    colors: `${accentColor},rgba(219,219,219,0.7),rgba(63,63,63,0.8)`,
    fontSize: 10,
    className: "opacity-40 mix-blend-screen",
  };

  return (
    <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 min-h-[50vh]">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          {/* Main Card Container */}
          <div className="border border-[#3F3F3F]/40 overflow-hidden bg-[#3F3F3F]/20">
            
            {/* Top Row: Overview & Image — single hover fills both; one canvas behind, content in front */}
            <div
              className="relative cursor-default"
              onMouseEnter={() => setHoverTop(true)}
              onMouseLeave={() => setHoverTop(false)}
            >
              <div className="absolute inset-0 z-0 overflow-hidden">
                <AsciiHoverEffect
                  active={hoverTop}
                  colors={asciiEffectConfig.colors}
                  fontSize={asciiEffectConfig.fontSize}
                  className="opacity-40"
                />
              </div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 cursor-default">
                {/* Left Panel: Title & Description */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                  <h2 className="section-title text-[#DBDBDB] mb-8 text-center">
                    <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                      Overview
                    </TextAnimate>
                  </h2>
                  <div className="text-base md:text-lg text-[#DBDBDB]/80 leading-relaxed space-y-6">
                    {description}
                  </div>
                </div>

                {/* Right Panel: Image — in front of pixel layer */}
                <div className="relative border-t lg:border-t-0 min-h-[300px] lg:min-h-full p-8 md:p-12 border-[#3F3F3F]/40">
                  <div className="relative w-full h-full overflow-hidden border border-[#3F3F3F]/40 bg-black">
                    <Image
                      src={imageSrc || "/community/retreat-f2025.png"}
                      alt={imageAlt || "Program overview image"}
                      fill
                      className="object-cover cursor-default"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Divider */}
            <div className="border-t border-[#3F3F3F]/40" />

            {/* Bottom Row: Expectations & Requirements */}
            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* What to Expect */}
              <div
                className="relative overflow-hidden p-8 md:p-12 cursor-default"
                onMouseEnter={() => setHoverExpect(true)}
                onMouseLeave={() => setHoverExpect(false)}
              >
                <AsciiHoverEffect
                  active={hoverExpect}
                  colors={asciiEffectConfig.colors}
                  fontSize={asciiEffectConfig.fontSize}
                  className={asciiEffectConfig.className}
                />
                <div className="relative z-10">
                  <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB] uppercase mb-6">What to Expect</h3>
                  <p className="text-base md:text-lg text-[#DBDBDB]/70 mb-6">{whatToExpectIntro}</p>
                  <ul className="space-y-3 text-base md:text-lg">
                    {whatToExpect.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#DBDBDB]/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#DBDBDB]/40 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Requirements */}
              <div
                className="relative overflow-hidden p-8 md:p-12 border-t md:border-t-0 md:border-l border-[#3F3F3F]/40 flex flex-col justify-center cursor-default"
                onMouseEnter={() => setHoverReqs(true)}
                onMouseLeave={() => setHoverReqs(false)}
              >
                <AsciiHoverEffect
                  active={hoverReqs}
                  colors={asciiEffectConfig.colors}
                  fontSize={asciiEffectConfig.fontSize}
                  className={asciiEffectConfig.className}
                />
                <div className="relative z-10">
                  <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB] uppercase mb-6">Requirements</h3>
                  <ul className="space-y-4 text-base md:text-lg">
                    {requirements.map((item, index) => (
                      <li key={index} className="flex items-start gap-3 text-[#DBDBDB]/80">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#DBDBDB]/40 shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  {timeCommitment && (
                    <div className="mt-8 text-base md:text-lg text-[#DBDBDB]/60">
                      {timeCommitmentLabel} <strong className="text-[#DBDBDB]">{timeCommitment}</strong>
                    </div>
                  )}
                </div>
              </div>
            </div>

          </div>
        </FadeUp>
      </div>
    </section>
  );
}
