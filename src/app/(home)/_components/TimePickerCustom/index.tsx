"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Plus } from "lucide-react";

// Giả sử TIME_SLOTS đến từ constants của bạn
const TIME_SLOTS = ["09:00", "10:00", "11:00", "13:00", "14:30", "16:00", "17:30"];

export const TimePickerCustom = ({ selectedTime, setSelectedTime }: any) => {
  const [isCustom, setIsCustom] = useState(false);
  const [customVal, setCustomVal] = useState("");

  const handleCustomChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setCustomVal(val);
    setSelectedTime(val); // Cập nhật thời gian tùy chỉnh vào state tổng
  };

  return (
    <div className="space-y-4">
      {/* Tiêu đề nhỏ xinh */}
      <div className="flex items-center gap-2 text-[#D4AF37] mb-2 px-1">
        <Clock size={16} className="animate-pulse" />
        <span className="text-[12px] sour-gummy italic tracking-wider">Nàng muốn ghé tiệm lúc mấy giờ?</span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {/* Render danh sách giờ có sẵn */}
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
              className={`py-3.5 rounded-2xl text-[11px] font-bold tracking-widest transition-all duration-300 border ${
                isSelected
                  ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-[0_8px_20px_rgba(212,175,55,0.3)]"
                  : "bg-white/5 text-white/30 border-white/5 hover:border-[#D4AF37]/30 hover:text-white"
              }`}
            >
              {time}
            </motion.button>
          );
        })}

        {/* Ô tùy chỉnh thông minh */}
        <AnimatePresence mode="wait">
          {!isCustom ? (
            <motion.button
              key="btn-custom"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setIsCustom(true)}
              className="py-3.5 rounded-2xl border-2 border-dashed border-[#D4AF37]/30 text-[#D4AF37]/50 flex items-center justify-center gap-1 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all"
            >
              <Plus size={14} /> <span className="text-[10px] font-bold uppercase">Khác</span>
            </motion.button>
          ) : (
            <motion.div
              key="input-custom"
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "100%", opacity: 1 }}
              className="col-span-2 relative"
            >
              <input
                autoFocus
                type="time"
                value={customVal}
                onChange={handleCustomChange}
                onBlur={() => { if(!customVal) setIsCustom(false); }}
                className="w-full py-3 px-4 rounded-2xl bg-[#D4AF37]/10 border-2 border-[#D4AF37] text-[#D4AF37] font-bold text-sm focus:outline-none shadow-[0_0_15px_rgba(212,175,55,0.2)]"
              />
              <button 
                onClick={() => setIsCustom(false)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] font-black text-[#D4AF37] uppercase"
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