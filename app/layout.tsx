import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import IntroWrapper from "@/components/IntroWrapper";
import { LanguageProvider } from "@/context/LanguageContext";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const sora = Sora({ subsets: ["latin"], variable: "--font-sora" });

export const metadata: Metadata = {
  title: "Csanchezs | Desarrollador Full-Stack",
  description:
    "Csanchezs es un desarrollador Full-Stack apasionado por crear soluciones web excepcionales con React, Next.js, Node.js y TypeScript.",
  keywords: [
    "desarrollador",
    "full-stack",
    "react",
    "nextjs",
    "typescript",
    "nodejs",
    "web developer",
  ],
  authors: [{ name: "Camilo Sánchez" }],
  openGraph: {
    title: "Csanchezs | Desarrollador Full-Stack",
    description:
      "Desarrollador Full-Stack apasionado por crear soluciones web excepcionales.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <IntroWrapper>
              <Navbar />
              {children}
              <Toaster />
            </IntroWrapper>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
