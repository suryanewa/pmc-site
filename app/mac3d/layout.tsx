import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mac3D",
  description: "3D demo scene.",
};

export default function Mac3DLayout({ children }: { children: React.ReactNode }) {
  return children;
}

