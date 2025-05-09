import { Avatar, AvatarFallback } from "../ui/avatar";
import NavbarListItem from "./navbar-list-item";

export default function NavbarWorkspaceOptionContent({ className }) {
  const WorkspaceListItem = ({ title }) => (
    <NavbarListItem>
      <div className="flex flex-row items-center justify-start space-x-2">
        <Avatar className="bg-muted h-8 w-8 rounded-md">
          <AvatarFallback className="text-sm font-medium">
            {title.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="text-sm leading-none font-medium">{title}</div>
      </div>
    </NavbarListItem>
  );

  return (
    <div className={className}>
      <p className="pt-2 pl-2 text-xs font-semibold">Your Workspaces</p>
      <ul className="flex w-full flex-col items-start gap-3 p-2">
        <WorkspaceListItem key="A Workspace" title="A Workspace" href="#" />
        <WorkspaceListItem key="B Workspace" title="B Workspace" href="#" />
        <WorkspaceListItem key="C Workspace" title="C Workspace" href="#" />
      </ul>
    </div>
  );
}
