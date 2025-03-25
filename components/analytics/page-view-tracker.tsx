"use client"

import { useEffect, useRef } from "react"
import { usePathname } from "next/navigation"
import { trackPageView } from "@/lib/services/analytics-service"

export default function PageViewTracker() {
  const pathname = usePathname()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    // Evitar rastreamento duplicado se o caminho não mudou
    if (pathname !== lastPathRef.current) {
      trackPageView(pathname)
      lastPathRef.current = pathname
    }
  }, [pathname])

  return null // Este componente não renderiza nada
}

