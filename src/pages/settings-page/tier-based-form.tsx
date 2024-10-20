import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { TierList } from "@/pages/settings-page/tier-list";
import { UpdateTierBasedScheme } from "@/api/models/tier-based-scheme";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useTiersStore } from "@/store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export function TierBasedSchemeForm() {
  const { isActive, selectedTiers, setIsActive } = useTiersStore();

  const form = useForm<z.infer<typeof UpdateTierBasedScheme>>({
    resolver: zodResolver(UpdateTierBasedScheme),
    defaultValues: {
      isActive,
    },
  });

  const [isLoading, setIsLoading] = useState(false)

  function onSubmit(data: z.infer<typeof UpdateTierBasedScheme>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          <code className="text-white">
            {JSON.stringify(selectedTiers, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
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
                      onCheckedChange={(checked) => {
                        field.onChange(checked);
                        setIsActive(checked);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
      <div
        className={cn(
          form.getValues().isActive
            ? ""
            : "opacity-50 pointer-events-none transition-opacity"
        )}
      >
        <TierList />
        <Button className="mt-4" onClick={() => {
          setIsLoading(true)
          setTimeout(() => setIsLoading(false), 250)
        }} disabled={isLoading}>{isLoading ? <>
        <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
        Please wait
        </> : "Update"}</Button>
      </div>
    </>
  );
}
