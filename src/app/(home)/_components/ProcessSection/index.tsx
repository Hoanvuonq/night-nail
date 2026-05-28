"use client";
import { PinkPawIcon, SectionPage, TitleSection } from "@/components";
import { GALLERY_DATA } from "@/contants/gallery";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, CalendarHeart, Heart, Sparkles, Zap } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GalleryItem } from "./GalleryItem";
import { GalleryModal } from "./GalleryModal";

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const getScrollAmount = () => {
    if (!containerRef.current || containerRef.current.children.length === 0) return 0;
    const firstChild = containerRef.current.children[0] as HTMLElement;
    const gap = window.innerWidth >= 768 ? 40 : 24;
    return firstChild.offsetWidth + gap;
  };

  const easeInOutCubic = (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

  const smoothScrollTo = (element: HTMLElement, change: number, duration: number) => {
    const start = element.scrollLeft;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      element.scrollLeft = start + change * ease;

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: "auto" });
        } else {
          // Kéo mượt mà chậm rãi hơn (1200ms)
          smoothScrollTo(containerRef.current, getScrollAmount(), 1200);
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = getScrollAmount();
      smoothScrollTo(
        containerRef.current,
        direction === "left" ? -scrollAmount : scrollAmount,
        600 // Scroll tay thì nhanh hơn auto (600ms)
      );
    }
  };

  return (
    <section className="overflow-hidden relative w-full">
      <div className="absolute inset-0 bg-linear-to-br from-[#f4c7cc]/30 via-[#fff5f4]/50 to-[#fce9eb]/30 pointer-events-none blur-3xl" />

      <SectionPage>
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-10 px-6 lg:px-0">
          <div className="md:max-w-2xl max-w-full">
            <TitleSection
              tagIcon={<Zap size={16} fill="currentColor" />}
              tagText="Lookbook 2026"
              titleNormal="Nghệ thuật"
              titleHighlight={
                <>
                  Vô cực
                  <PinkPawIcon />
                </>
              }
              titleNormalClassName="sriracha-regular text-[#f4c7cc]"
              align="left"
              className="mb-0 md:mb-0"
            />
          </div>

          <div className="flex md:max-w-2xl max-w-full flex-col items-start md:items-end gap-8 mt-6 md:mt-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-zinc-600 text-base max-w-md leading-relaxed border-l-2 border-[#e9b2b8] pl-6 md:pl-8 italic font-medium"
            >
              Nơi mỗi thiết kế là một bản tuyên ngôn độc bản, ghi lại dòng chảy nghệ thuật mềm mại và sống động trên phom móng chuẩn mực.
            </motion.p>
          </div>
        </div>

        <div className="relative group">
          <div className="hidden md:flex absolute top-[45%] -translate-y-1/2 left-4 right-4 justify-between z-30 pointer-events-none">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 cursor-pointer hover-btn rounded-full bg-white/90 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(233,178,184,0.5)] border border-[#f4c7cc]/50 flex items-center justify-center text-[#ff7ba9] hover:bg-white hover:scale-110 transition-all pointer-events-auto"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 cursor-pointer hover-btn rounded-full bg-white/90 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(233,178,184,0.5)] border border-[#f4c7cc]/50 flex items-center justify-center text-[#ff7ba9] hover:bg-white hover:scale-110 transition-all pointer-events-auto"
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </button>
          </div>

          <div
            ref={containerRef}
            className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar  snap-x snap-mandatory px-6 items-center"
          >
            {GALLERY_DATA.map((item, index) => (
              <GalleryItem key={index} item={item} index={index} onClick={() => setSelectedIndex(index)} />
            ))}

            <motion.div
              whileHover={{ scale: 0.98 }}
              className="relative w-[85vw] md:w-[380px] shrink-0 aspect-[3/4.2] rounded-[40px] bg-[#fff5f4] flex flex-col items-center justify-between text-center p-6 md:p-8 snap-start group transition-all shadow-[0_20px_60px_-15px_rgba(233,178,184,0.3)] border border-white"
            >
              <div className="absolute inset-2 md:inset-3 rounded-[32px] border-2 border-dashed border-[#f4c7cc] pointer-events-none" />

              <div className="w-24 h-24 mt-4 rounded-full bg-white flex items-center justify-center text-[#ff7ba9] shadow-[0_10px_30px_-10px_rgba(233,178,184,0.6)] relative z-10">
                <CalendarHeart size={36} strokeWidth={1.5} />
                <div className="absolute inset-0 rounded-full border border-[#fce9eb] scale-[1.25] opacity-60" />
                <div className="absolute inset-0 rounded-full border border-[#fce9eb] scale-[1.5] opacity-30" />
              </div>

              <div className="flex flex-col items-center gap-0 z-10 mt-2">
                <h4 className="text-zinc-800 font-bold text-2xl md:text-[28px] tracking-tight">
                  Đặt lịch
                </h4>
                <div className="flex items-center justify-center gap-1">
                  <span className="text-[#ff7ba9] text-4xl md:text-[42px] pinyon-script-regular pr-1 leading-none">
                    Tỏa sáng
                  </span>
                  <Sparkles className="text-[#ff7ba9] w-5 h-5 -mt-6" strokeWidth={1.5} />
                </div>
              </div>

              <div className="flex items-center gap-2 w-full max-w-[140px] z-10 my-1">
                <div className="h-px w-full bg-linear-to-r from-transparent to-[#f4c7cc]" />
                <Heart size={12} className="text-[#f4c7cc] fill-[#f4c7cc] shrink-0" />
                <div className="h-px w-full bg-linear-to-l from-transparent to-[#f4c7cc]" />
              </div>

              <p className="text-zinc-500 text-xs md:text-[13px] font-medium leading-relaxed max-w-[180px] z-10 mb-2">
                Lên lịch ngay để được chăm sóc và làm đẹp nhé!
              </p>

              <button className="flex items-center justify-center gap-2 w-[90%] bg-[#f46e98] hover:bg-[#ff7ba9] text-white py-3.5 rounded-full font-bold text-[11px] uppercase tracking-wider transition-all z-10 mb-2 shadow-lg shadow-[#f4c7cc]/50 hover:scale-105 active:scale-95 cursor-pointer">
                <Calendar size={16} strokeWidth={2} />
                ĐẶT LỊCH NGAY
              </button>
            </motion.div>
          </div>
        </div>
      </SectionPage>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />

      <AnimatePresence>
        {selectedIndex !== null && (
          <GalleryModal
            currentIndex={selectedIndex}
            setCurrentIndex={setSelectedIndex}
            onClose={() => setSelectedIndex(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};
