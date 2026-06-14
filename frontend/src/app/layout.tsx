import type { Metadata } from "next";
import "./globals.css";

const metadataBase =
  process.env.GITHUB_PAGES === "true"
    ? new URL("https://devapanchal.github.io/luminapath-ai-platform/")
    : new URL("https://luminapath.ai");

export const metadata: Metadata = {
  title: "LuminaPath AI | Adaptive Learning Platform",
  description:
    "Original AI-powered LMS with role dashboards, career roadmaps, ATS resume analysis, voice tutoring, collaborative study rooms, and adaptive revision.",
  metadataBase,
  openGraph: {
    title: "LuminaPath AI",
    description: "Adaptive learning platform for students, instructors, and admins.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
