"use client";
import {ServiceComponents} from "@/components/serviceComponents";
import { DATA_SERVICE } from "@/contants/service";
const Service = () => {
  return (
    <section id="section" className="flex items-start justify-between max-w-7xl mx-auto flex-col gap-16 py-2">
      {DATA_SERVICE.map((service) => (
        <ServiceComponents
          key={service.title}
          img={service.img}
          title={service.title}
          description={service.description}
          labelButton={service.labelButton}
          reverse={service.reverse}
        />
      ))}
    </section>
  );
};

export default Service;
