import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { BrazilMap } from '@/components/BrazilMap'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MapPin, Navigation2, AlertCircle } from 'lucide-react'
import { shipments } from '@/lib/mock-data'

export default function MapPage() {
  const activeShipments = shipments.filter(
    (s) => s.status !== 'Entregue' && s.status !== 'Cancelado',
  )
  const delayedShipments = activeShipments.filter((s) => s.status === 'Atrasado')

  return (
    <div className="space-y-6 h-[calc(100vh-8rem)] flex flex-col animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Mapa Logístico</h1>
        <p className="text-muted-foreground mt-1">
          Monitoramento espacial da frota e entregas em tempo real.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        <Card className="flex-1 shadow-sm border-border/50 flex flex-col overflow-hidden relative bg-muted/10">
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <div className="bg-card/90 backdrop-blur border border-border shadow-sm rounded-md p-3 text-xs flex flex-col gap-2">
              <div className="font-semibold text-muted-foreground mb-1 uppercase tracking-wider">
                Legenda
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div> Em Rota
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-warning"></div> Atrasado
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-slate-400"></div> Pendente
              </div>
            </div>
          </div>
          <CardContent className="flex-1 p-0 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px] dark:bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)]" />
            <BrazilMap className="w-[80%] max-w-[600px] drop-shadow-xl" />
          </CardContent>
        </Card>

        <div className="w-full lg:w-96 flex flex-col gap-6">
          <Card className="shadow-sm border-border/50 shrink-0">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                Atenção Requerida
              </CardTitle>
            </CardHeader>
            <CardContent>
              {delayedShipments.length > 0 ? (
                <div className="space-y-3">
                  {delayedShipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      className="p-3 bg-warning/10 border border-warning/20 rounded-lg text-sm"
                    >
                      <div className="font-medium text-warning-foreground mb-1">
                        {shipment.project}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Destino: {shipment.destination}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground text-center py-4">
                  Nenhum atraso registrado no momento.
                </p>
              )}
            </CardContent>
          </Card>

          <Card className="shadow-sm border-border/50 flex-1 flex flex-col overflow-hidden">
            <CardHeader className="pb-3 shrink-0 border-b border-border/30">
              <CardTitle className="text-lg flex items-center gap-2">
                <Navigation2 className="w-5 h-5 text-primary" />
                Remessas Ativas
              </CardTitle>
              <CardDescription>{activeShipments.length} operações em andamento</CardDescription>
            </CardHeader>
            <ScrollArea className="flex-1">
              <div className="p-4 space-y-4">
                {activeShipments.map((shipment) => (
                  <div key={shipment.id} className="flex gap-3 group">
                    <div className="mt-1">
                      <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center shrink-0">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <div className="font-medium text-sm group-hover:text-primary transition-colors cursor-pointer">
                        {shipment.project}
                      </div>
                      <div className="text-xs text-muted-foreground mt-0.5 truncate pr-2">
                        De {shipment.origin.split('/')[0]} para {shipment.destination.split('/')[0]}
                      </div>
                      <div className="mt-1">
                        <Badge variant="outline" className="text-[10px] font-normal px-1.5 h-4">
                          {shipment.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>
        </div>
      </div>
    </div>
  )
}
