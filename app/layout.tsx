import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/Footer";
import IntroWrapper from "@/components/IntroWrapper";
import SmoothScroll from "@/components/SmoothScroll";
import ClickSpark from "@/components/ClickSpark";
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
    <html lang="es" suppressHydrationWarning>
      <body className={`${inter.variable} ${sora.variable} font-sans`} suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <LanguageProvider>
            <SmoothScroll>
              <ClickSpark
                sparkColor="#ffffff"
                sparkSize={10}
                sparkRadius={15}
                sparkCount={8}
                duration={400}
              >
                <IntroWrapper>
                  <Navbar />
                  {children}
                  <Footer />
                  <Toaster />
                </IntroWrapper>
              </ClickSpark>
            </SmoothScroll>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
