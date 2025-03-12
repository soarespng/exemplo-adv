import type React from "react"
interface Step {
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

interface HowItWorksTypographyProps {
  title?: TypographyProps
  stepTitle?: TypographyProps
  stepDescription?: TypographyProps
}

interface HowItWorksSimpleProps {
  title?: string
  steps: Step[]
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  stepTitleColor?: string
  stepDescriptionColor?: string
  iconBackgroundColor?: string
  iconColor?: string
  borderColor?: string
  typography?: HowItWorksTypographyProps
}

export default function HowItWorks({
  steps,
  backgroundColor = "bg-white",
  stepTitleColor = "text-gray-900",
  stepDescriptionColor = "text-gray-600",
  iconBackgroundColor = "bg-primary",
  iconColor = "text-white",
  borderColor = "border-gray-200",
  typography = {
    title: {
      fontFamily: "font-sans",
      fontSize: "text-3xl",
      fontWeight: "font-bold",
      fontStyle: "normal",
    },
    stepTitle: {
      fontFamily: "font-sans",
      fontSize: "text-xl",
      fontWeight: "font-semibold",
      fontStyle: "normal",
    },
    stepDescription: {
      fontFamily: "font-sans",
      fontSize: "text-base",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
  },
}: HowItWorksSimpleProps) {
  return (
    <div className={`${backgroundColor} pb-6 ${borderColor}`}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {step.icon && (
                <div
                  className={`${iconBackgroundColor} ${iconColor} w-12 h-12 rounded-full flex items-center justify-center mb-4`}
                >
                  {step.icon}
                </div>
              )}
              <h3
                className={`${stepTitleColor} mb-2
                  ${typography.stepTitle?.fontFamily} 
                  ${typography.stepTitle?.fontSize} 
                  ${typography.stepTitle?.fontWeight}
                  ${typography.stepTitle?.fontStyle}`}
              >
                {step.title}
              </h3>
              <p
                className={`${stepDescriptionColor}
                  ${typography.stepDescription?.fontFamily} 
                  ${typography.stepDescription?.fontSize} 
                  ${typography.stepDescription?.fontWeight}
                  ${typography.stepDescription?.fontStyle}`}
              >
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

