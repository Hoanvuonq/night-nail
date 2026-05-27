"use client";
import { motion } from "framer-motion";
import { Gem, Sparkles, Heart } from "lucide-react";
import { TitleSection } from "@/components/TitleSection";
import { DATA_QUALITY_COMMITMENTS } from "./type";

export const QualityCommitment = () => {
  return (
    <section className="py-12 md:py-16 px-6 max-w-7xl mx-auto relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff7ba9]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#f4c7cc]/20 blur-[80px] rounded-full pointer-events-none" />

      <TitleSection
        tagIcon={<Heart size={14} className="text-[#ff7ba9] fill-current" />}
        tagText="NIGHT NAIL PROMISE"
        titleNormal="Cam kết"
        titleHighlight={
          <span className="relative">
            chất lượng vàng
            <span className="absolute -top-4 -right-8 flex text-[#ff7ba9] opacity-70">
              <Sparkles size={24} className="animate-pulse" />
            </span>
          </span>
        }
        className="mb-20"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10 max-w-5xl mx-auto">
        {/* SVG curved timeline line behind the circles */}
        <div className="hidden lg:block absolute top-[45px] left-[12%] right-[12%] h-12 -z-10 pointer-events-none">
          <svg width="100%" height="100%" viewBox="0 0 1000 100" preserveAspectRatio="none" className="text-[#ff7ba9] opacity-30">
            <path d="M0,50 Q250,10 500,50 T1000,50" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 8" />
          </svg>
        </div>

        {DATA_QUALITY_COMMITMENTS.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            className="group flex flex-col items-center text-center"
          >
            <div className="relative mb-6">
              <div className="w-24 h-24 rounded-full bg-white border border-[#ff7ba9]/20 shadow-[0_10px_30px_-10px_rgba(255,123,169,0.2)] flex flex-col items-center justify-center text-[#ff7ba9] group-hover:scale-110 transition-transform duration-500 relative z-10 bg-linear-to-b from-white to-[#fff5f4]">
                <div className="scale-125 group-hover:-translate-y-1 transition-transform duration-500">
                  {item.icon}
                </div>
              </div>
              <div className="absolute inset-0 rounded-full border border-[#ff7ba9]/40 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-125 transition-all duration-700" />
            </div>

            <h3 className="text-zinc-800 font-bold mb-3 text-[15px] group-hover:text-[#ff7ba9] transition-colors max-w-[200px]">
              {item.title}
            </h3>

            <p className="text-zinc-500 text-[13px] leading-relaxed font-medium">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};