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
          <header className="min-w-[280px] w-1/5 bg-slate-900 dark:bg-slate-950 border-r border-border">
            <nav className="h-full text-center text-2xl px-4 py-12 font-semibold flex flex-col items-center">
              <div className="w-full flex justify-between">
              </div>
              <div className="h-16 w-16 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center shadow-sm">
                <span className="text-slate-900 dark:text-white text-base">GG</span>
              </div>
              <span className="h-min mt-6 text-white text-2xl tracking-tight">Gestor de Gastos</span>
            </nav>
          </header>

          {/* El contenido principal ocupa el resto del espacio */}
          <main className="flex-1 overflow-y-auto w-full h-dvh mx-auto bg-background text-foreground transition-colors duration-300">
            <header className="bg-card w-full p-6 pl-6 text-left flex justify-between items-center border-b border-border shadow-sm">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Mi Gestor de Gastos</h1>
                <p className="text-muted-foreground mt-1">Gestor de gastos personales</p>
              </div>
              <div className="flex items-center space-x-4">
                <ThemeToggle />
                <UserProfile />
                <LogoutButton />
              </div>
            </header>
            <div className="p-6 max-w-6xl mx-auto">
              {children}
            </div>
          </main>
    </>
  );
}
