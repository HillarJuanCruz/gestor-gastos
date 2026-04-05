"use client"

import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const supabase = createClient()
  const router = useRouter()

  const handleLogout = async () => {
    // 1. Avisar a Supabase que cierre la sesión
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error al cerrar sesión:", error.message)
    } else {
      router.push("/login")
      router.refresh()
    }
  }

  return (
    <Button
      variant="ghost"
      onClick={handleLogout}
      className="text-red-500 hover:text-red-700 hover:bg-red-50"
    >
      <LogOut className="mr-2 h-4 w-4" />
      Cerrar Sesión
    </Button>
  )
}
