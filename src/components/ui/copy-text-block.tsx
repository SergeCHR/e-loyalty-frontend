import { Copy, CopyCheck } from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

type CopyTextBlockProps = {
  children: string;
  className?: string;
};

export const CopyTextBlock = (props: CopyTextBlockProps) => {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className={cn(
        "w-fit relative border border-slate-300 rounded-sm py-2 px-4 pr-10 text-ellipsis",
        props.className
      )}
    >
      <div
        className={cn(
          "text-black w-full"
        )}
      >
     {props.children}
       {copied 
       ? <CopyCheck className="absolute right-3 top-3 h-4 w-4 text-green-600"/> 
       :  <Copy
            className="absolute right-3 top-3 h-4 w-4"
            onClick={() => {
              navigator.clipboard.writeText(props.children);
              setCopied(true);
              setTimeout(() => {
                setCopied(false);
              }, 3000)
              toast({
                title: "Successfully copied to clipboard ✅",
              });
            }}
          />}
      </div>
    </div>
  );
};
