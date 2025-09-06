"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { useInView } from "react-intersection-observer";

interface TimelineItemProps {
  item: {
    date: string;
    year: string;
    title: string;
    description: string;
    link?: string;
  };
  index: number;
  totalItems: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  item,
  index,
  totalItems,
}) => {
  const { date, year, title, description, link } = item;
  const isLeft = index % 2 !== 0; // Items on the left have odd indices (1, 3, ...)
  const controls = useAnimation();
  const [ref, inView] = useInView({
    threshold: 0.25,
    triggerOnce: true,
  });

  // Trigger animation when element comes into view
  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: isLeft ? -50 : 50,
      y: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.6,
      },
    },
  };

  const markerVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        delay: 0.2,
        duration: 0.4,
        type: "spring",
        stiffness: 150,
      },
    },
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: "100%",
      transition: {
        delay: 0.3,
        duration: 0.6,
      },
    },
  };

  return (
    <div ref={ref} className="relative w-full mb-16 last:mb-0">
      {/* --- Mobile Layout (Vertical Stack) --- */}
      <div className="md:hidden flex flex-col w-full">
        {/* Mobile Date Marker & Line */}
        <div className="flex items-center mb-2">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={markerVariants}
            className="relative z-10 flex flex-col items-center justify-center w-18 h-18 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full shadow-lg text-white"
          >
            <Clock className="w-4 h-4 mb-0.5 text-blue-200" />
            <span className="text-sm font-semibold">{date}</span>
            <span className="text-xs font-light">{year}</span>
            {/* Vertical connecting line for mobile */}
            <motion.div
              initial="hidden"
              animate={controls}
              variants={lineVariants}
              className={` md:block hidden absolute top-full left-1/2 transform  -translate-x-1/2 w-0.5 h-[60px] bg-gradient-to-b from-blue-500 to-blue-300 ${
                index === totalItems - 1 ? "hidden" : ""
              }`}
              // style={{ height: "60px" }}
            ></motion.div>
          </motion.div>
          <div className="flex-grow border-t-2 border-blue-300/30 ml-4"></div>
        </div>

        {/* Mobile Card */}
        <motion.div
          initial="hidden"
          animate={controls}
          variants={itemVariants}
          className="ml-0 bg-gradient-to-br from-blue-900 to-blue-950 text-white p-6 rounded-xl shadow-xl border border-blue-700/20 backdrop-blur-sm"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <h3 className="text-xl font-bold mb-3 text-blue-100">{title}</h3>
          <p className="text-sm text-blue-200 leading-relaxed mb-4">
            {description}
          </p>
          {link && (
            <a
              href={link}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors duration-200 group"
            >
              Download PDF
              <motion.div whileHover={{ x: 4 }} transition={{ duration: 0.2 }}>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </motion.div>
            </a>
          )}
        </motion.div>
      </div>

      {/* --- Desktop Layout (Alternating Sides) --- */}
      <div
        className={`hidden md:flex w-full items-center ${
          isLeft ? "flex-row-reverse" : "flex-row"
        } relative`}
      >
        {/* Card Section (Left or Right) */}
        <div className="w-5/12 px-4">
          <motion.div
            initial="hidden"
            animate={controls}
            variants={itemVariants}
            className="bg-gradient-to-br from-blue-900 to-blue-950 text-white p-7 rounded-xl shadow-xl border border-blue-700/20 backdrop-blur-sm"
            whileHover={{
              y: -8,
              boxShadow:
                "0 20px 25px -5px rgba(30, 64, 175, 0.25), 0 8px 10px -6px rgba(30, 64, 175, 0.1)",
              transition: { duration: 0.3 },
            }}
          >
            <h3 className="text-xl font-bold mb-3 text-blue-100">{title}</h3>
            <p className="text-sm text-blue-200 leading-relaxed mb-4">
              {description}
            </p>
            {link && (
              <a
                href={link}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-blue-300 hover:text-blue-200 transition-colors duration-200 group"
              >
                Download PDF
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArrowRight className="w-4 h-4 ml-1.5" />
                </motion.div>
              </a>
            )}
          </motion.div>
        </div>

        {/* Center Marker & Line Section */}
        <div className="w-2/12 flex justify-center relative">
          {/* Vertical line before the current marker */}
          {index !== 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "100%", transition: { duration: 0.5 } }}
              className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-t from-blue-500 to-blue-400/30"
              style={{ height: "60px" }}
            ></motion.div>
          )}

          {/* Date Marker */}
          <motion.div
            initial="hidden"
            animate={controls}
            variants={markerVariants}
            className="relative z-10 flex flex-col items-center justify-center w-24 h-24 bg-gradient-to-br from-blue-600 to-indigo-800 rounded-full shadow-xl text-white"
            whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
          >
            <Calendar className="w-5 h-5 mb-1 text-blue-200" />
            <span className="text-base font-bold">{date}</span>
            <span className="text-xs font-light">{year}</span>
          </motion.div>

          {/* Vertical line after the current marker */}
          {index !== totalItems - 1 && (
            <motion.div
              initial="hidden"
              animate={controls}
              variants={lineVariants}
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-1 bg-gradient-to-b from-blue-500 to-blue-400/30"
              style={{ height: "60px" }}
            ></motion.div>
          )}
        </div>

        {/* Spacer Section (Opposite side of the card) */}
        <div className="w-5/12 px-4"></div>
      </div>
    </div>
  );
};

export default TimelineItem;
