import z from "zod";

export const Pagination = z
  .intersection(
    z
      .discriminatedUnion("type", [
        z.object({
          type: z.literal("Seek"),
          id: z.string().optional(),
        }),
        z.object({
          type: z.literal("Index"),
          index: z.number().optional(),
        }),
      ])
      .default({ type: "Index" }),
    z.object({
      direction: z
        .union([z.literal("After"), z.literal("Before")])
        .default("After"),
      limit: z.number().default(50),
    })
  )
  .default({ type: "Index" });

export type Pagination = z.infer<typeof Pagination>;
