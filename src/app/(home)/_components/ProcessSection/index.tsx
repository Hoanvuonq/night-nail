"use client";
import { GALLERY_DATA } from "@/contants/gallery";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Zap, Plus } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

export const Web3LuxuryCarousel = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  return (
    <section className="py-32 overflow-hidden relative bg-[#FDFCF9]">
      <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-amber-100/40 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-amber-50/50 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-24 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 text-amber-600 mb-6"
            >
              <Zap size={16} fill="currentColor" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em]">Lookbook 2025</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-7xl md:text-9xl font-black leading-[0.85] tracking-tighter text-zinc-900"
            >
              Nghệ thuật <br />
              <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-600 to-amber-500 drop-shadow-sm">
                Vô cực
                <motion.span 
                  animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.2, 1] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute -right-16 top-0 text-5xl"
                >✨</motion.span>
              </span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-zinc-400 text-base max-w-[300px] leading-relaxed border-l-2 border-amber-200 pl-8 hidden lg:block italic font-medium"
          >
            Nơi mỗi thiết kế là một bản tuyên ngôn độc bản, tan chảy như làn nước lung linh trên nền tảng Web3.
          </motion.p>
        </div>

        {/* Carousel Container - Snap Scrolling cực mượt */}
        <div 
          ref={containerRef}
          className="flex gap-12 overflow-x-auto no-scrollbar pb-24 snap-x snap-mandatory px-4"
        >
          {GALLERY_DATA.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -20 }}
              className="relative min-w-[340px] md:min-w-[500px] aspect-[3/4.2] rounded-[60px] overflow-hidden snap-center group border-8 border-white shadow-[0_40px_80px_-15px_rgba(0,0,0,0.08)] bg-white cursor-pointer"
            >
              {/* Image với hiệu ứng Zoom-in khi Hover */}
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-115"
              />
              
              {/* Overlay Glassmorphism tinh tế */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              {/* Content Overlay */}
              <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                <div className="flex justify-between items-start">
                  <motion.div 
                    whileHover={{ rotate: 90 }}
                    className="w-16 h-16 rounded-[24px] bg-white/40 backdrop-blur-xl border border-white/40 flex items-center justify-center text-amber-600 shadow-xl"
                  >
                    <Plus size={28} strokeWidth={1.5} />
                  </motion.div>
                  <span className="text-white opacity-20 text-7xl font-black tracking-tighter">0{index + 1}</span>
                </div>

                <div className="space-y-6 translate-y-12 group-hover:translate-y-0 transition-transform duration-700 ease-[0.16,1,0.3,1]">
                  <h3 className="text-4xl md:text-5xl text-white font-bold tracking-tight drop-shadow-md">
                    {item.title}
                  </h3>
                  
                  <div className="flex items-center justify-between pt-8 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-1000">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-white/70 uppercase tracking-[0.4em] mb-1 font-black">Estimate Price</span>
                      <span className="text-amber-400 font-black text-2xl">{item.price}</span>
                    </div>
                    <button className="flex items-center gap-3 text-white text-[10px] font-black uppercase tracking-[0.2em] group/btn">
                      Explore
                      <div className="w-10 h-10 rounded-full border-2 border-white/40 flex items-center justify-center group-hover/btn:bg-amber-500 group-hover/btn:border-amber-500 transition-all">
                        <ArrowRight size={16} className="group-hover/btn:text-white transition-colors" />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Liquid Shimmer Effect */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-1000 bg-gradient-to-tr from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full" />
            </motion.div>
          ))}
          
          {/* Card CTA cuối cùng (Màu Gold nổi bật trên nền trắng) */}
          <motion.div 
            whileHover={{ scale: 0.98 }}
            className="min-w-[340px] md:min-w-[400px] aspect-[3/4.2] rounded-[60px] border-4 border-dashed border-amber-300 bg-amber-50/30 flex flex-col items-center justify-center text-center p-14 snap-center group transition-all hover:bg-amber-50"
          >
            <div className="w-28 h-28 rounded-full bg-white flex items-center justify-center text-amber-600 mb-10 shadow-2xl relative">
              <Sparkles size={48} strokeWidth={1} />
              <div className="absolute inset-0 rounded-full border-2 border-amber-200 animate-ping opacity-30" />
            </div>
            <h4 className="text-zinc-900 font-black text-4xl mb-6 tracking-tighter">Đặt lịch <br/> Toả sáng</h4>
            <p className="text-zinc-400 text-xs mb-12 tracking-widest uppercase font-bold">Limited Slots Weekly</p>
            <button className="w-full py-6 bg-zinc-900 text-white font-black rounded-[30px] text-[10px] uppercase tracking-[0.4em] hover:bg-amber-600 transition-all duration-500 shadow-2xl shadow-zinc-300">
              Booking Now ✨
            </button>
          </motion.div>
        </div>
      </div>

      {/* Noise Texture chuẩn Wix Studio cao cấp */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
    </section>
  );
};