"use client";

import { useState, useEffect } from "react"

import TrackClick from "@/components/analytics/track-click"
import FloatingWhatsAppButton from "@/components/floating-whatsapp-button"
import WhatsAppButton from "@/components/whatsapp-button";

import Contact from "@/components/contact"
import ContentSection from "@/components/content-section"
import Footer from "@/components/footer"
import Header from "@/components/header"
import HowItWorks from "@/components/how-it-works"
import Navbar from "@/components/navbar"
import ServicesFeature from "@/components/services-feature"
import TestimonialGrid from "@/components/testimonial-grid"

import {
  Briefcase,
  FileCheck,
  FileSearch,
  FilePlus2,
  Handshake,
  ShieldCheck,
  Scale,
  BookOpen,
  Award,
} from "lucide-react"

export default function Home() {
  const [activeSection, setActiveSection] = useState("inicio")

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["inicio", "sobre", "servicos", "depoimentos", "contato"]

      let currentSection = "inicio"
      let minDistance = Number.POSITIVE_INFINITY

      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          const distance = Math.abs(rect.top)

          if (distance < minDistance) {
            minDistance = distance
            currentSection = sectionId
          }
        }
      })

      setActiveSection(currentSection)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()
    document.documentElement.style.scrollBehavior = "smooth"

    return () => {
      window.removeEventListener("scroll", handleScroll)
      document.documentElement.style.scrollBehavior = ""
    }
  }, [])

  const testimonials = [
    {
      quote:
        "A equipe do Escritório Oliveira foi excepcional em meu processo trabalhista. Profissionais competentes e atenciosos que realmente se importam com seus clientes.",
      author: "Paulo Mendes",
      role: "Cliente em Processo Trabalhista",
      rating: 5,
      imageSrc: "/6522516.png",
    },
    {
      quote:
        "Após tentar outros escritórios sem sucesso, encontrei no Escritório Oliveira a solução para meu caso cível. Atendimento personalizado e resultados acima das expectativas.",
      author: "Fernanda Costa",
      role: "Cliente em Processo Cível",
      rating: 5,
      imageSrc: "/6522516.png",
    },
    {
      quote:
        "Como empresário, valorizo muito a consultoria preventiva que recebo. Tem sido fundamental para evitar problemas jurídicos e manter meu negócio em conformidade com a lei.",
      author: "Ricardo Almeida",
      role: "Empresário",
      rating: 5,
      imageSrc: "/6522516.png",
    },
    {
      quote:
        "A equipe do Escritório Oliveira foi excepcional em meu processo trabalhista. Profissionais competentes e atenciosos que realmente se importam com seus clientes.",
      author: "Paulo Mendes",
      role: "Cliente em Processo Trabalhista",
      rating: 5,
      imageSrc: "/6522516.png",
    },
    {
      quote:
        "Após tentar outros escritórios sem sucesso, encontrei no Escritório Oliveira a solução para meu caso cível. Atendimento personalizado e resultados acima das expectativas.",
      author: "Fernanda Costa",
      role: "Cliente em Processo Cível",
      rating: 5,
      imageSrc: "/6522516.png",
    },
    {
      quote:
        "Como empresário, valorizo muito a consultoria preventiva que recebo. Tem sido fundamental para evitar problemas jurídicos e manter meu negócio em conformidade com a lei.",
      author: "Ricardo Almeida",
      role: "Empresário",
      rating: 5,
      imageSrc: "/6522516.png",
    },
  ]

  const services = [
    {
      title: "Análise de Contratos",
      description: "Revisão detalhada de contratos comerciais, identificando riscos e sugerindo melhorias.",
      icon: <FileSearch className="h-6 w-6" />,
    },
    {
      title: "Compliance Trabalhista",
      description: "Implementação de políticas de conformidade com a legislação trabalhista.",
      icon: <FileCheck className="h-6 w-6" />,
    },
    {
      title: "Gestão de Departamento Jurídico",
      description: "Suporte ou terceirização completa do departamento jurídico da sua empresa.",
      icon: <Briefcase className="h-6 w-6" />,
    },
    {
      title: "Elaboração de Contratos",
      description: "Criação de contratos personalizados para diferentes necessidades empresariais.",
      icon: <FilePlus2 className="h-6 w-6" />,
    },
    {
      title: "Representação em Negociações",
      description: "Acompanhamento jurídico em negociações comerciais e trabalhistas.",
      icon: <Handshake className="h-6 w-6" />,
    },
    {
      title: "Consultoria Preventiva",
      description: "Orientação jurídica para prevenir litígios e problemas legais futuros.",
      icon: <ShieldCheck className="h-6 w-6" />,
    },
  ]

  const processSteps = [
    {
      title: "Consulta Inicial",
      description: "Agendamos uma reunião para entender seu caso e avaliar as melhores estratégias jurídicas.",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      title: "Análise Jurídica",
      description:
        "Nossa equipe especializada analisa detalhadamente seu caso e desenvolve uma estratégia personalizada.",
      icon: <Scale className="h-6 w-6" />,
    },
    {
      title: "Representação Legal",
      description:
        "Atuamos com excelência e dedicação para defender seus interesses e garantir os melhores resultados.",
      icon: <Award className="h-6 w-6" />,
    },
  ]

  return (
    <div className="bg-white">
      {/* Navbar */}
      <Navbar
        height="h-20"
        logoSrc="/logo.svg"
        logo="Marleide Soares"
        links={[
          { text: "Início", href: "#inicio", isActive: activeSection === "inicio" },
          { text: "Serviços", href: "#servicos", isActive: activeSection === "servicos" },
          { text: "Sobre Nós", href: "#sobre", isActive: activeSection === "sobre" },
          { text: "Depoimentos", href: "#depoimentos", isActive: activeSection === "depoimentos" },
          { text: "Contato", href: "#contato", isActive: activeSection === "contato" },
        ]}
        ctaButton={{ text: "Agendar Consulta", href: "#contato" }}
        showSearch={false}
        showCart={false}
        showProfile={false}
        backgroundColor="bg-[#262425]"
        textColor="text-[#D9B88F]"
        activeTextColor="text-[#BF8654]"
        hoverTextColor="text-[#BF8654]"
        dropdownBackgroundColor="bg-[#262425]"
        ctaButtonStyle={{
          backgroundColor: "bg-[#8C583A]",
          textColor: "text-white",
          hoverBackgroundColor: "bg-[#733030]",
          hoverTextColor: "text-white",
        }}
        sticky={true}
        transparentOnTop={false}
      />

      {/* Header/Hero Section */}
      <div id="inicio">
        <Header
          customize="flex justify-center items-center"
          title="Advocacia Especializada em Direito Trabalhista e Cível"
          subtitle="EXCELÊNCIA E DEDICAÇÃO"
          description="Defendendo seus direitos com compromisso e profissionalismo. Oferecemos atendimento personalizado para garantir os melhores resultados para cada caso."
          primaryButtonText="Agende uma Consulta"
          primaryButtonLink="#contato"
          secondaryButtonText="Fale com um especialista"
          features={[
            "Mais de 15 anos de experiência",
            "Atendimento personalizado",
            "Primeira consulta gratuita",
            "Honorários justos",
          ]}
          imageSrc="/header-image-judge.png"
          // backgroundColor="bg-gradient-to-r from-[#D9B88F]/20 to-[#D9B88F]/5"
          backgroundColor="bg-[#F9F5F0]"
          accentColor="text-[#8C583A]"
          textColor="text-[#262425]"
          subtitleColor="text-[#733030]"
          descriptionColor="text-[#262425]/80"
          primaryButtonBackgroundColor="bg-[#8C583A]"
          primaryButtonTextColor="text-white"
          primaryButtonHoverBackgroundColor="bg-[#733030]"
          secondaryButtonBackgroundColor="bg-[#25D366]"
          secondaryButtonTextColor="text-white"
          secondaryButtonHoverBackgroundColor="bg-[#262425]/90"
        />
      </div>

      {/* Como Trabalhamos */}
      <section id="processo" className="bg-[#F9F5F0]">
        <div className="container mx-auto px-4">
          {/* <h2 className="text-4xl font-bold text-[#262425] mb-2 text-center">Como Trabalhamos</h2> */}
          <p className="text-lg font-medium text-[#8C583A] mb-8 text-center">NOSSO PROCESSO</p>

          <HowItWorks
            title=""
            steps={processSteps}
            backgroundColor="bg-[#F9F5F0]"
            textColor="text-[#262425]"
            titleColor="text-[#262425]"
            stepTitleColor="text-[#8C583A]"
            stepDescriptionColor="text-[#262425]/80"
            iconBackgroundColor="bg-[#D9B88F]"
            iconColor="text-[#8C583A]"
          />
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#262425] mb-2 text-center">Nossos Serviços</h2>
          <p className="text-lg font-medium text-[#8C583A] mb-8 text-center">SOLUÇÕES JURÍDICAS COMPLETAS</p>

          <ServicesFeature
            showMainContent={false}
            title=""
            subtitle=""
            mainTitle="Consultoria Jurídica Empresarial"
            mainDescription="Nossa consultoria jurídica empresarial oferece suporte completo para empresas de todos os portes. Ajudamos a prevenir problemas legais, otimizar processos e garantir a conformidade com a legislação vigente."
            mainImage="/placeholder.svg?height=600&width=600"
            mainButtonText="Agendar Consultoria"
            mainButtonLink="#contato"
            features={services}
            backgroundColor="bg-white"
            textColor="text-[#262425]"
            titleColor="text-[#262425]"
            subtitleColor="text-[#8C583A]"
            mainTitleColor="text-[#262425]"
            mainDescriptionColor="text-[#262425]/80"
            featureTitleColor="text-[#8C583A]"
            featureDescriptionColor="text-[#262425]/80"
            buttonBackgroundColor="bg-[#8C583A]"
            buttonTextColor="text-white"
            buttonHoverBackgroundColor="bg-[#733030]"
            iconColor="text-[#8C583A]"
            iconBackgroundColor="bg-[#D9B88F]/30"
          />

          <div className="text-center">
            <TrackClick eventName="services_wpp_cta_click" elementId="services-wpp-cta">
              <WhatsAppButton
                buttonText="Podemos te ajudar!"
                phoneNumber="+55 11 97431-6804"
                message="Olá! Gostaria de agendar uma consulta com a Dra. Oliveira." />
            </TrackClick>
          </div>
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className="py-20 bg-[#262425]">
        <div className="container mx-auto px-4">
          <ContentSection
            title="Marleide Soares"
            subtitle=""
            content="Olá sou a Marleide Soares, espcialista em direito trabalhista e cível, formada em direito no ano de 2005 pela USP e pós graduada direito trabalhista com mais de 200 clientes."
            imageSrc="/header-image-judge.png?height=400&width=600"
            imagePosition="right"
            backgroundColor="bg-[#262425]"
            textColor="text-[#D9B88F]"
            titleColor="text-white"
            subtitleColor="text-[#BF8654]"
            contentColor="text-[#D9B88F]"
            buttonBackgroundColor="bg-[#8C583A]"
            buttonTextColor="text-white"
            buttonHoverBackgroundColor="bg-[#733030]"
            borderColor="border-transparent"
          />
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className="py-20 bg-[#F9F5F0]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-[#262425] mb-2 text-center">Depoimentos</h2>
          <p className="text-lg font-medium text-[#8C583A] mb-8 text-center">O QUE NOSSOS CLIENTES DIZEM</p>

          <TestimonialGrid
            testimonials={testimonials}
            backgroundColor="bg-white"
            textColor="text-[#262425]/80"
            authorColor="text-[#262425]"
            roleColor="text-[#8C583A]"
            starColor="text-[#BF8654]"
            borderColor="border-[#D9B88F]"
          />

          <div className="text-center mt-8">
            <TrackClick eventName="testimonial_wpp_cta_click" elementId="testimonial-wpp-cta">
              <WhatsAppButton
                buttonText="Podemos te ajudar!"
                phoneNumber="+55 11 97431-6804"
                message="Olá! Gostaria de agendar uma consulta com a Dra. Oliveira." />
            </TrackClick>
          </div>
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <Contact
            showBudget={false}
            showCompany={false}
            showFileUpload={false}
            showTabs={false}
            title="Entre em Contato"
            subtitle="AGENDE UMA CONSULTA"
            description="Estamos prontos para ajudar com seu caso. Preencha o formulário abaixo ou entre em contato diretamente pelos nossos canais de atendimento."
            nameLabel="Nome Completo"
            emailLabel="E-mail"
            phoneLabel="Telefone"
            companyLabel="Empresa (se aplicável)"
            budgetLabel="Orçamento"
            serviceLabel="Serviço Necessário"
            messageLabel="Detalhes do Caso"
            buttonText="Enviar Mensagem"
            contactEmail="contato@oliveira-advocacia.com"
            contactPhone="(11) 99999-9999"
            contactAddress="Rua dos Advogados, 500, Centro, São Paulo - SP"
            businessHours="Segunda a Sexta, 9h às 18h"
            serviceOptions={["Direito Trabalhista", "Direito Cível", "Consultoria", "Outro"]}
            backgroundColor="bg-white"
            textColor="text-[#262425]"
            titleColor="text-[#262425]"
            subtitleColor="text-[#8C583A]"
            accentColor="text-[#BF8654]"
            buttonBackgroundColor="bg-[#8C583A]"
            buttonTextColor="text-white"
            buttonHoverBackgroundColor="bg-[#733030]"
            borderColor="border-[#D9B88F]"
          />
        </div>
      </section>

      {/* Footer */}
      <Footer
        logo="Dra. Oliveira Advocacia"
        description="Advocacia especializada em Direito Trabalhista e Cível, com atendimento personalizado e compromisso com os resultados."
        linkGroups={[
          {
            heading: "Serviços",
            links: [
              { text: "Direito Trabalhista", href: "#" },
              { text: "Direito Cível", href: "#" },
              { text: "Consultoria Jurídica", href: "#" },
            ],
          },
          {
            heading: "Contato",
            links: [
              { text: "Agende uma Consulta", href: "#contato" },
              { text: "Localização", href: "#" },
              { text: "Horário de Atendimento", href: "#" },
            ],
          },
        ]}
        socialLinks={[
          { type: "facebook", href: "#" },
          { type: "instagram", href: "#" },
          { type: "linkedin", href: "#" },
        ]}
        copyright="© 2025 Dra. Oliveira Advocacia. Todos os direitos reservados. OAB/SP 123456"
        backgroundColor="bg-[#262425]"
        textColor="text-[#D9B88F]"
        headingColor="text-white"
        linkColor="text-[#D9B88F]"
        linkHoverColor="text-[#BF8654]"
        socialIconColor="text-[#D9B88F]"
        socialIconHoverColor="text-[#BF8654]"
        borderColor="border-[#8C583A]"
      />

      <FloatingWhatsAppButton
        phoneNumber="+55 11 97431-6804"
        message="Olá! Gostaria de agendar uma consulta com a Dra. Oliveira."
      />

    </div>
  )
}