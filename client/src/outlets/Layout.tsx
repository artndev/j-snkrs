import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { Toaster } from '@/components/ui/sonner'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="flex-1">
          <SidebarTrigger />
          <Toaster />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  )
}

export default Layout
