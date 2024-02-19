import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import AuthProvider from "react-auth-kit";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { User } from "@/api/models/user";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { store } from "@/services/auth/store.ts";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: {
      headers: null,
      isAuthenticated: () => false,
      user: undefined,
    },
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const user = useAuthUser<User>();
  const isAuthenticated = useIsAuthenticated();
  const headers = useAuthHeader();
  const auth = {
    user,
    isAuthenticated,
    headers,
  };
  console.log({ auth });
  return (
    <RouterProvider
      router={router}
      context={{
        auth,
      }}
    />
  );
}

const queryClient = new QueryClient();

// Render the app
const rootElement = document.getElementById("app")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <AuthProvider store={store}>
        <QueryClientProvider client={queryClient}>
          <InnerApp />
          <Toaster />
        </QueryClientProvider>
      </AuthProvider>
    </StrictMode>
  );
}
