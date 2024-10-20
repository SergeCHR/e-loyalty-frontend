import { TierId } from "@/api/branded-types";
import z from "zod";

export const CreateTier = z.object({
  name: z.string().min(1),
  qualificationThreshold: z.string().min(1),
});

export type CreateTier = z.infer<typeof CreateTier>;

export const IncreasePoints = z.object({
  amount: z.string().refine(v => z.number().parse(parseInt(v))),
});

export type IncreasePoints = z.infer<typeof IncreasePoints>;

export const Tier = z.object({
  id: TierId,
  name: z.string(),
  qualificationThreshold: z.number(),
});

export type Tier = z.infer<typeof Tier>;
