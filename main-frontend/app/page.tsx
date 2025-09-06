import Footer from "@/components/LandingComps/Footer";
import Hero from "../components/LandingComps/Hero";
import Navbar from "../components/LandingComps/Navbar";
import VideoSection from "../components/LandingComps/VideoSection";
import ContactForm from "@/components/LandingComps/ContactForm";
import FAQ from "@/components/LandingComps/FAQ";
import About from "@/components/LandingComps/About";
// import { HeroParallax } from "@/components/ui/hero-parallax";
import MissionPhilosophy from "@/components/LandingComps/MissionPhilosophy";
import TestimonialsSection from "@/components/LandingComps/Testimoniaals";
import NewsletterSection from "@/components/LandingComps/NewsLetter";

export default function Home() {
  
  return (
    <>
      <Hero />
      {/* <HeroParallax /> */}
      <VideoSection />
      <About />
      <MissionPhilosophy />
      {/* <TestimonialsSection /> */}
      <NewsletterSection />
      <FAQ />
      <ContactForm />
    </>
  );
}
