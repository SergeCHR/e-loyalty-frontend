import clsx from "clsx";

export const MainContentWrapper = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={clsx(
        "mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-5xl lg:px-8 w-full h-full flex flex-col justify-center items-center",
        className
      )}
    >
      {children}
    </div>
  );
};
