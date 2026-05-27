"use client";
import { Button } from "@/components";
import { motion } from "framer-motion";
import { Car, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const STUDIO_ADDRESS = "378/12 Thống Nhất, Phường 16, Quận Gò Vấp, TP.HCM";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5755918844666!2d106.66220237583886!3d10.843755157946562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529af8922a7e1%3A0xe6bbcb87cfc788fc!2zMzc4IMSQLiBUaOG7kW5nIE5o4bqldCwgQW4gSOG7mWkgxJDDtG5nLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1779857018229!5m2!1svi!2s";

export const LocationSection = () => {
  return (
    <section id="location" className="relative w-full py-24 bg-[#fff5f4] overflow-hidden">
      <div className="absolute top-10 left-10 w-48 h-48 bg-[#ff7ba9]/10 blur-3xl rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#f4c7cc]/20 blur-3xl rounded-full animate-bounce duration-[5s] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-[#fce9eb] shadow-sm text-[#ff7ba9] text-sm font-bold mb-6">
            <Heart size={14} fill="currentColor" className="animate-beat" />
            <span className="uppercase tracking-widest text-xs">Ghé thăm tiệm nhỏ của tụi mình</span>
          </div>

          <h2 className="text-5xl md:text-7xl text-zinc-800 leading-tight font-bold tracking-tighter">
            Chỉ đường tới <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-[#e9b2b8] via-[#ff7ba9] to-[#ff4d79] sriracha-regular pr-4 italic">Night Nail</span>
          </h2>
          <p className="mt-2 text-zinc-400 font-bold tracking-widest text-xs md:text-sm uppercase">✨ 378/12 Thống Nhất, Gò Vấp ✨</p>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-10 p-6 rounded-[3rem] bg-white border-2 border-[#fce9eb] shadow-[0_20px_60px_-15px_rgba(233,178,184,0.15)] relative z-20">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-1/2 aspect-square max-h-112 rounded-4xl overflow-hidden border-4 border-[#fff5f4] shadow-lg relative group transform-gpu"
          >
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="grayscale-[0.2] group-hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 pointer-events-none transition-all ring-1 ring-inset ring-black/5 rounded-4xl" />
          </motion.div>

          <div className="w-full lg:w-1/2 flex flex-col space-y-8">
            <div className="bg-[#fce9eb] p-4 rounded-4xl border-l-4 border-[#ff7ba9]">
              <p className="text-md font-semibold text-zinc-800 leading-relaxed">
                "{STUDIO_ADDRESS}"
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white border border-[#fce9eb] shadow-sm flex items-center justify-center text-[#ff7ba9] group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  <Car size={20} />
                </div>
                <span className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">Chỗ đậu xe trong nhà <strong className="text-zinc-800"></strong></span>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-12 h-12 shrink-0 rounded-2xl bg-white border border-[#fce9eb] shadow-sm flex items-center justify-center text-[#ff7ba9] group-hover:scale-110 group-hover:-rotate-12 transition-transform">
                  <Sparkles size={20} />
                </div>
                <span className="text-zinc-600 text-base md:text-lg font-medium leading-relaxed">Khu vực <strong className="text-zinc-800">an toàn & yên tĩnh</strong> tuyệt đối.</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STUDIO_ADDRESS)}`}
                target="_blank"
                className="block w-fit"
              >
                <Button label="Xem đường đi ngay" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes beat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        .animate-beat {
          animation: beat 1s infinite;
        }
      `}</style>
    </section>
  );
};
