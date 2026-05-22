export type ShipmentStatus = 'Pendente' | 'Em Rota' | 'Entregue' | 'Atrasado' | 'Cancelado'

export interface Shipment {
  id: string
  project: string
  origin: string
  destination: string
  status: ShipmentStatus
  date: string
  eta: string
  driver?: string
  vehicle?: string
  progress: number
}

export interface Activity {
  id: string
  shipmentId: string
  description: string
  timestamp: string
  type: 'update' | 'alert' | 'success'
}

export const shipments: Shipment[] = [
  {
    id: 'BRC-1001',
    project: 'Festival de Inverno',
    origin: 'São Paulo/SP',
    destination: 'Curitiba/PR',
    status: 'Entregue',
    date: '2023-10-25',
    eta: '2023-10-27',
    driver: 'Carlos Silva',
    vehicle: 'Caminhão Baú (ABC-1234)',
    progress: 100,
  },
  {
    id: 'BRC-1002',
    project: 'Exposição Arte Moderna',
    origin: 'Rio de Janeiro/RJ',
    destination: 'Salvador/BA',
    status: 'Em Rota',
    date: '2023-11-01',
    eta: '2023-11-05',
    driver: 'João Souza',
    vehicle: 'Carreta (XYZ-9876)',
    progress: 65,
  },
  {
    id: 'BRC-1003',
    project: 'Bienal do Livro',
    origin: 'Belo Horizonte/MG',
    destination: 'Brasília/DF',
    status: 'Em Rota',
    date: '2023-11-02',
    eta: '2023-11-04',
    driver: 'Ana Costa',
    vehicle: 'Van (DEF-5678)',
    progress: 40,
  },
  {
    id: 'BRC-1004',
    project: 'Mostra de Cinema',
    origin: 'Porto Alegre/PE',
    destination: 'Recife/PE',
    status: 'Atrasado',
    date: '2023-10-30',
    eta: '2023-11-02',
    driver: 'Pedro Santos',
    vehicle: 'Caminhão Baú (GHI-9012)',
    progress: 85,
  },
  {
    id: 'BRC-1005',
    project: 'Teatro Itinerante',
    origin: 'Manaus/RS',
    destination: 'Florianópolis/RS',
    status: 'Pendente',
    date: '2023-11-05',
    eta: '2023-11-08',
    driver: 'Marcelo Lima',
    vehicle: 'Furgão (JKL-3456)',
    progress: 0,
  },
  {
    id: 'BRC-1006',
    project: 'Dança Nordeste',
    origin: 'Fortaleza/BA',
    destination: 'Natal/CE',
    status: 'Em Rota',
    date: '2023-11-03',
    eta: '2023-11-06',
    driver: 'Roberto Dias',
    vehicle: 'Caminhão Baú (MNO-7890)',
    progress: 30,
  },
  {
    id: 'BRC-1007',
    project: 'Acervo Histórico',
    origin: 'São Paulo/SP',
    destination: 'Goiânia/DF',
    status: 'Entregue',
    date: '2023-10-20',
    eta: '2023-10-23',
    driver: 'Fernanda Alves',
    vehicle: 'Carreta Especial (PQR-1234)',
    progress: 100,
  },
  {
    id: 'BRC-1008',
    project: 'Festival Música',
    origin: 'Curitiba/PR',
    destination: 'Rio de Janeiro/RJ',
    status: 'Cancelado',
    date: '2023-11-01',
    eta: '2023-11-03',
    driver: '-',
    vehicle: '-',
    progress: 0,
  },
]

export const activities: Activity[] = [
  {
    id: 'a1',
    shipmentId: 'BRC-1002',
    description: 'Carga passou pelo posto fiscal em Vitória da Conquista/BA',
    timestamp: 'Hoje, 14:30',
    type: 'update',
  },
  {
    id: 'a2',
    shipmentId: 'BRC-1004',
    description: 'Alerta de atraso: Retenção na rodovia BR-101',
    timestamp: 'Hoje, 11:15',
    type: 'alert',
  },
  {
    id: 'a3',
    shipmentId: 'BRC-1003',
    description: 'Motorista Ana Costa iniciou a viagem',
    timestamp: 'Hoje, 08:00',
    type: 'update',
  },
  {
    id: 'a4',
    shipmentId: 'BRC-1001',
    description: 'Entrega concluída com sucesso no Museu Oscar Niemeyer',
    timestamp: 'Ontem, 16:45',
    type: 'success',
  },
  {
    id: 'a5',
    shipmentId: 'BRC-1006',
    description: 'Carga despachada do centro de distribuição',
    timestamp: 'Ontem, 09:20',
    type: 'update',
  },
]

export const chartDataFlow = [
  { date: 'Seg', envios: 12, entregas: 8 },
  { date: 'Ter', envios: 15, entregas: 10 },
  { date: 'Qua', envios: 18, entregas: 14 },
  { date: 'Qui', envios: 22, entregas: 16 },
  { date: 'Sex', envios: 25, entregas: 20 },
  { date: 'Sáb', envios: 10, entregas: 18 },
  { date: 'Dom', envios: 5, entregas: 12 },
]

export const chartDataStatus = [
  { name: 'Entregue', value: 45, fill: 'hsl(var(--chart-1))' },
  { name: 'Em Rota', value: 30, fill: 'hsl(var(--chart-2))' },
  { name: 'Pendente', value: 15, fill: 'hsl(var(--chart-5))' },
  { name: 'Atrasado', value: 7, fill: 'hsl(var(--chart-3))' },
  { name: 'Cancelado', value: 3, fill: 'hsl(var(--chart-4))' },
]
