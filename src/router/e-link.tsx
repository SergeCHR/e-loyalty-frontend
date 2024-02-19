import { AppRouteName } from "@/router";
import { Link, LinkProps } from "react-router-dom";

type ELinkProps = Exclude<LinkProps, "to"> & {
  to: AppRouteName;
};

export const ELink = (props: ELinkProps) => <Link {...props} />;
