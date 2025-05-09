"use client";

import { useState } from "react";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Separator } from "../ui/separator";
import NavbarWorkspaceOptionContent from "./navbar-workspace-option-content";
import NavbarRecentOptionContent from "./navbar-recent-option-content";
import NavbarStarredOptionContent from "./navbar-starred-option-content";

export default function NavbarMoreOption() {
  const [activePanel, setActivePanel] = useState("main");

  const MoreOptionItem = ({ optionName, children }) => (
    <div className="flex w-[300px] flex-col p-1 md:w-[400px] lg:w-[500px]">
      <div className="flex w-full flex-row items-center justify-between space-y-1 p-1">
        <button
          className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-1 leading-none no-underline transition-colors outline-none select-none"
          onClick={() => setActivePanel("main")}
        >
          <ChevronLeft className="text-muted-foreground h-4 w-4" />
        </button>
        <p className="flex-1 text-center font-semibold">{optionName}</p>
        <div className="w-6 p-1" />
      </div>
      <Separator />
      <div className="p-2">{children}</div>
    </div>
  );

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>More</NavigationMenuTrigger>
      <NavigationMenuContent>
        {activePanel === "main" && (
          <ul className="flex w-[200px] flex-col gap-1 p-1 md:w-[300px] lg:w-[400px]">
            <div className="sm:hidden">
              <li
                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex flex-row items-center justify-between p-2 leading-none no-underline transition-colors outline-none select-none"
                onClick={() => setActivePanel("workspaces")}
              >
                <p className="text-xs font-semibold">Workspaces</p>
                <ChevronRight className="text-muted-foreground h-4 w-4" />
              </li>
            </div>
            <div className="md:hidden">
              <li
                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex flex-row items-center justify-between p-2 leading-none no-underline transition-colors outline-none select-none"
                onClick={() => setActivePanel("recent")}
              >
                <p className="text-xs font-semibold">Recent</p>
                <ChevronRight className="text-muted-foreground h-4 w-4" />
              </li>
            </div>
            <div className="lg:hidden">
              <li
                className="hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground flex flex-row items-center justify-between p-2 leading-none no-underline transition-colors outline-none select-none"
                onClick={() => setActivePanel("starred")}
              >
                <p className="text-xs font-semibold">Starred</p>
                <ChevronRight className="text-muted-foreground h-4 w-4" />
              </li>
            </div>
          </ul>
        )}

        {activePanel === "workspaces" && (
          <MoreOptionItem optionName="Workspaces">
            <NavbarWorkspaceOptionContent />
          </MoreOptionItem>
        )}

        {activePanel === "recent" && (
          <MoreOptionItem optionName="Recent Boards">
            <NavbarRecentOptionContent />
          </MoreOptionItem>
        )}

        {activePanel === "starred" && (
          <MoreOptionItem optionName="Starred Boards">
            <NavbarStarredOptionContent />
          </MoreOptionItem>
        )}
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
