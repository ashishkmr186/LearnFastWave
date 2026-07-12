"use client";

import { Crown } from "lucide-react";
import { motion } from "framer-motion";

type UpgradeCardProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  onClick?: () => void;
};

export function UpgradeCard({
  title = "Go Premium",
  description = "Unlock AI unlimited and advanced features.",
  buttonText = "Upgrade Now",
  onClick,
}: UpgradeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="group relative h-[150px] w-[240px] overflow-hidden rounded-[20px] bg-[linear-gradient(135deg,#7C5CFF_0%,#6C63FF_45%,#5B4EF5_100%)] p-[18px]"
    >
      <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,.34)_0%,rgba(255,255,255,.12)_38%,rgba(255,255,255,0)_70%)]" />

      <div className="relative grid h-full grid-rows-[auto_1fr_auto] gap-3">
        <div className="flex items-center gap-2.5">
          <Crown size={18} className="text-[#FFE28A]" />
          <h3 className="text-[18px] font-bold leading-none text-white">
            {title}
          </h3>
        </div>

        <p className="flex items-center whitespace-pre-line text-[14px] font-medium leading-[1.5] text-white/85">
          {description}
        </p>

        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          onClick={onClick}
          className="h-[42px] w-full rounded-[14px] bg-white text-[15px] font-semibold text-[#6C63FF] transition-colors duration-200 ease-out hover:bg-[#F8F8FF]"
        >
          {buttonText}
        </motion.button>
      </div>
    </motion.div>
  );
}
