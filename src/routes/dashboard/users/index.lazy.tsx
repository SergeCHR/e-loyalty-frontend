import { ArrowUpDown, Copy } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useAddPointsModalStore, useUsersTableStore } from "@/store";

import { BusinessTableUser } from "@/api/models/user";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@/components/ui/data-table";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { IncreasePoints } from "@/api/models/tier";
import { Input } from "@/components/ui/input";
import { MoreHorizontal } from "lucide-react";
import { SideNavigation } from "@/components/dashboard/side-navigation";
import { User as UserIcon } from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";
import { getTierName } from "@/lib/fake-data";
import { useForm } from "react-hook-form";
import { useMemo } from "react";
import {z} from 'zod'
import { zodResolver } from "@hookform/resolvers/zod";

// import { protectRouteWithRole } from "@/lib/routing";
// import { useProtected } from "@/services/auth/useProtected";

// const fakeCreatedUser: BusinessTableUser = {
//   id: CustomerAccountId.parse(25),
//   birthday: faker.date.birthdate().toISOString(),
//   fullName: "scherneha",
//   gender: Math.random() > 0.5 ? "Male" : "Female",
//   imageUrl: Url.parse(faker.image.avatar()),
//   location: faker.location.city(),
//   userId: UserId.parse(faker.number.int()),
//   availablePointAmount: 0,
//   idlePointAmount: 0,
//   tier: {id: TierId.parse(1231231), name: "Silver", qualificationThreshold: 0},
// }

export const Route = createFileRoute("/dashboard/users/")({
  // beforeLoad: protectRouteWithRole("BUSINESS"),
  component: () => (
    <SideNavigation>
      <DashboardUsersPage />
    </SideNavigation>
  ),
});

const DashboardUsersPage = () => {
  const addPointsModal = useAddPointsModalStore();
  const form = useForm<z.infer<typeof IncreasePoints>>({
    resolver: zodResolver(IncreasePoints),
  });

  const usersTable = useUsersTableStore()

  const columns: ColumnDef<BusinessTableUser>[] = useMemo(() => [
    {
      accessorKey: "id",
      header: "ID",
    },
    {
      accessorKey: "fullName",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            User
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: "availablePointAmount",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Available Points
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => {
        const user = row.original;
        return <span className="block">{user.availablePointAmount}</span>;
      },
    },
    {
      accessorKey: "tier",
      header: "Tier Name",
      cell: ({ row }) => {
        const user = row.original;
        return <span>{user.tier?.name}</span>;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
  
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                //todo: add email to schema and write it here
                onClick={() => navigator.clipboard.writeText(user.id.toString())}
              >
                <Copy className="mr-2 h-4 w-4" />
                <span>Copy user ID</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <UserIcon className="mr-2 h-4 w-4" />
                  <span>Update user</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => {
                      addPointsModal.setOpen(true)
                      addPointsModal.setUser(user)
                    }}>
                      <span>Update amount of points</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <span>Update tier</span>
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ], [addPointsModal]);
  
  function onSubmit(data: z.infer<typeof IncreasePoints>) {
    const users = usersTable.users.map(user => user.id !== addPointsModal.user?.id ? user : ({
      ...user,
      availablePointAmount: (user.availablePointAmount ?? 0) + Number(data.amount),
      tier: getTierName((user.availablePointAmount ?? 0) + Number(data.amount))
    }))
    console.log({users})
    usersTable.setUsers(users)
    addPointsModal.setOpen(false)
  }
  console.log({usersTable})
  return (
    <div className="w-full pl-4">
      <h1 className="text-4xl bg-transparent mt-4">Users</h1>
      <p className="text-lg bg-transparent mt-4">
        List of people using your loyalty system
      </p>
      <Dialog
      open={addPointsModal.open}
      onOpenChange={addPointsModal.setOpen}
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Increaes points</DialogTitle>
          <DialogDescription>
            Insert how many points you want to transfer to <span className="text-primary">scherneha</span>.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right text-sm">Amount</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="100"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
      <DataTable
        className="mr-4 mt-8"
        columns={columns}
        data={usersTable.users}
      />
    </div>
  );
};