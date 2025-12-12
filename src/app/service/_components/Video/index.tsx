"use client";
import { cn } from "@/utils/cn";
import Design02 from "public/svg/design_02";
import Design03 from "public/svg/design_03";

export const Video = () => {
  return (
    <div className="w-full h-[60vw] md:h-[40vw] lg:h-[30vw] xl:h-[20vw] mx-auto relative pt-0 md:pt-4 lg:pt-8">
      <video
        src="/images/video/service.mp4"
        autoPlay
        muted
        loop
        className="w-full h-full relative z-10 object-cover rounded-lg shadow-2xl"
        poster="/images/video-poster.jpg"
      ></video>
      <div
        className={cn(
          "absolute inset-0 z-40",
          "flex items-center justify-center"
        )}
      >
        <span className="text-3xl md:text-5xl lg:text-6xl pacifico-regular-font font-extrabold text-main-color bg-[#F4D8CD] bg-opacity-70 px-6 py-3 md:p-4 rounded-xl tracking-wider shadow-xl">
          Dịch Vụ Nail
        </span>
      </div>
      {/* <div className="absolute top-[5vw] md:top-[6vw] right-[8vw] md:right-[10vw] z-30 w-16 h-16 md:w-20 md:h-20">
        <Design02 />
      </div>
      <div className="absolute top-[6vw] md:top-[6.7vw] right-[11vw] md:right-[12.6vw] z-20 w-12 h-12 md:w-16 md:h-16">
        <Design03 />
      </div> */}
    </div>
  );
};