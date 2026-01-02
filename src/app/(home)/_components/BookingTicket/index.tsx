"use client";
import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, MapPin, Share2, Home } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import html2canvas from "html2canvas";

export const BookingTicket = ({ data, service }: any) => {
  const ticketRef = useRef<HTMLDivElement>(null);

  const handleCapture = async () => {
    if (ticketRef.current) {
      // Ép kiểu render để tránh lỗi color function oklab/lab
      const canvas = await html2canvas(ticketRef.current, { 
        scale: 3, 
        backgroundColor: "#FBFAF8", 
        useCORS: true,
        logging: false,
        onclone: (clonedDoc) => {
          const elements = clonedDoc.getElementsByTagName("*");
          for (let i = 0; i < elements.length; i++) {
            (elements[i] as HTMLElement).style.color = window.getComputedStyle(elements[i]).color;
          }
        }
      });
      
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = `NightNail_Ticket.png`;
      link.click();
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center bg-[#FBFAF8]">
      {/* Vùng chụp ảnh */}
      <div ref={ticketRef} className="p-8 bg-[#FBFAF8] w-full flex justify-center">
        <div 
          className="relative w-full max-w-[400px] bg-white rounded-[40px] shadow-2xl overflow-hidden border" 
          style={{ borderColor: "#fde68a" }} // Fix Hex thay cho Tailwind v4 lab color
        >
          {/* Header Ticket */}
          <div 
            className="p-8 pb-6 border-b border-dashed text-center"
            style={{ 
                background: "linear-gradient(to bottom, #fffbeb, #ffffff)",
                borderBottomColor: "#fcd34d" 
            }}
          >
            <div className="flex justify-center mb-4">
              <div 
                className="p-4 rounded-full text-white shadow-xl"
                style={{ backgroundColor: "#f59e0b", boxShadow: "0 20px 25px -5px rgba(254, 243, 199, 1)" }}
              >
                <CheckCircle2 size={32} />
              </div>
            </div>
            <h2 className="font-serif italic text-2xl" style={{ color: "#27272a" }}>Cảm ơn nàng!</h2>
            <p className="text-[10px] font-bold uppercase tracking-widest mt-2" style={{ color: "#d97706" }}>Lịch hẹn đã được giữ chỗ</p>
          </div>

          {/* Body Ticket */}
          <div className="p-8 space-y-6 text-left">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 rounded-[20px] overflow-hidden border" style={{ borderColor: "#fef3c7" }}>
                <Image src={service?.image || ""} alt="nail" fill className="object-cover" unoptimized />
              </div>
              <h4 className="font-serif text-lg italic font-bold" style={{ color: "#27272a" }}>{service?.title}</h4>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4 rounded-3xl border" style={{ backgroundColor: "#fafafa", borderColor: "#f4f4f5" }}>
              <div>
                <span className="text-[9px] font-bold block uppercase" style={{ color: "#d97706" }}>Ngày</span>
                <p className="text-sm font-bold" style={{ color: "#27272a" }}>{data.date}</p>
              </div>
              <div>
                <span className="text-[9px] font-bold block uppercase" style={{ color: "#d97706" }}>Giờ</span>
                <p className="text-sm font-bold" style={{ color: "#27272a" }}>{data.time}</p>
              </div>
            </div>

            <div className="flex justify-between border-t pt-4" style={{ borderTopColor: "#f4f4f5" }}>
              <p className="text-sm font-bold" style={{ color: "#27272a" }}>{data.name}</p>
              <p className="text-sm" style={{ color: "#71717a" }}>{data.phone}</p>
            </div>

            <div className="rounded-3xl p-5 flex justify-between items-center" style={{ backgroundColor: "#fffbeb" }}>
              <span className="text-sm font-bold" style={{ color: "#92400e" }}>Thanh toán</span>
              <span className="text-xl font-black" style={{ color: "#d97706" }}>{service?.price}</span>
            </div>
          </div>

          {/* Address Bar */}
          <div className="p-4 flex items-center justify-center gap-2" style={{ backgroundColor: "#18181b" }}>
            <MapPin size={12} style={{ color: "#fbbf24" }} />
            <span className="text-[9px]" style={{ color: "#d4d4d8" }}>302/32 Phan Huy Ích, P.12, Gò Vấp, HCM</span>
          </div>
        </div>
      </div>

      {/* Nút bấm (Không nằm trong vùng chụp) */}
      <div className="mt-8 flex gap-4 w-full max-w-[400px] px-6">
        <button 
          onClick={handleCapture} 
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl bg-white border text-sm font-bold shadow-sm active:scale-95 transition-all"
          style={{ borderColor: "#e4e4e7", color: "#52525b" }}
        >
          <Share2 size={18} /> Lưu ảnh vé
        </button>
        <button 
          onClick={() => window.location.href = "/"} 
          className="flex-1 flex items-center justify-center gap-2 py-4 rounded-2xl text-white text-sm font-bold shadow-lg active:scale-95 transition-all"
          style={{ backgroundColor: "#f59e0b" }}
        >
          <Home size={18} /> Trang chủ
        </button>
      </div>
    </motion.div>
  );
};