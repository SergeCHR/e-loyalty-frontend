import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { BackButton } from "@/components/ui/back-button";
import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/reset-password")({
  component: () => <ResetPasswordPage />,
});

export function ResetPasswordPage() {
  function reset(e: FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    e.preventDefault();
    const email = data.get("email");
    console.log({ email, data });
  }
  return (
    <div className="bg-noisy bg-primary w-screen h-screen">
      <MainContentWrapper>
        <BackButton />
        <form onSubmit={reset}>
          <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Reset</CardTitle>
              <CardDescription>
                Enter your email below to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                    type="email"
                  />
                </div>
                <Button className="w-full" type="submit">
                  Ok
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>
      </MainContentWrapper>
    </div>
  );
}
