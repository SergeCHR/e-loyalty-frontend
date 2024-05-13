import {
  BusinessId,
  LoyaltyCardId,
  PointBasedLoyaltyCardId,
  TierId,
  UserId,
} from "@/api/branded-types";

import z from "zod";

export const LoyaltyCard = z.object({
  id: LoyaltyCardId,
  businessId: BusinessId,
  userId: UserId,
  currentTierId: TierId,
  pointBasedLoyaltyCardId: PointBasedLoyaltyCardId,
});
