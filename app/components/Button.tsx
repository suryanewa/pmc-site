interface ButtonProps {
  children: React.ReactNode;
  size?: 'default' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export function Button({
  children,
  size = 'default',
  onClick,
  disabled,
  type = 'button',
  className = '',
}: ButtonProps) {
  const baseStyles =
    'bg-[#0115DF] text-white font-medium px-8 flex items-center justify-center transition-colors hover:bg-[#0010b8] focus:outline-none focus:ring-2 focus:ring-[#0115DF] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    default: 'h-[46px] text-base',
    lg: 'h-[55px] text-lg',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </button>
  );
}
