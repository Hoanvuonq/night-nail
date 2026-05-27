"use client";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { ReactNode } from "react";

export interface TitleSectionProps {
  tagIcon?: ReactNode;
  tagText: ReactNode;
  titleNormal?: ReactNode;
  titleHighlight?: ReactNode;
  titleNormalAfter?: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
  titleNormalClassName?: string;
}

export const TitleSection = ({
  tagIcon,
  tagText,
  titleNormal,
  titleHighlight,
  titleNormalAfter,
  description,
  align = "center",
  className,
  titleNormalClassName,
}: TitleSectionProps) => {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 space-y-4 relative z-10",
        align === "center" ? "items-center text-center mx-auto" : "items-start text-left",
        className
      )}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#fce9eb] text-[#ff7ba9] text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] shadow-sm"
      >
        {tagIcon && <span className="shrink-0">{tagIcon}</span>}
        {tagText}
      </motion.div>

      <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-[#ff7ba9] leading-[1.1]">
        {titleNormal && <span className={titleNormalClassName}>{titleNormal} </span>}
        {titleHighlight && (
          <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e9b2b8] via-[#ff7ba9] to-[#ff4d79] sriracha-regular pr-4 italic block md:inline">
            {titleHighlight}
          </span>
        )}
        {titleNormalAfter && <span> {titleNormalAfter}</span>}
      </h2>

      <div
        className={cn(
          "h-1 rounded-full opacity-30 mt-2 mb-2",
          align === "center"
            ? "w-20 bg-linear-to-r from-transparent via-[#ff7ba9] to-transparent"
            : "w-20 bg-linear-to-r from-[#ff7ba9] to-transparent"
        )}
      />

      {description && (
        <p className="text-zinc-500 text-sm md:text-base max-w-lg italic font-medium leading-relaxed">
          "{description}"
        </p>
      )}
    </div>
  );
};
