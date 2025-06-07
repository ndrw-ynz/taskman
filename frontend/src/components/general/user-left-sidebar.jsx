import { TfiTrello } from "react-icons/tfi";
import HomeSelectionButton from "../home/home-selection-button";
import { Activity } from "lucide-react";
import { Separator } from "../ui/separator";
import HomeWorkspaceDropdownMenu from "../home/home-workspace-dropdown-menu";
import { useRouter } from "next/navigation";

export default function UserLeftSidebar({ workspaces }) {
  const router = useRouter();

  return (
    <div className="hidden w-[250px] flex-col space-y-2 p-4 sm:block">
      {/* Sidebar Selection Buttons */}
      <div className="flex flex-col space-y-1">
        <HomeSelectionButton
          icon={<TfiTrello className="h-4 w-4" />}
          name="Boards"
          onClick={() => router.push("/boards")}
        />
        <HomeSelectionButton
          icon={<Activity className="h-4 w-4" />}
          name="Home"
          onClick={() => router.push("/home")}
        />
      </div>

      <Separator className="w-full" />

      {/* Workspaces */}
      <div className="flex flex-col space-y-2">
        <p className="text-sm font-semibold">Workspaces</p>
        <div className="flex flex-col space-y-1">
          {workspaces.map((workspace) => (
            <HomeWorkspaceDropdownMenu
              key={workspace.id}
              name={workspace.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
