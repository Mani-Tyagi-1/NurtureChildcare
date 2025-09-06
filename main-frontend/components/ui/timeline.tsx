"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactElement<{ onImageClick?: (src: string) => void }>;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  console.log(data);
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [modalImage, setModalImage] = useState<string | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: ref,
    offset: ["start start", "end end"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  const handleImageClick = (src: string) => {
    setModalImage(src);
  };

  const handleCloseModal = () => {
    setModalImage(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div
      className="w-full font-sans   md:px-4 h-[100vh] overflow-y-auto relative thin-scrollbar "
      ref={containerRef}
    >
      <div ref={ref} className="relative max-w-8xl mx-auto pb-20 ">
        {data.map((item, index) => (
          <div key={index} className="flex justify-start my-20 ">
            <div className="sticky  flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div
                className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#2C3E94] flex items-center justify-center"
                style={{
                  backgroundColor:
                    "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
                  boxShadow: "0 4px 12px rgba(124, 58, 237, 0.25)",
                  background:
                    "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
                }}
              >
                <div className="h-4 w-4 rounded-full bg-[#39A4D8]   p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-[#2C3E94] ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {React.cloneElement(item.content, {
                onImageClick: handleImageClick,
              })}
            </div>
          </div>
        ))}

        {/* Vertical timeline progress line */}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[4px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>

      {/* Modal */}
      {modalImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-4xl w-full px-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-6 text-white bg-black/70 rounded-full px-3 py-1 text-sm"
            >
              ✕
            </button>
            <div className="relative p-[10px] rounded-xl overflow-hidden bg-[conic-gradient(from_0deg,skyblue,blue,skyblue)] animate-spin-slow-glow">
              <div className="bg-white rounded-xl">
                <img
                  src={modalImage}
                  alt="Zoomed"
                  className="w-full max-h-[70vh] object-contain rounded-xl shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
