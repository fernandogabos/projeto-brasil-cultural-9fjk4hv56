import { Package, Truck, CheckCircle2, AlertTriangle, Activity as ActivityIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { chartDataFlow, chartDataStatus, activities } from '@/lib/mock-data'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

const chartConfigFlow = {
  envios: { label: 'Envios', color: 'hsl(var(--chart-2))' },
  entregas: { label: 'Entregas', color: 'hsl(var(--chart-1))' },
}

const chartConfigStatus = {
  Entregue: { label: 'Entregue', color: 'hsl(var(--chart-1))' },
  'Em Rota': { label: 'Em Rota', color: 'hsl(var(--chart-2))' },
  Pendente: { label: 'Pendente', color: 'hsl(var(--chart-5))' },
  Atrasado: { label: 'Atrasado', color: 'hsl(var(--chart-3))' },
  Cancelado: { label: 'Cancelado', color: 'hsl(var(--chart-4))' },
}

export default function Index() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Painel de Controle</h1>
        <p className="text-muted-foreground mt-1">
          Visão geral das operações logísticas da Brasil Cultural.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-sm border-border/50 hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total de Envios
            </CardTitle>
            <Package className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1.248</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className="text-accent font-medium">+12%</span> em relação ao mês anterior
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Em Trânsito</CardTitle>
            <Truck className="w-4 h-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground mt-1">15 veículos ativos no momento</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-border/50 hover:border-border transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Entregas Concluídas
            </CardTitle>
            <CheckCircle2 className="w-4 h-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">894</div>
            <p className="text-xs text-muted-foreground mt-1">Taxa de sucesso de 98.5%</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-warning/20 bg-warning/5 hover:border-warning/30 transition-colors">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-warning">Alertas / Atrasos</CardTitle>
            <AlertTriangle className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">12</div>
            <p className="text-xs text-warning/80 mt-1">Requerem atenção imediata</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-2 shadow-sm border-border/50 flex flex-col">
          <CardHeader>
            <CardTitle>Fluxo de Entregas</CardTitle>
            <CardDescription>Volume de remessas e entregas ao longo da semana.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pb-4">
            <ChartContainer config={chartConfigFlow} className="w-full h-full min-h-[300px]">
              <AreaChart data={chartDataFlow} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fillEnvios" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="fillEntregas" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tickMargin={10} />
                <YAxis axisLine={false} tickLine={false} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Area
                  type="monotone"
                  dataKey="envios"
                  stroke="hsl(var(--chart-2))"
                  fillOpacity={1}
                  fill="url(#fillEnvios)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="entregas"
                  stroke="hsl(var(--chart-1))"
                  fillOpacity={1}
                  fill="url(#fillEntregas)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1 shadow-sm border-border/50 flex flex-col">
          <CardHeader>
            <CardTitle>Status Geral</CardTitle>
            <CardDescription>Distribuição das remessas ativas.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex items-center justify-center pb-4">
            <ChartContainer
              config={chartConfigStatus}
              className="w-full h-full min-h-[250px] aspect-square"
            >
              <PieChart>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <Pie
                  data={chartDataStatus}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  stroke="none"
                >
                  {chartDataStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <ChartLegend content={<ChartLegendContent className="flex-wrap" />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ActivityIcon className="w-5 h-5 text-muted-foreground" />
            Atividades Recentes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {activities.map((activity, index) => (
              <div key={activity.id} className="flex gap-4 relative">
                {/* Timeline line */}
                {index !== activities.length - 1 && (
                  <div className="absolute top-8 left-4 bottom-[-1.5rem] w-px bg-border"></div>
                )}

                <div
                  className={cn(
                    'relative z-10 w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm',
                    activity.type === 'success'
                      ? 'bg-accent/10 text-accent'
                      : activity.type === 'alert'
                        ? 'bg-warning/10 text-warning'
                        : 'bg-secondary text-secondary-foreground',
                  )}
                >
                  {activity.type === 'success' ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : activity.type === 'alert' ? (
                    <AlertTriangle className="w-4 h-4" />
                  ) : (
                    <Truck className="w-4 h-4" />
                  )}
                </div>

                <div className="flex flex-col pt-1 pb-2">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-sm text-foreground">
                      {activity.shipmentId}
                    </span>
                    <Badge
                      variant="outline"
                      className="text-[10px] h-4 px-1.5 font-normal text-muted-foreground"
                    >
                      {activity.timestamp}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
