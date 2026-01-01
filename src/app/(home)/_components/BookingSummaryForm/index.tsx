"use client";

import Image from "next/image";
import { CalendarIcon, Clock, User, Phone, Edit3, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

// Re-use FormInput nội bộ hoặc import nếu dùng chung
const FormInput = ({ icon, name, placeholder, value, onChange, type = "text" }: any) => {
  const isTextarea = type === "textarea";
  return (
    <div className="group w-full">
      <div className={`relative flex rounded-2xl border border-zinc-200 bg-white p-2 transition-all duration-300 focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-50 shadow-sm hover:border-amber-200 ${isTextarea ? "items-start" : "items-center"}`}>
        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ${isTextarea ? "mt-1" : ""}`}>
          {icon}
        </div>
        {isTextarea ? (
          <textarea name={name} placeholder={placeholder} rows={3} className="w-full resize-none bg-transparent p-3 text-sm font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none" value={value} onChange={onChange} />
        ) : (
          <input type={type} name={name} placeholder={placeholder} className="w-full bg-transparent p-3 text-sm font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none" value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
};

export const BookingSummaryForm = ({ currentService, selectedDate, selectedTime, formData, handleChange }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-1 flex-col p-5 md:px-8 space-y-6"
    >
      {/* --- PHẦN TÓM TẮT LỊCH HẸN --- */}
      <div className="rounded-[24px] bg-amber-50/50 border border-amber-100 p-4 shadow-sm">
        <p className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-3 px-1">
          Chi tiết lịch hẹn của nàng
        </p>
        
        <div className="grid grid-cols-1 gap-3">
          {/* Dịch vụ */}
          <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-amber-100/50">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-zinc-100">
              <Image src={currentService?.image || ""} alt="Selected Service" fill unoptimized className="object-cover" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-zinc-400 uppercase">Dịch vụ</p>
              <p className="text-sm font-serif italic font-bold text-zinc-800 truncate">{currentService?.title}</p>
            </div>
          </div>

          {/* Ngày & Giờ */}
          <div className="flex gap-2">
            <div className="flex-1 flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-amber-100/50">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-500"><CalendarIcon size={16} /></div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Ngày</p>
                <p className="text-xs font-bold text-zinc-800 truncate">{selectedDate}</p>
              </div>
            </div>
            
            <div className="flex-1 flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-amber-100/50">
              <div className="p-2 bg-amber-50 rounded-lg text-amber-500"><Clock size={16} /></div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold text-zinc-400 uppercase">Giờ</p>
                <p className="text-xs font-bold text-zinc-800">{selectedTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- FORM NHẬP LIỆU --- */}
      <div className="space-y-4">
        <div className="text-center space-y-1 mb-2">
          <div className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-600 uppercase mx-auto">
            <Sparkles size={12} fill="currentColor" /> Sắp xong rồi
          </div>
          <h3 className="font-serif text-xl italic text-zinc-800">Thông tin liên hệ</h3>
        </div>

        <div className="space-y-3.5">
          <FormInput name="name" placeholder="Nàng tên gì nè?" value={formData.name} onChange={handleChange} icon={<User size={18} />} />
          <FormInput name="phone" placeholder="Số điện thoại của nàng" type="tel" value={formData.phone} onChange={handleChange} icon={<Phone size={18} />} />
          <FormInput name="note" placeholder="Ghi chú thêm (Mẫu móng nàng thích...)" type="textarea" value={formData.note} onChange={handleChange} icon={<Edit3 size={18} />} />
        </div>
      </div>
    </motion.div>
  );
};