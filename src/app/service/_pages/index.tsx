"use client";
import { cn } from "@/utils/cn";
import { Video } from "../_components/Video";
import Image from "next/image";
import { SERVICE_PRICING } from "@/contants/service";
import { Pricing } from "../_components/Pricing";


export const ServiceScreen = () => {
  return (
    <div className={cn("w-full py-10 md:py-16 px-4 md:px-8 bg-black text-white")}>
      <div className="max-w-6xl mx-auto flex flex-col gap-10 md:gap-12">
        
        <div className="w-full">
          <Video />
        </div>
        
        <div className="w-full flex flex-col items-center gap-10 md:gap-12 lg:flex-row lg:items-start lg:gap-16">
          
          <div className="w-full lg:w-[35%] flex flex-col gap-6 items-center lg:items-start text-center lg:text-left">
            <div className="flex xl:flex-row flex-col items-center gap-4">
              <Image
                src="/images/service/icon-dogs.png"
                height={80}
                width={80}
                alt="Night Nail Icon"
                className=" object-cover w-full h-full md:w-42 md:h-42"
              />
              <h1 className="text-5xl md:text-6xl lg:text-8xl text-main-color pacifico-regular-font">
                Night Nail
              </h1>
            </div>

            <p className="text-base md:text-lg text-gray-300">
              Chúng tôi cung cấp dịch vụ làm móng chuyên nghiệp với đội ngũ thợ
              lành nghề và sản phẩm chất lượng cao, cam kết mang lại sự hài lòng
              và trải nghiệm thư giãn tuyệt vời nhất.
            </p>
            <p className="text-lg font-semibold text-main-color mt-2">
              Xem bảng giá dịch vụ chi tiết:
            </p>
          </div>

          <div className="w-full lg:w-[65%]">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="md:col-span-2"> 

              <Pricing title="NAIL" items={SERVICE_PRICING.NAIL} />
              </div>
              <div className="md:col-span-2"> 

              <Pricing title="COMBO" items={SERVICE_PRICING.COMBO} />
              </div>

              <div className="md:col-span-2">
                <Pricing title="DESIGN" items={SERVICE_PRICING.DESIGN} />
              </div>

              <p className="text-sm italic text-gray-500 md:col-span-2 mt-4">
                Vui lòng đặt lịch trước để được phục vụ chu đáo nhất. Bảo hành
                móng 7 ngày.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};