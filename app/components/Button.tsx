import Link from 'next/link';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import PixelFillCanvas from './PixelFillCanvas';

const MotionLink = motion(Link);

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
  href?: string;
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
  href,
}: ButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const buttonRef = useRef<HTMLElement>(null);

  const sizeStyles = {
    default: 'h-[46px] text-base',
    lg: 'h-[55px] text-lg',
  };

  const isCustom = fillColor || borderColor;
  const isOutlined = borderColor && !fillColor;

  const baseStyles = 'relative overflow-hidden font-medium px-8 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed group cursor-pointer transition-transform';

  const inlineStyles: React.CSSProperties = {};

  if (isCustom) {
    if (isOutlined) {
      inlineStyles.backgroundColor = 'transparent';
      inlineStyles.borderWidth = '2px';
      inlineStyles.borderStyle = 'solid';
      inlineStyles.borderColor = borderColor;
      inlineStyles.color = textColor || borderColor;
    } else {
      inlineStyles.backgroundColor = fillColor;
      inlineStyles.color = textColor || 'white';
      if (borderColor) {
        inlineStyles.borderWidth = '2px';
        inlineStyles.borderStyle = 'solid';
        inlineStyles.borderColor = borderColor;
      }
    }
  }

  const defaultStyles = !isCustom
    ? 'bg-[#041540] text-white focus:ring-[#0115DF]'
    : '';

  const handleMouseEnter = (e: React.MouseEvent) => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMousePos({
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      });
    }
    setIsHovered(true);
  };

  const content = (
    <>
      <PixelFillCanvas
        active={isHovered}
        origin={mousePos}
        color="#0115DF"
        gap={12}
        speed={1.0}
        className="z-0"
      />
      <span className={`relative z-10 transition-colors duration-300 ${isHovered ? 'text-white' : ''}`}>
        {children}
      </span>
    </>
  );

  const commonProps = {
    className: `${baseStyles} ${sizeStyles[size]} ${defaultStyles} ${className}`,
    style: isCustom ? inlineStyles : undefined,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: () => setIsHovered(false),
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
  };

  if (href) {
    return (
      <MotionLink 
        href={href} 
        onClick={onClick}
        {...(commonProps as any)}
        ref={buttonRef as any}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      {...commonProps}
      type={type}
      onClick={onClick}
      disabled={disabled}
      ref={buttonRef as any}
    >
      {content}
    </motion.button>
  );
}
