// "use client"

// import { ThreeDMarquee } from "../ui/3d-marquee";


// export default function Hero() {
//   const images = [
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//   ]
    
//  return (
//   <div className="z-10 inset-0 mx-auto my-10 max-w-7xl max-h-[70vh] bg-black/80 p-2 ring-1 ring-neutral-700/10 dark:bg-black/40 opacity-100">
//     {/* 3D Marquee */}
//     <ThreeDMarquee className="pointer-events-none absolute inset-0 h-full w-full my-3.5 bg-blue-50/70 top-10 opacity-65" images={images} />

//   <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
//   <div className="bg-black/70 backdrop-blur-md p-10 rounded-xl max-w-6xl ">
//     <h2 className="text-3xl font-bold md:text-5xl">
//       Hey There!! Welcome to Community of Passionate Care Educators.
//     </h2>
//     <p className="mt-4 text-base md:text-lg text-neutral-200">
//       A creative world where children grow, play, and thrive.
//     </p>
    
//   </div>
// </div>

//   </div>
// );


// }





// "use client"

// import { ThreeDMarquee } from "../ui/3d-marquee";


// export default function Hero() {
//   const images = [
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//     "/bg-pic01.jpeg",
//     "/bg-pic02.jpeg",
//     "/bg-pic03.jpeg",
//   ]
    
//  return (
//   <div className="z-10 inset-0 mx-auto my-10 max-w-7xl max-h-[70vh] bg-black/80 p-2 ring-1 ring-neutral-700/10 dark:bg-black/40 opacity-100">
//     {/* 3D Marquee */}
//     <ThreeDMarquee className="pointer-events-none absolute inset-0 h-full w-full my-3.5 bg-blue-50/70 top-10 opacity-65" images={images} />

//   <div className="relative z-20 flex flex-col items-center justify-center h-full text-center text-white px-4">
//   <div className="bg-black/70 backdrop-blur-md p-10 rounded-xl max-w-6xl ">
//     <h2 className="text-3xl font-bold md:text-5xl">
//       Hey There!! Welcome to Community of Passionate Care Educators.
//     </h2>
//     <p className="mt-4 text-base md:text-lg text-neutral-200">
//       A creative world where children grow, play, and thrive.
//     </p>
    
//   </div>
// </div>

//   </div>
// );


// }





"use client"

import React, { useEffect, useState } from "react";
import { Heart, Stars } from "lucide-react";

const NurtureChildcareHero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 mt-20">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-[#2C3E94] opacity-40 animate-pulse"></div>
        <div className="absolute bottom-3 right-20 w-20 h-20 rounded-full bg-[#2C3E94] opacity-30 animate-pulse"></div>

        {/* Floating shapes */}
        <div className="absolute top-10 left-1/4 ">
          <div className="w-6 h-6 bg-yellow-500 rounded-full opacity-60 animate-bounce"></div>
        </div>
        <div className="absolute bottom-1/4 left-1/3 ">
          <div className="w-8 h-8 bg-pink-500 rounded-full opacity-60 animate-float"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 ">
          <div className="w-10 h-10 bg-purple-500 rounded-full opacity-40 animate-pulse"></div>
        </div>
      </div>

      <div className="container relative z-10 px-6 mx-auto lg:py-24 ">
        <div className="flex flex-col-reverse items-center lg:flex-row lg:justify-between">
          {/* Text Content */}
          <div
            className={`w-full lg:w-1/2 mt-10 lg:mt-0 text-center lg:text-left ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            } transition-all duration-1000 ease-out`}
          >
            <h1 className="text-4xl font-bold tracking-tight text-[#2C3E94] md:text-5xl lg:text-6xl mb-4">
              Nurturing Growth, One Child at a Time
            </h1>
            <p className="text-xl text-slate-600 md:text-2xl mb-8 max-w-xl mx-auto lg:mx-0">
              At Nurture Childcare, we believe in building strong foundations
              through love, care, and learning.
            </p>
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
              <button
                className="px-6 py-3 font-medium text-white transition-all  rounded-full hover:shadow-lg"
                style={{
                  backgroundColor:
                    "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                  background:
                    "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
                }}
              >
                Our Programs
              </button>
              <button
                className=" hidden md:block px-6 py-3 font-medium text-blue-600 transition-all bg-white border border-blue-600 rounded-full hover:bg-blue-50 hover:shadow-md"
                style={{
                  border:
                    "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                  textDecorationColor:
                    "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
                }}
              >
                Contact Us
              </button>
            </div>
          </div>

          {/* Image */}
          <div
            className={`w-full lg:w-1/2 lg:pl-10 ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-10"
            } transition-all duration-1000 ease-out`}
          >
            <div className="relative overflow-hidden rounded-2xl shadow-xl mt-4 md:mt-0">
              {/* Placeholder image */}
              <img
                src="https://static.wixstatic.com/media/550bcd0f5902421ebef95c3bb5441a70.jpg/v1/fill/w_940,h_520,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/Kids%20Blowing%20Bubbles.jpg"
                alt="Happy children playing and learning together"
                className="object-cover w-full h-full"
              />

              {/* Decorative elements overlaying the image */}
              <div className="absolute top-4 right-4">
                <Heart className="w-8 h-8 text-red-400 animate-pulse" />
              </div>
              <div className="absolute bottom-4 left-4">
                <Stars className="w-8 h-8 text-yellow-400 animate-pulse" />
              </div>

              {/* Soft glow overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-purple-500/10"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Curved shape divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="w-full h-12 text-white"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C57.55,88.45,119.2,74.03,175.87,64.55,275.36,46.5,214.68,63.3,321.39,56.44Z"
            className="fill-white"
          ></path>
        </svg>
      </div>
    </section>
  );
};

export default NurtureChildcareHero;