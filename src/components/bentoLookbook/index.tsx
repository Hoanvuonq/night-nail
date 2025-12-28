"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowUpRight } from "lucide-react";

export const BentoLookbook = () => {
  const items = [
    { title: "Mắt Mèo Kim Cương", tag: "Hot", img: "/images/nail/look1.jpg", size: "md:col-span-2 md:row-span-2" },
    { title: "Vẽ Tả Thực", tag: "Art", img: "/images/nail/look2.jpg", size: "md:col-span-1 md:row-span-1" },
    { title: "Đính Đá Sang Trọng", tag: "Luxury", img: "/images/nail/look3.jpg", size: "md:col-span-1 md:row-span-2" },
    { title: "Ombre Ngọt Ngào", tag: "Cute", img: "/images/nail/look4.jpg", size: "md:col-span-1 md:row-span-1" },
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
        <div>
          <div className="flex items-center gap-2 text-[#D4AF37] mb-4">
            <Sparkles size={18} className="animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-[0.3em]">Trending Now</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight">
            Bộ Sưu Tập <br /> <span className="italic text-[#D4AF37] font-light">Móng Xinh</span>
          </h2>
        </div>
        <p className="text-white/40 italic max-w-xs text-sm border-l border-[#D4AF37]/30 pl-4">
          "Khám phá những mẫu nail dẫn đầu xu hướng, được thiết kế riêng cho nàng."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 h-full md:h-[800px]">
        {items.map((item, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 0.98 }}
            className={`relative rounded-[3rem] overflow-hidden border border-white/10 group cursor-pointer ${item.size}`}
          >
            <Image 
              src={item.img} 
              alt={item.title} 
              fill 
              className="object-cover transition-transform duration-1000 group-hover:scale-110" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
            
            <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
              <div>
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/20">
                  {item.tag}
                </span>
                <h3 className="text-white text-xl font-serif mt-3 italic">{item.title}</h3>
              </div>
              <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                <ArrowUpRight size={20} />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};