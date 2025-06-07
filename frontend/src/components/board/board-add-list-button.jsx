"use client";

import { useState, useRef, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "../ui/card";

export function BoardAddListButton({
  buttonText = "Add another list",
  confirmText = "Add list",
  placeholder = "Enter list name...",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      setTitle("");
      setIsEditing(false);
    }
  };

  if (!isEditing) {
    return (
      <Card
        className="bg-primary-foreground border-secondary flex h-fit w-[300px] cursor-pointer flex-row rounded-lg p-3 transition hover:opacity-90"
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
      className="bg-card border-secondary flex h-fit w-[300px] cursor-pointer flex-row rounded-lg p-3 transition hover:opacity-90"
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
