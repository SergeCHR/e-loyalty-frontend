import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";

export const Route = createFileRoute("/auth/login")({
  component: () => <LoginPage />,
});

export function LoginPage() {
  function logIn(e: FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    e.preventDefault();
    const email = data.get("email");
    const password = data.get("password");
    console.log({ email, password, data });
  }
  return (
    <div className="bg-noisy bg-primary w-screen h-screen">
      <MainContentWrapper>
        <form onSubmit={logIn}>
          <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Login</CardTitle>
              <CardDescription>
                Enter your email below to login to your account
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
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <Link
                      className="ml-auto inline-block text-sm underline"
                      to="/auth/reset-password"
                    >
                      Forgot your password?
                    </Link>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    required
                    type="password"
                    placeholder="********"
                  />
                </div>
                <Button className="w-full" type="submit">
                  Login
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Don't have an account?{" "}
                <Link className="underline" to="/auth/register">
                  Sign up
                </Link>
              </div>
            </CardContent>
          </Card>
        </form>
      </MainContentWrapper>
    </div>
  );
}
