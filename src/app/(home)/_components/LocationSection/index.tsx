"use client";
import { motion } from "framer-motion";
import { Car, Heart, MapPin } from "lucide-react";
import Link from "next/link";
import { TitleSection } from "@/components";

const STUDIO_ADDRESS = "378/12 Thống Nhất, Phường 16, Quận Gò Vấp, TP.HCM";
const MAP_EMBED_URL = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.5755918844666!2d106.66220237583886!3d10.843755157946562!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529af8922a7e1%3A0xe6bbcb87cfc788fc!2zMzc4IMSQLiBUaOG7kW5nIE5o4bqldCwgQW4gSOG7mWkgxJDDtG5nLCBI4buTIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1779857018229!5m2!1svi!2s";

export const LocationSection = () => {
  return (
    <section id="location" className="relative w-full bg-[#fff5f4] overflow-hidden">
      <div className="absolute top-10 left-10 w-48 h-48 bg-[#ff7ba9]/10 blur-3xl rounded-full animate-pulse pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#f4c7cc]/20 blur-3xl rounded-full animate-bounce duration-[5s] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <TitleSection
          tagIcon={<MapPin size={14} className="animate-bounce" />}
          tagText="Địa chỉ xinh - Nail xịn - Chỉ có ở Night Nail"
          titleNormal="Chỉ đường tới"
          titleHighlight="Night Nail"
          description="Đến là xinh - Nail là mê"
          className="mb-10"
        />

        <div className="flex flex-col lg:flex-row gap-8 p-3 md:p-6 rounded-[3rem] md:rounded-[40px] bg-white border-2 border-[#fce9eb] shadow-[0_20px_60px_-15px_rgba(233,178,184,0.15)] relative z-20">
          <motion.div
            whileHover={{ scale: 1.01 }}
            className="w-full lg:w-1/2 aspect-square lg:aspect-auto lg:h-auto min-h-[450px] rounded-4xl overflow-hidden border-4 border-[#fff5f4] shadow-sm relative group transform-gpu"
          >
            <iframe
              src={MAP_EMBED_URL}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              className="grayscale-[0.1] group-hover:grayscale-0 transition-all duration-700"
            />

            <div className="absolute top-4 left-4 md:top-6 md:left-6 bg-white/95 backdrop-blur-md px-4 py-3 md:px-5 md:py-4 rounded-2xl md:rounded-3xl shadow-[0_10px_30px_rgba(0,0,0,0.08)] flex items-center gap-3 md:gap-4 max-w-[85%]">
              <div className="flex-1">
                <h4 className="text-[#ff7ba9] font-bold text-sm md:text-base mb-0.5">Night Nail Studio</h4>
                <p className="text-zinc-500 text-[10px] md:text-xs font-medium leading-relaxed">{STUDIO_ADDRESS}</p>
              </div>
              <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#fce9eb] text-[#ff7ba9] flex items-center justify-center shrink-0">
                <MapPin size={16} fill="currentColor" className="text-[#ff4d79]" />
              </div>
            </div>

            <div className="absolute inset-0 pointer-events-none transition-all ring-1 ring-inset ring-black/5 rounded-4xl" />
          </motion.div>

          <div className="w-full lg:w-1/2 flex flex-col p-4 md:p-6">

            <div className="bg-[#fce9eb]/80 px-6 py-5 rounded-3xl flex items-center gap-4 mb-10">
              <div className="w-12 h-12 bg-white/60 text-[#ff7ba9] rounded-full flex items-center justify-center shrink-0 shadow-sm border border-white">
                <Car size={22} />
              </div>
              <div>
                <h4 className="text-[#ff7ba9] font-bold text-xs md:text-sm uppercase tracking-widest mb-1">Hướng dẫn đường đi</h4>
                <p className="text-zinc-500 text-xs font-medium">Khoảng 5 phút - Từ đầu hẻm Thống Nhất</p>
              </div>
            </div>

            <div className="relative space-y-8 flex-1 ml-2 md:ml-4 mb-10">
              <div className="absolute top-6 bottom-6 left-5 w-px border-l-2 border-dashed border-[#fce9eb] -z-10" />

              <div className="flex items-center gap-6 group">
                <div className="w-10 h-10 bg-white border-2 border-[#fce9eb] group-hover:border-[#ff7ba9] group-hover:text-[#ff7ba9] text-zinc-400 transition-colors duration-300 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm z-10">01</div>
                <p className="text-zinc-700 font-medium text-sm md:text-base pt-0.5">Đầu hẻm 378 Thống Nhất có tiệm Toco Toco.</p>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-10 h-10 bg-white border-2 border-[#fce9eb] group-hover:border-[#ff7ba9] group-hover:text-[#ff7ba9] text-zinc-400 transition-colors duration-300 rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-sm z-10">02</div>
                <p className="text-zinc-700 font-medium text-sm md:text-base pt-0.5">Nàng đi thẳng vào hẻm khoảng 200m.</p>
              </div>

              <div className="flex items-center gap-6 group">
                <div className="w-10 h-10 bg-white border-2 border-[#ff7ba9] text-[#ff7ba9] rounded-full flex items-center justify-center font-bold text-sm shrink-0 shadow-[0_0_15px_rgba(255,123,169,0.3)] z-10">03</div>
                <p className="text-[#ff7ba9] font-bold text-sm md:text-base pt-0.5">Night Nail nằm bên tay phải nha 💖</p>
              </div>
            </div>

            {/* Bottom Dotted Button/Box */}
            <Link
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(STUDIO_ADDRESS)}`}
              target="_blank"
              className="block w-full hover:opacity-90 transition-opacity"
            >
              <div className="border-2 border-dashed border-[#ff7ba9]/50 bg-[#fce9eb]/40 hover:bg-[#fce9eb] transition-colors rounded-[24px] py-5 px-4 flex items-center justify-center gap-2 text-[#ff7ba9] font-bold text-sm uppercase tracking-widest text-center cursor-pointer shadow-sm">
                <Heart size={16} fill="currentColor" className="text-[#ff4d79]" />
                Hẹn bạn ở Night Nail nhé! 💅
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
