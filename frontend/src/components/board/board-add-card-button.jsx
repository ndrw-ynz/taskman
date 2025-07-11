"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";

export default function BoardAddCardButton({
  listId,
  buttonText = "Add a card",
  confirmText = "Add card",
  placeholder = "Enter card name...",
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const formRef = useRef(null);
  const inputRef = useRef(null);

  // Handle clicks outside the component
  useEffect(() => {
    function handleClickOutside(event) {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsEditing(false);
        setTitle("");
      }
    }

    if (isEditing) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isEditing]);

  // Focus input when editing starts
  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.trim()) {
      setTitle("");
      setIsEditing(false);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/cards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ title: title, listId: listId }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create card.");
      }

      setTitle("");
      alert("Card created successfully.");
    } catch (err) {
      console.log("Error creating card: ", err);
    }
  };

  if (!isEditing) {
    return (
      <Card
        className="hover:bg-primary-foreground flex h-fit w-full cursor-pointer flex-row rounded-lg border-0 p-2 transition hover:opacity-90"
        onClick={() => setIsEditing(true)}
      >
        <Plus />
        {buttonText}
      </Card>
    );
  }

  return (
    <Card
      ref={formRef}
      className="flex h-fit w-full cursor-pointer flex-row border-0 p-2 transition hover:opacity-90"
    >
      <form onSubmit={handleSubmit}>
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder={placeholder}
          className="mb-2"
        />
        <div className="flex items-center gap-2">
          <Button size="sm" type="submit" disabled={!title.trim()}>
            {confirmText}
          </Button>
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => {
              setIsEditing(false);
              setTitle("");
            }}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Card>
  );
}
