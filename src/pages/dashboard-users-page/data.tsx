import { ArrowUpDown, Copy } from "lucide-react";
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

import { BusinessTableUser } from "@/api/models/user";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { DropdownMenuPortal } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { User as UserIcon } from "lucide-react";

export const columns: ColumnDef<BusinessTableUser>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  // {
  //   id: "avatar",
  //   cell: ({ row }) => {
  //     const user = row.original;
  //     return (
  //       <img className="w-8 h-8 min-w-8 rounded-full" src={user.imageUrl} />
  //     );
  //   },
  // },
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
      return <span className="block ml-16">{user.availablePointAmount}</span>;
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
                  <DropdownMenuItem>
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
];
