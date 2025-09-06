"use client";

import { useState } from "react";
import { MdSlowMotionVideo } from "react-icons/md";

export default function VideoGrid({ videos }: { videos: string[] }) {
  const [modalVideo, setModalVideo] = useState<string | null>(null);

  const handleVideoClick = (src: string) => {
    setModalVideo(src);
  };

  const handleCloseModal = () => {
    setModalVideo(null);
  };

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {videos.map((src, index) => (
        <div
          key={index}
          className="relative cursor-pointer group"
          onClick={() => handleVideoClick(src)}
        >
          <video
            muted
            className="w-44 h-44 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform"
          >
            <source src={src} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <span className="absolute top-[28%] left-[20%] text-white w-32 h-32 rounded">
            <MdSlowMotionVideo className="w-20 h-20 text-white" />
          </span>
        </div>
      ))}

      {/* Modal */}
      {modalVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm"
          onClick={handleOverlayClick}
        >
          <div className="relative max-w-5xl w-full px-4">
            <button
              onClick={handleCloseModal}
              className="absolute top-2 right-6 text-white bg-black/70 rounded-full px-3 py-1 text-sm"
            >
              ✕
            </button>
            <div className="relative p-[10px] rounded-xl overflow-hidden bg-[conic-gradient(from_0deg,skyblue,blue,skyblue)] animate-spin-slow-glow">
              <div className="bg-white rounded-xl p-2">
                <video
                  controls
                  autoPlay
                  className="w-full max-h-[75vh] rounded-xl shadow-xl"
                >
                  <source src={modalVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
