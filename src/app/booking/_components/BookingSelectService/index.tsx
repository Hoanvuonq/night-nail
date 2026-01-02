"use client";

import { motion } from "framer-motion";
import { LayoutGrid, CheckCircle2, Info, Sparkles } from "lucide-react";
import Image from "next/image";
import { useRef, useEffect } from "react";

interface ServiceStepProps {
  services: any[];
  selectedService: number;
  onSelectService: (id: number) => void;
}

export const ServiceStep = ({
  services,
  selectedService,
  onSelectService,
}: ServiceStepProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<Map<number, HTMLDivElement>>(new Map());

  const handleSelect = (id: number) => {
    onSelectService(id);
    
    const element = itemsRef.current.get(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }
  };

  useEffect(() => {
    if (selectedService) {
      const element = itemsRef.current.get(selectedService);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", inline: "center" });
      }
    }
  }, []);

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex flex-1 flex-col p-6 md:px-10 space-y-4"
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2 text-amber-600">
          <Sparkles size={16} className="animate-pulse" />
          <span className="text-[10px] font-bold uppercase tracking-[0.2em]">
            Dịch vụ đặc biệt
          </span>
        </div>
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-2xl text-zinc-900 italic">
            Chọn combo nàng yêu
          </h3>
          <div className="p-2 bg-zinc-50 rounded-full text-zinc-400">
            <LayoutGrid size={18} />
          </div>
        </div>
      </div>

      <div className="relative group -mx-6 px-6">
        <div 
          ref={scrollContainerRef}
          className="flex flex-nowrap gap-5 overflow-x-auto no-scrollbar snap-x scroll-smooth px-1"
        >
          {services.map((item) => {
            const isActive = selectedService === item.id;
            return (
              <motion.div
                key={item.id}
                ref={(el) => {
                  if (el) itemsRef.current.set(item.id, el);
                  else itemsRef.current.delete(item.id);
                }}
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelect(item.id)}
                className={`group relative flex-none w-70 md:w-[320px] snap-center cursor-pointer flex flex-col rounded-[40px] border transition-all duration-500 ${
                  isActive
                    ? "border-amber-200 bg-white shadow-[0_20px_50px_rgba(251,191,36,0.15)]"
                    : "border-zinc-100 bg-white/50 hover:border-amber-100 shadow-sm"
                }`}
              >
                <div className="relative p-2.5">
                  <div className="relative aspect-16/11 w-full overflow-hidden rounded-4xl">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      unoptimized
                      className={`object-cover transition-transform duration-700 ${
                        isActive ? "scale-110" : "group-hover:scale-105"
                      }`}
                    />

                    <div
                      className={`absolute inset-0 bg-linear-to-t from-amber-900/40 to-transparent transition-opacity duration-300 ${
                        isActive ? "opacity-100" : "opacity-0"
                      }`}
                    />

                    <div
                      className={`absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full backdrop-blur-xl transition-all duration-500 shadow-xl ${
                        isActive
                          ? "bg-amber-500 text-white scale-100"
                          : "bg-black/20 text-transparent scale-0"
                      }`}
                    >
                      <CheckCircle2 size={18} strokeWidth={3} />
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-2 p-5 pt-2">
                  <h4 className={`font-serif text-lg leading-tight transition-colors ${
                    isActive ? "text-amber-900" : "text-zinc-800"
                  }`}>
                    {item.title}
                  </h4>

                  <p className="text-[11px] text-zinc-500 line-clamp-2 leading-relaxed font-light">
                    {item.desc}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-[9px] text-zinc-400 uppercase font-bold tracking-widest">
                        Giá trọn gói
                      </span>
                      <span className="font-black text-amber-600 text-xl tracking-tighter">
                        {item.price}
                      </span>
                    </div>
                    <div
                      className={`px-4 py-2 rounded-2xl text-[10px] font-bold transition-all duration-300 ${
                        isActive
                          ? "bg-amber-500 text-white shadow-lg shadow-amber-200"
                          : "bg-zinc-100 text-zinc-400"
                      }`}
                    >
                      CHỌN GÓI
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="absolute right-0 top-0 bottom-10 w-16 bg-linear-to-l from-[#FBFAF8] to-transparent pointer-events-none" />
      </div>

      <div className="mt-auto relative overflow-hidden rounded-[28px] border border-amber-100/50 bg-linear-to-br from-amber-50/80 to-orange-50/50 p-5">
        <div className="relative z-10 flex items-start gap-3">
          <div className="p-1.5 bg-white rounded-lg shadow-sm">
            <Info size={14} className="text-amber-500" />
          </div>
          <div className="space-y-1">
            <p className="text-[11px] font-bold text-amber-900/80 uppercase tracking-tighter">
              Lưu ý nhỏ dành cho nàng
            </p>
            <p className="text-[10px] italic text-zinc-500 leading-relaxed">
              Giá trên chưa bao gồm phí tháo gel cũ, phá bột & các yêu cầu
              design đính đá nâng cao.
            </p>
          </div>
        </div>
        <div className="absolute -right-4 -bottom-4 w-16 h-16 bg-amber-200/20 rounded-full blur-2xl" />
      </div>
    </motion.div>
  );
};