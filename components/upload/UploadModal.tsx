"use client";

import * as React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileDropzone } from "./FileDropzone";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadStart: (file: File) => void;
}

export function UploadModal({ isOpen, onClose, onUploadStart }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [error, setError] = React.useState<string>("");

  // Reset states when modal is opened or closed
  React.useEffect(() => {
    if (!isOpen) {
      setSelectedFile(null);
      setError("");
    }
  }, [isOpen]);

  const handleUpload = () => {
    if (selectedFile) {
      onUploadStart(selectedFile);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[540px]">
        <DialogHeader>
          <DialogTitle className="text-center text-[22px] font-bold text-[#1F2937] dark:text-white">
            Upload Study Material
          </DialogTitle>
          <DialogDescription className="text-center text-[14px] text-[#6B7280] mt-1 dark:text-slate-300">
            Upload your notes and let LearnFastWave turn them into easy-to-learn concepts.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6">
          <FileDropzone
            selectedFile={selectedFile}
            error={error}
            onFileSelect={(file) => {
              setSelectedFile(file);
              setError("");
            }}
            onError={(msg) => setError(msg)}
            onRemove={() => setSelectedFile(null)}
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
            disabled={!selectedFile}
            onClick={handleUpload}
          >
            Upload & Analyze
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
