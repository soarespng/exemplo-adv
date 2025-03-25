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

    // Executar todas as consultas em paralelo
    const [pageViewsResponse, clickEventsResponse, topReferrersResponse, deviceBreakdownResponse] = await Promise.all([
      fetch(`${request.nextUrl.origin}/api/analytics/page-views?start_date=${startDate}&end_date=${endDate}`, {
        headers: request.headers,
      }).then((res) => res.json()),

      fetch(`${request.nextUrl.origin}/api/analytics/click-events?start_date=${startDate}&end_date=${endDate}`, {
        headers: request.headers,
      }).then((res) => res.json()),

      supabase
        .rpc("get_top_referrers", {
          start_date: startDate,
          end_date: endDate,
          limit_count: 10,
        })
        .then(({ data }) => data || []),

      supabase
        .rpc("get_device_breakdown", {
          start_date: startDate,
          end_date: endDate,
        })
        .then(({ data }) => data || []),
    ])

    return NextResponse.json({
      period: {
        start_date: startDate,
        end_date: endDate,
      },
      page_views: pageViewsResponse,
      click_events: clickEventsResponse,
      top_referrers: topReferrersResponse,
      device_breakdown: deviceBreakdownResponse,
    })
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

