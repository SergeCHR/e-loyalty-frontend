import { CreateUser, User } from "@/api/models/user";

import { ApiError } from "@/api/models/api";
import { makeApi } from "@zodios/core";
import z from "zod";

export const userApi = makeApi([
  {
    method: "post",
    path: "/v1/user",
    alias: "createUser",
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
    method: "get",
    path: "/v1/user",
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
