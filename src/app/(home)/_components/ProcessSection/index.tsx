"use client";
import { Button, PinkPawIcon, TitleSection } from "@/components";
import { GALLERY_DATA } from "@/contants/gallery";
import { motion } from "framer-motion";
import { ArrowRight, ArrowLeft, Plus, Zap, PawPrint, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";

export const ProcessSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          containerRef.current.scrollTo({ left: 0, behavior: "smooth" });
        } else {
          containerRef.current.scrollBy({ left: clientWidth * 0.75, behavior: "smooth" });
        }
      }
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (containerRef.current) {
      const scrollAmount = containerRef.current.clientWidth * 0.75;
      containerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="md:py-16 py-2 overflow-hidden relative">
      <div className="absolute inset-0 bg-linear-to-br from-[#f4c7cc]/30 via-[#fff5f4]/50 to-[#fce9eb]/30 pointer-events-none blur-3xl" />

      <div className="md:max-w-7xl max-w-full mx-auto">
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-10 px-6 lg:px-0">
          <div className="md:max-w-3xl max-w-full">
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

          <div className="flex flex-col items-start md:items-end gap-8 mt-6 md:mt-0">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-zinc-600 text-base max-w-75 leading-relaxed border-l-2 border-[#e9b2b8] pl-6 md:pl-8 italic font-medium"
            >
              Nơi mỗi thiết kế là một bản tuyên ngôn độc bản, tan chảy như làn
              nước lung linh trên nền tảng Web3.
            </motion.p>
          </div>
        </div>

        <div className="relative group">
          <div className="hidden md:flex absolute top-[45%] -translate-y-1/2 left-4 right-4 justify-between z-30 pointer-events-none">
            <button
              onClick={() => scroll("left")}
              className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(233,178,184,0.5)] border border-[#f4c7cc]/50 flex items-center justify-center text-[#ff7ba9] hover:bg-white hover:scale-110 transition-all pointer-events-auto"
            >
              <ArrowLeft size={24} strokeWidth={2.5} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-md shadow-[0_10px_40px_-10px_rgba(233,178,184,0.5)] border border-[#f4c7cc]/50 flex items-center justify-center text-[#ff7ba9] hover:bg-white hover:scale-110 transition-all pointer-events-auto"
            >
              <ArrowRight size={24} strokeWidth={2.5} />
            </button>
          </div>

          <div
            ref={containerRef}
            className="flex gap-6 md:gap-10 overflow-x-auto no-scrollbar pb-24 snap-x snap-mandatory px-6"
          >
            {GALLERY_DATA.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-[75vw] md:w-[320px] shrink-0 aspect-[3/4.2] rounded-[40px] snap-start group border-8 border-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] bg-white cursor-pointer"
              >
                <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-zinc-100">
                  <Image
                    src={item.img}
                    alt={item.title}
                    fill
                    className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-115"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-700 pointer-events-none" />
                  <div className="absolute inset-x-0 top-0 h-[30%] bg-linear-to-b from-black/40 to-transparent opacity-60 transition-opacity duration-700 pointer-events-none" />

                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <motion.div
                        whileHover={{ rotate: 90 }}
                        className="w-12 h-12 rounded-xl bg-white/40 backdrop-blur-xl border border-white/40 flex items-center justify-center text-[#ff7ba9] shadow-xl"
                      >
                        <Plus size={28} strokeWidth={1.5} />
                      </motion.div>
                      <span className="text-[#fce9eb] opacity-60 text-5xl md:text-6xl font-bold tracking-tighter">
                        0{index + 1}
                      </span>
                    </div>

                    <div className="space-y-4 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                      <h3 className="text-xl md:text-2xl text-white font-semibold tracking-wide drop-shadow-md">
                        {item.title}
                      </h3>

                      <div className="flex items-center justify-between pt-4 border-t border-white/20 transition-all duration-1000">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-white/70 uppercase tracking-[0.4em] mb-1 font-bold">
                            Estimate Price
                          </span>
                          <span className="text-[#ff7ba9] font-bold text-xl">
                            {item.price}
                          </span>
                        </div>
                        <button className="flex items-center gap-3 text-white text-[10px] font-bold uppercase tracking-[0.2em] group/btn">
                          Khám phá
                          <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center group-hover/btn:bg-[#ff7ba9] group-hover/btn:border-[#ff7ba9] transition-all">
                            <ArrowRight
                              size={16}
                              className="group-hover/btn:text-white transition-colors cursor-pointer"
                            />
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000 bg-linear-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
                </div>
              </motion.div>
            ))}

            <motion.div
              whileHover={{ scale: 0.98 }}
              className="w-[75vw] md:w-[320px] shrink-0 aspect-[3/4.2] rounded-[40px] border-4 border-dashed border-[#e9b2b8] bg-[#fff5f4]/30 flex flex-col items-center justify-center text-center p-10 snap-start group transition-all hover:bg-[#fff5f4]"
            >
              <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-[#ff7ba9] mb-10 shadow-2xl relative">
                <Sparkles size={48} strokeWidth={1} />
                <div className="absolute inset-0 rounded-full border-2 border-[#e9b2b8] animate-ping opacity-30" />
              </div>
              <h4 className="text-gray-600 font-semibold text-2xl md:text-3xl mb-6 tracking-wide">
                Đặt lịch <br /> Toả sáng
              </h4>
              <p className="text-zinc-400 text-xs mb-12 tracking-widest uppercase font-bold">
                Limited Slots Weekly
              </p>
              <Button label="Đặt Lịch Ngay" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
    </section>
  );
};
