"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const AnimatedDotsBackground = () => {
  const [dotDimensions, setDotDimensions] = useState({ cols: 0, rows: 0 });
  const dotSize = 3;
  const gap = 40;

  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll();
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]); // 200px parallax offset

  useEffect(() => {
    const calculateGrid = () => {
      const width = containerRef.current?.offsetWidth || window.innerWidth;
      const height = containerRef.current?.offsetHeight || window.innerHeight;

      const motionDivWidth = width * 1.2;
      const motionDivHeight = height * 1.4;

      setDotDimensions({
        cols: Math.ceil(motionDivWidth / gap),
        rows: Math.ceil(motionDivHeight / gap),
      });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden z-0 pointer-events-none"
      aria-hidden="true"
    >
      <motion.div
        className="absolute"
        style={{
          width: "120%",
          height: "140%",
          left: "50%",
          top: "50%",
          x: "-60%", // center the 120% wide div (half of 120)
          y: "-70%", // center the 140% tall div (half of 140)
          translateY: y,
        }}
      >
        {Array.from({ length: dotDimensions.rows }).flatMap((_, row) =>
          Array.from({ length: dotDimensions.cols }).map((_, col) => (
            <div
              key={`${row}-${col}`}
              className="absolute rounded-full bg-[#F58327] opacity-30"
              style={{
                width: dotSize,
                height: dotSize,
                left: col * gap,
                top: row * gap,
              }}
            />
          ))
        )}
      </motion.div>
    </div>
  );
};

export default AnimatedDotsBackground;
