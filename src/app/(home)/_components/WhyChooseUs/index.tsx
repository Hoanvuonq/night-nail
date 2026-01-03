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
      color: "bg-amber-100 text-[#D4AF37]", // Đổi sang tông vàng hổ phách
      badge: "Best-Seller"
    },
    {
      icon: <Stars className="w-6 h-6" />,
      title: "Nghệ Thuật Chibi",
      desc: "Vẽ hoạt hình, đính đá công chúa, mọi yêu cầu dễ thương đều được đáp ứng.",
      color: "bg-yellow-100 text-[#B8860B]", // Vàng sậm hơn một chút
      badge: "Cute Art"
    },
    {
      icon: <Coffee className="w-6 h-6" />,
      title: "Góc Nhỏ Chill",
      desc: "Không gian thơm nến, có trà và bánh ngọt đợi nàng đến thư giãn.",
      color: "bg-orange-50 text-[#D97706]", 
      badge: "Sweetie"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Chăm Sóc Tận Tâm",
      desc: "Lắng nghe sở thích, tư vấn form móng xinh xắn phù hợp với bàn tay nàng.",
      color: "bg-amber-50 text-[#D4AF37]",
      badge: "Princess"
    }
  ];

  return (
    <section className="bg-[#FBFAF8] relative overflow-hidden font-sans">
      <div className="absolute top-10 right-10 opacity-10 rotate-12">
        <Sparkles size={120} className="text-[#D4AF37] fill-[#D4AF37]/20" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          
          <div className="lg:w-1/2 space-y-6 text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100"
            >
              <Sparkles size={16} className="text-[#D4AF37]" />
              <span className="text-xs font-bold text-[#D4AF37] uppercase tracking-widest">Sương cướp nơi nhất</span>
            </motion.div>

            <div className="space-y-2">
              <h2 className="text-5xl md:text-7xl font-bold text-zinc-800 leading-tight">
                Thế Giới Móng Tay <br />
                <span className="text-[#D4AF37] italic">Có Tích</span>
              </h2>
            </div>

            <p className="text-zinc-500 text-lg font-medium leading-relaxed max-w-md italic">
              "Nơi mỗi bộ móng là một câu chuyện cổ tích ngọt ngào dành riêng cho nàng."
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[#D4AF37] text-white rounded-[2rem] font-bold shadow-lg shadow-amber-200/50 hover:bg-[#B8860B] transition-all flex items-center gap-2"
            >
              Tìm hiểu thêm <Heart size={18} fill="white" />
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
                  "p-8 rounded-[3rem] bg-white border-4 border-amber-50 shadow-xl shadow-amber-900/5 group relative overflow-hidden h-70",
                  i % 2 !== 0 ? "sm:mt-8" : ""
                )}
              >
                {/* Badge góc trên màu vàng nhẹ */}
                <span className="absolute top-4 right-6 text-[9px] font-bold px-3 py-1 bg-amber-50 text-[#D4AF37] rounded-full">
                  {item.badge}
                </span>

                <div className={cn(
                  "w-14 h-14 rounded-[1.5rem] flex items-center justify-center mb-6 transition-all group-hover:scale-110",
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
                <div className="absolute -bottom-2 -right-2 opacity-5 group-hover:opacity-20 transition-opacity">
                   <Sparkles size={60} className="text-[#D4AF37]" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};