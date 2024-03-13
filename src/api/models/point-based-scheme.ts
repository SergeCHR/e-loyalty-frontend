import z from "zod";

export const PointBasedScheme = z.object({
  pointsAccrualRate: z.number().min(0),
  pointsRedemptionRate: z.number().min(0),
  isActive: z.boolean(),
});

export type PointBasedScheme = z.infer<typeof PointBasedScheme>;
