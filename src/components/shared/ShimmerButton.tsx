import { ReactNode } from "react";

const ShimmerButton = ({
  children,
  onClick,
  className,
  type,
}: {
  type?: "button" | "submit" | "reset";
  children: string | ReactNode;
  onClick?: () => void;
  className?: string;
}) => {
  return (
    <button
      type={type || "button"}
      onClick={onClick}
      className={`inline-flex h-10 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-5 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 ${className}`}
    >
      {children}
    </button>
  );
};

export default ShimmerButton;
