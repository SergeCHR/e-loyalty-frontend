import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";
import { ELink } from "@/router/e-link";
import { FormEvent } from "react";

export function RegisterPage() {
  function register(e: FormEvent<HTMLFormElement>) {
    const data = new FormData(e.currentTarget);
    e.preventDefault();
    const email = data.get("email");
    const password = data.get("password");
    const confirmPassword = data.get("confirm_password");
    console.log({ email, password, confirmPassword, data });
  }
  return (
    <div className="bg-noisy bg-primary w-screen h-screen">
      <MainContentWrapper>
        <form onSubmit={register}>
          <Card className="mx-auto max-w-sm">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">Register</CardTitle>
              <CardDescription>
                Enter your email and password to create your account
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
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    name="password"
                    required
                    type="password"
                    placeholder="********"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm_password">Confirm Password</Label>
                  <Input
                    id="confirm_password"
                    name="confirm_password"
                    required
                    type="password"
                    placeholder="********"
                  />
                </div>
                <Button className="w-full" type="submit">
                  Register
                </Button>
              </div>
              <div className="mt-4 text-center text-sm">
                Already have an account?{" "}
                <ELink className="underline" to="/auth/login">
                  Sign in
                </ELink>
              </div>
            </CardContent>
          </Card>
        </form>
      </MainContentWrapper>
    </div>
  );
}
