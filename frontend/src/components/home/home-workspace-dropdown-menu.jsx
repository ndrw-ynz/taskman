import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function HomeWorkspaceDropdownMenu({ name }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost2"
          className="flex flex-row justify-start p-2 text-sm leading-none font-medium"
        >
          <Avatar className="bg-muted h-8 w-8 rounded-md">
            <AvatarFallback className="text-sm font-medium">
              {name.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <p>{name}</p>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Boards</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
