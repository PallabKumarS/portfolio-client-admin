"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";

const loaderVariants = cva("animate-spin", {
  variants: {
    size: {
      default: "h-6 w-6",
      sm: "h-4 w-4",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
    variant: {
      default: "text-primary",
      secondary: "text-secondary",
      muted: "text-muted-foreground",
    },
  },
  defaultVariants: {
    size: "default",
    variant: "default",
  },
});

export interface LoaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof loaderVariants> {
  text?: string;
  textClass?: string;
  centered?: boolean;
}

const LoaderComponent = ({
  className,
  size,
  variant,
  text,
  textClass,
  centered = false,
  ...props
}: LoaderProps) => {
  const loaderContent = (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <Loader2 className={cn(loaderVariants({ size, variant }))} />
      {text && <p className={cn("text-muted-foreground", textClass)}>{text}</p>}
    </div>
  );

  if (centered) {
    return (
      <div className="flex justify-center items-center w-full py-8">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
};

export { LoaderComponent, loaderVariants };
