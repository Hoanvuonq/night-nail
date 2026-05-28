"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { SectionPage, TitleSection } from "@/components";
import { GalleryModal } from "../ProcessSection/GalleryModal";

export const BentoLookbook = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const items = [
    {
      title: "Mắt Mèo Ngân Hà",
      tag: "Best-Seller",
      img: "/images/service/service_nail__01.jpg",
      className: "md:col-span-2 md:row-span-2",
    },
    {
      title: "Vẽ Hoạt Hình Chibi",
      tag: "Cute Art",
      img: "/images/service/service_nail__02.jpg",
      className: "md:col-span-1 md:row-span-1",
    },
    {
      title: "Đính Đá Công Chúa",
      tag: "Luxury Choice",
      img: "/images/service/service_nail__03.jpg",
      className: "md:col-span-1 md:row-span-2",
    },
    {
      title: "Ombre Mây Hồng",
      tag: "Sweetie",
      img: "/images/service/service_nail__04.jpg",
      className: "md:col-span-1 md:row-span-1",
    },
  ];

  return (
    <SectionPage className="overflow-hidden bg-[#fff5f4]">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-10">
        <div className="max-w-3xl">
          <TitleSection
            tagIcon={<Sparkles size={14} className="animate-pulse" />}
            tagText="Premium Lookbook"
            titleNormal="Bộ Sưu Tập"
            titleHighlight="Nail Nghệ Thuật"
            align="left"
            className="mb-0 md:mb-0"
          />
        </div>

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

      <div className="grid grid-cols-1 md:grid-cols-4 auto-rows-[250px] md:auto-rows-[240px] lg:auto-rows-[280px] gap-3 md:gap-4 h-auto">
        {items.map((item, i) => (
          <motion.div
            key={i}
            onClick={() => setSelectedIndex(i)}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1, duration: 0.7 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={cn(
              "group relative rounded-4xl md:rounded-[2.5rem] overflow-hidden shadow-md cursor-pointer transform-gpu w-full h-full",
              item.className
            )}
          >
            <div className="relative w-full h-full overflow-hidden">
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[2.5s] ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-liear-to-t from-zinc-900/60 via-transparent to-transparent opacity-40 group-hover:opacity-80 transition-opacity duration-500" />
            </div>

            <div className="absolute inset-0 p-5 md:p-6 flex flex-col justify-end">
              <div className="translate-y-4 group-hover:translate-y-0 transition-all duration-700 ease-out flex flex-col justify-end h-full">
                <div className="mt-auto">
                  <span className="inline-block text-[10px] md:text-[11px] text-white font-normal uppercase tracking-widest bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full mb-3 border border-white/40 ga-maamli-regular">
                    {item.tag}
                  </span>
                  <div className="flex justify-between items-end gap-3">
                    <h3 className="text-white text-xl md:text-2xl font-normal tracking-wide leading-none ga-maamli-regular">
                      {item.title}
                    </h3>
                    <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center text-zinc-900 shadow-xl group-hover:bg-linear-to-r group-hover:from-[#ff7ba9] group-hover:to-[#ff4d79] group-hover:text-white transition-colors duration-500">
                      <ArrowUpRight size={20} strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedIndex !== null && (
          <GalleryModal
            currentIndex={selectedIndex}
            setCurrentIndex={setSelectedIndex}
            onClose={() => setSelectedIndex(null)}
            customData={items}
            isImageOnly={true}
          />
        )}
      </AnimatePresence>
    </SectionPage>
  );
};