"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Clock, Sparkles, MessageCircle, Ban } from "lucide-react";
import { SelectDateTime } from "../SelectDateTime";
import { Dispatch, SetStateAction, useEffect } from "react";
import Link from "next/link";

interface TimeStepProps {
  timeSlots: string[];
  selectedTime: string;
  onSelectTime: (time: string) => void;
  selectedDate: string;
  bookedSlots: string[];
  setSelectedDate: Dispatch<SetStateAction<string>>;
}

export const TimeStep = ({
  timeSlots,
  selectedTime,
  onSelectTime,
  selectedDate,
  bookedSlots,
  setSelectedDate,
}: TimeStepProps) => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const isSlotBooked = (time: string) => {
    return bookedSlots.includes(`${selectedDate} lúc ${time}`);
  };

  const isDateFull = timeSlots
    .filter((t) => t !== "23:00")
    .every((t) => isSlotBooked(t));

  const isLastSlot = selectedTime === "23:00";

  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-1 flex-col p-5 md:px-10 space-y-4"
    >
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2 text-amber-600">
          <Sparkles size={14} className="animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">Sẵn sàng phục vụ</span>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-xl md:text-2xl text-zinc-900 italic">Chọn thời gian hẹn</h3>
          <div className="p-2 bg-amber-50 rounded-full text-amber-500 shadow-sm">
            <Clock size={18} />
          </div>
        </div>
      </div>

      {/* Date Selection Area */}
      <div className="relative z-20">
        <SelectDateTime selectedDate={selectedDate} setSelectedDate={setSelectedDate} />
      </div>

      {/* Time Slots Area */}
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between px-1">
          <p className="text-[12px] font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${isDateFull ? 'bg-red-400' : 'bg-amber-400'}`}></span>
            {isDateFull ? (
              <span className="text-red-500 font-medium">Ngày này em đã kín lịch mất rồi 😭</span>
            ) : (
              "Khung giờ nàng chọn"
            )}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2.5 md:grid-cols-4">
          {timeSlots.map((time) => {
            const isActive = selectedTime === time;
            const isLate = time === "23:00";
            const isBooked = isSlotBooked(time);

            return (
              <motion.button
                key={time}
                disabled={isBooked}
                whileHover={!isBooked ? { scale: 1.02, y: -2 } : {}}
                whileTap={!isBooked ? { scale: 0.96 } : {}}
                onClick={() => !isBooked && onSelectTime(time)}
                className={`relative cursor-pointer overflow-hidden rounded-2xl border py-3.5 text-md font-bold transition-all duration-300 ${isBooked
                    ? "border-zinc-100 bg-zinc-50 text-zinc-300 cursor-not-allowed"
                    : isActive
                      ? "border-amber-400 bg-white text-amber-600 shadow-[0_8px_20px_-5px_rgba(251,191,36,0.3)]"
                      : "border-zinc-100 bg-white text-zinc-500 hover:border-amber-200"
                  }`}
              >
                <span className={`relative z-10 transition-opacity ${isBooked ? "opacity-20" : "opacity-100"}`}>
                  {time}
                </span>

                {isBooked && (
                  <div className="absolute inset-0 flex items-center justify-center bg-zinc-100/40 backdrop-blur-px">
                    <span className="text-[12px] font-bold text-amber-600 tracking-tighter uppercase leading-none border-b border-zinc-300">
                      Hết chỗ
                    </span>
                  </div>
                )}

                {isActive && !isBooked && (
                  <motion.div
                    layoutId="activeTime"
                    className="absolute inset-0 bg-linear-to-br from-amber-500/5 to-amber-500/10"
                  />
                )}

                {isLate && !isBooked && (
                  <div className="absolute top-1.5 right-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-ping absolute" />
                    <div className="w-1.5 h-1.5 rounded-full bg-orange-500 relative" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <div className="relative pt-2">
        <AnimatePresence mode="wait">
          {isLastSlot ? (
            <motion.div
              key="late-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl bg-orange-50/80 border border-orange-100 p-3.5 flex items-center gap-3"
            >
              <div className="p-2 bg-white rounded-xl text-orange-500 shadow-sm shrink-0">
                <MessageCircle size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold text-orange-900 uppercase leading-none mb-1">Ca cuối nè nàng</p>
                <p className="text-[10px] text-orange-700 leading-tight">Vui lòng inbox em trước để sắp xếp tốt nhất nhé!</p>
              </div>
              <Link
                href="https://m.me/yourpage"
                target="_blank"
                className="shrink-0 text-[10px] font-bold text-white bg-orange-500 px-3 py-2 rounded-xl shadow-md active:scale-90 transition-transform"
              >
                IB EM
              </Link>
            </motion.div>
          ) : isDateFull ? (
            <motion.div
              key="full-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="rounded-2xl bg-zinc-50 border border-zinc-200 p-3.5 flex items-center gap-3"
            >
              <div className="p-2 bg-white rounded-xl text-zinc-400 shadow-sm shrink-0">
                <Ban size={16} />
              </div>
              <p className="text-[10px] text-zinc-500 italic leading-tight">Ngày này đã kín chỗ. Nàng chọn ngày khác hoặc inbox em nhé! ✨</p>
            </motion.div>
          ) : (
            <div key="empty" className="h-4" />
          )}
        </AnimatePresence>
      </div>

      <div className="mt-auto pt-2 text-center">
        <p className="text-[14px] text-zinc-600 italic">
          Đúng giờ để có trải nghiệm tuyệt vời nhất nàng nhé
          <span className="animate-pulse text-2xl">✨</span>
        </p>
      </div>
    </motion.div>
  );
};