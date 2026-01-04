"use client";
import { motion } from "framer-motion";
import Image from "next/image";

export default function TetSchedulePage() {
  return (
    <div className="h-dvh w-full bg-[#FBFAF8] flex items-center justify-center p-2 overflow-hidden">
      <div className="w-full h-full max-w-4xl flex items-center justify-center">
        <motion.section 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative w-full h-full"
        >
          <motion.div
            className="relative w-full h-full rounded-2xl md:rounded-4xl overflow-hidden shadow-2xl "
          >
            <Image
              src="/images/service/services.png" 
              alt="Lịch Nail Tết 2026"
              fill
              priority
              quality={100}
              className="object-contain" 
            />
          </motion.div>
        </motion.section>
      </div>
    </div>
  );
}