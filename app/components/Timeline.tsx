'use client';

import { PhaseCard } from './PhaseCard';
import { Badge, BadgeVariant } from './Badge';

interface PhaseBadge {
  text: string;
  rotation?: number;
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowRotation?: number;
  // Position relative to the phase card (in px)
  offsetX: number;
  offsetY: number;
}

interface TimelinePhase {
  id: string;
  title: string;
  description: string;
  badges?: PhaseBadge[];
}

interface TimelineProps {
  phases: TimelinePhase[];
  minHeight?: number;
  className?: string;
  badgeVariant?: BadgeVariant;
}

export function Timeline({
  phases,
  minHeight = 800,
  className = '',
  badgeVariant = 'purple'
}: TimelineProps) {
  // Separate phases by side (alternating left-right-left-right)
  const leftPhases = phases.filter((_, index) => index % 2 === 0);
  const rightPhases = phases.filter((_, index) => index % 2 === 1);

  return (
    <div
      className={`relative ${className}`}
      style={{ minHeight }}
      data-gsap="parallax"
      data-speed="0.05"
    >
      {/* Three-column grid: left cards | timeline | right cards */}
      <div className="grid grid-cols-[1fr_2px_1fr] h-full" style={{ minHeight }}>
        {/* Left Column */}
        <div className="flex flex-col justify-start space-y-[200px] pt-[40px] pb-[40px] items-end">
          {leftPhases.map((phase) => (
            <div key={phase.id} className="relative pr-[80px]">
              <PhaseCard
                title={phase.title}
                description={phase.description}
                side="left"
              />
              {/* Connector Line with Diamond */}
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                {/* Diamond (near card) */}
                <div className="w-[6px] h-[6px] bg-[#DBDBDB] rotate-45" />
                {/* Line (to timeline) */}
                <div className="w-[46px] h-[2px] bg-[#DBDBDB]" />
              </div>
              {/* Badges positioned relative to this card */}
              {phase.badges?.map((badge, idx) => (
                <Badge
                  key={`${phase.id}-badge-${idx}`}
                  rotation={badge.rotation}
                  arrowPosition={badge.arrowPosition}
                  arrowRotation={badge.arrowRotation}
                  variant={badgeVariant}
                  className=""
                  style={{
                    left: badge.offsetX,
                    top: badge.offsetY,
                  }}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          ))}
        </div>

        {/* Timeline Line */}
        <div className="bg-[#DBDBDB]" />

        {/* Right Column */}
        <div className="flex flex-col justify-start space-y-[200px] pt-[40px] pb-[40px] translate-y-[180px] items-start">
          {rightPhases.map((phase) => (
            <div key={phase.id} className="relative pl-[80px]">
              <PhaseCard
                title={phase.title}
                description={phase.description}
                side="right"
              />
              {/* Connector Line with Diamond */}
              <div className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center flex-row-reverse">
                {/* Diamond (near card) */}
                <div className="w-[6px] h-[6px] bg-[#DBDBDB] rotate-45" />
                {/* Line (to timeline) */}
                <div className="w-[46px] h-[2px] bg-[#DBDBDB]" />
              </div>
              {/* Badges positioned relative to this card */}
              {phase.badges?.map((badge, idx) => (
                <Badge
                  key={`${phase.id}-badge-${idx}`}
                  rotation={badge.rotation}
                  arrowPosition={badge.arrowPosition}
                  arrowRotation={badge.arrowRotation}
                  variant={badgeVariant}
                  className=""
                  style={{
                    left: badge.offsetX,
                    top: badge.offsetY,
                  }}
                >
                  {badge.text}
                </Badge>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
