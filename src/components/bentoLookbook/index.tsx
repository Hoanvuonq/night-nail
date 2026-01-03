"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";

export const BentoLookbook = () => {
  const items = [
    {
      title: "Mắt Mèo Ngân Hà",
      tag: "Best-Seller",
      img: "/images/service/service_nail__01.jpg",
      className: "md:col-span-2 md:row-span-2 min-h-[420px]",
    },
    {
      title: "Vẽ Hoạt Hình Chibi",
      tag: "Cute Art",
      img: "/images/service/service_nail__02.jpg",
      className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    },
    {
      title: "Đính Đá Công Chúa",
      tag: "Luxury Choice",
      img: "/images/service/service_nail__03.jpg",
      className: "md:col-span-1 md:row-span-2 min-h-[420px]",
    },
    {
      title: "Ombre Mây Hồng",
      tag: "Sweetie",
      img: "/images/service/service_nail__04.jpg",
      className: "md:col-span-1 md:row-span-1 min-h-[200px]",
    },
  ];

  return (
    <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto overflow-hidden bg-[#FBFAF8]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 md:mb-24 gap-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-2 text-[#D4AF37] mb-6">
            <Sparkles size={14} className="animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]">
              Premium Lookbook
            </span>
          </div>
          <h2 className="text-5xl md:text-8xl font-serif text-zinc-900 leading-[1.05]">
            Nơi những ngón tay <br />
            <span className="italic text-[#D4AF37] font-light">Kể Chuyện</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="hidden lg:block border-l border-zinc-200 pl-8 py-3"
        >
          <p className="text-zinc-500 italic max-w-[320px] text-base leading-relaxed font-light">
            "Night Nail không chạy theo số lượng. Chúng mình ưu tiên sự tỉ mỉ, chăm chút từng lớp sơn."
          </p>
        </motion.div>
      </div>

      {/* Bento Grid Layout - Chỉnh rounded mềm mại hơn (giống các thẻ cam kết) */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-5 md:gap-7 h-auto">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -12 }}
            className={cn(
              "group relative rounded-[45px] md:rounded-[60px] overflow-hidden bg-white shadow-[0_15px_45px_rgba(0,0,0,0.03)] cursor-pointer border border-white",
              item.className
            )}
          >
            {/* Image Layer - Thêm lớp phủ sáng sang trọng */}
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
              />
              {/* Gradient Overlay mờ nhẹ màu nâu gold */}
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
            </div>

            {/* Content Overlay - Text trắng mảnh sang trọng */}
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end">
              <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out">
                <span className="inline-block text-[9px] text-white font-bold uppercase tracking-[0.2em] bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-4 border border-white/30">
                  {item.tag}
                </span>
                <div className="flex justify-between items-end gap-4">
                  <h3 className="text-white text-2xl md:text-3xl font-serif italic leading-none">
                    {item.title}
                  </h3>
                  <div className="shrink-0 w-12 h-12 rounded-full bg-white flex items-center justify-center text-zinc-900 shadow-xl group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-500">
                    <ArrowUpRight size={22} strokeWidth={1.5} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};