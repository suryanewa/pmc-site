import { Button } from './Button';

interface NewsletterProps {
  variant?: 'light' | 'dark';
}

export function Newsletter({ variant = 'light' }: NewsletterProps) {
  const inputStyles = variant === 'light'
    ? 'border-black bg-white placeholder:text-black/50'
    : 'border-white bg-transparent text-white placeholder:text-white/50';

  return (
    <div className="flex">
      <input
        type="email"
        placeholder="eeg/email"
        className={`h-[46px] w-[198px] px-8 border text-base font-medium tracking-[-0.075em] focus:outline-none focus:ring-2 focus:ring-[#0115DF] ${inputStyles}`}
      />
      <Button className="w-[198px]">subscribe</Button>
    </div>
  );
}
