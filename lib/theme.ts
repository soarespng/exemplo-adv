// Tema centralizado para o site
export const theme = {
    // Cores principais
    colors: {
      // Paleta principal
      primary: {
        main: "#9D2968", // Rosa escuro/magenta
        light: "#D48FBE", // Rosa claro/lilás
        dark: "#7A1F50", // Versão mais escura do rosa principal
        contrastText: "#FFFFFF", // Branco para contraste com o rosa
      },
      // Cores secundárias
      secondary: {
        main: "#052DA6", // Azul médio
        light: "#2E54C9", // Azul médio mais claro
        dark: "#06137B", // Azul muito escuro
        contrastText: "#FFFFFF", // Branco para contraste com o azul
      },
      // Cores de texto
      text: {
        primary: "#06137B", // Azul escuro para texto principal
        secondary: "#052DA6", // Azul médio para texto secundário
        light: "#F5D3B8", // Bege claro para texto sobre fundos escuros
        disabled: "#9E9E9E", // Cinza para texto desativado
      },
      // Cores de fundo
      background: {
        default: "#FFFFFF", // Branco como fundo padrão
        paper: "#FFFFFF", // Branco para elementos de papel/cards
        light: "#F5D3B8", // Bege claro para seções de destaque
        dark: "#06137B", // Azul escuro para seções contrastantes
      },
      // Cores de destaque
      accent: {
        main: "#D48FBE", // Rosa claro como cor de destaque
        light: "#E5B5D6", // Versão mais clara do rosa
        dark: "#9D2968", // Rosa escuro para elementos de destaque importantes
      },
      // Cores de borda
      border: {
        main: "#D48FBE", // Rosa claro para bordas
        light: "#F5D3B8", // Bege claro para bordas sutis
        dark: "#9D2968", // Rosa escuro para bordas de destaque
      },
      // Estados
      state: {
        success: "#4CAF50", // Verde para sucesso
        warning: "#FF9800", // Laranja para avisos
        error: "#F44336", // Vermelho para erros
        info: "#2196F3", // Azul para informações
      },
    },
  
    // Tipografia
    typography: {
      // Famílias de fonte
      fontFamily: {
        heading: "font-serif",
        body: "font-sans",
      },
      // Tamanhos de fonte
      fontSize: {
        xs: "text-xs",
        sm: "text-sm",
        base: "text-base",
        lg: "text-lg",
        xl: "text-xl",
        "2xl": "text-2xl",
        "3xl": "text-3xl",
        "4xl": "text-4xl",
      },
      // Pesos de fonte
      fontWeight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      // Estilos de fonte
      fontStyle: {
        normal: "normal",
        italic: "italic",
      },
    },
  
    // Componentes específicos
    components: {
      // Navbar
      navbar: {
        height: "h-[10vh]",
        backgroundColor: "#06137B", // Azul escuro
        textColor: "#F5D3B8", // Bege claro
        activeTextColor: "#D48FBE", // Rosa claro
        hoverTextColor: "#D48FBE", // Rosa claro
        dropdownBackgroundColor: "#052DA6", // Azul médio
        ctaButton: {
          backgroundColor: "#9D2968", // Rosa escuro
          textColor: "#FFFFFF", // Branco
          hoverBackgroundColor: "#7A1F50", // Rosa mais escuro
          hoverTextColor: "#FFFFFF", // Branco
        },
      },
  
      // Header
      header: {
        backgroundColor: "#F5D3B8", // Bege claro
        textColor: "#06137B", // Azul escuro
        subtitleColor: "#9D2968", // Rosa escuro
        descriptionColor: "#052DA6", // Azul médio
        accentColor: "#9D2968", // Rosa escuro
        primaryButton: {
          backgroundColor: "#9D2968", // Rosa escuro
          textColor: "#FFFFFF", // Branco
          hoverBackgroundColor: "#7A1F50", // Rosa mais escuro
          hoverTextColor: "#FFFFFF", // Branco
        },
        secondaryButton: {
          backgroundColor: "#FFFFFF", // Branco
          textColor: "#06137B", // Azul escuro
          hoverBackgroundColor: "#F5D3B8", // Bege claro
          hoverTextColor: "#06137B", // Azul escuro
        },
      },
  
      // Content Section
      contentSection: {
        backgroundColor: "#FFFFFF", // Branco
        textColor: "#06137B", // Azul escuro
        titleColor: "#06137B", // Azul escuro
        subtitleColor: "#9D2968", // Rosa escuro
        contentColor: "#052DA6", // Azul médio
        buttonBackgroundColor: "#9D2968", // Rosa escuro
        buttonTextColor: "#FFFFFF", // Branco
        buttonHoverBackgroundColor: "#7A1F50", // Rosa mais escuro
        borderColor: "transparent",
      },
  
      // Testimonials
      testimonials: {
        backgroundColor: "#FFFFFF", // Branco
        textColor: "#052DA6", // Azul médio
        authorColor: "#06137B", // Azul escuro
        roleColor: "#9D2968", // Rosa escuro
        starColor: "#D48FBE", // Rosa claro
        borderColor: "border-[#F5D3B8]", // Bege claro
      },
  
      // Contact
      contact: {
        backgroundColor: "#FFFFFF", // Branco
        textColor: "#06137B", // Azul escuro
        titleColor: "#06137B", // Azul escuro
        subtitleColor: "#9D2968", // Rosa escuro
        accentColor: "#D48FBE", // Rosa claro
        buttonBackgroundColor: "#9D2968", // Rosa escuro
        buttonTextColor: "#FFFFFF", // Branco
        buttonHoverBackgroundColor: "#7A1F50", // Rosa mais escuro
        borderColor: "border-[#F5D3B8]", // Bege claro
      },
  
      // Footer
      footer: {
        backgroundColor: "#06137B", // Azul escuro
        textColor: "#F5D3B8", // Bege claro
        headingColor: "#FFFFFF", // Branco
        linkColor: "#D48FBE", // Rosa claro
        linkHoverColor: "#FFFFFF", // Branco
        socialIconColor: "#D48FBE", // Rosa claro
        socialIconHoverColor: "#FFFFFF", // Branco
        borderColor: "border-[#052DA6]", // Azul médio
      },
  
      // Services
      services: {
        backgroundColor: "#FFFFFF", // Branco
        textColor: "#06137B", // Azul escuro
        titleColor: "#06137B", // Azul escuro
        subtitleColor: "#9D2968", // Rosa escuro
        serviceTitleColor: "#9D2968", // Rosa escuro
        serviceDescriptionColor: "#052DA6", // Azul médio
        serviceBackgroundColor: "#FFFFFF", // Branco
        buttonBackgroundColor: "#9D2968", // Rosa escuro
        buttonTextColor: "#FFFFFF", // Branco
        buttonHoverBackgroundColor: "#7A1F50", // Rosa mais escuro
        borderColor: "border-[#F5D3B8]", // Bege claro
        iconColor: "#9D2968", // Rosa escuro
        iconBackgroundColor: "bg-[#F5D3B8]", // Bege claro
      },
  
      // How It Works
      howItWorks: {
        backgroundColor: "#F5D3B8", // Bege claro
        textColor: "#06137B", // Azul escuro
        titleColor: "#06137B", // Azul escuro
        stepTitleColor: "#9D2968", // Rosa escuro
        stepDescriptionColor: "#052DA6", // Azul médio
        iconBackgroundColor: "#9D2968", // Rosa escuro
        iconColor: "#FFFFFF", // Branco
      },
  
      // FAQ
      faq: {
        backgroundColor: "#FFFFFF", // Branco
        textColor: "#06137B", // Azul escuro
        titleColor: "#06137B", // Azul escuro
        questionColor: "#9D2968", // Rosa escuro
        answerColor: "#052DA6", // Azul médio
        accentColor: "#D48FBE", // Rosa claro
        borderColor: "border-[#F5D3B8]", // Bege claro
      },
  
      // Cards
      card: {
        backgroundColor: "#FFFFFF", // Branco
        hoverBackgroundColor: "#F5D3B8", // Bege claro
        titleColor: "#06137B", // Azul escuro
        textColor: "#052DA6", // Azul médio
        borderColor: "#D48FBE", // Rosa claro
        shadowColor: "shadow-[#D48FBE]/10", // Rosa claro com opacidade
      },
  
      // Buttons
      button: {
        // Primário
        primary: {
          backgroundColor: "#9D2968", // Rosa escuro
          textColor: "#FFFFFF", // Branco
          hoverBackgroundColor: "#7A1F50", // Rosa mais escuro
          hoverTextColor: "#FFFFFF", // Branco
          disabledBackgroundColor: "#D48FBE", // Rosa claro
          disabledTextColor: "#FFFFFF", // Branco
        },
        // Secundário
        secondary: {
          backgroundColor: "#052DA6", // Azul médio
          textColor: "#FFFFFF", // Branco
          hoverBackgroundColor: "#06137B", // Azul escuro
          hoverTextColor: "#FFFFFF", // Branco
          disabledBackgroundColor: "#9E9E9E", // Cinza
          disabledTextColor: "#FFFFFF", // Branco
        },
        // Outline
        outline: {
          backgroundColor: "transparent",
          textColor: "#9D2968", // Rosa escuro
          borderColor: "#9D2968", // Rosa escuro
          hoverBackgroundColor: "#9D2968", // Rosa escuro
          hoverTextColor: "#FFFFFF", // Branco
          disabledBackgroundColor: "transparent",
          disabledTextColor: "#9E9E9E", // Cinza
          disabledBorderColor: "#9E9E9E", // Cinza
        },
        // Ghost
        ghost: {
          backgroundColor: "transparent",
          textColor: "#9D2968", // Rosa escuro
          hoverBackgroundColor: "#F5D3B8", // Bege claro
          hoverTextColor: "#9D2968", // Rosa escuro
          disabledBackgroundColor: "transparent",
          disabledTextColor: "#9E9E9E", // Cinza
        },
      },
  
      // Forms
      form: {
        backgroundColor: "#FFFFFF", // Branco
        textColor: "#06137B", // Azul escuro
        labelColor: "#052DA6", // Azul médio
        inputBackgroundColor: "#FFFFFF", // Branco
        inputTextColor: "#06137B", // Azul escuro
        inputBorderColor: "#D48FBE", // Rosa claro
        inputFocusBorderColor: "#9D2968", // Rosa escuro
        placeholderColor: "#9E9E9E", // Cinza
        errorColor: "#F44336", // Vermelho
      },
  
      // Tabs
      tabs: {
        backgroundColor: "#FFFFFF", // Branco
        textColor: "#052DA6", // Azul médio
        activeTextColor: "#9D2968", // Rosa escuro
        hoverTextColor: "#9D2968", // Rosa escuro
        borderColor: "#D48FBE", // Rosa claro
        activeBorderColor: "#9D2968", // Rosa escuro
      },
  
      // Modals
      modal: {
        overlayColor: "bg-black/50", // Preto com opacidade
        backgroundColor: "#FFFFFF", // Branco
        titleColor: "#06137B", // Azul escuro
        textColor: "#052DA6", // Azul médio
        closeButtonColor: "#9D2968", // Rosa escuro
        closeButtonHoverColor: "#7A1F50", // Rosa mais escuro
      },
  
      // Alerts
      alert: {
        // Informação
        info: {
          backgroundColor: "#E3F2FD", // Azul claro
          textColor: "#0D47A1", // Azul escuro
          borderColor: "#2196F3", // Azul
          iconColor: "#2196F3", // Azul
        },
        // Sucesso
        success: {
          backgroundColor: "#E8F5E9", // Verde claro
          textColor: "#1B5E20", // Verde escuro
          borderColor: "#4CAF50", // Verde
          iconColor: "#4CAF50", // Verde
        },
        // Aviso
        warning: {
          backgroundColor: "#FFF3E0", // Laranja claro
          textColor: "#E65100", // Laranja escuro
          borderColor: "#FF9800", // Laranja
          iconColor: "#FF9800", // Laranja
        },
        // Erro
        error: {
          backgroundColor: "#FFEBEE", // Vermelho claro
          textColor: "#B71C1C", // Vermelho escuro
          borderColor: "#F44336", // Vermelho
          iconColor: "#F44336", // Vermelho
        },
      },
    },
  
    // Espaçamento
    spacing: {
      xs: "0.25rem", // 4px
      sm: "0.5rem", // 8px
      md: "1rem", // 16px
      lg: "1.5rem", // 24px
      xl: "2rem", // 32px
      "2xl": "3rem", // 48px
      "3xl": "4rem", // 64px
    },
  
    // Breakpoints
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  
    // Bordas
    borderRadius: {
      none: "0",
      sm: "0.125rem", // 2px
      md: "0.25rem", // 4px
      lg: "0.5rem", // 8px
      xl: "1rem", // 16px
      full: "9999px",
    },
  
    // Sombras
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    },
  
    // Transições
    transitions: {
      fast: "150ms",
      normal: "300ms",
      slow: "500ms",
    },
  }
  
  // Função auxiliar para acessar facilmente valores do tema
  export function getThemeValue(path: string): string {
    const parts = path.split(".")
    let value: any = theme
  
    for (const part of parts) {
      if (value[part] === undefined) {
        console.warn(`Theme path "${path}" not found`)
        return ""
      }
      value = value[part]
    }
  
    return value
  }
  
  