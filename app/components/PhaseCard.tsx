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
  const sideClassName = side === 'right' ? 'ml-auto' : 'mr-auto';
  return (
    <div className={`w-[350px] ${sideClassName} ${className}`}>
      <div className="bg-[#41C9C1] px-4 py-2 rounded-t-lg">
        <span className="block w-full text-black font-bold text-center text-lg tracking-tight">{title}</span>
      </div>
      <div className="bg-[#3F3F3F] p-4 rounded-b-lg"> 
        <p className="text-[#DBDBDB] font-medium text-lg tracking-tight leading-snug">{description}</p>
      </div>
    </div>
  );
}
