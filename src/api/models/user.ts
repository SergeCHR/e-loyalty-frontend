import { CustomerAccount } from "@/api/models/customer-account";
import { PointBasedLoyaltyCardPoints } from "@/api/models/point-based-loyalty-card";
import { Tier } from "@/api/models/tier";
import { UserId } from "@/api/branded-types";
import z from "zod";

export const UserRole = z.enum(["ADMIN", "USER", "BUSINESS", "MANAGER"]);
export type UserRole = z.infer<typeof UserRole>;

export const RestrictedUserRole = z.enum(["ADMIN", "MANAGER"]);
export type RestrictedUserRole = z.infer<typeof RestrictedUserRole>;

export const RegularUserRole = z.enum(["USER", "BUSINESS"]);
export type RegularUserRole = z.infer<typeof RegularUserRole>;

export const User = z.object({
  id: UserId,
  name: z.string(),
  email: z.string().email(),
  //TODO: maybe update to something more date-like
  dateRegistered: z.string(),
  userType: UserRole,
  isVerified: z.boolean(),
});

export type User = z.infer<typeof User>;

export const CreateUser = z
  .object({
    name: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirmation is required"),
    userType: RegularUserRole,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreateUser = z.infer<typeof CreateUser>;

export const CreatePreRegisteredUser = z
  .object({
    name: z.string().min(1, "Username is required"),
    password: z.string().min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string().min(8, "Confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type CreatePreRegisteredUser = z.infer<typeof CreatePreRegisteredUser>;

export const LoginUser = z.object({
  email: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});
export type LoginUser = z.infer<typeof LoginUser>;

export const JwtUser = z.object({
  username: z.string(),
  sub: UserId,
  role: UserRole,
});
export type JwtUser = z.infer<typeof JwtUser>;

export const BusinessTableUser = PointBasedLoyaltyCardPoints.partial()
  .merge(CustomerAccount)
  .merge(
    z.object({
      tier: Tier.optional(),
    })
  );

export type BusinessTableUser = z.infer<typeof BusinessTableUser>;
