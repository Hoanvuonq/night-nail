"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  ChevronRight,
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/socialIcon";

const FooterInfoItem = ({ icon: Icon, title, content, isGold = false }: any) => (
  <div className="flex items-start gap-4 group">
    <div className="p-2 rounded-lg bg-black/5 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-300">
      <Icon size={18} />
    </div>
    <div className="space-y-1 text-left">
      <p className="text-[10px] text-black/30 uppercase tracking-[0.2em] font-bold">{title}</p>
      <p className={`font-light tracking-wide ${isGold ? "text-[#D4AF37] font-bold text-xl" : "text-black/70 text-sm"}`}>
        {content}
      </p>
    </div>
  </div>
);

const TikTokIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-fulloverflow-hidden relative border-t border-black/5 font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- MOBILE FOOTER CARD --- */}
      <div className="md:hidden w-full py-12 px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-linear-to-b from-black/10 to-transparent backdrop-blur-xl rounded-[40px] p-8 border border-black/10 shadow-2xl space-y-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#D4AF37]/20 rounded-full border border-[#D4AF37]/30">
            <Sparkles size={10} className="text-[#D4AF37]" />
            <span className="text-[9px] text-[#D4AF37] font-bold tracking-[0.2em] uppercase">Premium Studio</span>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full p-1 border-2 border-[#D4AF37]/30">
              <div className="w-full h-full relative rounded-full overflow-hidden bg-black/40">
                <Image src="/images/logo/ha_ant.png" alt="Night Nail" fill className="object-cover scale-110" />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-4xl pacifico-regular-font text-[#D4AF37]">Night Nail</h2>
              <p className="text-[10px] text-black/30 uppercase tracking-[0.4em]">Beauty & Artistry</p>
            </div>
          </div>

          <div className="space-y-4 border-y border-black/5 py-6">
            <div className="flex items-center justify-center gap-2 text-sm text-black/60">
              <MapPin size={14} className="text-[#D4AF37]" />
              <p>302/32 Phan Huy Ích, Q.Gò Vấp, HCM</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-black">
              <Phone size={14} className="text-[#D4AF37]" />
              <p className="font-bold tracking-widest">094 215 3511</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {[Facebook, Instagram, TikTokIcon].map((Icon: any, idx) => (
              <SocialIcon key={idx} href="#" bg="bg-black/5 border border-black/10 text-black hover:text-[#D4AF37]">
                <Icon size={16} />
              </SocialIcon>
            ))}
          </div>

          <Link href="/booking" className="block">
            <motion.button whileTap={{ scale: 0.96 }} className="w-full py-4 rounded-2xl bg-linear-to-r from-[#D4AF37] to-[#B38F24] text-black font-black text-sm shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2 uppercase tracking-widest">
              Đặt Lịch Ngay <ChevronRight size={16} />
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* --- DESKTOP FOOTER --- */}
      <div className="hidden md:block w-full max-w-7xl mx-auto py-16 px-12 relative z-10">
        <div className="flex items-center justify-between gap-16">
          {/* Logo Section */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-4 bg-[#D4AF37]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full duration-700" />
            <div className="relative w-64 h-64">
              <Image src="/images/logo/ha_ant.png" alt="Night Nail Art" fill className="object-contain" priority />
            </div>
          </div>

          {/* Info Section */}
          <div className="flex-1 px-12 border-l border-black/10 space-y-10">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-6xl pacifico-regular-font text-transparent bg-clip-text bg-linear-to-r from-[#D4AF37] via-[#FFF1B8] to-[#D4AF37]"
            >
              Night Nail
            </motion.h1>

            <div className="grid gap-6">
              <FooterInfoItem icon={MapPin} title="Địa chỉ studio" content="302/32 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM" />
              <FooterInfoItem icon={Mail} title="Email hỗ trợ" content="thiyha24c@gmail.com" />
              <FooterInfoItem icon={Phone} title="Hotline đặt lịch" content="094 215 3511" isGold />
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-end gap-12 shrink-0">
            <Link href="/booking">
              <motion.button 
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="px-10 py-5 rounded-[20px] bg-linear-to-br from-[#D4AF37] to-[#B38F24] text-black font-black tracking-[0.2em] text-xs shadow-2xl shadow-[#D4AF37]/20 flex items-center gap-3 transition-shadow duration-500 uppercase"
              >
                Đặt Lịch Ngay <ChevronRight size={18} />
              </motion.button>
            </Link>

            <div className="space-y-4 text-right">
               <p className="text-[10px] text-black/20 uppercase tracking-[0.4em] font-bold">Theo dõi chúng tôi</p>
               <div className="flex gap-3 justify-end">
                  {[Facebook, Instagram, TikTokIcon].map((Icon: any, idx) => (
                    <SocialIcon key={idx} href="#" size="w-12 h-12" bg="bg-black/5 hover:bg-[#D4AF37] hover:text-black border border-black/10 transition-all duration-300">
                      <Icon size={20} />
                    </SocialIcon>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-20 pt-8 border-t border-black/5 flex justify-between items-center text-[9px] text-black/20 uppercase tracking-[0.3em] font-medium">
           <p>© {currentYear} Night Nail Studio. All Rights Reserved.</p>
           <div className="flex items-center gap-4">
              <span className="w-1.5 h-1.5 bg-[#D4AF37]/20 rounded-full" />
              <p className="font-serif italic capitalize text-[11px] text-black/40">Design for Luxury Artistry</p>
           </div>
        </div>
      </div>
    </footer>
  );
};