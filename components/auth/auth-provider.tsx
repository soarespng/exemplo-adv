"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  useEffect(() => {
    // Configurar o listener de mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      // Apenas redirecionar em caso de logout
      if (event === "SIGNED_OUT") {
        router.push("/login")
      }
    })

    // Limpar o listener quando o componente for desmontado
    return () => {
      subscription.unsubscribe()
    }
  }, [router])

  return <>{children}</>
}

