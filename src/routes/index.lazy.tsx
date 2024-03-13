import { Link, createLazyFileRoute } from "@tanstack/react-router";

import { Boxes } from "@/components/background-boxes";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export const Route = createLazyFileRoute("/")({
  component: MainPage,
});

export function MainPage() {
  return (
    <div className="h-screen relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      <Boxes />
      <h1 className={cn("md:text-4xl text-xl text-white relative z-20")}>
        Join eLoyalty!
      </h1>
      <p className="text-center mt-2 text-neutral-300 relative z-20">
        Be a part of global loyalty program.
      </p>
      <Button className="z-10 mt-10" asChild>
        <Link to="/auth/login">Get started</Link>
      </Button>
    </div>
  );
}
