import { cn } from "@/lib/utils";

interface LoaderProps {
  show?: boolean;
  className?: string;
}

export const Loader = ({ show = true, className }: LoaderProps) => {
  if (!show) {
    return null;
  }

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm",
        className
      )}
    >
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-primary"></div>
    </div>
  );
};
