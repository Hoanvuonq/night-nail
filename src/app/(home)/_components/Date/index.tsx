"use client";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";

export const DateComponent = ({ selectedDate, setSelectedDate }: { selectedDate: string; setSelectedDate: React.Dispatch<React.SetStateAction<string>> }) => {
  const dateList = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();
      const dateNum = d.getDate();
      
      // Chỉnh nhãn ngày tiếng Việt chuẩn hơn
      let dayLabel = dayOfWeek === 0 ? "CN" : `T${dayOfWeek + 1}`;
      if (i === 0) dayLabel = "Hôm nay";
      
      days.push({
        fullDate: d,
        dayLabel: dayLabel,
        dateNum: dateNum,
        value: d.toISOString().split("T")[0],
      });
    }
    return days;
  }, []);

  return (
    <div className="relative group overflow-hidden py-2">
      {/* Cạnh mờ (Faded edges) - Điều chỉnh sang màu sáng của nền #FBFAF8 */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#FBFAF8] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#FBFAF8] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-4 overflow-x-auto pb-6 no-scrollbar snap-x px-6 py-2">
        {dateList.map((item, index) => {
          const isSelected = selectedDate === item.value;
          return (
            <motion.div
              key={index}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(item.value)}
              className={`
                relative min-w-[76px] h-[100px] rounded-[28px] flex flex-col items-center justify-center cursor-pointer snap-center transition-all duration-500 border-2
                ${
                  isSelected
                    ? "bg-gradient-to-b from-[#D4AF37] to-[#B38F24] border-[#D4AF37] shadow-[0_12px_24px_rgba(212,175,55,0.3)] scale-105 z-20"
                    : "bg-white border-zinc-100 hover:border-amber-200 hover:bg-amber-50/30 group/item z-0"
                }
              `}
            >
              {/* Chấm tròn nhỏ trang trí */}
              <div className={`w-1 h-1 rounded-full mb-2 transition-all ${
                isSelected 
                ? "bg-white/60" 
                : "bg-amber-500/30 group-hover/item:bg-amber-500"
              }`} />

              {/* Nhãn Thứ */}
              <span className={`text-[10px] uppercase tracking-[0.15em] mb-1 font-bold ${
                isSelected ? "text-white" : "text-zinc-400"
              }`}>
                {item.dayLabel}
              </span>
              
              {/* Số ngày */}
              <span className={`text-2xl font-serif italic ${
                isSelected ? "text-white font-black" : "text-zinc-800 font-bold"
              }`}>
                {item.dateNum}
              </span>

              {/* Indicator thanh mảnh bên dưới khi chọn */}
              {isSelected && (
                <motion.div 
                  layoutId="glow-light"
                  className="absolute -bottom-2 w-6 h-1 bg-amber-500 rounded-full shadow-[0_0_10px_#D4AF37]"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};