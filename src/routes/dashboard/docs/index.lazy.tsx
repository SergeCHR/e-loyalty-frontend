import { CodeBlock } from "@/components/ui/code-block";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { SideNavigation } from "@/components/dashboard/side-navigation";
import { createFileRoute } from "@tanstack/react-router";

// import { protectRouteWithRole } from "@/lib/routing";
// import { useProtected } from "@/services/auth/useProtected";

export const Route = createFileRoute("/dashboard/docs/")({
  // beforeLoad: protectRouteWithRole("STORE"),
  component: () => (
    <SideNavigation>
      <DocumentationPage />
    </SideNavigation>
  ),
});

const DocumentationPage = () => {
  // useProtected({
  //   role: "STORE",
  // });
  return (
    <ScrollArea className="w-full h-screen pl-4">
      <h1 className="text-4xl bg-transparent mt-4">Documentation</h1>
      <p className="text-lg bg-transparent mt-4">
        This is the documentation page
      </p>
      <CodeBlock
        className="max-w-fit"
        text={`
import { Tier } from "@/api/models/tier";
import z from "zod";

export const TierBasedScheme = z.object({
  isActive: z.boolean(),
  tiers: z.array(Tier),
});

export type TierBasedScheme = z.infer<typeof TierBasedScheme>;
`}
      />
    </ScrollArea>
  );
};
