import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'
import { useAuthContext } from '@/contexts/Auth'
import {
  ChevronUp,
  History,
  Home,
  ShoppingBag,
  ShoppingBasket,
  User2,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import axios from '../axios.js'

const items = [
  {
    title: 'Home',
    url: '/',
    icon: Home,
  },
  {
    title: 'History',
    url: '/history',
    icon: History,
  },
  {
    title: 'Products',
    url: '/products',
    icon: ShoppingBag,
  },
  {
    title: 'Cart',
    url: '/cart',
    icon: ShoppingBasket,
  },
  {
    title: 'Account',
    url: '/account',
    icon: User2,
  },
]

const AppSidebar = () => {
  const navigate = useNavigate()
  const { auth, setAuth } = useAuthContext()

  const logout = () => {
    try {
      axios
        .post('/api/auth/logout')
        .then(() => setAuth(undefined))
        .catch(err => console.log(err))
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>J-SNKRS</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map(item => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  {auth?.Username || 'guest'}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={() => navigate('/account')}>
                  Account
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    if (!auth) {
                      navigate('/login')
                      return
                    }

                    logout()
                  }}
                >
                  <span>{!auth ? 'Log in' : 'Log out'}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}

export default AppSidebar
