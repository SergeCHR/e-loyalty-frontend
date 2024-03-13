import { BonusTransactionId, LoyaltyCardId } from "@/api/branded-types";

import z from "zod";

export const BonusTransaction = z.object({
  id: BonusTransactionId,
  loyaltyCardId: LoyaltyCardId,
  pointsAmount: z.number(),
});

export type BonusTransaction = z.infer<typeof BonusTransaction>;
