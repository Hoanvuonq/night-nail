"use client";
import { Button } from "@/components";
import { SocialIcon } from "@/components/socialIcon";
import { motion } from "framer-motion";
import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const FooterInfoItem = ({
  icon: Icon,
  title,
  content,
  isGold = false,
  href,
}: any) => {
  const contentNode = (
    <div className="flex items-start gap-4 group">
      <div className="p-2.5 rounded-xl bg-[#fff0f3] text-[#ff7ba9] group-hover:bg-[#ff7ba9] group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
        <Icon size={18} />
      </div>
      <div className="space-y-1 text-left">
        <p className="text-[9px] text-zinc-400 uppercase tracking-[0.2em] font-bold">
          {title}
        </p>
        <p
          className={`tracking-wide transition-colors ${isGold
            ? "text-[#ff7ba9] font-bold text-lg md:text-xl"
            : "text-zinc-600 text-sm font-medium"
            } ${href ? 'hover:underline cursor-pointer hover:text-[#ff7ba9]' : ''}`}
        >
          {content}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={href.startsWith('http') ? "_blank" : undefined}
        rel={href.startsWith('http') ? "noreferrer" : undefined}
        className="block"
      >
        {contentNode}
      </Link>
    );
  }
  return contentNode;
};

const TikTokIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
  </svg>
);

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="w-full overflow-hidden relative bg-[#FBFAF8] border-t border-zinc-100 font-sans mt-6">
      <div className="absolute top-0 left-1/4 w-96 h-64 bg-[#ff7ba9]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="lg:hidden w-full py-12 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white/60 backdrop-blur-2xl rounded-[40px] p-8 border border-white shadow-[0_20px_50px_rgba(255,123,169,0.1)] space-y-8 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#fff0f3] rounded-full border border-[#fce9eb]">
            <Sparkles size={12} className="text-[#ff7ba9]" />
            <span className="text-[10px] text-[#ff7ba9] font-bold tracking-[0.2em] uppercase">
              Premium Studio
            </span>
          </div>

          <div className="space-y-4 flex flex-col items-center">
            <div className="w-80 h-80 rounded-[35px] p-1 bg-white shadow-xl border border-[#fce9eb] overflow-hidden">
              <div className="w-full h-full relative rounded-[30px] overflow-hidden bg-zinc-50">
                <Image
                  src="/images/logo/ha_ant1.png"
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
            <Link
              href="https://maps.app.goo.gl/GAyXPHR2MFohskex6"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-2 text-xs text-zinc-500 font-medium hover:text-[#ff7ba9] transition-colors group"
            >
              <MapPin size={14} className="text-[#ff7ba9] group-hover:scale-110 transition-transform" />
              <p className="group-hover:underline">378/12 Thống Nhất, Phường 16, Quận Gò Vấp, TP.HCM</p>
            </Link>
            <Link
              href="tel:0942153511"
              className="flex items-center justify-center gap-2 text-sm text-zinc-800 hover:text-[#ff7ba9] transition-colors group"
            >
              <Phone size={14} className="text-[#ff7ba9] group-hover:scale-110 transition-transform" />
              <p className="font-bold tracking-widest uppercase group-hover:underline">094 215 3511</p>
            </Link>
          </div>

          <div className="flex justify-center gap-4">
            {[
              { icon: Facebook, href: "https://www.facebook.com/Hoanvuonq.25/" },
              { icon: Instagram, href: "#" },
              { icon: TikTokIcon, href: "#" },
            ].map(({ icon: Icon, href }, idx) => (
              <SocialIcon
                key={idx}
                href={href}
                bg="bg-white border border-zinc-100 text-zinc-400 hover:text-[#ff7ba9] hover:shadow-md transition-all shadow-sm"
              >
                <Icon size={18} />
              </SocialIcon>
            ))}
          </div>

          <Link href="/booking" className="block pt-2">
            <Button label="Đặt Lịch Ngay" className="w-full py-6 rounded-2xl shadow-[0_8px_20px_-8px_rgba(255,123,169,0.6)]" />
          </Link>
        </motion.div>
      </div>

      {/* --- DESKTOP FOOTER --- */}
      <div className="hidden lg:block w-full max-w-7xl mx-auto py-10 px-8 relative z-10">
        <div className="flex items-center justify-between gap-12">
          {/* Left: Logo */}
          <div className="relative group shrink-0">
            <div className="absolute -inset-10 bg-[#ff7ba9]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full duration-1000" />
            <div className="relative w-60 h-60 p-4">
              <Image
                src="/images/logo/ha_ant1.png"
                alt="Night Nail Art"
                fill
                className="object-contain p-6"
                priority
              />
            </div>
          </div>

          {/* Center: Info */}
          <div className="flex-1 px-8 border-l border-zinc-100 space-y-8">
            <div className="space-y-1">
              <motion.h1
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="text-6xl pacifico-regular-font italic text-[#ff7ba9]"
              >
                Night Nail
              </motion.h1>
              {/* <p className="text-[13px] text-zinc-400 uppercase tracking-[0.5em] font-bold px-1">
                Beauty & Artistry
              </p> */}
            </div>

            <div className="grid grid-cols-2 gap-x-6 gap-y-5">
              <FooterInfoItem
                icon={MapPin}
                title="Địa chỉ studio"
                content="378/12 Thống Nhất, Phường 16, Quận Gò Vấp, TP.HCM"
                href="https://maps.app.goo.gl/GAyXPHR2MFohskex6"
              />
              <FooterInfoItem
                icon={Phone}
                title="Hotline đặt lịch"
                content="094 215 3511"
                isGold
                href="tel:0942153511"
              />
              <FooterInfoItem
                icon={ShieldCheck}
                title="Chính sách"
                content="Bảo hành 7 ngày"
              />
              <FooterInfoItem
                icon={Mail}
                title="Email hỗ trợ"
                content="thiyha24c@gmail.com"
                href="mailto:thiyha24c@gmail.com"
              />
            </div>
          </div>

          {/* Right: CTA & Social */}
          <div className="flex flex-col items-end gap-16 shrink-0">
            <Link href={"tel:0942153511"}>
              <Button label="Đặt Lịch Ngay" className="shadow-[0_8px_20px_-8px_rgba(255,123,169,0.6)]" />
            </Link>

            <div className="space-y-5 text-right">
              <p className="text-xs text-[#ff7ba9] uppercase tracking-widest text-title font-bold">
                Theo dõi em nhé
              </p>
              <div className="flex gap-4 justify-end">
                {[
                  { icon: Facebook, href: "https://www.facebook.com/profile.php?id=61582028941579" },
                  { icon: Instagram, href: "https://www.instagram.com/hal.ipt02" },
                  { icon: TikTokIcon, href: "https://www.tiktok.com/@night.nail24" },
                ].map(({ icon: Icon, href }, idx) => (
                  <SocialIcon
                    key={idx}
                    href={href}
                    size="w-14 h-14"
                    bg="bg-white hover:bg-[#fff0f3] text-zinc-400 hover:text-[#ff7ba9] border border-zinc-100 shadow-sm transition-all duration-300"
                  >
                    <Icon size={22} />
                  </SocialIcon>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pb-8">
        <div className="mt-4 playpen-sans pt-6 border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-400 uppercase tracking-widest font-bold text-center md:text-left">
          <p className="flex items-center justify-center md:justify-start gap-1 w-full md:w-auto">
            <span className="text-lg leading-none">©</span> {currentYear} Night Nail Studio. All Rights Reserved.
          </p>
          <div className="flex items-center justify-center md:justify-end gap-2 text-zinc-400 w-full md:w-auto">
            <span className="capitalize text-xs tracking-normal">
              Designed with <span className="text-[#ff7ba9] animate-pulse">❤️</span> by{" "}
              <Link
                href="https://www.facebook.com/Hoanvuonq.25/"
                target="_blank"
                rel="noreferrer"
                className="text-[#ff7ba9] font-bold hover:underline transition-all"
              >
                Coder: Hoanvuonq
              </Link>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};  