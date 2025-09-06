"use client";

import { useEffect } from "react";
import BlogHeader from "@/components/BlogComps/BlogHeader";
import BlogCards from "@/components/BlogComps/BlogCards";

export default function BlogPage() {
  // This useEffect is just to ensure proper hydration
  useEffect(() => {
    // This is intentionally left empty
  }, []);

  const GradientBlobBackground = () => {
    return (
      <>
        {/* Gradient Blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-gradient-radial opacity-20 blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Animated Dots Grid */}
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern
                id="dotPattern"
                width="30"
                height="30"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="5" cy="5" r="1.5" fill="var(--color-accent-glow)" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#dotPattern)" />
          </svg>
        </div>
      </>
    );
  };

  return (
    // <div className="relative w-full h-full">
    //   <GradientBlobBackground />
    //   <div className="relative z-10">
    //   <BlogHeader />
    //   <BlogCards />
    //   </div>
    // </div>

    <section className="relative w-full min-h-screen overflow-hidden">
      {/* Background image with blue-ish dull effect */}
      <div className="absolute inset-0 z-0">
        <img
          src="/gemini-kids.png"
          alt="kids"
          className="w-full h-full object-cover filter opacity-40 brightness-50 contrast-75"
        />

        {/* Optional blue tint overlay */}
        {/* <div className="absolute inset-0 bg-blue-500 opacity-10 mix-blend-multiply"></div> */}
      </div>

      {/* Content goes above the background */}
      <div className="relative z-10">
        {/* <BlogHeader /> */}
        <BlogHeader />
        <BlogCards />
      </div>
    </section>
  );
}
