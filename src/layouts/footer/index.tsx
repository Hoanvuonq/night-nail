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
  Sparkles,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { SocialIcon } from "@/components/socialIcon";
import { Button } from "@/components";

const FooterInfoItem = ({
  icon: Icon,
  title,
  content,
  isGold = false,
}: any) => (
  <div className="flex items-start gap-4 group">
    <div className="p-2.5 rounded-xl bg-amber-50 text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-all duration-300 shadow-sm">
      <Icon size={18} />
    </div>
    <div className="space-y-1 text-left">
      <p className="text-[9px] text-zinc-400 uppercase tracking-[0.2em] font-black">
        {title}
      </p>
      <p
        className={`tracking-wide transition-colors ${
          isGold 
            ? "text-[#B8860B] font-bold text-lg md:text-xl" 
            : "text-zinc-600 text-sm font-medium"
        }`}
      >
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
    <footer className="w-full overflow-hidden relative bg-[#FBFAF8] border-t border-zinc-100 font-sans mt-10">
      {/* Glow Decor */}
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* --- MOBILE FOOTER --- */}
      <div className="md:hidden w-full py-12 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-2xl rounded-[40px] p-8 border border-white shadow-[0_20px_50px_rgba(212,175,55,0.1)] space-y-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 rounded-full border border-amber-100">
            <Sparkles size={12} className="text-[#D4AF37]" />
            <span className="text-[10px] text-[#B8860B] font-bold tracking-[0.2em] uppercase">
              Premium Studio
            </span>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="w-24 h-24 rounded-[35px] p-1 bg-white shadow-xl border border-amber-50 overflow-hidden">
              <div className="w-full h-full relative rounded-[30px] overflow-hidden bg-zinc-50">
                <Image
                  src="/images/logo/ha_ant.png"
                  alt="Night Nail"
                  fill
                  className="object-cover scale-110 p-2"
                />
              </div>
            </div>
            <div className="space-y-1">
              <h2 className="text-4xl pacifico-regular-font text-zinc-800 italic">
                Night Nail
              </h2>
              <p className="text-[10px] text-zinc-400 uppercase tracking-[0.4em] font-medium">
                Beauty & Artistry
              </p>
            </div>
          </div>

          <div className="space-y-4 border-y border-zinc-100 py-6">
            <div className="flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium">
              <MapPin size={14} className="text-[#D4AF37]" />
              <p>302/32 Phan Huy Ích, Q.Gò Vấp, HCM</p>
            </div>
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-800">
              <Phone size={14} className="text-[#D4AF37]" />
              <p className="font-bold tracking-widest uppercase">094 215 3511</p>
            </div>
          </div>

          <div className="flex justify-center gap-4">
            {[Facebook, Instagram, TikTokIcon].map((Icon: any, idx) => (
              <SocialIcon
                key={idx}
                href="#"
                bg="bg-white border border-zinc-100 text-zinc-400 hover:text-[#D4AF37] hover:shadow-md transition-all shadow-sm"
              >
                <Icon size={18} />
              </SocialIcon>
            ))}
          </div>

          <Link href="/booking" className="block pt-2">
            <Button label="Đặt Lịch Ngay" className="w-full py-6 rounded-2xl shadow-xl shadow-amber-200/50" />
          </Link>
        </motion.div>
      </div>

      {/* --- DESKTOP FOOTER --- */}
      <div className="hidden md:block w-full max-w-7xl mx-auto py-16 px-12 relative z-10">
        <div className="flex items-center justify-between gap-16">
          {/* Left: Logo */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-10 bg-amber-100/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full duration-1000" />
            <div className="relative w-72 h-72 p-6 bg-white rounded-[60px] shadow-2xl border border-zinc-50">
              <Image
                src="/images/logo/ha_ant.png"
                alt="Night Nail Art"
                fill
                className="object-contain p-8"
                priority
              />
            </div>
          </div>

          {/* Center: Info */}
          <div className="flex-1 px-12 border-l border-zinc-100 space-y-12">
            <div className="space-y-2">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-7xl pacifico-regular-font italic text-transparent bg-clip-text bg-linear-to-r from-[#D4AF37] via-[#B8860B] to-[#D4AF37]"
              >
                Night Nail
              </motion.h1>
              <p className="text-[11px] text-zinc-400 uppercase tracking-[0.5em] font-bold px-1">
                Beauty & Artistry
              </p>
            </div>

            <div className="grid gap-8">
              <FooterInfoItem
                icon={MapPin}
                title="Địa chỉ studio"
                content="302/32 Phan Huy Ích, P.12, Q.Gò Vấp, TP.HCM"
              />
              <FooterInfoItem
                icon={Mail}
                title="Email hỗ trợ"
                content="thiyha24c@gmail.com"
              />
              <FooterInfoItem
                icon={Phone}
                title="Hotline đặt lịch"
                content="094 215 3511"
                isGold
              />
            </div>
          </div>

          {/* Right: CTA & Social */}
          <div className="flex flex-col items-end gap-16 shrink-0">
            <Link href="/booking">
              <Button label="Đặt Lịch Ngay" className="px-10 py-7 rounded-[24px] shadow-2xl shadow-amber-200/40" />
            </Link>

            <div className="space-y-5 text-right">
              <p className="text-[10px] text-zinc-300 uppercase tracking-[0.4em] font-black">
                Theo dõi em nhé
              </p>
              <div className="flex gap-4 justify-end">
                {[Facebook, Instagram, TikTokIcon].map((Icon: any, idx) => (
                  <SocialIcon
                    key={idx}
                    href="#"
                    size="w-14 h-14"
                    bg="bg-white hover:bg-amber-50 text-zinc-400 hover:text-[#D4AF37] border border-zinc-100 shadow-sm transition-all duration-300"
                  >
                    <Icon size={22} />
                  </SocialIcon>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-10 border-t border-zinc-100 flex justify-between items-center text-[10px] text-zinc-400 uppercase tracking-[0.3em] font-bold">
          <p className="flex items-center gap-1">
            <span className="text-lg leading-none">©</span> {currentYear} Night Nail Studio. All Rights Reserved.
          </p>
          <div className="flex items-center gap-4">
            <span className="w-1.5 h-1.5 bg-[#D4AF37]/40 rounded-full animate-pulse" />
            <p className="font-serif italic capitalize text-[13px] text-zinc-300">
              Design for Luxury Artistry
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};  