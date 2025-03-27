"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { MessageCircle } from "lucide-react"
import type { ButtonHTMLAttributes } from "react"

interface WhatsAppButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  phoneNumber: string
  message?: string
  className?: string
  buttonText?: string
  children?: React.ReactNode
}

export default function WhatsAppButton({
  phoneNumber,
  message = "Olá! Gostaria de mais informações sobre seus serviços.",
  className,
  buttonText,
  children,
  onClick,
  ...props
}: WhatsAppButtonProps) {
  // Remove any non-numeric characters from phone number
  const formattedPhone = phoneNumber.replace(/\D/g, "")

  // Encode the message for URL
  const encodedMessage = encodeURIComponent(message)

  // Create WhatsApp URL
  const whatsappUrl = `https://wa.me/${formattedPhone}?text=${encodedMessage}`

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Execute the original onClick if provided
    if (onClick) {
      onClick(e)
    }

    // Open WhatsApp in a new window
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button onClick={handleClick} className={`bg-[#25D366] hover:bg-[#128C7E] text-white ${className}`} {...props}>
      {buttonText || children || "Enviar Mensagem"}
      <MessageCircle className="h-4 w-4" />
    </Button>
  )
}

