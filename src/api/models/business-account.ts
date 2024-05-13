import { BusinessAccountId, Url, UserId } from "@/api/branded-types";

import z from "zod";

export const BusinessAccount = z.object({
  id: BusinessAccountId,
  userId: UserId,
  fullName: z.string(),
  birthday: z.string(),
  imageUrl: Url,
});

export type CustomerAccount = z.infer<typeof BusinessAccount>;
