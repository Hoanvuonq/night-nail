"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export const Pricing = ({ title, items }: any) => {
  return (
    <motion.div 
      whileHover={{ scale: 1.02 }}
      className="flex flex-col gap-6 p-8 border-2 border-[#D4AF37]/20 rounded-[3rem] shadow-2xl bg-[#111]/80 backdrop-blur-md relative group"
    >
      {/* Icon trang trí dễ thương */}
      <div className="absolute -top-4 -right-4 bg-[#D4AF37] p-2 rounded-full text-black rotate-12 group-hover:rotate-0 transition-transform">
        <Heart size={20} fill="currentColor" />
      </div>

      <h3 className="text-2xl md:text-3xl font-serif italic text-[#D4AF37] flex items-center gap-3">
        <span className="text-xl">✨</span>
        {title}
        <span className="text-xl">✨</span>
      </h3>

      <div className="flex flex-col gap-5">
        {items.map((item: any, index: number) => (
          <div
            key={index}
            className="flex justify-between items-end text-base md:text-lg text-white/80 group/item"
          >
            <span className="capitalize font-light italic tracking-wide group-hover/item:text-[#D4AF37] transition-colors">
              {item.service}
            </span>
            <span className="flex-grow border-b-2 border-dotted border-white/10 mx-3 mb-1.5 opacity-50"></span>
            <span className="text-xl font-bold text-[#D4AF37] pacifico-regular-font">
              {item.price}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};