"use client";
import Image from "next/image";
import { cn } from "@/utils/cn";
import Link from "next/link"; 

interface PolicyCardProps {
  title: string; 
  text: string; 
  img: string;
  href: string; 
  className?: string;
}

export const PolicyCard = ({
  title,
  text,
  img,
  href,
  className
}: PolicyCardProps) => {
  return (
    <div
      className={cn(
        "relative w-full h-full max-w-full overflow-hidden cursor-pointer group",
        className
      )}
    >
      <div className="relative w-[360px] h-[460px]">
        <Image
          src={img}
          alt={title}
          fill
          className="object-cover w-full h-full rounded-t-[50%]"
          priority
        />
        
      </div>
      
      <div
        className={cn(
          "absolute inset-x-0 bottom-0 w-[360px]",
          "bg-background-gradient text-black p-2", 
          "h-[130px] transition-all duration-500 ease-in-out group-hover:h-[200px]", 
        )}
      >
        <h3 className="text-xl font-bold cherry-bomb-one-regular mb-2 uppercase">{title}</h3>

        <p className="text-sm mb-4 leading-relaxed line-clamp-3">
          {text}
        </p>

        <Link 
          href={href} 
          className="flex items-center text-sm font-semibold transition-opacity duration-300 opacity-80 group-hover:opacity-100"
        >
          Read More 
          <span className="ml-2 transform group-hover:translate-x-1 transition-transform">
            &rarr;
          </span>
        </Link>
      </div>
    </div>
  );
};

export default PolicyCard;