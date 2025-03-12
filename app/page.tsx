import Contact from "@/components/contact-complex"
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
  // Definição centralizada da paleta de cores
  const colors = {
    dark: "#262425", // Cinza escuro/quase preto - para fundos escuros e texto principal
    beige: "#D9B88F", // Bege/marrom claro - para elementos de destaque e texto sobre fundo escuro
    gold: "#BF8654", // Marrom médio/dourado - para elementos de destaque e hover
    brown: "#8C583A", // Marrom escuro - para botões e elementos de ação
    burgundy: "#733030", // Vermelho escuro/bordô - para elementos de destaque secundários
    white: "#FFFFFF", // Branco - para fundos claros e texto sobre fundos escuros
    offWhite: "#F9F5F0", // Branco suave - para fundos alternativos
  }

  // Definição de estilos comuns para reutilização
  const styles = {
    section: {
      padding: "py-20",
    },
    container: "container mx-auto px-4",
    sectionTitle: {
      main: `text-4xl font-bold text-[${colors.dark}] mb-2`,
      light: `text-4xl font-bold text-[${colors.white}] mb-2`,
    },
    sectionSubtitle: {
      main: `text-lg font-medium text-[${colors.brown}] mb-8`,
      light: `text-lg font-medium text-[${colors.beige}] mb-8`,
    },
  }

  // Dados de depoimentos
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

  // Dados dos serviços
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

  // Dados do processo de trabalho
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
        logo="Dra. Oliveira Advocacia"
        links={[
          { text: "Início", href: "#", isActive: true },
          { text: "Sobre Nós", href: "#sobre" },
          { text: "Serviços", href: "#servicos" },
          { text: "Depoimentos", href: "#depoimentos" },
          { text: "Contato", href: "#contato" },
        ]}
        ctaButton={{ text: "Agendar Consulta", href: "#contato" }}
        showSearch={false}
        showCart={false}
        showProfile={false}
        backgroundColor={`bg-[${colors.dark}]`}
        textColor={`text-[${colors.beige}]`}
        activeTextColor={`text-[${colors.gold}]`}
        hoverTextColor={`text-[${colors.gold}]`}
        dropdownBackgroundColor={`bg-[${colors.dark}]`}
        ctaButtonStyle={{
          backgroundColor: `bg-[${colors.brown}]`,
          textColor: "text-white",
          hoverBackgroundColor: `bg-[${colors.burgundy}]`,
          hoverTextColor: "text-white",
        }}
        sticky={true}
        transparentOnTop={false}
      />

      {/* Header/Hero Section */}
      <Header
        customize="flex justify-center items-center min-h-[90vh]"
        title="Advocacia Especializada em Direito Trabalhista e Cível"
        subtitle="EXCELÊNCIA E DEDICAÇÃO"
        description="Defendendo seus direitos com compromisso e profissionalismo. Oferecemos atendimento personalizado para garantir os melhores resultados para cada caso."
        primaryButtonText="Agende uma Consulta"
        primaryButtonLink="#contato"
        secondaryButtonText="Conheça Nossos Serviços"
        secondaryButtonLink="#servicos"
        features={[
          "Mais de 15 anos de experiência",
          "Atendimento personalizado",
          "Primeira consulta gratuita",
          "Honorários justos",
        ]}
        imageSrc="/header-image-judge.png"
        backgroundColor={`bg-gradient-to-r from-[${colors.beige}]/20 to-[${colors.beige}]/5`}
        accentColor={`text-[${colors.brown}]`}
        textColor={`text-[${colors.dark}]`}
        subtitleColor={`text-[${colors.burgundy}]`}
        descriptionColor={`text-[${colors.dark}]/80`}
        primaryButtonBackgroundColor={`bg-[${colors.brown}]`}
        primaryButtonTextColor="text-white"
        primaryButtonHoverBackgroundColor={`bg-[${colors.burgundy}]`}
        secondaryButtonBackgroundColor={`bg-[${colors.dark}]`}
        secondaryButtonTextColor={`text-[${colors.beige}]`}
        secondaryButtonHoverBackgroundColor={`bg-[${colors.dark}]/90`}
      />

      {/* Como Trabalhamos */}
      <section id="processo" className={`${styles.section.padding} bg-[${colors.offWhite}]`}>
        <div className={styles.container}>
          <h2 className={`text-center ${styles.sectionTitle.main}`}>Como Trabalhamos</h2>
          <p className={`text-center ${styles.sectionSubtitle.main}`}>NOSSO PROCESSO</p>

          <HowItWorks
            backgroundColor={`bg-[${colors.offWhite}]`}
            textColor={`text-[${colors.dark}]`}
            titleColor={`text-[${colors.dark}]`}
            stepTitleColor={`text-[${colors.brown}]`}
            stepDescriptionColor={`text-[${colors.dark}]/80`}
            iconBackgroundColor={`bg-[${colors.beige}]`}
            iconColor={`text-[${colors.brown}]`}
            steps={processSteps}
          />
        </div>
      </section>

      {/* Serviços */}
      <section id="servicos" className={`${styles.section.padding} bg-white`}>
        <div className={styles.container}>
          <h2 className={`text-center ${styles.sectionTitle.main}`}>Nossos Serviços</h2>
          <p className={`text-center ${styles.sectionSubtitle.main}`}>SOLUÇÕES JURÍDICAS COMPLETAS</p>

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
            textColor={`text-[${colors.dark}]`}
            titleColor={`text-[${colors.dark}]`}
            subtitleColor={`text-[${colors.brown}]`}
            mainTitleColor={`text-[${colors.dark}]`}
            mainDescriptionColor={`text-[${colors.dark}]/80`}
            featureTitleColor={`text-[${colors.brown}]`}
            featureDescriptionColor={`text-[${colors.dark}]/80`}
            buttonBackgroundColor={`bg-[${colors.brown}]`}
            buttonTextColor="text-white"
            buttonHoverBackgroundColor={`bg-[${colors.burgundy}]`}
            iconColor={`text-[${colors.brown}]`}
            iconBackgroundColor={`bg-[${colors.beige}]/30`}
          />
        </div>
      </section>

      {/* Sobre Nós */}
      <section id="sobre" className={`${styles.section.padding} bg-[${colors.dark}]`}>
        <div className={styles.container}>
          <ContentSection
            title="Sobre o Escritório Oliveira"
            subtitle="NOSSA HISTÓRIA"
            content="Fundado em 2008 pela Dra. Marleide Oliveira, nosso escritório se destaca pela excelência e dedicação aos clientes. Com uma equipe de advogados especializados em diferentes áreas do direito, oferecemos soluções jurídicas personalizadas e eficientes. Nosso compromisso é com a ética, a transparência e, acima de tudo, com a defesa incansável dos interesses de nossos clientes. Ao longo de mais de 15 anos, construímos uma reputação sólida baseada em resultados consistentes e atendimento humanizado."
            imageSrc="/header-image-judge.png?height=400&width=600"
            buttonText="Conheça Nossa Equipe"
            buttonLink="#equipe"
            imagePosition="right"
            backgroundColor={`bg-[${colors.dark}]`}
            textColor={`text-[${colors.beige}]`}
            titleColor="text-white"
            subtitleColor={`text-[${colors.gold}]`}
            contentColor={`text-[${colors.beige}]`}
            buttonBackgroundColor={`bg-[${colors.brown}]`}
            buttonTextColor="text-white"
            buttonHoverBackgroundColor={`bg-[${colors.burgundy}]`}
            borderColor="border-transparent"
          />
        </div>
      </section>

      {/* Depoimentos */}
      <section id="depoimentos" className={`${styles.section.padding} bg-[${colors.offWhite}]`}>
        <div className={styles.container}>
          <h2 className={`text-center ${styles.sectionTitle.main}`}>Depoimentos</h2>
          <p className={`text-center ${styles.sectionSubtitle.main}`}>O QUE NOSSOS CLIENTES DIZEM</p>

          <TestimonialGrid
            testimonials={testimonials}
            backgroundColor="bg-white"
            textColor={`text-[${colors.dark}]/80`}
            authorColor={`text-[${colors.dark}]`}
            roleColor={`text-[${colors.brown}]`}
            starColor={`text-[${colors.gold}]`}
            borderColor={`border-[${colors.beige}]`}
          />
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className={`${styles.section.padding} bg-white`}>
        <div className={styles.container}>
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
            serviceOptions={["Direito Trabalhista", "Direito Cível", "Consultoria Empresarial", "Outro"]}
            budgetOptions={["Até R$ 5.000", "R$ 5.000 - R$ 10.000", "R$ 10.000 - R$ 20.000", "Acima de R$ 20.000"]}
            backgroundColor="bg-white"
            textColor={`text-[${colors.dark}]`}
            titleColor={`text-[${colors.dark}]`}
            subtitleColor={`text-[${colors.brown}]`}
            accentColor={`text-[${colors.gold}]`}
            buttonBackgroundColor={`bg-[${colors.brown}]`}
            buttonTextColor="text-white"
            buttonHoverBackgroundColor={`bg-[${colors.burgundy}]`}
            borderColor={`border-[${colors.beige}]`}
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
        backgroundColor={`bg-[${colors.dark}]`}
        textColor={`text-[${colors.beige}]`}
        headingColor="text-white"
        linkColor={`text-[${colors.beige}]`}
        linkHoverColor={`text-[${colors.gold}]`}
        socialIconColor={`text-[${colors.beige}]`}
        socialIconHoverColor={`text-[${colors.gold}]`}
        borderColor={`border-[${colors.brown}]`}
      />
    </div>
  )
}

