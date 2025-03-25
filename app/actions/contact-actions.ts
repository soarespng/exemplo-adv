"use server"

import { createServerSupabaseClient } from "@/lib/supabase/client"

interface ContactFormData {
  name: string
  email: string
  phone?: string
  company?: string
  budget?: string
  service?: string
  message: string
  terms: boolean
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return {
        success: false,
        message: "Por favor, preencha todos os campos obrigatórios.",
      }
    }

    // Validate terms acceptance
    if (!formData.terms) {
      return {
        success: false,
        message: "Você precisa concordar com os termos para enviar o formulário.",
      }
    }

    // Create server-side Supabase client
    const supabase = await createServerSupabaseClient()

    // Insert data into contact_submissions table
    const { data, error } = await supabase
      .from("contact_submissions")
      .insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        service: formData.service || null,
        budget: formData.budget || null,
        message: formData.message,
        status: "new",
      })
      .select()

    if (error) {
      console.error("Error submitting contact form:", error)
      return {
        success: false,
        message: "Ocorreu um erro ao enviar o formulário. Por favor, tente novamente.",
      }
    }

    return {
      success: true,
      message: "Sua mensagem foi enviada com sucesso! Entraremos em contato em breve.",
      data,
    }
  } catch (error) {
    console.error("Error in submitContactForm:", error)
    return {
      success: false,
      message: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
    }
  }
}

