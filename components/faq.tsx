"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface FAQItem {
  question: string
  answer: string
}

interface TypographyProps {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
}

interface FAQTypographyProps {
  title?: TypographyProps
  question?: TypographyProps
  answer?: TypographyProps
}

interface FAQSimpleProps {
  title?: string
  faqs: FAQItem[]
  backgroundColor?: string
  textColor?: string
  titleColor?: string
  questionColor?: string
  answerColor?: string
  borderColor?: string
  typography?: FAQTypographyProps
}

export default function FAQ({
  title = "Frequently Asked Questions",
  faqs = [],
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  titleColor = "text-gray-900",
  questionColor = "text-gray-900",
  answerColor = "text-gray-600",
  borderColor = "border-gray-200",
  typography = {
    title: {
      fontFamily: "font-sans",
      fontSize: "text-3xl",
      fontWeight: "font-bold",
      fontStyle: "normal",
    },
    question: {
      fontFamily: "font-sans",
      fontSize: "text-base",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
    answer: {
      fontFamily: "font-sans",
      fontSize: "text-base",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
  },
}: FAQSimpleProps) {
  return (
    <div className={`${backgroundColor} ${textColor} p-8 rounded-lg border ${borderColor}`}>
      {title && (
        <h2
          className={`${titleColor} mb-6 text-center
            ${typography.title?.fontFamily} 
            ${typography.title?.fontSize} 
            ${typography.title?.fontWeight}
            ${typography.title?.fontStyle}`}
        >
          {title}
        </h2>
      )}
      <Accordion type="single" collapsible className="w-full">
        {faqs.map((faq, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger
              className={`${questionColor} text-left
                ${typography.question?.fontFamily} 
                ${typography.question?.fontSize} 
                ${typography.question?.fontWeight}
                ${typography.question?.fontStyle}`}
            >
              {faq.question}
            </AccordionTrigger>
            <AccordionContent
              className={`${answerColor}
                ${typography.answer?.fontFamily} 
                ${typography.answer?.fontSize} 
                ${typography.answer?.fontWeight}
                ${typography.answer?.fontStyle}`}
            >
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

