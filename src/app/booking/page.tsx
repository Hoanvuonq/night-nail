"use client";

import { Button } from "@/components";
import { SERVICES_DATA, TIME_SLOTS } from "@/contants/booking";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarIcon,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Edit3,
  Info,
  LayoutGrid,
  Phone,
  Sparkles,
  User,
} from "lucide-react";
import Image from "next/image";
import React, { useMemo, useState } from "react";
import { DateComponent } from "../(home)/_components/Date";
import { cn } from "@/utils/cn";
import { BookingSummaryForm } from "../(home)/_components/BookingSummaryForm";
import { BookingTicket } from "../(home)/_components/BookingTicket";

const FormInput = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
  type = "text",
}: any) => {
  const isTextarea = type === "textarea";
  return (
    <div className="group w-full">
      <div
        className={cn(
          "relative flex rounded-2xl border border-zinc-200 bg-white p-2 transition-all duration-300",
          "focus-within:border-amber-400 focus-within:ring-4 focus-within:ring-amber-50 shadow-sm hover:border-amber-200",
          isTextarea ? "items-start" : "items-center"
        )}
      >
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600",
            isTextarea ? "mt-1" : ""
          )}
        >
          {icon}
        </div>
        {isTextarea ? (
          <textarea
            name={name}
            placeholder={placeholder}
            rows={3}
            className="w-full resize-none bg-transparent p-3 text-sm font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none"
            value={value}
            onChange={onChange}
          />
        ) : (
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            className="w-full bg-transparent p-3 text-sm font-medium text-zinc-700 placeholder-zinc-400 focus:outline-none"
            value={value}
            onChange={onChange}
          />
        )}
      </div>
    </div>
  );
};

const NightNailBookingRouter = () => {
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState(SERVICES_DATA[0]?.id);
  const [selectedTime, setSelectedTime] = useState("11:00");
  const [selectedDate, setSelectedDate] = useState<string>("24/10/2024");
  const [formData, setFormData] = useState({ name: "", phone: "", note: "" });
  const [isConfirmed, setIsConfirmed] = useState(false);
  const currentService = useMemo(
    () => SERVICES_DATA.find((s) => s.id === selectedService),
    [selectedService]
  );
  const handleConfirm = () => {
    // Logic gửi API ở đây
    setIsConfirmed(true); // Hiển thị thiệp
  };
  const nextStep = () => setStep((s) => Math.min(s + 1, 3));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData({ ...formData, [e.target.name]: e.target.value });
  if (isConfirmed) {
    return (
      <section className="flex min-h-[100dvh] items-center justify-center bg-[#FBFAF8]">
        <BookingTicket
          service={currentService}
          data={{ ...formData, date: selectedDate, time: selectedTime }}
        />
      </section>
    );
  }
  return (
    <section className="flex min-h-[100dvh] items-center justify-center px-0 sm:px-4 py-4 md:py-12 font-sans">
      <div className="relative mx-auto flex h-full min-h-[600px] sm:min-h-[750px] w-full max-w-[500px] md:max-w-[650px] flex-col overflow-hidden sm:rounded-[40px] border-x sm:border border-zinc-100 bg-white shadow-2xl shadow-amber-100/40">
        <div className="pointer-events-none absolute left-0 top-0 h-32 w-full bg-gradient-to-b from-amber-50/60 to-transparent" />
        <header className="relative z-10 border-b border-zinc-50 p-6 pb-4">
          <div className="flex items-end justify-between">
            <div className="flex flex-col">
              <h1 className="font-serif text-xl italic tracking-wider text-zinc-800 uppercase md:text-2xl">
                Night <span className="text-amber-500">Nail</span>
              </h1>
              <span className="mt-1 text-[9px] font-bold tracking-[0.2em] text-zinc-400 uppercase">
                Booking
              </span>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className="text-[10px] font-bold text-amber-600 uppercase">
                Bước {step}/3
              </span>
              <div className="flex gap-1">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1 rounded-full transition-all duration-500 ${
                      step >= i ? "w-6 bg-amber-400" : "w-2 bg-zinc-100"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </header>

        <main className="relative flex flex-1 flex-col overflow-hidden">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-1 flex-col p-5 md:px-8 space-y-6"
              >
                <div className="flex items-center gap-2.5 text-zinc-800">
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                    <LayoutGrid size={18} />
                  </div>
                  <h3 className="font-serif text-lg italic">
                    Chọn gói Combo nàng yêu
                  </h3>
                </div>

                {/* Horizontal Scroll Area */}
                <div className="relative group/scroll -mx-5 px-5">
                  <div className="flex flex-nowrap gap-4 overflow-x-auto pb-8 no-scrollbar snap-x px-1">
                    {SERVICES_DATA.map((item) => {
                      const isActive = selectedService === item.id;
                      return (
                        <motion.div
                          key={item.id}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setSelectedService(item.id)}
                          className={`group relative flex-none w-[260px] md:w-[300px] snap-center cursor-pointer flex flex-col gap-3 rounded-[32px] border-2 p-3.5 transition-all duration-300 ${
                            isActive
                              ? "border-amber-400 bg-amber-50/30 shadow-lg"
                              : "border-zinc-100 bg-white"
                          }`}
                        >
                          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-[24px] border border-zinc-50 shadow-sm">
                            <Image
                              src={item.image}
                              alt={item.title}
                              fill
                              unoptimized
                              className="object-cover"
                            />
                            <div
                              className={`absolute top-3 right-3 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-md transition-all ${
                                isActive
                                  ? "bg-amber-500 text-white"
                                  : "bg-black/10 text-transparent border border-white/30"
                              }`}
                            >
                              <CheckCircle2 size={16} strokeWidth={3} />
                            </div>
                          </div>
                          <div className="flex flex-col gap-1 px-1">
                            <h4
                              className={`font-serif text-sm md:text-base leading-snug truncate ${
                                isActive
                                  ? "text-amber-900 font-bold"
                                  : "text-zinc-800 font-medium"
                              }`}
                            >
                              {item.title}
                            </h4>
                            <p className="text-[10px] text-zinc-500 line-clamp-2 h-[30px] leading-relaxed">
                              {item.desc}
                            </p>
                            <div className="mt-2 flex items-center justify-between">
                              <span className="font-black text-amber-600 text-base">
                                {item.price}
                              </span>
                              <div className="text-[9px] font-bold text-zinc-400 uppercase bg-zinc-100 px-2 py-0.5 rounded-full">
                                Gói Combo
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                  <div className="absolute right-0 top-0 bottom-8 w-10 bg-gradient-to-l from-white to-transparent pointer-events-none" />
                </div>

                <div className="mt-auto flex items-start gap-3 rounded-2xl border border-amber-100 bg-amber-50/50 p-4">
                  <Info size={16} className="shrink-0 text-amber-500" />
                  <p className="text-[11px] italic text-zinc-500 leading-relaxed">
                    Giá trên chưa bao gồm phí tháo gel cũ & design nâng cao theo
                    mẫu khách mang tới.
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-1 flex-col p-5 md:px-8 space-y-6"
              >
                <div className="flex items-center gap-2.5 text-zinc-800">
                  <div className="p-2 bg-amber-50 rounded-xl text-amber-500">
                    <Clock size={18} />
                  </div>
                  <h3 className="font-serif text-lg italic">
                    Chọn thời gian hẹn
                  </h3>
                </div>

                <DateComponent
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />

                <div className="space-y-4">
                  <p className="ml-2 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                    Khung giờ nàng chọn
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 xs:grid-cols-4">
                    {TIME_SLOTS.map((time) => (
                      <motion.button
                        key={time}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTime(time)}
                        className={`rounded-xl border py-3 text-xs font-bold transition-all ${
                          selectedTime === time
                            ? "border-amber-500 bg-amber-500 text-white shadow-md shadow-amber-200"
                            : "border-zinc-100 bg-white text-zinc-500 active:bg-amber-50"
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 3: USER INFO & SUMMARY */}
            {step === 3 && (
              <BookingSummaryForm
                currentService={currentService}
                selectedDate={selectedDate}
                selectedTime={selectedTime}
                formData={formData}
                handleChange={handleChange}
              />
            )}
          </AnimatePresence>
        </main>

        <footer className="relative z-10 border-t border-zinc-100 bg-white p-5 md:p-8">
          <div className="flex gap-3 h-[50px] md:h-[60px]">
            {step > 1 && (
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl border border-zinc-200 text-xs font-bold text-zinc-500 active:bg-zinc-50"
              >
                <ChevronLeft size={16} /> QUAY LẠI
              </motion.button>
            )}

            <div className="flex-[2] h-full">
              <Button
                label={step < 3 ? "TIẾP THEO" : "XÁC NHẬN"}
                onClick={step < 3 ? nextStep : handleConfirm} // Gọi handleConfirm
                className="w-full h-full shadow-lg"
                icon={
                  step < 3 ? (
                    <ChevronRight size={18} />
                  ) : (
                    <CheckCircle2 size={18} />
                  )
                }
              />
            </div>
          </div>

          {/* Quick Summary Section */}
          <div className="mt-5 flex items-center justify-between border-t border-dashed border-zinc-100 pt-4 px-1">
            <div className="flex flex-col">
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">
                Dịch vụ
              </span>
              <p className="max-w-[140px] truncate font-serif text-[11px] italic text-zinc-800">
                {currentService?.title}
              </p>
              <p className="text-[9px] font-bold text-amber-600">
                {selectedTime} • {currentService?.price}
              </p>
            </div>
            <div className="flex flex-col text-right">
              <span className="text-[8px] font-bold text-zinc-400 uppercase tracking-tighter">
                Tổng phí
              </span>
              <p className="font-serif text-lg font-black text-amber-600 tracking-tighter">
                {currentService?.price}
              </p>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default NightNailBookingRouter;
