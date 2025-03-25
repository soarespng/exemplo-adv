"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Skeleton } from "@/components/ui/skeleton"

interface RouteGuardProps {
  children: React.ReactNode
}

export default function RouteGuard({ children }: RouteGuardProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data } = await supabase.auth.getSession()

        if (data.session) {
          setIsAuthenticated(true)
        } else {
          // Redirecionar para login se não estiver autenticado
          router.push("/login")
        }
      } catch (error) {
        console.error("Error checking authentication:", error)
        router.push("/login")
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

  // Mostrar um indicador de carregamento enquanto verifica a autenticação
  if (isLoading) {
    return (
      <div className="flex flex-col gap-4 p-8">
        <Skeleton className="h-8 w-full max-w-sm" />
        <Skeleton className="h-8 w-full max-w-sm" />
        <Skeleton className="h-8 w-full max-w-sm" />
      </div>
    )
  }

  // Se autenticado, renderizar o conteúdo da página
  return isAuthenticated ? <>{children}</> : null
}

