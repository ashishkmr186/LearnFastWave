"use client";

import * as React from "react";
import { Check, Loader2, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadProgressProps {
  currentStep: number; // 0 to steps.length
  steps?: { label: string }[];
}

export function UploadProgress({ currentStep, steps: customSteps }: UploadProgressProps) {
  const defaultSteps = [
    { label: "Upload Complete" },
    { label: "Extracting text..." },
    { label: "Identifying concepts..." },
    { label: "Building your learning path..." },
  ];

  const steps = customSteps || defaultSteps;

  return (
    <div className="mx-auto max-w-md w-full px-4">
      <div className="relative flex flex-col gap-6">
        {/* Vertical line connecting the steps */}
        <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-[#E8EAF2] dark:bg-white/10" />

        {/* Animated active progress fill line */}
        <div 
          className="absolute left-[18px] top-4 w-0.5 bg-[#6C63FF] transition-all duration-500 ease-in-out"
          style={{
            height: `${Math.min(100, Math.max(0, (currentStep / (steps.length - 1)) * 82))}%`
          }}
        />

        {steps.map((step, index) => {
          const isCompleted = currentStep > index;
          const isActive = currentStep === index;
          const isPending = currentStep < index;

          return (
            <div
              key={index}
              className={cn(
                "flex items-center gap-4 transition-all duration-500 ease-in-out",
                isPending ? "opacity-40" : "opacity-100"
              )}
            >
              {/* Step indicator node */}
              <div
                className={cn(
                  "relative z-10 grid h-9 w-9 place-items-center rounded-full border-2 transition-all duration-500",
                  isCompleted && "bg-[#EDF9F1] border-[#56C271] text-[#56C271] scale-110",
                  isActive && "bg-white border-[#6C63FF] text-[#6C63FF] shadow-[0_0_12px_rgba(108,99,255,0.3)] scale-110 dark:bg-[#111827]",
                  isPending && "bg-white border-[#CFD4E3] text-[#9AA1AF] dark:bg-[#111827] dark:border-white/15"
                )}
              >
                {isCompleted ? (
                  <Check size={16} strokeWidth={3} className="animate-in zoom-in duration-300" />
                ) : isActive ? (
                  <Loader2 size={16} strokeWidth={2.5} className="animate-spin" />
                ) : (
                  <Circle size={8} fill="currentColor" className="text-[#CFD4E3] dark:text-white/20" />
                )}
              </div>

              {/* Step label */}
              <div className="flex-1 text-left">
                <p
                  className={cn(
                    "text-[15px] font-semibold transition-colors duration-300",
                    isCompleted && "text-[#56C271]",
                    isActive && "text-[#6C63FF] font-bold animate-pulse",
                    isPending && "text-[#6B7280] dark:text-slate-400"
                  )}
                >
                  {step.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
