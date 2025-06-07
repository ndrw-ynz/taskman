"use client";

import WorkspaceDisplayArea from "@/components/board/workspace-display-area";
import UserLeftSidebar from "@/components/general/user-left-sidebar";
import { useEffect, useState } from "react";

export default function BoardsPage() {
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
      <div className="flex w-[900px] flex-col space-y-6 p-4">
        <p className="font-extrabold">Your Workspaces</p>
        {workspaces.map((workspace) => (
          <WorkspaceDisplayArea key={workspace.id} workspace={workspace} />
        ))}
      </div>
    </div>
  );
}
