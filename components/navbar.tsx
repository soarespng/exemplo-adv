"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X, Search, ShoppingCart, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import TrackClick from "./analytics/track-click"

interface TypographyProps {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
}

interface NavbarTypographyProps {
  logo?: TypographyProps
  links?: TypographyProps
  dropdown?: TypographyProps
  cta?: TypographyProps
}

interface NavbarDropdownProps {
  logo: string
  logoSrc?: string
  links: Array<{
    text: string
    href: string
    isActive?: boolean
    dropdown?: Array<{
      text: string
      href: string
    }>
  }>
  ctaButton?: {
    text: string
    href: string
  }
  showSearch?: boolean
  showCart?: boolean
  showProfile?: boolean
  backgroundColor?: string
  textColor?: string
  activeTextColor?: string
  hoverTextColor?: string
  dropdownBackgroundColor?: string
  ctaButtonStyle?: {
    backgroundColor?: string
    textColor?: string
    hoverBackgroundColor?: string
    hoverTextColor?: string
  }
  height?: string
  sticky?: boolean
  transparentOnTop?: boolean
  typography?: NavbarTypographyProps
}

export default function Navbar({
  logo = "Logo",
  logoSrc,
  links = [],
  ctaButton,
  showSearch = false,
  showCart = false,
  showProfile = false,
  backgroundColor = "bg-white",
  textColor = "text-gray-700",
  activeTextColor = "text-primary",
  hoverTextColor = "text-gray-900",
  dropdownBackgroundColor = "bg-white",
  ctaButtonStyle = {
    backgroundColor: "bg-primary",
    textColor: "text-white",
    hoverBackgroundColor: "bg-primary/90",
    hoverTextColor: "text-white",
  },
  height = "h-20",
  sticky = false,
  transparentOnTop = false,
  typography = {
    logo: {
      fontFamily: "font-sans",
      fontSize: "text-xl",
      fontWeight: "font-bold",
      fontStyle: "normal",
    },
    links: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
    dropdown: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
    cta: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
  },
}: NavbarDropdownProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    if (transparentOnTop) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 10)
      }
      window.addEventListener("scroll", handleScroll)
      return () => window.removeEventListener("scroll", handleScroll)
    }
  }, [transparentOnTop])

  const navBackground = transparentOnTop ? (isScrolled ? backgroundColor : "bg-transparent") : backgroundColor

  const navTextColor = transparentOnTop ? (isScrolled ? textColor : "text-white") : textColor

  return (
    <nav
      className={`w-full ${navBackground} ${height} ${sticky ? "sticky top-0 z-50" : ""} transition-all duration-300 ${
        isScrolled || !transparentOnTop ? "border-b border-gray-200 shadow-sm" : ""
      }`}
    >
      <div className="container mx-auto h-full px-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          {logoSrc ? (
            <img src={logoSrc || "/placeholder.svg"} alt={logo} className="h-10" />
          ) : (
            <span
              className={`${navTextColor} 
                ${typography.logo?.fontFamily} 
                ${typography.logo?.fontSize} 
                ${typography.logo?.fontWeight}
                ${typography.logo?.fontStyle}`}
            >
              {logo}
            </span>
          )}
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center space-x-8">
          {links.map((link, index) => {
            if (link.dropdown && link.dropdown.length > 0) {
              return (
                <DropdownMenu key={index}>
                  <DropdownMenuTrigger
                    className={`flex items-center gap-1 transition-colors ${
                      link.isActive ? activeTextColor : navTextColor
                    } hover:${hoverTextColor}
                      ${typography.links?.fontFamily} 
                      ${typography.links?.fontSize} 
                      ${typography.links?.fontWeight}
                      ${typography.links?.fontStyle}`}
                  >
                    {link.text} <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className={dropdownBackgroundColor}>
                    {link.dropdown.map((item, idx) => (
                      <DropdownMenuItem key={idx} asChild>
                        <Link
                          href={item.href}
                          className={`w-full ${typography.dropdown?.fontFamily} ${typography.dropdown?.fontSize} ${
                            typography.dropdown?.fontWeight
                          } ${typography.dropdown?.fontStyle}`}
                        >
                          {item.text}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )
            }

            return (
              <Link
                key={index}
                href={link.href}
                className={`transition-colors ${link.isActive ? activeTextColor : navTextColor} hover:${hoverTextColor}
                  ${typography.links?.fontFamily} 
                  ${typography.links?.fontSize} 
                  ${typography.links?.fontWeight}
                  ${typography.links?.fontStyle}`}
              >
                {link.text}
              </Link>
            )
          })}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center space-x-4">
          {showSearch && (
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className={`h-5 w-5 ${navTextColor}`} />
            </Button>
          )}

          {showCart && (
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className={`h-5 w-5 ${navTextColor}`} />
            </Button>
          )}

          {showProfile && (
            <Button variant="ghost" size="icon" aria-label="Profile">
              <User className={`h-5 w-5 ${navTextColor}`} />
            </Button>
          )}

          {ctaButton && (
            <Link href={ctaButton.href}>
              <TrackClick eventName="navbar_cta_click" elementId="navbar-cta">
                <Button
                  className={`${ctaButtonStyle.backgroundColor} ${
                    ctaButtonStyle.textColor
                  } hover:${ctaButtonStyle.hoverBackgroundColor} hover:${ctaButtonStyle.hoverTextColor}
                    ${typography.cta?.fontFamily} 
                    ${typography.cta?.fontSize} 
                    ${typography.cta?.fontWeight}
                    ${typography.cta?.fontStyle}`}
                >
                  {ctaButton.text}
                </Button>
              </TrackClick>
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          {showSearch && (
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className={`h-5 w-5 ${navTextColor}`} />
            </Button>
          )}

          {showCart && (
            <Button variant="ghost" size="icon" aria-label="Cart">
              <ShoppingCart className={`h-5 w-5 ${navTextColor}`} />
            </Button>
          )}

          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <X className={`h-6 w-6 ${navTextColor}`} /> : <Menu className={`h-6 w-6 ${navTextColor}`} />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-lg">
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {links.map((link, index) => (
              <div key={index} className="py-2">
                {link.dropdown && link.dropdown.length > 0 ? (
                  <details className="group">
                    <summary
                      className={`flex cursor-pointer items-center justify-between ${
                        link.isActive ? activeTextColor : textColor
                      }
                        ${typography.links?.fontFamily} 
                        ${typography.links?.fontSize} 
                        ${typography.links?.fontWeight}
                        ${typography.links?.fontStyle}`}
                    >
                      {link.text}
                      <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" />
                    </summary>
                    <div className="mt-2 ml-4 space-y-2">
                      {link.dropdown.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className={`block py-1 ${textColor} hover:${hoverTextColor}
                            ${typography.dropdown?.fontFamily} 
                            ${typography.dropdown?.fontSize} 
                            ${typography.dropdown?.fontWeight}
                            ${typography.dropdown?.fontStyle}`}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.text}
                        </Link>
                      ))}
                    </div>
                  </details>
                ) : (
                  <Link
                    href={link.href}
                    className={`block transition-colors ${
                      link.isActive ? activeTextColor : textColor
                    } hover:${hoverTextColor}
                      ${typography.links?.fontFamily} 
                      ${typography.links?.fontSize} 
                      ${typography.links?.fontWeight}
                      ${typography.links?.fontStyle}`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                )}
              </div>
            ))}

            {showProfile && (
              <Link
                href="#"
                className={`flex items-center py-2 ${textColor} hover:${hoverTextColor}
                  ${typography.links?.fontFamily} 
                  ${typography.links?.fontSize} 
                  ${typography.links?.fontWeight}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-5 w-5 mr-2" />
                Profile
              </Link>
            )}

            {ctaButton && (
              <Link href={ctaButton.href} onClick={() => setIsMenuOpen(false)}>
                <Button
                  className={`w-full ${ctaButtonStyle.backgroundColor} ${
                    ctaButtonStyle.textColor
                  } hover:${ctaButtonStyle.hoverBackgroundColor} hover:${ctaButtonStyle.hoverTextColor}
                    ${typography.cta?.fontFamily} 
                    ${typography.cta?.fontSize} 
                    ${typography.cta?.fontWeight}
                    ${typography.cta?.fontStyle}`}
                >
                  {ctaButton.text}
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}

