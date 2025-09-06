"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const BackgroundGradientAnimation = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative overflow-hidden flex flex-col items-center justify-center w-full h-full bg-gradient-to-br from-[#e0f7ff] to-[#cce0ff]">
      {/* Light blue to dark blue background gradient */}

      {/* Animated gradient blobs */}
      <div className="absolute top-0 left-[50%] w-72 h-72 bg-[#39A4D8]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_20s_infinite]" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-[#2C3E94]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_25s_infinite] delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-[#39A4D8]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_30s_infinite] delay-4000" />
      <div className="absolute -bottom-8 right-[50%] w-72 h-72 bg-[#2C3E94]/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-[blob_35s_infinite] delay-6000" />

      {children}
    </div>
  );
};

// Brand logo card component with hover effects
const BrandCard = ({ logo, index }: { logo: string; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{
        scale: 1.1,
        rotate: 5,
        boxShadow: "0 0 15px rgba(57, 164, 216, 0.6)",
      }}
      className="flex-shrink-0 bg-gradient-to-br from-[#e0f7ff] to-[#cce0ff] backdrop-blur-md rounded-lg p-6 h-24 w-24 flex items-center justify-center shadow-lg  transition-all duration-300 group"
    >
      <div className="relative overflow-hidden w-full h-full flex items-center justify-center">
        
        <span className="text-blue-600 font-bold relative z-10 group-hover:text-gradient">
          {logo}
        </span>
        <div className="absolute top-0 left-[50%] w-3 h-3 border-t border-l border-[#39A4D8] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-[#39A4D8] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-[#39A4D8] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:-translate-x-1 group-hover:translate-y-1" />
        <div className="absolute bottom-0 right-[50%] w-3 h-3 border-b border-r border-[#39A4D8] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:translate-y-1" />
      </div>
    </motion.div>
  );
};

// Badge component with animation
const AnimatedBadge = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="text-md sm:text-base text-white font-semibold backdrop-blur-md px-5 py-2 rounded-full border  bg-white/10 shadow-lg relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#39A4D8]/20 to-[#2C3E94]/20 opacity-100 transition-opacity duration-500" />
      <div className="relative z-10">{children}</div>
      <div className="absolute -inset-px bg-gradient-to-r from-[#39A4D8] to-[#2C3E94] rounded-full opacity-100 group-hover:opacity-30 blur-sm transition-all duration-500" />
    </motion.div>
  );
};

export default function Brands() {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    setIsInView(true);
  }, []);

  const logos = [
    "Adobe",
    "Microsoft",
    "Google",
    "Amazon",
    "Apple",
    "Netflix",
    "Tesla",
    "Meta",
  ];

  return (
    <div className="hidden md:block w-full h-[50vh] relative rounded-lg overflow-hidden">
      <BackgroundGradientAnimation>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 z-30 flex flex-col justify-center items-center px-4 py-6 text-white"
        >
          <motion.div
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-5 items-center mb-10 text-primary-dark"
          >
            <AnimatedBadge>Brands</AnimatedBadge>

            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-xl sm:text-3xl md:text-4xl font-semibold tracking-wide text-center sm:text-left"
            >
              <span className="text-gradient">Brands</span> we have worked with
            </motion.h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="w-full overflow-hidden relative"
          >
            <div className="w-full max-w-6xl mx-auto py-10">
              <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4 sm:gap-6 justify-items-center">
                {logos.map((logo, index) => (
                  <BrandCard key={index} logo={logo} index={index} />
                ))}
              </ul>
            </div>
          </motion.div>

          {/* Floating particles */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1 w-1 rounded-full bg-white/30"
                initial={{
                  x: Math.random() * 100 + "%",
                  y: Math.random() * 100 + "%",
                  opacity: Math.random() * 0.5 + 0.3,
                }}
                animate={{
                  y: [
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%",
                    Math.random() * 100 + "%",
                  ],
                }}
                transition={{
                  duration: Math.random() * 10 + 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>
        </motion.div>
      </BackgroundGradientAnimation>
    </div>
  );
}
