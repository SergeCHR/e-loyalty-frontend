import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { BlurredBlock } from "@/components/ui/blurred-block";
import { PointBasedSchemaForm } from "@/pages/settings-page/point-based-form";
import { SideNavigation } from "@/components/dashboard/side-navigation";
import { TierBasedSchemeForm } from "@/pages/settings-page/tier-based-form";
import { createFileRoute } from "@tanstack/react-router";

// import { protectRouteWithRole } from "@/lib/routing";
// import { useProtected } from "@/services/auth/useProtected";

export const Route = createFileRoute("/dashboard/settings/")({
  // beforeLoad: protectRouteWithRole("STORE"),
  component: () => (
    <SideNavigation>
      <SettingsPage />
    </SideNavigation>
  ),
});

const SettingsPage = () => {
  // useProtected({
  //   role: "STORE",
  // });
  return (
    <div className="w-full pl-4">
      <h1 className="text-4xl bg-transparent mt-4">Your settings</h1>
      <p className="text-lg bg-transparent mt-4">
        Loyalty systems configuration
      </p>
      <Tabs defaultValue="point" className="w-[800px] mt-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="point">Point-based</TabsTrigger>
          <TabsTrigger value="tier">Tier-based</TabsTrigger>
        </TabsList>
        <TabsContent value="point">
          <Card>
            <CardHeader>
              <CardTitle>Point Based Loyalty System</CardTitle>
              <CardDescription>
                Make your configurations here. To make it visible to users -
                make switch active.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <PointBasedSchemaForm />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="tier">
          <Card>
            <CardHeader>
              <CardTitle>Tier Based Loyalty System</CardTitle>
              <CardDescription>
                Select needed tiers for your loyalty system.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <TierBasedSchemeForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      <p className="text-lg bg-transparent mt-8">Your api key</p>
      <BlurredBlock className="text-black w-96 mt-2">
        onrast#)aornstoiecaorinstoi
      </BlurredBlock>
      <div className="w-full pb-64" />
    </div>
  );
};
