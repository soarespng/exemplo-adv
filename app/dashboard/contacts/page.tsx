import { Suspense } from "react"
import { createServerSupabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { formatDistanceToNow } from "date-fns"
import { ptBR } from "date-fns/locale"
import WhatsAppButton from "@/components/whatsapp-button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Search, Filter, MessageSquare, CheckCircle, Clock } from "lucide-react"

export const dynamic = "force-dynamic"

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

async function ContactsContent() {
  const supabase = await createServerSupabaseClient()

  // Fetch contact submissions
  const { data: submissions, error } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching contact submissions:", error)
    return <div>Erro ao carregar solicitações de contato.</div>
  }

  // Function to update submission status
  const updateStatus = async (id: string, status: string) => {
    "use server"
    const supabase = await createServerSupabaseClient()
    await supabase.from("contact_submissions").update({ status }).eq("id", id)
  }

  // Count submissions by status
  const statusCounts = {
    total: submissions?.length || 0,
    new: submissions?.filter((s) => s.status === "new").length || 0,
    inProgress: submissions?.filter((s) => s.status === "em-andamento").length || 0,
    completed: submissions?.filter((s) => s.status === "concluido").length || 0,
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold">Solicitações de Contato</h1>

        {/* Stats cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                <MessageSquare className="h-6 w-6 text-blue-500" />
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

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Buscar por nome, email ou mensagem..." className="pl-8" />
          </div>
          <div className="flex gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="new">Novos</SelectItem>
                <SelectItem value="em-andamento">Em Andamento</SelectItem>
                <SelectItem value="concluido">Concluídos</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {submissions && submissions.length > 0 ? (
          submissions.map((submission: ContactSubmission) => (
            <Card key={submission.id} className="overflow-hidden">
              <CardHeader className="pb-2 flex flex-row items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <CardTitle>{submission.name}</CardTitle>
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
                  >
                    Responder via WhatsApp
                  </WhatsAppButton>
                )}
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Email:</p>
                    <p className="text-sm">{submission.email}</p>
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

                <div className="flex gap-2 mt-4 justify-end">
                  <form action={updateStatus.bind(null, submission.id, "em-andamento")}>
                    <Button variant="outline" size="sm" type="submit" disabled={submission.status === "em-andamento"}>
                      Marcar como Em Andamento
                    </Button>
                  </form>
                  <form action={updateStatus.bind(null, submission.id, "concluido")}>
                    <Button variant="outline" size="sm" type="submit" disabled={submission.status === "concluido"}>
                      Marcar como Concluído
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <p className="text-gray-500 mb-4">Nenhuma solicitação de contato encontrada.</p>
              <p className="text-sm text-gray-400">
                As solicitações de contato aparecerão aqui quando os visitantes preencherem o formulário de contato.
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
        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
          Novo
        </Badge>
      )
    case "em-andamento":
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
          Em Andamento
        </Badge>
      )
    case "concluido":
      return (
        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
          Concluído
        </Badge>
      )
    default:
      return <Badge variant="outline">{status}</Badge>
  }
}

export default function ContactsPage() {
  return (
    <Suspense fallback={<ContactsSkeleton />}>
      <ContactsContent />
    </Suspense>
  )
}

function ContactsSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-10 w-64" />

      {/* Stats skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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

      {/* Filter skeleton */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Skeleton className="h-10 flex-1" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[180px]" />
          <Skeleton className="h-10 w-10" />
        </div>
      </div>

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

