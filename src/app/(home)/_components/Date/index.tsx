"use client";
import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";

export const DateComponent = () => {
  const dateList = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();
      const dateNum = d.getDate();
      let dayLabel = `T${dayOfWeek + 1}`;
      if (dayOfWeek === 0) dayLabel = "CN";
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

  const [selectedDate, setSelectedDate] = useState(dateList[0].value);

  return (
    <div className="relative group">
      {/* Container cuộn ngang với hiệu ứng mờ ở hai đầu (Luxury Touch) */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0C0C0C] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0C0C0C] to-transparent z-10 pointer-events-none" />

      <div className="flex gap-3 overflow-x-auto pb-6 no-scrollbar snap-x px-2 font-['Outfit']">
        {dateList.map((item, index) => {
          const isSelected = selectedDate === item.value;
          return (
            <motion.div
              key={index}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedDate(item.value)}
              className={`
                relative min-w-[72px] h-[96px] rounded-[24px] flex flex-col items-center justify-center cursor-pointer snap-center transition-all duration-500 border-2
                ${
                  isSelected
                    ? "bg-gradient-to-b from-[#D4AF37] to-[#B38F24] border-[#D4AF37] shadow-[0_10px_25px_rgba(212,175,55,0.3)] scale-105"
                    : "bg-white/[0.03] border-white/5 hover:border-[#D4AF37]/30 group/item"
                }
              `}
            >
              <div className={`w-1 h-1 rounded-full mb-2 transition-all ${isSelected ? "bg-black/40" : "bg-[#D4AF37]/40 group-hover/item:bg-[#D4AF37]"}`} />
              <span className={`text-[10px] uppercase sour-gummy tracking-[0.2em] mb-1 ${isSelected ? "text-black font-black" : "text-white/40 font-bold"}`}>
                {item.dayLabel}
              </span>
              
              <span className={`text-3xl lemonada italic tracking-tighter ${isSelected ? "text-black font-black" : "text-white font-medium"}`}>
                {item.dateNum}
              </span>

              {isSelected && (
                <motion.div 
                  layoutId="glow"
                  className="absolute -bottom-1 w-8 h-1 bg-[#D4AF37] blur-sm rounded-full"
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};