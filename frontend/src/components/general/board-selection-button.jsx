"use client";

import { Star } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { useState } from "react";

export default function BoardSelectionButton({
  boardName,
  workspaceName,
  href,
}) {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => setIsFavorite((prev) => !prev);
  return (
    <a
      href={href}
      className="group hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground relative flex h-fit w-full cursor-pointer flex-row items-center justify-start rounded-md p-1"
    >
      <div className="flex flex-row items-center justify-start gap-2 overflow-hidden">
        <Avatar className="bg-muted h-8 w-8 rounded-md">
          <AvatarFallback className="text-sm font-medium">
            {boardName.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col justify-start overflow-hidden">
          <div className="truncate text-sm font-medium">{boardName}</div>
          <p className="text-muted-foreground truncate text-xs leading-snug font-light">
            {workspaceName}
          </p>
        </div>
      </div>

      <Button
        size="icon"
        variant="ghost"
        className={`absolute top-1/2 right-2 -translate-y-1/2 transition-opacity duration-200 ${
          isFavorite ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleFavorite();
        }}
      >
        {isFavorite ? (
          <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
        ) : (
          <Star className="text-muted-foreground h-4 w-4" />
        )}
      </Button>
    </a>
  );
}
