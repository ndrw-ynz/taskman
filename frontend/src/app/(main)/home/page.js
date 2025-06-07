"use client";

import BoardSelectionButton from "@/components/general/board-selection-button";
import UserLeftSidebar from "@/components/general/user-left-sidebar";
import HomeSelectionButton from "@/components/home/home-selection-button";
import HomeWorkspaceDropdownMenu from "@/components/home/home-workspace-dropdown-menu";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Activity, Clock, Star } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { TfiTrello } from "react-icons/tfi";

export default function HomePage() {
  const router = useRouter();
  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/workspaces/user`,
          {
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Failed to fetch workspaces");
        const data = await res.json();

        // Assume data is an array of workspaces: [{ id: string, name: string }]
        setWorkspaces(data);
      } catch (err) {
        console.error("Error fetching workspaces", err);
      }
    };

    fetchWorkspaces();
  }, []);

  return (
    <div className="mt-10 mb-10 flex w-full flex-row justify-center space-x-5">
      {/* Left Sidebar */}
      <UserLeftSidebar workspaces={workspaces} />

      {/* Center */}
      <div className="flex w-[600px] flex-col items-center p-4">
        <Card className="w-full">
          <CardContent>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec in
              luctus turpis. Ut tempor enim justo, non tempor ipsum sodales
              quis. Proin condimentum sapien eros, id dapibus elit mollis vitae.
              Donec vitae neque pellentesque, gravida nunc et, cursus dolor.
              Donec lacinia facilisis tellus, ac gravida metus sollicitudin id.
              Etiam nec mauris sed elit suscipit ullamcorper euismod sit amet
              urna. Suspendisse potenti. Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Duis quis eros orci. Nunc pellentesque dui
              laoreet semper mollis. Duis feugiat, mi quis faucibus cursus,
              tellus ligula tempor risus, et ultricies risus eros sit amet
              felis. Sed posuere est a commodo finibus. Maecenas rutrum suscipit
              eros at faucibus. Suspendisse sit amet ipsum non mauris pretium
              vulputate ac eu nisi. Mauris tristique lectus sed augue luctus, at
              iaculis arcu lacinia. Curabitur nec erat turpis.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Right Sidebar */}
      <div className="hidden w-[300px] flex-col space-y-4 p-4 lg:block">
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
