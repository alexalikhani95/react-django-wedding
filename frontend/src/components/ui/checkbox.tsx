import * as CheckboxPrimitive from "@radix-ui/react-checkbox"
import type * as React from "react"

import GreenTick from "@/assets/Green-Tick.png"
import { cn } from "@/lib/utils"

function Checkbox({
  className,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root>) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        // size & shape
        "w-[30px] h-[30px] shrink-0 rounded-[4px] border shadow-xs outline-none transition-shadow",
        // always-white background (light & dark)
        "bg-white dark:bg-white border-input",
        // focus/invalid/disabled
        "focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:border-ring",
        "aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center pointer-events-none"
      >
        <img
          src={GreenTick}
          alt=""
          className="w-20 h-5 object-contain"
          draggable={false}
        />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
