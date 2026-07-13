import * as React from "react";

import { cn } from "@/lib/utils";

function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        orientation === "horizontal"
          ? "h-px w-full bg-[#E8EAF2] dark:bg-white/10"
          : "h-full w-px bg-[#E8EAF2] dark:bg-white/10",
        className
      )}
    />
  );
}

export { Separator };
