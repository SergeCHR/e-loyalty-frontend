import z from "zod";

export const UpdateTierBasedScheme = z.object({
  isActive: z.boolean(),
});

export type UpdateTierBasedScheme = z.infer<typeof UpdateTierBasedScheme>;
