"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverTrigger } from "../ui/popover";
import BoardCreationPopoverContent from "../general/board-creation-popover-content";

export default function NavbarCreateBoardButton() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* until lg: Show + */}
        <div>
          <Button size="icon" className="lg:hidden">
            <PlusIcon className="h-4 w-4" />
          </Button>

          {/* lg+: Show Create */}
          <Button className="hidden lg:block">Create</Button>
        </div>
      </PopoverTrigger>
      <BoardCreationPopoverContent />
    </Popover>
  );
}
