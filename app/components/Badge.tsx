import Image from "next/image";
import type { CSSProperties } from "react";

type BadgeVariant = 'purple' | 'green' | 'orange';

interface BadgeProps {
  children: string;
  rotation?: number;
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowRotation?: number;
  className?: string;
  style?: CSSProperties;
  variant?: BadgeVariant;
}

const variantConfig: Record<BadgeVariant, { color: string; pointer: string }> = {
  purple: { color: '#6966E3', pointer: '/pointer.svg' },
  green: { color: '#5076DD', pointer: '/pointer.svg' },
  orange: { color: '#41C9C1', pointer: '/pointer.svg' },
};

export function Badge({
  children,
  rotation = 0,
  arrowPosition = 'right',
  arrowRotation = 0,
  className = '',
  style = {},
  variant = 'purple',
}: BadgeProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3',
  };

  const { color, pointer } = variantConfig[variant];

  return (
    <div
      className={`absolute ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
    >
      <div className="relative border-[4px] border-black px-4 py-3" style={{ backgroundColor: color }}>
        <span className="font-bold text-black text-xl tracking-tight capitalize whitespace-nowrap">
          {children}
        </span>

        <Image
          src={pointer}
          alt=""
          width={32}
          height={32}
          className={`absolute ${positionClasses[arrowPosition]}`}
          style={{ transform: `rotate(${arrowRotation}deg)` }}
        />
      </div>
    </div>
  );
}

export type { BadgeVariant };
