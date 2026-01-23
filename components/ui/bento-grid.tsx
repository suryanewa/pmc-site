"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import Link from "next/link";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid md:auto-rows-[18rem] grid-cols-1 md:grid-cols-3 gap-4 max-w-7xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  icon,
  href,
  accentColor,
}: {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  accentColor?: string;
}) => {
  const content = (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "row-span-1 rounded-3xl group/bento hover:shadow-xl transition duration-200 shadow-input p-6 bg-white border border-transparent justify-between flex flex-col space-y-4 overflow-hidden relative",
        className
      )}
      style={{
        borderColor: accentColor ? `${accentColor}20` : undefined,
      }}
    >
      {/* Accent gradient overlay */}
      {accentColor && (
        <div
          className="absolute inset-0 opacity-0 group-hover/bento:opacity-10 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg, ${accentColor}40 0%, transparent 50%)`,
          }}
        />
      )}
      
      {header}
      <div className="group-hover/bento:translate-x-2 transition duration-200 relative z-10">
        {icon && (
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
            style={{ backgroundColor: accentColor ? `${accentColor}20` : '#f3f4f6' }}
          >
            {icon}
          </div>
        )}
        <div
          className="font-bold text-xl mb-2 tracking-tight"
          style={{ color: accentColor || '#041540' }}
        >
          {title}
        </div>
        <div className="text-sm text-neutral-600 leading-relaxed">
          {description}
        </div>
      </div>
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
};
