import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { pluginFetch, pluginToken } from "@zodios/plugins";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const corsFetchHandler = pluginFetch({
  mode: "cors",
  keepalive: true,
  credentials: "include",
});

export const tokenHandler = pluginToken({
  //TODO: handle retrieving token
  getToken: async () => localStorage.getItem("token") ?? "",
});
