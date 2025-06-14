"use client";

import { Card } from "../ui/card";

export default function BoardCardsDisplay({ cards }) {
  if (!cards || cards.length == 0) return null;

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
