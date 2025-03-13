import { Star } from "lucide-react"

interface Testimonial {
  quote: string
  author: string
  role?: string
  rating?: number
  imageSrc?: string
}

interface TypographyProps {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
}

interface TestimonialTypographyProps {
  quote?: TypographyProps
  author?: TypographyProps
  role?: TypographyProps
}

interface TestimonialGridProps {
  testimonials: Testimonial[]
  backgroundColor?: string
  textColor?: string
  authorColor?: string
  roleColor?: string
  starColor?: string
  borderColor?: string
  typography?: TestimonialTypographyProps
}

export default function TestimonialGrid({
  testimonials,
  backgroundColor = "bg-white",
  textColor = "text-gray-700",
  authorColor = "text-gray-900",
  roleColor = "text-gray-500",
  starColor = "text-yellow-400",
  borderColor = "border-gray-200",
  typography = {
    quote: {
      fontFamily: "font-serif",
      fontSize: "text-base",
      fontWeight: "font-normal",
      fontStyle: "italic",
    },
    author: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-semibold",
      fontStyle: "normal",
    },
    role: {
      fontFamily: "font-sans",
      fontSize: "text-xs",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
  },
}: TestimonialGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {testimonials.map((testimonial, index) => (
        <div key={index} className={`${backgroundColor} p-6 rounded-lg border ${borderColor}`}>
          <div className="flex items-start mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < (testimonial.rating || 5) ? "fill-current" : "stroke-current"
                  } ${starColor}`}
                />
              ))}
            </div>
          </div>
          <blockquote
            className={`${textColor} mb-4
              ${typography.quote?.fontFamily} 
              ${typography.quote?.fontSize} 
              ${typography.quote?.fontWeight}
              ${typography.quote?.fontStyle}`}
          >
            {`"${testimonial.quote}"`}
          </blockquote>
          <div className="flex items-center">
            {testimonial.imageSrc && (
              <img
                src={testimonial.imageSrc || "/placeholder.svg"}
                alt={testimonial.author}
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
            )}
            <div>
              <cite
                className={`${authorColor} not-italic
                  ${typography.author?.fontFamily} 
                  ${typography.author?.fontSize} 
                  ${typography.author?.fontWeight}
                  ${typography.author?.fontStyle}`}
              >
                {testimonial.author}
              </cite>
              {testimonial.role && (
                <p
                  className={`${roleColor}
                    ${typography.role?.fontFamily} 
                    ${typography.role?.fontSize} 
                    ${typography.role?.fontWeight}
                    ${typography.role?.fontStyle}`}
                >
                  {testimonial.role}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

