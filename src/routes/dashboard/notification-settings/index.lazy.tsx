import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react";
import { SideNavigation } from "@/components/dashboard/side-navigation";
import { Switch } from "@/components/ui/switch"
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

// import { protectRouteWithRole } from "@/lib/routing";
// import { useProtected } from "@/services/auth/useProtected";

export const Route = createFileRoute("/dashboard/notification-settings/")({
  // beforeLoad: protectRouteWithRole("BUSINESS"),
  component: () => (
    <SideNavigation>
      <SettingsPage />
    </SideNavigation>
  ),
});

export default function SettingsPage() {
  const [pushEnabled, setPushEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="w-full h-full pl-4 pt-4">
    <div className="flex flex-col w-full max-w-xl  max-h-fit space-y-6 p-6 bg-white rounded-lg shadow-lg dark:bg-gray-900">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Notification Settings</h1>
        <p className="text-gray-500 dark:text-gray-400">Customize how you receive notifications from our app.</p>
      </div>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
        
          <label htmlFor="push-notifications" className="space-y-1">
            <p className="text-sm font-medium">Push Notifications</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
              Your customers will have real-time alerts and notifications on their device.
            </p>
          </label>
          <Switch checked={pushEnabled} onCheckedChange={setPushEnabled}  id="push-notifications" />
        </div>
       {pushEnabled && <>
        <div className="flex items-center justify-between">
          <label htmlFor="personalized-notifications" className="space-y-1">
            <p className="text-sm font-medium">Personalized notifications</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              If turned on, notifications will include your customers info.
            </p>
          </label>
          <Switch id="personalized-notifications" />
        </div>
       {
        //change to date (preferred time to send)
       }
        <div className="flex items-center justify-between">
        <div className="space-y-1">
            <p className="text-sm font-medium">Preferred send time</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Select when you want your users to receive special notifications.</p>
          </div>
<SelectDemo/>
        </div>
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Notification Frequency</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Choose how often you receive notifications.</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline">
                Daily
                <svg
      className="ml-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
               
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40">
              <DropdownMenuLabel>Frequency</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem>Hourly</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Daily</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Weekly</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Monthly</DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
       </>}
      </div>
      <div className="flex justify-end">
        <Button onClick={() => {
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 250)
        }} disabled={isLoading}>{isLoading ? <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        Please wait
        </> : "Save Changes"}</Button>
      </div>
    </div>
    </div>
  )
}

export function SelectDemo() {
  return (
    <Select>
      <SelectTrigger className="w-fit">
        <SelectValue placeholder="Pick time" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select time</SelectLabel>
          <SelectItem value="00:00">00:00</SelectItem>
         <SelectItem value="00:30">00:30</SelectItem>
         <SelectItem value="01:00">01:00</SelectItem>
         <SelectItem value="01:30">01:30</SelectItem>
         <SelectItem value="02:00">02:00</SelectItem>
         <SelectItem value="02:30">02:30</SelectItem>
         <SelectItem value="03:00">03:00</SelectItem>
         <SelectItem value="03:30">03:30</SelectItem>
         <SelectItem value="04:00">04:00</SelectItem>
         <SelectItem value="04:30">04:30</SelectItem>
         <SelectItem value="05:00">05:00</SelectItem>
         <SelectItem value="05:30">05:30</SelectItem>
         <SelectItem value="06:00">06:00</SelectItem>
         <SelectItem value="06:30">06:30</SelectItem>
         <SelectItem value="07:00">07:00</SelectItem>
         <SelectItem value="07:30">07:30</SelectItem>
         <SelectItem value="08:00">08:00</SelectItem>
         <SelectItem value="08:30">08:30</SelectItem>
         <SelectItem value="09:00">09:00</SelectItem>
         <SelectItem value="10:00">09:30</SelectItem>
         <SelectItem value="00:00">10:00</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
