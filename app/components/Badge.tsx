interface BadgeProps {
  children: string;
  rotation?: number;
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowRotation?: number;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  children,
  rotation = 0,
  arrowPosition = 'right',
  arrowRotation = 0,
  className = '',
  style = {},
}: BadgeProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-3',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-3',
    left: 'right-full top-1/2 -translate-y-1/2 mr-3',
    right: 'left-full top-1/2 -translate-y-1/2 ml-3',
  };

  return (
    <div
      className={`absolute ${className}`}
      style={{ transform: `rotate(${rotation}deg)`, ...style }}
    >
      <div className="relative bg-[#AD1DE0] border-[4px] border-black px-4 py-3">
        <span className="font-bold text-black text-xl tracking-tight capitalize whitespace-nowrap">
          {children}
        </span>

        <img
          src="/pointer.svg"
          alt=""
          className={`absolute ${positionClasses[arrowPosition]}`}
          style={{ transform: `rotate(${arrowRotation}deg)` }}
        />
      </div>
    </div>
  );
}
