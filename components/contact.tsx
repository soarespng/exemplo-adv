"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, FileText } from "lucide-react"

interface TypographyProps {
  fontFamily?: string
  fontSize?: string
  fontWeight?: string
  fontStyle?: string
}

interface ContactTypographyProps {
  title?: TypographyProps
  subtitle?: TypographyProps
  description?: TypographyProps
  labels?: TypographyProps
  button?: TypographyProps
  contactInfo?: TypographyProps
  tabs?: TypographyProps
}

interface ContactComplexProps {
  title?: string
  subtitle?: string
  description?: string
  nameLabel?: string
  emailLabel?: string
  phoneLabel?: string
  companyLabel?: string
  budgetLabel?: string
  serviceLabel?: string
  messageLabel?: string
  fileLabel?: string
  buttonText?: string
  contactEmail?: string
  contactPhone?: string
  contactAddress?: string
  businessHours?: string
  serviceOptions?: string[]
  budgetOptions?: string[]
  showCompany?: boolean
  showBudget?: boolean
  showService?: boolean
  showFileUpload?: boolean
  showTabs?: boolean
  showMap?: boolean
  mapSrc?: string
  titleColor?: string
  subtitleColor?: string
  backgroundColor?: string
  textColor?: string
  labelColor?: string
  buttonBackgroundColor?: string
  buttonTextColor?: string
  buttonHoverBackgroundColor?: string
  buttonHoverTextColor?: string
  accentColor?: string
  borderColor?: string
  typography?: ContactTypographyProps
  onSubmit?: (data: any) => void
}

export default function Contact({
  title = "Contact Us",
  subtitle = "Get in Touch",
  description = "Have a project in mind? Looking to partner or work together? Reach out through the form below.",
  nameLabel = "Full Name",
  emailLabel = "Email Address",
  phoneLabel = "Phone Number",
  companyLabel = "Company",
  budgetLabel = "Budget",
  serviceLabel = "Service Needed",
  messageLabel = "Project Details",
  fileLabel = "Attach Files",
  buttonText = "Send Message",
  contactEmail = "contact@example.com",
  contactPhone = "+1 (555) 123-4567",
  contactAddress = "123 Main Street, City, Country",
  businessHours = "Monday - Friday, 9am - 5pm",
  serviceOptions = ["Web Development", "Mobile App", "UI/UX Design", "Branding", "Consulting", "Other"],
  budgetOptions = ["$1,000 - $5,000", "$5,000 - $10,000", "$10,000 - $25,000", "$25,000+"],
  showCompany = true,
  showBudget = true,
  showService = true,
  showFileUpload = true,
  showTabs = true,
  showMap = true,
  mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d228.66565124185334!2d-46.37665889928499!3d-23.509097811736833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94ce64bb8f9e3c5f%3A0xccbcc21b4ea3b52f!2sR.%20Bem%20Simples%20-%20Itaim%20Paulista%2C%20S%C3%A3o%20Paulo%20-%20SP%2C%2008132-440%2C%20Brazil!5e0!3m2!1sen!2sus!4v1741664745153!5m2!1sen!2sus",
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  labelColor = "text-gray-700",
  buttonBackgroundColor = "bg-primary",
  buttonTextColor = "text-white",
  buttonHoverBackgroundColor = "bg-primary/90",
  buttonHoverTextColor = "text-white",
  accentColor = "text-primary",
  borderColor = "border-gray-200",
  typography = {
    title: {
      fontFamily: "font-sans",
      fontSize: "text-4xl",
      fontWeight: "font-bold",
      fontStyle: "normal",
    },
    subtitle: {
      fontFamily: "font-sans",
      fontSize: "text-lg",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
    description: {
      fontFamily: "font-sans",
      fontSize: "text-base",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
    labels: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
    button: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
    contactInfo: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-normal",
      fontStyle: "normal",
    },
    tabs: {
      fontFamily: "font-sans",
      fontSize: "text-sm",
      fontWeight: "font-medium",
      fontStyle: "normal",
    },
  },
  onSubmit = () => {},
}: ContactComplexProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    budget: "",
    service: "",
    message: "",
    files: null as File[] | null,
    terms: false,
  })

  const [activeTab, setActiveTab] = useState("project")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, files: Array.from(e.target.files as FileList) }))
    }
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({ ...prev, terms: checked }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    // Reset form
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      budget: "",
      service: "",
      message: "",
      files: null,
      terms: false,
    })
  }

  return (
    <div className={`w-full ${backgroundColor} ${borderColor}`}>
      <div className="container mx-auto px-4 py-12">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <p
            className={`${accentColor} mb-2
              ${typography.subtitle?.fontFamily} 
              ${typography.subtitle?.fontSize} 
              ${typography.subtitle?.fontWeight}
              ${typography.subtitle?.fontStyle}`}
          >
            {subtitle}
          </p>
          <h1
            className={`${textColor} mb-4
              ${typography.title?.fontFamily} 
              ${typography.title?.fontSize} 
              ${typography.title?.fontWeight}
              ${typography.title?.fontStyle}`}
          >
            {title}
          </h1>
          <p
            className={`text-gray-500
              ${typography.description?.fontFamily} 
              ${typography.description?.fontSize} 
              ${typography.description?.fontWeight}
              ${typography.description?.fontStyle}`}
          >
            {description}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <Card className="overflow-hidden p-0">
              <CardContent className="p-0">
                <div className="p-6 space-y-4">
                  <div className="flex items-start">
                    <Mail className={`h-5 w-5 ${accentColor} mt-0.5 mr-3`} />
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <a
                        href={`mailto:${contactEmail}`}
                        className={`text-gray-600 hover:${accentColor}
                          ${typography.contactInfo?.fontFamily} 
                          ${typography.contactInfo?.fontSize} 
                          ${typography.contactInfo?.fontWeight}
                          ${typography.contactInfo?.fontStyle}`}
                      >
                        {contactEmail}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className={`h-5 w-5 ${accentColor} mt-0.5 mr-3`} />
                    <div>
                      <p className="font-medium text-gray-900">Telefone</p>
                      <a
                        href={`tel:${contactPhone.replace(/\D/g, "")}`}
                        className={`text-gray-600 hover:${accentColor}
                          ${typography.contactInfo?.fontFamily} 
                          ${typography.contactInfo?.fontSize} 
                          ${typography.contactInfo?.fontWeight}
                          ${typography.contactInfo?.fontStyle}`}
                      >
                        {contactPhone}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MapPin className={`h-5 w-5 ${accentColor} mt-0.5 mr-3`} />
                    <div>
                      <p className="font-medium text-gray-900">Endereço</p>
                      <p
                        className={`text-gray-600
                          ${typography.contactInfo?.fontFamily} 
                          ${typography.contactInfo?.fontSize} 
                          ${typography.contactInfo?.fontWeight}
                          ${typography.contactInfo?.fontStyle}`}
                      >
                        {contactAddress}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className={`h-5 w-5 ${accentColor} mt-0.5 mr-3`} />
                    <div>
                      <p className="font-medium text-gray-900">Horários de atendimento</p>
                      <p
                        className={`text-gray-600
                          ${typography.contactInfo?.fontFamily} 
                          ${typography.contactInfo?.fontSize} 
                          ${typography.contactInfo?.fontWeight}
                          ${typography.contactInfo?.fontStyle}`}
                      >
                        {businessHours}
                      </p>
                    </div>
                  </div>
                </div>

                {showMap && (
                  <div className="w-full h-48">
                    <iframe
                      src={mapSrc}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Map"
                    ></iframe>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                {showTabs ? (
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="project" className={typography.tabs?.fontFamily}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Project
                      </TabsTrigger>
                      <TabsTrigger value="support" className={typography.tabs?.fontFamily}>
                        <Send className="h-4 w-4 mr-2" />
                        Support
                      </TabsTrigger>
                      <TabsTrigger value="other" className={typography.tabs?.fontFamily}>
                        <FileText className="h-4 w-4 mr-2" />
                        Other
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                ) : null}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="name"
                        className={`${labelColor} mb-1.5 block
                          ${typography.labels?.fontFamily} 
                          ${typography.labels?.fontSize} 
                          ${typography.labels?.fontWeight}
                          ${typography.labels?.fontStyle}`}
                      >
                        {nameLabel} <span className="text-red-500">*</span>
                      </Label>
                      <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>

                    <div>
                      <Label
                        htmlFor="email"
                        className={`${labelColor} mb-1.5 block
                          ${typography.labels?.fontFamily} 
                          ${typography.labels?.fontSize} 
                          ${typography.labels?.fontWeight}
                          ${typography.labels?.fontStyle}`}
                      >
                        {emailLabel} <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="phone"
                        className={`${labelColor} mb-1.5 block
                          ${typography.labels?.fontFamily} 
                          ${typography.labels?.fontSize} 
                          ${typography.labels?.fontWeight}
                          ${typography.labels?.fontStyle}`}
                      >
                        {phoneLabel}
                      </Label>
                      <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} />
                    </div>

                    {showCompany && (
                      <div>
                        <Label
                          htmlFor="company"
                          className={`${labelColor} mb-1.5 block
                            ${typography.labels?.fontFamily} 
                            ${typography.labels?.fontSize} 
                            ${typography.labels?.fontWeight}
                            ${typography.labels?.fontStyle}`}
                        >
                          {companyLabel}
                        </Label>
                        <Input id="company" name="company" value={formData.company} onChange={handleChange} />
                      </div>
                    )}
                  </div>

                  {(showService || showBudget) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {showService && (
                        <div>
                          <Label
                            htmlFor="service"
                            className={`${labelColor} mb-1.5 block
                              ${typography.labels?.fontFamily} 
                              ${typography.labels?.fontSize} 
                              ${typography.labels?.fontWeight}
                              ${typography.labels?.fontStyle}`}
                          >
                            {serviceLabel}
                          </Label>
                          <Select
                            value={formData.service}
                            onValueChange={(value) => handleSelectChange("service", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione sua necessidade" />
                            </SelectTrigger>
                            <SelectContent>
                              {serviceOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {showBudget && (
                        <div>
                          <Label
                            htmlFor="budget"
                            className={`${labelColor} mb-1.5 block
                              ${typography.labels?.fontFamily} 
                              ${typography.labels?.fontSize} 
                              ${typography.labels?.fontWeight}
                              ${typography.labels?.fontStyle}`}
                          >
                            {budgetLabel}
                          </Label>
                          <Select
                            value={formData.budget}
                            onValueChange={(value) => handleSelectChange("budget", value)}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select budget range" />
                            </SelectTrigger>
                            <SelectContent>
                              {budgetOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}
                    </div>
                  )}

                  <div>
                    <Label
                      htmlFor="message"
                      className={`${labelColor} mb-1.5 block
                        ${typography.labels?.fontFamily} 
                        ${typography.labels?.fontSize} 
                        ${typography.labels?.fontWeight}
                        ${typography.labels?.fontStyle}`}
                    >
                      {messageLabel} <span className="text-red-500">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {showFileUpload && (
                    <div>
                      <Label
                        htmlFor="files"
                        className={`${labelColor} mb-1.5 block
                          ${typography.labels?.fontFamily} 
                          ${typography.labels?.fontSize} 
                          ${typography.labels?.fontWeight}
                          ${typography.labels?.fontStyle}`}
                      >
                        {fileLabel}
                      </Label>
                      <Input id="files" type="file" multiple onChange={handleFileChange} className="cursor-pointer" />
                      <p className="text-xs text-gray-500 mt-1">
                        Max file size: 10MB. Supported formats: PDF, DOC, JPG, PNG
                      </p>
                    </div>
                  )}

                  <div className="flex items-center space-x-2">
                    <Checkbox id="terms" checked={formData.terms} onCheckedChange={handleCheckboxChange} required />
                    <Label
                      htmlFor="terms"
                      className={`text-gray-600
                        ${typography.labels?.fontFamily} 
                        ${typography.labels?.fontSize} 
                        ${typography.labels?.fontWeight}
                        ${typography.labels?.fontStyle}`}
                    >
                      Eu concordo com o envio das informações
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className={`w-full ${buttonBackgroundColor} ${buttonTextColor} hover:${buttonHoverBackgroundColor} hover:${buttonHoverTextColor}
                      ${typography.button?.fontFamily} 
                      ${typography.button?.fontSize} 
                      ${typography.button?.fontWeight}
                      ${typography.button?.fontStyle}`}
                  >
                    {buttonText}
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

