"use client";
import {
  BentoLookbook,
  HeroSection,
  LocationSection,
  ProcessSection,
  QualityCommitment,
  Service,
  Testimonials,
  WhyChooseUs,
} from "@/app/(home)/_components";
import { cn } from "@/utils/cn";

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
