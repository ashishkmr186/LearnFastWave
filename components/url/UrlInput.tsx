"use client";

import * as React from "react";
import { Link2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UrlInputProps {
  value: string;
  onChange: (value: string) => void;
  onEnterPress: () => void;
  error?: string;
}

export function UrlInput({ value, onChange, onEnterPress, error }: UrlInputProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Rotating placeholder state
  const placeholders = [
    "https://youtube.com/watch?v=...",
    "https://docs.python.org/",
    "https://example.com/notes.pdf",
    "https://developer.mozilla.org/...",
    "https://arxiv.org/pdf/...",
  ];
  const [placeholderIndex, setPlaceholderIndex] = React.useState(0);
  const [fade, setFade] = React.useState(true);

  React.useEffect(() => {
    // Autofocus on mount / when dialog opens
    const focusTimer = setTimeout(() => {
      inputRef.current?.focus();
    }, 100);

    // Rotating interval
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setPlaceholderIndex((prev) => (prev + 1) % placeholders.length);
        setFade(true);
      }, 300); // match transition duration
    }, 3000);

    return () => {
      clearTimeout(focusTimer);
      clearInterval(interval);
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onEnterPress();
    }
  };

  const showPlaceholder = !value && !isFocused;

  return (
    <div className="space-y-5">
      <div className="relative">
        {/* URL Icon inside the input */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9AA1AF]">
          <Link2 size={20} />
        </div>

        {/* Text Input */}
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          className={cn(
            "h-14 w-full rounded-[16px] border border-[#CFD4E3] bg-[#F8F9FC] pl-12 pr-12 text-[15px] font-medium text-[#1F2937] outline-none transition duration-200 ease-out focus:border-[#6C63FF] focus:bg-white focus:shadow-[0_0_0_4px_rgba(108,99,255,0.12)] dark:border-white/15 dark:bg-white/5 dark:text-white dark:focus:bg-slate-950/40",
            error && "border-red-500 bg-red-50/20 focus:border-red-500 focus:shadow-[0_0_0_4px_rgba(239,68,68,0.12)] dark:border-red-500/50"
          )}
        />

        {/* Rotating custom placeholder */}
        {showPlaceholder && (
          <div
            className={cn(
              "pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-[15px] font-medium text-[#9AA1AF] transition-opacity duration-300 ease-in-out select-none",
              fade ? "opacity-100" : "opacity-0"
            )}
          >
            {placeholders[placeholderIndex]}
          </div>
        )}

        {/* Clear Button */}
        {value && (
          <button
            type="button"
            onClick={() => {
              onChange("");
              inputRef.current?.focus();
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 grid h-7 w-7 place-items-center rounded-full text-[#9AA1AF] hover:bg-[#EEF0F6] hover:text-[#1F2937] transition dark:hover:bg-white/10 dark:hover:text-white"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Inline validation error message */}
      {error && (
        <div className="rounded-[14px] bg-[#FFF0F3] px-4 py-2.5 text-[13px] font-semibold text-[#FF6B81] dark:bg-[#FF6B81]/10 animate-in fade-in slide-in-from-top-1 duration-200">
          {error}
        </div>
      )}

      {/* List of supported resource bullets */}
      <div className="rounded-[20px] border border-[#E8EAF2] bg-[#FBFCFF] p-4 dark:border-white/10 dark:bg-slate-900/50">
        <p className="text-[13px] font-bold text-[#9AA1AF] uppercase tracking-wider mb-3">
          Supported resources
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[14px] font-semibold text-[#6B7280] dark:text-slate-400">
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C63FF]" />
            YouTube videos
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C63FF]" />
            Online PDFs
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C63FF]" />
            Documentation
          </div>
          <div className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C63FF]" />
            Blog articles
          </div>
          <div className="flex items-center gap-2.5 sm:col-span-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6C63FF]" />
            Study websites & tutorials
          </div>
        </div>
      </div>
    </div>
  );
}
