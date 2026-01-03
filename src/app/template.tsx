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
  
  const isBookingPage = pathname?.includes("/booking");

  return (
    <div className="flex flex-col min-h-screen relative w-full  bg-cream-luxury selection:bg-amber-100">
      <LuxuryBackground />
      
      {!isBookingPage && <Header />}

      <main className={`flex-1 w-full relative z-10 ${!isBookingPage ? "pt-20" : "pt-0"}`}>
        {children} 
        
        {!isBookingPage && <MobileNav />}
      </main>

      {!isBookingPage && <Footer />}
    </div>
  );
};

export default Template;