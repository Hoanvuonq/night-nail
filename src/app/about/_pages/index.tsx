"use client";
import { cn } from "@/utils/cn";
import Design01 from "public/design_01";
import NailTechCartoon from "../_components/Card";
import { DATA_ABOUT, OWNER_NAME, STUDIO_NAME, LETTER_CONTENT } from "@/contants/about";

const AboutUsScreen = () => {
  const COLORS = {
    sageGreen: "#8DA68E",
    pinkPastel: "#E9C6BC",
    brown: "#8D5A1B",
    lightBackground: "#F8F4ED",
  };

  return (
    <div className={cn("w-full py-16 px-8")}>
      <div className="max-w-6xl mx-auto relative pt-10">
        <div className="flex items-end justify-center md:justify-start relative mb-20 md:mb-32">
          <h2
            className={cn(
              "pacifico-regular-font text-6xl md:text-[8rem] z-10 whitespace-nowrap w-full",
              "text-right md:text-left flex justify-end items-end pt-[3%] pr-[10%] text-main-color"
            )}
          >
            Giới Thiệu
          </h2>

          <div className="absolute top-[-30px] right-0 transform w-[180px] h-[180px] md:w-[200px] md:h-[300px] z-0">
            <div
              className="absolute top-0 right-0 w-full h-full rounded-t-full bg-background-gradient"
              style={{
                borderBottomLeftRadius: "50%",
                borderBottomRightRadius: "10px",
                clipPath: "polygon(0% 0%, 100% 0%, 100% 90%, 0% 90%)",
              }}
            ></div>
            <div
              className="absolute bottom-2 right-0 w-12 h-12 rounded-full "
              style={{ backgroundColor: COLORS.brown }}
            ></div>
          </div>
        </div>

        <div className="mt-10 lg:mt-20">
          <h3
            className="cherry-bomb-one-regular font-serif text-3xl md:text-4xl mb-10"
            style={{ color: COLORS.brown }}
          >
            CHUYỆN CỦA NIGHT NAIL
          </h3>

          <div
            className="space-y-6 text-base md:text-lg leading-relaxed max-w-4xl text-white"
          >
            <p>Xin chào!</p>
            <p>{LETTER_CONTENT.shortIntro}</p>
            <p>{LETTER_CONTENT.mission}</p>
            <p>{LETTER_CONTENT.callToAction}</p>
            <p className="pt-4">{LETTER_CONTENT.closing}</p>
            <p className="font-semibold text-xl"
              style={{ color: COLORS.brown }}
            >
              {OWNER_NAME}
            </p>
            <p className="text-sm italic text-white">
              Chủ Sáng Lập {STUDIO_NAME}
            </p>
          </div>
        </div>

        <div className=" flex justify-start">
          <Design01 />
        </div>
        <div className="flex item-center py-2">
          {DATA_ABOUT.map(({ id, img, title, text, href }) => (
            <NailTechCartoon key={id} img={img} title={title} text={text} href={href} />
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default AboutUsScreen;
