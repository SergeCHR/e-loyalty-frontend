import z from "zod";

export const CreateTier = z.object({
  name: z.string().min(1),
  qualificationThreshold: z.string().min(1),
});

export type CreateTier = z.infer<typeof CreateTier>;

export const Tier = z.object({
  name: z.string(),
  qualificationThreshold: z.number(),
  id: z.number(),
});

export type Tier = z.infer<typeof Tier>;
