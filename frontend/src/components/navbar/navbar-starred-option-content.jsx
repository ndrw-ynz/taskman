import { Avatar, AvatarFallback } from "../ui/avatar";
import NavbarListItem from "./navbar-list-item";

export default function NavbarStarredOptionContent({ className }) {
  const BoardListItem = ({ boardName, workspaceName }) => (
    <NavbarListItem>
      <div className="flex flex-row items-center justify-start space-x-2">
        <Avatar className="bg-muted h-8 w-8 rounded-md">
          <AvatarFallback className="text-sm font-medium">
            {boardName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-center space-y-1">
          <div className="text-sm leading-none font-medium">{boardName}</div>
          <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {workspaceName}
          </p>
        </div>
      </div>
    </NavbarListItem>
  );

  return (
    <div className={className}>
      <p className="pt-2 pl-2 text-xs font-semibold">Your Starred Boards</p>
      <ul className="flex w-full flex-col items-start gap-3 p-2">
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
    </div>
  );
}
