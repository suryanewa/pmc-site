"use client"

import * as React from "react"
import { motion, type Variants } from "motion/react"
import { cn } from "@/lib/utils"

type AnimationType =
  | "fadeIn"
  | "fadeOut"
  | "blurIn"
  | "blurInUp"
  | "blurInDown"
  | "slideUp"
  | "slideDown"
  | "slideLeft"
  | "slideRight"
  | "scaleUp"
  | "scaleDown"

type AnimationVariant = {
  hidden: Variants["hidden"]
  show: Variants["show"]
  exit?: Variants["exit"]
}

const animationVariants: Record<AnimationType, AnimationVariant> = {
  fadeIn: {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  },
  fadeOut: {
    hidden: { opacity: 1 },
    show: { opacity: 0 },
  },
  blurIn: {
    hidden: { opacity: 0, filter: "blur(10px)" },
    show: { opacity: 1, filter: "blur(0px)" },
  },
  blurInUp: {
    hidden: { opacity: 0, filter: "blur(10px)", y: 20 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  blurInDown: {
    hidden: { opacity: 0, filter: "blur(10px)", y: -20 },
    show: { opacity: 1, filter: "blur(0px)", y: 0 },
  },
  slideUp: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  },
  slideDown: {
    hidden: { opacity: 0, y: -20 },
    show: { opacity: 1, y: 0 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: 20 },
    show: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    show: { opacity: 1, scale: 1 },
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    show: { opacity: 1, scale: 1 },
  },
}

const staggerTimings: Record<string, number> = {
  text: 0.06,
  word: 0.05,
  character: 0.03,
  line: 0.06,
}

interface TextAnimateProps {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  variants?: Variants
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span"
  by?: "text" | "word" | "character" | "line"
  startOnView?: boolean
  once?: boolean
  animation?: AnimationType
}

export function TextAnimate({
  children,
  className,
  delay = 0,
  duration = 0.3,
  variants,
  as: Component = "p",
  by = "word",
  startOnView = true,
  once = false,
  animation = "fadeIn",
}: TextAnimateProps) {
  const MotionComponent = motion[Component] as typeof motion.div

  const defaultVariants = animationVariants[animation]

  const containerVariants: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: staggerTimings[by],
        delayChildren: delay,
      },
    },
    exit: {
      transition: {
        staggerChildren: staggerTimings[by],
        staggerDirection: -1,
      },
    },
  }

  const itemVariants: Variants = variants || {
    hidden: defaultVariants.hidden,
    show: {
      ...(defaultVariants.show as object),
      transition: {
        duration,
        ease: [0.215, 0.61, 0.355, 1],
      },
    },
    exit: defaultVariants.exit || defaultVariants.hidden,
  }

  const splitText = () => {
    if (typeof children !== "string") {
      return [children]
    }
    switch (by) {
      case "text":
        return [children]
      case "word":
        return children.split(" ")
      case "character":
        return children.split("")
      case "line":
        return children.split("\n")
      default:
        return children.split(" ")
    }
  }

  const items = splitText()

  return (
    <MotionComponent
      className={cn(className)}
      initial="hidden"
      whileInView={startOnView ? "show" : undefined}
      animate={startOnView ? undefined : "show"}
      exit="exit"
      viewport={{ once }}
      variants={containerVariants}
    >
      {items.map((item, index) => (
        <motion.span
          key={index}
          className="inline-block"
          variants={itemVariants}
          style={{ whiteSpace: by === "character" ? "pre" : "normal" }}
        >
          {item}
          {typeof item === "string" && by === "word" && index < items.length - 1 && "\u00A0"}
          {typeof item === "string" && by === "line" && index < items.length - 1 && <br />}
        </motion.span>
      ))}
    </MotionComponent>
  )
}
