"use client";

import {
  LogOut,
  User,
  LogIn,
  ChevronRight,
  ChevronDown,
  Settings2Icon,
  LucideProjector,
  LucideFileTerminal,
  MessageCircleMoreIcon,
  ArrowRightLeft,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { usePathname, useRouter } from "next/navigation";
import { config } from "@/middleware";
import { deleteCookie } from "@/services/auth.service";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import { DecodedUser, getCurrentUser } from "@/lib/verifyToken";

// common routes for all users
const items = [
  {
    title: "About",
    icon: User,
    href: "/",
  },
  {
    title: "Skills",
    icon: ArrowRightLeft,
    href: "/skill-management",
  },
  {
    title: "Projects",
    icon: LucideProjector,
    href: `/project-management`,
  },
  {
    title: "Blogs",
    icon: LucideFileTerminal,
    href: `/blog-management`,
  },
  {
    title: "Messages",
    icon: MessageCircleMoreIcon,
    href: `/messages`,
  },
];

export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<DecodedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getCurrentUser();
      setUser(user);
      setIsLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = () => {
    deleteCookie();

    if (config.matcher.some((route) => pathname.match(route))) {
      router.push("/login");
    }
  };

  const renderMenuItems = (routes: typeof items) => (
    <SidebarMenu>
      {routes.map((item) => (
        <SidebarMenuItem
          key={item.title}
          className={`
            group 
            hover:bg-accent/10 
            transition-colors 
            duration-200 
            ${pathname === item.href ? "bg-primary/10 text-primary" : ""}
          `}
        >
          <SidebarMenuButton asChild>
            <a href={item.href} className="flex items-center gap-3 w-full">
              <item.icon
                className={`
                  w-5 h-5 
                  group-hover:rotate-6 
                  transition-transform
                  ${
                    pathname === item.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }
                `}
              />
              <span className="flex-grow">{item.title}</span>
              <ChevronRight
                className="
                  w-4 h-4 
                  opacity-0 
                  group-hover:opacity-100 
                  transition-opacity
                  text-muted-foreground
                "
              />
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <Sidebar className="h-full" collapsible="icon">
      <SidebarContent>
        {/* Logo */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem key="logo">
                <SidebarMenuButton asChild className="h-20">
                  <Logo />
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Panel */}
        <SidebarGroup>
          <SidebarGroupLabel className="flex items-center gap-2">
            <Settings2Icon className="w-4 h-4 text-muted-foreground" />
            Quick Access
          </SidebarGroupLabel>
          <SidebarGroupContent>
            {isLoading ? (
              <div className="space-y-2 p-2">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center gap-3 p-2">
                    <Skeleton className="h-5 w-5 rounded-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ))}
              </div>
            ) : (
              renderMenuItems(items)
            )}
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Logout */}
        <div className="mt-auto border-t p-4 pl-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                className="
                  flex w-full items-center gap-3 
                  rounded-lg p-2 
                  hover:bg-accent/10 
                  transition-colors 
                  group
                "
              >
                {isLoading ? (
                  <>
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="flex-1 text-left space-y-1">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-4 w-4 rounded" />
                  </>
                ) : (
                  <>
                    <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all">
                      <AvatarImage src="https://github.com/shadcn.png" />
                      <AvatarFallback>PKS</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 text-left">
                      <p className="text-sm font-medium">Pallab Kumar Sarker</p>
                      <p className="text-xs text-muted-foreground capitalize">
                        {user?.email}
                      </p>
                    </div>
                    <ChevronDown className="h-4 w-4 text-muted-foreground group-hover:rotate-180 transition-transform" />
                  </>
                )}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="start" side="top">
              {user?.email ? (
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive-foreground cursor-pointer flex items-center gap-3"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4" /> Logout
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem
                  className="text-primary focus:text-primary-foreground cursor-pointer flex items-center gap-3"
                  onClick={() => router.push("/login")}
                >
                  <LogIn className="w-4 h-4" /> Login
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}
