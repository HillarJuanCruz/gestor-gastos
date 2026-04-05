"use client"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { MoveRight } from "lucide-react"

export default function LoginPage() {
  const supabase = createClient()

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
<div className="flex items-center justify-center min-h-screen bg-slate-50 px-4">
      <Card className="w-full max-w-md shadow-lg border-t-4 border-t-second">
        <CardHeader className="space-y-1 flex flex-col items-center">
          <div className="w-12 h-12 bg-second/10 rounded-full flex items-center justify-center mb-2">
            <span className="text-second font-bold text-xl">$</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Gestor de Gastos
          </CardTitle>
          <CardDescription>
            Inicia sesión para administrar tus finanzas
          </CardDescription>
        </CardHeader>

        <CardContent className="grid gap-4 py-6">
          <Button
            onClick={handleGoogleLogin}
            variant="outline"
            className="w-full h-12 flex gap-3 hover:bg-slate-50 transition-colors"
          >
            <MoveRight className="w-5 h-5 text-second" />
            <span className="font-medium">Continuar con Google</span>
          </Button>
        </CardContent>

        <CardFooter className="flex flex-col gap-2 border-t pt-4">
          <p className="text-xs text-center text-muted-foreground">
            Al continuar, aceptas nuestros términos y condiciones.
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
