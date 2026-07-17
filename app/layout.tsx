import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "gitlore.local";
  const protocol = incoming.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    title: "GitLore — Codebase Time Machine",
    description: "Trace the decisions, incidents, and people that shaped your software.",
    icons: { icon: "/favicon.svg" },
    openGraph: { title: "GitLore", description: "Every codebase has a story.", images: [`${origin}/og.png`] },
    twitter: { card: "summary_large_image", title: "GitLore", description: "Every codebase has a story.", images: [`${origin}/og.png`] },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
