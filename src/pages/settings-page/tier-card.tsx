import { CreateTier, Tier } from "@/api/models/tier";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trophy } from "lucide-react";
import { useForm } from "react-hook-form";
import { useTiersStore } from "@/store";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type TierCardProps = {
  tier: Tier;
};

export const TierCard = (props: TierCardProps) => {
  return (
    <>
      <div className="flex items-center justify-center flex-col">
        <p className="text-xl">{props.tier.name}</p>
        <div className="mt-4 text-slate-700 flex items-center">
          <Trophy className="w-4 h-4" />
          &nbsp;
          <p>{props.tier.qualificationThreshold}</p>
        </div>
      </div>
    </>
  );
};

export const EditTierDialog = () => {
  const { editTier, editMode, setEditMode } = useTiersStore();
  console.log({ editMode });
  const form = useForm<z.infer<typeof CreateTier>>({
    resolver: zodResolver(CreateTier),
  });

  function onSubmit(data: z.infer<typeof CreateTier>) {
    if (!editMode.tier) return;
    const newTier = {
      id: editMode.tier.id.toString(),
      name: data.name,
      qualificationThreshold: parseInt(data.qualificationThreshold),
    };
    editTier(newTier.id, newTier);
    setEditMode({ isActive: false });
  }
  return (
    <Dialog
      open={editMode.isActive}
      onOpenChange={(v) =>
        v
          ? setEditMode({
              isActive: true,
              tier: editMode.tier,
            })
          : setEditMode({ isActive: false })
      }
    >
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit your tier</DialogTitle>
          <DialogDescription>
            Update characteristics of your tier. Click update when you are
            finished.
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
                        defaultValue={editMode.tier?.name}
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
                        defaultValue={editMode.tier?.qualificationThreshold}
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
  );
};
