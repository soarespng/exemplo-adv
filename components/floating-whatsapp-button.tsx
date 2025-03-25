"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MessageCircle, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import TrackClick from "./analytics/track-click"

interface FloatingWhatsAppButtonProps {
  phoneNumber: string
  message?: string
  position?: "bottom-right" | "bottom-left"
  showOnMobile?: boolean
  delay?: number
}

export default function FloatingWhatsAppButton({
  phoneNumber,
  message = "Olá! Gostaria de mais informações sobre seus serviços.",
  position = "bottom-right",
  showOnMobile = true,
  delay = 2000,
}: FloatingWhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  // Remove any non-numeric characters from phone number
  const formattedPhone = phoneNumber.replace(/\D/g, "")

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message)

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`

  useEffect(() => {
    // Show button after delay
    const timer = setTimeout(() => {
      if (!isDismissed) {
        setIsVisible(true)
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, isDismissed])

  const handleClick = () => {
    window.open(whatsappUrl, "_blank")
  }

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsVisible(false)
    setIsDismissed(true)
  }

  if (!isVisible) return null

  const positionClasses = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
  }

  return (
    <div
      className={`fixed ${positionClasses[position]} z-50 ${
        !showOnMobile ? "hidden md:block" : ""
      } transition-all duration-300 ease-in-out transform ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
    >
      <div className="flex flex-col items-end">
        <div className="bg-white p-3 rounded-lg shadow-lg mb-2 max-w-sm">
          <div className="flex justify-between items-start mb-2">
            <span className="font-medium">Precisa de ajuda?</span>
            <button onClick={handleDismiss} className="text-gray-400 hover:text-gray-600">
              <X size={16} />
            </button>
          </div>
          <p className="text-sm text-gray-600 mb-2">Converse com um de nossos advogados agora mesmo pelo WhatsApp.</p>
        </div>
        <TrackClick eventName="floating_wpp_click" elementId="floating-wpp-cta">
          <Button onClick={handleClick} className="bg-[#25D366] hover:bg-[#128C7E] text-white rounded-full p-4 shadow-lg">
            <MessageCircle size={24} />
          </Button>
        </TrackClick>
      </div>
    </div>
  )
}

