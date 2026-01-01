"use client";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/contants/menu";
import Link from "next/link";
import { X, Sparkles, ArrowRight, Instagram, Facebook } from "lucide-react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuComponent = ({ isOpen, onClose }: MenuProps) => {
  // Biến thể animation trượt từ TRÁI qua
  const menuVariants = {
    closed: {
      x: "-100%", // Nằm ngoài màn hình bên trái
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1], // Cubic-bezier chuẩn Wix Studio
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.76, 0, 0.24, 1],
      },
    },
  };

  // Hiệu ứng mờ nền (Overlay)
  const overlayVariants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants = {
    closed: { x: -30, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.4 + i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Lớp nền mờ khi mở menu */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 z-[99] bg-black/20 backdrop-blur-sm"
          />

          {/* Container Menu chính trượt từ trái */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 bottom-0 z-[100] w-[85%] max-w-[400px] bg-[#FDFCF9] flex flex-col px-6 py-10 shadow-2xl"
          >
            {/* Header Menu */}
            <div className="flex justify-between items-center mb-12">
              <div className="flex items-center gap-2">
                <Sparkles className="text-amber-500" size={18} />
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                  Night Nail
                </span>
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-amber-100 flex items-center justify-center text-zinc-900 bg-white shadow-sm"
              >
                <X size={20} />
              </motion.button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col gap-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  custom={index}
                  variants={itemVariants}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="group flex items-end justify-between border-b border-amber-50/50 pb-3"
                  >
                    <div className="flex flex-col">
                      <span className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">
                        0{index + 1}
                      </span>
                      <h2 className="text-3xl font-black text-zinc-800 tracking-tight group-active:text-amber-600 transition-colors">
                        {item.name}
                      </h2>
                    </div>
                    <ArrowRight 
                      className="text-amber-200 group-hover:text-amber-500 transition-transform group-hover:translate-x-2" 
                      size={24} 
                      strokeWidth={1.5} 
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* Footer Menu */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-auto pt-8 border-t border-amber-100"
            >
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-1">
                  <p className="text-[8px] uppercase font-black text-amber-600 tracking-widest">Địa chỉ</p>
                  <p className="text-[11px] text-zinc-500 leading-tight">
                    302/32 Phan Huy Ích, Gò Vấp, TP.HCM
                  </p>
                </div>
                
                <div className="space-y-3">
                  <p className="text-[8px] uppercase font-black text-amber-600 tracking-widest">Mạng xã hội</p>
                  <div className="flex gap-3">
                    <Link href="#" className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-500 hover:text-white transition-colors">
                      <Instagram size={14} />
                    </Link>
                    <Link href="#" className="w-8 h-8 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-500 hover:text-white transition-colors">
                      <Facebook size={14} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Noise Texture cho lớp nền sang trọng */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};