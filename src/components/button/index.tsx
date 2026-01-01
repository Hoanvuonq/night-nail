"use client";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface ButtonProps {
  label?: string;
  className?: string;
  icon?: React.ReactNode; 
  onClick?: () => void;
}

export const Button = ({ label = "Đặt Lịch Ngay", className, icon, onClick }: ButtonProps) => {
  return (
    <motion.button
      initial="initial"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        "relative cursor-pointer px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300",
        "border border-amber-500/50 bg-white/5 backdrop-blur-sm",
        "hover:border-amber-300 shadow-sm hover:shadow-amber-500/20",
        className
      )}
    >
      <motion.div
        variants={{
          initial: { y: "100%" },
          hover: { y: "0%" },
        }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 z-0 bg-gradient-to-t from-amber-500 via-amber-400 to-amber-300"
      />

      <motion.div
        variants={{
          hover: { opacity: [0, 1, 0], x: ["0%", "100%"] }
        }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute inset-0 z-10 bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 opacity-0"
      />

      <div className="relative z-20 flex items-center justify-center gap-2">
        <div className="relative h-5 overflow-hidden font-bold text-sm tracking-[0.15em] uppercase">
          <motion.div
            variants={{
              initial: { y: 0 },
              hover: { y: -20 },
            }}
            transition={{ duration: 0.4, ease: [0.6, 0.01, -0.05, 0.95] }}
          >
            <span className="flex items-center h-5 text-amber-600">
              {label}
            </span>
            <span className="flex items-center h-5 text-white drop-shadow-md">
              {label}

            </span>
          </motion.div>
        </div>

        <motion.div
          variants={{
            initial: { scale: 1, color: "#d97706" },
            hover: { scale: 1.2, color: "#fff", rotate: 15 }
          }}
        >
          <Sparkles size={16} fill="currentColor" />
        </motion.div>
      </div>
    </motion.button>
  );
};