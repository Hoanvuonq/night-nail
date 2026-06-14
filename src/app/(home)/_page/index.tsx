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
      <HeroSection />
      <Service />
      <ProcessSection />
      <Testimonials />
      <LocationSection />
      <BentoLookbook />
      <QualityCommitment />
      {/* <WhyChooseUs /> */}
    </div>
  );
};

export default HomeScreens;
