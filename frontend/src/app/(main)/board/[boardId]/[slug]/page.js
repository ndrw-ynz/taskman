"use client";

import { useParams } from "next/navigation";

export default function BoardPage() {
  const params = useParams();

  const boardId = params.boardId;
  const decodedTitle = decodeURIComponent(params.slug);

  return <div className="flex h-full w-full flex-row"></div>;
}
