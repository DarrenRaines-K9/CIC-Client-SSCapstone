import { Sidebar, SidebarContent, SidebarGroup, SidebarMenu, SidebarMenuButton } from "@/components/ui/sidebar"
import { Calendar, Home, FileTextIcon, CircleUser, Smile, Earth, LogOut} from "lucide-react"
import Link from "next/link"
import useAppContext from "./AppWrapper"
 

export default function AppSidebar() {
    const { setToken } = useAppContext()


  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
            <SidebarMenu>
                <SidebarMenuButton asChild >
                    <Link href="/">
                        <Home className="mr-2 h-4 w-4" />
                        Home
                    </Link> 
                    </SidebarMenuButton>
                <SidebarMenuButton asChild>
                    <Link href="/events">
                        <Calendar className="mr-2 h-4 w-4" />
                        Events
                    </Link>
                </SidebarMenuButton>
                <SidebarMenuButton asChild>
                    <Link href="/inventory">
                        <FileTextIcon className="mr-2 h-4 w-4" />
                        Inventory
                    </Link>
                </SidebarMenuButton>     
                <SidebarMenuButton asChild>
                    <Link href="/map">
                        <Earth className="mr-2 h-4 w-4" />
                        Map
                    </Link>
                </SidebarMenuButton>     
                <SidebarMenuButton asChild>
                    <Link href="/about_us">
                        <Smile className="mr-2 h-4 w-4" />
                        About Us
                    </Link>
                </SidebarMenuButton>     
                <SidebarMenuButton asChild>
                    <Link href="/profile">
                        <CircleUser className="mr-2 h-4 w-4" />
                        Profile
                    </Link>
                </SidebarMenuButton>     
                <SidebarMenuButton asChild>
                    <Link href="/login" onClick={() => {
                        localStorage.removeItem("token")
                        setToken("")
                    }}>
                        <LogOut className="mr-2 h-4 w-4" />
                        Logout
                    </Link>
                </SidebarMenuButton>     
            </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
