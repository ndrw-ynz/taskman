import { Button } from "@/components/ui/button";
import { TfiTrello } from "react-icons/tfi";
import Wave from "react-wavify";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navigation */}
      <div className="flex h-[10vh] flex-row items-center justify-between p-8">
        <div className="flex flex-row items-center gap-x-4">
          <TfiTrello className="h-8 w-8" />

          <p className="text-2xl font-semibold">Taskman</p>
        </div>
        <div className="flex flex-row items-center gap-x-4">
          <Button variant="rounded" className="px-5">
            Login
          </Button>
          <Button variant="rounded" className="px-5">
            Signup
          </Button>
        </div>
      </div>

      {/* Body */}
      <div className="flex h-[80vh] flex-row">
        {/* Left Side */}
        <div className="flex w-1/2 flex-col justify-center gap-y-3 p-6 text-xl font-bold whitespace-nowrap sm:pl-8 sm:text-3xl lg:gap-y-7 lg:pl-10 lg:text-4xl xl:pl-12 xl:text-5xl">
          <div className="flex flex-col gap-y-1 lg:gap-y-3">
            <p>Organize work.</p>
            <p>Get things done.</p>
            <p>Stay on track with Taskman.</p>
          </div>
          <div className="flex flex-row gap-x-4">
            <Button
              variant="rounded"
              className="px-4 text-xs lg:px-6 lg:text-base xl:px-10 xl:py-5"
            >
              Login
            </Button>
            <Button
              variant="rounded"
              className="px-4 text-xs lg:px-6 lg:text-base xl:px-10 xl:py-5"
            >
              Signup
            </Button>
          </div>
        </div>
        {/* Right Side */}
        <div className="relative flex w-1/2 items-center justify-center">
          {/* Logo */}
          <TfiTrello className="size-10 sm:size-15 lg:size-20" />
          {/* Animated rotating cubes */}
          <div className="absolute inset-0 m-auto">
            <div className="animate-spin-slow absolute inset-0 m-auto size-40 border border-white sm:size-60 lg:size-80"></div>
            <div className="animate-spin-slower absolute inset-0 m-auto size-36 border border-gray-400 sm:size-56 lg:size-76"></div>
            <div className="animate-spin-reverse absolute inset-0 m-auto size-32 border border-gray-600 sm:size-52 lg:size-72"></div>
          </div>
        </div>
      </div>

      {/* Wave Effects */}
      <div>
        <Wave
          fill="#f5f5f5"
          paused={false}
          options={{ height: 20, amplitude: 40, speed: 0.2, points: 3 }}
          className="absolute bottom-0 w-full opacity-60"
        />
        <Wave
          fill="#e0e0e0"
          paused={false}
          options={{ height: 30, amplitude: 30, speed: 0.15, points: 4 }}
          className="absolute bottom-0 w-full opacity-40"
        />
        <Wave
          fill="#cfcfcf"
          paused={false}
          options={{ height: 40, amplitude: 20, speed: 0.1, points: 5 }}
          className="absolute bottom-0 w-full opacity-20"
        />
      </div>
    </div>
  );
}
