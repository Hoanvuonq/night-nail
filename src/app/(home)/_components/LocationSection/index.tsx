"use client";
import { Button } from "@/components";
import { motion } from "framer-motion";
import { Car, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const STUDIO_ADDRESS = "302/32 Phan Huy Ích, Phường 12, Quận Gò Vấp, TP.HCM";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.7878345719!2d106.63473487570415!3d10.827552058249051!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529437b04e8b3%3A0xe079379654e58b3e!2zMzAyLzMyIFBoYW4gSHV5IMWNoLCBQaMaw4budbmcgMTIsIEfDsiBW4bqlcCwgVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1710000000000!5m2!1svi!2s"; 

export const LocationSection = () => {
  return (
    <section id="location" className="relative w-full py-20  overflow-hidden">
      <div className="absolute top-10 left-10 w-32 h-32 bg-[#D4AF37]/10 blur-3xl rounded-full animate-pulse" />
      <div className="absolute bottom-10 right-10 w-48 h-48 bg-[#D4AF37]/5 blur-3xl rounded-full animate-bounce duration-[5s]" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#D4AF37]/10 border-2 border-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium mb-4">
            <Heart size={14} fill="currentColor" className="animate-beat" />
            <span>Ghé thăm tiệm nhỏ của tụi mình</span>
          </div>
          
          <h2 className="text-4xl md:text-6xl pacifico-regular-font text-black leading-tight">
            Chỉ đường tới <span className="text-[#D4AF37]">Night Nail</span>
          </h2>
          <p className="mt-4 text-black/40 font-light tracking-widest text-xs uppercase">✨ 302/32 Phan Huy Ích, Gò Vấp ✨</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-10  p-6 md:p-10 rounded-[3rem] border border-white/5 backdrop-blur-xl">
          
          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-1/2 aspect-square max-h-112 rounded-4xl overflow-hidden border-4 border-white/5 shadow-2xl relative group"
          >
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'contrast(1.1) brightness(0.9)' }}
              allowFullScreen={false}
              loading="lazy"
              className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 pointer-events-none transition-all" />
          </motion.div>

          <div className="w-full lg:w-1/2 flex flex-col space-y-8">
            <div className="bg-[#D4AF37]/5 p-8 rounded-4xl border-l-4 border-[#D4AF37]">
              <p className="text-2xl md:text-3xl font-serif italic text-black leading-relaxed">
                "{STUDIO_ADDRESS}"
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:rotate-12 transition-transform">
                  <Car size={20} />
                </div>
                <span className="text-black/70 text-lg font-light">Chỗ đậu xe <strong className="text-black">miễn phí</strong> cho cả ô tô nè!</span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 rounded-2xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] group-hover:rotate-12 transition-transform">
                  <Sparkles size={20} />
                </div>
                <span className="text-black/70 text-lg font-light">Khu vực <strong className="text-black">an toàn & yên tĩnh</strong> tuyệt đối.</span>
              </div>
            </div>

            <Link
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STUDIO_ADDRESS)}`}
              target="_blank"
              className="group relative w-full overflow-hidden py-5 rounded-4xl font-bold uppercase tracking-widest flex items-center justify-center gap-3 transition-all"
            >
              <Button label="Nhấn để xem đường đi ngay" />
            </Link>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes beat {
          0%, 100% { scale: 1; }
          50% { scale: 1.2; }
        }
        .animate-beat {
          animation: beat 1s infinite;
        }
      `}</style>
    </section>
  );
};
