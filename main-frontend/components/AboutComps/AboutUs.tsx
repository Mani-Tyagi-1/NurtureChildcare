// "use client";
// import React, { useEffect, useRef } from "react";
// import { motion } from "framer-motion";
// import { ChevronRight, Phone, Clock, Shield, Heart } from "lucide-react";

// const AboutSection = () => {
//   const servicesRef = useRef(null);

//   // Animation variants
//   const fadeIn = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
//   };

//   const staggerChildren = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.2,
//       },
//     },
//   };

//   return (
//     <section className=" h-[50vh] md:h-[90vh] mt-4  bg-gradient-to-b from-white to-blue-50  overflow-hidden">
//       <div className="container mx-auto px-4 md:px-8">
//         <div className="  flex flex-col lg:flex-row gap-12 ">
//           {/* Left Column: Images & Experience Badge */}
//           <motion.div
//             className="lg:w-1/2 relative"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={fadeIn}
//           >
//             {/* Main image with animation */}
//             <motion.div
//               className="relative rounded-2xl overflow-hidden shadow-xl"
//               whileHover={{ scale: 1.02 }}
//               transition={{ duration: 0.3 }}
//             >
//               <img
//                 src="https://static.wixstatic.com/media/5ebe18ba04404df89de3ae26b737108c.jpg/v1/fill/w_940,h_420,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kids%20in%20Preschool.jpg"
//                 alt="Children playing and learning"
//                 className="w-full h-[70%] rounded-2xl object-cover"
//               />

//               {/* Experience badge */}
//               <motion.div
//                 className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg flex flex-col items-center justify-center w-32 h-32"
//                 initial={{ rotate: -5, scale: 0.9 }}
//                 animate={{ rotate: 0, scale: 1 }}
//                 transition={{
//                   duration: 0.6,
//                   repeat: Infinity,
//                   repeatType: "reverse",
//                   repeatDelay: 5,
//                 }}
//               >
//                 <span className="text-3xl font-bold">25</span>
//                 <span className="text-sm">Years of Service</span>
//               </motion.div>
//             </motion.div>

//             {/* Small images grid */}
//             <motion.div
//               className="grid grid-cols-2 gap-4 mt-8"
//               variants={staggerChildren}
//             >
//               <motion.div
//                 className="rounded-xl h-[40%]  shadow-lg"
//                 variants={fadeIn}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <img
//                   src="https://static.wixstatic.com/media/5ebe18ba04404df89de3ae26b737108c.jpg/v1/fill/w_460,h_580,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kids%20in%20Preschool.jpg"
//                   alt="Learning activities"
//                   className="w-full h-full object-cover"
//                 />
//               </motion.div>
//               <motion.div
//                 className="rounded-xl w-full h-[40%]  shadow-lg"
//                 variants={fadeIn}
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.3 }}
//               >
//                 <img
//                   src="https://static.wixstatic.com/media/d819bec87997135f0c7853f8dbeea370.jpg/v1/fill/w_417,h_853,al_c,q_80,enc_avif,quality_auto/Drawing%20%26%20Coloring.jpg"
//                   alt="Childcare facilities"
//                   className="w-full h-full object-cover"
//                 />
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Right Column: Text Content */}
//           <motion.div
//             className="lg:w-1/2 mt-20"
//             initial="hidden"
//             whileInView="visible"
//             viewport={{ once: true, margin: "-100px" }}
//             variants={fadeIn}
//           >
//             <motion.div
//               className="inline-block mb-3 px-4 py-1 bg-blue-100 text-blue-600 rounded-full font-medium"
//               whileHover={{ scale: 1.05 }}
//             >
//               KNOW ABOUT US
//             </motion.div>

//             <motion.h2
//               className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
//               variants={{
//                 hidden: { opacity: 0, x: -20 },
//                 visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
//               }}
//             >
//               Committed to{" "}
//               <span
//                 className="text-accent-glow"
              
//               >
//                 Excellence
//               </span>
//             </motion.h2>

//             <motion.p
//               className="text-lg text-gray-700 mb-8 leading-relaxed"
//               variants={{
//                 hidden: { opacity: 0 },
//                 visible: { opacity: 1, transition: { duration: 0.7 } },
//               }}
//             >
//               At{" "}
//               <span className="font-semibold">
//                 NURTURE CHILDCARE AND EDUCATION SERVICES
//               </span>
//               , we know what it takes to enhance our children's education with
//               lots of Love, Play & Vigilant Care. Our unique approach to Caring
//               and top quality Family Day Care Educators makes NURTURE CHILDCARE
//               AND EDUCATION SERVICES more than just a Family Day Care Services -
//               it's a life experience. We invite you to explore our dynamic and
//               diverse community, and stop by for a visit at your convenient
//               Family Day Care Services.
//             </motion.p>

//             {/* Service Highlights */}
//             {/* <motion.div
//               className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
//               ref={servicesRef}
//               variants={staggerChildren}
//             >
//               <motion.div
//                 className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md"
//                 variants={fadeIn}
//                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//               >
//                 <Heart className="text-red-500 mt-1" size={20} />
//                 <div>
//                   <h3 className="font-bold text-gray-800">Loving Care</h3>
//                   <p className="text-gray-600 text-sm">
//                     Nurturing environment focused on emotional wellbeing
//                   </p>
//                 </div>
//               </motion.div>

//               <motion.div
//                 className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md"
//                 variants={fadeIn}
//                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//               >
//                 <Shield className="text-blue-500 mt-1" size={20} />
//                 <div>
//                   <h3 className="font-bold text-gray-800">Safe Spaces</h3>
//                   <p className="text-gray-600 text-sm">
//                     Secured facilities with constant supervision
//                   </p>
//                 </div>
//               </motion.div>

//               <motion.div
//                 className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md"
//                 variants={fadeIn}
//                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//               >
//                 <Clock className="text-green-500 mt-1" size={20} />
//                 <div>
//                   <h3 className="font-bold text-gray-800">Flexible Hours</h3>
//                   <p className="text-gray-600 text-sm">
//                     Accommodating to parents' busy schedules
//                   </p>
//                 </div>
//               </motion.div>

//               <motion.div
//                 className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-md"
//                 variants={fadeIn}
//                 whileHover={{ y: -5, boxShadow: "0 10px 20px rgba(0,0,0,0.1)" }}
//               >
//                 <Phone className="text-purple-500 mt-1" size={20} />
//                 <div>
//                   <h3 className="font-bold text-gray-800">Always Available</h3>
//                   <p className="text-gray-600 text-sm">
//                     Quick response to parent inquiries
//                   </p>
//                 </div>
//               </motion.div>
//             </motion.div> */}

//             {/* Testimonial Quote Box */}
//             {/* <motion.div
//               className="bg-blue-600 text-white p-6 rounded-xl mb-8 relative overflow-hidden"
//               initial={{ opacity: 0, y: 30 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: 0.3 }}
//             >
//               <div className="absolute text-blue-500 opacity-10 text-9xl font-serif top-0 left-2">
//                 "
//               </div>
//               <p className="relative z-10 italic mb-4">
//                 "It is truly remarkable to see how our daughter has flourished
//                 under the care of Nurture Childcare. Their dedication to
//                 creating a stimulating and nurturing environment has made all
//                 the difference in her development."
//               </p>
//               <div className="font-semibold">- Parent of Emily, age 4</div>
//               <div className="absolute bottom-4 right-4 text-5xl font-bold opacity-10">
//                 99
//               </div>
//             </motion.div> */}

//             {/* Call to Action */}
//             <div className="flex flex-wrap gap-4">
//               {/* <motion.a
//                 href="#discover"
//                 className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 Discover More <ChevronRight size={16} />
//               </motion.a> */}

//               <motion.a
//                 href="tel:+11236547890"
//                 className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-full transition-all"
//                 whileHover={{ scale: 1.05 }}
//                 whileTap={{ scale: 0.98 }}
//               >
//                 <Phone size={16} /> +1 123 654 7890
//               </motion.a>
//             </div>
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default AboutSection;








"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronRight, Phone, Clock, Shield, Heart } from "lucide-react";

const AboutSection = () => {
  const servicesRef = useRef(null);
  const [animateShapes, setAnimateShapes] = useState(false);
  const [animateShapes2, setAnimateShapes2] = useState(false);

  // Toggle animations for shapes
  useEffect(() => {
    const intervalId = setInterval(() => {
      setAnimateShapes((prev) => !prev);
    }, 5000);

    const intervalId2 = setInterval(() => {
      setAnimateShapes2((prev) => !prev);
    }, 7000);

    return () => {
      clearInterval(intervalId);
      clearInterval(intervalId2);
    };
  }, []);

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <section className="relative h-[50vh] md:h-[90vh] mt-4 bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute top-20 right-10 w-32 h-32 rounded-full bg-[#3fb5dd] opacity-20  transition-all duration-5000 delay-1000 ${
            animateShapes ? "-translate-y-10" : "translate-y-10"
          }`}
        ></div>
        <div
          className={`absolute top-[5rem] left-[48rem] w-3 h-3 rounded-full bg-[#3fb5dd] z-20 `}
        ></div>
        <div
          className={`absolute top-3/4 left-2/3 w-20 h-20  rounded-full bg-[#3fb5dd] opacity-25 transition-all duration-7000 delay-2000 ${
            animateShapes2 ? "scale-110" : "scale-90"
          }`}
        ></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3fb5dd] opacity-20 blur-2xl rounded-tl-full"></div>
      </div>

      
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column: Images & Experience Badge */}
          <motion.div
            className="lg:w-1/2 relative"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            {/* Main image with animation */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src="https://static.wixstatic.com/media/5ebe18ba04404df89de3ae26b737108c.jpg/v1/fill/w_940,h_420,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kids%20in%20Preschool.jpg"
                alt="Children playing and learning"
                className="w-full h-[70%] rounded-2xl object-cover"
              />

              {/* Experience badge */}
              <motion.div
                className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-4 rounded-full shadow-lg flex flex-col items-center justify-center w-32 h-32"
                initial={{ rotate: -5, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 5,
                }}
              >
                <span className="text-3xl font-bold">25</span>
                <span className="text-sm">Years of Service</span>
              </motion.div>
            </motion.div>

            {/* Small images grid */}
            <motion.div
              className="grid grid-cols-2 gap-4 mt-8"
              variants={staggerChildren}
            >
              <motion.div
                className="rounded-xl h-[40%] shadow-lg"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://static.wixstatic.com/media/5ebe18ba04404df89de3ae26b737108c.jpg/v1/fill/w_460,h_580,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kids%20in%20Preschool.jpg"
                  alt="Learning activities"
                  className="w-full h-full object-cover"
                />
              </motion.div>
              <motion.div
                className="rounded-xl w-full h-[40%] shadow-lg"
                variants={fadeIn}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
              >
                <img
                  src="https://static.wixstatic.com/media/d819bec87997135f0c7853f8dbeea370.jpg/v1/fill/w_417,h_853,al_c,q_80,enc_avif,quality_auto/Drawing%20%26%20Coloring.jpg"
                  alt="Childcare facilities"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Column: Text Content */}
          <motion.div
            className="lg:w-1/2 mt-20"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
          >
            <motion.div
              className="inline-block mb-3 px-4 py-1 bg-blue-100 text-blue-600 rounded-full font-medium"
              whileHover={{ scale: 1.05 }}
            >
              KNOW ABOUT US
            </motion.div>

            <motion.h2
              className="text-4xl md:text-5xl font-bold mb-6 text-gray-800"
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
              }}
            >
              Committed to <span className="text-accent-glow">Excellence</span>
            </motion.h2>

            <motion.p
              className="text-lg text-gray-700 mb-8 leading-relaxed"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { duration: 0.7 } },
              }}
            >
              At{" "}
              <span className="font-semibold">
                NURTURE CHILDCARE AND EDUCATION SERVICES
              </span>
              , we know what it takes to enhance our children's education with
              lots of Love, Play & Vigilant Care. Our unique approach to Caring
              and top quality Family Day Care Educators makes NURTURE CHILDCARE
              AND EDUCATION SERVICES more than just a Family Day Care Services -
              it's a life experience. We invite you to explore our dynamic and
              diverse community, and stop by for a visit at your convenient
              Family Day Care Services.
            </motion.p>

            {/* Call to Action */}
            <div className="flex flex-wrap gap-4">
              <motion.a
                href="tel:+11236547890"
                className="inline-flex items-center gap-2 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-medium py-3 px-6 rounded-full transition-all"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Phone size={16} /> +1 123 654 7890
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;