"use client";

import dynamic from "next/dynamic";
import { Toaster } from "@/components/ui/sonner";

const AnimatedCursor = dynamic(
  () => import("./AnimatedCursor").then((mod) => ({ default: mod.AnimatedCursor })),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <Toaster />
      <AnimatedCursor />
    </>
  );
}
