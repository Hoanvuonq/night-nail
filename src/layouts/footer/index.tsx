"use client";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  MessageCircle,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  Sparkles
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#050505] overflow-hidden relative border-t border-white/5">
      {/* Vệt sáng trang trí nền */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* =========================================
          1. GIAO DIỆN MOBILE (< 768px)
      ========================================= */}
      <div className="md:hidden w-full py-16 px-6 flex justify-center items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full md:max-w-[400px] w-full bg-gradient-to-b from-white/10 to-white/[0.02] backdrop-blur-xl rounded-[40px] p-8 border border-white/10 shadow-2xl relative overflow-hidden"
        >
          {/* Badge nhỏ */}
          <div className="flex justify-center mb-6">
            <div className="px-3 py-1 bg-[#D4AF37]/20 rounded-full border border-[#D4AF37]/30 flex items-center gap-2">
              <Sparkles size={10} className="text-[#D4AF37]" />
              <span className="text-[9px] text-[#D4AF37] font-bold tracking-[0.2em] uppercase">Premium Studio</span>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-6">
             <div className="w-24 h-24 relative rounded-full p-1 border-2 border-[#D4AF37]/30">
                <div className="w-full h-full relative rounded-full overflow-hidden bg-black/40">
                   <Image
                    src="/images/logo/ha_ant.png" 
                    alt="Night Nail"
                    fill
                    className="object-cover scale-110"
                  />
                </div>
             </div>

             <div className="space-y-2">
                <h2 className="text-4xl pacifico-regular-font text-[#D4AF37]">Night Nail</h2>
                <p className="text-[11px] text-white/40 uppercase tracking-[0.3em] font-medium">Beauty & Artistry</p>
             </div>

             <div className="w-full h-[1px] bg-white/5"></div>

             <div className="space-y-4 text-sm text-white/60 font-light">
                <div className="flex items-center justify-center gap-2">
                   <MapPin size={14} className="text-[#D4AF37]" />
                   <p>302/32 Phan Huy Ích, Q.Gò Vấp, HCM</p>
                </div>
                <div className="flex items-center justify-center gap-2">
                   <Phone size={14} className="text-[#D4AF37]" />
                   <p className="font-bold text-white tracking-widest">094 215 3511</p>
                </div>
             </div>

             {/* Social Icons Mobile */}
             <div className="flex gap-4">
                <SocialIcon href="#" bg="bg-white/5 border border-white/10 text-white hover:text-[#D4AF37]"><Facebook size={16} /></SocialIcon>
                <SocialIcon href="#" bg="bg-white/5 border border-white/10 text-white hover:text-[#D4AF37]"><Instagram size={16} /></SocialIcon>
                <SocialIcon href="#" bg="bg-white/5 border border-white/10 text-white hover:text-[#D4AF37]">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                </SocialIcon>
             </div>

             <Link href="/booking" className="w-full">
                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B38F24] text-black font-bold text-sm shadow-[0_10px_25px_rgba(212,175,55,0.2)] flex items-center justify-center gap-2"
                >
                  ĐẶT LỊCH NGAY <ChevronRight size={16} />
                </motion.button>
             </Link>
          </div>
        </motion.div>
      </div>

      {/* =========================================
          2. GIAO DIỆN DESKTOP (>= 768px)
      ========================================= */}
      <div className="hidden md:block w-full max-w-7xl mx-auto py-20 px-12 relative z-10">
        <div className="flex items-center justify-between gap-12">
          
          {/* Cột 1: Illustration & Logo */}
          <div className="relative group">
            <div className="absolute -inset-4 bg-[#D4AF37]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            <div className="relative w-[280px] h-[280px]">
              <Image
                src="/images/logo/ha_ant.png" 
                alt="Night Nail Art"
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Cột 2: Thông tin chính */}
          <div className="flex-1 px-16 border-l border-white/10">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-6xl pacifico-regular-font text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#FFF1B8] to-[#D4AF37] mb-8"
            >
              Night Nail
            </motion.h1>

            <div className="grid grid-cols-1 gap-6 text-sm">
              <div className="flex items-start gap-4 group">
                <div className="p-2 rounded-lg bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                   <MapPin size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Địa chỉ studio</p>
                  <p className="text-white/70 font-light">302/32 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                   <Mail size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Email hỗ trợ</p>
                  <p className="text-white/70 font-light tracking-wide">thiyha24c@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="p-2 rounded-lg bg-white/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
                   <Phone size={18} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Hotline đặt lịch</p>
                  <p className="text-[#D4AF37] font-bold text-xl tracking-[0.1em]">094 215 3511</p>
                </div>
              </div>
            </div>
          </div>

          {/* Cột 3: CTA & Socials */}
          <div className="flex flex-col items-end gap-10">
            <Link href="/booking">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-2xl bg-gradient-to-br from-[#D4AF37] to-[#B38F24] text-black font-black tracking-widest text-sm shadow-[0_20px_40px_rgba(212,175,55,0.2)] flex items-center gap-3"
              >
                ĐẶT LỊCH NGAY <ChevronRight size={20} />
              </motion.button>
            </Link>

            <div className="flex flex-col items-end gap-4">
               <p className="text-[10px] text-white/20 uppercase tracking-[0.4em]">Theo dõi chúng tôi</p>
               <div className="flex gap-3">
                  <SocialIcon href="#" bg="bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/10" size="w-12 h-12"><Facebook size={20} /></SocialIcon>
                  <SocialIcon href="#" bg="bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/10" size="w-12 h-12"><Instagram size={20} /></SocialIcon>
                  <SocialIcon href="#" bg="bg-white/5 hover:bg-[#D4AF37] hover:text-black border border-white/10" size="w-12 h-12">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>
                  </SocialIcon>
               </div>
            </div>
          </div>

        </div>

        {/* Bản quyền chân trang */}
        <div className="mt-20 pt-8 border-t border-white/5 flex justify-between items-center text-[10px] text-white/20 uppercase tracking-[0.2em]">
           <p>© 2025 Night Nail Studio. All Rights Reserved.</p>
           <p className="font-serif italic capitalize">Design for Luxury Artistry</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ href, children, bg, size = "w-8 h-8" }: any) => (
  <Link
    href={href}
    className={`${size} ${bg} rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg`}
  >
    {children}
  </Link>
);