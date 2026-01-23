"use client";
import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Share2, Home, Sparkles, Heart, ShieldCheck, Star } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import html2canvas from "html2canvas";

export const BookingTicket = ({ data, service }: any) => {
  const ticketRef = useRef<HTMLDivElement>(null);
  const [isCapturing, setIsCapturing] = useState(false);

  const handleCapture = async () => {
    if (ticketRef.current) {
      setIsCapturing(true);
      try {
        await new Promise(resolve => setTimeout(resolve, 100));
        
        const canvas = await html2canvas(ticketRef.current, {
          scale: 3,
          backgroundColor: "#FFFAF5",
          useCORS: true,
          logging: false,
          allowTaint: false,
          imageTimeout: 0,
          onclone: (clonedDoc) => {
         
            const el = clonedDoc.getElementById("capture-area");
            if (el) {
              el.style.filter = "none";
              el.style.transform = "none";
            }
          }
        });

        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png", 1.0);
        link.download = `NightNail_VIP_${data.name}.png`;
        link.click();
      } catch (error) {
        console.error("Lỗi capture:", error);
        alert("Nàng ơi, hãy chụp màn hình để lưu vé nhanh nhất nhé! ✨");
      } finally {
        setIsCapturing(false);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center bg-[#FFFAF5] py-6 sm:py-12 min-h-screen px-4"
    >
      <div ref={ticketRef} id="capture-area" className="p-4 sm:p-6 bg-[#FFFAF5] w-full flex justify-center">
        <div 
          className="relative w-full max-w-100 bg-white rounded-[40px] overflow-hidden border border-white shadow-2xl"
          style={{ 
            boxShadow: '0 25px 50px -12px rgba(217, 119, 6, 0.15)',
            border: '1px solid #FFFFFF'
          }}
        >
          <div className="absolute top-0 left-0 w-full h-32" style={{ background: 'linear-gradient(to bottom, #FFFBEB, transparent)' }} />
          
          <div className="relative pt-10 pb-4 px-6 text-center">
            <div className="inline-flex relative mb-4">
              <div className="p-0.5 rounded-full" style={{ background: 'linear-gradient(to tr, #FBBF24, #FB7185)' }}>
                <div className="bg-white p-3 rounded-full">
                  <Heart size={28} style={{ color: "#F43F5E", fill: "#F43F5E" }} />
                </div>
              </div>
              <Sparkles className="absolute -right-2 -top-2" style={{ color: "#FBBF24" }} size={20} />
            </div>
            <h2 className="font-serif italic text-3xl text-[#27272A] leading-none">Tiệm Chờ Nàng!</h2>
            <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#D97706] mt-3 opacity-60">Premium Appointment</p>
          </div>

          <div className="relative px-6 py-2 space-y-5">
            <div className="p-4 rounded-[28px] bg-[#FAFAFA] border border-[#F4F4F5] flex items-center gap-4">
              <div className="relative h-16 w-16 rounded-2xl overflow-hidden shadow-sm shrink-0">
                <Image src={service?.image || "/booking/pricing_menu01.jpg"} alt="nail" fill className="object-cover" unoptimized />
              </div>
              <div className="min-w-0">
                <div className="flex gap-0.5 mb-1">
                  {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={8} style={{ color: "#FBBF24", fill: "#FBBF24" }} />)}
                </div>
                <h4 className="text-sm font-bold text-[#27272A] truncate leading-tight">{service?.title}</h4>
                <p className="text-[10px] text-[#A1A1AA] font-medium uppercase mt-1">Professional Nail Art</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="bg-[#FFF9F5] py-3 px-4 rounded-3xl border border-[#FFEDD5] text-center">
                <span className="text-[8px] font-bold text-[#FB7185] uppercase tracking-widest block mb-0.5">Ngày làm</span>
                <p className="text-[12px] font-bold text-[#3F3F46]">{data.date}</p>
              </div>
              <div className="bg-[#F5F9FF] py-3 px-4 rounded-3xl border border-[#DBEAFE] text-center">
                <span className="text-[8px] font-bold text-[#60A5FA] uppercase tracking-widest block mb-0.5">Giờ hẹn</span>
                <p className="text-[12px] font-bold text-[#3F3F46]">{data.time}</p>
              </div>
            </div>

            {/* Customer Name */}
            <div className="py-2 text-center relative">
              <div className="absolute left-0 right-0 top-1/2 h-px bg-[#F4F4F5] -z-10" />
              <span className="bg-white px-4 text-[10px] font-medium text-[#A1A1AA] uppercase tracking-widest">Khách hàng</span>
              <p className="text-xl font-serif italic text-[#27272A] mt-2">{data.name}</p>
            </div>
          </div>

          <div className="relative flex items-center justify-center py-4">
            <div className="absolute left-3 w-6 h-6 rounded-full bg-[#FFFAF5] border border-[#F4F4F5]" />
            <div className="w-full border-t-2 border-dashed border-[#E4E4E7] mx-8" />
            <div className="absolute right-3 w-6 h-6 rounded-full bg-[#FFFAF5] border border-[#F4F4F5]" />
          </div>

          <div className="px-6 pb-8 space-y-5">
            <div className="flex justify-between items-center bg-[#FFFBEB] p-4 rounded-[28px] border border-[#FEF3C7]">
              <div>
                <span className="text-[9px] font-bold text-[#A1A1AA] uppercase tracking-widest">Tạm tính</span>
                <p className="text-2xl font-bold text-[#18181B] leading-none mt-1">{service?.price}<span className="text-xs ml-0.5 text-[#D97706] font-serif">đ</span></p>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-white text-[#10B981] rounded-full shadow-sm border border-[#D1FAE5]">
                <ShieldCheck size={10} />
                <span className="text-[8px] font-bold uppercase tracking-tighter">Ưu tiên</span>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2 text-[#A1A1AA]">
                <MapPin size={12} style={{ color: "#FB7185" }} />
                <span className="text-[9px] font-medium italic">302/32 Phan Huy Ích, P.12, Gò Vấp</span>
              </div>
              <p className="text-[8px] font-bold text-[#D4D4D8] uppercase tracking-[0.4em]">NightNail Studio</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex gap-3 w-full max-w-95 px-6">
        <button
          onClick={handleCapture}
          className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-2xl bg-[#18181B] text-white text-xs font-bold shadow-lg active:scale-95 transition-all"
        >
          <Share2 size={16} /> {isCapturing ? "ĐANG LƯU..." : "LƯU VÉ VIP"}
        </button>
        <button
          onClick={() => (window.location.href = "/")}
          className="p-3.5 rounded-2xl bg-white border border-[#E4E4E7] text-[#71717A] hover:text-[#18181B] transition-all"
        >
          <Home size={20} />
        </button>
      </div>
    </motion.div>
  );
};