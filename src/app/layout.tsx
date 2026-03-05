import type { Metadata } from "next";
import "./globals.css";
import { ResumeProvider } from "@/context/ResumeContext";

export const metadata: Metadata = {
  title: "ResumeAI — Build Your AI Resume in Seconds",
  description:
    "Generate ATS-optimized professional resumes instantly using AI. Modern, clean, and ready to download as PDF.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <ResumeProvider>{children}</ResumeProvider>
      </body>
    </html>
  );
}
