"use client";
import Button from "@/components/button";
import { cn } from "@/utils/cn";
import Image from "next/image";
import { Leaf } from "public/leaf";
import Service from "../_components/Service";
import LocationSection from "../_components/LocationSection";

const HomeScreens = () => {
  const goldGradientStyle = {
    backgroundImage:
      "linear-gradient(160deg, #e7aa51 0%, #ffe499 30%, #8d5a1b 60%, #e7aa51 80%, #ac7031 100%)",
  };

  return (
    <div className={cn("w-full py-16 px-8")}>
      <section id="home" className="flex items-start justify-between max-w-7xl mx-auto">
        <div className="flex flex-col items-center pt-10 w-full md:w-1/2">
          <h1 className={cn("leading-tight xl:text-start text-center mb-4 pacifico-regular-font text-main-color")}>
            <span className="leading-snug text-7xl md:text-6xl block">Chào mừng bạn,</span>
            <span className="leading-relaxed text-5xl md:text-8xl block mt-2">Night Nail</span>
            <span className="leading-relaxed text-5xl md:text-7xl block"> 
              Nghệ thuật của riêng bạn.
            </span>
          </h1>

          <div className="mt-8 flex flex-col gap-4 w-full items-center justify-center">
            <p className="text-3xl font-bold pacifico-regular-font text-detail-color">
              Ghé Thăm Studio
            </p>
            <p className="text-2xl tracking-widest text-center font-bold cherry-bomb-one-regular font-serif text-white w-[80%] md:w-[50%]">
              302/32 Phan Huy Ích, Gò Vấp, TP.HCM
            </p>
            <Button label="Đặt Lịch Ngay" />
          </div>
        </div>
        <div className="relative w-1/2 max-w-[500px] h-[700px] hidden md:block">
          <div
            style={goldGradientStyle}
            className={cn(
              "absolute top-10 right-0 w-[80%] h-[80%]",
              "rounded-t-[80px] rounded-bl-[80px]"
            )}
          >
             <Image
              src="/images/news/product-01.png"
              alt="Mẫu Nail Art Cao Cấp" 
              fill
              className="object-cover rounded-t-[40px] rounded-bl-[40px]"
            />
          </div>

          <div className="absolute rotate-[60deg] bottom-2 -right-18 z-30 opacity-70">
            <Leaf />
          </div>
        </div>
      </section>
      <Service />
      <LocationSection/> 
    </div>
  );
};

export default HomeScreens;