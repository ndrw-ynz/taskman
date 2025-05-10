import React from "react";
import { NavigationMenuLink } from "../ui/navigation-menu";
import { cn } from "@/lib/utils";

const NavbarListItem = React.forwardRef(
  ({ className, children, ...props }, ref) => {
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
            {children}
          </a>
        </NavigationMenuLink>
      </li>
    );
  },
);

export default NavbarListItem;
