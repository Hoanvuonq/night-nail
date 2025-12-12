"use client";
import { ReactNode } from "react";
import "./globals.css";
import { Header, Footer } from "@/layouts";

interface ITemplateProps {
  children: ReactNode;
}

const Template = ({ children }: ITemplateProps) => {
  return (
    <div className="all-center flex-col min-h-screen relative w-full">
      <div className="fixed top-0 xl:w-[70%] w-full bg-[#0a0a0a] z-50 shadow-md">
        <Header />
      </div>
      <div className="pt-20 w-full">{children}</div>
      <Footer />
    </div>
  );
};

export default Template;
