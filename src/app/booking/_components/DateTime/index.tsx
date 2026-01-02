"use client";
import { motion, AnimatePresence, AnimationGeneratorType } from "framer-motion";
import { useMemo } from "react";

export const DateComponent = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const dateList = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();
      const dateNum = d.getDate();

      let dayLabel = dayOfWeek === 0 ? "CN" : `T${dayOfWeek + 1}`;
      if (i === 0) dayLabel = "H.Nay";

      days.push({
        fullDate: d,
        dayLabel: dayLabel,
        dateNum: dateNum,
        value: d.toISOString().split("T")[0],
      });
    }
    return days;
  }, []);

  // Cấu hình spring animation xịn
  const springTransition = {
    type: "spring" as AnimationGeneratorType,
    stiffness: 400,
    damping: 30
  };

  return (
    <div className="relative group overflow-hidden py-4 bg-white/40 backdrop-blur-sm rounded-[40px] border border-white/20">
      {/* Hiệu ứng Gradient phủ biên mượt hơn */}
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-[#FBFAF8] via-[#FBFAF8]/50 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-[#FBFAF8] via-[#FBFAF8]/50 to-transparent z-10 pointer-events-none" />

      <motion.div 
        className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x px-8"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 } // Hiệu ứng hiện lần lượt từng ngày
          }
        }}
      >
        {dateList.map((item, index) => {
          const isSelected = selectedDate === item.value;
          
          return (
            <motion.div
              key={item.value}
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.92 }}
              onClick={() => setSelectedDate(item.value)}
              className={`
                relative min-w-[65px] h-[95px] rounded-[32px] flex flex-col items-center justify-center cursor-pointer snap-center transition-colors duration-300
                ${
                  isSelected
                    ? "bg-linear-to-b from-amber-400 to-orange-400 shadow-[0_15px_30px_-5px_rgba(251,191,36,0.4)]"
                    : "bg-white/80 border border-zinc-100 hover:border-amber-200"
                }
              `}
            >
              {/* Nhãn Thứ */}
              <span
                className={`text-[9px] uppercase tracking-widest mb-1 font-black z-10 ${
                  isSelected ? "text-white/90" : "text-zinc-400"
                }`}
              >
                {item.dayLabel}
              </span>

              {/* Số ngày */}
              <span
                className={`text-xl font-serif italic z-10 ${
                  isSelected
                    ? "text-white font-black"
                    : "text-zinc-700 font-bold"
                }`}
              >
                {item.dateNum}
              </span>

              {/* Ngôi sao nhỏ trang trí lấp lánh khi được chọn */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    layoutId="star-decor"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    className="mt-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] z-10"
                  />
                )}
              </AnimatePresence>

              {/* Thanh Indicator xịn dưới chân - Bay mượt từ vị trí này sang vị trí khác */}
              {isSelected && (
                <motion.div
                  layoutId="bubble-active"
                  className="absolute bottom-2 w-5 h-1.5 bg-white/30 backdrop-blur-md rounded-full border border-white/20"
                  transition={springTransition}
                />
              )}

              {/* Hiệu ứng phát sáng ngầm cho thẻ được chọn */}
              {isSelected && (
                <motion.div
                  layoutId="glow-bg"
                  className="absolute inset-0 rounded-[32px] bg-white/10"
                  initial={false}
                  transition={springTransition}
                />
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};