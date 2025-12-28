"use client";
import { cn } from "@/utils/cn";
import HeroSection from "../_components/HeroSection";
import LocationSection from "../_components/LocationSection";
import Service from "../_components/Service";
import { Web3Gallery } from "../_components/ProcessSection";
import { Testimonials } from "../_components/Testimonials";
import { BentoLookbook } from "@/components/bentoLookbook";
import { WhyChooseUs } from "../_components/WhyChooseUs";

const HomeScreens = () => {
  return (
    <div className={cn("w-full py-8 px-8")}>
      <HeroSection />
      <Service />
      <Web3Gallery />
      <Testimonials />
      <LocationSection />
      <BentoLookbook />
      <WhyChooseUs />
    </div>
  );
};

export default HomeScreens;
