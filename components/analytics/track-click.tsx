"use client"

import type React from "react"
import { cloneElement, isValidElement } from "react"
import { trackClickEvent } from "@/lib/services/analytics-service"

interface TrackClickProps {
  eventName: string
  elementId?: string
  elementClass?: string
  children: React.ReactElement
}

export default function TrackClick({ eventName, elementId, elementClass, children }: TrackClickProps) {
  if (!isValidElement(children)) {
    console.error("TrackClick expects a single React element as children")
    return null
  }

  // Definir o tipo do elemento filho com uma interface que inclui onClick opcional
  const child = children as React.ReactElement<{ onClick?: (e: React.MouseEvent) => void }>

  const handleClick = (e: React.MouseEvent) => {
    // Track the click event
    trackClickEvent(eventName, elementId, elementClass)

    // Execute the original onClick if it exists
    if (child.props.onClick) {
      child.props.onClick(e)
    }
  }

  // Clone the child element and add our click handler
  return cloneElement(child, {
    onClick: handleClick,
  })
}

