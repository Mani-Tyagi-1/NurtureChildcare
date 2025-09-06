import AboutUs from "@/components/AboutComps/AboutUs";
import Brands from "@/components/AboutComps/Brands";
import Hero from "@/components/AboutComps/Hero";
import Founder from "@/components/AboutComps/Founder";
import Values from "@/components/AboutComps/Values";
import Team from "@/components/AboutComps/Team";
import React from "react";
import WorkTimeline from "@/components/AboutComps/WorkTimeline";
import Gallery from "@/components/AboutComps/Gallery";
import FAQSection from "@/components/LandingComps/FAQ";
import Footer from "@/components/LandingComps/Footer";

const about = () => {
  return (
    <div className="w-full bg-[var(--color-background)] text-[var(--color-text)]">
  
    <Hero />
  <section className="py-4 px-4">
    <AboutUs />
  </section>
    {/* <Brands /> */}
    <Founder />
    <Values />
      {/* <WorkTimeline /> */}
      <section className="hidden md:block">
        <Team />
      </section>
    {/* <Gallery /> */}
    <FAQSection />
</div>
  )
}

export default about;
