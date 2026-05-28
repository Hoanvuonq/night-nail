"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Clock, Plus } from "lucide-react";
import React, { useState } from "react";

const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:30", "16:00", "17:30"];

export const TimePickerCustom = ({ selectedTime, setSelectedTime }: any) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customVal, setCustomVal] = useState("");

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomVal(val);
    setSelectedTime(val);
  };

  return (
    <div className="space-y-4 w-full">
      <div className="flex items-center gap-2 text-[#ff7ba9] mb-2 px-1">
        <Clock size={16} className="animate-pulse" />
        <span className="text-[12px] playwrite-no-font italic tracking-wider">Nàng muốn ghé tiệm lúc mấy giờ?</span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 w-full">
        {TIME_SLOTS.map((time) => {
          const isSelected = selectedTime === time && !isCustom;
          return (
            <motion.button
              key={time}
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsCustom(false);
                setSelectedTime(time);
              }}
              className={`py-3.5 rounded-2xl text-[13px] font-bold tracking-widest transition-all duration-300 border w-full ${isSelected
                ? "bg-linear-to-r from-[#ff7ba9] to-[#ff4d79] text-white border-transparent shadow-[0_8px_20px_rgba(255,123,169,0.4)]"
                : "bg-white/5 text-white/40 border-white/10 hover:border-[#ff7ba9]/40 hover:text-[#ff7ba9] hover:bg-white/10"
                }`}
            >
              {time}
            </motion.button>
          );
        })}

        <AnimatePresence mode="wait">
          {!isCustom ? (
            <motion.button
              key="btn-custom"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsCustom(true)}
              className="py-3.5 rounded-2xl border-2 border-dashed border-[#ff7ba9]/30 text-[#ff7ba9]/60 flex items-center justify-center gap-1 hover:border-[#ff7ba9] hover:text-[#ff7ba9] hover:bg-[#ff7ba9]/10 transition-all w-full"
            >
              <Plus size={14} /> <span className="text-[10px] font-bold uppercase">Khác</span>
            </motion.button>
          ) : (
            <motion.div
              key="input-custom"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              className="col-span-3 sm:col-span-2 relative w-full"
            >
              <input
                autoFocus
                type="time"
                value={customVal}
                onChange={handleCustomChange}
                onBlur={() => { if (!customVal) setIsCustom(false); }}
                className="w-full py-3 px-4 rounded-2xl bg-[#ff7ba9]/10 border-2 border-[#ff7ba9] text-[#ff7ba9] font-bold text-sm focus:outline-none shadow-[0_0_15px_rgba(255,123,169,0.2)]"
              />
              <button
                onClick={() => setIsCustom(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-bold text-[#ff7ba9] uppercase hover:text-white transition-colors"
              >
                Đóng
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};