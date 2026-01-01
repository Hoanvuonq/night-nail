"use client";
import { cn } from "@/utils/cn";
import HeroSection from "../_components/HeroSection";
import LocationSection from "../_components/LocationSection";
import Service from "../_components/Service";
import { Web3LuxuryCarousel } from "../_components/ProcessSection";
import { Testimonials } from "../_components/Testimonials";
import { BentoLookbook } from "@/components/bentoLookbook";
import { WhyChooseUs } from "../_components/WhyChooseUs";
import { QualityCommitment } from "@/components/qualityCommitment";

const HomeScreens = () => {
  return (
    <div className={cn("w-full py-8 px-8")}>
      <HeroSection />
      <Service />
      <Web3LuxuryCarousel />
      <Testimonials />
      <LocationSection />
      <BentoLookbook />
      <QualityCommitment />
      <WhyChooseUs />
    </div>
  );
};

export default HomeScreens;
