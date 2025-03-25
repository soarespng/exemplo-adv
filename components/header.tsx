import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import WhatsAppButton from "./whatsapp-button"
import TrackClick from "./analytics/track-click"

interface TypographyProps {
    fontFamily?: string
    fontSize?: string
    fontWeight?: string
    fontStyle?: string
}

interface HeaderTypographyProps {
    title?: TypographyProps
    subtitle?: TypographyProps
    description?: TypographyProps
    features?: TypographyProps
    button?: TypographyProps
}

interface HeaderMediumProps {
    customize?: string
    title: string
    subtitle?: string
    description: string
    primaryButtonText: string
    primaryButtonLink: string
    secondaryButtonText?: string
    secondaryButtonLink?: string
    features?: string[]
    imageSrc?: string
    backgroundColor?: string
    accentColor?: string
    textColor?: string
    subtitleColor?: string
    descriptionColor?: string
    featureColor?: string
    primaryButtonBackgroundColor?: string
    primaryButtonTextColor?: string
    primaryButtonHoverBackgroundColor?: string
    primaryButtonHoverTextColor?: string
    secondaryButtonBackgroundColor?: string
    secondaryButtonTextColor?: string
    secondaryButtonHoverBackgroundColor?: string
    secondaryButtonHoverTextColor?: string
    height?: string
    imagePosition?: "right" | "left"
    typography?: HeaderTypographyProps
}

export default function Header({
    customize = "",
    title = "Transform your business with our platform",
    subtitle = "INTRODUCING",
    description = "Our platform helps businesses of all sizes streamline operations, improve customer experiences, and drive growth with powerful tools and insights.",
    primaryButtonText = "Get Started",
    primaryButtonLink = "#",
    secondaryButtonText = "Learn More",
    secondaryButtonLink = "#",
    features = ["Easy integration", "24/7 customer support", "99.9% uptime guarantee", "Regular updates"],
    imageSrc = "/placeholder.svg?height=600&width=600",
    backgroundColor = "bg-white",
    accentColor = "text-primary",
    textColor = "text-gray-900",
    subtitleColor = "text-primary",
    descriptionColor = "text-gray-500",
    featureColor = "text-gray-700",
    primaryButtonBackgroundColor = "bg-primary",
    primaryButtonTextColor = "text-white",
    primaryButtonHoverBackgroundColor = "bg-primary/90",
    primaryButtonHoverTextColor = "text-white",
    height = "py-16 md:py-24",
    imagePosition = "right",
    typography = {
        title: {
            fontFamily: "font-sans",
            fontSize: "text-3xl md:text-4xl lg:text-5xl",
            fontWeight: "font-bold",
            fontStyle: "normal",
        },
        subtitle: {
            fontFamily: "font-sans",
            fontSize: "text-sm",
            fontWeight: "font-semibold",
            fontStyle: "normal",
        },
        description: {
            fontFamily: "font-sans",
            fontSize: "text-lg",
            fontWeight: "font-normal",
            fontStyle: "normal",
        },
        features: {
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
}: HeaderMediumProps) {
    return (
        <header className={`w-full ${backgroundColor} ${height} ${customize}`}>
            <div className="container mx-auto px-4">
                <div
                    className={`grid md:grid-cols-2 gap-12 md:gap-8 items-center ${imagePosition === "left" ? "md:flex-row-reverse" : ""
                        }`}
                >
                    <div className="flex flex-col gap-6">
                        {subtitle && (
                            <p
                                className={`${subtitleColor} tracking-wider uppercase
                  ${typography.subtitle?.fontFamily} 
                  ${typography.subtitle?.fontSize} 
                  ${typography.subtitle?.fontWeight}
                  ${typography.subtitle?.fontStyle}`}
                            >
                                {subtitle}
                            </p>
                        )}
                        <h1
                            className={`${textColor}
                ${typography.title?.fontFamily} 
                ${typography.title?.fontSize} 
                ${typography.title?.fontWeight}
                ${typography.title?.fontStyle}`}
                        >
                            {title}
                        </h1>
                        <p
                            className={`${descriptionColor} 
                ${typography.description?.fontFamily} 
                ${typography.description?.fontSize} 
                ${typography.description?.fontWeight}
                ${typography.description?.fontStyle}`}
                        >
                            {description}
                        </p>

                        {features && features.length > 0 && (
                            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                                {features.map((feature, index) => (
                                    <li
                                        key={index}
                                        className={`flex items-center gap-2 ${featureColor}
                      ${typography.features?.fontFamily} 
                      ${typography.features?.fontSize} 
                      ${typography.features?.fontWeight}
                      ${typography.features?.fontStyle}`}
                                    >
                                        <Check className={`h-5 w-5 ${accentColor}`} />
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        )}

                        <div className="flex flex-wrap gap-4 mt-2">
                            <Link href={primaryButtonLink}>
                                <Button
                                    className={`${primaryButtonBackgroundColor} ${primaryButtonTextColor} hover:${primaryButtonHoverBackgroundColor} hover:${primaryButtonHoverTextColor}
                    ${typography.button?.fontFamily} 
                    ${typography.button?.fontSize} 
                    ${typography.button?.fontWeight}
                    ${typography.button?.fontStyle}`}
                                >
                                    {primaryButtonText}
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </Link>
                            {secondaryButtonText && (
                                <Link href={secondaryButtonLink || "#"}>
                                    {/* <Button
                                        variant="outline"
                                        className={`${secondaryButtonBackgroundColor} ${secondaryButtonTextColor} hover:${secondaryButtonHoverBackgroundColor} hover:${secondaryButtonHoverTextColor}
                      ${typography.button?.fontFamily} 
                      ${typography.button?.fontSize} 
                      ${typography.button?.fontWeight}
                      ${typography.button?.fontStyle}`}
                                    >
                                        {secondaryButtonText}
                                        <MessageCircle size={24} />
                                    </Button> */}
                                    <TrackClick eventName="header_wpp_click" elementId="header-wpp-cta">
                                        <WhatsAppButton
                                            buttonText="Fale com um especialista"
                                            phoneNumber="+55 11 97431-6804"
                                            message="Olá! Gostaria de agendar uma consulta com a Dra. Oliveira." />
                                    </TrackClick>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className={`flex justify-center ${imagePosition === "left" ? "md:order-first" : ""}`}>
                        <img
                            src={imageSrc || "/placeholder.svg"}
                            alt="Header illustration"
                            className="w-full max-w-lg rounded-lg object-cover"
                        />
                    </div>
                </div>
            </div>
        </header>
    )
}

