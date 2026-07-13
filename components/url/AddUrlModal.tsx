"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UrlInput } from "./UrlInput";

interface AddUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAnalyzeStart: (url: string) => void;
}

export function AddUrlModal({ isOpen, onClose, onAnalyzeStart }: AddUrlModalProps) {
  const [urlValue, setUrlValue] = React.useState("");
  const [error, setError] = React.useState("");

  // Reset modal state on open/close toggles
  React.useEffect(() => {
    if (!isOpen) {
      setUrlValue("");
      setError("");
    }
  }, [isOpen]);

  const validateUrlString = (val: string): boolean => {
    if (!val) return false;
    try {
      const url = new URL(val);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleInputChange = (val: string) => {
    setUrlValue(val);
    if (!val) {
      setError("");
    } else if (!validateUrlString(val)) {
      setError("Please enter a valid URL.");
    } else {
      setError("");
    }
  };

  const handleSubmit = () => {
    if (validateUrlString(urlValue)) {
      onAnalyzeStart(urlValue);
    } else {
      setError("Please enter a valid URL.");
    }
  };

  const isValid = urlValue.length > 0 && !error && validateUrlString(urlValue);

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[22px] font-bold text-[#1F2937] dark:text-white">
            Add Study Resource
          </DialogTitle>
          <DialogDescription className="text-center text-[14px] text-[#6B7280] mt-1 dark:text-slate-300">
            Paste a link to an online study resource and LearnFastWave will analyze it into easy-to-learn concepts.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <UrlInput
            value={urlValue}
            onChange={handleInputChange}
            onEnterPress={handleSubmit}
            error={error}
          />
        </div>

        <div className="mt-8 flex items-center justify-end gap-3 border-t border-[#E8EAF2] pt-5 dark:border-white/10">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-[14px] border-[#E8EAF2] px-6 text-[#6B7280] hover:bg-[#F8F9FC] dark:border-white/10 dark:text-slate-300 dark:hover:bg-white/5"
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            type="button"
            className="h-11 rounded-[14px] bg-[#6C63FF] px-6 text-white hover:bg-[#5B4EF5] disabled:opacity-50 disabled:pointer-events-none"
            disabled={!isValid}
            onClick={handleSubmit}
          >
            Analyze URL
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
