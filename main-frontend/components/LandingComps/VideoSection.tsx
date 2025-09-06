"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import PlayButton from "./PlayBtn";

export default function VideoSection() {
  const [showModal, setShowModal] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
  }, [showModal]);

  return (
    <section
      className=" relative h-[50vh] md:h-screen w-full flex items-center justify-center overflow-hidden "
      style={{
        cursor: `url('https://i.pinimg.com/474x/97/a8/cd/97a8cd53975b3bcb480a535f6cbc8b6c.jpg'), auto`,
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-[#39A4D8] via-indigo-100 to-transparent z-0"></div>

      {/* Background Text */}
      <h1 className="absolute text-[#0F172A]/40 text-[8vw] font-bold whitespace-nowrap pointer-events-none animate-scroll-left text-center">
        NURTURE CHILDCARE <br /> EDUCATION SERVICES.
      </h1>

      {/* Foreground Image */}
      <Image
        src="/VidImg.png"
        alt="Team"
        width={800}
        height={800}
        className="relative z-10 pointer-events-none"
        priority
      />

      {/* Play Button */}
      <div
        className="absolute z-20 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
        onClick={() => setShowModal(true)}
      >
        <PlayButton />
      </div>

      {/* Video Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="relative w-full max-w-4xl mx-auto aspect-video">
            <iframe
              ref={videoRef}
              className="w-full h-full border-4 rounded-xl"
              style={{ borderColor: "#8b5cf6" }}
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
              title="Agency Intro Video"
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 px-3 py-1 rounded font-semibold transition bg-white text-purple-900 hover:bg-purple-100"
            >
              ✕ Close
            </button>
          </div>
        </div>
      )}

      {/* Add global styles for animations */}
      <style jsx global>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) scale(1);
            opacity: 0.5;
          }
          50% {
            transform: translateY(-20px) scale(1.05);
            opacity: 0.7;
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }

        .animate-float {
          animation: float ease-in-out infinite;
        }

        .animate-scroll-right {
          animation: scrollRight 20s linear infinite;
        }

        @keyframes scrollRight {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
      `}</style>
    </section>
  );
}
