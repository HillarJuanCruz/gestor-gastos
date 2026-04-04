"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Usamos useEffect para marcar que ya estamos en el cliente
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // Si no está montado, mostramos un "placeholder" o nada
  // para evitar que el HTML del servidor sea distinto al del cliente
  if (!mounted) {
    return <div className="p-5" />; // Un espacio vacío del mismo tamaño que el botón
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-fourth hover:ring-2 ring-amber-500 transition-all"
      aria-label="Cambiar modo de color"
    >
      {theme === "dark" ? "🌙" : "☀️"}
    </button>
  );
}
