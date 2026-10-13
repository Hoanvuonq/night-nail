"use client";

import {
  LuckyWheelCanvas,
  PRIZES,
  PrizeItem,
} from "@/app/(events-game)/vong-quay/_components/LuckyWheelCanvas";
import {
  PrizeWinModal,
  soundEffects,
  PrizeSettingsModal,
} from "../_components";
import confetti from "canvas-confetti";
import { Sparkles } from "lucide-react";
import { useState } from "react";

export const LuckyWheelScreen = () => {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinDuration, setSpinDuration] = useState(2.2);
  const [currentPrizes, setCurrentPrizes] = useState<PrizeItem[]>(PRIZES);
  const [forcedPrizeIndex, setForcedPrizeIndex] = useState<number | null>(null);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [wonPrize, setWonPrize] = useState<PrizeItem | null>(null);
  const [showWinModal, setShowWinModal] = useState(false);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 130,
        spread: 85,
        origin: { y: 0.5 },
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

    const randomDuration = 3.0 + Math.random() * (5.0 - 3.0);
    setSpinDuration(randomDuration);

    let prizeIndex: number;
    if (
      forcedPrizeIndex !== null &&
      forcedPrizeIndex >= 0 &&
      forcedPrizeIndex < currentPrizes.length
    ) {
      prizeIndex = forcedPrizeIndex;
    } else {
      prizeIndex = Math.floor(Math.random() * currentPrizes.length);
    }
    const selectedPrize = currentPrizes[prizeIndex];

    const sliceAngle = 360 / currentPrizes.length;
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

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 relative overflow-hidden bg-linear-to-br from-[#FFF5F7] via-[#FFF0F4] to-[#FFEBF0]">
      <div className="absolute top-10 left-10 w-96 h-96 bg-[#FEBCC8]/45 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-105 h-105 bg-[#FFA6C9]/35 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-[#FFF0F4]/60 rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-7xl my-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 xl:gap-24 items-center justify-items-center relative z-10">
          <div className="lg:col-span-6 xl:col-span-6 flex flex-col items-center justify-center relative pt-2">
            <LuckyWheelCanvas
              rotationAngle={rotationAngle}
              isSpinning={isSpinning}
              spinDuration={spinDuration}
              prizes={currentPrizes}
              isMysteryMode={true}
              onSpinClick={handleSpin}
            />
          </div>

          <div
            className="lg:col-span-6 xl:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 sm:space-y-5 w-full max-w-xl mx-auto lg:mx-0 pl-0 lg:pl-4 xl:pl-6"
            style={{ fontFamily: "'Quicksand', 'Playpen Sans', sans-serif" }}
          >
            <div className="flex items-center gap-2 text-[#F472B6] text-xs sm:text-sm font-bold tracking-[0.2em] uppercase">
              <span>— NAIL ART STUDIO —</span>
            </div>

            <div className="relative inline-block">
              <h1
                className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-[#E85D88] whitespace-nowrap leading-tight py-1 px-1 tracking-normal"
                style={{
                  fontFamily:
                    "'Dancing Script', 'Great Vibes', cursive, sans-serif",
                  filter: "drop-shadow(0 2px 6px rgba(254, 188, 200, 0.4))",
                }}
              >
                Vòng Quay May Mắn
              </h1>
              <span className="absolute -top-1 -right-6 text-[#FFA6C9] text-xl sm:text-2xl animate-bounce">
                💕
              </span>
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-linear-to-r from-[#FFB8CB] via-[#FFA6C1] to-[#F48CA6] text-white rounded-full font-bold text-xs sm:text-sm shadow-sm tracking-wide whitespace-nowrap">
              <Sparkles className="w-4 h-4 fill-white" />
              <span>QUAY LÀ TRÚNG – 100% NHẬN QUÀ</span>
              <Sparkles className="w-4 h-4 fill-white" />
            </div>

            <p className="text-[#B34366] text-xs sm:text-sm sm:text-base leading-relaxed font-medium">
              10 Hộp quà bí mật đang chờ bạn khám phá chỉ với{" "}
              <strong className="text-[#E85D88] font-bold">
                1 lần quay duy nhất!
              </strong>
            </p>

            <div className="space-y-4 w-full bg-white/95 p-6 sm:p-7 rounded-[32px] border-2 border-[#FEDBE5] shadow-sm text-left backdrop-blur-sm">
              <div className="space-y-3 sm:space-y-3.5">
                <div className="flex items-center gap-3.5 sm:gap-4 text-xs sm:text-sm font-bold text-[#9D385A]">
                  <span className="w-6 h-6 flex items-center justify-center text-base sm:text-lg shrink-0">
                    🎁
                  </span>
                  <span className="leading-snug">
                    10 Hộp quà bí mật chứa đầy ưu đãi cực hời
                  </span>
                </div>
                <div className="flex items-center gap-3.5 sm:gap-4 text-xs sm:text-sm font-bold text-[#9D385A]">
                  <span className="w-6 h-6 flex items-center justify-center text-base sm:text-lg shrink-0">
                    ✨
                  </span>
                  <span className="leading-snug">
                    Voucher giảm giá dịch vụ nail:{" "}
                    <strong className="text-[#E85D88] font-black">
                      10%, 7%, 5%
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-3.5 sm:gap-4 text-xs sm:text-sm font-bold text-[#9D385A]">
                  <span className="w-6 h-6 flex items-center justify-center text-base sm:text-lg shrink-0">
                    💰
                  </span>
                  <span className="leading-snug">
                    Giảm trực tiếp hóa đơn:{" "}
                    <strong className="text-[#E85D88] font-black">
                      10K, 15K, 20K
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-3.5 sm:gap-4 text-xs sm:text-sm font-bold text-[#9D385A]">
                  <span className="w-6 h-6 flex items-center justify-center text-base sm:text-lg shrink-0">
                    💅
                  </span>
                  <span className="leading-snug">
                    Tặng charm cao cấp, charm đổ khuôn & sticker
                  </span>
                </div>
              </div>

              <div className="pt-3.5 border-t border-dashed border-[#FEDBE5] flex items-center justify-between text-[11px] sm:text-xs text-[#D94876] font-bold gap-3">
                <span className="flex items-center gap-1.5 text-[#E85D88]">
                  <span className="text-sm">🌸</span>
                  <span>Áp dụng cho tất cả dịch vụ tại Salon</span>
                </span>
                <span className="px-3 py-1 bg-[#FFF7FA] rounded-full border border-[#FEDBE5] text-[10px] sm:text-[11px] text-[#D94876] whitespace-nowrap shadow-2xs">
                  Giới hạn 1 lượt/ngày
                </span>
              </div>
            </div>

            <div className="w-full pt-1">
              <button
                onClick={handleSpin}
                disabled={isSpinning}
                className={`w-full py-4 rounded-full font-bold text-white text-base sm:text-lg tracking-wider uppercase shadow-lg flex items-center justify-center gap-2.5 transition-all duration-300 border-2 border-white ${
                  isSpinning
                    ? "bg-[#FED5DF] opacity-80 cursor-not-allowed"
                    : "bg-linear-to-r from-[#FFB8CB] via-[#FFA6C1] to-[#F48CA6] hover:shadow-[#FEBCC8]/60 hover:shadow-xl cursor-pointer hover:scale-[1.01]"
                }`}
                style={{
                  boxShadow:
                    "0 8px 20px -4px rgba(254, 188, 200, 0.7), inset 0 2px 4px rgba(255,255,255,0.8)",
                }}
              >
                <span>{isSpinning ? "ĐANG QUAY..." : "QUAY NGAY"}</span>
                <img
                  src="/images/icon-05.png"
                  alt="Paw"
                  className="w-5 h-5 object-contain"
                />
              </button>
            </div>

            <p className="text-[11px] sm:text-xs text-[#E27B9B] font-semibold pt-1 text-center w-full">
              🌸 Mỗi khách hàng chỉ được quay 1 lần/ngày 🌸
            </p>
          </div>
        </div>
      </div>

      <PrizeWinModal
        isOpen={showWinModal}
        prize={wonPrize}
        onClose={() => setShowWinModal(false)}
      />

      <PrizeSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        prizes={currentPrizes}
        onSavePrizes={(newPrizes) => setCurrentPrizes(newPrizes)}
        forcedPrizeIndex={forcedPrizeIndex}
        onSetForcedPrizeIndex={(idx) => setForcedPrizeIndex(idx)}
      />
    </div>
  );
};
