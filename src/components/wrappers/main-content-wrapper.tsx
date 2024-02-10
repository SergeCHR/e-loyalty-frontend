import { PropsWithChildren } from "react";

export const MainContentWrapper = ({ children }: PropsWithChildren) => {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-5xl lg:px-8">
      {children}
    </div>
  );
};
