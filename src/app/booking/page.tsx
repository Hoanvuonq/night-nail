"use client";
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  Edit3, 
  Phone, 
  Sparkles, 
  User, 
  Calendar,
  Clock,
  LayoutGrid,
  Info
} from "lucide-react";
import Image from "next/image";
import { SERVICES_DATA, TIME_SLOTS } from "@/contants/booking";
import { DateComponent } from "../(home)/_components/Date";

// --- Sub-component: Form Input chuẩn Luxury ---
const FormInput = ({ icon, name, placeholder, value, onChange, type = "text" }: any) => {
  const isTextarea = type === "textarea";
  return (
    <div className="relative group w-full">
      <div className={`relative flex ${isTextarea ? "items-start" : "items-center"} bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl md:rounded-[20px] p-1.5 transition-all duration-300 focus-within:border-[#D4AF37]/50 group-focus-within:bg-white/[0.06]`}>
        <div className={`flex items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-xl bg-gradient-to-br from-[#1C1C1C] to-black text-[#D4AF37] shadow-inner ${isTextarea ? "mt-1" : ""}`}>
          {icon}
        </div>
        {isTextarea ? (
          <textarea name={name} placeholder={placeholder} rows={3} className="bg-transparent w-full p-3 text-sm text-white placeholder-white/20 focus:outline-none resize-none selection:bg-[#D4AF37]/30" value={value} onChange={onChange} />
        ) : (
          <input type={type} name={name} placeholder={placeholder} className="bg-transparent w-full p-3 text-sm text-white placeholder-white/20 focus:outline-none selection:bg-[#D4AF37]/30" value={value} onChange={onChange} />
        )}
      </div>
    </div>
  );
};

const NightNailBookingRouter = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]?.id);
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [formData, setFormData] = useState({ name: "", phone: "", note: "" });

  const currentService = useMemo(() => SERVICES_DATA.find(s => s.id === selectedService), [selectedService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  return (
    <div className="w-full max-w-[650px] mx-auto bg-[#080808] sm:bg-[#0C0C0C] sm:rounded-[40px] sm:border border-white/10 shadow-2xl overflow-hidden min-h-screen sm:min-h-[750px] flex flex-col font-sans relative">
      
      {/* Background Glows (Trang trí Web3) */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/10 blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#D4AF37]/5 blur-[80px] pointer-events-none" />

      {/* Header & Progress */}
      <header className="p-6 md:p-8 pb-4 border-b border-white/5 relative z-10">
        <div className="flex justify-between items-end mb-6">
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-serif italic text-[#D4AF37] tracking-wider uppercase drop-shadow-sm">Night Nail</h1>
            <span className="text-[9px] md:text-[10px] tracking-[0.3em] text-white/40 uppercase mt-1 font-bold">Booking Experience</span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-tighter">Bước {step} / 3</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((i) => (
                <div key={i} className={`h-1.5 rounded-full transition-all duration-500 ease-out ${step >= i ? "w-6 md:w-8 bg-[#D4AF37] shadow-[0_0_10px_rgba(212,175,55,0.4)]" : "w-3 bg-white/10"}`} />
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-5 md:p-8 relative overflow-hidden flex flex-col">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: CHỌN DỊCH VỤ */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6 flex-1 flex flex-col">
              <div className="flex items-center gap-2.5 text-[#D4AF37]">
                <LayoutGrid size={18} className="animate-pulse" />
                <h3 className="font-serif italic text-lg md:text-xl">Chọn dịch vụ nàng thích</h3>
              </div>
              
              <div className="grid grid-cols-1 gap-3 md:gap-4 overflow-y-auto max-h-[50vh] sm:max-h-[420px] no-scrollbar pr-1">
                {SERVICES_DATA.map((item) => {
                  const isActive = selectedService === item.id;
                  return (
                    <motion.div
                      key={item.id}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedService(item.id)}
                      className={`relative flex items-center gap-4 p-3 md:p-4 rounded-3xl cursor-pointer transition-all duration-300 border-2 ${
                        isActive ? "border-[#D4AF37] bg-[#D4AF37]/5 shadow-[0_0_20px_rgba(212,175,55,0.1)]" : "border-white/5 bg-white/[0.02] hover:bg-white/[0.05]"
                      }`}
                    >
                      <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-[20px] overflow-hidden shrink-0 border border-white/10">
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-serif text-[15px] md:text-base leading-tight">{item.title}</h4>
                        <div className="flex items-center gap-2 mt-1.5">
                          <p className="text-[#D4AF37] font-black text-sm">{item.price}</p>
                          <span className="text-[10px] text-white/30">• 60-90 phút</span>
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isActive ? "bg-[#D4AF37] border-[#D4AF37]" : "border-white/10"}`}>
                        {isActive && <CheckCircle2 className="text-black" size={14} strokeWidth={3} />}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <div className="mt-auto p-4 rounded-2xl bg-white/5 border border-white/5 flex items-start gap-3">
                <Info size={16} className="text-[#D4AF37] shrink-0 mt-0.5" />
                <p className="text-[11px] text-white/40 italic">Mọi dịch vụ đều bao gồm quy trình ngâm bồn thư giãn và massage dưỡng sâu tinh chất.</p>
              </div>
            </motion.div>
          )}

          {/* STEP 2: CHỌN THỜI GIAN */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-8 flex-1">
              <div className="flex items-center gap-2.5 text-[#D4AF37]">
                <Clock size={18} className="animate-pulse" />
                <h3 className="font-serif italic text-lg md:text-xl">Chọn thời gian hẹn</h3>
              </div>

              <div className="bg-white/5 rounded-[32px] p-4 md:p-6 shadow-inner border border-white/5 backdrop-blur-sm">
                <DateComponent />
              </div>

              <div className="space-y-4">
                <p className="text-[11px] text-white/40 uppercase tracking-[0.2em] font-bold ml-2">Khung giờ có sẵn</p>
                <div className="grid grid-cols-3 xs:grid-cols-4 gap-2.5">
                  {TIME_SLOTS.map((time) => (
                    <motion.button
                      key={time}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3.5 md:py-4 rounded-2xl text-[11px] font-black tracking-widest transition-all duration-300 border ${
                        selectedTime === time ? "bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg shadow-[#D4AF37]/20" : "bg-white/[0.03] text-white/30 border-white/5 hover:border-[#D4AF37]/30 hover:text-white"
                      }`}
                    >
                      {time}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 3: THÔNG TIN CÁ NHÂN */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-6 flex-1">
              <div className="text-center space-y-3 mb-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] font-bold uppercase tracking-[0.3em] border border-[#D4AF37]/20">
                  <Sparkles size={12} fill="currentColor" /> Sắp xong rồi
                </div>
                <h3 className="text-2xl md:text-3xl text-white font-serif italic leading-tight">Để Night Nail chăm sóc <br/> cho nàng nhé ✨</h3>
              </div>
              
              <div className="space-y-4 max-w-md mx-auto">
                <FormInput name="name" placeholder="Nàng tên là gì nè?" value={formData.name} onChange={handleChange} icon={<User size={18} />} />
                <FormInput name="phone" placeholder="Số điện thoại của nàng" type="tel" value={formData.phone} onChange={handleChange} icon={<Phone size={18} />} />
                <FormInput name="note" placeholder="Nàng có yêu cầu đặc biệt gì không? (Mẫu nail, dị ứng...)" type="textarea" value={formData.note} onChange={handleChange} icon={<Edit3 size={18} />} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Footer */}
      <footer className="p-6 md:p-8 bg-gradient-to-t from-black via-black/80 to-transparent relative z-10">
        <div className="flex gap-3 md:gap-4">
          {step > 1 && (
            <motion.button 
              whileTap={{ scale: 0.95 }}
              onClick={prevStep} 
              className="flex-1 h-[55px] md:h-[65px] rounded-[22px] border border-white/10 text-white/50 font-bold hover:bg-white/5 transition-all flex items-center justify-center gap-2 text-sm"
            >
              <ChevronLeft size={18} /> QUAY LẠI
            </motion.button>
          )}
          
          {step < 3 ? (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={nextStep} 
              className="flex-[2] h-[55px] md:h-[65px] bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#B38F24] rounded-[22px] text-black font-black flex items-center justify-center gap-2 shadow-[0_10px_30px_rgba(212,175,55,0.2)] text-sm uppercase tracking-widest"
            >
              TIẾP THEO <ChevronRight size={20} />
            </motion.button>
          ) : (
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-[2] h-[55px] md:h-[65px] bg-gradient-to-r from-[#D4AF37] via-[#FFF5D1] to-[#D4AF37] rounded-[22px] text-black font-black flex items-center justify-center gap-2 shadow-[0_15px_40px_rgba(212,175,55,0.3)] text-sm uppercase tracking-widest"
            >
              XÁC NHẬN ĐẶT LỊCH <CheckCircle2 size={20} />
            </motion.button>
          )}
        </div>
        
        {/* Tóm tắt nhanh (Floating Summary) */}
        <div className="mt-6 pt-5 border-t border-white/5 flex justify-between items-center px-2">
           <div className="flex flex-col">
              <span className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold">Dịch vụ đang chọn</span>
              <p className="text-[11px] md:text-[12px] text-white/60 font-serif italic truncate max-w-[150px] md:max-w-[250px]">
                {currentService?.title} • {selectedTime}
              </p>
           </div>
           <div className="text-right flex flex-col">
              <span className="text-[8px] text-white/30 uppercase tracking-[0.2em] font-bold">Tổng cộng</span>
              <p className="text-lg md:text-xl font-serif text-[#D4AF37] font-black tracking-tighter shadow-[#D4AF37]/20 drop-shadow-lg">
                {currentService?.price}
              </p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default NightNailBookingRouter;