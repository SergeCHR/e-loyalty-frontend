import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";

import AuthProvider from "react-auth-kit";
import { JwtUser } from "@/api/models/user";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import { Toaster } from "@/components/ui/toaster";
// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { store } from "@/services/auth/store.ts";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: undefined!,
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function InnerApp() {
  const user = useAuthUser<JwtUser>();
  const headers = useAuthHeader();
  const auth = {
    user,
    headers,
  };
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
