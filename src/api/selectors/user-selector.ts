import { CreateUser, LoginUser, User } from "@/api/models/user";

import { ApiError } from "@/api/models/api";
import { makeApi } from "@zodios/core";
import z from "zod";

export const userApi = makeApi([
  {
    method: "post",
    path: "/auth/sign-up",
    alias: "signUp",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: CreateUser,
      },
    ],
    response: z.object({
      data: User,
    }),
    errors: [
      {
        status: "default",
        schema: ApiError,
      },
    ],
  },
  {
    method: "post",
    path: "/auth/sign-in",
    alias: "login",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: LoginUser,
      },
    ],
    response: z.object({
      accessToken: z.string(),
    }),
    errors: [
      {
        status: "default",
        schema: ApiError,
      },
    ],
  },
  {
    method: "get",
    path: "/auth/sign-in",
    alias: "getUsers",
    response: z.object({
      data: z.array(User),
    }),
    errors: [
      {
        status: "default",
        schema: ApiError,
      },
    ],
  },
]);
