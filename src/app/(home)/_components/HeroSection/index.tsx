"use client";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "@/utils/cn";
import { Leaf, MapPin, Sparkles } from "lucide-react";

export default function HeroSection() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);

  return (
    <section
      id="home"
      className="relative flex flex-col md:flex-row items-start justify-between max-w-7xl mx-auto px-6 py-12 md:py-20 gap-16 overflow-hidden"
    >
      <h2 className="sr-only">
        Night Nail - Tiệm Nail cao cấp Gò Vấp, dịch vụ làm móng chuyên nghiệp
        tại TP.HCM
      </h2>

      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col items-center md:items-start w-full md:w-3/5 z-10"
      >
        <header className="space-y-4 text-center md:text-left">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-sm tracking-[0.2em] uppercase mb-4"
          >
            <Sparkles size={14} /> <span>The Art of Beauty</span>
          </motion.div>

          <h1 className="leading-[1.1] text-6xl md:text-[7.5rem] font-bold text-white tracking-tighter">
            Night{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-b from-[#D4AF37] to-[#B38F24] drop-shadow-sm">
              Nail
            </span>
          </h1>

          <div className="relative group">
            <p className="pacifico-regular-font text-3xl md:text-5xl text-white/90 leading-tight">
              Nghệ thuật của riêng bạn.
            </p>
            <div className="absolute -bottom-2 left-0 w-0 h-0.5 bg-[#D4AF37] group-hover:w-full transition-all duration-700 opacity-50" />
          </div>
        </header>

        <div className="mt-12 space-y-8 w-full">
          <address className="not-italic space-y-3">
            <div className="flex items-center justify-center md:justify-start gap-3 group">
              <div className="p-2 rounded-lg bg-white/5 group-hover:bg-[#D4AF37]/20 transition-colors">
                <MapPin size={20} className="text-[#D4AF37]" />
              </div>
              <div>
                <p className="text-xs tracking-[0.3em] uppercase text-[#D4AF37]/70 font-bold">
                  Vị Trí Studio
                </p>
                <p className="text-lg text-white/60 font-medium tracking-wide">
                  302/32 Phan Huy Ích, Gò Vấp, TP.HCM
                </p>
              </div>
            </div>
          </address>

          <div className="flex flex-col sm:flex-row items-center gap-5">
            <motion.button
              whileHover={{
                scale: 1.02,
                boxShadow: "0 0 40px rgba(212,175,55,0.4)",
              }}
              whileTap={{ scale: 0.98 }}
              className="px-12 py-5 bg-linear-to-r from-[#D4AF37] via-[#FFD700] to-[#B38F24] text-black font-extrabold uppercase tracking-[0.2em] rounded-2xl shadow-xl transition-all duration-300 min-w-[240px]"
            >
              Đặt Lịch Ngay
            </motion.button>

            <button className="px-8 py-5 text-white/70 hover:text-white transition-colors uppercase tracking-widest text-sm font-bold border-b border-white/10 hover:border-[#D4AF37]">
              Khám phá dịch vụ
            </button>
          </div>
        </div>
      </motion.div>
      <motion.div
        style={{ y: y1 }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "circOut" }}
        className="relative w-full md:w-2/5 flex justify-center md:justify-end"
      >
        <div className="relative w-[320px] h-[480px] md:w-[460px] md:h-[680px]">
          <div className="absolute -inset-10 bg-[#D4AF37]/10 blur-[80px] rounded-full mix-blend-screen opacity-50 animate-pulse" />
          <div className="absolute -top-8 -left-8 w-full h-full border-2 border-[#D4AF37]/20 rounded-t-[140px] rounded-bl-[140px] z-0 hidden md:block" />
          <motion.div
            whileHover={{ y: -10 }}
            className="relative w-full h-full overflow-hidden rounded-t-[140px] rounded-bl-[140px] border-[6px] border-[#151515] shadow-[0_30px_60px_rgba(0,0,0,0.8)] z-10"
          >
            <Image
              src="/images/news/product-01.png"
              alt="Mẫu Nail Art Cao Cấp - Night Nail Gò Vấp"
              fill
              priority
              className="object-cover transition-transform duration-[5s] hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

            <div className="absolute bottom-10 left-10 right-10 p-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl">
              <p className="text-[10px] text-[#D4AF37] tracking-[0.2em] uppercase font-bold">
                Sáng tạo bởi
              </p>
              <p className="text-white text-sm font-serif italic">
                Đội ngũ nghệ nhân Night Nail
              </p>
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [55, 62, 55],
            }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-12 -left-20 z-20 text-[#D4AF37] filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
          >
            <Leaf size={140} fill="currentColor" strokeWidth={1} />
          </motion.div>
        </div>
      </motion.div>

      <div className="absolute -top-20 -left-20 w-[400px] h-[400px] bg-[#D4AF37]/5 blur-[150px] rounded-full z-0" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#D4AF37]/5 blur-[100px] rounded-full z-0" />
    </section>
  );
}
