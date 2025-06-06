import { Button } from "../ui/button";
import { PopoverContent } from "../ui/popover";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const boardSchema = z.object({
  title: z.string({ message: "Board title is required." }).min(1),
  description: z.string(),
  workspaceId: z.number({ required_error: "Workspace is required." }),
});

export default function BoardCreationPopoverContent() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(boardSchema),
    mode: "onSubmit",
    defaultValues: {
      title: "",
      description: "",
      workspaceId: undefined,
    },
  });

  const [workspaces, setWorkspaces] = useState([]);

  useEffect(() => {
    const fetchWorkspaces = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/workspaces/user`,
          {
            credentials: "include",
          },
        );

        if (!res.ok) throw new Error("Failed to fetch workspaces");
        const data = await res.json();

        setWorkspaces(data);
      } catch (err) {
        console.error("Error fetching workspaces", err);
      }
    };

    fetchWorkspaces();
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/boards`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(data),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to create board.");
      }

      form.reset();
      alert("Board created successfully.");

      const createdBoard = await response.json();
      router.push(`/board/${createdBoard.id}/${createdBoard.title}`);
    } catch (error) {
      console.log("Error creating board: ", error);
    }
  };

  return (
    <PopoverContent className="flex flex-col space-y-3">
      <p className="text-center font-semibold">Create Board</p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* Board Name */}
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Board title</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Board Description */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field}></Input>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Workspace */}
          <FormField
            control={form.control}
            name="workspaceId"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Workspace</FormLabel>
                <FormControl className="w-full">
                  <Select
                    onValueChange={(val) => field.onChange(parseInt(val))}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a workspace" />
                    </SelectTrigger>
                    <SelectContent>
                      {workspaces.map((workspace) => (
                        <SelectItem
                          key={workspace.id}
                          value={workspace.id.toString()}
                        >
                          {workspace.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full">
            Create
          </Button>
        </form>
      </Form>
    </PopoverContent>
  );
}
