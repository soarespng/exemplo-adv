"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import RouteGuard from "@/components/auth/route-guard"
import { BarChart3, Activity, MessageSquare, LogOut, Menu, X } from "lucide-react"
import { useRouter, usePathname } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const supabase = createClientComponentClient()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  // Fechar sidebar em telas pequenas quando a rota muda
  useEffect(() => {
    setSidebarOpen(false)
  }, [pathname])

  // Fechar sidebar em telas pequenas quando a janela é redimensionada para um tamanho maior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setSidebarOpen(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const handleSignOut = async () => {
    if (isLoggingOut) return // Evitar múltiplos cliques

    try {
      setIsLoggingOut(true)

      // Método 1: Usar a API do Supabase diretamente
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Método 2: Fazer uma chamada para a API de signout como fallback
      try {
        await fetch("/api/auth/signout", {
          method: "POST",
          credentials: "include", // Importante para incluir cookies
        })
      } catch (apiError) {
        console.warn("Erro na API de signout, mas o logout do cliente foi bem-sucedido:", apiError)
      }

      // Limpar qualquer estado local
      localStorage.removeItem("analytics_session_id")
      localStorage.removeItem("analytics_session_expiration")

      // Forçar redirecionamento para a página de login
      document.cookie.split(";").forEach((c) => {
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
      })

      // Redirecionar para a página de login
      window.location.href = "/login"
      router.push("/login")
    } catch (error) {
      console.error("Falha ao fazer logout:", error)
      setIsLoggingOut(false)
      alert("Erro ao fazer logout. Por favor, tente novamente.")
    }
  }

  // Verificar qual rota está ativa
  const isActive = (path: string) => {
    if (path === "/dashboard" && pathname === "/dashboard") {
      return true
    }
    if (path !== "/dashboard" && pathname?.startsWith(path)) {
      return true
    }
    return false
  }

  return (
    <RouteGuard>
      <div className="min-h-screen flex bg-gray-50 relative">
        {/* Botão de menu para telas pequenas */}
        <div className="lg:hidden fixed top-4 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-white shadow-md"
          >
            {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Overlay para telas pequenas quando o sidebar está aberto */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside
          className={`
            bg-white shadow-md flex flex-col z-40
            lg:w-64 lg:fixed lg:h-screen lg:flex
            fixed h-screen w-[280px] transition-transform duration-200 ease-in-out
            ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}
        >
          {/* Logo e título */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-2">
              <div className="bg-[#8C583A] p-2 rounded-md">
                <BarChart3 className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold text-[#262425]">Dra. Oliveira</h1>
            </div>
          </div>

          {/* Menu de navegação */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            <Link
              href="/dashboard"
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 
                ${isActive("/dashboard") ? "bg-gray-100 text-[#8C583A] font-medium" : "text-gray-600"}`}
            >
              <Activity className="h-4 w-4" />
              Visão Geral
            </Link>
            <Link
              href="/dashboard/contacts"
              className={`flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 
                ${isActive("/dashboard/contacts") ? "bg-gray-100 text-[#8C583A] font-medium" : "text-gray-600"}`}
            >
              <MessageSquare className="h-4 w-4" />
              Contatos
            </Link>
          </nav>

          {/* Seção de ajuda */}
          <div className="p-4 border-t">
            <div className="mb-4 p-4 bg-[#F9F5F0] rounded-lg">
              <h3 className="font-medium text-[#8C583A] mb-2">Precisa de ajuda?</h3>
              <p className="text-sm text-gray-600 mb-3">
                Entre em contato com nosso suporte para dúvidas sobre o dashboard.
              </p>
              <Button size="sm" className="w-full bg-[#8C583A] hover:bg-[#733030]">
                Suporte
              </Button>
            </div>

            {/* Botão de logout */}
            <form action="/api/auth/signout" method="post">
              <Button
                type="submit"
                disabled={isLoggingOut}
                variant="outline"
                className="w-full flex items-center justify-center gap-2 text-gray-700 border-gray-300"
              >
                {isLoggingOut ? (
                  <>
                    <div className="h-4 w-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin mr-1"></div>
                    Saindo...
                  </>
                ) : (
                  <span onClick={() => {handleSignOut()}}>
                    <LogOut className="h-4 w-4" />
                    Sair
                  </span>
                )}
              </Button>
            </form>
          </div>
        </aside>

        {/* Conteúdo principal com scroll */}
        <main className="lg:ml-64 flex-1 p-4 md:p-6 overflow-y-auto max-h-screen pt-16 lg:pt-6">{children}</main>
      </div>
    </RouteGuard>
  )
}

