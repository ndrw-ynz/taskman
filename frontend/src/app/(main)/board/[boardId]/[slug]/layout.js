"use client";

import { useParams } from "next/navigation";

export default function BoardLayout({ children }) {
  const params = useParams();

  const boardId = params.boardId;
  const decodedTitle = decodeURIComponent(params.slug);

  return (
    <div className="h-full w-full flex-row">
      <div className="bg-primary-foreground flex h-[60px] items-center p-3">
        <p className="font-bold">{decodedTitle}</p>
      </div>
      <div className="bg-secondary h-full">{children}</div>
    </div>
  );
}
