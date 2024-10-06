import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "tw-inline-flex tw-items-center tw-rounded-md tw-border tw-border-slate-200 tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-slate-950 focus:tw-ring-offset-2 dark:tw-border-slate-800 dark:focus:tw-ring-slate-300",
  {
    variants: {
      variant: {
        default:
          "tw-border-transparent tw-bg-slate-900 tw-text-slate-50 tw-shadow hover:tw-bg-slate-900/80 dark:tw-bg-slate-50 dark:tw-text-slate-900 dark:hover:tw-bg-slate-50/80",
        secondary:
          "tw-border-transparent tw-bg-slate-100 tw-text-slate-900 hover:tw-bg-slate-100/80 dark:tw-bg-slate-800 dark:tw-text-slate-50 dark:hover:tw-bg-slate-800/80",
        destructive:
          "tw-border-transparent tw-bg-red-500 tw-text-slate-50 tw-shadow hover:tw-bg-red-500/80 dark:tw-bg-red-900 dark:tw-text-slate-50 dark:hover:tw-bg-red-900/80",
        outline: "tw-text-slate-950 dark:tw-text-slate-50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
