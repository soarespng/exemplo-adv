"use client"

import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import RouteGuard from "@/components/auth/route-guard"
import { BarChart3, Activity, MessageSquare, LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  return (
    <RouteGuard>
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar fixo */}
        <aside className="w-64 bg-white shadow-md fixed h-screen flex flex-col">
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
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-[#262425] font-medium"
            >
              <Activity className="h-4 w-4" />
              Visão Geral
            </Link>
            {/* <Link
              href="/dashboard/visitors"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <Users className="h-4 w-4" />
              Visitantes
            </Link> */}
            <Link
              href="/dashboard/contacts"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <MessageSquare className="h-4 w-4" />
              Contatos
            </Link>
            {/* <Link
              href="/dashboard/conversions"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <BarChart3 className="h-4 w-4" />
              Conversões
            </Link>
            <Link
              href="/dashboard/schedule"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <Calendar className="h-4 w-4" />
              Agendamentos
            </Link>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2 p-2 rounded-md hover:bg-gray-100 text-gray-600"
            >
              <Settings className="h-4 w-4" />
              Configurações
            </Link> */}
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
            <Button
              onClick={handleSignOut}
              variant="outline"
              className="w-full flex items-center justify-center gap-2 text-gray-700 border-gray-300"
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Button>
          </div>
        </aside>

        {/* Conteúdo principal com scroll */}
        <main className="ml-64 flex-1 p-6 overflow-y-auto max-h-screen">{children}</main>
      </div>
    </RouteGuard>
  )
}

