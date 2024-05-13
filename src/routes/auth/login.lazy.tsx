import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { JwtUser, LoginUser } from "@/api/models/user";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/branding/logo";
import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";
import { jwtDecode } from "jwt-decode";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { userApiClient } from "@/api";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/auth/login")({
  component: () => <LoginPage />,
});

export function LoginPage() {
  const signIn = useSignIn<JwtUser>();
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: userApiClient.login,
    onSuccess(loginData) {
      const userState = jwtDecode<JwtUser>(loginData.accessToken);
      if (
        signIn({
          auth: {
            token: loginData.accessToken,
            type: "Bearer",
          },
          userState,
        })
      ) {
        navigate({ to: "/dashboard" });
      }
    },
    onError: () => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });

  const form = useForm<LoginUser>({
    mode: "onTouched",
    resolver: zodResolver(LoginUser),
  });

  const onSubmit = (loginUserData: LoginUser) => {
    mutate(loginUserData);
  };

  return (
    <div className="bg-noisy bg-primary w-screen h-screen relative">
      <Link to="/">
        <Logo className="absolute top-4 left-6"/>
      </Link>
      <MainContentWrapper>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="m@example.com"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="space-y-2">
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <div className="flex items-center">
                            <FormLabel>Password</FormLabel>
                            <Link
                              className="ml-auto inline-block text-sm underline"
                              to="/auth/reset-password"
                            >
                              Forgot your password?
                            </Link>
                          </div>
                          <FormControl>
                            <Input
                              placeholder="Your password here"
                              type="password"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
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
        </Form>
      </MainContentWrapper>
    </div>
  );
}
