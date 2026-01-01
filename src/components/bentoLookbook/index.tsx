"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowUpRight } from "lucide-react";
import { cn } from "@/utils/cn"; // Đảm bảo bạn có hàm cn hoặc dùng template string

export const BentoLookbook = () => {
  const items = [
    { 
      title: "Mắt Mèo Kim Cương", 
      tag: "Hot", 
      img: "/images/service/service_nail__01.jpg", 
      // Desktop: rộng 2 cột, cao 2 hàng | Mobile: 1 cột
      className: "md:col-span-2 md:row-span-2 h-[400px] md:h-full" 
    },
    { 
      title: "Vẽ Tả Thực", 
      tag: "Art", 
      img: "/images/service/service_nail__02.jpg", 
      className: "md:col-span-1 md:row-span-1 h-[250px] md:h-full" 
    },
    { 
      title: "Đính Đá Sang Trọng", 
      tag: "Luxury", 
      img: "/images/service/service_nail__03.jpg", 
      className: "md:col-span-1 md:row-span-2 h-[400px] md:h-full" 
    },
    { 
      title: "Ombre Ngọt Ngào", 
      tag: "Cute", 
      img: "/images/service/service_nail__04.jpg", 
      className: "md:col-span-1 md:row-span-1 h-[250px] md:h-full" 
    },
  ];

  return (
    <section className="py-16 md:py-24 px-5 md:px-10 max-w-7xl mx-auto overflow-hidden">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-10 md:mb-16 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center gap-2 text-[#D4AF37] mb-3 md:mb-4">
            <Sparkles size={18} className="animate-pulse" />
            <span className="text-[10px] md:text-xs font-bold uppercase tracking-[0.3em]">Trending Now</span>
          </div>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-white leading-tight">
            Bộ Sưu Tập <br className="hidden md:block" /> 
            <span className="italic text-[#D4AF37] font-light">Móng Xinh</span>
          </h2>
        </motion.div>
        
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-white/40 italic max-w-xs text-sm border-l border-[#D4AF37]/30 pl-4 leading-relaxed"
        >
          "Khám phá những mẫu nail dẫn đầu xu hướng, được thiết kế riêng để tôn vinh vẻ đẹp của nàng."
        </motion.p>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4 md:gap-6 h-auto md:h-[700px] lg:h-[800px]">
        {items.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className={cn(
              "relative rounded-[2rem] md:rounded-[3rem] overflow-hidden border border-white/5 group cursor-pointer bg-[#111]",
              item.className
            )}
          >
            {/* Image Layer */}
            <Image 
              src={item.img} 
              alt={item.title} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
            />
            
            {/* Overlay Gradient (Web3 Dark Vibe) */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent transition-opacity duration-500" />
            
            {/* Content Layer */}
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <div className="flex justify-between items-end gap-4 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                <div className="flex-1">
                  <motion.span 
                    className="inline-block text-[9px] md:text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-[#D4AF37]/20 mb-2 md:mb-3"
                  >
                    {item.tag}
                  </motion.span>
                  <h3 className="text-white text-lg md:text-2xl font-serif italic leading-tight">{item.title}</h3>
                </div>
                
                {/* Action Button */}
                <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white group-hover:bg-[#D4AF37] group-hover:text-black group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all duration-300">
                  <ArrowUpRight size={20} className="md:size-24" />
                </div>
              </div>
            </div>

            {/* Shine Effect (Luxury touch) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 -translate-x-full group-hover:translate-x-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};