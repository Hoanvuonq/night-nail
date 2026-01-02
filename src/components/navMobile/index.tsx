"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./type";
import { motion } from "framer-motion";

export const MobileNav = () => {
  const pathname = usePathname();

  // Định nghĩa mã màu Gold cố định để tránh lỗi render oklab
  const GOLD_PRIMARY = "#D4AF37"; // Gold truyền thống
  const GOLD_LIGHT = "#F3E5AB";   // Soft Gold
  const GOLD_DARK = "#B8860B";    // Deep Gold

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full h-18 bg-white/80 backdrop-blur-2xl border-t border-zinc-100 pb-safe md:hidden shadow-[0_-8px_30px_rgba(212,175,55,0.08)]">
      <div className="flex items-center justify-between px-6 h-full relative">
        {NAV_ITEMS.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          if (item.isFloating) {
            return (
              <div key={index} className="relative -top-5 flex justify-center items-center w-1/5">
                <Link href={item.href} className="group relative">
                  {/* Aura phát sáng nhẹ tông Gold */}
                  <div className={`absolute inset-[-12px] rounded-full bg-[${GOLD_PRIMARY}] blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                  
                  <motion.div 
                    whileTap={{ scale: 0.88 }}
                    className="relative w-15 h-15 rounded-full flex items-center justify-center shadow-lg border-[4px] border-white"
                    style={{
                      background: `linear-gradient(135deg, ${GOLD_PRIMARY}, ${GOLD_LIGHT})`,
                      boxShadow: `0 8px 20px rgba(184, 134, 11, 0.2)`
                    }}
                  >
                    <Icon className="text-white w-7 h-7" strokeWidth={2.5} />
                  </motion.div>
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className="relative flex flex-col items-center justify-center w-1/5 h-full group"
            >
              {/* Chỉ báo hoạt động: Dấu chấm tròn Gold lấp lánh */}
              {isActive && (
                <motion.div 
                  layoutId="nav-active-dot"
                  className="absolute top-2 w-1.5 h-1.5 rounded-full shadow-[0_0_8px_#D4AF37]"
                  style={{ backgroundColor: GOLD_PRIMARY }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}

              <div className={cn(
                "transition-all duration-300 flex flex-col items-center",
                isActive ? "translate-y-[-2px] scale-110" : "opacity-30"
              )}>
                <Icon
                  size={22}
                  strokeWidth={isActive ? 2.5 : 2}
                  style={{ color: isActive ? GOLD_PRIMARY : "#71717a" }}
                  className="mb-1"
                />
                <span 
                  className="text-[8px] font-black tracking-[0.15em] uppercase"
                  style={{ color: isActive ? GOLD_DARK : "#71717a" }}
                >
                  {item.label}
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};