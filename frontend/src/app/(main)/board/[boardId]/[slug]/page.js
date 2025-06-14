"use client";

import BoardAddCardButton from "@/components/board/board-add-card-button";
import { BoardAddListButton } from "@/components/board/board-add-list-button";
import BoardCardsDisplay from "@/components/board/board-cards-display";
import { Card } from "@/components/ui/card";
import { useWebSocketService } from "@/lib/websocket";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function BoardPage() {
  const params = useParams();

  const boardId = params.boardId;
  const decodedTitle = decodeURIComponent(params.slug);

  const [lists, setLists] = useState([]);
  const [cardsByList, setCardsByList] = useState({});

  const { connect, subscribe, send, unsubscribe, disconnect, isConnected } =
    useWebSocketService(
      process.env.NEXT_PUBLIC_WEBSOCKET_URL,
      () => console.log("Connected!"),
      (error) => console.log("WebSocket Error:", error),
    );

  // Connect to WebSocket,
  useEffect(() => {
    connect();
  }, []);

  // Configure subscription after connection changes.
  useEffect(() => {
    if (!isConnected) return;
    // Subscribe to /topic/lists
    subscribe("/topic/lists", (message) => {
      console.log("Entity changed", message);

      switch (message.type) {
        case "LIST_CREATED":
          setLists((prevList) => {
            const alreadyExists = prevList.some(
              (list) => list.id === message.payload.id,
            );
            if (alreadyExists) return prevList;

            return [...prevList, message.payload];
          });
          break;
        case "LIST_UPDATED":
          setLists((prevList) => {
            const updatedList = prevList.map((list) =>
              list.id === message.payload.id ? message.payload : list,
            );
            return updatedList;
          });
          break;
        case "LIST_DELETED":
          setLists((prevList) => {
            const filteredCards = prevList.filter(
              (card) => card.id !== message.payload.id,
            );
            return filteredCards;
          });
          break;
      }
    });

    // Subscribe to /topic/cards
    subscribe("/topic/cards", (message) => {
      console.log("Entity changed", message);

      switch (message.type) {
        case "CARD_CREATED":
          setCardsByList((prevCards) => {
            const listId = message.payload.listId;

            if (listId in prevCards) {
              const alreadyExists = prevCards[listId].some(
                (card) => card.id === message.payload.id,
              );
              if (alreadyExists) return prevCards;

              return {
                ...prevCards,
                [listId]: [...prevCards[listId], message.payload],
              };
            }

            return prevCards;
          });
          break;
        case "CARD_UPDATED":
          setCardsByList((prevCards) => {
            const listId = message.payload.listId;

            if (listId in prevCards) {
              const updatedCards = prevCards[listId].map((card) =>
                card.id === message.payload.id ? message.payload : card,
              );
              return { ...prevCards, [listId]: updatedCards };
            } else {
              return prevCards;
            }
          });
          break;
        case "CARD_DELETED":
          setCardsByList((prevCards) => {
            const listId = message.payload.listId;

            if (listId in prevCards) {
              const filteredCards = prevCards[listId].filter(
                (card) => card.id !== message.payload.id,
              );
              return { ...prevCards, [listId]: filteredCards };
            } else {
              return prevCards;
            }
          });
          break;
      }
    });

    return () => {
      unsubscribe("/topic/cards");
      unsubscribe("/topic/lists");
      disconnect();
    };
  }, [isConnected]);

  useEffect(() => {
    const fetchListsAndCards = async () => {
      try {
        // LISTS: Fetch lists for this board
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/lists/board/${boardId}`,
          { credentials: "include" },
        );
        if (!res.ok) throw new Error("Failed to fetch lists");

        const listsData = await res.json();
        setLists(listsData);
        console.log("Fetched lists:", listsData);

        // CARDS: For each list, prepare a [listId, fetch promise] pair
        const listCardFetchPairs = listsData.map((list) => [
          list.id,
          fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/cards/list/${list.id}`,
            { credentials: "include" },
          ),
        ]);

        // CARDS: Extract only the promises and wait for all at once
        const cardFetchPromises = listCardFetchPairs.map(
          ([_, promise]) => promise,
        );
        const cardResponses = await Promise.all(cardFetchPromises);

        // CARDS: Convert responses to JSON in parallel
        const cardDataArray = await Promise.all(
          cardResponses.map((res) => {
            if (!res.ok) throw new Error("Failed to fetch cards");
            return res.json();
          }),
        );

        // CARDS: Combine back into an object
        const cardsByListObject = {};
        listCardFetchPairs.forEach(([listId], index) => {
          cardsByListObject[listId] = cardDataArray[index];
        });

        setCardsByList(cardsByListObject);
        console.log("Fetched cards by list:", cardsByListObject);
      } catch (err) {
        console.error("Error fetching lists or cards:", err);
      }
    };

    fetchListsAndCards();
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
          <BoardCardsDisplay cards={cardsByList[list.id]} />
          <BoardAddCardButton listId={list.id} />
        </Card>
      ))}
      {/* Add List */}
      <BoardAddListButton boardId={boardId} />
    </div>
  );
}
