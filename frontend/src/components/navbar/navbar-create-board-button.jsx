"use client";

import { PlusIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
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

const boardSchema = z.object({
  boardName: z.string({ message: "Board title is required." }).min(1),
  workspace: z.enum(["workspace_x", "workspace_y", "workspace_z"], {
    message: "Select a workspace.",
  }),
});

export default function NavbarCreateBoardButton() {
  const form = useForm({
    resolver: zodResolver(boardSchema),
    mode: "onSubmit",
    defaultValues: {
      boardName: "",
    },
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* until lg: Show + */}
        <div>
          <Button size="icon" className="lg:hidden">
            <PlusIcon className="h-4 w-4" />
          </Button>

          {/* lg+: Show Create */}
          <Button className="hidden lg:block">Create</Button>
        </div>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col space-y-3">
        <p className="text-center font-semibold">Create Board</p>
        <Form {...form}>
          <form className="space-y-4">
            {/* Board Name */}
            <FormField
              control={form.control}
              name="boardName"
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
            {/* Workspace */}
            <FormField
              control={form.control}
              name="workspace"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Workspace</FormLabel>
                  <FormControl className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a workspace" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="workspace_x">Workspace X</SelectItem>
                        <SelectItem value="workspace_y">Workspace Y</SelectItem>
                        <SelectItem value="workspace_z">Workspace Z</SelectItem>
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
    </Popover>
  );
}
