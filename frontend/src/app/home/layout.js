import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
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
                    <p className="pt-2 pl-2 text-xs font-semibold">
                      Your Workspaces
                    </p>
                    <ul className="flex w-[200px] flex-col items-start gap-3 p-2 md:w-[300px] lg:w-[400px]">
                      <WorkspaceListItem
                        key="A Workspace"
                        title="A Workspace"
                        href="#"
                      />
                      <WorkspaceListItem
                        key="B Workspace"
                        title="B Workspace"
                        href="#"
                      />
                      <WorkspaceListItem
                        key="C Workspace"
                        title="C Workspace"
                        href="#"
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </div>

              {/* md+: Show Recent */}
              <div className="hidden md:block">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Recent</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <p className="pt-2 pl-2 text-xs font-semibold">
                      Your Recent Board
                    </p>
                    <ul className="flex w-[200px] flex-col items-start gap-3 p-2 md:w-[300px] lg:w-[400px]">
                      <BoardListItem
                        key="Board A"
                        boardName="Board A"
                        workspaceName="A Workspace"
                        href="#"
                      />
                      <BoardListItem
                        key="Board B"
                        boardName="Board B"
                        workspaceName="A Workspace"
                        href="#"
                      />
                      <BoardListItem
                        key="Board C"
                        boardName="Board C"
                        workspaceName="B Workspace"
                        href="#"
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </div>

              {/* lg+: Show Starred */}
              <div className="hidden lg:block">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Starred</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <p className="pt-2 pl-2 text-xs font-semibold">
                      Your Starred Boards
                    </p>
                    <ul className="flex w-[200px] flex-col items-start gap-3 p-2 md:w-[300px] lg:w-[400px]">
                      <BoardListItem
                        key="Board A"
                        boardName="Board A"
                        workspaceName="A Workspace"
                        href="#"
                      />
                      <BoardListItem
                        key="Board B"
                        boardName="Board B"
                        workspaceName="A Workspace"
                        href="#"
                      />
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </div>

              {/* until lg: Show More */}
              <div className="lg:hidden">
                <NavigationMenuItem>
                  <NavigationMenuTrigger>More</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul>
                      <div className="sm:hidden">
                        <li>workspaces</li>
                      </div>
                      <div className="md:hidden">
                        <li>recent</li>
                      </div>
                      <div className="lg:hidden">
                        <li>starred</li>
                      </div>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
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

const WorkspaceListItem = React.forwardRef(
  ({ className, title, ...props }, ref) => {
    return (
      <li className="w-full">
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-1 leading-none no-underline transition-colors outline-none select-none",
              className,
            )}
            {...props}
          >
            <div className="flex flex-row items-center justify-start space-x-2">
              <Avatar className="bg-muted h-8 w-8 rounded-md">
                <AvatarFallback className="text-sm font-medium">
                  {title.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm leading-none font-medium">{title}</div>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

const BoardListItem = React.forwardRef(
  ({ className, boardName, workspaceName, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-1 leading-none no-underline transition-colors outline-none select-none",
              className,
            )}
            {...props}
          >
            <div className="flex flex-row justify-center space-x-2">
              <Avatar className="bg-muted h-8 w-8 rounded-md">
                <AvatarFallback className="text-sm font-medium">
                  {boardName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col justify-center space-y-1">
                <div className="text-sm leading-none font-medium">
                  {boardName}
                </div>
                <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
                  {workspaceName}
                </p>
              </div>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);
