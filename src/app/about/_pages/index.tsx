"use client";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import Design01 from "public/design_01";
import { PolicyCard } from "../_components/Card";
import { DATA_ABOUT, OWNER_NAME, STUDIO_NAME, LETTER_CONTENT } from "@/contants/about";

const AboutUsScreen = () => {
  return (
    <section className="w-full py-24 px-6 lg:px-12 bg-[#050505] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER: Tiêu đề lồng ghép hình vòm Gold */}
        <div className="relative flex flex-col md:flex-row items-center justify-between mb-32">
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="pacifico-regular-font text-7xl md:text-[10rem] text-main-color z-10 relative"
          >
            Giới Thiệu
          </motion.h2>

          <div className="relative mt-12 md:mt-0">
            {/* Khối vòm Gold chuẩn Luxury */}
            <motion.div 
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-[200px] h-[300px] rounded-t-full bg-linear-to-b from-[#D4AF37] via-[#B38F24] to-transparent opacity-20 blur-sm absolute -inset-4"
            />
            <div className="w-[200px] h-[300px] rounded-t-full border-2 border-[#D4AF37]/30 relative z-0 flex items-end justify-center pb-10">
               <div className="w-12 h-12 rounded-full bg-[#D4AF37] shadow-[0_0_30px_rgba(212,175,55,0.5)] animate-bounce" />
            </div>
          </div>
        </div>

        {/* CONTENT: Chuyện của Night Nail (Dạng lá thư Glassmorphism) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32 items-start">
          <div className="lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-8 md:p-12 rounded-[40px] bg-white/[0.03] border border-white/10 backdrop-blur-md relative"
            >
              <h3 className="text-[#D4AF37] font-bold text-2xl tracking-[0.3em] uppercase mb-8">
                Chuyện của Night Nail
              </h3>
              
              <div className="space-y-6 text-lg md:text-xl text-white/80 font-light leading-relaxed font-serif italic">
                <p className="text-2xl text-[#D4AF37] font-serif">"Xin chào!"</p>
                <p>{LETTER_CONTENT.shortIntro}</p>
                <p>{LETTER_CONTENT.mission}</p>
                <p>{LETTER_CONTENT.callToAction}</p>
                <div className="pt-8 flex flex-col items-end">
                   <p className="text-white opacity-60 italic mb-2 tracking-widest uppercase text-xs">{LETTER_CONTENT.closing}</p>
                   <p className="text-3xl font-serif text-[#D4AF37]">{OWNER_NAME}</p>
                   <p className="text-xs uppercase tracking-[0.2em] text-white/40 mt-1">Chủ sáng lập {STUDIO_NAME}</p>
                </div>
              </div>

              {/* Icon lá trang trí ở góc */}
              <div className="absolute -bottom-10 -left-10 opacity-30 scale-150 rotate-12">
                <Design01 />
              </div>
            </motion.div>
          </div>
          
          <div className="lg:col-span-4 hidden lg:block">
            {/* Có thể thêm một tấm ảnh chân dung owner hoặc ảnh studio mờ ở đây */}
            <div className="h-full w-full rounded-[40px] border border-white/5 bg-linear-to-br from-white/5 to-transparent flex items-center justify-center italic text-white/20 text-center p-10">
               "Nghệ thuật không nằm ở màu sơn, mà nằm ở tâm hồn người thợ."
            </div>
          </div>
        </div>

        {/* FOOTER: Danh sách Policy Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-8 justify-items-center">
          {DATA_ABOUT.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <PolicyCard {...service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutUsScreen;