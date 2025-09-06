'use client';

import React, { useState, useEffect } from "react";
import ChatPopup from "./ChatPopup";

const ChatBotWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsOpen(true);
    }, 10000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <>
      <button
        className={`fixed bottom-7 right-7 z-50 flex items-center justify-start rounded-full   bg-[#add8ff59] border border-[#b3e0ff] backdrop-blur-sm shadow-[0_8px_32px_0_rgba(74,144,226,0.27)] transition-transform duration-200 ease-in-out transform ${
          isOpen
            ? "scale-[1.09] border-4 border-[#25d366]"
            : "scale-100 hover:scale-[1.03] active:scale-[0.97]"
        }`}
        onClick={() => setIsOpen(true)}
        aria-label="Open AI Chatbot"
      >
        <span className="relative flex items-center justify-center bg-white rounded-full h-[58px] w-[58px] shadow-[0_2px_14px_rgba(129,207,255,0.13)] flex-shrink-0">
          <img
            src="https://www.shutterstock.com/image-vector/happy-robot-3d-ai-character-600nw-2464455965.jpg"
            alt="Chatbot"
            className="h-[58px] w-[58px] rounded-full object-cover block"
          />
          <span className="absolute top-[-6px] right-[-6px] h-[18px] w-[18px] rounded-full bg-[#25d366] shadow-[0_0_6px_#25d366,0_0_12px_#25d366aa,0_0_18px_#25d366dd] animate-[pulse_2.5s_ease-in-out_infinite]" />
        </span>
      </button>
      {isOpen && <ChatPopup onClose={() => setIsOpen(false)} />}
    </>
  );
};

export default ChatBotWidget;
