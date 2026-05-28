"use client";
import { SectionPage, TitleSection } from "@/components";
import { ServiceComponents } from "@/components/serviceComponents";
import { DATA_SERVICE } from "@/contants/service";

export const Service = () => {
  return (
    <section id="services" className="relative overflow-hidden w-full">
      <div className="absolute top-0 right-0 w-125 h-125blur-[150px] rounded-full pointer-events-none" />
      <SectionPage className="px-0 sm:px-10">
        <TitleSection
          tagText="Dành Cho Bạn"
          titleNormal="Nghệ Thuật"
          titleHighlight="Làm Nail"
          align="left"
          className="md:mb-20 mb-12 lg:items-start lg:text-left items-center text-center"
          titleNormalClassName="sriracha-regular text-[#f4c7cc]"
        />

        <div className="flex flex-col md:gap-8 gap-4">
          {DATA_SERVICE.map((service, idx) => (
            <ServiceComponents
              key={service.title}
              index={idx + 1}
              {...service}
            />
          ))}
        </div>
      </SectionPage>
    </section>
  );
};

