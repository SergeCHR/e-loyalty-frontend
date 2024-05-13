import z from "zod";

export const Url = z.string().brand("Url");
export type Url = z.infer<typeof Url>;

export const UserId = z.number().brand("UserId");
export type UserId = z.infer<typeof UserId>;

export const CustomerAccountId = z.number().brand("CustomerAccountId");
export type CustomerAccountId = z.infer<typeof CustomerAccountId>;

export const BusinessAccountId = z.number().brand("BusinessAccountId");
export type BusinessAccountId = z.infer<typeof BusinessAccountId>;

export const BusinessId = z.number().brand("BusinessId");
export type BusinessId = z.infer<typeof BusinessId>;

export const BonusTransactionId = z.number().brand("BonusTransactionId");
export type BonusTransactionId = z.infer<typeof BonusTransactionId>;

export const LoyaltyCardId = z.number().brand("LoyaltyCardId");
export type LoyaltyCardId = z.infer<typeof LoyaltyCardId>;

export const TierId = z.number().brand("TierId");
export type TierId = z.infer<typeof TierId>;

export const PointBasedLoyaltyCardId = z
  .number()
  .brand("PointBasedLoyaltyCardId");
export type PointBasedLoyaltyCardId = z.infer<typeof PointBasedLoyaltyCardId>;
