import NavbarMoreOption from "@/components/navbar/navbar-more-option";
import NavbarRecentOptionContent from "@/components/navbar/navbar-recent-option-content";
import NavbarStarredOptionContent from "@/components/navbar/navbar-starred-option-content";
import NavbarWorkspaceOptionContent from "@/components/navbar/navbar-workspace-option-content";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import React from "react";
import { TfiTrello } from "react-icons/tfi";

export default function HomeLayout({ children }) {
  return (
    <div className="flex h-screen w-screen flex-col">
      <div className="border-secondary-foreground flex h-[6vh] flex-row items-center justify-between border-b-1 p-3">
        <div className="flex flex-row items-center gap-x-4">
          <Link href="/">
            <div className="flex flex-row items-center gap-x-2">
              <TfiTrello className="size-6" />
              <p className="font-semibold">Taskman</p>
            </div>
          </Link>
          <NavigationMenu>
            <NavigationMenuList>
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
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <div className="flex flex-row gap-x-2">
          {/* <p>search bar</p>
          <p>notif</p>
          <p>avatar</p> */}
        </div>
      </div>
      {children}
    </div>
  );
}
