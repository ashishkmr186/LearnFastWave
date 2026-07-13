"use client";

import * as React from "react";
import { X } from "lucide-react";

import { cn } from "@/lib/utils";

type DialogContextValue = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialog() {
  const context = React.useContext(DialogContext);

  if (!context) {
    throw new Error("Dialog components must be used inside <Dialog />");
  }

  return context;
}

function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
}

function DialogContent({
  className,
  children,
}: React.HTMLAttributes<HTMLDivElement>) {
  const { open, onOpenChange } = useDialog();

  if (!open) {
    return null;
  }

  return (
    <div
      aria-modal="true"
      role="dialog"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/28 p-4 backdrop-blur-sm"
      onMouseDown={() => onOpenChange(false)}
    >
      <div
        className={cn(
          "relative w-full max-w-xl rounded-[24px] border border-[#E8EAF2] bg-white p-6 shadow-[0_26px_80px_rgba(31,41,55,0.18)] transition dark:border-white/10 dark:bg-[#111827]",
          className
        )}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close dialog"
          className="absolute right-5 top-5 grid h-9 w-9 place-items-center rounded-full border border-transparent text-[#6B7280] transition hover:border-[#E8EAF2] hover:bg-[#F8F9FC] dark:hover:border-white/10 dark:hover:bg-white/5"
          onClick={() => onOpenChange(false)}
        >
          <X size={18} />
        </button>
        {children}
      </div>
    </div>
  );
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("pr-10", className)} {...props} />;
}

function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-[24px] font-bold tracking-normal text-[#1F2937] dark:text-white", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      className={cn("mt-2 text-[15px] leading-6 text-[#6B7280] dark:text-slate-300", className)}
      {...props}
    />
  );
}

export { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle };
