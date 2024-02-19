export const routes = {
  "/": "/",
  "/not-found": "/not-found",
  "/auth/login": "/auth/login",
  "/auth/logout": "/auth/logout",
  "/auth/register": "/auth/register",
  "/auth/reset-password": "/auth/reset-password",
  "/auth/verify-email": "/auth/verify-email",
  "/dashboard": "/dashboard",
} as const;

export type AppRoutes = typeof routes;
export type AppRouteName = AppRoutes[keyof AppRoutes];
