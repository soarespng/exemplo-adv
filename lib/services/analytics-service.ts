import { supabase } from "../supabase/client"
import { v4 as uuidv4 } from "uuid"
import type {
  PageView,
  ClickEvent,
  AnalyticsPeriod,
  PageViewsResponse,
  ClickEventsResponse,
  AnalyticsDashboardData,
} from "@/lib/types/analytics"

// Função para obter ou criar um ID de sessão
export const getSessionId = (): string => {
  if (typeof window === "undefined") return ""

  let sessionId = localStorage.getItem("analytics_session_id")

  if (!sessionId) {
    sessionId = uuidv4()
    localStorage.setItem("analytics_session_id", sessionId)

    // Definir expiração da sessão (30 minutos)
    const expiration = Date.now() + 30 * 60 * 1000
    localStorage.setItem("analytics_session_expiration", expiration.toString())
  } else {
    // Verificar se a sessão expirou
    const expiration = localStorage.getItem("analytics_session_expiration")
    if (expiration && Date.now() > Number.parseInt(expiration)) {
      // Criar nova sessão
      sessionId = uuidv4()
      localStorage.setItem("analytics_session_id", sessionId)

      // Atualizar expiração
      const newExpiration = Date.now() + 30 * 60 * 1000
      localStorage.setItem("analytics_session_expiration", newExpiration.toString())
    } else {
      // Renovar expiração
      const newExpiration = Date.now() + 30 * 60 * 1000
      localStorage.setItem("analytics_session_expiration", newExpiration.toString())
    }
  }

  return sessionId
}

const getDeviceType = (userAgent: string): string => {
  if (/mobile/i.test(userAgent)) {
    return 'Mobile';
  }
  if (/tablet/i.test(userAgent)) {
    return 'Tablet';
  }
  return 'Desktop'; // Default para desktop
};

// Função para rastrear visualização de página
export const trackPageView = async (path: string): Promise<void> => {
  try {
    const sessionId = getSessionId();
    const userAgent = navigator.userAgent;
    const deviceType = getDeviceType(userAgent)

    // Dados básicos da visualização
    const pageView: PageView = {
      page_path: path,
      session_id: sessionId,
      referrer: document.referrer || undefined,
      user_agent: userAgent,
      device_type: deviceType
    }

    // Enviar dados para o Supabase
    await supabase.from("page_views").insert(pageView)
  } catch (error) {
    console.error("Error tracking page view:", error)
  }
}

// Função para rastrear eventos de clique
export const trackClickEvent = async (eventName: string, elementId?: string, elementClass?: string): Promise<void> => {
  try {
    const sessionId = getSessionId()

    // Dados do evento de clique
    const clickEvent: ClickEvent = {
      event_name: eventName,
      element_id: elementId,
      element_class: elementClass,
      page_path: window.location.pathname,
      session_id: sessionId,
    }

    // Enviar dados para o Supabase
    await supabase.from("click_events").insert(clickEvent)
  } catch (error) {
    console.error("Error tracking click event:", error)
  }
}

// Função para obter dados de visualizações de página
export const getPageViewsData = async (period: AnalyticsPeriod): Promise<PageViewsResponse> => {
  try {
    // Obter contagem total de visualizações
    const { count: totalViews } = await supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", period.start_date)
      .lte("created_at", period.end_date)

    // Obter contagem de visitantes únicos
    const { data: uniqueVisitors } = await supabase
      .from("page_views")
      .select("session_id")
      .gte("created_at", period.start_date)
      .lte("created_at", period.end_date)

    const uniqueVisitorCount = new Set(uniqueVisitors?.map((v) => v.session_id)).size

    // Obter visualizações por página
    const { data: pageViewsByPath } = await supabase.rpc("get_page_views_by_path", {
      start_date: period.start_date,
      end_date: period.end_date,
    })

    // Obter visualizações diárias
    const { data: dailyViews } = await supabase.rpc("get_daily_views", {
      start_date: period.start_date,
      end_date: period.end_date,
    })

    return {
      total_views: totalViews || 0,
      unique_visitors: uniqueVisitorCount,
      page_views: pageViewsByPath || [],
      daily_views: dailyViews || [],
    }
  } catch (error) {
    console.error("Error fetching page views data:", error)
    return {
      total_views: 0,
      unique_visitors: 0,
      page_views: [],
      daily_views: [],
    }
  }
}

// Função para obter dados de eventos de clique
export const getClickEventsData = async (period: AnalyticsPeriod): Promise<ClickEventsResponse> => {
  try {
    // Obter contagem total de cliques
    const { count: totalClicks } = await supabase
      .from("click_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", period.start_date)
      .lte("created_at", period.end_date)

    // Obter eventos por nome
    const { data: eventsByName } = await supabase.rpc("get_events_by_name", {
      start_date: period.start_date,
      end_date: period.end_date,
    })

    // Obter eventos por página
    const { data: eventsByPage } = await supabase.rpc("get_events_by_page", {
      start_date: period.start_date,
      end_date: period.end_date,
    })

    return {
      total_clicks: totalClicks || 0,
      events_by_name: eventsByName || [],
      events_by_page: eventsByPage || [],
    }
  } catch (error) {
    console.error("Error fetching click events data:", error)
    return {
      total_clicks: 0,
      events_by_name: [],
      events_by_page: [],
    }
  }
}

// Função para obter todos os dados do dashboard
export const getDashboardData = async (period: AnalyticsPeriod): Promise<AnalyticsDashboardData> => {
  try {
    const [pageViewsData, clickEventsData, topReferrers, deviceBreakdown] = await Promise.all([
      getPageViewsData(period),
      getClickEventsData(period),
      getTopReferrers(period),
      getDeviceBreakdown(period),
    ])

    return {
      period,
      page_views: pageViewsData,
      click_events: clickEventsData,
      top_referrers: topReferrers,
      device_breakdown: deviceBreakdown,
    }
  } catch (error) {
    console.error("Error fetching dashboard data:", error)
    throw error
  }
}

// Função para obter os principais referenciadores
export const getTopReferrers = async (period: AnalyticsPeriod): Promise<{ referrer: string; count: number }[]> => {
  try {
    const { data } = await supabase.rpc("get_top_referrers", {
      start_date: period.start_date,
      end_date: period.end_date,
      limit_count: 10,
    })

    return data || []
  } catch (error) {
    console.error("Error fetching top referrers:", error)
    return []
  }
}

// Função para obter a distribuição de dispositivos
export const getDeviceBreakdown = async (
  period: AnalyticsPeriod,
): Promise<{ device_type: string; count: number; percentage: number }[]> => {
  try {
    const { data } = await supabase.rpc("get_device_breakdown", {
      start_date: period.start_date,
      end_date: period.end_date,
    })

    return data || []
  } catch (error) {
    console.error("Error fetching device breakdown:", error)
    return []
  }
}

