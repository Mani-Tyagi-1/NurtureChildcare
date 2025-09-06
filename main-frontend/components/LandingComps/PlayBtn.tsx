"use client";

import { motion } from "framer-motion";
import { FaPlay } from "react-icons/fa";

const GlassPlayButton = () => {
  return (
    <motion.div
      className="relative flex items-center justify-center"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Outer glass circle */}
      <div
        className="absolute w-16 h-16 md:w-32 md:h-32 rounded-full backdrop-blur-md shadow-lg border"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          borderColor: "rgba(255, 255, 255, 0.2)",
        }}
      />

      {/* Inner neutral circle */}
      <div
        className="absolute hidden md:block w-24 h-24 rounded-full shadow-inner border"
        style={{
          backgroundColor: "rgba(17, 24, 39, 0.8)", // tailwind slate-900 / --color-text-strong equivalent
          borderColor: "rgba(51, 65, 85, 0.5)", // tailwind slate-700
        }}
      />

      {/* Primary theme play button */}
      <motion.button
        className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg"
        style={{
          backgroundImage:
            "linear-gradient(to bottom right, var(--color-primary-500), var(--color-primary-dark))",
        }}
        initial={{ boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.3)" }}
        whileHover={{
          boxShadow: "0 10px 25px -3px rgba(37, 99, 235, 0.4)", // var(--color-primary-500)
        }}
      >
        <FaPlay className="text-white text-xl ml-1" />
      </motion.button>

      {/* Subtle reflection effect */}
      <div className="absolute z-20 top-1/4 left-1/4 w-2 h-2 rounded-full bg-white/50 blur-[1px]" />
    </motion.div>
  );
};

export default GlassPlayButton;
