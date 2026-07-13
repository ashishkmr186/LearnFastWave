"use client";

import * as React from "react";
import { CheckCircle2, FileText, UploadCloud, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const allowedTypes = new Set([
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "text/plain",
  "text/markdown",
  "text/xml",
  "application/xml",
]);

const allowedExtensions = new Set(["pdf", "docx", "pptx", "txt", "md", "xml"]);

function formatFileSize(size: number) {
  if (size < 1024) {
    return `${size} B`;
  }

  if (size < 1024 * 1024) {
    return `${(size / 1024).toFixed(1)} KB`;
  }

  return `${(size / (1024 * 1024)).toFixed(1)} MB`;
}

function getExtension(fileName: string) {
  return fileName.split(".").pop()?.toLowerCase() ?? "";
}

function validateFile(file: File) {
  const extension = getExtension(file.name);
  const hasAllowedType = allowedTypes.has(file.type);
  const hasAllowedExtension = allowedExtensions.has(extension);

  if (!hasAllowedType && !hasAllowedExtension) {
    return "Unsupported file type. Please upload PDF, DOCX, PPTX, TXT, MD, or XML.";
  }

  return "";
}

export function FileDropzone({
  selectedFile,
  error,
  onFileSelect,
  onError,
  onRemove,
}: {
  selectedFile: File | null;
  error: string;
  onFileSelect: (file: File) => void;
  onError: (message: string) => void;
  onRemove: () => void;
}) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = React.useState(false);

  const handleFile = React.useCallback(
    (file?: File) => {
      if (!file) return;

      const message = validateFile(file);

      if (message) {
        onError(message);
        return;
      }

      onError("");
      onFileSelect(file);
    },
    [onError, onFileSelect]
  );

  return (
    <div className="space-y-4">
      <div
        className={cn(
          "relative flex min-h-[230px] flex-col items-center justify-center rounded-[24px] border border-dashed border-[#CFD4E3] bg-[#F8F9FC] px-6 py-8 text-center transition duration-200 ease-out dark:border-white/15 dark:bg-white/5",
          isDragging && "border-[#6C63FF] bg-[#F3F1FF] dark:bg-[#6C63FF]/10"
        )}
        onDragEnter={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={(event) => {
          event.preventDefault();
          setIsDragging(false);
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFile(event.dataTransfer.files[0]);
        }}
      >
        <input
          ref={inputRef}
          type="file"
          className="sr-only"
          accept=".pdf,.docx,.pptx,.txt,.md,.xml,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.openxmlformats-officedocument.presentationml.presentation,text/plain,text/markdown,text/xml,application/xml"
          onChange={(event) => handleFile(event.target.files?.[0])}
        />

        {selectedFile ? (
          <div className="w-full max-w-md rounded-[20px] border border-[#E8EAF2] bg-white p-4 text-left dark:border-white/10 dark:bg-white/8">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#EDF9F1] text-[#56C271]">
                <CheckCircle2 size={22} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[15px] font-semibold text-[#1F2937] dark:text-white">
                  {selectedFile.name}
                </p>
                <p className="mt-0.5 text-[13px] text-[#6B7280] dark:text-slate-300">
                  {formatFileSize(selectedFile.size)}
                </p>
              </div>
              <button
                type="button"
                aria-label="Remove selected file"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#6B7280] transition hover:bg-[#F8F9FC] dark:hover:bg-white/10"
                onClick={onRemove}
              >
                <X size={18} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="grid h-16 w-16 place-items-center rounded-full bg-[#F0EEFF] text-[#6C63FF]">
              <UploadCloud size={28} />
            </div>
            <p className="mt-5 text-[18px] font-semibold text-[#1F2937] dark:text-white">
              Drag and drop your study material
            </p>
            <p className="mt-2 max-w-sm text-[14px] leading-6 text-[#6B7280] dark:text-slate-300">
              Add one document now. Multi-file learning sets can be connected
              later with the upload backend.
            </p>
            <Button
              type="button"
              className="mt-6 h-11 rounded-[14px] bg-[#6C63FF] px-5 text-white hover:bg-[#5B4EF5]"
              onClick={() => inputRef.current?.click()}
            >
              <FileText size={17} />
              Choose File
            </Button>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 text-center">
        <p className="text-[13px] font-semibold text-[#6B7280] dark:text-slate-300">
          PDF • DOCX • PPTX • TXT • MD • XML
        </p>
        {error && (
          <p className="rounded-[14px] bg-[#FFF0F3] px-4 py-2 text-[13px] font-medium text-[#FF6B81] dark:bg-[#FF6B81]/10">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
