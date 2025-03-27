import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function POST(request: Request) {
  try {
    // Corrigindo o uso de cookies() para compatibilidade com TypeScript
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Fazer logout
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Erro ao fazer logout:", error)
      return NextResponse.json({ error: "Erro ao fazer logout" }, { status: 500 })
    }

    // Redirecionar para a página de login
    return NextResponse.redirect(new URL("/login", request.url), {
      status: 302,
    })
  } catch (error) {
    console.error("Erro ao fazer logout:", error)
    return NextResponse.json({ error: "Erro ao fazer logout" }, { status: 500 })
  }
}

