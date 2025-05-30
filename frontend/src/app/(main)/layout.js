import NavbarCreateBoardButton from "@/components/navbar/navbar-create-board-button";
import NavbarMoreOption from "@/components/navbar/navbar-more-option";
import NavbarRecentOptionContent from "@/components/navbar/navbar-recent-option-content";
import NavbarStarredOptionContent from "@/components/navbar/navbar-starred-option-content";
import NavbarWorkspaceOptionContent from "@/components/navbar/navbar-workspace-option-content";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Bell, SearchIcon } from "lucide-react";
import Link from "next/link";
import React from "react";
import { TfiTrello } from "react-icons/tfi";

export default function MainLayout({ children }) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="border-secondary-foreground flex h-[50px] flex-row items-center justify-between border-b-1 p-3">
        <div className="flex flex-row items-center gap-x-4 pl-2">
          <Link href="/">
            <div className="flex flex-row items-center gap-x-2">
              <TfiTrello className="size-6" />
              <p className="font-semibold">Taskman</p>
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList className="space-x-2">
              {/* sm+: Show Workspaces */}
              <div className="hidden sm:block">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Workspaces</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavbarWorkspaceOptionContent className="w-[200px] md:w-[300px] lg:w-[400px]" />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </div>

              {/* md+: Show Recent */}
              <div className="hidden md:block">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Recent</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavbarRecentOptionContent className="w-[200px] md:w-[300px] lg:w-[400px]" />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </div>

              {/* lg+: Show Starred */}
              <div className="hidden lg:block">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Starred</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <NavbarStarredOptionContent className="w-[200px] md:w-[300px] lg:w-[400px]" />
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </div>

              {/* until lg: Show More */}
              <div className="lg:hidden">
                <NavbarMoreOption />
              </div>

              {/* Create Board Button */}
              <NavbarCreateBoardButton />
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-row gap-x-2">
          <div className="relative hidden w-full lg:block">
            <SearchIcon className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <Input placeholder="Search" className="pl-10" />
          </div>
          <Button size="icon" variant="ghost2">
            <Bell className="h-4 w-4" />
          </Button>
          <Button size="icon" variant="ghost2">
            <Avatar>
              <AvatarFallback>US</AvatarFallback>
            </Avatar>
          </Button>
        </div>
      </div>
      {children}
    </div>
  );
}
