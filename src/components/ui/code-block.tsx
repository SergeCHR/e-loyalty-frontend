import { CopyBlock, atomOneDark } from "react-code-blocks";

import { toast } from "@/components/ui/use-toast";

type CodeBlockProps = {
  className?: string;
  text: string;
  language?: string;
};

export const CodeBlock = (props: CodeBlockProps) => {
  return (
    <div className={props.className}>
      <CopyBlock
        text={props.text}
        language={props.language ?? "typescript"}
        showLineNumbers
        customStyle={{
          paddingRight: "24px",
        }}
        codeBlock
        theme={atomOneDark}
        onCopy={() => {
          toast({
            title: "Successfully copied! ✅",
          });
        }}
      />
    </div>
  );
};
