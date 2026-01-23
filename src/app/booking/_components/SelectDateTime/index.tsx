"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useRef, useState, useEffect } from "react";
import { Sparkles, CalendarDays } from "lucide-react";

export const SelectDateTime = ({
  selectedDate,
  setSelectedDate,
}: {
  selectedDate: string;
  setSelectedDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [currentMonth, setCurrentMonth] = useState({ label: "", theme: "" });

  const monthThemes = [
    "from-amber-400 to-orange-500 shadow-orange-200/50",
    "from-rose-400 to-pink-500 shadow-pink-200/50",
    "from-violet-400 to-purple-500 shadow-purple-200/50",
    "from-emerald-400 to-teal-500 shadow-teal-200/50",
  ];

  const dateList = useMemo(() => {
    const days = [];
    const today = new Date();
    for (let i = 0; i < 90; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const dayOfWeek = d.getDay();
      const month = d.getMonth() + 1;
      days.push({
        dayLabel:
          i === 0 ? "H.Nay" : dayOfWeek === 0 ? "CN" : `T${dayOfWeek + 1}`,
        dateNum: d.getDate(),
        month: month,
        year: d.getFullYear(),
        monthYearLabel: `Tháng ${month}, ${d.getFullYear()}`,
        value: d.toISOString().split("T")[0],
        theme: monthThemes[month % monthThemes.length],
      });
    }
    return days;
  }, []);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const scrollLeft = scrollRef.current.scrollLeft;
    const index = Math.round(scrollLeft / 77);
    const current = dateList[index] || dateList[0];
    if (currentMonth.label !== current.monthYearLabel) {
      setCurrentMonth({ label: current.monthYearLabel, theme: current.theme });
    }
  };

  useEffect(() => {
    setCurrentMonth({
      label: dateList[0].monthYearLabel,
      theme: dateList[0].theme,
    });
  }, []);

  return (
   <div className="flex items-center w-full gap-3 py-4">
        <div className="shrink-0 z-40 pl-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentMonth.label}
              initial={{ opacity: 0, scale: 0.8, x: -10 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8, x: 10 }}
              className={`flex flex-col items-center justify-center w-24 h-24 rounded-3xl bg-linear-to-br ${currentMonth.theme} shadow-lg border border-white/20 relative overflow-hidden`}
            >
              <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-full -mr-4 -mt-4" />

              <CalendarDays size={24} className="text-white/70 mb-1" />
              <span className="text-[12px] font-bold text-white leading-none tracking-tight uppercase">
                {currentMonth.label.split(",")[0]}
              </span>
              <span className="text-[12px] font-bold text-white/80 mt-1 tracking-wider italic">
                {currentMonth.label.split(",")[1]}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex-1 relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-4 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

          <motion.div
            ref={scrollRef}
            onScroll={handleScroll}
             className="flex gap-3 overflow-x-auto py-4 no-scrollbar snap-x scroll-smooth pr-10 pl-2"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.02 } },
            }}
          >
            {dateList.map((item) => {
              const isSelected = selectedDate === item.value;
              return (
                <motion.div
                  key={item.value}
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { opacity: 1, scale: 1 },
                  }}
                  whileTap={{ scale: 0.92 }}
                  onClick={() => setSelectedDate(item.value)}
                  className={`relative min-w-17 h-24 rounded-[30px] flex flex-col items-center justify-center cursor-pointer snap-center transition-all duration-500 
                  ${isSelected ? `bg-linear-to-br ${item.theme} shadow-xl scale-105 z-10` : "bg-white/80 border border-zinc-50 hover:border-amber-100 shadow-sm"}`}
                >
                  <span
                    className={`text-[14px] uppercase font-bold tracking-tighter mb-1 ${isSelected ? "text-white/80" : "text-zinc-400"}`}
                  >
                    {item.dayLabel}
                  </span>
                  <span
                    className={`text-2xl font-serif italic ${isSelected ? "text-white font-bold" : "text-zinc-700 font-bold"}`}
                  >
                    {item.dateNum}
                  </span>
                  {isSelected && (
                    <motion.div
                      layoutId="spark-dot"
                      className="absolute -top-1 -right-1 text-white bg-amber-400 rounded-full p-1 shadow-md"
                    >
                      <Sparkles size={16} fill="white" />
                    </motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </div>
    </div>
  );
};
