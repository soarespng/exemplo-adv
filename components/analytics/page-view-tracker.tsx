"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/lib/services/analytics-service"

export default function PageViewTracker() {
  const pathname = usePathname()
  const lastPathRef = useRef<string | null>(null)
  const isDashboard = pathname.startsWith("/dashboard");
  const isLogin = pathname.startsWith("/login");

  useEffect(() => {
    if (!isDashboard && !isLogin && pathname !== lastPathRef.current) {
      trackPageView(pathname)
      lastPathRef.current = pathname
    }
  }, [pathname])

  return null
}