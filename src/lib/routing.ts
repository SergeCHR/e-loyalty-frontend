import { BaseRouteOptions, redirect } from "@tanstack/react-router";

import { MyRouterContext } from "@/routes/__root";
import { RegularUserRole } from "@/api/models/user";

type BeforeLoadOptions = Parameters<
  NonNullable<BaseRouteOptions["beforeLoad"]>
>[0];

export const protectRouteWithRole =
  (role: RegularUserRole) => (opts: BeforeLoadOptions) => {
    const context = opts.context as MyRouterContext;
    const user = context.auth.user;
    console.log({ context, user });
    if (!user)
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: opts.location.href,
        },
      });
    if (user.role !== role)
      throw redirect({
        to: "/not-authenticated",
      });
  };
