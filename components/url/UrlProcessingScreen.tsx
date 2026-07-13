"use client";

import * as React from "react";
import { Globe, CheckCircle2, ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { UploadProgress } from "@/components/upload/UploadProgress";

interface UrlProcessingScreenProps {
  url: string;
  onComplete: () => void;
}

export function UrlProcessingScreen({ url, onComplete }: UrlProcessingScreenProps) {
  const [progress, setProgress] = React.useState(0);
  const [isDone, setIsDone] = React.useState(false);

  // Extract display domain from url string
  const displayDomain = React.useMemo(() => {
    try {
      const parsed = new URL(url);
      return parsed.hostname.replace(/^www\./, "");
    } catch {
      return url;
    }
  }, [url]);

  const steps = [
    { label: "URL received" },
    { label: "Fetching content..." },
    { label: "Extracting information..." },
    { label: "Identifying concepts..." },
    { label: "Building your learning path..." },
  ];

  // Map progress percentage to current step index
  let currentStep = 1;
  if (progress >= 100) {
    currentStep = 5;
  } else if (progress >= 80) {
    currentStep = 4;
  } else if (progress >= 55) {
    currentStep = 3;
  } else if (progress >= 30) {
    currentStep = 2;
  } else {
    currentStep = 1;
  }

  React.useEffect(() => {
    const duration = 2500;
    const intervalTime = 40;
    const increment = 100 / (duration / intervalTime);

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsDone(true), 300);
          return 100;
        }
        return Math.min(100, prev + increment);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-1 flex-col items-center justify-center py-12 px-6">
      {!isDone ? (
        <div className="w-full max-w-md text-center space-y-8 animate-in fade-in duration-500">
          {/* Floating Globe Icon */}
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[28px] border border-[#E8EAF2] bg-white shadow-[0_20px_50px_rgba(108,99,255,0.08)] dark:border-white/10 dark:bg-slate-900">
            <div className="absolute inset-0 rounded-[28px] bg-gradient-to-br from-[#6C63FF]/5 to-[#8B80F9]/5 blur-lg" />
            <Globe size={48} strokeWidth={1.5} className="text-[#6C63FF]" />
            <div className="absolute -bottom-1 -right-1 flex h-6 w-6 animate-pulse items-center justify-center rounded-full bg-[#6C63FF] text-[10px] text-white">
              🌐
            </div>
          </div>

          {/* Title and Domain */}
          <div className="space-y-2">
            <h3 className="text-xl font-bold tracking-tight text-[#1F2937] dark:text-white truncate max-w-sm mx-auto">
              {displayDomain}
            </h3>
            <p className="text-[15px] font-medium text-[#6B7280] dark:text-slate-400">
              Analyzing your resource...
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 px-4">
            <Progress value={progress} className="h-2.5" />
            <div className="flex justify-between text-[13px] font-semibold text-[#9AA1AF]">
              <span>Extracting URL data</span>
              <span>{Math.round(progress)}%</span>
            </div>
          </div>

          {/* Dynamic 5-step checklist */}
          <div className="pt-4">
            <UploadProgress currentStep={currentStep} steps={steps} />
          </div>
        </div>
      ) : (
        /* Completion card */
        <div className="w-full max-w-md rounded-[28px] border border-[#EAF9F1] bg-white p-8 text-center shadow-[0_22px_60px_rgba(86,194,113,0.06)] dark:border-emerald-500/10 dark:bg-slate-900 animate-in zoom-in-95 fade-in duration-500">
          <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#EDF9F1] text-[#56C271] dark:bg-emerald-500/10 dark:text-emerald-400">
            <div className="absolute inset-0 rounded-full bg-[#56C271]/20 animate-ping opacity-75" />
            <CheckCircle2 size={44} strokeWidth={2} />
          </div>

          <h3 className="mt-6 text-[24px] font-bold text-[#1F2937] dark:text-white">
            Analysis Complete
          </h3>

          <div className="mt-3 inline-flex items-center rounded-full bg-[#EDF9F1] px-4 py-1.5 text-[14px] font-semibold text-[#56C271] dark:bg-emerald-500/10 dark:text-emerald-400">
            24 concepts discovered
          </div>

          <p className="mt-4 text-[15px] font-medium text-[#6B7280] dark:text-slate-400">
            Ready to start learning.
          </p>

          <div className="mt-8 pt-4 border-t border-[#E8EAF2] dark:border-white/10">
            <Button
              type="button"
              className="group h-12 w-full rounded-[16px] bg-[#6C63FF] px-6 text-white hover:bg-[#5B4EF5]"
              onClick={onComplete}
            >
              Start Learning
              <ArrowRight size={17} className="ml-2 transition-transform duration-200 group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
