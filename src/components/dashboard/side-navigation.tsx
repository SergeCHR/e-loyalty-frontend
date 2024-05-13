import { BookText, LayoutDashboard, Settings, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { Logo } from "../branding/logo";
import { ScrollArea } from "@radix-ui/react-scroll-area";

type SideNavigationProps = {
  children?: React.ReactNode;
};

export const SideNavigation = (props: SideNavigationProps) => {
  return (
    <div className="relative h-screen w-screen">
      <ScrollArea className="bg-green-400 bg-noisy fixed left-0 h-full w-56 overflow-y-hidden">
        <Link to="/">
          <Logo className="p-4 px-6"/>
        </Link>
        <div className="relative top-10 p-4 rounded-lg flex flex-col gap-3 w-full">
          <Button variant="ghost" className="flex justify-start" asChild>
            <Link
              activeOptions={{
                exact: true,
              }}
              activeProps={{
                className: "bg-white color-black",
              }}
              to="/dashboard"
            >
              <LayoutDashboard className="mr-3" />
              Dashboard
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link
              activeOptions={{
                exact: true,
              }}
              activeProps={{
                className: "bg-white color-black",
              }}
              to="/dashboard/settings"
            >
              <Settings className="mr-3" />
              Settings
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link
              activeOptions={{
                exact: true,
              }}
              activeProps={{
                className: "bg-white color-black",
              }}
              to="/dashboard/users"
            >
              <User className="mr-3" />
              Users
            </Link>
          </Button>
          <Button variant="ghost" className="justify-start" asChild>
            <Link
              activeOptions={{
                exact: true,
              }}
              activeProps={{
                className: "bg-white color-black",
              }}
              to="/dashboard/docs"
            >
              <BookText className="mr-3" />
              Docs
            </Link>
          </Button>
        </div>
      </ScrollArea>
      <div className="fixed left-56 top-0 w-[calc(100%-14rem)] h-screen">
        <div className="h-screen overflow-scroll scrollbar-hide">
          {props.children}
        </div>
      </div>
    </div>
  );
};
