"use client";
import { PinkPawIcon } from "@/components";
import { IServiceProps } from "@/contants/service";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { Sparkles, Star } from "lucide-react";
import Image from "next/image";
import { Button } from "../button";

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
      className={cn(
        "flex items-center w-full justify-between gap-12 md:gap-24",
        `${reverse ? 'xl:flex-row-reverse' : 'xl:flex-row'} `,
        `flex-col md:mb-6 mb-4 relative`,
        index % 2 === 0 ? 'mt-2' : 'mt-1')}
    >
      <div className="relative group shrink-0">
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-10 -left-10 w-20 h-20 rounded-full bg-linear-to-br from-[#e9b2b8]/20 to-transparent blur-xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
          className="absolute -bottom-5 -right-5 w-16 h-16 rounded-full bg-linear-to-tr from-[#FFB6C1]/20 to-transparent blur-lg"
        />

        <div className="absolute -inset-4 border-2 border-dashed border-[#e9b2b8]/30 rounded-full animate-[spin_20s_linear_infinite]" />

        <div className="w-100 h-100 md:w-105 md:h-105 relative z-10 p-3">
          <motion.div
            whileHover={{ scale: 1.05, rotate: [0, -2, 2, 0] }}
            className="w-full h-full relative rounded-full overflow-hidden border-4 border-black/10 shadow-[0_0_40px_rgba(233,178,184,0.2)]"
          >
            <Image
              src={img || "/images/service/service_nail__01.jpg"}
              alt={title}
              fill
              className="object-cover scale-110 transition-transform duration-1000"
            />
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
              <Sparkles className="absolute top-1/4 left-1/4 text-black animate-pulse" size={24} />
              <Star className="absolute bottom-1/3 right-1/4 text-[#ff7ba9] animate-bounce" size={20} />
            </div>
          </motion.div>
        </div>

        <div className="absolute -top-2 right-4 w-14 h-14 bg-linear-to-br from-[#ff7ba9] to-[#e9b2b8] rounded-full z-20 flex flex-col items-center justify-center text-white shadow-lg">
          <span className="text-[10px] font-bold leading-none">Sweet</span>
          <span className="text-xl font-bold italic">0{index}</span>
        </div>
      </div>

      <div className={`flex flex-col gap-6 xl:w-[50%] ${reverse ? 'xl:text-right' : 'xl:text-left'} text-center z-10`}>
        <div className="space-y-2">
          <motion.div
            className={`flex items-center gap-2 ${reverse ? 'xl:justify-end' : 'xl:justify-start'} justify-center`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
          >
            <div className="h-0.5 w-8 bg-[#e9b2b8]" />
            <span className="text-[#e9b2b8] text-[10px] tracking-[0.4em] uppercase font-bold">Lovely Service</span>
            <div className="h-0.5 w-8 bg-[#e9b2b8]" />
          </motion.div>

          <h3 className="text-4xl md:text-5xl font-bold text-[#ff7ba9] leading-tight pacifico-regular-font ">
            <span className="relative inline-block">
              {title}
              <PinkPawIcon size={28} iconClassName="w-8 h-8 md:w-10 md:h-10" className="-top-4 -right-10 md:-top-5 md:-right-12" />
            </span>
          </h3>
        </div>

        <p className="text-md md:text-lg md:w-atuo w-[90%] mx-auto text-gray-600 font-medium italic md:leading-normal leading-relaxed playpen-sans">
          "{description}"
        </p>

        <div className={`pt-4 flex ${reverse ? 'xl:justify-end' : 'xl:justify-start'} justify-center`}>
          <div className="relative group/btn">
            <Button
              label={labelButton}
              className="relative z-10 rounded-full px-12 py-4 hover:shadow-[0_0_20px_rgba(233,178,184,0.5)] transition-all"
            />
            <div className="absolute inset-0 bg-linear-to-r from-[#e9b2b8] to-[#ff7ba9] blur-2xl opacity-0 group-hover/btn:opacity-40 transition-opacity rounded-full" />
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none -z-20">
        <div className="absolute top-1/4 left-1/2 w-2 h-2 bg-[#e9b2b8]/20 rounded-full" />
        <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-black/10 rounded-full" />
      </div>
    </motion.div>
  );
};