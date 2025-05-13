"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { TfiTrello } from "react-icons/tfi";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import SignupForms from "@/components/signup/signup-forms";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Link from "next/link";

const signupSchema = z.object({
  username: z.string().email(),
  password: z
    .string()
    .min(10, { message: "The password must contain at least 10 characters" })
    .regex(/[A-Za-z]/, {
      message: "The password must contain at least 1 letter",
    })
    .regex(/[0-9!@#$%^&*]/, {
      message:
        "The password contain at least 1 number or special character (example: # ? ! &)",
    }),
  name: z
    .string()
    .min(2, { message: "The name must contain at least two characters." }),
  dateOfBirth: z.date(),
  gender: z.enum(
    ["MAN", "WOMAN", "NON_BINARY", "SOMETHING_ELSE", "PREFER_NOT_TO_SAY"],
    {
      message: "Please select a gender.",
    },
  ),
});

export default function SignupPage() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const FINAL_STEP = 3;

  const form = useForm({
    resolver: zodResolver(signupSchema),
    mode: "onSubmit",
    defaultValues: {
      username: "",
      password: "",
      name: "",
      dateOfBirth: new Date(),
      gender: undefined,
    },
  });

  const handleNextStep = async () => {
    const moveNext = () => {
      if (step < FINAL_STEP) {
        const newStep = step + 1;
        setStep(newStep);
        setProgress((newStep / FINAL_STEP) * 100);
      }
    };

    switch (step) {
      case 0:
        const usernameResult = await form.trigger("username", {
          shouldFocus: true,
        });
        if (usernameResult) moveNext();
        break;
      case 1:
        const passwordResult = await form.trigger("password", {
          shouldFocus: true,
        });
        if (passwordResult) moveNext();
        break;
      case 2:
        const personalInfoResult = await form.trigger(
          ["name", "dateOfBirth", "gender"],
          { shouldFocus: true },
        );

        if (personalInfoResult) moveNext();
        break;
    }
  };

  const handlePreviousStep = () => {
    if (step >= 0) {
      const newStep = step - 1;
      setStep(newStep);
      setProgress((newStep / FINAL_STEP) * 100);
    }
  };

  const onSubmit = async (values) => {
    try {
      console.log(values);

      const signupResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/taskman/api/users`,
        {
          method: "POST",
          body: JSON.stringify({
            username: values.username,
            password: values.password,
            name: values.name,
            dateOfBirth: values.dateOfBirth,
            gender: values.gender,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
    } catch (e) {
      console.log("Error: ", e);
    }
  };

  return (
    <div className="flex h-screen w-screen justify-center p-5">
      <div className="flex w-sm flex-col gap-4">
        {/* Top */}
        <div className="flex h-[10%] items-center justify-center p-2">
          <TfiTrello className="h-14 w-14" />
        </div>

        {/* Middle */}
        <div className="bg-gray-100p-4 flex h-[80%] flex-col space-y-6">
          {/* Signup */}
          <Form {...form}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (step >= FINAL_STEP) {
                  form.handleSubmit(onSubmit)(e);
                }
              }}
            >
              {" "}
              <div className="pb-6">
                {step === 0 && (
                  <div className="space-y-2">
                    {/* Header Text */}
                    <div className="flex flex-col items-center justify-center pb-12 font-bold">
                      <div className="text-4xl">Sign up</div>
                      <div className="text-4xl">to start planning</div>
                    </div>
                    {/* Input */}
                    <div className="max-w-md space-y-6">
                      {/* Label + Input */}
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="username"
                          type="email"
                          placeholder="name@domain.com"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
                              <FormControl>
                                <Input {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                )}
                {/* Sign-up Forms */}
                {step >= 1 && (
                  <SignupForms
                    progress={progress}
                    step={step}
                    handlePreviousStep={handlePreviousStep}
                    form={form}
                  />
                )}
              </div>
              {/* Next Button */}
              <Button
                type="submit"
                className="h-12 w-full"
                variant="navigate"
                onClick={(e) => {
                  e.preventDefault();
                  if (step < FINAL_STEP) {
                    handleNextStep();
                  } else {
                    form.handleSubmit(onSubmit)(e);
                  }
                }}
              >
                {step < FINAL_STEP ? "Next" : "Create Account"}
              </Button>
            </form>
          </Form>
          {/* Login */}
          {step === 0 && (
            <div className="flex w-[100%] flex-col justify-center space-y-2 self-center">
              <div className="flex w-full max-w-md items-center space-x-4">
                <Separator className="flex-1" />
                <p>or</p>
                <Separator className="flex-1" />
              </div>
              <div className="flex w-[100%] justify-center">
                <p>
                  Already have an account?{" "}
                  <Link href="/login" className="underline">
                    Log in here.
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom */}
        <div className="h-[10%] p-4 text-sm">
          This site is protected by reCAPTCHA and the Google Privacy Policy and
          Terms of Service apply.
        </div>
      </div>
    </div>
  );
}
