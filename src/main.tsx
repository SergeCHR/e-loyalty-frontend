import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AuthProvider from "react-auth-kit";
import AuthOutlet from "@auth-kit/react-router/AuthOutlet";
import { QueryClient, QueryClientProvider } from "react-query";

import { ErrorPage } from "./pages/error-page/error-page.tsx";
import { LoginPage } from "./pages/authentication/login-page.tsx";

import "./index.css";
import { store } from "@/services/auth/store.ts";
import { RegisterPage } from "@/pages/authentication/register-page.tsx";
import { ResetPasswordPage } from "@/pages/authentication/reset-password-page.tsx";

const queryClient = new QueryClient();
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="*" element={<ErrorPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
      <Route element={<AuthOutlet fallbackPath="/auth/login" />}>
        <Route path="/" element={<>main</>} />
        <Route path="/dashboard" element={<>Dash</>} />
      </Route>
    </>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthProvider>
  </React.StrictMode>
);
