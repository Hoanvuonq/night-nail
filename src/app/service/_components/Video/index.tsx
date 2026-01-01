"use client";
import { motion } from "framer-motion";

export const Video = () => {
  return (
    <div className="w-full h-[60vw] md:h-[35vw] mx-auto relative group">
      {/* Khung viền lấp lánh phía sau */}
      <div className="absolute -inset-2 bg-linear-to-r from-[#D4AF37]/20 via-[#F4D8CD]/20 to-[#D4AF37]/20 blur-xl rounded-[2rem] opacity-50 group-hover:opacity-100 transition-opacity" />
      
      <video
        src="/images/video/service.mp4"
        autoPlay muted loop playsInline
        className="w-full h-full relative z-10 object-cover rounded-[2rem] border-2 border-white/10 shadow-2xl"
      ></video>

      {/* Label Dịch Vụ - Chữ bồng bềnh */}
      <motion.div 
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
      >
        <span className="text-3xl md:text-5xl lg:text-6xl pacifico-regular-font text-white drop-shadow-[0_4px_10px_rgba(212,175,55,0.8)] bg-black/30 backdrop-blur-md px-10 py-5 rounded-[2rem] border border-white/20">
          Dịch Vụ <span className="text-[#D4AF37]">Nail</span>
        </span>
      </motion.div>
    </div>
  );
};