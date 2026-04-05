"use client"
import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import Image from "next/image"
import { User } from "@supabase/supabase-js"

export function UserProfile() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const supabase = createClient()
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  if (!user) return null

  const avatarUrl = user.user_metadata.avatar_url
  console.log("Avatar URL:", avatarUrl)
  return (
    <div className="flex items-center gap-2">
      <Image
        src={avatarUrl}
        alt="Foto de perfil"
        width={40}
        height={40}
        className="rounded-full border"
      />
    </div>
  )
}
