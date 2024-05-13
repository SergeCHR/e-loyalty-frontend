import { BusinessId } from "@/api/branded-types";
import z from "zod";

export const Business = z.object({
  id: BusinessId,
  fullName: z.string(),
  description: z.string().max(100000),
  apiKey: z.string().min(16).max(16),
});

export type Business = z.infer<typeof Business>;
