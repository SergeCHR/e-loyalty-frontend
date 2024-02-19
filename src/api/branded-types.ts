import z from "zod";

export const Url = z.string().brand("Url");
export type Url = z.infer<typeof Url>;

export const UserId = z.number().brand("UserId");
export type UserId = z.infer<typeof UserId>;
