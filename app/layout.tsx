import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import ThemeToggle from "@/components/ThemeToggle";
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
          <header className="min-w-50 w-1/5 bg-first">
            <nav className="h-full text-center text-2xl px-4 py-12 font-semibold flex flex-col  items-center">
              <div className="w-full flex justify-between">

              </div>
              <div className="h-16 w-16 bg-white rounded-full"></div>
              <span className="h-min mt-6 text-white text-3xl">GestorDeGastos</span>
              {/* 3. Colocamos el botón aquí para probarlo rápido */}

            </nav>
          </header>

          {/* El contenido principal ocupa el resto del espacio */}
          <main className="flex-1 overflow-y-auto w-full h-dvh mx-auto bg-[#EFEFEF]">
            <header className="bg-white w-full p-6 pl-6 text-left flex justify-between items-center">
              <div className="">
                <h1 className="text-3xl font-bold text-gray-900">Mi Gestor de Gastos</h1>
                <p className="text-gray-500">Gestor de gastos personales</p>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <div className="h-12 w-12 rounded-full bg-fourth"></div>
              </div>
            </header>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
