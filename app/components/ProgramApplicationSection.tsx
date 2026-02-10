"use client";

import { type CSSProperties } from "react";
import { FadeUp } from "./ScrollAnimations";
import { TextAnimate } from "@/components/ui/text-animate";

interface ProgramApplicationSectionProps {
  accentColor?: string;
  steps?: ProcessStep[];
  roundsText?: string;
  introText?: React.ReactNode;
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
  return (
    <div
      className="flex gap-6 group cursor-default"
      style={{ "--accent-color": accentColor } as CSSProperties}
    >
      <span className="relative flex items-center justify-center w-9 h-9 border border-[#3F3F3F]/60 text-[#DBDBDB] text-sm shrink-0 mt-0.5 transition-colors duration-300 group-hover:border-[var(--accent-color)]">
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

export function ProgramApplicationSection({
  accentColor = "#41C9C1",
  steps,
  roundsText,
  introText,
}: ProgramApplicationSectionProps) {
  const displaySteps = steps || processSteps;
  const displayRoundsText = roundsText || "Our application consists of 3 rounds.";
  return (
    <section className="relative z-10 px-6 md:px-16 lg:px-24 py-32 border-t border-[#3F3F3F]/60">
      <div className="max-w-[1400px] mx-auto">
        <FadeUp>
          <div className="max-w-3xl mx-auto">
              <h2 className="section-title text-[#DBDBDB] mb-8 text-center">
                <TextAnimate as="span" animation="slideLeft" by="character" startOnView={true} className="inline">
                  Application
                </TextAnimate>
              </h2>

              <div className="text-lg md:text-xl text-[#DBDBDB]/90 mb-16 leading-relaxed">
                {introText || (
                  <p>
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
                )}
              </div>

              <div className="space-y-8">
                <h3 className="text-sm font-bold tracking-widest text-[#DBDBDB]/50 uppercase">The Process</h3>
                <p className="text-xl text-[#DBDBDB] font-medium">{displayRoundsText}</p>

                <div className="space-y-6">
                  {displaySteps.map((step) => (
                    <ProcessStepItem key={step.number} step={step} accentColor={accentColor} />
                  ))}
                </div>
              </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
