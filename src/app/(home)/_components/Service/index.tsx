"use client";
import { ServiceComponents } from "@/components/serviceComponents";
import { DATA_SERVICE } from "@/contants/service";
import { motion } from "framer-motion";

export const Service = () => {
  return (
    <section id="services" className="relative  py-12 overflow-hidden">
      <div className="absolute top-0 right-0 w-125 h-125blur-[150px] rounded-full pointer-events-none" />
      <div className="max-w-7xl mx-auto px-0 sm:px-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="md:mb-20 mb-12 text-center lg:text-left"
        >
          <span className="text-[#ff7ba9] text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
            Dành Cho Bạn
          </span>
          <h2 className="text-6xl md:text-8xl sriracha-regular font-bold text-[#f4c7cc] tracking-tighter leading-none">
            Nghệ Thuật <br />
            <span className="text-transparent pr-2 bg-clip-text bg-linear-to-r from-[#e9b2b8] via-[#ff7ba9] to-[#ff4d79]">
              Làm Nail
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col md:gap-20 gap-4">
          {DATA_SERVICE.map((service, idx) => (
            <ServiceComponents
              key={service.title}
              index={idx + 1}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

