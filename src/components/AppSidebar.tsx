import { Link, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Truck,
  Map as MapIcon,
  BarChart3,
  Settings,
  PackageOpen,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { cn } from '@/lib/utils'

const navItems = [
  { title: 'Painel de Controle', url: '/', icon: LayoutDashboard },
  { title: 'Operações', url: '/operacoes', icon: Truck },
  { title: 'Mapa Logístico', url: '/mapa', icon: MapIcon },
  { title: 'Relatórios', url: '/relatorios', icon: BarChart3 },
]

const settingsItems = [{ title: 'Configurações', url: '/configuracoes', icon: Settings }]

export function AppSidebar() {
  const location = useLocation()

  return (
    <Sidebar>
      <SidebarHeader className="h-16 flex items-center px-6 border-b border-sidebar-border/50">
        <Link
          to="/"
          className="flex items-center gap-2 font-bold text-lg tracking-tight hover:opacity-90 transition-opacity"
        >
          <div className="bg-accent rounded-md p-1.5 flex items-center justify-center">
            <PackageOpen className="w-5 h-5 text-accent-foreground" />
          </div>
          <span className="text-sidebar-foreground">Brasil Cultural</span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/50 uppercase tracking-wider text-xs font-semibold mt-4 mb-2">
            Logística
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link
                        to={item.url}
                        className={cn('transition-all duration-200', isActive && 'font-medium')}
                      >
                        <item.icon
                          className={cn(
                            'w-4 h-4',
                            isActive ? 'text-accent' : 'text-sidebar-foreground/70',
                          )}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {settingsItems.map((item) => {
                const isActive = location.pathname === item.url
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild isActive={isActive} tooltip={item.title}>
                      <Link
                        to={item.url}
                        className={cn('transition-all duration-200', isActive && 'font-medium')}
                      >
                        <item.icon
                          className={cn(
                            'w-4 h-4',
                            isActive ? 'text-accent' : 'text-sidebar-foreground/70',
                          )}
                        />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
