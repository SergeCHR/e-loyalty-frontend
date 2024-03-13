import { CustomerAccountId, Url, UserId } from "@/api/branded-types";

import z from "zod";

export const Gender = z.enum(["Male", "Female"]);

export type Gender = z.infer<typeof Gender>;

export const CustomerAccount = z.object({
  id: CustomerAccountId,
  userId: UserId,
  fullName: z.string(),
  gender: Gender,
  location: z.string(),
  birthday: z.string(),
  imageUrl: Url,
});

export type CustomerAccount = z.infer<typeof CustomerAccount>;
