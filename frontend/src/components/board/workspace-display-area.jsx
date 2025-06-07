import { useEffect, useState } from "react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Card } from "../ui/card";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import BoardCreationPopoverContent from "../general/board-creation-popover-content";

export default function WorkspaceDisplayArea({ workspace }) {
  console.log(workspace);
  const [boards, setBoards] = useState([]);

  useEffect(() => {
    const fetchBoards = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/boards/workspace/${workspace.id}`,
          {
            credentials: "include",
          },
        );

        if (!res.ok)
          throw new Error(
            `Failed to fetch boards of workspace ${workspace.name}`,
          );
        const data = await res.json();

        setBoards(data);
      } catch (err) {
        console.error("Error fetching workspaces", err);
      }
    };

    fetchBoards();
  }, []);

  return (
    <div className="flex flex-col space-y-4">
      {/* Workspace Name */}
      <div className="flex flex-row items-center space-x-2">
        <Avatar className="bg-muted h-8 w-8 rounded-md">
          <AvatarFallback className="flex justify-items-center text-sm font-bold">
            {workspace.name.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <p className="font-bold">{workspace.name}</p>
      </div>
      {/* Board Card Displays */}
      <div className="grid grid-cols-4 gap-2">
        {/* Cards from Workspace */}
        {boards.map((board) => (
          <a
            key={board.id}
            href={`board/${board.id}/${board.title}`}
            className="group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative cursor-pointer"
          >
            <Card className="bg-secondary border-primary-foreground h-[90px] rounded-md border-2 p-2">
              <p className="font-semibold">{board.title}</p>
            </Card>
          </a>
        ))}
        {/* Create New Board Card*/}
        <Popover>
          <PopoverTrigger asChild>
            {/* until lg: Show + */}
            <div>
              <Card
                role="button"
                tabIndex={0}
                className="bg-secondary border-primary-foreground h-[90px] cursor-pointer items-center justify-center rounded-md border-2 p-2 transition hover:opacity-90"
              >
                <p className="font-medium">Create new board</p>
              </Card>
            </div>
          </PopoverTrigger>
          <BoardCreationPopoverContent />
        </Popover>
      </div>
    </div>
  );
}
