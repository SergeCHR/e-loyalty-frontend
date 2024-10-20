import { ActiveLinkOptions, Link, useNavigate } from "@tanstack/react-router";
import { Bell, Book, LogOut, LucideIcon, Moon, Settings, Sparkles, Sun, Users2 } from "lucide-react"
import { Button, buttonVariants } from "../ui/button";
import { FC, useState } from "react";
import { Logo, LogoIcon } from "../branding/logo";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "../ui/resizable";

import { Separator } from "../ui/separator";
import { Switch } from "../ui/switch";
import { cn } from "@/lib/utils"
import useSignOut from "react-auth-kit/hooks/useSignOut";

interface NavProps {
  isCollapsed: boolean
  links: {
    to: ActiveLinkOptions["to"];
    title: string
    label?: string
    icon: LucideIcon
  }[]
}

export function Nav({ links, isCollapsed }: NavProps) {
  return (
    <div
      data-collapsed={isCollapsed}
      className="group flex flex-col gap-4 py-2 data-[collapsed=true]:py-2"
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-2">
        {links.map((link, index) =>
          isCollapsed ? (
            <Link
            params={{loyaltyCardId: ""}}
            key={index}
            activeOptions={{
              exact: true,
            }}
            activeProps={{
              className: cn("dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted hover:text-white bg-primary text-primary-foreground hover:bg-primary/90"),
            }}
                  to={link.to}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "icon" }),
                    "h-9 w-9",
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  <span className="sr-only">{link.title}</span>
                </Link>
          ) : (
            <Link
              key={index}
              params={{loyaltyCardId: ""}}
              to={link.to}
              activeOptions={{
                exact: true,
              }}
              activeProps={{
                className: cn("dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted hover:text-white bg-primary text-primary-foreground hover:bg-primary/90"),
              }}
              className={cn(
                buttonVariants({ variant: "ghost", size: "sm" }),
                "justify-start"
              )}
            >
              <link.icon className="mr-2 h-4 w-4" />
              {link.title}
              {link.label && (
                <span
                  className={cn("ml-auto")}
                >
                  {link.label}
                </span>
              )}
            </Link>
          )
        )}
      </nav>
    </div>
  )
}

type SideNavigationProps = {
  children?: React.ReactNode;
};

export const SideNavigation: FC<SideNavigationProps> = (props) => {

const [isCollapsed, setIsCollapsed] = useState<boolean>((JSON.parse(localStorage.getItem("react-resizable-panels:collapsed") ?? "false")));
const [isDark, setIsDark] = useState(false);
const navigate = useNavigate();
const signOut = useSignOut();
  return <ResizablePanelGroup 
  direction="horizontal" 
  className="h-full items-stretch"
  >
    <ResizablePanel
          collapsible={true}
          minSize={15}
          maxSize={20}
          onCollapse={() => {
            setIsCollapsed(true)
            localStorage.setItem("react-resizable-panels:collapsed", "true")
          }}
          onExpand={() => {
            setIsCollapsed(false)
            localStorage.setItem("react-resizable-panels:collapsed", "false")
          }}
          className={cn(
            "flex flex-col justify-between",
            isCollapsed &&
              "min-w-[50px] transition-all duration-300 ease-in-out"
          )}
        >
        <div>
        <Link to="/">
            {isCollapsed 
            ? <LogoIcon className="text-black p-2 mx-auto"/> 
            : <Logo className="text-black p-4"/>
            }
          </Link>
          <Separator/>
          <Nav
            isCollapsed={isCollapsed}
            links={[
              {
                to: "/dashboard/loyalty-system-settings",
                title: "Loyalty Systems",
                icon: Settings,
              },
              {
                to: "/dashboard/users",
                title: "Users",
                icon: Users2,
              },
              {
                to: "/dashboard/docs",
                title: "Docs",
                icon: Book,
              },
              {
                to: "/dashboard/notification-settings",
                title: "Notifications",
                icon: Bell,
              },
              {
                to: "/dashboard/personalization-settings",
                title: "Personalize",
                icon: Sparkles,
              }
            ]}
          />
          <Separator/>
         <div className="flex justify-between p-4">
         <span>
          {isDark ? <Moon/> : <Sun/>}
         </span>
         {!isCollapsed && <Switch onClick={() => setIsDark(prev => !prev)}/>}
         </div>
        </div>
          <Button
          variant="destructive"
          className={cn("m-4", isCollapsed && "p-1 m-2")}
          onClick={() => {
            signOut();
            navigate({
              to: "/auth/login",
            });
          }}
          >
            <LogOut className={cn("w-6 h-6 mr-2", isCollapsed && "w-4 h-4")}/>
            {!isCollapsed && <span>Sign Out</span>}
          </Button>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
        <div className="h-screen">
        <div className="h-screen overflow-scroll scrollbar-hide">
          {props.children}
          </div>
          </div>
        </ResizablePanel>
  </ResizablePanelGroup>
}
