"use client";
import dynamic from "next/dynamic";
import { cn } from "@/utils/cn";
import { HeroSection } from "@/app/(home)/_components/HeroSection";

import { useState, useEffect } from "react";
import { LuckyWheelModal } from "@/components/LuckyWheelModal";

const Service = dynamic(() => import("@/app/(home)/_components/Service").then(mod => mod.Service));
const ProcessSection = dynamic(() => import("@/app/(home)/_components/ProcessSection").then(mod => mod.ProcessSection));
const Testimonials = dynamic(() => import("@/app/(home)/_components/Testimonials").then(mod => mod.Testimonials));
const LocationSection = dynamic(() => import("@/app/(home)/_components/LocationSection").then(mod => mod.LocationSection));
const BentoLookbook = dynamic(() => import("@/app/(home)/_components/BentoLookbook").then(mod => mod.BentoLookbook));
const QualityCommitment = dynamic(() => import("@/app/(home)/_components/QualityCommitment").then(mod => mod.QualityCommitment));

const HomeScreens = () => {
  const [isWheelOpen, setIsWheelOpen] = useState(false);

  // Auto-open modal after 2 seconds for a magical introduction
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsWheelOpen(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={cn("w-full relative")}>
      {/* HeroSection has id="hero" inside */}
      <HeroSection />

      <div id="service">
        <Service />
      </div>

      <div id="product">
        <ProcessSection />
      </div>

      <div id="about">
        <Testimonials />
        <LocationSection />
        <BentoLookbook />
        <QualityCommitment />
      </div>
      {/* <WhyChooseUs /> */}

      {/* Floating Lucky Wheel Button */}
      <button
        onClick={() => setIsWheelOpen(true)}
        className="fixed bottom-6 right-6 z-50 px-5 py-3 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white font-extrabold rounded-full shadow-2xl hover:shadow-pink-400/60 hover:scale-105 transition-all duration-300 border-2 border-white flex items-center gap-2 group animate-bounce"
        style={{
          boxShadow: "0 10px 25px rgba(244, 114, 182, 0.5)",
        }}
      >
        <span className="text-xl group-hover:rotate-12 transition-transform">🎁</span>
        <span className="text-xs sm:text-sm tracking-wider uppercase">Vòng Quay May Mắn</span>
      </button>

      {/* Lucky Wheel Modal Popup */}
      <LuckyWheelModal
        isOpen={isWheelOpen}
        onClose={() => setIsWheelOpen(false)}
      />
    </div>
  );
};

export default HomeScreens;
