import { Suspense } from "react"
import { createServerSupabaseClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, PieChart } from "@/components/charts"
import { Skeleton } from "@/components/ui/skeleton"
import { CalendarDays, Users, Star, Clock, TrendingUp, Phone } from "lucide-react"

export const dynamic = "force-dynamic"

async function DashboardContent() {
  const supabase = await createServerSupabaseClient()

  // Obter período padrão (últimos 30 dias)
  const endDate = new Date().toISOString()
  const startDate = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()

  // Obter dados do dashboard
  const [pageViewsResponse, clickEventsResponse, deviceBreakdownResponse] = await Promise.all([
    // Obter contagem total de visualizações
    supabase
      .from("page_views")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startDate)
      .lte("created_at", endDate)
      .then(({ count }) => count || 0),

    // Obter contagem total de cliques
    supabase
      .from("click_events")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startDate)
      .lte("created_at", endDate)
      .then(({ count }) => count || 0),

    // Obter distribuição de dispositivos
    supabase
      .rpc("get_device_breakdown", {
        start_date: startDate,
        end_date: endDate,
      })
      .then(({ data }) => data || []),
  ])

  // Obter visualizações diárias
  const { data: dailyViews } = await supabase.rpc("get_daily_views", {
    start_date: startDate,
    end_date: endDate,
  })

  // Obter contagem de visitantes únicos
  const { data: uniqueVisitors } = await supabase
    .from("page_views")
    .select("session_id")
    .gte("created_at", startDate)
    .lte("created_at", endDate)

  const uniqueVisitorCount = new Set(uniqueVisitors?.map((v) => v.session_id)).size

  // Calcular taxa de conversão (cliques / visualizações)
  const conversionRate = pageViewsResponse > 0 ? ((clickEventsResponse / pageViewsResponse) * 100).toFixed(1) : "0"

  // Calcular taxa de engajamento (cliques / visitantes únicos)
  const engagementRate = uniqueVisitorCount > 0 ? ((clickEventsResponse / uniqueVisitorCount) * 100).toFixed(1) : "0"

  // Calcular média de visualizações diárias
  const avgDailyViews =
    dailyViews && dailyViews.length > 0
      ? (
          dailyViews.reduce((sum: number, day: { view_count: number }) => sum + day.view_count, 0) / dailyViews.length
        ).toFixed(0)
      : "0"

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl md:text-3xl font-bold">Dashboard de Desempenho</h1>
      </div>

      {/* Métricas principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Card className="bg-white">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Visitantes Únicos</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uniqueVisitorCount}</div>
            <p className="text-xs text-muted-foreground">Potenciais clientes nos últimos 30 dias</p>
          </CardContent>
        </Card>

        <Card className="bg-white">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Taxa de Engajamento</CardTitle>
            <Star className="h-4 w-4 text-[#25D366]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{engagementRate}%</div>
            <p className="text-xs text-muted-foreground">Visitantes que interagiram com o site</p>
          </CardContent>
        </Card>

        <Card className="bg-white sm:col-span-2 md:col-span-1">
          <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-sm font-medium">Média Diária</CardTitle>
            <CalendarDays className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgDailyViews}</div>
            <p className="text-xs text-muted-foreground">Visualizações médias por dia</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Gráfico de tendência */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Tendência de Visitantes</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription>Evolução de visitantes nos últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] md:h-80">
            <LineChart
              data={dailyViews || []}
              xField="date"
              yField="view_count"
              xLabel="Data"
              yLabel="Visitantes"
              color="#8C583A"
            />
          </CardContent>
        </Card>

        {/* Dispositivos */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Dispositivos Utilizados</CardTitle>
              <Phone className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription>Como seus potenciais clientes acessam seu site</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] md:h-80">
            <PieChart
              data={deviceBreakdownResponse}
              nameField="device_type"
              valueField="count"
              colors={["#8C583A", "#BF8654", "#D9B88F", "#733030"]}
            />
          </CardContent>
        </Card>
      </div>

      {/* Métricas de conversão */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Desempenho de Conversão</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </div>
            <CardDescription>Eficiência na captação de clientes</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Taxa de Conversão</span>
                  <span className="text-sm font-medium">{conversionRate}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8C583A] rounded-full"
                    style={{ width: `${Math.min(Number(conversionRate) * 2, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">Porcentagem de visitantes que clicaram em alguma ação</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Engajamento</span>
                  <span className="text-sm font-medium">{engagementRate}%</span>
                </div>
                <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#BF8654] rounded-full"
                    style={{ width: `${Math.min(Number(engagementRate) * 2, 100)}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground">Porcentagem de visitantes únicos que interagiram</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resumo de Desempenho</CardTitle>
            <CardDescription>Últimos 30 dias</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Total de visualizações</span>
                <span className="font-bold">{pageViewsResponse}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Visitantes Únicos</span>
                <span className="font-bold">{uniqueVisitorCount}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Total de Interações</span>
                <span className="font-bold">{clickEventsResponse}</span>
              </div>
              <div className="flex justify-between items-center border-b pb-2">
                <span className="font-medium">Média Diária</span>
                <span className="font-bold">{avgDailyViews} visualizações/dia</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-medium">Taxa de Conversão</span>
                <span className="font-bold">{conversionRate}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  )
}

function DashboardSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <Skeleton className="h-10 w-64" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <Card key={i} className={i === 2 ? "sm:col-span-2 md:col-span-1" : ""}>
              <CardHeader className="pb-2">
                <div className="flex justify-between">
                  <Skeleton className="h-5 w-32" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-1" />
                <Skeleton className="h-4 w-24" />
              </CardContent>
            </Card>
          ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {Array(2)
          .fill(0)
          .map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <div className="flex justify-between">
                  <Skeleton className="h-6 w-48" />
                  <Skeleton className="h-4 w-4 rounded-full" />
                </div>
                <Skeleton className="h-4 w-64 mt-1" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-[300px] md:h-80 w-full" />
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  )
}

