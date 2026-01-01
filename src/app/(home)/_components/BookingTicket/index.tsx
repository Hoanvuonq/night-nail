"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Calendar, Clock, MapPin, Sparkles, Share2, MessageSquare, Home } from "lucide-react";
import Image from "next/image";

export const BookingTicket = ({ data, service }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="flex flex-1 flex-col items-center justify-center p-4 md:p-8 text-center min-h-screen bg-[#FBFAF8]"
    >
      {/* --- CHIẾC THIỆP PHIÊN BẢN TO & CAO CẤP --- */}
      <div className="relative w-full max-w-[420px] bg-white rounded-[40px] overflow-hidden shadow-[0_32px_64px_rgba(212,175,55,0.2)] border border-amber-100/50">
        
        {/* Header: Trạng thái */}
        <div className="bg-gradient-to-b from-amber-50/80 to-white p-8 pb-6 border-b border-dashed border-amber-200 relative">
          {/* Vé đục lỗ decor */}
          <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-[#FBFAF8] rounded-full border border-amber-100" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 bg-[#FBFAF8] rounded-full border border-amber-100" />
          
          <div className="flex justify-center mb-4">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
              className="p-4 bg-amber-500 rounded-full text-white shadow-xl shadow-amber-200"
            >
              <CheckCircle2 size={32} />
            </motion.div>
          </div>
          <h2 className="font-serif italic text-2xl text-zinc-800">Cảm ơn nàng!</h2>
          <p className="text-[11px] font-bold text-amber-600 uppercase tracking-[0.25em] mt-2">Lịch hẹn đã được giữ chỗ</p>
        </div>

        {/* Body: Thông tin chi tiết */}
        <div className="p-8 space-y-6 text-left">
          {/* Dịch vụ */}
          <div className="flex items-center gap-5">
            <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-[24px] border border-amber-100 shadow-sm">
              <Image src={service?.image || ""} alt="nail" fill className="object-cover" unoptimized />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-wider">Dịch vụ</p>
              <p className="text-lg font-serif italic font-bold text-zinc-800 leading-tight">{service?.title}</p>
            </div>
          </div>

          {/* Thời gian */}
          <div className="grid grid-cols-2 gap-4 bg-zinc-50/50 p-4 rounded-3xl border border-zinc-100">
            <div>
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Calendar size={14} />
                <span className="text-[10px] font-bold uppercase tracking-tight">Ngày hẹn</span>
              </div>
              <p className="text-sm font-bold text-zinc-800">{data.date}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-amber-600 mb-1">
                <Clock size={14} />
                <span className="text-[10px] font-bold uppercase tracking-tight">Giờ hẹn</span>
              </div>
              <p className="text-sm font-bold text-zinc-800">{data.time}</p>
            </div>
          </div>

          {/* Khách hàng */}
          <div className="px-1">
            <p className="text-[10px] font-bold text-zinc-400 uppercase mb-2 tracking-wider">Thông tin nàng</p>
            <div className="flex justify-between items-center">
              <p className="text-base font-bold text-zinc-800">{data.name}</p>
              <p className="text-sm font-medium text-zinc-500 tracking-tighter">{data.phone}</p>
            </div>
          </div>

          {/* DESCRIPTION/NOTE: Phần mới thêm vào */}
          {data.note && (
            <div className="px-1 pt-2">
              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                <MessageSquare size={12} />
                <p className="text-[10px] font-bold uppercase tracking-wider">Lời nhắn của nàng</p>
              </div>
              <div className="bg-zinc-50 rounded-2xl p-4 border border-zinc-100/50">
                <p className="text-sm text-zinc-600 italic leading-relaxed">
                  "{data.note}"
                </p>
              </div>
            </div>
          )}

          {/* Tổng tiền */}
          <div className="bg-amber-50 rounded-[24px] p-5 flex justify-between items-center border border-amber-100/50">
            <span className="text-sm font-bold text-amber-800">Tổng thanh toán</span>
            <span className="text-2xl font-black text-amber-600 font-serif tracking-tighter">{service?.price}</span>
          </div>
        </div>

        {/* Footer: Địa chỉ */}
        <div className="bg-zinc-900 p-5 flex items-center justify-center gap-2">
          <MapPin size={14} className="text-amber-400" />
          <span className="text-[10px] text-zinc-300 font-medium tracking-wide">
            302/32 Phan Huy Ích, Phường 12, Gò Vấp, HCM
          </span>
        </div>
      </div>

      {/* Hành động */}
      <div className="mt-10 flex gap-4 w-full max-w-[420px]">
        <button className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-white border border-zinc-200 text-sm font-bold text-zinc-600 shadow-sm active:scale-95 transition-transform">
          <Share2 size={18} /> Chụp màn hình
        </button>
        <button 
          onClick={() => window.location.href = "/"}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-amber-500 text-white text-sm font-bold shadow-xl shadow-amber-200 active:scale-95 transition-transform"
        >
          <Home size={18} /> Về trang chủ
        </button>
      </div>

      <motion.div 
        animate={{ y: [0, -5, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="mt-8 flex items-center gap-2 text-amber-600/80 font-serif italic text-base"
      >
        <Sparkles size={18} /> Night Nail hân hạnh được đón tiếp nàng!
      </motion.div>
    </motion.div>
  );
};