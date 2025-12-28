"use client";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "./type";

export const MobileNav = () => {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 w-full h-16 bg-[#0F0F0F] border-t border-white/10 pb-safe md:hidden">
      <div className="flex items-end justify-between px-6 h-full relative">
        {NAV_ITEMS.map((item, index) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          if (item.isFloating) {
            return (
              <div
                key={index}
                className="relative -top-5 flex justify-center items-center w-1/5"
              >
                <Link href={item.href} className="group relative">
                  <div className="absolute inset-0 rounded-full bg-[#D4AF37] blur-md opacity-40 group-hover:opacity-60 transition-opacity duration-500" />

                  <div className="relative w-14 h-14 rounded-full bg-linear-to-r from-[#D4AF37] to-[#B8860B] flex items-center justify-center shadow-lg shadow-black/50 transition-transform duration-200 group-active:scale-95 border-4 border-[#0F0F0F]">
                    <Icon className="text-white w-7 h-7" strokeWidth={2.5} />
                  </div>
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={index}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center w-1/5 pb-2 transition-colors duration-200 group",
                isActive
                  ? "text-[#D4AF37]"
                  : "text-white/40 hover:text-white/70"
              )}
            >
              <Icon
                size={22}
                strokeWidth={isActive ? 2.5 : 2}
                className="mb-1 transition-transform duration-200 group-active:scale-90"
              />
              <span className="text-[10px] font-medium tracking-wide uppercase">
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
