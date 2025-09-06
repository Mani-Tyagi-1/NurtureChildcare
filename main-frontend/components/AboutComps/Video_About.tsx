"use client";

import VideoSection from "../LandingComps/VideoSection";
import { BackgroundGradientAnimation } from "../ui/background-gradient-animation";
import { Badge } from "../ui/badge";

export default function Video_About() {
  
  
 return (
  <div className="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <BackgroundGradientAnimation
     gradientBackgroundStart="#f0f8ff" // AliceBlue
  gradientBackgroundEnd="#e6f7ff"   // Light Sky Blue tint
  firstColor="173, 216, 230"        // LightBlue
  secondColor="135, 206, 250"       // LightSkyBlue
  thirdColor="176, 224, 230"        // PowderBlue
  fourthColor="224, 255, 255"       // LightCyan
  fifthColor="240, 248, 255"        // AliceBlue again
  pointerColor="100, 149, 237"      // CornflowerBlue
  blendingValue="lighten"
  size="80%">
      
     <VideoSection />
    </BackgroundGradientAnimation>
  </div>
);

}