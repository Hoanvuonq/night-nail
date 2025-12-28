"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Video } from "../_components/Video";
import { Pricing } from "../_components/Pricing";
import { SERVICE_PRICING } from "@/contants/service";

export const ServiceScreen = () => {
  return (
    <section className="w-full py-20 px-6 bg-[#050505] text-white relative overflow-hidden">
      {/* Background Decor: Những đám mây màu Rose Gold mờ ảo */}
      <div className="absolute top-1/4 left-0 w-64 h-64 bg-[#D4AF37]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-[#F4D8CD]/5 blur-[100px] rounded-full" />

      <div className="max-w-7xl mx-auto flex flex-col gap-20 relative z-10">
        {/* Header Video với khung bo tròn cực đại */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="w-full relative group"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] to-[#F4D8CD] rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition" />
          <Video />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Cột trái: Brand & Chú cún dễ thương */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
            <motion.div
              animate={{
                y: [0, -15, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              <div className="absolute inset-0 bg-[#D4AF37]/20 blur-3xl rounded-full" />
              <Image
                src="/images/service/icon-dogs.png"
                height={220}
                width={220}
                alt="Night Nail Puppy"
                className="relative z-10 drop-shadow-[0_20px_50px_rgba(212,175,55,0.4)]"
              />
              <div className="absolute -bottom-2 -right-2 bg-white text-black text-[10px] font-bold px-3 py-1 rounded-full shadow-lg rotate-12">
                Woof! ✨
              </div>
            </motion.div>

            <div className="space-y-4">
              <h1 className="text-6xl md:text-8xl text-[#D4AF37] pacifico-regular-font leading-tight drop-shadow-glow">
                Night Nail
              </h1>
              <p className="text-xl text-white/60 font-serif italic leading-relaxed max-w-md">
                "Nơi những bộ móng xinh được nâng niu bằng cả trái tim và sự
                ngọt ngào."
              </p>
            </div>

            <div className="flex gap-4 pt-4">
              <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-[#D4AF37] animate-bounce">
                <span>⭐</span>
              </div>
              <p className="text-sm text-[#D4AF37] font-bold tracking-widest uppercase flex items-center">
                Uy tín - Tận tâm - Dễ thương
              </p>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-8">
            <Pricing title="Dịch Vụ Móng Xinh" items={SERVICE_PRICING.NAIL} />
            <Pricing title="Combo Ngọt Ngào" items={SERVICE_PRICING.COMBO} />
            <Pricing title="Nail Design Art" items={SERVICE_PRICING.DESIGN} />

            <motion.div
              whileHover={{ x: 10 }}
              className="p-6 rounded-[2rem] bg-[#D4AF37]/5 border border-[#D4AF37]/20 flex items-center gap-4 group"
            >
              <span className="text-3xl group-hover:scale-125 transition-transform">
                🎁
              </span>
              <p className="text-sm italic text-white/50 leading-relaxed">
                Tất cả dịch vụ đều đi kèm khăn nóng thư giãn và massage dưỡng
                ẩm. <br />
                Bảo hành móng xinh tận{" "}
                <span className="text-[#D4AF37] font-bold">7 ngày</span> cho
                nàng yên tâm!
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};
