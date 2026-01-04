"use client";
import { ReactNode } from "react";
import "./globals.css";
import { Header, Footer } from "@/layouts";
import { LuxuryBackground } from "@/components/BackgroundEffects";
import { MobileNav } from "@/components/navMobile";
import { usePathname } from "next/navigation";

interface ITemplateProps {
  children: ReactNode;
}

const Template = ({ children }: ITemplateProps) => {
  const pathname = usePathname();
  
  // FIX: Ẩn template cho cả trang booking và trang xem dịch vụ/bảng giá
  const isFullScreenPage = pathname?.includes("/booking") || pathname?.includes("/services");

  return (
    <div className="flex flex-col min-h-screen relative w-full bg-[#FBFAF8] selection:bg-amber-100">
      <LuxuryBackground />
      
      {!isFullScreenPage && <Header />}

      <main className={`flex-1 w-full relative z-10 ${!isFullScreenPage ? "pt-20" : "pt-0"}`}>
        {children} 
        
        {!isFullScreenPage && <MobileNav />}
      </main>

      {!isFullScreenPage && <Footer />}
    </div>
  );
};

export default Template;