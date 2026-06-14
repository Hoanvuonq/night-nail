"use client";

import { Button, PinkPawIcon, SectionPage } from "@/components";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  Variants,
} from "framer-motion";
import { Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";


const blobVariants: Variants = {
  animate: {
    borderRadius: [
      "42% 58% 70% 30% / 45% 45% 55% 55%",
      "56% 44% 30% 70% / 50% 54% 46% 50%",
      "40% 60% 54% 46% / 49% 60% 40% 51%",
      "42% 58% 70% 30% / 45% 45% 55% 55%",
    ],
    transition: {
      duration: 10,
      repeat: Infinity,
      ease: "linear",
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


export const HeroSection = () => {
  const containerRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), {
    stiffness: 50,
    damping: 20,
  });

  return (
    <SectionPage
      ref={containerRef}
      id="hero"
      className="relative flex items-center justify-center overflow-hidden "
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
          className="absolute -right-[10%] -top-[10%] h-[400px] w-[400px] md:h-[500px] md:w-[500px] rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            transform: [
              "translate(0px, 0px) scale(1)",
              "translate(-30px, 30px) scale(1.2)",
              "translate(0px, 0px) scale(1)",
            ],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[10%] -left-[5%] h-[300px] w-[300px] md:h-[400px] md:w-[400px] rounded-full blur-[80px]"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04]" />
      </div>

      <div className="z-10 grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">

        <div className="order-2 text-center lg:order-1 lg:text-left">
          <motion.div
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#f4c7cc] bg-white/60 px-5 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles size={14} className="animate-pulse text-[#ff7ba9]" />
              <span className="text-[10px] text-title font-bold tracking-[0.3em] text-[#ff7ba9] uppercase">
                Premium Nail Art Studio
              </span>
            </div>

            <div className="relative mb-6 md:mb-8 select-none flex flex-col items-center lg:items-start w-full">
              <h1 className="flex flex-col relative z-10 pinyon-script-regular text-center lg:text-left">
                <span className="block text-[#ff7ba9] opacity-30 text-[6rem] sm:text-[8rem] md:text-[9rem] lg:text-[11rem] font-normal leading-none -mb-8 sm:-mb-12 md:-mb-14 lg:-mb-16 z-0 drop-shadow-sm">
                  Night
                </span>
                <span className="relative z-10 inline-block text-[6rem] sm:text-[8rem] md:text-[9rem] lg:text-[11rem] font-normal tracking-normal bg-linear-to-br from-[#ff7ba9] to-[#ff4d79] bg-clip-text text-transparent drop-shadow-sm py-8 pr-4 sm:pr-8 -my-4 ml-6 sm:ml-12 lg:ml-24">
                  Nail
                  <span className="absolute top-6 -right-2 sm:top-10 sm:right-0 lg:-right-2 w-6 sm:w-8 lg:w-10">
                    <PinkPawIcon />
                  </span>
                </span>
              </h1>
            </div>

            <p className="mb-12 max-w-md border-l-4 border-[#e9b2b8] pl-6 text-lg font-medium italic leading-relaxed text-zinc-600 lg:mx-0 mx-auto">
              "Nơi mỗi bộ móng là một vệt màu của cảm xúc, tan chảy như làn nước
              lung linh."
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button label="Đặt Lịch Ngay" className="shadow-[#f4c7cc]/50 shadow-lg" />
            </motion.div>
          </motion.div>
        </div>

        <div className="order-1 flex w-full justify-center lg:order-2 lg:justify-end">
          <motion.div
            style={{ y: yParallax }}
            className="relative aspect-square w-full max-w-[300px] sm:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] lg:scale-105"
          >
            <motion.div
              initial={{ borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%" }}
              variants={blobVariants}
              animate="animate"
              className="will-change-transform absolute inset-0 -z-10 scale-105 border border-[#f4c7cc]/40 bg-white/20 blur-md"
            />

            <motion.div
              initial={{ borderRadius: "42% 58% 70% 30% / 45% 45% 55% 55%" }}
              variants={blobVariants}
              animate="animate"
              whileHover="hover"
              className="will-change-transform group relative h-full w-full cursor-pointer overflow-hidden border-[6px] border-[#fff5f4] bg-[#fff5f4] shadow-2xl"
            >
              <Image
                src="/images/news/product-01.jpg"
                alt="Nail Art Design"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-700 "
                priority
                quality={65}
              />

            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-4 left-4 md:bottom-[10%] md:left-[5%] z-30"
            >
              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-white/40 bg-white/30 p-2 text-center shadow-xl backdrop-blur-md">
                <div className="flex flex-col items-center">
                  <span className="mb-1 text-[7px] font-bold leading-none text-[#e9b2b8] uppercase">
                    Artisan
                  </span>
                  <span className="text-[9px] font-bold leading-tight text-zinc-800">
                    Night Nail
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0 rounded-full border border-dashed border-[#e9b2b8]/40"
                />
              </div>
            </motion.div>

            <motion.div
              variants={floatingBubble}
              animate="animate"
              className="absolute top-10 right-20 flex h-20 w-20 items-center justify-center rounded-full border border-[#f8d4d8] bg-white/40 shadow-inner backdrop-blur-sm"
            >
              <div className="h-5 w-5 rounded-full bg-[#f4c7cc]/60 blur-[2px]" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </SectionPage>
  );
}