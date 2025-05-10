import BoardSelectionButton from "@/components/general/board-selection-button";
import HomeSelectionButton from "@/components/home/home-selection-button";
import HomeWorkspaceDropdownMenu from "@/components/home/home-workspace-dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { Activity, Clock, Star } from "lucide-react";
import { TfiTrello } from "react-icons/tfi";

export default function HomePage() {
  return (
    <div className="mt-10 mb-10 flex w-full flex-row justify-center space-x-5">
      {/* Left Sidebar */}
      <div className="flex w-[250px] flex-col space-y-2 p-4">
        {/* Home Selection Buttom */}
        <div className="flex flex-col space-y-1">
          <HomeSelectionButton
            icon={<TfiTrello className="h-4 w-4" />}
            name="Boards"
            onClick={null}
          />
          <HomeSelectionButton
            icon={<Activity className="h-4 w-4" />}
            name="Home"
            onClick={null}
          />
        </div>

        <Separator className="w-full" />

        {/* Workspaces */}
        <div className="flex flex-col space-y-2">
          <p className="text-sm font-semibold">Workspaces</p>
          <div className="flex flex-col space-y-1">
            <HomeWorkspaceDropdownMenu name="A Workspace" />
            <HomeWorkspaceDropdownMenu name="B Workspace" />
            <HomeWorkspaceDropdownMenu name="C Workspace" />
          </div>
        </div>
      </div>

      {/* Center */}
      <div className="flex w-[600px] flex-col items-center">
        <p>Center Area</p>
      </div>

      {/* Right Sidebar */}
      <div className="flex w-[300px] flex-col space-y-4 p-4">
        {/* Starred */}
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row items-center space-x-1 pb-2">
            <Star className="size-4" />
            <p className="text-xs font-semibold">Starred</p>
          </div>
          <BoardSelectionButton
            boardName="A Board"
            workspaceName="X Workspace"
          />
          <BoardSelectionButton
            boardName="Z Board"
            workspaceName="X Workspace"
          />
        </div>

        {/* Recently Viewed */}
        <div className="flex flex-col space-y-1">
          <div className="flex flex-row items-center space-x-1 pb-2">
            <Clock className="size-4" />
            <p className="text-xs font-semibold">Recently viewed</p>
          </div>
          <BoardSelectionButton
            boardName="A Board"
            workspaceName="X Workspace"
          />
          <BoardSelectionButton
            boardName="B Board"
            workspaceName="Y Workspace"
          />
          <BoardSelectionButton
            boardName="C Board"
            workspaceName="Z Workspace"
          />
        </div>
      </div>
    </div>
  );
}
