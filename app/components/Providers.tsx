"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";

const AnimatedCursor = dynamic(
  () => import("./AnimatedCursor").then((mod) => ({ default: mod.AnimatedCursor })),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const [enableCursor, setEnableCursor] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    const update = () => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const cpuCores = navigator.hardwareConcurrency ?? 8;
      setEnableCursor(mq.matches && !prefersReducedMotion && cpuCores >= 6);
    };

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    <>
      {children}
      <Toaster />
      {enableCursor ? <AnimatedCursor /> : null}
    </>
  );
}
