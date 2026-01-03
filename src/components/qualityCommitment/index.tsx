"use client";
import { motion } from "framer-motion";
import { Gem, Sparkles } from "lucide-react";
import { DATA_QUALITY_COMMITMENTS } from "./type";

export const QualityCommitment = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100/20 blur-[80px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center mb-16 space-y-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-zinc-100 text-[#B8860B] text-[10px] font-black uppercase tracking-[0.3em] shadow-sm"
        >
          <Gem size={12} /> Excellence Standard
        </motion.div>
        
        <h2 className="text-4xl md:text-5xl text-zinc-800  leading-tight">
          Cam kết{" "}
          <span className="text-[#D4AF37] not-italic font-black uppercase tracking-tighter block md:inline">
            Chất lượng Vàng
          </span>
        </h2>
        
        <div className="w-12 h-1 bg-linear-to-r from-transparent via-[#D4AF37] to-transparent rounded-full opacity-30" />
        
        <p className="text-zinc-400 text-sm max-w-md italic font-medium">
          "Tại Night Nail, sức khỏe và sự hài lòng của nàng là ưu tiên hàng đầu
          trong mọi sáng tạo nghệ thuật."
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {DATA_QUALITY_COMMITMENTS.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
            whileHover={{ y: -12 }}
            className="group cursor-pointer relative p-8 rounded-[45px] bg-white border border-zinc-100 overflow-hidden flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(212,175,55,0.1)] transition-all duration-500"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-linear-to-r from-transparent via-[#D4AF37]/5 to-transparent -translate-x-full group-hover:translate-x-full" />

            <div
              className={`mb-6 p-5 rounded-3xl bg-linear-to-br ${item.color} text-white group-hover:rotate-10 transition-all duration-500 shadow-lg shadow-amber-100`}
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {item.icon}
              </div>
            </div>

            <h3 className="text-zinc-800 font-black mb-3 uppercase tracking-widest text-xs group-hover:text-[#B8860B] transition-colors">
              {item.title}
            </h3>
            
            <p className="text-zinc-400 text-[11px] leading-relaxed font-medium">
              {item.desc}
            </p>

            <Sparkles
              size={14}
              className="absolute top-6 right-6 text-zinc-100 group-hover:text-[#D4AF37]/30 transition-colors"
            />
            
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 bg-[#D4AF37] group-hover:w-1/3 transition-all duration-500 rounded-t-full" />
          </motion.div>
        ))}
      </div>
    </section>
  );
};