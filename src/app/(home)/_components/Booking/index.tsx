"use client";
import { PortalModal } from "@/components/PortalModal";
import { SERVICES_DATA, TIME_SLOTS } from "@/contants/booking";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ChevronRight, Edit3, Phone, Sparkles, Star, User, X, Calendar } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { DateComponent } from "../Date";
import { TimePickerCustom } from "../TimePickerCustom";

// --- Sub-component: Form Input chuẩn Web 3 ---
const FormInput = ({ icon, name, placeholder, value, onChange, type = "text" }: any) => {
  const isTextarea = type === "textarea";
  return (
    <div className="relative group">
      {/* Glow Effect nền khi focus */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/20 to-[#D4AF37]/0 rounded-[22px] blur opacity-0 group-focus-within:opacity-100 transition duration-500" />
      
      <div className={`relative flex ${isTextarea ? "items-start" : "items-center"} bg-[#121212]/80 backdrop-blur-xl border border-white/5 rounded-[20px] p-1.5 transition-all duration-300 group-focus-within:border-[#D4AF37]/40`}>
        <div className={`flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br from-[#1C1C1C] to-black text-[#D4AF37] shadow-inner ${isTextarea ? "mt-1" : ""}`}>
          {icon}
        </div>
        {isTextarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            rows={2}
            className="bg-transparent w-full p-3 text-sm text-white placeholder-white/20 focus:outline-none resize-none"
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="bg-transparent w-full p-3 text-sm text-white placeholder-white/20 focus:outline-none"
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

const NightNailLuxury = ({ isOpen, onClose }: any) => {
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]?.id);
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [formData, setFormData] = useState({ name: "", phone: "", note: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const currentServicePrice = SERVICES_DATA.find(s => s.id === selectedService)?.price || "0đ";

  return (
    <PortalModal 
      isOpen={isOpen} 
      onClose={onClose} 
      width="max-w-[560px]" 
      className="!bg-[#0A0A0A] !border-white/10 !p-0 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]"
    >
      <div className="h-[88vh] flex flex-col relative bg-radial-at-t from-[#1A1A1A] to-[#0A0A0A]">
        
        {/* Header - Glassmorphism Sticky */}
        <header className="sticky top-0 z-50 px-8 py-6 flex justify-between items-center border-b border-white/5 bg-black/60 backdrop-blur-xl">
          <motion.button 
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose} 
            className="p-2.5 bg-white/5 rounded-full text-white/40 hover:text-white transition-all"
          >
            <X size={20} />
          </motion.button>
          
          <div className="text-center">
            <h1 className="text-xl font-serif italic text-[#D4AF37] tracking-[0.2em] uppercase drop-shadow-[0_0_10px_rgba(212,175,55,0.3)]">Night Nail</h1>
            <span className="text-[8px] tracking-[0.4em] text-white/30 uppercase block mt-1">Exclusive Appointment</span>
          </div>

          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="p-2.5 bg-[#D4AF37]/10 rounded-full text-[#D4AF37]"
          >
            <Star size={18} fill="currentColor" />
          </motion.button>
        </header>

        {/* Body - Smooth Scroll Area */}
        <div className="flex-1 overflow-y-auto luxury-scrollbar px-8 pt-8 pb-48 space-y-12 no-scrollbar">
          
          {/* Hero Branding */}
          <section className="text-center space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20"
            >
              <Sparkles size={12} className="text-[#D4AF37] animate-pulse" />
              <span className="text-[10px] text-[#D4AF37] font-bold tracking-[0.2em] uppercase">The Art of Beauty</span>
            </motion.div>
            <h2 className="text-4xl font-serif text-white leading-tight">
              Nghệ thuật của <br />
              <span className="italic font-light bg-gradient-to-r from-[#D4AF37] via-[#FFF5D1] to-[#D4AF37] bg-clip-text text-transparent">riêng bạn</span>
            </h2>
          </section>

          {/* Service Selector - Bento Style Scroll */}
          <section className="space-y-5">
            <div className="flex items-center justify-between">
              <h3 className="text-[#D4AF37] font-serif italic text-lg">Dịch vụ nổi bật</h3>
              <span className="text-[10px] text-white/20 uppercase tracking-widest">Vuốt ngang ›</span>
            </div>
            
            <div className="flex gap-4 overflow-x-auto pb-4 snap-x no-scrollbar">
              {SERVICES_DATA.map((item) => {
                const isActive = selectedService === item.id;
                return (
                  <motion.div
                    key={item.id}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedService(item.id)}
                    className={`relative min-w-[240px] h-[320px] rounded-[32px] overflow-hidden cursor-pointer transition-all duration-500 border-2 snap-start ${
                      isActive ? "border-[#D4AF37] shadow-[0_20px_40px_rgba(212,175,55,0.15)]" : "border-white/5 opacity-40 hover:opacity-100"
                    }`}
                  >
                    <Image src={item.image} alt={item.title} fill className="object-cover transition-transform duration-700 hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    
                    <div className="absolute bottom-6 left-6 right-6 z-10 space-y-2">
                      <AnimatePresence>
                        {isActive && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="bg-[#D4AF37] w-fit p-1 rounded-full text-black mb-2">
                            <CheckCircle2 size={12} />
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <h4 className="text-white font-serif text-lg leading-tight">{item.title}</h4>
                      <p className="text-[#D4AF37] font-bold text-sm tracking-tighter">{item.price}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* Time Picker - Modern Grid */}
          <section className="space-y-6">
            <div className="flex items-center gap-3 text-[#D4AF37]">
              <Calendar size={18} />
              <h3 className="font-serif italic text-lg">Thời gian hẹn</h3>
            </div>
            
            <div className="bg-white/5 rounded-[24px] p-2">
              <DateComponent />
            </div>

            <TimePickerCustom selectedTime={selectedTime} setSelectedTime={setSelectedTime} />
          </section>

          {/* Contact Form */}
          <section className="space-y-6">
            <h3 className="text-[#D4AF37] font-serif italic text-lg">Thông tin cá nhân</h3>
            <div className="space-y-4">
              <FormInput name="name" placeholder="Họ và Tên" value={formData.name} onChange={handleChange} icon={<User size={18} />} />
              <FormInput name="phone" placeholder="Số điện thoại" type="tel" value={formData.phone} onChange={handleChange} icon={<Phone size={18} />} />
              <FormInput name="note" placeholder="Bạn có yêu cầu gì thêm không?" type="textarea" value={formData.note} onChange={handleChange} icon={<Edit3 size={18} />} />
            </div>
          </section>
        </div>

        {/* Floating Footer - Web 3 Gradient Action */}
        <footer className="absolute bottom-0 left-0 right-0 p-8 pt-12 bg-gradient-to-t from-black via-black/90 to-transparent backdrop-blur-md z-40 border-t border-white/5">
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="space-y-1">
              <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] font-bold">Thanh toán dự kiến</p>
              <p className="text-[10px] text-[#D4AF37]/60 italic">Bao gồm tư vấn chuyên sâu</p>
            </div>
            <motion.div 
              key={currentServicePrice} 
              initial={{ opacity: 0, x: 10 }} 
              animate={{ opacity: 1, x: 0 }} 
              className="text-4xl font-serif italic text-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]"
            >
              {currentServicePrice}
            </motion.div>
          </div>
          
          <motion.button 
            whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full h-[70px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B38F24] rounded-[24px] overflow-hidden flex items-center justify-center gap-3 shadow-[0_20px_40px_rgba(212,175,55,0.2)]"
          >
            {/* Tia sáng quét qua khi hover */}
            <div className="absolute inset-0 w-1/2 h-full bg-white/20 -skew-x-[45deg] -translate-x-[200%] group-hover:translate-x-[300%] transition-transform duration-1000 ease-in-out" />
            
            <span className="text-black font-black uppercase tracking-[0.2em] text-sm">Xác nhận lịch hẹn</span>
            <ChevronRight size={20} className="text-black" />
          </motion.button>
        </footer>

      </div>
    </PortalModal>
  );
};

export default NightNailLuxury;