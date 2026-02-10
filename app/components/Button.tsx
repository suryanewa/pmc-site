"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

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
  rippleColor?: string;
  animated?: boolean;
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
  rippleColor,
  animated = true,
}: ButtonProps) {
  void rippleColor;
  const sizeStyles = {
    default: {
      outer: 'h-12',
      inner: 'px-3 py-1 text-sm',
    },
    lg: {
      outer: 'h-14',
      inner: 'px-4 py-2 text-base',
    },
  };

  const baseStyles =
    'group relative inline-flex overflow-hidden rounded-full !p-[1.5px] !border-0 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 transition-transform duration-200 ease-out hover:scale-[1.04] active:scale-[0.97]';

  const disabledStyles = disabled ? 'opacity-50 pointer-events-none' : '';

  const commonClassName = cn(
    className,
    baseStyles,
    sizeStyles[size].outer,
    disabledStyles
  );

  const innerClassName = cn(
    'inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full font-medium text-white backdrop-blur-3xl transition-[background-color,box-shadow] duration-200 ease-out group-hover:shadow-[inset_0_0_20px_rgba(65,201,193,0.15)] group-active:bg-white/[0.06]',
    !fillColor && 'bg-slate-950',
    sizeStyles[size].inner
  );

  const innerStyle = {
    backgroundColor: fillColor || undefined,
    color: textColor || undefined,
  } as React.CSSProperties;

  const borderStyle = {
    backgroundColor: borderColor || fillColor || '#41C9C1',
  } as React.CSSProperties;

  const content = (
    <>
      {animated ? (
        <span
          className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#41C9C1_0%,#5076DD_50%,#41C9C1_100%)]"
          aria-hidden="true"
        />
      ) : (
        <span className="absolute inset-0" style={borderStyle} aria-hidden="true" />
      )}
      <span className={cn(innerClassName, "relative z-10")} style={innerStyle}>
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={commonClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button
      className={commonClassName}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </button>
  );
}
