"use client";
import { motion, AnimatePresence, AnimationGeneratorType } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";

export const DateComponent = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentMonthLabel, setCurrentMonthLabel] = useState("");

  const dateList = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 90; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      
      const dayOfWeek = d.getDay();
      const dateNum = d.getDate();
      const month = d.getMonth() + 1;
      const year = d.getFullYear();

      let dayLabel = dayOfWeek === 0 ? "CN" : `T${dayOfWeek + 1}`;
      if (i === 0) dayLabel = "H.Nay";

      days.push({
        fullDate: d,
        dayLabel: dayLabel,
        dateNum: dateNum,
        month: month,
        year: year,
        monthYearLabel: `Tháng ${month}, ${year}`,
        value: d.toISOString().split("T")[0],
      });
    }
    return days;
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const itemWidth = 77; // min-w[65px] + gap[12px]
    const index = Math.round(scrollLeft / itemWidth);
    if (dateList[index]) {
      setCurrentMonthLabel(dateList[index].monthYearLabel);
    }
  };

  useEffect(() => {
    setCurrentMonthLabel(dateList[0].monthYearLabel);
  }, [dateList]);

  const springTransition = {
    type: "spring" as AnimationGeneratorType,
    stiffness: 400,
    damping: 30
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Hiển thị Tháng hiện tại - Rất quan trọng khi đặt lịch dài ngày */}
      <div className="px-8 flex justify-between items-center">
        <motion.span 
          key={currentMonthLabel}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm font-bold text-zinc-800 bg-amber-100/50 px-4 py-1.5 rounded-full border border-amber-200/50"
        >
          {currentMonthLabel}
        </motion.span>
        <span className="text-[10px] text-zinc-400 font-medium italic">Vuốt để xem thêm ➔</span>
      </div>

      <div className="relative group overflow-hidden py-4 bg-white/40 backdrop-blur-sm rounded-[40px] border border-white/20">
        <div className="absolute left-0 top-0 bottom-0 w-12 bg-linear-to-r from-[#FBFAF8] via-[#FBFAF8]/50 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 bg-linear-to-l from-[#FBFAF8] via-[#FBFAF8]/50 to-transparent z-10 pointer-events-none" />

        <motion.div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-3 overflow-x-auto pb-4 no-scrollbar snap-x px-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.02 } } 
          }}
        >
          {dateList.map((item) => {
            const isSelected = selectedDate === item.value;
            // Highlight những ngày thuộc tháng khác để dễ nhận diện
            const isNewMonth = item.dateNum === 1;

            return (
              <div key={item.value} className="flex flex-col items-center gap-2">
                <motion.div
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { opacity: 1, y: 0 }
                  }}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedDate(item.value)}
                  className={`
                    relative min-w-[65px] h-[95px] rounded-[32px] flex flex-col items-center justify-center cursor-pointer snap-center transition-all duration-300
                    ${
                      isSelected
                        ? "bg-linear-to-b from-amber-400 to-orange-400 shadow-[0_15px_30px_-5px_rgba(251,191,36,0.4)]"
                        : "bg-white/80 border border-zinc-100 hover:border-amber-200"
                    }
                  `}
                >
                  <span className={`text-[9px] uppercase tracking-widest mb-1 font-black z-10 ${
                    isSelected ? "text-white/90" : "text-zinc-400"
                  }`}>
                    {item.dayLabel}
                  </span>

                  <span className={`text-xl font-serif italic z-10 ${
                    isSelected ? "text-white font-black" : "text-zinc-700 font-bold"
                  }`}>
                    {item.dateNum}
                  </span>

                  {isSelected && (
                    <motion.div
                      layoutId="star-decor"
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_10px_white] z-10"
                    />
                  )}

                  {isSelected && (
                    <motion.div
                      layoutId="bubble-active"
                      className="absolute bottom-2 w-5 h-1.5 bg-white/30 backdrop-blur-md rounded-full border border-white/20"
                      transition={springTransition}
                    />
                  )}
                </motion.div>
                
                {/* Dấu mốc nhỏ nếu là ngày đầu tháng */}
                {isNewMonth && !isSelected && (
                   <span className="text-[8px] font-bold text-amber-500 uppercase">T{item.month}</span>
                )}
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};