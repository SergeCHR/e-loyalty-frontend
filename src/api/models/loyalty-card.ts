import {
  LoyaltyCardId,
  PointBasedLoyaltyCardId,
  StoreId,
  TierId,
  UserId,
} from "@/api/branded-types";

import z from "zod";

export const LoyaltyCard = z.object({
  id: LoyaltyCardId,
  storeId: StoreId,
  userId: UserId,
  currentTierId: TierId,
  pointBasedLoyaltyCardId: PointBasedLoyaltyCardId,
});
