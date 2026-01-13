interface PolaroidProps {
  src: string;
  alt: string;
  caption?: string;
  rotation?: number;
  className?: string;
}

export function Polaroid({
  src,
  alt,
  caption,
  rotation = 0,
  className = '',
}: PolaroidProps) {
  return (
    <div
      className={`bg-white p-3 pb-12 shadow-lg ${className}`}
      style={{ transform: `rotate(${rotation}deg)` }}
    >
      <div className="w-full aspect-[4/3] overflow-hidden">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
        />
      </div>
      {caption && (
        <p className="mt-2 text-center text-sm text-gray-700 font-medium">
          {caption}
        </p>
      )}
    </div>
  );
}
