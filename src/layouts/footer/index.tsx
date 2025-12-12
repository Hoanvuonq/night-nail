"use client";
import Link from "next/link";
import { cn } from "@/utils/cn";
import { navItems } from "@/contants/menu";
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
        <nav className="flex flex-wrap justify-center gap-6 md:gap-10 border-b border-gray-700 pb-6 w-full">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
             className={cn(
              "text-lg font-bold tracking-wide capitalize",
              "hover:opacity-100 transition duration-300",
              "underline-slide text-main-color"
            )}>
              {item.name}
            </Link>
          ))}
        </nav>
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
                  <Link href={"https://goo.gl/maps/your-address"} className="text-base font-medium"><strong className="text-lg">Địa chỉ :</strong>  302/32 Phan Huy Ích, Phường 12, Quận Gò Vấp, TP.HCM</Link>
                  <Link href={"mailto:thiyha24c@gmail.com"} className="text-base"><strong className="text-lg">Email :</strong>  thiyha24c@gmail.com</Link>
                  <Link href={"tell:0942153511"} className="text-base"><strong className="text-lg">SĐT :</strong>  094 215 3511</Link>
                  <div className="flex items-center gap-4 ">
                    {socialItems.map((item) => (
                    <Link key={item.name} href={item.href} className="text-base border border-amber-100 rounded-full">
                      <Image src={item.img} alt={item.name} width={32} height={32} />
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
