"use client";

import { AnimatedTestimonials } from "../ui/animated-testimonials";
import { Badge } from "../ui/badge";

export default function Team() {
  const GradientBlobBackground = () => {
    return (
      <>
        {/* Gradient Blobs */}
        <div className=" hidden md:block absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform translate-x-1/4 -translate-y-1/4" />
          <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform -translate-x-1/4" />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-gradient-radial opacity-20 blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
        </div>

        {/* Animated Dots Grid */}
        <div className=" hidden md:block absolute inset-0 opacity-20 pointer-events-none">
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
  const testimonials = [
    {
      quote:
        "The attention to detail and innovative features have completely transformed our workflow. This is exactly what we've been looking for.",
      name: "Sarah Chen",
      designation: "Product Manager at TechFlow",
      src: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=3560&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Implementation was seamless and the results exceeded our expectations. The platform's flexibility is remarkable.",
      name: "Michael Rodriguez",
      designation: "CTO at InnovateSphere",
      src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "This solution has significantly improved our team's productivity. The intuitive interface makes complex tasks simple.",
      name: "Emily Watson",
      designation: "Operations Director at CloudScale",
      src: "https://images.unsplash.com/photo-1623582854588-d60de57fa33f?q=80&w=3540&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "Outstanding support and robust features. It's rare to find a product that delivers on all its promises.",
      name: "James Kim",
      designation: "Engineering Lead at DataPro",
      src: "https://images.unsplash.com/photo-1636041293178-808a6762ab39?q=80&w=3464&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      quote:
        "The scalability and performance have been game-changing for our organization. Highly recommend to any growing business.",
      name: "Lisa Thompson",
      designation: "VP of Technology at FutureNet",
      src: "https://images.unsplash.com/photo-1624561172888-ac93c696e10c?q=80&w=2592&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <section
      className="relative w-full py-24 px-24 md:py-10 overflow-hidden"
      style={{
        backgroundColor: "var(--color-background)",
        color: "var(--color-text)",
      }}
    >
      <GradientBlobBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-col justify-center items-center m-2 p-2 ">
            <Badge
              variant="outline"
              className="text-md py-1 sm:text-base text-blue-600 font-semibold"
            >
              Team Members
            </Badge>

            <h1 className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-wide mt-5">
              Know Our <span className="text-gradient">Squad</span>
              <div className="lg:flex lg:justify-start lg:items-start w-40 h-1 max-lg:w-24 bg-gradient-animation rounded-full mx-auto mt-2"></div>
            </h1>
          </div>
          <div className="text-black">
            <AnimatedTestimonials testimonials={testimonials} />
          </div>
        </div>
      </div>
    </section>
  );
}
