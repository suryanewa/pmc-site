"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import { FadeUp } from "./ScrollAnimations";
import TextType from "@/components/TextType";
import PixelFillCanvas from "./PixelFillCanvas";

interface ProgramApplicationSectionProps {
  accentColor?: string;
  programTitle?: string;
}

interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

const processSteps: ProcessStep[] = [
  {
    number: "1",
    title: "Written application",
    description: "Short-answer questions to gauge your interests and analysis abilities.",
  },
  {
    number: "2",
    title: "1st interview",
    description: "A follow-up interview for accepted applicants.",
  },
  {
    number: "3",
    title: "Final interview",
    description: "Several interview rounds to test your analysis skills.",
  },
];

function ProcessStepItem({
  step,
  accentColor,
}: {
  step: ProcessStep;
  accentColor: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
    setIsHovered(true);
  };

  return (
    <div
      className="flex gap-6 group cursor-default"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
      style={{ "--accent-color": accentColor } as CSSProperties}
    >
      <span className="relative flex items-center justify-center w-9 h-9 border border-[#3F3F3F]/60 text-[#DBDBDB] text-sm shrink-0 mt-0.5 overflow-hidden transition-colors duration-300 group-hover:border-[var(--accent-color)]">
        <PixelFillCanvas
          active={isHovered}
          origin={mousePos}
          color={accentColor}
          gap={8}
          speed={0.4}
          className="z-0"
          borderRadius={0}
        />
        <span className="relative z-10">{step.number}</span>
      </span>
      <div>
        <h4 className="text-lg text-[#DBDBDB] font-medium mb-1 transition-colors duration-300 group-hover:text-[var(--accent-color)]">
          {step.title}
        </h4>
        <p className="text-[#DBDBDB]/60">{step.description}</p>
      </div>
    </div>
  );
}

export function ProgramApplicationSection({ accentColor = "#41C9C1", programTitle = "" }: ProgramApplicationSectionProps) {
  return (
    <section className="relative z-10 px-6 md:px-16 lg:px-24 py-24 border-t border-[#3F3F3F]/60">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,420px)_minmax(0,1fr)] items-center">
            <div className="flex justify-center lg:justify-start">
              <div
                className="folded-application"
                style={{ "--folded-accent": accentColor } as CSSProperties}
              >
                <div className="folded-application-inner">
                  <div className="folded-application-logo">
                    <span 
                      className="text-[2.5rem] md:text-[3rem] font-medium tracking-tight text-[#DBDBDB]" 
                      style={{ fontFamily: 'var(--font-gotham-medium)' }}
                    >
                      eeg
                    </span>
                    <span 
                      className="text-[2.5rem] md:text-[3rem] font-medium tracking-tight" 
                      style={{ fontFamily: 'var(--font-gotham-medium)', color: accentColor }}
                    >
                      /
                    </span>
                    {programTitle && (
                      <span
                        className="text-[2.5rem] md:text-[3rem] font-medium tracking-tight"
                        style={{ fontFamily: 'var(--font-gotham-medium)', color: accentColor }}
                      >
                        {programTitle}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-3xl lg:ml-auto">
              <h2 className="section-title text-[#DBDBDB] mb-8 text-center">
                <TextType
                  text="Application"
                  typingSpeed={45}
                  initialDelay={100}
                  loop={false}
                  showCursor={true}
                  hideCursorOnComplete={true}
                  cursorCharacter="|"
                  className="inline"
                  as="span"
                  startOnVisible={true}
                />
              </h2>

              <p className="text-lg md:text-xl text-[#DBDBDB]/90 mb-16 leading-relaxed">
                Apps open at the <strong className="text-[#DBDBDB]">beginning of each semester</strong>.{" "}
                <a
                  href="#join-us"
                  className="underline underline-offset-4 decoration-current hover:decoration-[var(--accent-color)] transition-colors"
                  style={{ "--accent-color": accentColor } as React.CSSProperties}
                >
                  Subscribe to our newsletter
                </a>{" "}
                or{" "}
                <a
                  href="https://www.instagram.com/nyu.eeg"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-4 decoration-current hover:decoration-[var(--accent-color)] transition-colors"
                  style={{ "--accent-color": accentColor } as React.CSSProperties}
                >
                  follow our Instagram
                </a>{" "}
                to stay updated.
              </p>

              <div className="space-y-8">
                <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB]/50 uppercase">The Process</h3>
                <p className="text-xl text-[#DBDBDB] font-medium">Our application consists of 3 rounds.</p>

                <div className="space-y-6">
                  {processSteps.map((step) => (
                    <ProcessStepItem key={step.number} step={step} accentColor={accentColor} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
