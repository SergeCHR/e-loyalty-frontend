import { StoreId } from "@/api/branded-types";
import z from "zod";

export const Store = z.object({
  id: StoreId,
  fullName: z.string(),
  description: z.string().max(100000),
  apiKey: z.string().min(16).max(16),
});

export type Store = z.infer<typeof Store>;
