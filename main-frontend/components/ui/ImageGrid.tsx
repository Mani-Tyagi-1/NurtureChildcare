"use client";

import { useState } from "react";

export default function ImageGrid({
  images,
  onImageClick,
}: {
    images: string[];
  
    onImageClick?: (src: string) => void;
  }) {
  
    const [modalImage, setModalImage] = useState<string | null>(null);
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
    <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((src, index) => (
        <img
          key={index}
          src={src}
          alt="Gallery"
          onClick={() => handleImageClick(src)}
          className="cursor-pointer h-44 w-44 object-cover rounded-lg shadow-md hover:scale-105 transition-transform"
        />
      ))}

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
}
