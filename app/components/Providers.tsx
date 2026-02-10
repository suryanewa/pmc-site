"use client";

import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { AnimatedCursor } from "./AnimatedCursor";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      {children}
      <Toaster />
      <AnimatedCursor />
    </ThemeProvider>
  );
}
