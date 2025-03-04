import { cn } from "@/lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-fade rounded-md bg-low_white", className)}
      {...props}
    />
  );
}

export { Skeleton };
