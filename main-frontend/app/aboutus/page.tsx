import AboutUs from "@/components/AboutComps/AboutUs";
import Hero from "@/components/AboutComps/Hero";
import Founder from "@/components/AboutComps/Founder";
import Team from "@/components/AboutComps/Team";
import React from "react";
import WorkTimeline from "@/components/AboutComps/WorkTimeline";
import FAQSection from "@/components/LandingComps/FAQ";
import Footer from "@/components/LandingComps/Footer";
import MissionPhilosophySection from "@/components/LandingComps/MissionPhilosophy";
import Video_About from "@/components/AboutComps/Video_About";

const about = () => {
  return (
    <div className="w-full bg-[var(--color-background)] text-[var(--color-text)]">
      <Hero />
      <section className="py-4 px-4">
        <AboutUs />
      </section>
      <Video_About />
      <MissionPhilosophySection />
      <Founder />
      <WorkTimeline />
      <Team />
      {/* <Gallery /> */}
      <FAQSection />
    </div>
  );
};

export default about;
