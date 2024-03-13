import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PointBasedScheme } from "@/api/models/point-based-scheme";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function PointBasedSchemaForm() {
  const form = useForm<z.infer<typeof PointBasedScheme>>({
    resolver: zodResolver(PointBasedScheme),
    defaultValues: {
      isActive: false,
      pointsAccrualRate: 0,
      pointsRedemptionRate: 0,
    },
  });

  function onSubmit(data: z.infer<typeof PointBasedScheme>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="isActive"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                <div className="space-y-0.5">
                  <FormLabel className="text-base">Activate Scheme</FormLabel>
                  <FormDescription>
                    When active, your users will be able to use point based
                    scheme.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div
            className={cn(
              form.getValues().isActive
                ? ""
                : "opacity-50 pointer-events-none transition-opacity"
            )}
          >
            <FormField
              control={form.control}
              name="pointsAccrualRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points Accrual Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="pointsRedemptionRate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Points Redemption Rate</FormLabel>
                  <FormControl>
                    <Input placeholder="0" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button type="submit">Update</Button>
      </form>
    </Form>
  );
}
