"use client";
import { motion } from "framer-motion";
import { Heart, Stars, Coffee, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/utils/cn";

export const WhyChooseUs = () => {
  const reasons = [
    {
      icon: <ShieldCheck className="w-6 h-6" />,
      title: "An Tâm Tuyệt Đối",
      desc: "Quy trình khử khuẩn chuẩn y khoa, dụng cụ riêng biệt cho mỗi nàng thơ.",
      color: "bg-[#fce9eb] text-[#ff7ba9]",
      badge: "Best-Seller"
    },
    {
      icon: <Stars className="w-6 h-6" />,
      title: "Nghệ Thuật Chibi",
      desc: "Vẽ hoạt hình, đính đá công chúa, mọi yêu cầu dễ thương đều được đáp ứng.",
      color: "bg-[#fff5f4] text-[#ff4d79]",
      badge: "Cute Art"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Góc Nhỏ Chill",
      desc: "Không gian thơm nến, có trà và bánh ngọt đợi nàng đến thư giãn.",
      color: "bg-[#f4c7cc]/30 text-[#e9b2b8]",
      badge: "Sweetie"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Chăm Sóc Tận Tâm",
      desc: "Lắng nghe sở thích, tư vấn form móng xinh xắn phù hợp với bàn tay nàng.",
      color: "bg-[#fce9eb] text-[#ff7ba9]",
      badge: "Princess"
    }
  ];

  return (
    <section className="bg-[#fff5f4] relative overflow-hidden font-sans py-16">
      <div className="absolute top-10 right-10 opacity-30 rotate-12 pointer-events-none">
        <Sparkles size={120} className="text-[#f4c7cc] fill-[#fce9eb]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div className="lg:w-1/2 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#fce9eb] shadow-sm"
            >
              <Sparkles size={16} className="text-[#ff7ba9]" />
              <span className="text-xs font-bold text-[#ff7ba9] uppercase tracking-widest">Tuyệt vời nhất</span>
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-5xl md:text-7xl font-bold text-zinc-800 leading-tight tracking-tighter">
                Thế Giới Móng Tay <br />
                <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e9b2b8] via-[#ff7ba9] to-[#ff4d79] sriracha-regular pr-4">Cổ Tích</span>
              </h2>
            </div>

            <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-md italic border-l-2 border-[#e9b2b8] pl-6">
              "Nơi mỗi bộ móng là một câu chuyện cổ tích ngọt ngào dành riêng cho nàng."
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 mt-6 bg-linear-to-r from-[#ff7ba9] to-[#ff4d79] text-white rounded-4xl font-bold shadow-[0_10px_30px_-10px_rgba(255,123,169,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(255,123,169,0.6)] transition-all flex items-center gap-2"
            >
              Khám phá ngay <Heart size={18} fill="currentColor" />
            </motion.button>
          </div>

          {/* Cột phải: Grid thẻ bo tròn đồng bộ Gold */}
          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
            {reasons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-8 rounded-[3rem] bg-white border-4 border-[#fce9eb] shadow-[0_20px_60px_-15px_rgba(233,178,184,0.15)] group relative overflow-hidden h-70",
                  i % 2 !== 0 ? "sm:mt-12" : ""
                )}
              >
                {/* Badge góc trên */}
                <span className="absolute top-4 right-6 text-[9px] font-bold px-3 py-1 bg-[#fff5f4] text-[#ff7ba9] border border-[#f4c7cc]/50 rounded-full">
                  {item.badge}
                </span>

                <div className={cn(
                  "w-14 h-14 rounded-3xl flex items-center justify-center mb-6 transition-all group-hover:scale-110",
                  item.color
                )}>
                  {item.icon}
                </div>

                <h4 className="font-bold text-zinc-800 text-lg mb-2">
                  {item.title}
                </h4>

                <p className="text-zinc-500 text-sm leading-relaxed font-medium">
                  {item.desc}
                </p>

                {/* Decor nhỏ xíu góc dưới */}
                <div className="absolute -bottom-2 -right-2 opacity-10 group-hover:opacity-30 transition-opacity">
                  <Sparkles size={60} className="text-[#f4c7cc]" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};