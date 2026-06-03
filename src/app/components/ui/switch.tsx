import * as React from "react"
import { cn } from "./button"

const Switch = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { 
    checked?: boolean; 
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void 
  }
>(({ className, checked, defaultChecked, onCheckedChange, ...props }, ref) => {
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked || false);
  const isControlled = checked !== undefined;
  const currentChecked = isControlled ? checked : internalChecked;

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isControlled) {
      setInternalChecked(!currentChecked);
    }
    onCheckedChange?.(!currentChecked);
    props.onClick?.(e);
  };

  return (
    <button
      type="button"
      role="switch"
      aria-checked={currentChecked}
      data-state={currentChecked ? "checked" : "unchecked"}
      onClick={handleClick}
      ref={ref}
      className={cn(
        "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0588f0] focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-[#0588f0] data-[state=unchecked]:bg-[#737373]",
        className
      )}
      {...props}
    >
      <span
        data-state={currentChecked ? "checked" : "unchecked"}
        className={cn(
          "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
        )}
      />
    </button>
  );
})
Switch.displayName = "Switch"

export { Switch }