import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold ring-offset-background transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-b from-white to-[hsl(0,0%,88%)] text-background shadow-[0_1px_2px_rgba(0,0,0,0.3),0_0_0_1px_rgba(255,255,255,0.1)_inset] hover:from-white hover:to-[hsl(0,0%,92%)] hover:shadow-[0_0_24px_rgba(255,255,255,0.12),0_1px_2px_rgba(0,0,0,0.3)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-[hsl(0,0%,22%)] bg-transparent hover:bg-[hsl(0,0%,8%)] hover:border-[hsl(0,0%,35%)] hover:shadow-[0_0_20px_rgba(255,255,255,0.04)]",
        secondary: "bg-secondary text-secondary-foreground border border-border/40 hover:bg-[hsl(0,0%,12%)]",
        ghost: "hover:bg-[hsl(0,0%,8%)] hover:text-foreground",
        link: "text-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-md px-9",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
