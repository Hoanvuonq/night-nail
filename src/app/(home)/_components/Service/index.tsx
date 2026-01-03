"use client";
import { ServiceComponents } from "@/components/serviceComponents";
import { DATA_SERVICE } from "@/contants/service";
import { motion } from "framer-motion";

const Service = () => {
  return (
    <section id="services" className="relative  py-32 overflow-hidden">
      <div className="absolute top-0 right-0 w-125 h-125blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="mb-32 text-center lg:text-left"
        >
          <span className="text-amber-500 text-xs font-black uppercase tracking-[0.4em] mb-4 block">
            Our Expertise
          </span>
          <h2 className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-none">
            ARTISTRY <br />
            <span className="text-transparent bg-clip-text bg-linear-to-r from-amber-200 via-amber-500 to-amber-700">
              SERVICES
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-40">
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

export default Service;