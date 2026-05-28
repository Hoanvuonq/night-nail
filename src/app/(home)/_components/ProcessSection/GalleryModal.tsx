"use client";

import { GALLERY_DATA } from "@/contants/gallery";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X, Sparkles, Heart, Maximize2, Share2, Paintbrush, Ruler, Layout, Star, User } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface GalleryModalProps {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  onClose: () => void;
  customData?: any[];
  isImageOnly?: boolean;
}

export const GalleryModal = ({ currentIndex, setCurrentIndex, onClose, customData, isImageOnly }: GalleryModalProps) => {
  const data = customData || GALLERY_DATA;
  const currentItem = data[currentIndex] || data[0];
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    setMounted(true);
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrevious(e as any);
      if (e.key === "ArrowRight") handleNext(e as any);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentIndex]);

  useEffect(() => {
    const activeThumb = document.getElementById(`thumb-${currentIndex}`);
    if (activeThumb) {
      activeThumb.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }
  }, [currentIndex]);

  const handlePrevious = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(-1);
    setCurrentIndex(currentIndex === 0 ? data.length - 1 : currentIndex - 1);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setDirection(1);
    setCurrentIndex(currentIndex === data.length - 1 ? 0 : currentIndex + 1);
  };

  const handleDownload = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const response = await fetch(currentItem.img);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `night-nail-image-${currentIndex + 1}.jpg`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  if (!mounted) return null;

  const slideVariants = {
    enter: () => ({
      opacity: 0,
      x: 0,
      y: 120,
      scale: 0.75,
    }),
    center: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
    },
    exit: (direction: number) => ({
      opacity: 0,
      x: direction < 0 ? 150 : -150,
      y: 0,
      scale: 0.9,
    }),
  };

  return createPortal(
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 backdrop-blur-[2px] p-4 md:p-8"
      onClick={onClose}
    >
      {/* Main Modal Box */}
      <div
        className={`relative w-full max-w-[1250px] flex flex-col ${isImageOnly ? "h-[95vh] bg-transparent shadow-none" : "h-[95vh] md:h-[85vh] bg-transparent md:bg-white rounded-[40px] shadow-none md:shadow-2xl"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handlePrevious}
          className="absolute left-2 md:-left-7 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/60 backdrop-blur-md md:bg-white md:shadow-[0_10px_30px_rgba(255,123,169,0.3)] flex items-center justify-center text-[#ff7ba9] hover:scale-110 transition-all z-[100] cursor-pointer border md:border-[#fce9eb] border-transparent"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-2 md:-right-7 top-1/2 -translate-y-1/2 w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/60 backdrop-blur-md md:bg-white md:shadow-[0_10px_30px_rgba(255,123,169,0.3)] flex items-center justify-center text-[#ff7ba9] hover:scale-110 transition-all z-[100] cursor-pointer border md:border-[#fce9eb] border-transparent"
        >
          <ChevronRight size={32} />
        </button>
        {/* Top Header */}
        <div className={`w-full p-4 md:p-6 flex items-start z-20 shrink-0 absolute md:relative top-0 right-0 ${isImageOnly ? "justify-end" : "justify-end md:justify-between"}`}>
          {!isImageOnly && (
            <div className="hidden md:flex items-center gap-4 pl-4 md:pl-8">
              <div className="w-12 h-12 rounded-xl bg-[#fff0f3] flex items-center justify-center text-[#ff7ba9]">
                <Sparkles size={24} />
              </div>
              <div className="flex flex-col">
                <h3 className="text-[#ff7ba9] font-bold text-lg tracking-wide uppercase">
                  Hình ảnh sản phẩm
                </h3>
                <span className="text-zinc-500 text-sm font-medium">
                  {currentIndex + 1} / {data.length} • Chất lượng cao
                </span>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 md:gap-4 pr-0 md:pr-8">
            <button
              onClick={handleDownload}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/60 backdrop-blur-md md:bg-[#fff0f3] shadow-sm flex items-center justify-center text-[#ff7ba9] hover:bg-white/80 md:hover:bg-[#fce9eb] transition-colors cursor-pointer border border-transparent md:border-none"
            >
              <Download size={20} />
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/60 backdrop-blur-md md:bg-[#fff0f3] shadow-sm flex items-center justify-center text-[#ff7ba9] hover:bg-white/80 md:hover:bg-[#fce9eb] transition-colors cursor-pointer border border-transparent md:border-none"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center md:justify-between px-0 md:px-12 gap-8 min-h-0 relative w-full mt-4 md:mt-0">

          {/* Left Column */}
          <div className={`hidden lg:flex flex-col w-[240px] xl:w-[280px] shrink-0 h-full justify-center pb-6 ${isImageOnly ? "!hidden" : ""}`}>
            <h2 className="text-2xl xl:text-3xl font-bold text-zinc-800 leading-tight">
              {currentItem.title}
            </h2>
            <h3 className="text-3xl xl:text-4xl text-[#ff7ba9] pinyon-script-regular mt-1">
              {currentItem.price === "Night Nail" ? "Mẫu thiết kế độc bản" : currentItem.price}
            </h3>

            <div className="w-16 h-1 bg-[#ff7ba9] rounded-full my-6 opacity-30" />

            <p className="text-zinc-600 text-sm leading-relaxed mb-6">
              {currentItem.description || `Mẫu nail ${currentItem.title.toLowerCase()} phối nhũ ngọc trai nhẹ nhàng, thanh lịch phù hợp nhiều phong cách.`}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {(currentItem?.features || ['Trắng sữa', 'Nhũ ngọc trai', 'Thanh lịch', 'Nhẹ nhàng']).map((tag: string, i: number) => (
                <span key={i} className="px-3 py-1.5 rounded-full border border-[#f4c7cc] text-[#ff7ba9] text-xs font-medium bg-white">
                  {tag}
                </span>
              ))}
            </div>

            <div className="bg-[#fff0f3] rounded-2xl p-5 border border-[#fce9eb] relative shadow-sm">
              <div className="flex items-center gap-2 mb-2 text-[#ff7ba9]">
                <Sparkles size={16} />
                <span className="text-xs font-bold uppercase tracking-wider">Mẹo chăm sóc</span>
              </div>
              <p className="text-zinc-600 text-xs leading-relaxed">
                {currentItem.careTip || "Dưỡng ẩm vùng da quanh móng thường xuyên để bộ nail luôn bền đẹp và chắc khỏe."}
              </p>
              <Heart size={16} className="absolute bottom-4 right-4 text-[#ff7ba9] opacity-50" />
            </div>
          </div>

          {/* Center Column (Image) */}
          <div className="flex-1 w-full h-full max-h-[80vh] md:max-h-[65vh] relative flex items-center justify-center min-w-0">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 max-w-2xl mx-auto w-full h-full rounded-[32px] overflow-hidden shadow-[0_20px_50px_-15px_rgba(0,0,0,0.1)] bg-zinc-50 border-4 border-white"
              >
                <Image
                  src={currentItem.img}
                  alt={currentItem.title}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium border border-white/20 z-10">
                  {currentIndex + 1} / {data.length}
                </div>
                <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md text-white flex items-center justify-center border border-white/20 hover:bg-black/60 transition-colors cursor-pointer z-10">
                  <Maximize2 size={18} />
                </button>
                <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-10">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-[#ff7ba9]' : 'bg-white/60'}`} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Column */}
          <div className={`hidden lg:flex flex-col w-[240px] xl:w-[280px] shrink-0 h-full justify-center pb-6 ${isImageOnly ? "!hidden" : ""}`}>
            <div className="bg-white rounded-2xl p-4 flex items-center gap-4 mb-8 shadow-sm border border-[#fce9eb]">
              <div className="w-10 h-10 rounded-full bg-[#fff0f3] flex items-center justify-center text-[#ff7ba9]">
                <Heart size={20} fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="text-[#ff7ba9] text-xs font-bold">Yêu thích</span>
                <span className="text-zinc-500 text-[11px]">{128 + currentIndex * 7} lượt yêu thích</span>
              </div>
            </div>

            <div className="space-y-5 mb-8 pl-2">
              {[
                { icon: Paintbrush, title: "Kiểu nail", desc: currentItem.nailStyle || "Ombre - Nhũ ngọc trai" },
                { icon: Ruler, title: "Độ dài", desc: currentItem.length || "Dài" },
                { icon: Layout, title: "Dáng móng", desc: currentItem.shape || "Oval" },
                { icon: Star, title: "Phong cách", desc: currentItem.tag || "Thanh lịch, nhẹ nhàng" },
                { icon: User, title: "Phù hợp", desc: currentItem.suitability || "Đi học, đi làm, dự tiệc" },
              ].map((feature, i) => (
                <div key={i} className="flex items-start gap-4">
                  <feature.icon size={18} strokeWidth={1.5} className="text-[#ff7ba9] shrink-0 mt-1" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-[#ff7ba9] font-semibold uppercase tracking-wider">{feature.title}</span>
                    <span className="text-sm text-zinc-700 font-medium">{feature.desc}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={handleDownload}
                className="w-60 mx-auto py-4 rounded-full bg-[#ff7ba9] text-white font-semibold flex items-center justify-center gap-2 shadow-[0_8px_20px_-8px_rgba(255,123,169,0.6)] hover:bg-[#ff629a] transition-colors cursor-pointer"
              >
                <Download size={18} />
                Tải ảnh
              </button>
              <button className="w-60 mx-auto py-4 rounded-full bg-white border border-[#ff7ba9] text-[#ff7ba9] font-semibold flex items-center justify-center gap-2 hover:bg-[#fff0f3] transition-colors cursor-pointer">
                <Share2 size={18} />
                Chia sẻ
              </button>
            </div>
          </div>

        </div>

        {/* Thumbnails Footer */}
        {!isImageOnly && (
          <div
            className="hidden md:flex w-[80%] my-3 mx-auto px-4 py-3 shrink-0 justify-center shadow-2xl rounded-full bg-white border-t border-[#fce9eb]"
          >
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar max-w-full px-4 py-2">
              {data.map((item, idx) => (
                <button
                  key={idx}
                  id={`thumb-${idx}`}
                  onClick={() => {
                    setDirection(idx > currentIndex ? 1 : -1);
                    setCurrentIndex(idx);
                  }}
                  className={`relative w-16 h-16 md:w-[72px] md:h-[72px] shrink-0 rounded-[14px] overflow-hidden border-[3px] transition-all duration-300 cursor-pointer ${currentIndex === idx
                    ? "border-[#ff7ba9] scale-110 shadow-[0_0_20px_rgba(255,123,169,0.3)] z-10"
                    : "border-transparent opacity-60 hover:opacity-100 hover:scale-100 shadow-sm"
                    }`}
                >
                  <Image
                    src={item.img}
                    alt={`Thumbnail ${idx + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>,
    document.body
  );
};
