"use client";
import { motion, Variants } from "framer-motion";
import { PawPrint } from "lucide-react";
import { cn } from "@/utils/cn";

const floatingBubble: Variants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

interface PinkPawIconProps {
  className?: string;
  iconClassName?: string;
  size?: number;
}

export const PinkPawIcon = ({ className, iconClassName, size = 36 }: PinkPawIconProps) => {
  return (
    <motion.span
      variants={floatingBubble}
      animate="animate"
      className={cn("absolute -top-2 -right-10 md:-top-6 md:-right-16 text-[#f5d3e0]", className)}
    >
      <PawPrint 
        size={size} 
        className={cn("md:w-14 md:h-14", iconClassName)} 
        fill="currentColor" 
        strokeWidth={1} 
      />
    </motion.span>
  );
};
