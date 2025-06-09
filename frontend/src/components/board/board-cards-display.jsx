"use client";

import { useEffect, useState } from "react";
import { Card } from "../ui/card";

export default function BoardCardsDisplay({ listId }) {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/cards/list/${listId}`,
          {
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Failed to fetch cards");
        const data = await res.json();

        setCards(data);
      } catch (err) {
        console.log("Error fetching cards", err);
      }
    };

    fetchCards();
  }, []);

  if (cards.length == 0) return null;

  return (
    <div className="flex flex-col space-y-2">
      {cards.map((card) => (
        <Card
          key={card.id}
          className="bg-primary-foreground border-secondary flex h-fit w-full cursor-pointer flex-row rounded-lg p-2 transition hover:opacity-90"
        >
          <p>{card.title}</p>
        </Card>
      ))}
    </div>
  );
}
