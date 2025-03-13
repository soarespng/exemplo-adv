import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

interface TypographyProps {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
}

interface FooterTypographyProps {
  logo?: TypographyProps
  heading?: TypographyProps
  links?: TypographyProps
  copyright?: TypographyProps
}

interface SocialLink {
  type: "facebook" | "twitter" | "instagram" | "linkedin"
  href: string
}

interface FooterMediumProps {
  logo?: string
  logoSrc?: string
  description?: string
  copyright?: string
  linkGroups?: Array<{
    heading: string
    links: Array<{
      text: string
      href: string
    }>
  }>
  socialLinks?: SocialLink[]
  backgroundColor?: string
  textColor?: string
  headingColor?: string
  linkColor?: string
  linkHoverColor?: string
  socialIconColor?: string
  socialIconHoverColor?: string
  borderColor?: string
  typography?: FooterTypographyProps
}

export default function Footer({
  logo = "Brand",
  logoSrc,
  description = "Making the world a better place through constructing elegant hierarchies.",
  copyright = "© 2025 Brand. All rights reserved.",
  linkGroups = [],
  socialLinks = [],
  backgroundColor = "bg-white",
  textColor = "text-gray-500",
  headingColor = "text-gray-900",
  linkColor = "text-gray-600",
  linkHoverColor = "text-gray-900",
  socialIconColor = "text-gray-400",
  socialIconHoverColor = "text-gray-600",
  borderColor = "border-gray-200",
  typography = {
    logo: {
      fontFamily: "font-sans",
      fontSize: "text-xl",
      fontWeight: "font-bold",
      fontStyle: "normal",
    },
    heading: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-semibold",
      fontStyle: "normal",
    },
    links: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
    copyright: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
  },
}: FooterMediumProps) {
  const getSocialIcon = (type: string) => {
    switch (type) {
      case "facebook":
        return <Facebook className="h-5 w-5" />
      case "twitter":
        return <Twitter className="h-5 w-5" />
      case "instagram":
        return <Instagram className="h-5 w-5" />
      case "linkedin":
        return <Linkedin className="h-5 w-5" />
      default:
        return null
    }
  }

  return (
    <footer className={`w-full ${backgroundColor} border-t ${borderColor}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              {logoSrc ? (
                <img src={logoSrc || "/placeholder.svg"} alt={logo} className="h-8" />
              ) : (
                <span
                  className={`${headingColor} 
                    ${typography.logo?.fontFamily} 
                    ${typography.logo?.fontSize} 
                    ${typography.logo?.fontWeight}
                    ${typography.logo?.fontStyle}`}
                >
                  {logo}
                </span>
              )}
            </div>
            <p className={`${textColor} max-w-xs`}>{description}</p>
            {socialLinks.length > 0 && (
              <div className="flex gap-4 mt-4">
                {socialLinks.map((social, index) => (
                  <Link
                    key={index}
                    href={social.href}
                    className={`${socialIconColor} hover:${socialIconHoverColor} transition-colors`}
                    aria-label={social.type}
                  >
                    {getSocialIcon(social.type)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Link groups */}
          {linkGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="flex flex-col gap-4">
              <h3
                className={`${headingColor} uppercase tracking-wider
                  ${typography.heading?.fontFamily} 
                  ${typography.heading?.fontSize} 
                  ${typography.heading?.fontWeight}
                  ${typography.heading?.fontStyle}`}
              >
                {group.heading}
              </h3>
              <nav className="flex flex-col gap-2">
                {group.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    href={link.href}
                    className={`${linkColor} hover:${linkHoverColor} transition-colors
                      ${typography.links?.fontFamily} 
                      ${typography.links?.fontSize} 
                      ${typography.links?.fontWeight}
                      ${typography.links?.fontStyle}`}
                  >
                    {link.text}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-8">
          <p
            className={`text-center ${textColor}
              ${typography.copyright?.fontFamily} 
              ${typography.copyright?.fontSize} 
              ${typography.copyright?.fontWeight}
              ${typography.copyright?.fontStyle}`}
          >
            {copyright}
          </p>
        </div>
      </div>
    </footer>
  )
}

