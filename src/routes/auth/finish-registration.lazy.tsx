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
import { CreatePreRegisteredUser } from "@/api/models/user";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/branding/logo";
import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/auth/finish-registration")({
  component: () => <FinishRegistrationPage />,
});

export function FinishRegistrationPage() {
  const navigate = useNavigate();
  const form = useForm<CreatePreRegisteredUser>({
    mode: "onTouched",
    resolver: zodResolver(CreatePreRegisteredUser),
  });

  return (
    <div className="bg-noisy bg-primary w-screen h-screen">
      <Link to="/">
        <Logo className="absolute top-4 left-6"/>
      </Link>
      <MainContentWrapper>
        <Form {...form}>
          <form
            className="w-full space-y-6"
          >
            <ScrollArea className="h-[520px] max-w-sm rounded-md mx-auto">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Finish your registration</CardTitle>
                  <CardDescription>
                    Enter your email and password to create your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="max-h-full">
                  <div className="space-y-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Username"
                                  type="text"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Your password"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Repeat your password"
                                  type="password"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                      <Button className="w-full" onClick={() => navigate({ to: "/clients" })}>
                        Finish
                      </Button>
                  </div>
                </CardContent>
              </Card>
            </ScrollArea>
          </form>
        </Form>
      </MainContentWrapper>
    </div>
  );
}
