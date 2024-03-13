import { UserId } from "@/api/branded-types";
import z from "zod";

export const EmailVerificationCode = z.object({
  userId: UserId,
  code: z.number().min(6).max(6),
});

export type EmailVerificationCode = z.infer<typeof EmailVerificationCode>;
