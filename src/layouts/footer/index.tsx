"use client";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { CONTACT_ITEMS } from "@/contants/contact";
import Design01 from "public/design_01";
import Image from "next/image";
import Button from "@/components/button";
import { socialItems } from "@/contants/social";
export const Footer = () => {
  const primaryColor = "text-[#ebaa12]";
  const bgColor = "bg-black";

  return (
    <footer className={cn("w-full py-0 px-8 md:px-16", bgColor, primaryColor)}>
      <div className="max-w-7xl mx-auto flex flex-col items-center space-y-8">
        <div className="flex items-center xl:flex-row flex-col gap-5">
          <div className="flex items-center xl:flex-row flex-col gap-2 w-full">
            <div className="h-80 w-80 relative">
              <Image
                src={"/images/logo/ha_ant.png"}
                alt="Night Nail"
                fill
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col items-center text-center space-y-4 w-full">
              <div className="flex items-start flex-col gap-10">
                <h1 className="text-5xl pacifico-regular-font text-main-color">
                  Night Nail
                </h1>
                <div className="flex flex-col items-start gap-2">
                  <div className="flex flex-col items-start justify-start gap-3 ">
                    {CONTACT_ITEMS.map((item) => (
                      <Link
                        key={item.type}
                        href={item.href}
                        className="text-base font-medium text-main-color/70 hover:text-main-color transition"
                      >
                        <strong className="text-lg">{item.type}:</strong>{" "}
                        {item.value}
                      </Link>
                    ))}
                  </div>
                 
                  <div className="flex items-center gap-4 ">
                    {socialItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-base border border-amber-100 rounded-full"
                      >
                        <Image
                          src={item.img}
                          alt={item.name}
                          width={32}
                          height={32}
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <Button label="Đặt Lịch" />
            <Design01 />
          </div>
        </div>
      </div>
    </footer>
  );
};
