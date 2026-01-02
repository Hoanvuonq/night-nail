"use client";

import { Button } from "@/components";
import { SERVICES_DATA, TIME_SLOTS } from "@/contants/booking";
import { AnimatePresence } from "framer-motion";
import _ from "lodash";
import { CheckCircle2, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { useMemo, useState, useEffect } from "react";
import { BookingTicket } from "../(home)/_components/BookingTicket";
import { ServiceStep } from "./_components/BookingSelectService";
import { TimeStep } from "./_components/BookingSelectTime";
import { BookingSummaryForm } from "./_components/BookingSummaryForm";

type ServiceType = { id: number; title: string; desc: string; price: string; image: string; };

const NightNailBookingRouter = () => {
  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyWuhLPGZAlE6BKwBPJwOJ6JCDyufYQU6PqzTRzDA8vWb82Ho5PZlO0R_NeEyDy4rzA9g/exec";

  const [step, setStep] = useState(1);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  
  const [selectedService, setSelectedService] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [formData, setFormData] = useState({ name: "", phone: "", note: "" });

  // 1. Lấy danh sách giờ đã đặt từ Google Sheets
  useEffect(() => {
    const fetchBookedSlots = async () => {
      try {
        const res = await fetch(SCRIPT_URL);
        const data = await res.json();
        setBookedSlots(data);
      } catch (err) {
        console.error("Không thể lấy lịch hẹn cũ", err);
      }
    };
    fetchBookedSlots();
    setSelectedDate(new Date().toISOString().split("T")[0]);
    const firstServiceId = _.get(SERVICES_DATA as ServiceType[], "[0].id");
    if (firstServiceId) setSelectedService(firstServiceId);
  }, [isConfirmed]);

  const currentService: ServiceType | undefined = useMemo(() => {
    return _.find(SERVICES_DATA as ServiceType[], (service) => service.id === selectedService);
  }, [selectedService]);

  const nextStep = () => setStep((s) => _.clamp(s + 1, 1, 3));
  const prevStep = () => setStep((s) => _.clamp(s - 1, 1, 3));

  // 2. Xử lý Gửi đơn & Check trùng
  const handleConfirm = async () => {
    if (isSubmitting) return;
    
    // Check nhanh ở Client trước khi gửi
    const fullDateTime = `${selectedDate} lúc ${selectedTime}`;
    if (bookedSlots.includes(fullDateTime)) {
      alert("Nàng ơi, khung giờ này vừa có người đặt mất rồi!");
      return;
    }

    setIsSubmitting(true);
    const bookingData = {
      fullname: formData.name,
      phone: formData.phone,
      dateTime: fullDateTime,
      description: formData.note,
      service: currentService?.title,
      price: currentService?.price
    };

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      // Chuyển sang Ticket
      setIsConfirmed(true);
    } catch (error) {
      alert("Gửi đơn thất bại, nàng thử lại nhé!");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isConfirmed) {
    return (
      <BookingTicket 
        service={currentService} 
        data={{ ...formData, date: selectedDate, time: selectedTime }} 
      />
    );
  }

  return (
    <section className="flex w-full items-center justify-center  overflow-hidden">
      <div className="relative flex h-full w-full max-w-[96%] md:max-w-xl flex-col bg-white shadow-lg sm:h-[min(850px,90dvh)] rounded-2xl sm:border border-zinc-100">
        
        <header className="relative z-10 shrink-0 border-b border-zinc-50 p-5 pb-4">
          <div className="flex items-center justify-between mb-1">
             <div className="w-10" /> 
             <h2 className="text-center font-bold text-zinc-800 uppercase tracking-widest text-xs">
                Bước {step} / 3
             </h2>
             <div className="text-[10px] font-bold bg-zinc-100 px-2 py-1 rounded-md text-zinc-400">
                {Math.round((step/3)*100)}%
             </div>
          </div>
          <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-400 transition-all duration-500" 
              style={{ width: `${(step/3)*100}%` }}
            />
          </div>
        </header>

        <main className="relative flex-1 overflow-y-auto no-scrollbar outline-none">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <ServiceStep 
                services={SERVICES_DATA} 
                selectedService={selectedService as number} 
                onSelectService={(id: number) => setSelectedService(id)} 
              />
            )}

            {step === 2 && (
              <TimeStep 
                timeSlots={TIME_SLOTS} 
                selectedTime={selectedTime} 
                onSelectTime={setSelectedTime}
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
                bookedSlots={bookedSlots} 
              />
            )}

            {step === 3 && (
              <BookingSummaryForm 
                currentService={currentService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                formData={formData}
                handleChange={(e: any) => 
                  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
                }
              />
            )}
          </AnimatePresence>
        </main>

        <footer className="relative z-10 shrink-0 border-t rounded-2xl border-zinc-100 bg-white p-5 pb-safe-offset-4 mb-safe">
          <div className="flex gap-3 h-[52px]">
            {step > 1 && (
              <button 
                onClick={prevStep} 
                disabled={isSubmitting}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-zinc-200 text-xs font-bold text-zinc-500 active:scale-95 transition-all disabled:opacity-50"
              >
                <ChevronLeft size={16} /> QUAY LẠI
              </button>
            )}
            <div className="flex-2">
              <Button
                label={isSubmitting ? "ĐANG GỬI..." : (step < 3 ? "TIẾP THEO" : "XÁC NHẬN")}
                onClick={step < 3 ? nextStep : handleConfirm}
                className={`w-full h-full shadow-lg rounded-2xl${isSubmitting ? " opacity-50 pointer-events-none" : ""}`}
                icon={
                  isSubmitting ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    step < 3 ? <ChevronRight size={18} /> : <CheckCircle2 size={18} />
                  )
                }
              />
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default NightNailBookingRouter;