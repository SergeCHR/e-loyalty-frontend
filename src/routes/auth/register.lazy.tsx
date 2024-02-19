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
import { Link, createFileRoute } from "@tanstack/react-router";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  userDetailsSchema,
  usernameSchema,
} from "@/services/validation/registration";

import { Button } from "@/components/ui/button";
import { CreateUser } from "@/api/models/user";
import { Input } from "@/components/ui/input";
import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";
import { ScrollArea } from "@/components/ui/scroll-area";
import { apiClient } from "@/api";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/auth/register")({
  component: () => <RegisterPage />,
});

export function RegisterPage() {
  const { mutate } = useMutation({
    mutationFn: apiClient.createUser,
  });
  //TODO: introduce a matcher
  const [currentStep, setCurrentStep] = useState(1);
  const form = useForm<CreateUser>({
    mode: "onTouched",
    resolver: zodResolver(
      currentStep === 1
        ? usernameSchema
        : currentStep === 2
          ? userDetailsSchema
          : CreateUser
    ),
  });

  const onSubmit = (createUserData: CreateUser) => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      mutate(createUserData);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(createUserData, null, 2)}
            </code>
          </pre>
        ),
      });
    }
  };
  return (
    <div className="bg-noisy bg-primary w-screen h-screen">
      <MainContentWrapper>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-2/3 space-y-6"
          >
            <ScrollArea className="h-[520px] max-w-sm rounded-md mx-auto">
              <Card>
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl font-bold">Register</CardTitle>
                  <CardDescription>
                    Enter your email and password to create your account
                  </CardDescription>
                  {
                    //TODO: refactor in a component
                  }
                  <ol className="flex items-center w-full">
                    <li
                      className={`flex w-full items-center ${currentStep > 0 ? "text-blue-600" : ""} after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block`}
                    >
                      <span className="flex items-center justify-center w-10 h-10 bg-primary-foreground rounded-full lg:h-12 lg:w-12 shrink-0">
                        <svg
                          className={`w-3.5 h-3.5 text-primary lg:w-4 lg:h-4`}
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 16 12"
                        >
                          <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M1 5.917 5.724 10.5 15 1.5"
                          />
                        </svg>
                      </span>
                    </li>
                    <li
                      className={`flex w-full items-center ${currentStep > 1 ? "text-blue-600" : ""} after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block`}
                    >
                      <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        <svg
                          className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 20 16"
                        >
                          <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                        </svg>
                      </span>
                    </li>
                    <li
                      className={`flex w-full items-center ${currentStep > 2 ? "text-blue-600" : ""} after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block`}
                    >
                      <span className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0">
                        <svg
                          className="w-4 h-4 text-gray-500 lg:w-5 lg:h-5 dark:text-gray-100"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 18 20"
                        >
                          <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                        </svg>
                      </span>
                    </li>
                  </ol>
                </CardHeader>
                <CardContent className="max-h-full">
                  <div className="space-y-4">
                    {currentStep === 1 ? (
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Username</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Your username here"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}
                    {currentStep === 2 ? (
                      <>
                        <FormField
                          control={form.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Email</FormLabel>
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
                      </>
                    ) : null}

                    {currentStep === 3 ? (
                      <FormField
                        control={form.control}
                        name="role"
                        render={({ field }) => (
                          <FormItem className="space-y-3">
                            <FormLabel>I want to...</FormLabel>
                            <FormControl>
                              <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex flex-col space-y-1"
                              >
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="USER" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    use loyalty systems
                                  </FormLabel>
                                </FormItem>
                                <FormItem className="flex items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <RadioGroupItem value="STORE" />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    own a loyalty system
                                  </FormLabel>
                                </FormItem>
                              </RadioGroup>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}
                    {currentStep === 3 ? (
                      <Button className="w-full" type="submit">
                        Register
                      </Button>
                    ) : (
                      <Button className="w-full" type="submit">
                        Next
                      </Button>
                    )}
                  </div>
                  <div className="mt-4 text-center text-sm">
                    Already have an account?{" "}
                    <Link className="underline" to="/auth/login">
                      Sign in
                    </Link>
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
