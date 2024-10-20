import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Button } from "@/components/ui/button"
import { Logo } from "@/components/branding/logo";
import { MainContentWrapper } from "@/components/wrappers/main-content-wrapper";

export const Route = createFileRoute("/auth/verify")({
    component: () => <VerifyEmailPage />,
  });
  
  export function VerifyEmailPage() {

    return (
      <div className="bg-noisy bg-primary w-screen h-screen relative">
        <Link to="/">
          <Logo className="absolute top-4 left-6"/>
        </Link>
        <MainContentWrapper>
          <VerifyEmail/>
        </MainContentWrapper>
      </div>
    );
  }
  
const VerifyEmail = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center">
      <div className="bg-white dark:bg-gray-950 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">Enter One Time Password</h1>
          <p className="text-gray-500 dark:text-gray-400">
            We've sent a 6-digit code to your email. Enter it below to verify your account.
          </p>
<div className="flex justify-center">
<InputOTP maxLength={6}>
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
              </InputOTPGroup>
              <InputOTPSeparator />
              <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
</div>
<Button className="w-full" asChild><Link to={"/auth/finish-registration"}>Verify</Link></Button>
          
        </div>
      </div>
    </div>
    )
}