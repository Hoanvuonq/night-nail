"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Sparkles, Eye, Heart } from "lucide-react";
import { cn } from "@/utils/cn";

export const Web3Gallery = () => {
  return (
    <section className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Background Blur chuẩn Web3 */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#D4AF37]/10 blur-[150px] rounded-full animate-pulse" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-6"
            >
              <Sparkles size={14} /> <span>Curated Collection</span>
            </motion.div>
            <h2 className="text-6xl md:text-8xl font-serif text-white leading-[0.85]">
              Vũ trụ <br /> <span className="italic font-light bg-gradient-to-r from-[#D4AF37] via-white to-[#D4AF37] bg-clip-text text-transparent">Nghệ thuật</span>
            </h2>
          </div>
          <p className="text-white/40 text-sm md:text-right max-w-[300px] leading-relaxed italic">
            "Mỗi bộ móng là một mã định danh duy nhất, phản chiếu cá tính và linh hồn của chủ nhân."
          </p>
        </div>

        {/* Masonry Grid chuẩn Web3 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {GALLERY_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -15 }}
              className={cn(
                "relative rounded-[40px] overflow-hidden border border-white/10 group cursor-none",
                index === 1 ? "md:row-span-2 h-100" : "h-[300px] md:h-[400px]"
              )}
            >
              <Image src={item.img} alt="Nail Art" fill className="object-cover transition-transform duration-1000 group-hover:scale-110" />
              
              {/* Glassmorphism Card Info */}
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8 backdrop-blur-[2px]">
                <div className="flex justify-between items-center">
                  <span className="px-3 py-1 rounded-full bg-white/10 border border-white/20 text-[10px] text-[#D4AF37] font-bold">#00{index+1}</span>
                  <Heart size={18} className="text-white/50 hover:text-red-400 cursor-pointer" />
                </div>
                <div className="space-y-2 translate-y-10 group-hover:translate-y-0 transition-transform duration-500">
                  <h4 className="text-white font-serif italic text-xl">{item.title}</h4>
                  <p className="text-[#D4AF37] font-bold text-sm tracking-widest">{item.price}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const GALLERY_DATA = [
  { img: "/images/about/about_01.png", title: "Pearl Nebula", price: "450K" },
  { img: "/images/about/about_02.png", title: "Cyber Gold", price: "550K" },
  { img: "/images/about/about_03.png", title: "Aurora Dream", price: "390K" },
  { img: "/images/about/about_01.png", title: "Hologram Rose", price: "420K" },
];