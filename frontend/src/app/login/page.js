"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { TfiTrello } from "react-icons/tfi";
import { z } from "zod";

const loginSchema = z.object({
  emailOrUsername: z.string().email(),
  password: z.string(),
});

export default function LoginPage() {
  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onSubmit",
    defaultValues: {
      emailOrUsername: "",
      password: "",
    },
  });
  return (
    <div className="align-center flex h-screen w-screen flex-col items-center justify-center p-5">
      <Card className="bg-primary-foreground flex h-fit w-md border-none pt-10 pr-5 pb-10 pl-5">
        <CardHeader>
          <div className="flex flex-col items-center space-y-2">
            <TfiTrello className="h-14 w-14" />
            <p className="text-2xl font-bold">Log in to Taskman</p>
          </div>
        </CardHeader>

        <div className="mr-4 ml-4 flex flex-col justify-center">
          <Separator />
        </div>

        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(() => console.log("Login requested"))}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="emailOrUsername"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Email or Username</FormLabel>
                      <FormControl>
                        <Input placeholder="Email or username" {...field} />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <>
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  </>
                )}
              />
              <Button className="h-12 w-full" variant="navigate">
                Log In
              </Button>
              <div className="flex flex-col items-center justify-center space-y-5">
                <Link href="#" className="underline">
                  Forgot your password?
                </Link>
                <div className="flex w-[100%] justify-center">
                  <p>
                    Don't have an account?{" "}
                    <Link href="/signup" className="underline">
                      Sign up for Taskman
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
