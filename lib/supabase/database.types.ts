export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      page_views: {
        Row: {
          id: string
          page_path: string
          referrer: string | null
          user_agent: string | null
          ip_address: string | null
          session_id: string
          created_at: string | null
          country: string | null
          city: string | null
          device_type: string | null
        }
        Insert: {
          id?: string
          page_path: string
          referrer?: string | null
          user_agent?: string | null
          ip_address?: string | null
          session_id: string
          created_at?: string | null
          country?: string | null
          city?: string | null
          device_type?: string | null
        }
        Update: {
          id?: string
          page_path?: string
          referrer?: string | null
          user_agent?: string | null
          ip_address?: string | null
          session_id?: string
          created_at?: string | null
          country?: string | null
          city?: string | null
          device_type?: string | null
        }
      }
      click_events: {
        Row: {
          id: string
          event_name: string
          element_id: string | null
          element_class: string | null
          page_path: string
          session_id: string
          created_at: string | null
        }
        Insert: {
          id?: string
          event_name: string
          element_id?: string | null
          element_class?: string | null
          page_path: string
          session_id: string
          created_at?: string | null
        }
        Update: {
          id?: string
          event_name?: string
          element_id?: string | null
          element_class?: string | null
          page_path?: string
          session_id?: string
          created_at?: string | null
        }
      }
      daily_metrics: {
        Row: {
          id: string
          date: string
          page_path: string
          view_count: number
          unique_visitors: number
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          date: string
          page_path: string
          view_count?: number
          unique_visitors?: number
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          date?: string
          page_path?: string
          view_count?: number
          unique_visitors?: number
          created_at?: string | null
          updated_at?: string | null
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          service: string | null
          budget: string | null
          message: string
          status: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          service?: string | null
          budget?: string | null
          message: string
          status?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          service?: string | null
          budget?: string | null
          message?: string
          status?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_page_views_by_path: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          page_path: string
          view_count: number
        }[]
      }
      get_daily_views: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          date: string
          view_count: number
        }[]
      }
      get_events_by_name: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          event_name: string
          count: number
        }[]
      }
      get_events_by_page: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          page_path: string
          count: number
        }[]
      }
      get_top_referrers: {
        Args: {
          start_date: string
          end_date: string
          limit_count: number
        }
        Returns: {
          referrer: string
          count: number
        }[]
      }
      get_device_breakdown: {
        Args: {
          start_date: string
          end_date: string
        }
        Returns: {
          device_type: string
          count: number
          percentage: number
        }[]
      }
      aggregate_daily_metrics: {
        Args: {
          target_date: string
        }
        Returns: void
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

