import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

interface TypographyProps {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
}

interface ContentSectionTypographyProps {
  title?: TypographyProps
  subtitle?: TypographyProps
  content?: TypographyProps
  button?: TypographyProps
}

interface ContentSectionProps {
  title?: string
  subtitle?: string
  content?: string
  imageSrc?: string
  imageAlt?: string
  buttonText?: string
  buttonLink?: string
  imagePosition?: "left" | "right" | "top" | "bottom"
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  subtitleColor?: string
  contentColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  buttonHoverBackgroundColor?: string
  buttonHoverTextColor?: string
  borderColor?: string
  typography?: ContentSectionTypographyProps
}

export default function ContentSection({
  title,
  subtitle,
  content,
  imageSrc,
  imageAlt = "Section image",
  buttonText,
  buttonLink,
  imagePosition = "right",
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  subtitleColor = "text-primary",
  contentColor = "text-gray-600",
  buttonBackgroundColor = "bg-primary",
  buttonTextColor = "text-white",
  buttonHoverBackgroundColor = "bg-primary/90",
  buttonHoverTextColor = "text-white",
  borderColor = "border-gray-200",
  typography = {
    title: {
      fontFamily: "font-sans",
      fontSize: "text-3xl",
      fontWeight: "font-bold",
      fontStyle: "normal",
    },
    subtitle: {
      fontFamily: "font-sans",
      fontSize: "text-lg",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
    content: {
      fontFamily: "font-sans",
      fontSize: "text-base",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
    button: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
  },
}: ContentSectionProps) {
  const isHorizontal = imagePosition === "left" || imagePosition === "right"

  return (
    <div className={`${backgroundColor} ${textColor} p-8 rounded-lg border ${borderColor}`}>
      <div
        className={`
        ${isHorizontal ? "flex flex-col md:flex-row gap-8 items-center" : "flex flex-col gap-8"}
        ${imagePosition === "right" ? "md:flex-row" : ""}
        ${imagePosition === "left" ? "md:flex-row-reverse" : ""}
        ${imagePosition === "bottom" ? "flex-col-reverse" : ""}
      `}
      >
        {/* Image */}
        {imageSrc && (
          <div
            className={`
            ${isHorizontal ? "md:w-1/2" : "w-full"}
            ${imagePosition === "top" || imagePosition === "bottom" ? "mx-auto max-w-2xl" : ""}
          `}
          >
            <Image
              src={imageSrc || "/placeholder.svg"}
              alt={imageAlt}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>
        )}

        {/* Content */}
        <div className={`${isHorizontal ? "md:w-1/2" : "w-full"}`}>
          {subtitle && (
            <p
              className={`${subtitleColor} mb-2
                ${typography.subtitle?.fontFamily} 
                ${typography.subtitle?.fontSize} 
                ${typography.subtitle?.fontWeight}
                ${typography.subtitle?.fontStyle}`}
            >
              {subtitle}
            </p>
          )}

          {title && (
            <h2
              className={`${titleColor} mb-4
                ${typography.title?.fontFamily} 
                ${typography.title?.fontSize} 
                ${typography.title?.fontWeight}
                ${typography.title?.fontStyle}`}
            >
              {title}
            </h2>
          )}

          {content && (
            <div
              className={`${contentColor} mb-6
                ${typography.content?.fontFamily} 
                ${typography.content?.fontSize} 
                ${typography.content?.fontWeight}
                ${typography.content?.fontStyle}`}
            >
              {content}
            </div>
          )}

          {buttonText && buttonLink && (
            <Button
              asChild
              className={`${buttonBackgroundColor} ${buttonTextColor} hover:${buttonHoverBackgroundColor} hover:${buttonHoverTextColor}
                ${typography.button?.fontFamily} 
                ${typography.button?.fontSize} 
                ${typography.button?.fontWeight}
                ${typography.button?.fontStyle}`}
            >
              <Link href={buttonLink}>{buttonText}</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}

