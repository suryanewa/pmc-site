interface BadgeProps {
  children: string;
  rotation?: number;
  arrowPosition?: 'top' | 'bottom' | 'left' | 'right';
  arrowRotation?: number;
  className?: string;
}

export function Badge({
  children,
  rotation = 0,
  arrowPosition = 'right',
  arrowRotation = 0,
  className = '',
}: BadgeProps) {
  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
    left: 'right-full top-1/2 -translate-y-1/2 mr-1',
    right: 'left-full top-1/2 -translate-y-1/2 ml-1',
  };

  return (
    <div
      className={`absolute ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="relative bg-[#AD1DE0] border-[4px] border-black px-4 py-3">
        <span className="font-bold text-black text-xl tracking-tight capitalize">
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
