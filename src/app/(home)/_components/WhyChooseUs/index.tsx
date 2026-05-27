"use client";
import { TitleSection } from "@/components";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import { Sparkles, Heart, Palette, HandHeart, MessageCircleHeart, Wand2 } from "lucide-react";

export const WhyChooseUs = () => {
  const reasons = [
    {
      id: "01",
      icon: <MessageCircleHeart className="w-14 h-14" strokeWidth={1} />,
      title: "Tư vấn tận tâm",
      desc: "Lắng nghe sở thích, đưa ra gợi ý phù hợp với phong cách của bạn.",
      color: {
        badgeBg: "bg-[#a855f7]",
        titleText: "text-[#a855f7]",
        borderColor: "border-[#f3e8ff] hover:border-[#a855f7]/30",
        iconColor: "text-[#a855f7]",
        iconPos: "bottom-6 left-6"
      }
    },
    {
      id: "02",
      icon: <Palette className="w-14 h-14" strokeWidth={1} />,
      title: "Nghệ thuật sáng tạo",
      desc: "Mẫu mã đa dạng, luôn cập nhật xu hướng mới nhất.",
      color: {
        badgeBg: "bg-[#ff7ba9]",
        titleText: "text-[#ff7ba9]",
        borderColor: "border-[#fce9eb] hover:border-[#ff7ba9]/30",
        iconColor: "text-[#ff7ba9]",
        iconPos: "bottom-6 right-6"
      }
    },
    {
      id: "03",
      icon: <Wand2 className="w-14 h-14" strokeWidth={1} />,
      title: "Bền đẹp tự nhiên",
      desc: "Kỹ thuật chuẩn xác đem lại bộ móng bền đẹp, không lo hư tổn.",
      color: {
        badgeBg: "bg-[#fbbf24]",
        titleText: "text-[#fbbf24]",
        borderColor: "border-[#fef3c7] hover:border-[#fbbf24]/30",
        iconColor: "text-[#fbbf24]",
        iconPos: "bottom-6 left-6"
      }
    },
    {
      id: "04",
      icon: <HandHeart className="w-14 h-14" strokeWidth={1} />,
      title: "Chăm sóc chu đáo",
      desc: "Hướng dẫn chăm sóc móng tại nhà để luôn giữ được vẻ đẹp lâu dài.",
      color: {
        badgeBg: "bg-[#60a5fa]",
        titleText: "text-[#60a5fa]",
        borderColor: "border-[#dbeafe] hover:border-[#60a5fa]/30",
        iconColor: "text-[#60a5fa]",
        iconPos: "bottom-6 right-6"
      }
    }
  ];

  return (
    <section className="bg-linear-to-br from-[#f3e8ff]/50 via-[#fff5f4]/80 to-[#fce9eb]/60 relative overflow-hidden font-sans py-16">
      <div className="absolute top-10 right-10 opacity-30 rotate-12 pointer-events-none">
        <Sparkles size={120} className="text-[#a855f7]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-center">

          <div className="lg:w-1/2 space-y-6 text-left">
            <TitleSection
              tagIcon={<Sparkles size={14} className="text-[#a855f7] fill-current" />}
              tagText="TAY ĐẸP - TỰ TIN MỖI NGÀY"
              titleNormal="Thế Giới Móng Tay"
              titleHighlight={
                <span className="relative text-transparent bg-clip-text bg-linear-to-r from-[#a855f7] to-[#ff7ba9]">
                  Cổ Tích
                  <span className="absolute -top-1 -right-8 flex text-[#a855f7] opacity-80">
                    <Sparkles size={18} className="animate-pulse" />
                  </span>
                </span>
              }
              description="Không chỉ là làm nail, chúng mình mang đến cho bạn một trải nghiệm thư giãn, xinh đẹp và đầy cảm hứng."
              align="left"
              className="mb-8 md:mb-10"
              titleNormalClassName="text-zinc-800"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-linear-to-r from-[#a855f7] to-[#d946ef] text-white rounded-full font-bold shadow-[0_10px_30px_-10px_rgba(168,85,247,0.5)] hover:shadow-[0_15px_40px_-10px_rgba(168,85,247,0.6)] transition-all flex items-center gap-2"
            >
              Khám phá ngay &rarr;
            </motion.button>

            <div className="flex items-center gap-4 mt-12">
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=1" alt="Avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=2" alt="Avatar" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover shadow-sm" src="https://i.pravatar.cc/100?img=3" alt="Avatar" />
              </div>
              <div className="text-xs text-zinc-500 font-medium">
                <strong className="text-zinc-800 text-sm block">10.000+ khách hàng</strong>
                tin tưởng & yêu thích
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-6 relative p-2 md:p-4">
            <div className="hidden sm:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 bg-white/80 backdrop-blur-md rounded-full shadow-[0_20px_50px_rgba(168,85,247,0.15)] border-4 border-[#f3e8ff] flex-col items-center justify-center z-20">
              <span className="text-[#a855f7] sriracha-regular text-[40px] -rotate-12 leading-none mt-2">Night</span>
              <span className="text-[#a855f7] sriracha-regular text-[40px] -rotate-12 ml-10 leading-none">Nail</span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-10 text-[#a855f7]">
                <Heart size={80} fill="currentColor" />
              </div>
              <div className="absolute top-8 right-6 text-[#ff7ba9] animate-bounce">
                <Heart size={16} />
              </div>
            </div>

            {reasons.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "p-6 md:p-8 rounded-4xl bg-white border-2 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] group relative overflow-hidden h-64 md:h-72 transition-all duration-300",
                  item.color.borderColor
                )}
              >
                <div className="flex items-center gap-3 mb-4 relative z-10">
                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm",
                    item.color.badgeBg
                  )}>
                    {item.id}
                  </div>
                  <h4 className={cn("font-bold text-[16px] md:text-[17px]", item.color.titleText)}>
                    {item.title}
                  </h4>
                </div>

                <p className="text-zinc-500 text-[13px] leading-relaxed font-medium relative z-10">
                  {item.desc}
                </p>

                {/* Icon ở góc */}
                <div className={cn("absolute transition-transform duration-500 group-hover:scale-110", item.color.iconPos, item.color.iconColor)}>
                  {item.icon}
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};