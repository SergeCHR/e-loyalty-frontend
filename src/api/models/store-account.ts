import { StoreAccountId, Url, UserId } from "@/api/branded-types";

import z from "zod";

export const StoreAccount = z.object({
  id: StoreAccountId,
  userId: UserId,
  fullName: z.string(),
  birthday: z.string(),
  imageUrl: Url,
});

export type CustomerAccount = z.infer<typeof StoreAccount>;
