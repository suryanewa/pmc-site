"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useState, ReactNode } from "react";

interface TransitionLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
}

export function TransitionLink({ href, children, className = "" }: TransitionLinkProps) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    setIsClicked(true);
    
    // Small delay for visual feedback
    await new Promise(resolve => setTimeout(resolve, 150));
    
    router.push(href);
  };

  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.1 }}
    >
      <Link 
        href={href} 
        onClick={handleClick}
        className={className}
      >
        <motion.span
          animate={isClicked ? { opacity: 0.5 } : { opacity: 1 }}
          transition={{ duration: 0.15 }}
          className="inline-block"
        >
          {children}
        </motion.span>
      </Link>
    </motion.div>
  );
}

// Animated button wrapper for click feedback
export function AnimatedButton({ 
  children, 
  onClick, 
  className = "",
  type = "button"
}: { 
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
}) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={className}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      {children}
    </motion.button>
  );
}
