"use client";

import Image from "next/image";
import { CalendarIcon, Clock, User, Phone, Edit3, Sparkles, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

const FormInput = ({ icon, name, placeholder, value, onChange, type = "text" }: any) => {
  const isTextarea = type === "textarea";
  return (
    <div className="group w-full">
      <div className={`relative flex rounded-[22px] border border-zinc-100 bg-zinc-50/50 p-1.5 transition-all duration-300 focus-within:border-amber-300 focus-within:bg-white focus-within:shadow-[0_10px_30px_-10px_rgba(251,191,36,0.2)] ${isTextarea ? "items-start" : "items-center"}`}>
        <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-[18px] bg-white text-amber-500 shadow-sm transition-transform duration-300 group-focus-within:scale-95 ${isTextarea ? "mt-1" : ""}`}>
          {icon}
        </div>
        {isTextarea ? (
          <textarea 
            name={name} 
            placeholder={placeholder} 
            rows={3} 
            className="w-full resize-none bg-transparent px-3 py-3 text-base font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none" 
            value={value} 
            onChange={onChange} 
          />
        ) : (
          <input 
            type={type} 
            name={name} 
            placeholder={placeholder} 
            className="w-full bg-transparent px-3 text-base font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none" 
            value={value} 
            onChange={onChange} 
          />
        )}
      </div>
    </div>
  );
};

export const BookingSummaryForm = ({ currentService, selectedDate, selectedTime, formData, handleChange }: any) => {
  if (!currentService) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-1 flex-col p-4 md:p-6 md:px-10 space-y-5 md:space-y-7 overflow-y-auto touch-pan-y"
    >
      <div className="relative overflow-hidden rounded-[32px] bg-linear-to-br from-zinc-900 to-zinc-800 p-4 md:p-5 shadow-xl">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-amber-400/10 blur-2xl" />
        <div className="relative z-10 space-y-3 md:space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.2em]">Thông tin đặt lịch</p>
            <ShieldCheck size={14} className="text-amber-400/50" />
          </div>
          
          <div className="grid grid-cols-1 gap-3 md:gap-4">
            {/* Dịch vụ Row */}
            <div className="flex items-center gap-3 md:gap-4">
              <div className="relative h-12 w-12 md:h-14 md:w-14 shrink-0 overflow-hidden rounded-[20px] border border-white/10">
                <Image 
                    src={currentService.image || ""} 
                    alt="Service" 
                    fill 
                    unoptimized 
                    className="object-cover" 
                />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="font-serif text-base md:text-lg italic text-white truncate">{currentService.title}</h4>
                <p className="text-[11px] font-medium text-zinc-400 flex items-center gap-1.5">
                    <Sparkles size={10} className="text-amber-400" /> {currentService.price}
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/5" />

            {/* Thời gian Row */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 md:gap-2.5 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-amber-400 shrink-0">
                  <CalendarIcon size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Ngày hẹn</p>
                  <p className="text-xs font-bold text-zinc-200 truncate">{selectedDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-2.5 min-w-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-amber-400 shrink-0">
                  <Clock size={14} />
                </div>
                <div className="min-w-0">
                  <p className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter">Giờ hẹn</p>
                  <p className="text-xs font-bold text-zinc-200 truncate">{selectedTime}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FORM NHẬP LIỆU --- */}
      <div className="flex-1 space-y-4 md:space-y-6">
        <div className="flex flex-col items-center text-center space-y-1">
          <div className="flex items-center gap-2 text-amber-600">
             <div className="h-px w-6 md:w-8 bg-amber-200" />
             <span className="text-[10px] font-black uppercase tracking-widest whitespace-nowrap">Xác nhận nàng nhé</span>
             <div className="h-px w-6 md:w-8 bg-amber-200" />
          </div>
          <h3 className="font-serif text-xl md:text-2xl text-zinc-900 italic">Để lại lời nhắn cho em</h3>
        </div>

        <div className="space-y-3 md:space-y-4">
          <FormInput 
            name="name" 
            placeholder="Nàng tên gì nè?" 
            value={formData.name} 
            onChange={handleChange} 
            icon={<User size={18} strokeWidth={2.5} />} 
          />
          <FormInput 
            name="phone" 
            placeholder="Số điện thoại liên lạc" 
            type="tel" 
            value={formData.phone} 
            onChange={handleChange} 
            icon={<Phone size={18} strokeWidth={2.5} />} 
          />
          <FormInput 
            name="note" 
            placeholder="Ghi chú thêm (Mẫu móng nàng thích...)" 
            type="textarea" 
            value={formData.note} 
            onChange={handleChange} 
            icon={<Edit3 size={18} strokeWidth={2.5} />} 
          />
        </div>
      </div>

      {/* Aesthetic Footer Note */}
      <div className="pb-2 text-center">
        <p className="text-[10px] text-zinc-400 flex items-center justify-center gap-1.5 font-medium">
          <ShieldCheck size={12} className="text-emerald-500" /> 
          Thông tin của nàng sẽ được bảo mật tuyệt đối
        </p>
      </div>
    </motion.div>
  );
};