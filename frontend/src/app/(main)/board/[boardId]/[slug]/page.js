"use client";

import BoardAddCardButton from "@/components/board/board-add-card-button";
import { BoardAddListButton } from "@/components/board/board-add-list-button";
import BoardCardsDisplay from "@/components/board/board-cards-display";
import { Card } from "@/components/ui/card";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardPage() {
  const params = useParams();

  const boardId = params.boardId;
  const decodedTitle = decodeURIComponent(params.slug);

  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/lists/board/${boardId}`,
          {
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Failed to fetch workspaces");
        const data = await res.json();

        setLists(data);
      } catch (err) {
        console.error("Error fetching lists", err);
      }
    };

    fetchLists();
  }, []);

  return (
    <div className="flex h-full w-full flex-row space-x-3 overflow-x-auto p-4 whitespace-nowrap">
      {/* List of Lists from Board */}
      {lists.map((list) => (
        <Card
          key={list.id}
          className="bg-card border-secondary flex h-fit w-[300px] cursor-pointer flex-col rounded-lg p-3 transition hover:opacity-90"
        >
          <p className="font-bold">{list.title}</p>
          {/* List of Cards from List */}
          <BoardCardsDisplay listId={list.id} />
          <BoardAddCardButton listId={list.id} />
        </Card>
      ))}
      {/* Add List */}
      <BoardAddListButton boardId={boardId} />
    </div>
  );
}
