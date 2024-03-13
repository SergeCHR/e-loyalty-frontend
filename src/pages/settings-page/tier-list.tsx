import * as ToggleGroup from "@radix-ui/react-toggle-group";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { EditTierDialog, TierCard } from "@/pages/settings-page/tier-card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { CreateTier } from "@/api/models/tier";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTiersStore } from "@/store";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function TierList() {
  const {
    selectedValues,
    defaultTiers,
    customTiers,
    setSelectedValues,
    setSelectedTiers,
    setEditMode,
  } = useTiersStore();

  const allTiers = [...defaultTiers, ...customTiers];

  return (
    <div>
      <p className="text-xl font-semibold">Currently used tiers.</p>
      <p className="text-slate-700">
        Select tiers you want your users to be able to gain!
      </p>
      <div>
        <div className="mt-4">
          <ToggleGroup.Root
            type="multiple"
            value={selectedValues}
            onValueChange={(value) => {
              setSelectedValues(value);
              const selectedTiers = allTiers
                .filter((c) => value.includes(c.id))
                .map((tier) => ({
                  ...tier,
                  id: parseInt(tier.id),
                }));
              setSelectedTiers(selectedTiers);
            }}
          >
            <p className="mt-8 text-lg font-bold">Default tiers</p>
            <p className="text-slate-600">
              Pre-created by system. You can use them or add your own!
            </p>
            <div className="flex flex-wrap gap-4 max-h-52 overflow-scroll scrollbar-hide border border-slate-300 p-4 rounded-lg">
              {defaultTiers.map((tier) => (
                <ToggleGroup.Item
                  key={tier.id}
                  value={tier.id}
                  className={`w-40 h-32 flex items-center justify-center border-2 ${
                    selectedValues.includes(tier.id)
                      ? "border-green-500 bg-green-100"
                      : "border-gray-200"
                  } rounded-lg cursor-pointer`}
                  aria-label={tier.name}
                >
                  <TierCard
                    tier={{
                      id: parseInt(tier.id),
                      name: tier.name,
                      qualificationThreshold: tier.qualificationThreshold,
                    }}
                  />
                </ToggleGroup.Item>
              ))}
            </div>

            <p className="mt-4 text-lg font-bold">Your own tiers</p>
            <p className="text-slate-600">
              Here you can create, edit or delete your custom tiers.
            </p>
            <div className="flex flex-wrap gap-4 min-h-52 overflow-scroll scrollbar-hide border border-slate-300 p-4 rounded-lg">
              {customTiers.map((tier) => (
                <TierCardContextMenu
                  onEditClicked={() =>
                    setEditMode({
                      isActive: true,
                      tier,
                    })
                  }
                >
                  <ToggleGroup.Item
                    key={tier.id}
                    value={tier.id}
                    className={cn(
                      `w-40 h-32 flex items-center justify-center border-2 ${
                        selectedValues.includes(tier.id)
                          ? "border-green-500 bg-green-100"
                          : "border-gray-200"
                      } rounded-lg cursor-pointer`
                    )}
                    aria-label={tier.name}
                  >
                    <TierCard
                      tier={{
                        id: parseInt(tier.id),
                        name: tier.name,
                        qualificationThreshold: tier.qualificationThreshold,
                      }}
                    />
                  </ToggleGroup.Item>
                </TierCardContextMenu>
              ))}
              <AddTierDialog>
                <div className="w-40 h-32 flex items-center justify-center bg-slate-200 rounded-lg cursor-pointer">
                  <Plus />
                </div>
              </AddTierDialog>
            </div>
          </ToggleGroup.Root>
          <EditTierDialog />
        </div>
      </div>
    </div>
  );
}

type AddTierDialogProps = {
  children?: React.ReactNode;
};

const AddTierDialog = (props: AddTierDialogProps) => {
  const [open, setOpen] = useState(false);
  const { setCustomTiers, customTiers } = useTiersStore();

  const form = useForm<z.infer<typeof CreateTier>>({
    resolver: zodResolver(CreateTier),
    defaultValues: {
      name: "",
      qualificationThreshold: "",
    },
  });

  function onSubmit(data: z.infer<typeof CreateTier>) {
    const newTier = {
      //todo: id should be created by backend
      id: Math.floor(Math.random() * 100).toString(),
      name: data.name,
      qualificationThreshold: parseInt(data.qualificationThreshold),
    };

    setCustomTiers(customTiers.concat([newTier]));
    setOpen(false);
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add custom tier</DialogTitle>
          <DialogDescription>
            Fill in desired characteristics of your new tier. Click add when you
            are finished.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right text-sm">Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Tier name"
                        className="col-span-3"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="qualificationThreshold"
              render={({ field }) => (
                <FormItem>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <FormLabel className="text-right text-sm">
                      Points needed
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="0"
                        className="col-span-3"
                        type="number"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

type TierCardContextMenuProps = {
  onEditClicked: () => void;
  children: React.ReactNode;
};

const TierCardContextMenu = (props: TierCardContextMenuProps) => {
  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem onClick={props.onEditClicked} inset>
          Edit
        </ContextMenuItem>
        <ContextMenuItem className="text-red-500" inset>
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
