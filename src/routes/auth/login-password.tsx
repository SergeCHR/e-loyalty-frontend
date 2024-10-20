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
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoginUser } from "@/api/models/user";
import { Logo } from "@/components/branding/logo";
import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/auth/login-password")({
    component: () => <LoginPage />,
  });
  
  export function LoginPage() {
    const navigate = useNavigate();
    const { mutate } = useMutation({
      mutationFn: async () => {
        navigate({to: "/dashboard/loyalty-system-settings"})
      },
      onSuccess() {
        navigate({to: "/dashboard/loyalty-system-settings"})
      },
      onError: () => {
        navigate({to: "/dashboard/loyalty-system-settings"})
      },
    });
  
    const form = useForm<LoginUser>({
      mode: "onTouched",
      resolver: zodResolver(LoginUser),
    });
  
    return (
      <div className="bg-noisy bg-primary w-screen h-screen relative">
        <Link to="/">
          <Logo className="absolute top-4 left-6"/>
        </Link>
        <MainContentWrapper>
          <Form {...form}>
            <form>
              <Card className="mx-auto max-w-sm">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Password</CardTitle>
                  <CardDescription>
                    Enter the password associated with your login
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
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
                    <Button onClick={() => mutate()} className="w-full">
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
  