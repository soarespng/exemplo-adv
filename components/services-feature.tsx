import type React from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface Feature {
  title: string
  description: string
  icon?: React.ReactNode
}

interface TypographyProps {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
}

interface ServicesFeatureTypographyProps {
  sectionTitle?: TypographyProps
  sectionSubtitle?: TypographyProps
  mainTitle?: TypographyProps
  mainDescription?: TypographyProps
  featureTitle?: TypographyProps
  featureDescription?: TypographyProps
  button?: TypographyProps
}

interface ServicesFeatureProps {
  title?: string
  subtitle?: string
  mainTitle?: string
  mainDescription?: string
  mainImage?: string
  mainButtonText?: string
  mainButtonLink?: string
  showMainContent: boolean
  features: Feature[]
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  subtitleColor?: string
  mainTitleColor?: string
  mainDescriptionColor?: string
  featureTitleColor?: string
  featureDescriptionColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  buttonHoverBackgroundColor?: string
  buttonHoverTextColor?: string
  borderColor?: string
  iconColor?: string
  iconBackgroundColor?: string
  layout?: "imageLeft" | "imageRight"
  typography?: ServicesFeatureTypographyProps
}

export default function ServicesFeature({
  title = "Nossos Serviços",
  subtitle = "Conheça nossa especialidade",
  mainTitle = "Serviço em Destaque",
  mainDescription = "Descrição detalhada do serviço principal que oferecemos, destacando seus benefícios e diferenciais.",
  mainImage = "/placeholder.svg?height=600&width=600",
  mainButtonText = "Saiba Mais",
  mainButtonLink = "#",
  showMainContent = false,
  features = [],
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  subtitleColor = "text-gray-500",
  mainTitleColor = "text-gray-900",
  mainDescriptionColor = "text-gray-600",
  featureTitleColor = "text-gray-900",
  featureDescriptionColor = "text-gray-500",
  buttonBackgroundColor = "bg-primary",
  buttonTextColor = "text-white",
  buttonHoverBackgroundColor = "bg-primary/90",
  buttonHoverTextColor = "text-white",
  borderColor = "border-gray-200",
  iconColor = "text-primary",
  iconBackgroundColor = "bg-primary/10",
  layout = "imageRight",
  typography = {
    sectionTitle: {
      fontFamily: "font-sans",
      fontSize: "text-3xl",
      fontWeight: "font-bold",
      fontStyle: "normal",
    },
    sectionSubtitle: {
      fontFamily: "font-sans",
      fontSize: "text-lg",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
    mainTitle: {
      fontFamily: "font-sans",
      fontSize: "text-2xl",
      fontWeight: "font-bold",
      fontStyle: "normal",
    },
    mainDescription: {
      fontFamily: "font-sans",
      fontSize: "text-base",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
    featureTitle: {
      fontFamily: "font-sans",
      fontSize: "text-lg",
      fontWeight: "font-semibold",
      fontStyle: "normal",
    },
    featureDescription: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
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
}: ServicesFeatureProps) {
  return (
    <div className={`${backgroundColor} ${textColor} ${borderColor} py-12 px-4`}>
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          {subtitle && (
            <p
              className={`${subtitleColor} mb-2
                ${typography.sectionSubtitle?.fontFamily} 
                ${typography.sectionSubtitle?.fontSize} 
                ${typography.sectionSubtitle?.fontWeight}
                ${typography.sectionSubtitle?.fontStyle}`}
            >
              {subtitle}
            </p>
          )}
          {title && (
            <h2
              className={`${titleColor} 
                ${typography.sectionTitle?.fontFamily} 
                ${typography.sectionTitle?.fontSize} 
                ${typography.sectionTitle?.fontWeight}
                ${typography.sectionTitle?.fontStyle}`}
            >
              {title}
            </h2>
          )}
        </div>

        {/* Main Feature with Image */}
        {showMainContent && <div className={`flex flex-col ${layout === "imageLeft" ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 mb-16`}>
          <div className="lg:w-1/2">
            <img
              src={mainImage || "/placeholder.svg"}
              alt={mainTitle}
              className="w-full h-auto rounded-lg object-cover"
            />
          </div>

          <div className="lg:w-1/2 flex flex-col justify-center">
            <h3
              className={`${mainTitleColor} mb-4
                ${typography.mainTitle?.fontFamily} 
                ${typography.mainTitle?.fontSize} 
                ${typography.mainTitle?.fontWeight}
                ${typography.mainTitle?.fontStyle}`}
            >
              {mainTitle}
            </h3>
            <p
              className={`${mainDescriptionColor} mb-6
                ${typography.mainDescription?.fontFamily} 
                ${typography.mainDescription?.fontSize} 
                ${typography.mainDescription?.fontWeight}
                ${typography.mainDescription?.fontStyle}`}
            >
              {mainDescription}
            </p>
            {mainButtonText && mainButtonLink && (
              <div className="mb-6">
                <Button
                  asChild
                  className={`${buttonBackgroundColor} ${buttonTextColor} hover:${buttonHoverBackgroundColor} hover:${buttonHoverTextColor}
                    ${typography.button?.fontFamily} 
                    ${typography.button?.fontSize} 
                    ${typography.button?.fontWeight}
                    ${typography.button?.fontStyle}`}
                >
                  <Link href={mainButtonLink}>{mainButtonText}</Link>
                </Button>
              </div>
            )}
          </div>
        </div>}

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex gap-4">
              {feature.icon && (
                <div
                  className={`${iconBackgroundColor} ${iconColor} w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0`}
                >
                  {feature.icon}
                </div>
              )}
              <div>
                <h4
                  className={`${featureTitleColor} mb-2
                    ${typography.featureTitle?.fontFamily} 
                    ${typography.featureTitle?.fontSize} 
                    ${typography.featureTitle?.fontWeight}
                    ${typography.featureTitle?.fontStyle}`}
                >
                  {feature.title}
                </h4>
                <p
                  className={`${featureDescriptionColor}
                    ${typography.featureDescription?.fontFamily} 
                    ${typography.featureDescription?.fontSize} 
                    ${typography.featureDescription?.fontWeight}
                    ${typography.featureDescription?.fontStyle}`}
                >
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

