import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "@tanstack/react-router";

export const BackButton = () => {
  const { history } = useRouter();
  return (
    <ArrowLeftIcon
      className="fixed z-50 text-white w-8 h-8 left-4 top-4 cursor-pointer"
      onClick={() => history.go(-1)}
    />
  );
};
