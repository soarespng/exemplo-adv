"use client"

import { useState, useEffect, useTransition } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import WhatsAppButton from "@/components/whatsapp-button"
import { Search, MessageSquare, CheckCircle, Clock, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

interface ContactSubmission {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  service: string | null
  budget: string | null
  message: string
  status: string
  created_at: string
}

export default function ContactsPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [isPending, startTransition] = useTransition()

  // Status counts
  const statusCounts = {
    total: submissions.length,
    new: submissions.filter((s) => s.status === "new").length,
    inProgress: submissions.filter((s) => s.status === "em-andamento").length,
    completed: submissions.filter((s) => s.status === "concluido").length,
  }

  // Filtered submissions
  const filteredSubmissions = submissions.filter((submission) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      submission.name.toLowerCase().includes(searchLower) ||
      submission.email.toLowerCase().includes(searchLower) ||
      submission.message.toLowerCase().includes(searchLower) ||
      (submission.company && submission.company.toLowerCase().includes(searchLower)) ||
      (submission.service && submission.service.toLowerCase().includes(searchLower))
    )
  })

  // Fetch submissions
  useEffect(() => {
    const fetchSubmissions = async () => {
      setLoading(true)
      const supabase = createClientComponentClient()

      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("Error fetching contact submissions:", error)
      } else {
        setSubmissions(data || [])
      }

      setLoading(false)
    }

    fetchSubmissions()

    // Set up real-time subscription
    const supabase = createClientComponentClient()
    const channel = supabase
      .channel("contact_submissions_changes")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "contact_submissions",
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setSubmissions((prev) => [payload.new as ContactSubmission, ...prev])
          } else if (payload.eventType === "UPDATE") {
            setSubmissions((prev) =>
              prev.map((submission) =>
                submission.id === payload.new.id ? (payload.new as ContactSubmission) : submission,
              ),
            )
          } else if (payload.eventType === "DELETE") {
            setSubmissions((prev) => prev.filter((submission) => submission.id !== payload.old.id))
          }
        },
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [])

  // Update submission status
  const updateStatus = async (id: string, status: string) => {
    // Optimistic update wrapped in startTransition
    startTransition(() => {
      setSubmissions((prev) =>
        prev.map((submission) => (submission.id === id ? { ...submission, status } : submission)),
      )
    })

    // Actual update
    const supabase = createClientComponentClient()
    const { error } = await supabase.from("contact_submissions").update({ status }).eq("id", id)

    if (error) {
      console.error("Error updating status:", error)
      // Revert optimistic update if there's an error
      const supabase = createClientComponentClient()
      const { data } = await supabase.from("contact_submissions").select("*").eq("id", id).single()

      if (data) {
        startTransition(() => {
          setSubmissions((prev) => prev.map((submission) => (submission.id === id ? data : submission)))
        })
      }
    }
  }

  if (loading) {
    return <ContactsSkeleton />
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Solicitações de Contato</h1>

        {/* Stats cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total</p>
                  <p className="text-2xl font-bold">{statusCounts.total}</p>
                </div>
                <MessageSquare className="h-6 w-6 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Novas</p>
                  <p className="text-2xl font-bold">{statusCounts.new}</p>
                </div>
                <AlertCircle className="h-6 w-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Em Andamento</p>
                  <p className="text-2xl font-bold">{statusCounts.inProgress}</p>
                </div>
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                  <p className="text-2xl font-bold">{statusCounts.completed}</p>
                </div>
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar por nome, email ou mensagem..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {filteredSubmissions.length > 0 ? (
          filteredSubmissions.map((submission) => (
            <Card key={submission.id} className="overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <CardTitle className="text-lg">{submission.name}</CardTitle>
                      <StatusBadge status={submission.status} />
                    </div>
                    <CardDescription>
                      {formatDistanceToNow(new Date(submission.created_at), { addSuffix: true, locale: ptBR })}
                    </CardDescription>
                  </div>
                  {submission.phone && (
                    <WhatsAppButton
                      phoneNumber={submission.phone}
                      message={`Olá ${submission.name}, recebi sua solicitação de contato e gostaria de conversar mais sobre como posso ajudar.`}
                      className="w-full sm:w-auto"
                    >
                      Responder via WhatsApp
                    </WhatsAppButton>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email:</p>
                    <p className="text-sm break-words">{submission.email}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Telefone:</p>
                    <p className="text-sm">{submission.phone || "Não informado"}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  {submission.company && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Empresa:</p>
                      <p className="text-sm">{submission.company}</p>
                    </div>
                  )}
                  {submission.service && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Serviço:</p>
                      <p className="text-sm">{submission.service}</p>
                    </div>
                  )}
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-500">Mensagem:</p>
                  <p className="text-sm whitespace-pre-wrap mt-1 p-3 bg-gray-50 rounded-md">{submission.message}</p>
                </div>

                <div className="flex flex-wrap gap-2 mt-4 justify-end">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(submission.id, "em-andamento")}
                    disabled={submission.status === "em-andamento" || isPending}
                    className="transition-all duration-200"
                  >
                    <Clock
                      className={`h-4 w-4 mr-1 ${submission.status === "em-andamento" ? "text-yellow-500" : ""}`}
                    />
                    Em Andamento
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateStatus(submission.id, "concluido")}
                    disabled={submission.status === "concluido" || isPending}
                    className="transition-all duration-200"
                  >
                    <CheckCircle
                      className={`h-4 w-4 mr-1 ${submission.status === "concluido" ? "text-green-500" : ""}`}
                    />
                    Concluído
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">
                {searchTerm
                  ? "Nenhuma solicitação encontrada para esta busca."
                  : "Nenhuma solicitação de contato encontrada."}
              </p>
              <p className="text-sm text-gray-400">
                {searchTerm
                  ? "Tente usar termos mais gerais ou verifique a ortografia."
                  : "As solicitações de contato aparecerão aqui quando os visitantes preencherem o formulário de contato."}
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  switch (status) {
    case "new":
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 transition-colors duration-300">
          Novo
        </Badge>
      )
    case "em-andamento":
      return (
        <Badge
          variant="outline"
          className="bg-yellow-50 text-yellow-700 border-yellow-200 transition-colors duration-300"
        >
          Em Andamento
        </Badge>
      )
    case "concluido":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 transition-colors duration-300">
          Concluído
        </Badge>
      )
    default:
      return (
        <Badge variant="outline" className="transition-colors duration-300">
          {status}
        </Badge>
      )
  }
}

function ContactsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />

      {/* Stats skeleton */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search skeleton */}
      <Skeleton className="h-10 w-full" />

      <div className="grid grid-cols-1 gap-4">
        {[1, 2, 3].map((i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <div className="flex justify-between">
                <div>
                  <Skeleton className="h-6 w-40 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <Skeleton className="h-9 w-36" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
              <Skeleton className="h-24 w-full mb-4" />
              <div className="flex justify-end gap-2">
                <Skeleton className="h-9 w-40" />
                <Skeleton className="h-9 w-40" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

