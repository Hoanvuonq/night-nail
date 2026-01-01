"use client";
import { ShieldCheck, Sparkles, Wand2, ThermometerSnowflake } from "lucide-react";

export const WhyChooseUs = () => {
  const features = [
    { 
      icon: <ShieldCheck size={32} />, 
      title: "Tiệt Trùng Y Tế", 
      desc: "Dụng cụ được khử khuẩn 100% bằng máy chuẩn y khoa trước khi sử dụng." 
    },
    { 
      icon: <Wand2 size={32} />, 
      title: "Sơn Cao Cấp", 
      desc: "Sử dụng các dòng sơn chính hãng từ Hàn & Nhật, bền màu và an toàn tuyệt đối." 
    },
    { 
      icon: <ThermometerSnowflake size={32} />, 
      title: "Khăn Nóng Thư Giãn", 
      desc: "Mọi dịch vụ đều đi kèm massage khăn nóng giúp nàng xua tan mệt mỏi." 
    },
    { 
      icon: <Sparkles size={32} />, 
      title: "Bảo Hành 7 Ngày", 
      desc: "Sẵn sàng sửa chữa miễn phí nếu có bất kỳ vấn đề gì về độ bền của móng." 
    },
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[120px] rounded-full" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl md:text-6xl font-serif text-black leading-tight">
              Tại sao nàng nên chọn <br />
              <span className="text-[#D4AF37] italic">Night Nail?</span>
            </h2>
            <p className="text-black/50 text-lg font-light leading-relaxed font-serif italic">
              "Chúng tôi không chỉ làm móng, chúng tôi tạo ra những trải nghiệm nghỉ ngơi đúng nghĩa giữa lòng phố thị."
            </p>
            <button className="px-10 py-4 rounded-full border border-[#D4AF37] text-[#D4AF37] font-bold uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">
               Tìm hiểu về chúng tôi
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-white/[0.02] border border-white/5 hover:border-[#D4AF37]/30 transition-all group">
                <div className="text-[#D4AF37] mb-6 group-hover:scale-110 transition-transform duration-500">
                  {f.icon}
                </div>
                <h4 className="text-black font-bold mb-3 uppercase tracking-tighter">{f.title}</h4>
                <p className="text-black/40 text-sm leading-relaxed italic">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};