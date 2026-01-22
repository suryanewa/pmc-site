interface ButtonProps {
  children: React.ReactNode;
  size?: 'default' | 'lg';
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
  fillColor?: string;
  borderColor?: string;
  textColor?: string;
  hoverFillColor?: string;
}

export function Button({
  children,
  size = 'default',
  onClick,
  disabled,
  type = 'button',
  className = '',
  fillColor,
  borderColor,
  textColor,
  hoverFillColor,
}: ButtonProps) {
  const sizeStyles = {
    default: 'h-[46px] text-base',
    lg: 'h-[55px] text-lg',
  };

  // Determine if this is a custom colored button or default
  const isCustom = fillColor || borderColor;

  // For outlined buttons (borderColor only, no fillColor)
  const isOutlined = borderColor && !fillColor;

  const baseStyles = 'font-medium px-8 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Build inline styles for custom colors
  const inlineStyles: React.CSSProperties = {};

  if (isCustom) {
    if (isOutlined) {
      // Outlined button: transparent bg, colored border and text
      inlineStyles.backgroundColor = 'transparent';
      inlineStyles.borderWidth = '2px';
      inlineStyles.borderStyle = 'solid';
      inlineStyles.borderColor = borderColor;
      inlineStyles.color = textColor || borderColor;
    } else {
      // Filled button
      inlineStyles.backgroundColor = fillColor;
      inlineStyles.color = textColor || 'white';
      if (borderColor) {
        inlineStyles.borderWidth = '2px';
        inlineStyles.borderStyle = 'solid';
        inlineStyles.borderColor = borderColor;
      }
    }
  }

  // Default styles when no custom colors
  const defaultStyles = !isCustom
    ? 'bg-[#0115DF] text-white hover:bg-[#0010b8] focus:ring-[#0115DF]'
    : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${defaultStyles} ${className}`}
      style={isCustom ? inlineStyles : undefined}
      onMouseEnter={hoverFillColor ? (e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = hoverFillColor;
      } : undefined}
      onMouseLeave={hoverFillColor ? (e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundColor = isOutlined ? 'transparent' : (fillColor || '');
      } : undefined}
    >
      {children}
    </button>
  );
}
