// "use client";

// import React, { useEffect } from "react";
// import { motion, useAnimation } from "framer-motion";
// import TimelineItem from "./TimeLineItms";
// import { newsletterData } from "./NewaLetterData"; // Adjust path if needed

// const Timeline = () => {
//   // Animation controls for headline elements
//   const headlineControls = useAnimation();
  
//   // Start animations when component mounts
//   useEffect(() => {
//     headlineControls.start("visible");
//   }, [headlineControls]);

//   // Stagger animation for the container
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.3, // Stagger delay between items
//         delayChildren: 0.6, // Delay child animations until after headline
//       },
//     },
//   };

//   // Headline animations
//   const headlineVariants = {
//     hidden: {
//       opacity: 0,
//       y: -20,
//     },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         duration: 0.8,
//         ease: "easeOut",
//       }
//     }
//   };

//   // Underline animation
//   const underlineVariants = {
//     hidden: { width: "0%" },
//     visible: {
//       width: "100%",
//       transition: {
//         delay: 0.4,
//         duration: 0.8,
//         ease: "easeOut"
//       }
//     }
//   };

//   // Background shape animations
//   const floatingShapeVariants = {
//     animate: {
//       y: [0, -15, 0],
//       transition: {
//         duration: 6,
//         ease: "easeInOut",
//         repeat: Infinity,
//       }
//     }
//   };

//   const rotatingShapeVariants = {
//     animate: {
//       rotate: 360,
//       transition: {
//         duration: 30,
//         ease: "linear",
//         repeat: Infinity,
//       }
//     }
//   };

//   const pulseShapeVariants = {
//     animate: {
//       scale: [1, 1.05, 1],
//       opacity: [0.4, 0.7, 0.4],
//       transition: {
//         duration: 8,
//         ease: "easeInOut",
//         repeat: Infinity,
//       }
//     }
//   };

//   // Random movement
//   const randomMoveVariants = {
//     animate: {
//       x: [0, 10, -5, 10, 0],
//       y: [0, -10, 5, -15, 0],
//       transition: {
//         duration: 12,
//         ease: "easeInOut",
//         repeat: Infinity,
//       }
//     }
//   };

//   return (
//     <div className="relative overflow-hidden min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-100 via-blue-300 to-blue-100">
//       {/* Background Shapes */}

//       {/* Large circle blur in background */}
//       <motion.div
//         className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-700 opacity-10 blur-3xl"
//         variants={pulseShapeVariants}
//         animate="animate"
//       />

//       {/* Small floating circles */}
//       <motion.div
//         className="absolute top-32 left-10 w-6 h-6 rounded-full bg-blue-700 opacity-20"
//         variants={floatingShapeVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute top-60 right-24 w-4 h-4 rounded-full bg-blue-700 opacity-30"
//         variants={randomMoveVariants}
//         animate="animate"
//       />

//       {/* Subtle geometric shapes */}
//       <motion.div
//         className="absolute bottom-40 left-20 w-32 h-32 rounded-lg bg-blue-700 opacity-15 rotate-45"
//         variants={rotatingShapeVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute top-1/3 -right-40 w-64 h-64 rounded-full  bg-white opacity-20"
//         variants={pulseShapeVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute bottom-20 right-10 w-20 h-20 rounded-md bg-blue-800 opacity-15 rotate-12"
//         variants={floatingShapeVariants}
//         animate="animate"
//       />

//       {/* Abstract shape - triangle */}
//       <svg
//         className="absolute top-1/4 left-12 opacity-5 w-24 h-24"
//         viewBox="0 0 100 100"
//       >
//         <motion.path
//           d="M50 15 L90 85 L10 85 Z"
//           fill="rgba(147, 197, 253, 0.3)"
//           variants={randomMoveVariants}
//           animate="animate"
//         />
//       </svg>

//       {/* Abstract lines */}
//       <svg
//         className="absolute bottom-1/3 right-1/4 opacity-40 w-40 h-40"
//         viewBox="0 0 100 100"
//       >
//         <motion.line
//           x1="10"
//           y1="10"
//           x2="90"
//           y2="90"
//           stroke="rgba(147, 197, 253, 0.5)"
//           strokeWidth="2"
//           variants={pulseShapeVariants}
//           animate="animate"
//         />
//         <motion.line
//           x1="90"
//           y1="10"
//           x2="10"
//           y2="90"
//           stroke="rgba(147, 197, 253, 0.5)"
//           strokeWidth="2"
//           variants={pulseShapeVariants}
//           animate="animate"
//         />
//       </svg>

//       <div className="relative max-w-5xl mx-auto z-10">
//         {/* Stylized Newsletter Heading */}
//         <div className="text-center mb-16">
//           <motion.div
//             className="inline-block relative"
//             initial="hidden"
//             animate={headlineControls}
//             variants={headlineVariants}
//           >
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue-100 tracking-tight">
//               <span className="text-blue-800"> Newsletter</span>
//             </h1>

//             {/* Decorative elements */}
//             <motion.div
//               className="absolute -top-6 -left-8 text-blue-400 opacity-50"
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 0.5, scale: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//             >
//               <svg
//                 width="36"
//                 height="36"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <circle cx="12" cy="12" r="4" fill="currentColor" />
//               </svg>
//             </motion.div>

//             <motion.div
//               className="absolute -bottom-2 -right-6 text-blue-400 opacity-50"
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 0.5, scale: 1 }}
//               transition={{ delay: 0.7, duration: 0.5 }}
//             >
//               <svg
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   d="M12 3L14.5 8.5L21 9.5L16.5 14L18 20.5L12 17.5L6 20.5L7.5 14L3 9.5L9.5 8.5L12 3Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 rounded-full"
//             initial="hidden"
//             animate={headlineControls}
//             variants={underlineVariants}
//           />

//           <motion.p
//             className="mt-6 text-lg text-cyan-800 max-w-xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8, duration: 0.8 }}
//           >
//             Explore our collection of past newsletters and stay up to date with
//             our latest insights and updates.
//           </motion.p>
//         </div>

//         <motion.div
//           className="relative"
//           variants={containerVariants}
//           initial="hidden"
//           animate="visible"
//         >
//           {/* Timeline content */}
//           {newsletterData.map((item, index) => (
//             <TimelineItem
//               key={item.id}
//               item={item}
//               index={index}
//               totalItems={newsletterData.length}
//             />
//           ))}

//           {/* Decorative timeline vertical line glow */}
//           <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/0 via-blue-400/30 to-blue-400/0 -z-10 transform -translate-x-1/2 blur-sm"></div>
//         </motion.div>

//         {/* End of timeline marker */}
//         <motion.div
//           className="mt-12 text-center"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 1.5, duration: 0.8 }}
//         >
//           <div className="inline-block p-3 bg-blue-900/50 rounded-full border border-blue-400/20 shadow-lg backdrop-blur-sm">
//             <svg
//               width="24"
//               height="24"
//               viewBox="0 0 24 24"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//               className="text-blue-300"
//             >
//               <path
//                 d="M19 9L12 16L5 9"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Timeline;


















"use client";

import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import TimelineItem from "./TimeLineItms";
import axios from "axios";

interface NewsletterItem {
  _id: string;
  name: string;
  pdfUrl: string;
  createdAt: string;
}

const Timeline = () => {
  const headlineControls = useAnimation();
  const [newsletterData, setNewsletterData] = useState<NewsletterItem[]>([]);
    const [animateShapes, setAnimateShapes] = useState(true);
    const [animateShapes2, setAnimateShapes2] = useState(false);

  useEffect(() => {
    headlineControls.start("visible");

    const fetchNewsletters = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/newsletters"
        );
        setNewsletterData(response.data);
      } catch (error) {
        console.error("Failed to fetch newsletters:", error);
      }
    };

    fetchNewsletters();
  }, [headlineControls]);


  useEffect(() => {
      const interval = setInterval(() => {
        setAnimateShapes((prev) => !prev);
      }, 5000);
  
      const interval2 = setInterval(() => {
        setAnimateShapes2((prev) => !prev);
      }, 7000);
  
      return () => {
        clearInterval(interval);
        clearInterval(interval2);
      };
    }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.6,
      },
    },
  };

  const headlineVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const underlineVariants = {
    hidden: { width: "0%" },
    visible: {
      width: "50%",
      transition: { delay: 0.4, duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <div className="relative overflow-hidden min-h-screen bg-white text-gray-800 p-6 flex justify-center">
      {/* Background Shapes like Contact Page */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute bottom-10 left-20 w-32 h-32 rounded-full bg-[#3fb5dd] opacity-20  transition-all duration-7000 delay-2000 ${
            animateShapes ? "translate-x-15" : "-translate-x-15"
          }`}
        ></div>
        <div
          className={`absolute top-110 left-100 w-40 h-40 rounded-full bg-[#3fb5dd] opacity-20 transition-all duration-7000 delay-2000 ${
            animateShapes2 ? "scale-110" : "scale-90"
          }`}
        ></div>
        <div className="absolute top-1/3 right-1/4 w-52 h-52 rounded-full bg-[#3fb5dd] opacity-15 blur-2xl"></div>
        <div className="absolute top-[60px] right-2/3 w-10 h-10 bg-[#3fb5dd] opacity-15 rotate-45 z-20 "></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3fb5dd] opacity-20 blur-2xl  rounded-full"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#3fb5dd] opacity-20 blur-2xl  rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3fb5dd] opacity-20 blur-2xl rounded-full"></div>
        <div
          className={`absolute top-1/4 left-3/4 w-24 h-24 bg-[#3fb5dd] opacity-20 rounded-full z-20 rotate-45  transition-all duration-7000 delay-2000 ${
            animateShapes ? "translate-y-15" : "-translate-y-15"
          }`}
        ></div>
        <div
          className={`absolute top-3/4 left-2/3 w-20 h-20 rounded-full bg-[#3fb5dd] opacity-25 transition-all duration-7000 delay-2000 ${
            animateShapes2 ? "scale-110" : "scale-90"
          }`}
        ></div>
      </div>

      <div className="w-full max-w-6xl z-10">
        <div className="text-center mt-8 ">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Our <span className="py-4 text-gradient">Newsletter</span>
            </h2>

            <motion.div
              className="absolute -top-6 -left-8 text-[#39A4D8] opacity-60"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute -bottom-2 -right-6 text-[#0A2463] opacity-60"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 0.6, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path
                  d="M12 3L14.5 8.5L21 9.5L16.5 14L18 20.5L12 17.5L6 20.5L7.5 14L3 9.5L9.5 8.5L12 3Z"
                  fill="currentColor"
                />
              </svg>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-[#0A2463] via-[#39A4D8] to-[#0A2463] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "50%" }}
            transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
          />

          <motion.p
            className="mt-3 text-lg text-[#0A2463] max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Explore our collection of past newsletters and stay up to date with
            our latest insights and updates.
          </motion.p>
        </div>

        <motion.div
          className="relative rounded-2xl p-6  "
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {newsletterData.map((item, index) => (
            <TimelineItem
              key={item._id}
              item={{
                date: new Date(item.createdAt).toLocaleDateString(),
                year: new Date(item.createdAt).getFullYear().toString(),
                title: item.name,
                description: "Newsletter PDF available.",
                link: item.pdfUrl,
              }}
              index={index}
              totalItems={newsletterData.length}
            />
          ))}

          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-400/0 via-blue-400/30 to-blue-400/0 -z-10 transform -translate-x-1/2 blur-sm"></div>
        </motion.div>

        {/* <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="inline-block p-3 bg-blue-900/50 rounded-full border border-blue-400/20 shadow-lg backdrop-blur-sm">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M19 9L12 16L5 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </motion.div> */}
      </div>
    </div>
  );
};

export default Timeline;
