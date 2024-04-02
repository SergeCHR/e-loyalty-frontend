import { Copy, EyeIcon, EyeOff } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

type BlurredBlockProps = {
  children: string;
  className?: string;
};

export const BlurredBlock = (props: BlurredBlockProps) => {
  const [visible, setVisible] = useState(false);
  return (
    <div
      className={cn(
        "relative border border-slate-300 rounded-sm py-2 px-4 pl-8",
        props.className
      )}
    >
      <div
        className="w-fit absolute right-2 top-2 cursor-pointer z-10"
        onClick={() => setVisible((prev) => !prev)}
      >
        {visible ? (
          <EyeOff className="h-5 w-5" />
        ) : (
          <EyeIcon className="h-5 w-5" />
        )}
      </div>
      <div
        className={cn(
          "w-full text-black",
          visible ? "" : "blur-[4px] select-none"
        )}
      >
        {visible && (
          <Copy
            className="absolute left-1 top-3 h-4 w-4"
            onClick={() => {
              navigator.clipboard.writeText(props.children);
              toast({
                title: "Successfully copied to clipboard ✅",
              });
            }}
          />
        )}
        {props.children}
      </div>
    </div>
  );
};
