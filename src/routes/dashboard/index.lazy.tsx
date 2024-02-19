import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  beforeLoad: ({ context, location }) => {
    const notAllowed = !context.auth?.isAuthenticated();
    console.log({ notAllowed });
    if (notAllowed) {
      throw redirect({
        to: "/auth/login",
        search: {
          redirect: location.href,
        },
      });
    }
  },
  component: () => <div>Welcome to Dashboard</div>,
});
