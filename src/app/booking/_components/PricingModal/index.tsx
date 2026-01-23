"use client";

import { X, ReceiptText, Sparkles, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { SERVICE_PRICING } from "@/contants/service";
import Image from "next/image";

export const PricingModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed sriracha-regular inset-0 z-50 flex items-end md:items-center justify-center bg-zinc-900/60 backdrop-blur-md p-0 md:p-4">
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "100%", opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="bg-[#FBFAF8] w-full max-w-xl rounded-t-[40px] md:rounded-[48px] overflow-hidden max-h-[92vh] flex flex-col shadow-2xl border-t border-white"
      >
        {/* Header */}
        <div className="relative p-6 border-b border-zinc-100 flex justify-between items-center bg-white/80">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-3 bg-linear-to-br from-amber-100 to-orange-100 rounded-2xl text-amber-600 shadow-sm">
                <ReceiptText size={22} />
              </div>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-1 -right-1 text-orange-400"
              >
                <Sparkles size={12} fill="currentColor" />
              </motion.div>
            </div>
            <div>
              <h3 className="font-sans text-2xl italic text-zinc-900 -tracking-tighter">
                Menu Tiệm Em
              </h3>
              <p className="text-[12px] text-zinc-600 uppercase font-semiboldflex items-center gap-1">
                Làm đẹp để yêu bản thân <Heart size={20} fill="currentColor" className="text-pink-400" />
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 cursor-pointer bg-zinc-100 hover:bg-zinc-200 rounded-full transition-all active:scale-90"
          >
            <X size={20} className="text-zinc-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto no-scrollbar space-y-10 pb-24 bg-linear-to-b from-white to-orange-50/30">
          {Object.entries(SERVICE_PRICING).map(([category, items]) => (
            <div key={category} className="relative space-y-4">
              <div className="flex items-center gap-4">
                <h4 className="text-[13px] font-bold text-amber-700 uppercase tracking-[0.2em] bg-amber-100/60 px-4 py-1.5 rounded-full whitespace-nowrap">
                  {category === "NAIL" ? "✿ Dịch vụ lẻ" : category === "COMBO" ? "✿ Gói ưu đãi" : "✿ Design móng"}
                </h4>
                <div className="h-px w-full bg-linear-to-r from-amber-100 to-transparent" />
              </div>

              <div className="grid grid-cols-1 gap-3">
                {items.map((item: any, idx) => (
                  <motion.div
                    key={idx}
                    whileHover={{ scale: 1.01, backgroundColor: "#fff" }}
                    className="flex justify-between items-center p-3 pr-5 rounded-[28px] border border-white bg-white/50 shadow-[0_4px_12px_rgba(0,0,0,0.02)] transition-all"
                  >
                    <div className="flex items-center gap-4">
                      <div className="relative w-14 h-14 shrink-0 rounded-[20px] overflow-hidden border-2 border-white shadow-sm bg-zinc-100">
                        <Image
                          src={item.image || "/booking/placeholder.jpg"}
                          alt={item.service}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="text-lg font-sans text-zinc-800 leading-tight">
                          {item.service}
                        </span>
                        <span className="text-[13px] text-zinc-500 font-medium">
                          {category === "DESIGN" ? "Đơn vị: Ngón" : "Giá tham khảo"}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-amber-600 text-lg tracking-tighter">
                        {item.price}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};