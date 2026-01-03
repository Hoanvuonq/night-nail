"use client";
import { motion, AnimatePresence, Variants, BezierDefinition } from "framer-motion";
import { navItems } from "@/contants/menu";
import Link from "next/link";
import { X, Sparkles, ArrowRight, Instagram, Facebook } from "lucide-react";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuComponent = ({ isOpen, onClose }: MenuProps) => {
  const transitionEase: BezierDefinition = [0.42, 0, 0.58, 1];
  const itemEase: BezierDefinition = [0.16, 1, 0.3, 1];

  // Variants cho container chính
  const menuVariants: Variants = {
    closed: {
      x: "-100%",
      transition: {
        duration: 0.5,
        ease: "easeInOut",
      },
    },
    open: {
      x: 0,
      transition: {
        duration: 0.6,
        ease: transitionEase,
      },
    },
  };

  const overlayVariants: Variants = {
    closed: { opacity: 0 },
    open: { opacity: 1 },
  };

  const itemVariants: Variants = {
    closed: { x: -30, opacity: 0 },
    open: (i: number) => ({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.3 + i * 0.1,
        duration: 0.5,
        ease: itemEase,
      },
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={overlayVariants}
            onClick={onClose}
            className="fixed inset-0 z-[99] bg-black/20 backdrop-blur-sm"
          />

          {/* Side Menu */}
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed top-0 left-0 bottom-0 z-[100] w-[85%] max-w-[400px] flex flex-col px-6 py-10 shadow-2xl overflow-y-auto"
          >
            {/* Header */}
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

            {/* Navigation */}
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
                    className="group flex items-end justify-between border-b border-amber-50/50 pb-4 transition-all duration-300"
                  >
                    <div className="flex flex-col">
                      <span className="text-amber-500 text-[9px] font-bold uppercase tracking-[0.2em] mb-1">
                        0{index + 1}
                      </span>
                      <h2 className="text-3xl font-black text-zinc-800 tracking-tight group-hover:text-amber-600 transition-colors">
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

            {/* Footer */}
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
                  <div className="flex gap-4">
                    <Link href="#" className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-500 hover:text-white transition-all">
                      <Instagram size={16} />
                    </Link>
                    <Link href="#" className="w-9 h-9 rounded-full bg-amber-50 flex items-center justify-center text-amber-600 hover:bg-amber-500 hover:text-white transition-all">
                      <Facebook size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Grainy Texture */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};