interface PhaseCardProps {
  title: string;
  description: string;
  side?: 'left' | 'right';
  className?: string;
}

export function PhaseCard({
  title,
  description,
  side = 'left',
  className = '',
}: PhaseCardProps) {
  return (
    <div className={`w-[350px] ${className}`}>
      <div className="bg-[#0115DF] px-4 py-2 rounded-t-lg">
        <span className="block w-full text-white font-bold text-center text-lg tracking-tight">{title}</span>
      </div>
      <div className="bg-white p-4 rounded-b-lg"> 
        <p className="text-black font-medium text-lg tracking-tight leading-snug">{description}</p>
      </div>
    </div>
  );
}
