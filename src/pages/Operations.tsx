import { useState } from 'react'
import {
  Filter,
  Search,
  MoreHorizontal,
  ChevronRight,
  MapPin,
  Calendar as CalendarIcon,
  Package,
  Truck,
  CheckCircle2,
  AlertTriangle,
  XCircle,
} from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { shipments, Shipment, ShipmentStatus } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

export default function Operations() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('Todos')
  const [selectedShipment, setSelectedShipment] = useState<Shipment | null>(null)

  const getStatusBadge = (status: ShipmentStatus) => {
    switch (status) {
      case 'Entregue':
        return (
          <Badge className="bg-accent hover:bg-accent/80 text-accent-foreground border-transparent shadow-sm">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Entregue
          </Badge>
        )
      case 'Em Rota':
        return (
          <Badge className="bg-blue-500 hover:bg-blue-600 text-white border-transparent shadow-sm">
            <Truck className="w-3 h-3 mr-1" /> Em Rota
          </Badge>
        )
      case 'Atrasado':
        return (
          <Badge className="bg-warning hover:bg-warning/80 text-warning-foreground border-transparent shadow-sm">
            <AlertTriangle className="w-3 h-3 mr-1" /> Atrasado
          </Badge>
        )
      case 'Cancelado':
        return (
          <Badge variant="destructive" className="shadow-sm">
            <XCircle className="w-3 h-3 mr-1" /> Cancelado
          </Badge>
        )
      case 'Pendente':
        return (
          <Badge variant="secondary" className="shadow-sm">
            <Package className="w-3 h-3 mr-1" /> Pendente
          </Badge>
        )
    }
  }

  const filteredShipments = shipments.filter((s) => {
    const matchesSearch =
      s.project.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'Todos' || s.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Operações</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie e monitore todas as remessas em andamento.
          </p>
        </div>
        <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
          Nova Remessa
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card p-4 rounded-xl border border-border/50 shadow-sm">
        <div className="relative w-full sm:max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por ID ou Projeto..."
            className="pl-9 bg-background/50 border-border/50"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px] bg-background/50">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Filtrar por Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Todos">Todos os Status</SelectItem>
              <SelectItem value="Pendente">Pendente</SelectItem>
              <SelectItem value="Em Rota">Em Rota</SelectItem>
              <SelectItem value="Entregue">Entregue</SelectItem>
              <SelectItem value="Atrasado">Atrasado</SelectItem>
              <SelectItem value="Cancelado">Cancelado</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="border border-border/50 rounded-xl bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-muted/30">
            <TableRow className="hover:bg-transparent">
              <TableHead className="font-semibold text-foreground w-[120px]">ID Remessa</TableHead>
              <TableHead className="font-semibold text-foreground min-w-[200px]">Projeto</TableHead>
              <TableHead className="font-semibold text-foreground">Origem → Destino</TableHead>
              <TableHead className="font-semibold text-foreground">Status</TableHead>
              <TableHead className="font-semibold text-foreground">Previsão</TableHead>
              <TableHead className="text-right font-semibold text-foreground">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShipments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  Nenhuma remessa encontrada com os filtros atuais.
                </TableCell>
              </TableRow>
            ) : (
              filteredShipments.map((shipment) => (
                <TableRow
                  key={shipment.id}
                  className="group cursor-pointer hover:bg-muted/30 transition-colors"
                  onClick={() => setSelectedShipment(shipment)}
                >
                  <TableCell className="font-mono text-sm font-medium">{shipment.id}</TableCell>
                  <TableCell>
                    <div className="font-medium text-foreground">{shipment.project}</div>
                    <div className="text-xs text-muted-foreground mt-0.5 hidden sm:block">
                      Despacho: {shipment.date}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="truncate max-w-[120px]" title={shipment.origin}>
                        {shipment.origin.split('/')[0]}
                      </span>
                      <ChevronRight className="w-3 h-3 shrink-0 text-muted-foreground/50" />
                      <span
                        className="truncate max-w-[120px] font-medium text-foreground"
                        title={shipment.destination}
                      >
                        {shipment.destination.split('/')[0]}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{getStatusBadge(shipment.status)}</TableCell>
                  <TableCell className="text-sm">
                    <span
                      className={cn(
                        shipment.status === 'Atrasado'
                          ? 'text-warning font-medium'
                          : 'text-muted-foreground',
                      )}
                    >
                      {shipment.eta}
                    </span>
                  </TableCell>
                  <TableCell className="text-right">
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100 transition-opacity focus:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation()
                            setSelectedShipment(shipment)
                          }}
                        >
                          Ver Detalhes
                        </Button>
                      </SheetTrigger>
                      <SheetContent className="sm:max-w-md overflow-y-auto">
                        <SheetHeader className="pb-6 border-b border-border/50">
                          <div className="flex items-center justify-between">
                            <Badge variant="outline" className="font-mono">
                              {selectedShipment?.id}
                            </Badge>
                            {selectedShipment && getStatusBadge(selectedShipment.status)}
                          </div>
                          <SheetTitle className="text-2xl mt-4">
                            {selectedShipment?.project}
                          </SheetTitle>
                          <SheetDescription>
                            Detalhes completos e rastreamento da remessa logística.
                          </SheetDescription>
                        </SheetHeader>

                        {selectedShipment && (
                          <div className="py-6 space-y-8 animate-fade-in">
                            {/* Rota */}
                            <div className="space-y-4">
                              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Rota
                              </h3>
                              <div className="flex items-start gap-4">
                                <div className="flex flex-col items-center gap-1 mt-1">
                                  <div className="w-3 h-3 rounded-full bg-border border-2 border-background shadow-sm"></div>
                                  <div className="w-px h-12 bg-border"></div>
                                  <div
                                    className={cn(
                                      'w-3 h-3 rounded-full border-2 border-background shadow-sm',
                                      selectedShipment.status === 'Entregue'
                                        ? 'bg-accent'
                                        : 'bg-primary',
                                    )}
                                  ></div>
                                </div>
                                <div className="space-y-6">
                                  <div>
                                    <p className="font-medium text-sm">Origem</p>
                                    <p className="text-foreground text-base">
                                      {selectedShipment.origin}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      Despacho: {selectedShipment.date}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">Destino</p>
                                    <p className="text-foreground text-base">
                                      {selectedShipment.destination}
                                    </p>
                                    <p className="text-xs text-muted-foreground mt-0.5">
                                      Previsão: {selectedShipment.eta}
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Progresso */}
                            <div className="space-y-3 bg-muted/30 p-4 rounded-lg border border-border/50">
                              <div className="flex justify-between items-end">
                                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                  Progresso
                                </h3>
                                <span className="font-medium text-sm">
                                  {selectedShipment.progress}%
                                </span>
                              </div>
                              <Progress
                                value={selectedShipment.progress}
                                className={cn(
                                  'h-2',
                                  selectedShipment.status === 'Atrasado' ? 'bg-warning/20' : '',
                                )}
                                indicatorColor={
                                  selectedShipment.status === 'Atrasado'
                                    ? 'bg-warning'
                                    : selectedShipment.status === 'Entregue'
                                      ? 'bg-accent'
                                      : 'bg-primary'
                                }
                              />
                            </div>

                            {/* Transporte */}
                            <div className="space-y-4">
                              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">
                                Transporte
                              </h3>
                              <div className="grid grid-cols-2 gap-4">
                                <div className="bg-card p-3 rounded-lg border border-border/50">
                                  <p className="text-xs text-muted-foreground mb-1">Motorista</p>
                                  <p className="text-sm font-medium">
                                    {selectedShipment.driver || 'Não alocado'}
                                  </p>
                                </div>
                                <div className="bg-card p-3 rounded-lg border border-border/50">
                                  <p className="text-xs text-muted-foreground mb-1">Veículo</p>
                                  <p
                                    className="text-sm font-medium truncate"
                                    title={selectedShipment.vehicle}
                                  >
                                    {selectedShipment.vehicle || 'Não alocado'}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Ações */}
                            <div className="pt-4 flex gap-3 border-t border-border/50">
                              <Button className="w-full">Atualizar Status</Button>
                              <Button variant="outline" className="w-full">
                                Contato
                              </Button>
                            </div>
                          </div>
                        )}
                      </SheetContent>
                    </Sheet>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Placeholder */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <div>
          Mostrando {filteredShipments.length} de {shipments.length} resultados
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Anterior
          </Button>
          <Button variant="outline" size="sm">
            Próxima
          </Button>
        </div>
      </div>
    </div>
  )
}
