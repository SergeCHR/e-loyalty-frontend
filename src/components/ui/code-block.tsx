import { Copy, CopyCheck } from "lucide-react";

import Highlight from "react-highlight";
import { cn } from "@/lib/utils";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";

type CodeBlockProps = {
  className?: string;
  text: string;
  language?: string;
};

export const CodeBlock = (props: CodeBlockProps) => {
  const text = props.text.trim();
  const [copied, setCopied] = useState(false);
  return (
    <div className={cn("relative", props.className)}>
      <div className="absolute top-3 right-3">
        {copied ? (
          <CopyCheck className="text-green-500" />
        ) : (
          <Copy
            onClick={() => {
              navigator.clipboard.writeText(text);
              setCopied(true);
              toast({
                title: "Successfully copied to clipboard ✅",
              });
              setTimeout(() => setCopied(false), 1500);
            }}
            className="text-white cursor-pointer"
          />
        )}
      </div>
      <Highlight
        className="rounded-sm"
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        language="typescript"
      >
        {text}
      </Highlight>
    </div>
  );
};
