import { PointBasedLoyaltyCardId } from "@/api/branded-types";
import z from "zod";

export const PointBasedLoyaltyCardPoints = z.object({
  availablePointAmount: z.number().min(0),
  idlePointAmount: z.number().min(0),
});

export type PointBasedLoyaltyCardPoints = z.infer<
  typeof PointBasedLoyaltyCardPoints
>;

export const PointBasedLoyaltyCard = PointBasedLoyaltyCardPoints.extend({
  id: PointBasedLoyaltyCardId,
});

export type PointBasedLoyaltyCard = z.infer<typeof PointBasedLoyaltyCard>;
