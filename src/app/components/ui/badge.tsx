import * as React from "react"
import { cn } from "./button"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "secondary" | "destructive" | "outline" | "success" | "warning" | "info"
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
        {
          "border-transparent bg-slate-900 text-white shadow hover:bg-slate-900/80": variant === "default",
          "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80": variant === "secondary",
          "border-transparent bg-rose-500 text-white shadow hover:bg-rose-500/80": variant === "destructive",
          "border-transparent bg-emerald-500 text-white shadow hover:bg-emerald-500/80": variant === "success",
          "border-transparent bg-amber-500 text-white shadow hover:bg-amber-500/80": variant === "warning",
          "border-transparent bg-blue-500 text-white shadow hover:bg-blue-500/80": variant === "info",
          "text-slate-950 border-slate-200": variant === "outline",
        },
        className
      )}
      {...props}
    />
  )
}

export { Badge }