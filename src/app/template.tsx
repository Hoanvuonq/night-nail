"use client";
import { ReactNode } from "react";
import "./globals.css";
import { Header, Footer } from "@/layouts";
import { LuxuryBackground } from "@/components/BackgroundEffects";
import { MobileNav } from "@/components/navMobile";

interface ITemplateProps {
  children: ReactNode;
}

const Template = ({ children }: ITemplateProps) => {
  return (
    <div className="all-center flex-col min-h-screen relative w-full">
      <div className="fixed top-0 w-full bg-[#0a0a0a] z-50 shadow-md">
        <Header />
      </div>
      <div className="pt-20 w-full relative">
        {children} 
        <MobileNav />
      </div>
      <Footer />
    </div>
  );
};

export default Template;
