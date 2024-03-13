import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SideNavigation } from "@/components/dashboard/side-navigation";
// import { protectRouteWithRole } from "@/lib/routing";
// import { useProtected } from "@/services/auth/useProtected";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export const Route = createFileRoute("/dashboard/")({
  // beforeLoad: protectRouteWithRole("STORE"),
  component: () => (
    <SideNavigation>
      <DashboardPage />
    </SideNavigation>
  ),
});

const DashboardPage = () => {
  // useProtected({
  //   role: "STORE",
  // });
  const navigate = useNavigate();
  const signOut = useSignOut();
  return (
    <div>
      <p>Welcome to Dashboard</p>
      <Button
        onClick={() => {
          signOut();
          navigate({
            to: "/auth/login",
          });
        }}
      >
        Sign out
      </Button>
    </div>
  );
};
