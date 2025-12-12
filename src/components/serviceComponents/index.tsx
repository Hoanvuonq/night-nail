"use client";
import Image from "next/image";
import Button from "../button";

interface IServiceProps {
  img?: string;
  title: string;
  description?: string;
  labelButton?: string;
  reverse?: boolean;
}
export const ServiceComponents = ({
  img,
  title,
  description,
  labelButton,
  reverse, 
}: IServiceProps) => {
  return (
    <div 
      className={`
        flex items-center w-full justify-center gap-10 
        ${reverse ? 'xl:flex-row-reverse flex-col' : 'xl:flex-row flex-col'} 
      `}
    >
      <div className="w-86 h-86 relative flex-shrink-0">
        <Image
          src={img || "/images/service/service_nail__01.jpg"}
          alt={title}
          fill
          className="rounded-full h-full w-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
        />
      </div>

      <div className="flex flex-col gap-4 xl:w-[50%] xl:text-left text-center w-[80%]">
        <h3 className="text-5xl font-bold pacifico-regular-font text-main-color">{title}</h3>
        <p className="text-sm xl:pl-20 pl-0 tracking-wide leading-relaxed">{description}</p>
        <div className="w-full flex justify-center">
          <Button label={labelButton} />
        </div>
      </div>
      
    </div>
  );
};
