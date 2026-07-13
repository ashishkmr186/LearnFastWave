"use client";

import * as React from "react";
import {
  BookOpen,
  Brain,
  Coffee,
  Globe,
  History,
  MessageCircleQuestion,
  PanelsTopLeft,
  Repeat,
  Settings,
  Sparkles,
  Sprout,
  Star,
  Upload,
  type LucideIcon,
} from "lucide-react";
import { UpgradeCard } from "@/components/upgrade-card";
import type { ReactNode } from "react";
import { UploadModal } from "@/components/upload/UploadModal";
import { ProcessingScreen } from "@/components/upload/ProcessingScreen";
import { AddUrlModal } from "@/components/url/AddUrlModal";
import { UrlProcessingScreen } from "@/components/url/UrlProcessingScreen";

const recentNotes = [
  { label: "Note 1", icon: BookOpen, tone: "bg-[#F0EEFF] text-[#6C63FF]" },
  { label: "Note 2", icon: BookOpen, tone: "bg-[#EDF7FF] text-[#5798E8]" },
  { label: "Note 3", icon: BookOpen, tone: "bg-[#EDF9F1] text-[#56C271]" },
  { label: "Note 4", icon: BookOpen, tone: "bg-[#FFF6E3] text-[#F6B73C]" },
];

const toolbarItems = [
  {
    title: "Upload File",
    subtitle: "PDF, PPT, DOC",
    icon: Upload,
    tone: "bg-[#F0EEFF] text-[#6C63FF]",
  },
  {
    title: "Add URL",
    subtitle: "Website",
    icon: Globe,
    tone: "bg-[#EDF9F1] text-[#56C271]",
  },
  {
    title: "AI Feynman",
    subtitle: "Generate Notes",
    icon: Brain,
    tone: "bg-[#EDF7FF] text-[#5798E8]",
  },
  {
    title: "Remember & Repeat",
    subtitle: "Memory",
    icon: Repeat,
    tone: "bg-[#FFF1E6] text-[#E99038]",
  },
  {
    title: "Quiz",
    subtitle: "Test Yourself",
    icon: MessageCircleQuestion,
    tone: "bg-[#EAF9F7] text-[#3FB7AA]",
  },
  {
    title: "Flip Cards",
    subtitle: "Space Repetition",
    icon: PanelsTopLeft,
    tone: "bg-[#FFF0F5] text-[#FF6B9A]",
  },
  {
    title: "Rating",
    subtitle: "Improve AI",
    icon: Star,
    tone: "bg-[#FFF7DB] text-[#E9A818]",
  },
];

export default function Home() {
  const [isUploadModalOpen, setIsUploadModalOpen] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const [isUrlModalOpen, setIsUrlModalOpen] = React.useState(false);
  const [selectedUrl, setSelectedUrl] = React.useState<string>("");
  const [isUrlProcessing, setIsUrlProcessing] = React.useState(false);

  return (
    <main className="min-h-screen overflow-hidden bg-[#F8F9FC] font-[Inter,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,'Segoe_UI',sans-serif] text-[#1F2937]">
      <div className="flex min-h-screen gap-6 p-6">
        <aside className="flex w-[280px] shrink-0 flex-col rounded-[24px] border border-[#E8EAF2] bg-white p-5">
          <header className="mb-8 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-[16px] bg-gradient-to-br from-[#6C63FF] to-[#8B80F9] text-white">
              <BookOpen size={24} strokeWidth={2.3} />
            </div>
            <div>
              <h1 className="text-[20px] font-bold leading-tight tracking-normal">
                Learnfast
              </h1>
              <p className="text-[13px] font-medium text-[#6B7280]">
                AI Learning Coach
              </p>
            </div>
          </header>

          <nav className="space-y-7">
            <SidebarGroup label="RECENT NOTES">
              {recentNotes.map((item) => (
                <SidebarItem key={item.label} {...item} />
              ))}
            </SidebarGroup>

            <SidebarGroup label="Previous Notes" hideLabel>
              <SidebarItem
                label="Previous Notes"
                icon={History}
                tone="bg-[#F2F4F8] text-[#6B7280]"
              />
            </SidebarGroup>

          </nav>

          <div className="mt-auto pb-4">
            <UpgradeCard />
          </div>

          <footer className="rounded-[22px] border border-[#E8EAF2] bg-[#FBFCFF] p-4">
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-[#F0EEFF] to-[#EAF9F7] text-[15px] font-bold text-[#6C63FF]">
                A
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[15px] font-bold">Aman</p>
                <p className="truncate text-[13px] text-[#6B7280]">
                  aman@learnfast.ai
                </p>
              </div>
              <Settings size={18} className="text-[#6B7280]" />
            </div>
          </footer>
        </aside>

        <section className="relative flex min-w-0 flex-1 flex-col rounded-[24px] border border-[#E8EAF2] bg-white/48 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)]">
          <div className="absolute left-12 top-10 h-36 w-36 rounded-full bg-[#F0EEFF]/70 blur-3xl" />
          <div className="absolute right-20 top-28 h-44 w-44 rounded-full bg-[#EAF9F7]/80 blur-3xl" />

          {isProcessing && selectedFile ? (
            <ProcessingScreen
              fileName={selectedFile.name}
              onComplete={() => {
                setIsProcessing(false);
                setSelectedFile(null);
              }}
            />
          ) : isUrlProcessing && selectedUrl ? (
            <UrlProcessingScreen
              url={selectedUrl}
              onComplete={() => {
                setIsUrlProcessing(false);
                setSelectedUrl("");
              }}
            />
          ) : (
            <>
              <div className="relative flex flex-1 items-center justify-center px-12 pb-[150px] pt-12">
                <section className="mx-auto flex max-w-[760px] flex-col items-center text-center">
                  <SoftIllustration />

                  <h2 className="mt-9 text-[32px] font-bold leading-tight tracking-normal text-[#1F2937]">
                    Your learning journey starts here ✨
                  </h2>
                  <p className="mt-4 max-w-[680px] text-[15px] leading-7 text-[#6B7280]">
                    Upload a file or paste a URL to generate AI notes, explain
                    concepts using the Feynman technique, remember important topics,
                    and test yourself with quizzes and flashcards.
                  </p>
                </section>
              </div>

              <div className="absolute bottom-6 left-1/2 h-[140px] w-[calc(100%-64px)] max-w-[1180px] -translate-x-1/2 rounded-[28px] border border-[#E8EAF2] bg-white/82 px-5 py-4 backdrop-blur-xl">
                <div className="grid h-full grid-cols-7 gap-2">
                  {toolbarItems.map((item) => (
                    <ToolbarItem
                      key={item.title}
                      {...item}
                      onClick={
                        item.title === "Upload File"
                          ? () => setIsUploadModalOpen(true)
                          : item.title === "Add URL"
                          ? () => setIsUrlModalOpen(true)
                          : undefined
                      }
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </section>
      </div>

      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUploadStart={(file) => {
          setSelectedFile(file);
          setIsUploadModalOpen(false);
          setIsProcessing(true);
        }}
      />

      <AddUrlModal
        isOpen={isUrlModalOpen}
        onClose={() => setIsUrlModalOpen(false)}
        onAnalyzeStart={(url) => {
          setSelectedUrl(url);
          setIsUrlModalOpen(false);
          setIsUrlProcessing(true);
        }}
      />
    </main>
  );
}

function SidebarGroup({
  label,
  hideLabel = false,
  children,
}: {
  label: string;
  hideLabel?: boolean;
  children: ReactNode;
}) {
  return (
    <section>
      {!hideLabel && (
        <p className="mb-2 px-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#9AA1AF]">
          {label}
        </p>
      )}
      <div className="space-y-1">{children}</div>
    </section>
  );
}

function SidebarItem({
  label,
  icon: Icon,
  tone,
}: {
  label: string;
  icon: LucideIcon;
  tone: string;
}) {
  return (
    <button className="group flex w-full cursor-pointer items-center gap-3 rounded-[18px] border border-transparent px-3 py-2.5 text-left text-[15px] font-semibold text-[#1F2937] transition duration-200 ease-out hover:border-[#E8EAF2] hover:bg-[#F8F9FC]">
      <span
        className={`grid h-9 w-9 place-items-center rounded-full transition duration-200 ease-out ${tone}`}
      >
        <Icon size={18} />
      </span>
      {label}
    </button>
  );
}

function ToolbarItem({
  title,
  subtitle,
  icon: Icon,
  tone,
  onClick,
}: {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  tone: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group flex min-w-0 cursor-pointer flex-col items-center justify-center rounded-[22px] border border-transparent text-center transition duration-200 ease-out hover:-translate-y-1 hover:scale-[1.03] hover:border-[#E8EAF2] hover:bg-[#F8F9FC]"
    >
      <span
        className={`mb-2 grid h-12 w-12 place-items-center rounded-full transition duration-200 ease-out ${tone}`}
      >
        <Icon size={21} strokeWidth={2.2} />
      </span>
      <span className="max-w-full truncate text-[15px] font-semibold text-[#1F2937]">
        {title}
      </span>
      <span className="mt-0.5 max-w-full truncate text-[13px] font-medium text-[#6B7280]">
        {subtitle}
      </span>
    </button>
  );
}

function SoftIllustration() {
  return (
    <div className="relative h-[230px] w-[360px]">
      <div className="absolute left-1/2 top-[104px] h-24 w-64 -translate-x-1/2 rounded-full bg-[#E8EAF2]/65 blur-2xl" />

      <div className="absolute left-[96px] top-[72px] grid h-[122px] w-[168px] place-items-center rounded-[28px] border border-[#E8EAF2] bg-white shadow-[0_22px_55px_rgba(31,41,55,0.08)]">
        <BookOpen size={86} strokeWidth={1.35} className="text-[#8B80F9]" />
      </div>

      <div className="absolute left-[44px] top-[132px] grid h-16 w-16 place-items-center rounded-[22px] border border-[#E8EAF2] bg-[#FFF6E3] text-[#C99023] shadow-[0_18px_44px_rgba(31,41,55,0.08)]">
        <Coffee size={30} strokeWidth={1.8} />
      </div>

      <div className="absolute right-[42px] top-[136px] grid h-16 w-16 place-items-center rounded-[22px] border border-[#E8EAF2] bg-[#EDF9F1] text-[#56C271] shadow-[0_18px_44px_rgba(31,41,55,0.08)]">
        <Sprout size={31} strokeWidth={1.8} />
      </div>

      <div className="absolute left-[68px] top-[30px] grid h-10 w-10 place-items-center rounded-full bg-[#F0EEFF] text-[#6C63FF] shadow-[0_12px_30px_rgba(108,99,255,0.12)]">
        <Sparkles size={18} />
      </div>
      <div className="absolute right-[74px] top-[42px] grid h-8 w-8 place-items-center rounded-full bg-[#EDF7FF] text-[#5798E8] shadow-[0_12px_30px_rgba(87,152,232,0.12)]">
        <Sparkles size={15} />
      </div>
      <div className="absolute right-[126px] top-[8px] grid h-7 w-7 place-items-center rounded-full bg-[#FFF0F5] text-[#FF6B9A]">
        <Sparkles size={13} />
      </div>
    </div>
  );
}
