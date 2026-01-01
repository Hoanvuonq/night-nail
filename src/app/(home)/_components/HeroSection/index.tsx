"use client";

import Image from "next/image";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  Variants,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import { Button } from "@/components"; // Đảm bảo đường dẫn đúng

// --- 1. DEFINITIONS (Move outside component to prevent re-creation) ---

const blobVariants: Variants = {
  animate: {
    borderRadius: [
      "42% 58% 70% 30% / 45% 45% 55% 55%",
      "56% 44% 30% 70% / 50% 54% 46% 50%",
      "40% 60% 54% 46% / 49% 60% 40% 51%",
      "42% 58% 70% 30% / 45% 45% 55% 55%",
    ],
    transition: {
      duration: 10, // Tăng time lên để mượt hơn, đỡ giật
      repeat: Infinity,
      ease: "linear", // Linear đỡ tốn tính toán hơn easeInOut cho loop dài
    },
  },
  hover: {
    scale: 1.02,
    rotate: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const floatingBubble: Variants = {
  animate: {
    y: [0, -20, 0],
    x: [0, 10, 0],
    transition: { duration: 5, repeat: Infinity, ease: "easeInOut" },
  },
};

// --- 2. COMPONENT ---

export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);

  // Optimize Scroll Performance
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax nhẹ nhàng hơn, dùng spring để khử rung
  const yParallax = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 50,
    damping: 20,
  });

  return (
    <section
      ref={containerRef}
      className="bg-cream-luxury relative flex items-center justify-center overflow-hidden px-6 py-20 sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-40">
        <motion.div
          animate={{
            transform: [
              "translate(0px, 0px) scale(1)",
              "translate(20px, -20px) scale(1.1)",
              "translate(0px, 0px) scale(1)",
            ],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -right-[10%] -top-[10%] h-125 w-125 rounded-full bg-amber-200/40 blur-[100px]"
        />
        {/* Blob 2 */}
        <motion.div
          animate={{
            transform: [
              "translate(0px, 0px) scale(1)",
              "translate(-30px, 30px) scale(1.2)",
              "translate(0px, 0px) scale(1)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[5%] h-100 w-100 rounded-full bg-amber-100/50 blur-[80px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      </div>

      <div className="z-10 grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
        
        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white/60 px-5 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse text-amber-500" />
              <span className="text-[10px] font-bold tracking-[0.3em] text-amber-600 uppercase">
                Premium Nail Art Studio
              </span>
            </div>

            <div className="relative mb-8 select-none">
              <h1 className="text-6xl font-black leading-44 tracking-widest md:text-7xl lg:text-8xl xl:text-[9rem] pacifico-regular-font">
                <span className="text-stroke-gold block text-transparent opacity-20">
                  Night
                </span>
                <span className="relative inline-block bg-linear-to-br from-[#D4AF37] via-[#F3E5AB] to-[#C5A028] bg-clip-text text-transparent drop-shadow-sm">
                  Nail
                  <motion.span
                    variants={floatingBubble}
                    animate="animate"
                    className=" -top-4 text-4xl mr-10 lg:text-5xl"
                  >
                    ✨
                  </motion.span>
                </span>
              </h1>
            </div>

            {/* Quote */}
            <p className="mb-12 max-w-md border-l-4 border-amber-400 pl-6 text-lg font-medium italic leading-relaxed text-zinc-600 lg:mx-0 mx-auto">
              "Nơi mỗi bộ móng là một vệt màu của cảm xúc, tan chảy như làn nước
              lung linh."
            </p>

            {/* CTA Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button label="Đặt Lịch Ngay" className="shadow-amber-200/50 shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        {/* --- RIGHT IMAGE (Parallax & Morphing) --- */}
        <div className="order-1 flex w-full justify-center lg:order-2 lg:justify-end">
          <motion.div
            style={{ y: yParallax }}
            className="relative aspect-square w-full max-w-150 lg:scale-105"
          >
            {/* Blob Background Behind Image */}
            <motion.div
              variants={blobVariants}
              animate="animate"
              className="will-change-transform absolute inset-0 -z-10 scale-105 border border-amber-200/40 bg-white/20 blur-md"
            />

            <motion.div
              variants={blobVariants}
              animate="animate"
              whileHover="hover"
              className="will-change-transform group relative h-full w-full cursor-pointer overflow-hidden border-[6px] border-white bg-white shadow-2xl"
            >
              <Image
                src="/images/news/product-01.png"
                alt="Nail Art Design"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 "
                priority
              />

              {/* Artisan Badge (Optimized position) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 }}
                className="absolute bottom-8 left-8 z-20"
              >
                <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/30 p-2 text-center shadow-xl backdrop-blur-md">
                  <div className="flex flex-col items-center">
                    <span className="mb-1 text-[7px] font-black leading-none text-amber-700 uppercase">
                      Artisan
                    </span>
                    <span className="text-[9px] font-bold leading-tight text-zinc-800">
                      Night Nail
                    </span>
                  </div>
                  {/* Rotating Border */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    className="absolute inset-0 rounded-full border border-dashed border-amber-500/40"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Decor Bubble */}
            <motion.div
              variants={floatingBubble}
              animate="animate"
              className="absolute -right-4 -top-8 flex h-20 w-20 items-center justify-center rounded-full border border-amber-100 bg-white/40 shadow-inner backdrop-blur-sm"
            >
              <div className="h-5 w-5 rounded-full bg-amber-200/60 blur-[2px]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}