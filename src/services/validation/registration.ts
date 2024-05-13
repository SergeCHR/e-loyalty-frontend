import { z } from "zod";

// Validation schemas
export const usernameSchema = z.object({
  name: z.string().min(1, "Username is required"),
});

export const userDetailsSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    confirmPassword: z.string().min(6, "Confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const accountTypeSchema = z.object({
  role: z.enum(["USER", "BUSINESS"]),
});
