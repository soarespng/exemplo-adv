export interface PageView {
  id?: string
  page_path: string
  referrer?: string
  user_agent?: string
  ip_address?: string
  session_id: string
  created_at?: string
  country?: string
  city?: string
  device_type?: string
}

export interface ClickEvent {
  id?: string
  event_name: string
  element_id?: string
  element_class?: string
  page_path: string
  session_id: string
  created_at?: string
}

export interface DailyMetric {
  id?: string
  date: string
  page_path: string
  view_count: number
  unique_visitors: number
  created_at?: string
  updated_at?: string
}

export interface AnalyticsPeriod {
  start_date: string
  end_date: string
}

export interface PageViewsResponse {
  total_views: number
  unique_visitors: number
  page_views: {
    page_path: string
    view_count: number
  }[]
  daily_views: {
    date: string
    view_count: number
  }[]
}

export interface ClickEventsResponse {
  total_clicks: number
  events_by_name: {
    event_name: string
    count: number
  }[]
  events_by_page: {
    page_path: string
    count: number
  }[]
}

export interface AnalyticsDashboardData {
  period: AnalyticsPeriod
  page_views: PageViewsResponse
  click_events: ClickEventsResponse
  top_referrers: {
    referrer: string
    count: number
  }[]
  device_breakdown: {
    device_type: string
    count: number
    percentage: number
  }[]
}

