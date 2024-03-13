import { JwtUser, RegularUserRole } from "@/api/models/user";

import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import { useNavigate } from "@tanstack/react-router";

type UseProtected = {
  role?: RegularUserRole;
};

export const useProtected = (props: UseProtected) => {
  const navigate = useNavigate();
  const user = useAuthUser<JwtUser>();

  console.log({ user });

  if (!user) {
    return navigate({ to: "/auth/login" });
  }
  if (user.role !== props.role) {
    return navigate({ to: "/not-authenticated" });
  }
};
