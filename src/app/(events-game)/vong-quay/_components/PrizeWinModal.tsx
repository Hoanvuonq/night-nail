"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrizeItem } from "./LuckyWheelCanvas";
import { Sparkles, Gift, Heart, X, CheckCircle2 } from "lucide-react";

interface Props {
  isOpen: boolean;
  prize: PrizeItem | null;
  onClose: () => void;
}

export const PrizeWinModal: React.FC<Props> = ({ isOpen, prize, onClose }) => {
  if (!prize) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-10000 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#581c2b]/25 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            className="relative z-10 w-full max-w-md bg-linear-to-b from-[#FFFDFE] to-[#FFF5F8] rounded-[36px] p-6 sm:p-8 shadow-2xl border-4 border-white text-center overflow-hidden"
            style={{
              boxShadow: "0 20px 45px rgba(254, 188, 200, 0.55)",
              fontFamily: "'Quicksand', 'Playpen Sans', sans-serif",
            }}
          >
            <div className="absolute inset-3 border-2 border-dashed border-[#FEDBE5] rounded-[28px] pointer-events-none" />

            <div className="absolute top-4 left-6 text-[#FFAEC4] animate-bounce">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="absolute bottom-5 right-6 text-[#FFAEC4] animate-pulse">
              <Heart className="w-5 h-5 fill-[#FFD1DC]" />
            </div>
            <div className="absolute top-8 right-12 select-none opacity-80">
              <img
                src="/images/icon-05.png"
                alt="Paw"
                className="w-5 h-5 object-contain"
              />
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 w-8.5 h-8.5 bg-white hover:bg-[#FFF0F4] rounded-full flex items-center justify-center text-[#D94876] hover:text-[#E85D88] shadow-xs hover:scale-105 transition border border-[#FEDBE5] cursor-pointer"
            >
              <X className="w-4.5 h-4.5" />
            </button>

            {/* Winner Badge / Icon */}
            <div className="relative mx-auto w-22 h-22 mb-3 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#FFD1DC]/50 rounded-full animate-ping" />
              <div className="relative w-18 h-18 bg-gradient-to-tr from-[#FFD1DC] via-[#FFAEC4] to-[#F2789B] rounded-full flex items-center justify-center shadow-md border-4 border-white text-white">
                <Gift className="w-8 h-8 animate-wiggle drop-shadow-xs" />
              </div>
            </div>

            {/* Sub-header */}
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-[#F472B6] uppercase mb-1">
              ✨ CHÚC MỪNG BẠN ✨
            </p>

            {/* Title */}
            <h3
              className="text-3xl sm:text-4xl font-bold text-[#E85D88] mb-2 leading-tight"
              style={{
                fontFamily:
                  "'Dancing Script', 'Great Vibes', cursive, sans-serif",
              }}
            >
              Bạn đã trúng thưởng!
            </h3>

            {/* Won Prize Box */}
            <div className="my-4 p-4.5 bg-white/95 rounded-2xl border-2 border-[#FEDBE5] shadow-xs flex flex-col items-center relative z-10">
              <span className="text-2xl sm:text-3xl font-black text-[#E85D88] tracking-tight">
                {prize.title}
              </span>
              <span className="text-sm font-semibold text-[#9D385A] mt-1">
                {prize.subtitle}
              </span>
              <div className="mt-3 px-3.5 py-1 bg-[#FFF7FA] rounded-full text-xs font-mono text-[#D94876] flex items-center gap-1.5 border border-[#FEDBE5]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#E85D88]" />
                <span>
                  MÃ ƯU ĐÃI:{" "}
                  <strong className="text-[#9D385A]">NIGHTNAILS2026</strong>
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B34366] mb-5 px-2 relative z-10 font-medium leading-relaxed">
              Vui lòng chụp màn hình hoặc đưa mã ưu đãi này cho nhân viên Night
              Nails khi làm dịch vụ để áp dụng ngay!
            </p>

            {/* CTA Button with White-Pink Paw */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="w-full py-3.5 bg-gradient-to-r from-[#FFB8CB] via-[#FFA6C1] to-[#F48CA6] text-white font-bold rounded-full shadow-md hover:shadow-[#FEBCC8]/70 transition flex items-center justify-center gap-2 text-sm sm:text-base tracking-wider border-2 border-white relative z-10 cursor-pointer"
            >
              <span>NHẬN QUÀ NGAY</span>
              <img
                src="/images/icon-05.png"
                alt="Paw"
                className="w-4.5 h-4.5 object-contain"
              />
            </motion.button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
