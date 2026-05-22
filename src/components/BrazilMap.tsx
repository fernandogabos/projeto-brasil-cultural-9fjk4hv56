import { cn } from '@/lib/utils'

export function BrazilMap({ className }: { className?: string }) {
  // Coordenadas aproximadas para os pins sobre um container quadrado (simulando proporções do Brasil)
  const points = [
    { id: 1, name: 'Manaus/AM', x: 25, y: 20, status: 'Pendente' },
    { id: 2, name: 'Belém/CE', x: 75, y: 15, status: 'Em Rota' },
    { id: 3, name: 'Salvador/BA', x: 85, y: 40, status: 'Em Rota' },
    { id: 4, name: 'Brasília/DF', x: 60, y: 50, status: 'Entregue' },
    { id: 5, name: 'Belo Horizonte/MG', x: 75, y: 65, status: 'Em Rota' },
    { id: 6, name: 'São Paulo/SP', x: 65, y: 75, status: 'Entregue' },
    { id: 7, name: 'Curitiba/PR', x: 60, y: 82, status: 'Atrasado' },
    { id: 8, name: 'Porto Alegre/RS', x: 55, y: 92, status: 'Pendente' },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Entregue':
        return 'bg-accent border-accent shadow-[0_0_10px_rgba(34,197,94,0.5)]'
      case 'Em Rota':
        return 'bg-blue-500 border-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]'
      case 'Atrasado':
        return 'bg-amber-500 border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]'
      case 'Pendente':
        return 'bg-slate-400 border-slate-400'
      default:
        return 'bg-primary border-primary'
    }
  }

  return (
    <div className={cn('relative w-full aspect-square max-w-[500px] mx-auto', className)}>
      {/* Silhueta abstrata do mapa do Brasil (simplificada) */}
      <svg
        viewBox="0 0 100 100"
        className="w-full h-full text-muted stroke-border/50 drop-shadow-sm"
        fill="currentColor"
      >
        <path
          d="M40.5,5.5 L48.5,2.5 L57.5,7.5 L67.5,6.5 L73.5,12.5 L82.5,14.5 L88.5,23.5 L94.5,28.5 L97.5,38.5 L90.5,45.5 L87.5,55.5 L80.5,65.5 L70.5,72.5 L65.5,82.5 L55.5,95.5 L45.5,93.5 L42.5,82.5 L32.5,75.5 L25.5,68.5 L22.5,58.5 L12.5,50.5 L5.5,42.5 L2.5,30.5 L10.5,22.5 L20.5,18.5 L28.5,10.5 Z"
          strokeWidth="0.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Pins sobrepostos */}
      {points.map((point) => (
        <div
          key={point.id}
          className="absolute group"
          style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }}
        >
          <div className="relative">
            {point.status === 'Em Rota' && (
              <div className="absolute inset-0 rounded-full bg-blue-500 opacity-20 animate-pulse-ring pointer-events-none"></div>
            )}
            <div
              className={cn(
                'w-3.5 h-3.5 rounded-full border-2 border-background cursor-pointer transition-transform hover:scale-150 z-10',
                getStatusColor(point.status),
              )}
            ></div>

            {/* Tooltip personalizado */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
              <div className="bg-popover text-popover-foreground text-xs font-medium py-1 px-2 rounded shadow-md border border-border">
                {point.name}
                <div className="text-[10px] text-muted-foreground mt-0.5">{point.status}</div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
