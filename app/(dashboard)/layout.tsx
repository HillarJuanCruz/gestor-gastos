import type { Metadata } from "next";
import ThemeToggle from "@/components/ThemeToggle";
import { LogoutButton } from "@/app/(dashboard)/components/LogoutButton";
import { UserProfile } from "./components/UserProfile";

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
    <>
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
                <UserProfile />
                <LogoutButton />
              </div>
            </header>
            {children}
          </main>
    </>
  );
}
