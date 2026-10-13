"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { X, Sparkles } from "lucide-react";
import { LuckyWheelCanvas, PRIZES, PrizeItem } from "./LuckyWheelCanvas";
import { PrizeWinModal } from "./PrizeWinModal";
import { soundEffects } from "./soundEffects";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const LuckyWheelModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const [mounted, setMounted] = useState(false);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDuration, setSpinDuration] = useState(2.2);
  const [wonPrize, setWonPrize] = useState<PrizeItem | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.6 },
        colors: ["#FEBCC8", "#F472B6", "#E11D48", "#FFF0F4", "#FFD700"],
      });
    } catch {
      // Fallback
    }
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    soundEffects.playSpinStartSound();

    // Random spin duration between min 3.0s and max 5.0s
    const randomDuration = 3.0 + Math.random() * (5.0 - 3.0);
    setSpinDuration(randomDuration);

    const prizeIndex = Math.floor(Math.random() * PRIZES.length);
    const selectedPrize = PRIZES[prizeIndex];

    const sliceAngle = 360 / PRIZES.length;
    const sliceCenterAngle = prizeIndex * sliceAngle;

    const extraTurns = 360 * 6;
    const targetAngle = rotationAngle + extraTurns + (360 - sliceCenterAngle);

    setRotationAngle(targetAngle);

    setTimeout(
      () => {
        setIsSpinning(false);
        setWonPrize(selectedPrize);
        setShowWinModal(true);
        triggerConfetti();
        soundEffects.playWinSound();
      },
      randomDuration * 1000 + 100,
    );
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/55 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Main Container Wrapper */}
          <div className="relative z-10 w-full max-w-5xl flex items-center justify-center my-auto">
            {/* Main Content Modal Box with exact speech bubble curves & #FEBCC8 accent */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative w-full bg-[#FFF8F9] rounded-[40px] p-5 sm:p-8 md:p-10 shadow-2xl border-4 border-white"
              style={{
                boxShadow:
                  "0 25px 50px -12px rgba(254, 188, 200, 0.4), 0 0 35px rgba(244, 114, 182, 0.25)",
              }}
            >
              <div className="absolute inset-3 border-2 border-dashed border-[#FEBCC8]/70 rounded-4xl pointer-events-none" />

              <button
                onClick={onClose}
                className="absolute top-4 right-4 sm:top-6 sm:right-6 z-30 w-10 h-10 bg-white hover:bg-[#FFF0F4] rounded-full flex items-center justify-center text-[#F472B6] hover:text-[#E11D48] shadow-md hover:scale-110 transition duration-200 border border-[#FEBCC8]/50"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute top-16 left-6 text-[#FEBCC8]/60 text-2xl select-none pointer-events-none transform -rotate-12">
                🐾
              </div>
              <div className="absolute bottom-16 left-10 text-[#FEBCC8]/70 text-3xl select-none pointer-events-none transform rotate-12">
                🐾
              </div>
              <div className="absolute top-8 right-20 text-[#FEBCC8]/50 text-xl select-none pointer-events-none">
                🐾
              </div>
              <div className="absolute bottom-12 right-8 text-[#FEBCC8]/60 text-2xl select-none pointer-events-none transform rotate-45">
                🐾
              </div>
              <div className="absolute top-1/2 right-6 text-[#FEBCC8]/40 text-lg select-none pointer-events-none">
                🐾
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center relative z-10">
                <div className="lg:col-span-6 flex flex-col items-center justify-center relative pt-2">
                  <LuckyWheelCanvas
                    rotationAngle={rotationAngle}
                    isSpinning={isSpinning}
                    spinDuration={spinDuration}
                    onSpinClick={handleSpin}
                  />
                </div>

                <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5 pr-0 lg:pr-4">
                  <div className="flex items-center gap-2 text-[#F472B6] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
                    <span>— NAIL ART STUDIO —</span>
                  </div>

                  <div className="relative">
                    <h2
                      className="text-4xl sm:text-5xl lg:text-6xl font-normal text-[#E11D48] leading-tight py-1"
                      style={{
                        fontFamily:
                          "'Dancing Script', 'Great Vibes', cursive, sans-serif",
                        filter:
                          "drop-shadow(0 2px 4px rgba(254, 188, 200, 0.4))",
                      }}
                    >
                      Vòng Quay May Mắn
                    </h2>
                    <span className="absolute -top-1 -right-6 text-[#F472B6] text-xl animate-bounce">
                      💕
                    </span>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-linear-to-r from-[#FEBCC8] via-[#F472B6] to-[#E11D48] text-white rounded-full font-extrabold text-xs sm:text-sm shadow-md tracking-wide">
                    <Sparkles className="w-4 h-4 fill-white" />
                    <span>QUAY LÀ TRÚNG – NHẬN NGAY ƯU ĐÃI</span>
                    <Sparkles className="w-4 h-4 fill-white" />
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-xs sm:text-sm leading-relaxed max-w-md">
                    Cơ hội nhận ngay các phần quà hấp dẫn khi quay vòng quay may
                    mắn chỉ với{" "}
                    <strong className="text-[#E11D48] font-bold">
                      1 lần nhấn!
                    </strong>
                  </p>

                  {/* Bullet Points with Paw Icons 🐾 */}
                  <div className="space-y-3 w-full max-w-md bg-white/95 p-4 sm:p-5 rounded-2xl border-2 border-[#FEBCC8] shadow-sm text-left">
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-800">
                      <span className="text-[#F472B6] text-base">🐾</span>
                      <span>
                        Giảm giá dịch vụ nail lên đến{" "}
                        <strong className="text-[#E11D48] text-sm sm:text-base font-black">
                          50%
                        </strong>
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-800">
                      <span className="text-[#F472B6] text-base">🐾</span>
                      <span>Tặng phụ kiện nail xinh phong cách Hàn Quốc</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-800">
                      <span className="text-[#F472B6] text-base">🐾</span>
                      <span>Sơn gel cao cấp miễn phí chọn màu tùy thích</span>
                    </div>
                    <div className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-gray-800">
                      <span className="text-[#F472B6] text-base">🐾</span>
                      <span>Và hàng trăm quà tặng voucher bí mật khác...</span>
                    </div>

                    <div className="mt-2 pt-2.5 border-t border-dashed border-[#FEBCC8] flex items-center justify-between text-[11px] sm:text-xs text-[#E11D48] font-bold">
                      <span className="flex items-center gap-1">
                        🔥 Áp dụng cho tất cả dịch vụ tại Salon
                      </span>
                      <span className="px-2.5 py-0.5 bg-[#FFF0F4] rounded-full border border-[#FEBCC8] text-[10px] sm:text-[11px]">
                        Giới hạn 1 lượt/ngày
                      </span>
                    </div>
                  </div>

                  <div className="w-full max-w-md pt-2">
                    <motion.button
                      whileHover={{ scale: isSpinning ? 1 : 1.03 }}
                      whileTap={{ scale: isSpinning ? 1 : 0.97 }}
                      onClick={handleSpin}
                      disabled={isSpinning}
                      className={`w-full py-4 rounded-full font-extrabold text-white text-lg tracking-wider uppercase shadow-xl flex items-center justify-center gap-2 transition-all duration-300 border-2 border-white ${
                        isSpinning
                          ? "bg-[#FEBCC8] opacity-80 cursor-not-allowed"
                          : "bg-linear-to-r from-[#FEBCC8] via-[#F472B6] to-[#E11D48] hover:shadow-[#FEBCC8]/70 hover:shadow-2xl cursor-pointer"
                      }`}
                      style={{
                        boxShadow:
                          "0 10px 25px -5px rgba(254, 188, 200, 0.8), inset 0 2px 4px rgba(255,255,255,0.8)",
                      }}
                    >
                      <span>{isSpinning ? "ĐANG QUAY..." : "QUAY NGAY"}</span>
                      <span className="text-xl">🐾</span>
                    </motion.button>
                  </div>

                  {/* Footer Note */}
                  <p className="text-[11px] sm:text-xs text-[#F472B6] font-semibold pt-1">
                    ♥ Mỗi khách hàng chỉ được quay 1 lần/ngày ♥
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Prize Win Celebration Popup Modal */}
          <PrizeWinModal
            isOpen={showWinModal}
            prize={wonPrize}
            onClose={() => setShowWinModal(false)}
          />
        </div>
      )}
    </AnimatePresence>,
    document.body,
  );
};
