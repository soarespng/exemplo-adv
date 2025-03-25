import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase/client"

export async function GET(request: NextRequest) {
  try {
    // Obter cliente Supabase para o servidor
    const supabase = await createServerSupabaseClient()

    // Verificar autenticação
    const {
      data: { session },
    } = await supabase.auth.getSession()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Obter parâmetros de consulta
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get("start_date") || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
    const endDate = searchParams.get("end_date") || new Date().toISOString()

    // Obter contagem total de cliques
    const { count: totalClicks } = await supabase
      .from("click_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startDate)
      .lte("created_at", endDate)

    // Obter eventos por nome
    const { data: eventsByName } = await supabase.rpc("get_events_by_name", {
      start_date: startDate,
      end_date: endDate,
    })

    // Obter eventos por página
    const { data: eventsByPage } = await supabase.rpc("get_events_by_page", {
      start_date: startDate,
      end_date: endDate,
    })

    return NextResponse.json({
      total_clicks: totalClicks || 0,
      events_by_name: eventsByName || [],
      events_by_page: eventsByPage || [],
    })
  } catch (error) {
    console.error("Error fetching click events:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

