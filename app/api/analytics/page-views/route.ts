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

    // Obter contagem total de visualizações
    const { count: totalViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startDate)
      .lte("created_at", endDate)

    // Obter contagem de visitantes únicos
    const { data: uniqueVisitors } = await supabase
      .from("page_views")
      .select("session_id")
      .gte("created_at", startDate)
      .lte("created_at", endDate)

    const uniqueVisitorCount = new Set(uniqueVisitors?.map((v) => v.session_id)).size

    // Obter visualizações por página
    const { data: pageViewsByPath } = await supabase.rpc("get_page_views_by_path", {
      start_date: startDate,
      end_date: endDate,
    })

    // Obter visualizações diárias
    const { data: dailyViews } = await supabase.rpc("get_daily_views", {
      start_date: startDate,
      end_date: endDate,
    })

    return NextResponse.json({
      total_views: totalViews || 0,
      unique_visitors: uniqueVisitorCount,
      page_views: pageViewsByPath || [],
      daily_views: dailyViews || [],
    })
  } catch (error) {
    console.error("Error fetching page views:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

