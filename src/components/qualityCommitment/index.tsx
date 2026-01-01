"use client";
import { motion } from "framer-motion";
import { Gem, HeartPulse, ShieldCheck, Sparkles, Wand2 } from "lucide-react";
import { DATA_QUALITY_COMMITMENTS } from "./type";

export const QualityCommitment = () => {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto relative overflow-hidden font-sans">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="flex flex-col items-center text-center mb-16 space-y-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em]"
        >
          <Gem size={12} /> Excellence Standard
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-serif text-white italic">
          Cam kết{" "}
          <span className="text-[#D4AF37] not-italic font-black uppercase tracking-tighter">
            Chất lượng Vàng
          </span>
        </h2>
        <p className="text-white/40 text-sm max-w-md italic">
          "Tại Night Nail, sức khỏe và sự hài lòng của nàng là ưu tiên hàng đầu
          trong mọi sáng tạo."
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {DATA_QUALITY_COMMITMENTS.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="group relative p-8 rounded-[35px] bg-[#111] border border-white/5 overflow-hidden flex flex-col items-center text-center"
          >
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700 bg-linear-to-tr from-transparent via-white/[0.03] to-transparent -translate-x-full group-hover:translate-x-full" />

            <div
              className={`mb-6 p-4 rounded-2xl bg-linear-to-br ${item.color} text-white group-hover:scale-110 transition-transform duration-500 shadow-xl`}
            >
              {item.icon}
            </div>

            <h3 className="text-white font-bold mb-3 uppercase tracking-widest text-sm group-hover:text-[#D4AF37] transition-colors">
              {item.title}
            </h3>
            <p className="text-white/40 text-xs leading-relaxed font-light">
              {item.desc}
            </p>

            <Sparkles
              size={14}
              className="absolute top-6 right-6 text-white/5 group-hover:text-[#D4AF37]/40 transition-colors"
            />
          </motion.div>
        ))}
      </div>

      <div className="mt-16 py-8 border-y border-white/5 flex flex-wrap justify-center gap-x-12 gap-y-6">
        {[
          "100% Tiệt Trùng",
          "Sơn Organic",
          "Bảo Hành Độ Bền",
          "Massage Khăn Nóng",
        ].map((text, i) => (
          <div
            key={i}
            className="flex items-center gap-2 opacity-30 hover:opacity-100 transition-opacity cursor-default"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
            <span className="text-[10px] text-white font-black uppercase tracking-[0.2em]">
              {text}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};
