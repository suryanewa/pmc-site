"use client"

import {
  CircleCheckIcon,
  InfoIcon,
  Loader2Icon,
  OctagonXIcon,
  TriangleAlertIcon,
} from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, type ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      className="toaster group eeg-toaster"
      duration={2800}
      position="bottom-center"
      icons={{
        success: <CircleCheckIcon className="size-4 text-[#41C9C1]" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin text-[#41C9C1]" />,
      }}
      toastOptions={{
        classNames: {
          toast: "eeg-toast",
        },
      }}
      style={
        {
          "--normal-bg": "#3F3F3F",
          "--normal-text": "#DBDBDB",
          "--normal-border": "rgba(219, 219, 219, 0.2)",
          "--border-radius": "0.625rem",
          fontFamily: "var(--font-gotham-medium), var(--font-geist-sans), system-ui, sans-serif",
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
