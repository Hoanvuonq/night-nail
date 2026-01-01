"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import {Button} from "../button";
import { IServiceProps } from "@/contants/service";
import { Star, Sparkles } from "lucide-react";

export const ServiceComponents = ({
  img,
  title,
  description,
  labelButton,
  reverse,
  index = 1,
}: IServiceProps & { index?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 1.2, ease: "backOut" }}
      className={`
        flex items-center w-full justify-between gap-12 md:gap-24 
        ${reverse ? 'xl:flex-row-reverse' : 'xl:flex-row'} 
        flex-col mb-40 relative
      `}
    >
      {/* --- PHẦN HÌNH ẢNH DỄ THƯƠNG --- */}
      <div className="relative group shrink-0">
        {/* Bong bóng trang trí trôi nổi */}
        <motion.div 
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-linear-to-br from-[#D4AF37]/20 to-transparent blur-xl"
        />
        <motion.div 
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-linear-to-tr from-[#FFB6C1]/20 to-transparent blur-lg"
        />

        {/* Vòng viền quỹ đạo mềm mại */}
        <div className="absolute -inset-4 border-2 border-dashed border-[#D4AF37]/30 rounded-full animate-[spin_20s_linear_infinite]" />
        
        {/* Khung chứa ảnh tròn "Mũm mĩm" */}
        <div className="w-[280px] h-[280px] md:w-[420px] md:h-[420px] relative z-10 p-3">
           <motion.div 
             whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
             className="w-full h-full relative rounded-full overflow-hidden border-4 border-black/10 shadow-[0_0_40px_rgba(212,175,55,0.2)]"
           >
              <Image
                src={img || "/images/service/service_nail__01.jpg"}
                alt={title}
                fill
                className="object-cover scale-110 transition-transform duration-1000"
              />
              {/* Hiệu ứng lấp lánh khi hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                <Sparkles className="absolute top-1/4 left-1/4 text-black animate-pulse" size={24} />
                <Star className="absolute bottom-1/3 right-1/4 text-[#D4AF37] animate-bounce" size={20} />
              </div>
           </motion.div>
        </div>

        {/* Badge số thứ tự hình trái tim mờ hoặc tròn cute */}
        <div className="absolute -top-2 right-4 w-14 h-14 bg-linear-to-br from-[#FFD700] to-[#D4AF37] rounded-full z-20 flex flex-col items-center justify-center text-black shadow-lg">
          <span className="text-[10px] font-bold leading-none">Sweet</span>
          <span className="text-xl font-black italic">0{index}</span>
        </div>
      </div>

      {/* --- PHẦN NỘI DUNG NGỌT NGÀO --- */}
      <div className={`flex flex-col gap-6 xl:w-[50%] ${reverse ? 'xl:text-right' : 'xl:text-left'} text-center z-10`}>
        <div className="space-y-2">
          <motion.div 
            className={`flex items-center gap-2 ${reverse ? 'xl:justify-end' : 'xl:justify-start'} justify-center`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="h-[2px] w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase font-black">Lovely Service</span>
            <div className="h-[2px] w-8 bg-[#D4AF37]" />
          </motion.div>
          
          <h3 className="text-5xl md:text-7xl font-serif text-black leading-tight">
            {title}
            <span className="text-[#D4AF37] inline-block animate-bounce ml-2">✨</span>
          </h3>
        </div>

        <p className="text-lg md:text-xl text-black/70 font-light leading-relaxed font-serif italic italic">
          "{description}"
        </p>

        <div className={`pt-4 flex ${reverse ? 'xl:justify-end' : 'xl:justify-start'} justify-center`}>
           <div className="relative group/btn">
              {/* Nút bấm bo tròn hơn */}
              <Button 
                label={labelButton} 
                className="relative z-10 rounded-full px-12 py-4 hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all" 
              />
              {/* Hiệu ứng hào quang màu hồng vàng cực cute */}
              <div className="absolute inset-0 bg-linear-to-r from-[#D4AF37] to-[#FFB6C1] blur-2xl opacity-0 group-hover/btn:opacity-40 transition-opacity rounded-full" />
           </div>
        </div>
      </div>

      {/* Trang trí nền với các chấm tròn nhỏ */}
      <div className="absolute inset-0 pointer-events-none -z-20">
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-[#D4AF37]/20 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-black/10 rounded-full" />
      </div>
    </motion.div>
  );
};