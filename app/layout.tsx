import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const geistPoppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Gestor de gastos",
  description: "Gestor de gastos personal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={cn("h-full", "antialiased", geistPoppins.variable, "font-sans", geist.variable)}
      // 1. Agregamos esto para evitar el aviso de hidratación por el tema
      suppressHydrationWarning
    >
      <body className={`${geistPoppins.variable} min-h-full flex flex-row antialiased`}>
        {/* 2. Envolvemos TODO con el ThemeProvider */}
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
