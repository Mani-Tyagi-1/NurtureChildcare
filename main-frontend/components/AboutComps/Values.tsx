// "use client";
// import { motion} from "motion/react";
// import { FlipWords } from "../ui/flip-words";

// export default function Hero() {
//  const text = [
//   "Innovation",
//   "Empathy",
//   "Integrity",
//   "Transparency",
//   "Support",
//   "Creativity",
//   "Impact",
//   "Trust",
//   "Purpose",
//   "Excellence"
// ];
    
//  return (
//     <div className="h-[350px] w-full flex items-center justify-center relative overflow-hidden bg-primary-dark">
//          <motion.img
//         src="https://media.istockphoto.com/id/494239087/photo/group-of-young-children-running-towards-camera-in-park.jpg?s=612x612&w=0&k=20&c=9IDu7zZtdl38Qq4ntnA1hXkmzwC-SMtV4DfcjsRJjHQ="
//         className="h-full w-full object-left absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 0.5 }}
//         transition={{ duration: 1 }}
//       />
//          <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans">
//   Built on <FlipWords words={text} className="text-teal-500"/>, <br /> driven by purpose.
// </h1>

//     </div>
//  );}






"use client";

import { motion } from "framer-motion";
import { FlipWords } from "../ui/flip-words";
// import { Button } from "../ui/button";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function Hero() {
  const words = [
    "Innovation",
    "Empathy",
    "Integrity",
    "Transparency",
    "Support",
    "Creativity",
    "Impact",
    "Trust",
    "Purpose",
    "Excellence",
  ];

  return (
    <motion.section
      className="relative min-h-[400px] w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#60a5fa]to-[#bfdbfe]  py-16 "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Background Image */}
      <motion.img
        src="https://media.istockphoto.com/id/494239087/photo/group-of-young-children-running-towards-camera-in-park.jpg?s=612x612&w=0&k=20&c=9IDu7zZtdl38Qq4ntnA1hXkmzwC-SMtV4DfcjsRJjHQ="
        className="absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(circle,transparent_30%,black_80%)] pointer-events-none"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.4, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.h1
          variants={itemVariants}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary-dark leading-tight mb-6"
        >
          Built on{" "}
          <FlipWords
            words={words}
            className=" bg-gradient-to-r from-[#60a5fa] via-[#3c5fc0] to-[#60a5fa] font-extrabold "
          />
          ,<br />
          driven by purpose.
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="text-lg sm:text-xl text-[#1e3a8a] mb-8 max-w-2xl mx-auto"
        >
          Join us in creating meaningful impact through innovative solutions and
          unwavering commitment.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <button
            className="hover:bg-[#a78bfa] text-white px-8 py-3 rounded-full text-lg font-semibold ] transition-colors shadow-lg hover:shadow-xl"
            onClick={() => (window.location.href = "/get-started")}
            style={{
              backgroundColor:
                "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
              boxShadow: "0 4px 12px rgba(124, 58, 237, 0.5)",
              background:
                "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
            }}
          >
            Get Started
          </button>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-32 bg-[#a78bfa]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-[#60a5fa]/20 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </motion.section>
  );
}