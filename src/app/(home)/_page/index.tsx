"use client";
import dynamic from "next/dynamic";
import { cn } from "@/utils/cn";
import { HeroSection } from "@/app/(home)/_components/HeroSection";

const Service = dynamic(() => import("@/app/(home)/_components/Service").then(mod => mod.Service));
const ProcessSection = dynamic(() => import("@/app/(home)/_components/ProcessSection").then(mod => mod.ProcessSection));
const Testimonials = dynamic(() => import("@/app/(home)/_components/Testimonials").then(mod => mod.Testimonials));
const LocationSection = dynamic(() => import("@/app/(home)/_components/LocationSection").then(mod => mod.LocationSection));
const BentoLookbook = dynamic(() => import("@/app/(home)/_components/BentoLookbook").then(mod => mod.BentoLookbook));
const QualityCommitment = dynamic(() => import("@/app/(home)/_components/QualityCommitment").then(mod => mod.QualityCommitment));

const HomeScreens = () => {
  return (
    <div className={cn("w-full")}>
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
    </div>
  );
};

export default HomeScreens;
