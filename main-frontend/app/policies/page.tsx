"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Policy {
  _id: string;
  title: string;
  qrImageUrl: string;
  redirectLink: string;
}

const PolicyPage = () => {
  const [policies, setPolicies] = useState<Policy[]>([]);
  const [animateShapes, setAnimateShapes] = useState(true);
  const [animateShapes2, setAnimateShapes2] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/api/policies")
      .then((res) => res.json())
      .then((data) => setPolicies(data))
      .catch((err) => console.error("Error fetching policies:", err));

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

  return (
    <div className="min-h-screen bg-white text-gray-800 p-6 flex items-center justify-center relative overflow-hidden -mt-2">
      {/* Animated Shapes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Shapes here */}
        <div
          className={`absolute bottom-10 left-10 w-32 h-32 rounded-full bg-[#3fb5dd] opacity-20 transition-all duration-5000 ${
            animateShapes ? "translate-x-15" : "-translate-x-15"
          }`}
        ></div>
        <div
          className={`absolute top-40 right-20 w-40 h-40 rounded-full bg-[#3fb5dd] opacity-20 transition-all duration-5000 delay-1000 ${
            animateShapes ? "-translate-y-10" : "translate-y-10"
          }`}
        ></div>
        <div
          className={`absolute top-1/3 right-1/4 w-52 h-52 rounded-full bg-[#3fb5dd] opacity-15 transition-all duration-5000 delay-2000 ${
            animateShapes ? "translate-y-8" : "-translate-y-8"
          }`}
        ></div>
        <div
          className={`absolute top-[5rem] left-[47rem] w-3 h-3 rounded-full bg-[#3fb5dd] z-20 transition-all duration-7000 ${
            animateShapes2 ? "translate-x-5" : "-translate-x-5"
          }`}
        ></div>
        <div
          className={`absolute top-3/4 left-2/3 w-20 h-20 rounded-full bg-[#3fb5dd] opacity-25 transition-all duration-7000 delay-2000 ${
            animateShapes2 ? "scale-110" : "scale-90"
          }`}
        ></div>
        <div
          className={`absolute top-[100px] rounded-xl right-2/3 w-10 h-10 bg-[#3fb5dd] opacity-15 rotate-12 z-20 transition-all duration-8000 delay-1500 ${
            animateShapes2 ? "rotate-45" : "rotate-12"
          }`}
        ></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3fb5dd] opacity-20 blur-2xl rounded-br-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3fb5dd] opacity-20 blur-2xl rounded-tl-full"></div>
        <div className="relative top-1/3 left-3/4 w-24 h-24 bg-[#3fb5dd] opacity-50 blur-xl z-20 rotate-45"></div>
      </div>

      {/* Main Content */}
      <div className="w-full max-w-5xl rounded-2xl p-8 md:p-12 relative z-10">
        <div className="text-center mt-8 mb-8">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Our <span className="py-4 text-gradient">Policies</span>
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
  className="mt-4 text-lg font-medium text-gray-600 sm:text-xl md:text-2xl"
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.8, duration: 0.8 }}
>
  Dear Educators, Scan the QR codes to access updated policies
</motion.p>
        </div>

        {/* Policies Grid */}
        <div className=" grid-cols-1 sm:grid-cols-2 grid md:grid-cols-2  gap-8 mb-12 mt-10">
          {policies.map((policy) => (
            <div
              key={policy._id}
              className="bg-white p-4 rounded-xl shadow-md flex flex-col items-center"
            >
              <img
                src={policy.qrImageUrl}
                alt={policy.title}
                className="w-40 h-40 object-contain mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{policy.title}</h2>
              <a
                href={policy.redirectLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
              >
                Read More
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PolicyPage;
