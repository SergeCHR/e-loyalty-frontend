import { DataTable } from "@/components/ui/data-table";
import { SideNavigation } from "@/components/dashboard/side-navigation";
import { columns } from "@/pages/dashboard-users-page/data";
import { createFileRoute } from "@tanstack/react-router";
import { fill } from "@/lib/array";
import { generateFakeStoreTableUser } from "@/lib/fake-data";

// import { protectRouteWithRole } from "@/lib/routing";
// import { useProtected } from "@/services/auth/useProtected";

const fakeStoreTableUsers = fill(50, generateFakeStoreTableUser);

export const Route = createFileRoute("/dashboard/users/")({
  // beforeLoad: protectRouteWithRole("STORE"),
  component: () => (
    <SideNavigation>
      <DashboardUsersPage />
    </SideNavigation>
  ),
});

const DashboardUsersPage = () => {
  // useProtected({
  //   role: "STORE",
  // });
  return (
    <div className="w-full pl-4">
      <h1 className="text-4xl bg-transparent mt-4">Users</h1>
      <p className="text-lg bg-transparent mt-4">
        List of people using your loyalty system
      </p>
      <DataTable
        className="mr-4 mt-8"
        columns={columns}
        data={fakeStoreTableUsers}
      />
    </div>
  );
};
