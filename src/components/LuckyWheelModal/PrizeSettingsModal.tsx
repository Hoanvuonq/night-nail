"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, RotateCcw, Check, Gift, Percent, Heart, Sparkles } from "lucide-react";
import { PrizeItem, PRIZES } from "./LuckyWheelCanvas";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  prizes: PrizeItem[];
  onSavePrizes: (newPrizes: PrizeItem[]) => void;
  forcedPrizeIndex: number | null;
  onSetForcedPrizeIndex: (index: number | null) => void;
}

export const PrizeSettingsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  prizes,
  onSavePrizes,
  forcedPrizeIndex,
  onSetForcedPrizeIndex,
}) => {
  const [mounted, setMounted] = useState(false);
  const [editablePrizes, setEditablePrizes] = useState<PrizeItem[]>([]);
  const [selectedForcedIndex, setSelectedForcedIndex] = useState<number | null>(forcedPrizeIndex);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setEditablePrizes(JSON.parse(JSON.stringify(prizes)));
      setSelectedForcedIndex(forcedPrizeIndex);
      setSavedSuccess(false);
    }
  }, [isOpen, prizes, forcedPrizeIndex]);

  if (!mounted) return null;

  const handlePrizeChange = (
    index: number,
    field: keyof PrizeItem,
    value: string
  ) => {
    const updated = [...editablePrizes];
    updated[index] = {
      ...updated[index],
      [field]: value,
    };
    setEditablePrizes(updated);
  };

  const handleSave = () => {
    onSavePrizes(editablePrizes);
    onSetForcedPrizeIndex(selectedForcedIndex);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 800);
  };

  const handleResetDefault = () => {
    setEditablePrizes(JSON.parse(JSON.stringify(PRIZES)));
    setSelectedForcedIndex(null);
  };

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Soft Romantic Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[#581c2b]/35 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative z-10 w-full max-w-2xl bg-gradient-to-b from-[#FFFDFE] to-[#FFF5F8] rounded-3xl p-5 sm:p-8 shadow-2xl border-2 border-[#FEBCC8] max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-[#FEBCC8]/50">
              <div className="flex items-center gap-3 text-[#E11D48]">
                <div className="p-2.5 bg-[#FFF0F4] rounded-2xl border border-[#FEBCC8]">
                  <Settings className="w-6 h-6 text-[#E11D48] animate-spin-slow" />
                </div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold font-sans text-[#881337]">
                    Cấu Hình Vòng Quay May Mắn
                  </h2>
                  <p className="text-xs text-[#9F1239] font-medium">
                    Tùy chỉnh 10 ô phần thưởng & chế độ kết quả quay
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-9 h-9 bg-[#FFF0F4] hover:bg-[#FFE4EC] rounded-full flex items-center justify-center text-[#BE123C] hover:text-[#E11D48] border border-[#FEBCC8]/60 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto py-5 space-y-6 pr-1 custom-scrollbar">
              {/* Forced Winner Selector */}
              <div className="bg-gradient-to-r from-[#FFF0F4] to-[#FFF8F9] p-4 rounded-2xl border border-[#FEBCC8] space-y-2">
                <label className="text-xs sm:text-sm font-bold text-[#E11D48] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#F472B6]" />
                  <span>Chế độ quay & Kết quả trúng thưởng:</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setSelectedForcedIndex(null)}
                    className={`px-3 py-2 text-xs font-bold rounded-xl border transition cursor-pointer ${selectedForcedIndex === null
                        ? "bg-gradient-to-r from-[#FFA6C9] via-[#F472B6] to-[#E11D48] text-white border-transparent shadow-sm"
                        : "bg-white text-[#881337] border-[#FEBCC8]/80 hover:bg-[#FFF0F4]"
                      }`}
                  >
                    🎲 Ngẫu nhiên
                  </button>
                  {editablePrizes.map((p, idx) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setSelectedForcedIndex(idx)}
                      className={`px-2.5 py-2 text-xs font-bold rounded-xl border truncate transition cursor-pointer ${selectedForcedIndex === idx
                          ? "bg-gradient-to-r from-[#FFA6C9] via-[#F472B6] to-[#E11D48] text-white border-transparent shadow-sm"
                          : "bg-white text-[#881337] border-[#FEBCC8]/80 hover:bg-[#FFF0F4]"
                        }`}
                    >
                      🎯 Ô {idx + 1}: {p.title}
                    </button>
                  ))}
                </div>
              </div>

              {/* List of Slices */}
              <div className="space-y-4">
                <h3 className="text-xs sm:text-sm font-bold text-[#881337] uppercase tracking-wider">
                  Chỉnh sửa nội dung 10 phần quà:
                </h3>

                {editablePrizes.map((prize, idx) => (
                  <div
                    key={prize.id || idx}
                    className="p-4 bg-white/90 hover:bg-[#FFF8F9] rounded-2xl border border-[#FEBCC8]/70 hover:border-[#FEBCC8] transition space-y-3 shadow-xs"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-[#E11D48]">
                      <span className="px-2.5 py-1 bg-[#FFF0F4] rounded-lg border border-[#FEBCC8] text-[#BE123C]">
                        Vị trí Ô #{idx + 1}
                      </span>
                      {selectedForcedIndex === idx && (
                        <span className="text-[11px] bg-gradient-to-r from-[#FFA6C9] via-[#F472B6] to-[#E11D48] text-white px-2.5 py-0.5 rounded-full font-semibold">
                          ★ Được chỉ định trúng
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                      {/* Title */}
                      <div className="sm:col-span-5 space-y-1">
                        <label className="text-[11px] font-bold text-[#881337]">
                          Tên phần thưởng:
                        </label>
                        <input
                          type="text"
                          value={prize.title}
                          onChange={(e) =>
                            handlePrizeChange(idx, "title", e.target.value)
                          }
                          className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl border border-[#FEBCC8] focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] bg-white text-[#881337]"
                          placeholder="Ví dụ: Giảm 10%"
                        />
                      </div>

                      {/* Subtitle */}
                      <div className="sm:col-span-4 space-y-1">
                        <label className="text-[11px] font-bold text-[#881337]">
                          Mô tả ngắn:
                        </label>
                        <input
                          type="text"
                          value={prize.subtitle}
                          onChange={(e) =>
                            handlePrizeChange(idx, "subtitle", e.target.value)
                          }
                          className="w-full px-3 py-1.5 text-xs sm:text-sm font-semibold rounded-xl border border-[#FEBCC8] focus:border-[#E11D48] focus:ring-1 focus:ring-[#E11D48] bg-white text-[#881337]"
                          placeholder="Ví dụ: Dịch vụ nail"
                        />
                      </div>

                      {/* Icon Type */}
                      <div className="sm:col-span-3 space-y-1">
                        <label className="text-[11px] font-bold text-[#881337]">
                          Loại Icon:
                        </label>
                        <select
                          value={prize.iconType}
                          onChange={(e) =>
                            handlePrizeChange(
                              idx,
                              "iconType",
                              e.target.value as any
                            )
                          }
                          className="w-full px-2 py-1.5 text-xs font-semibold rounded-xl border border-[#FEBCC8] focus:border-[#E11D48] bg-white text-[#881337]"
                        >
                          <option value="percent">% Thẻ giảm giá</option>
                          <option value="gift">🎁 Hộp quà bí mật</option>
                          <option value="nail">💅 Chai Sơn Gel</option>
                          <option value="heart">💖 Trái tim phụ kiện</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer Buttons */}
            <div className="pt-4 border-t border-[#FEBCC8]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
              <button
                type="button"
                onClick={handleResetDefault}
                className="w-full sm:w-auto px-4 py-2.5 bg-[#FFF0F4] hover:bg-[#FFE4EC] text-[#BE123C] font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-1.5 border border-[#FEBCC8]/60 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-[#E11D48]" />
                <span>Đặt lại mặc định</span>
              </button>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-4 py-2.5 bg-[#FFF0F4] hover:bg-[#FFE4EC] text-[#BE123C] font-bold text-xs sm:text-sm rounded-xl transition border border-[#FEBCC8]/60 cursor-pointer"
                >
                  Hủy
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className={`w-full sm:w-auto px-6 py-2.5 font-bold text-xs sm:text-sm rounded-xl text-white shadow-md flex items-center justify-center gap-2 transition cursor-pointer ${savedSuccess
                      ? "bg-emerald-600 hover:bg-emerald-700"
                      : "bg-gradient-to-r from-[#FFA6C9] via-[#F472B6] to-[#E11D48] hover:opacity-95"
                    }`}
                >
                  {savedSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-white" />
                      <span>Đã lưu thành công!</span>
                    </>
                  ) : (
                    <span>Lưu Cấu Hình</span>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
};
