"use client";

import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Image from "next/image";

export interface GalleryItemProps {
  item: {
    img: string;
    title: string;
    price: string;
    tag?: string;
  };
  index: number;
  onClick: () => void;
}

export const GalleryItem = ({ item, index, onClick }: GalleryItemProps) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 0.98 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-[85vw] md:w-[380px] shrink-0 aspect-[3/4.2] rounded-[40px] snap-start group/card border-8 border-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] bg-white cursor-pointer"
    >
      <div className="absolute inset-0 overflow-hidden rounded-[32px] bg-zinc-100">
        <Image
          src={item.img}
          alt={item.title}
          fill
          className="object-cover transition-transform duration-[1.5s] ease-out group-hover/card:scale-115"
        />

        <div className="absolute inset-x-0 bottom-0 h-[60%] bg-linear-to-t from-black/90 via-black/40 to-transparent opacity-90 transition-opacity duration-700 pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-[30%] bg-linear-to-b from-black/40 to-transparent opacity-60 transition-opacity duration-700 pointer-events-none" />

        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
          <div className="flex justify-between items-start">
            <motion.div
              whileHover={{ rotate: 90 }}
              className="w-12 h-12 rounded-xl bg-white/40 backdrop-blur-xl border border-white/40 flex items-center justify-center text-pink-400 shadow-xl"
            >
              <Plus size={28} strokeWidth={1.5} />
            </motion.div>
            <span className="text-[#fce9eb] opacity-60 text-xl md:text-2xl font-bold tracking-tighter">
              {index + 1}
            </span>
          </div>

          <div className="space-y-4 transition-transform duration-700 ease-[0.16,1,0.3,1]">
            <div className="flex items-center gap-3">
              <h3 className="text-sm pacifico-regular-font md:text-xl text-white font-semibold tracking-wide drop-shadow-md">
                {item.title}
              </h3>
              {item.tag && (
                <div className="px-3 py-1 rounded-full bg-[#fff0f3]/90 backdrop-blur-sm text-[#ff7ba9] font-bold text-[9px] md:text-[10px] uppercase tracking-wider shadow-sm border border-white/40 whitespace-nowrap">
                  {item.tag}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-white/20 transition-all duration-1000">
              <div className="flex flex-col">
                <span className="text-[8px] text-white/70 uppercase tracking-[0.4em] mb-1 font-bold">
                  Collection
                </span>
                <span className="text-[#ff7ba9] font-bold text-xl pinyon-script-regular">
                  {item.price}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center group-hover/btn:bg-[#ff7ba9] group-hover/btn:border-[#ff7ba9] transition-all">
                <ArrowRight
                  size={16}
                  className="group-hover/btn:text-white transition-colors cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000 bg-linear-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
      </div>
    </motion.div>
  );
};
