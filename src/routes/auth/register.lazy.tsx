import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CheckIcon, Contact, User, UserRoundCheck } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
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
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { userApiClient } from "@/api";
import { zodResolver } from "@hookform/resolvers/zod";

export const Route = createFileRoute("/auth/register")({
  component: () => <RegisterPage />,
});

export function RegisterPage() {
  const navigate = useNavigate();
  const { mutate } = useMutation({
    mutationFn: userApiClient.signUp,
    onSuccess: () => {
      navigate({ to: "/auth/login" });
    },
    onError: () => {
      toast({
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    },
  });
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
                  <ol className="flex items-center w-full">
                    <Step activated={currentStep > 1} icon={<User />} />
                    <Step activated={currentStep > 2} icon={<Contact />} />
                    <Step
                      activated={currentStep > 3}
                      icon={<UserRoundCheck />}
                      last
                    />
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
                        name="userType"
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

type StepProps = {
  activated: boolean;
  icon?: React.ReactNode;
  last?: boolean;
};

const Step = (props: StepProps) => (
  <li
    className={`flex items-center ${props.activated ? "text-green-600" : ""} ${props.last ? "" : " w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-green-200 after:border-4 after:inline-block"}`}
  >
    <span
      className={`flex items-center justify-center w-10 h-10 ${props.activated ? "bg-green-100" : "bg-gray-100"} rounded-full lg:h-12 lg:w-12 shrink-0`}
    >
      {props.activated ? <CheckIcon /> : props.icon}
    </span>
  </li>
);
