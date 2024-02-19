import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useNavigate } from "react-router-dom";

export const BackButton = () => {
  const navigate = useNavigate();
  return (
    <ArrowLeftIcon
      className="fixed z-50 text-white w-8 h-8 left-4 top-4 cursor-pointer"
      onClick={() => navigate(-1)}
    />
  );
};
