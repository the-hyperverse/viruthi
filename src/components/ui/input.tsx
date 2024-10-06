import * as React from "react"

import { cn } from "@/lib/utils"

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "tw-flex tw-h-9 tw-w-full tw-rounded-md tw-border tw-border-slate-200 tw-bg-transparent tw-px-3 tw-py-1 tw-text-sm tw-shadow-sm tw-transition-colors file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-slate-950 placeholder:tw-text-slate-500 focus-visible:tw-outline-none focus-visible:tw-ring-1 focus-visible:tw-ring-slate-950 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 dark:tw-border-slate-800 dark:file:tw-text-slate-50 dark:placeholder:tw-text-slate-400 dark:focus-visible:tw-ring-slate-300",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
