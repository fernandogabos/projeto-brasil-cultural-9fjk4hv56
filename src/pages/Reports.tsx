import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Download, FileText, BarChart } from 'lucide-react'

export default function Reports() {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Relatórios</h1>
        <p className="text-muted-foreground mt-1">
          Gere relatórios detalhados sobre as operações logísticas.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:border-primary/50 transition-colors group cursor-pointer border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <FileText className="w-5 h-5 text-primary" />
              Desempenho Mensal
            </CardTitle>
            <CardDescription>
              Resumo de envios, entregas e eficiência do mês corrente.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            >
              <Download className="w-4 h-4 mr-2" /> Baixar PDF
            </Button>
          </CardContent>
        </Card>

        <Card className="hover:border-primary/50 transition-colors group cursor-pointer border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BarChart className="w-5 h-5 text-primary" />
              Índice de Atrasos
            </CardTitle>
            <CardDescription>
              Análise de gargalos e principais motivos de atrasos nas rotas.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              variant="outline"
              className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-all"
            >
              <Download className="w-4 h-4 mr-2" /> Baixar Excel
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
