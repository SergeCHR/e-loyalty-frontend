import z from "zod";

export const ApiError = z.object({
  // localizable code like LiveStream.NotFound
  // <context.type>
  code: z.string(),
  // default localization message if not existent
  message: z.string(),
});
export type ApiError = z.infer<typeof ApiError>;
