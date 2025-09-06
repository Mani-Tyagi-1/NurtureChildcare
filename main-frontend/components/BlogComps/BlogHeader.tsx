"use client";
import { motion } from "framer-motion";
// import { LampContainer } from "../LandingComps/Lamp";
import { LampContainer } from "../ui/lamp";

export default function BlogHeader() {
  // const GradientBlobBackground = () => {
  //   return (
  //     <>
  //       {/* Gradient Blobs */}
  //       <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
  //         <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform translate-x-1/4 -translate-y-1/4" />
  //         <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform -translate-x-1/4" />
  //         <div className="absolute top-1/2 left-1/2 w-80 h-80 rounded-full bg-gradient-radial opacity-20 blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
  //       </div>
  //       {/* Animated Dots Grid */}
  //       <div className="absolute inset-0 opacity-20 pointer-events-none">
  //         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
  //           <defs>
  //             <pattern id="dotPattern" width="30" height="30" patternUnits="userSpaceOnUse">
  //               <circle cx="5" cy="5" r="1.5" fill="var(--color-accent-glow)" />
  //             </pattern>
  //           </defs>
  //           <rect width="100%" height="100%" fill="url(#dotPattern)" />
  //         </svg>
  //       </div>
  //     </>
  //   );
  // };
  // return (
  //   <div className="h-[40vh] w-full relative mt-16 ">
  //     <section className="relative w-full py-20 px-20 md:py-10 overflow-hidden bg-transparent text-white">
  //       {/* <GradientBlobBackground /> */}
  //       {/* <LampContainer> */}
  //         <motion.h1
  //           initial={{ opacity: 0.5, y: 100 }}
  //           whileInView={{ opacity: 1, y: 0 }}
  //           transition={{
  //             delay: 0.3,
  //             duration: 0.8,
  //             ease: "easeInOut",
  //           }}
  //           className="mt-5 py-4 text-center text-4xl font-semibold tracking-widest text-white md:text-7xl"
  //         >
  //           Nurture Notes
  //           <br />
  //           <p className="text-2xl font-black mt-10 tracking-widest text-white/100">
  //             "Learn. Reflect. Bloom."
  //           </p>
  //         </motion.h1>
  //       {/* </LampContainer> */}
  //     </section>
  //     {/* white seprator line */}
  //     <div className="mt-2 mx-auto w-[60%] h-1 bg-white/80 rounded-full" />
  //   </div>
  // );

  return (
    <div className="h-[13vh] w-full relative mt-18   ">
      <div className="text-center mt-8 mb-8">
        <motion.div
          className="inline-block relative"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Our <span className="py-4 text-gradient">Blogs</span>
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
          className="mt-6 text-lg text-[#0A2463] max-w-xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          Learn. Reflect. Bloom.
        </motion.p>
      </div>
    </div>
  );
}
