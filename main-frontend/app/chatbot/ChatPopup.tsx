import React, { useRef, useState, useEffect, useLayoutEffect } from "react";

const STORAGE_KEY = "aiChatHistory";

const robotImage =
  "https://www.shutterstock.com/image-vector/happy-robot-3d-ai-character-600nw-2464455965.jpg";

const initialAIMessage = {
  _id: "ai-1",
  sender: "ai",
  content:
    "👋 Hello and welcome to Nurture Childcare and Education Services!\nWe’re here to support your journey with Family Day Care – whether you're a parent looking for care or someone interested in becoming an educator. Please choose one of the options below to get started:",
  type: "text",
  timestamp: new Date().toISOString(),
};

const nurtureMenuOptions = [
  { label: "How do I enroll my child?", value: "enroll_child" },
  { label: "Can I become a certified educator?", value: "become_educator" },
  { label: "What are your fees and timings?", value: "fees_timings" },
  { label: "I need help! Contact support.", value: "contact_support" },
];

const whatsappNumber = "919660000146";
const whatsappUrl = `https://wa.me/${whatsappNumber}?text=Hi%2C%20I'm%20visiting%20Nurture%20Childcare%20and%20would%20like%20to%20talk%20to%20an%20executive!`;

function formatTime(isoString?: string) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function formatDate(isoString?: string) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const ChevronUpIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 ml-2"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
  </svg>
);

const ChatPopup: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [messages, setMessages] = useState([initialAIMessage]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showNurtureMenu, setShowNurtureMenu] = useState(true);
  const [menuSelected, setMenuSelected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const item = localStorage.getItem(STORAGE_KEY);
      if (item) {
        const parsed = JSON.parse(item);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const hasUserMessage = parsed.some(
            (msg: any) => msg.sender === "user"
          );
          if (hasUserMessage) {
            setMessages(parsed);
            setShowNurtureMenu(false);
            setMenuSelected(true);
          } else {
            setShowNurtureMenu(true);
            setMenuSelected(false);
            setMessages(parsed);
          }
        } else {
          setShowNurtureMenu(true);
          setMenuSelected(false);
        }
      } else {
        setShowNurtureMenu(true);
        setMenuSelected(false);
      }
    } catch {
      setShowNurtureMenu(true);
      setMenuSelected(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  }, [messages]);

  useLayoutEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (customInput?: string) => {
    const messageToSend = customInput ?? input;
    if (!messageToSend.trim() || loading) return;
    setLoading(true);
    const newUserMsg = {
      _id: `user-${Date.now()}`,
      sender: "user",
      content: messageToSend,
      type: "text",
      timestamp: new Date().toISOString(),
    };
    const newMessages = [...messages, newUserMsg];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const SYSTEM_PROMPT = {
        role: "system",
        content:
          "You are NurtureBot, an AI Assistant for a childcare and education service website. Provide friendly, nurturing, and helpful responses.",
      };
      const openaiMsgs = [
        SYSTEM_PROMPT,
        ...newMessages.map((m) => ({
          role: m.sender === "user" ? "user" : "assistant",
          content: m.content,
        })),
      ];

      const res = await fetch("http://localhost:5000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: openaiMsgs }),
      });

      const data = await res.json();
      const reply =
        data?.choices?.[0]?.message?.content ||
        "Sorry, I couldn't get an answer.";
      setMessages((msgs) => [
        ...msgs,
        {
          _id: `ai-${Date.now()}`,
          sender: "ai",
          content: reply,
          type: "text",
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch {
      setMessages((msgs) => [
        ...msgs,
        {
          _id: `ai-${Date.now()}`,
          sender: "ai",
          content: "Sorry, there was a problem connecting to AI.",
          type: "text",
          timestamp: new Date().toISOString(),
        },
      ]);
    }
    setIsTyping(false);
    setLoading(false);
  };

  const handleNurtureOption = (optionObj: { label: string; value: string }) => {
    const newUserMsg = {
      _id: `user-${Date.now()}`,
      sender: "user",
      content: optionObj.label,
      type: "text",
      timestamp: new Date().toISOString(),
    };
    setMessages((msgs) => [...msgs, newUserMsg]);
    setShowNurtureMenu(false);
    setMenuSelected(true);
    let botResponse = "";
    switch (optionObj.value) {
      case "enroll_child":
        botResponse =
          "Absolutely! You can enroll your child by filling out our online application or scheduling a call with our team. Would you like the link to start your child's enrollment?";
        break;
      case "become_educator":
        botResponse =
          "Yes, you can! We offer full training and support for becoming a certified educator. Would you like to know more about our educator program or requirements?";
        break;
      case "fees_timings":
        botResponse =
          "Our fees and timings are flexible to suit your needs. Let me know your child's age and preferred hours, and I’ll provide a detailed schedule and fee structure.";
        break;
      case "contact_support":
        botResponse =
          "Of course! You can chat with an executive instantly on WhatsApp, or describe your issue here and I’ll help as best as I can.";
        break;
      default:
        botResponse = "How can I assist you further?";
    }
    setMessages((msgs) => [
      ...msgs,
      {
        _id: `ai-${Date.now() + 1}`,
        sender: "ai",
        content: botResponse,
        type: "text",
        timestamp: new Date().toISOString(),
      },
    ]);
  };
  
  return (
    <div className="fixed bottom-6 z-[9999] w-[380px] max-w-[96vw] h-[560px] max-h-[96vh] rounded-2xl bg-gradient-to-br from-[#d0e8f2] to-[#a6dcef] shadow-2xl flex flex-col overflow-hidden font-sans animate-fadeInUp left-1/2 -translate-x-1/2 right-auto md:right-6 md:left-auto md:translate-x-0">
      {/* Top Bar */}
      <div className="bg-gradient-to-r from-[#4a90e2] to-[#50a7f9] text-white px-5 py-4 text-[20px] font-bold flex items-center justify-between rounded-t-2xl shadow">
        <div className="flex items-center">
          <img
            src={robotImage}
            alt="NurtureBot"
            className="w-[38px] h-[38px] rounded-full mr-3"
          />
          <span className="text-[20px]">NurtureBot</span>
        </div>
        <div className="flex items-center text-center justify-around gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white rounded-xl px-4 py-2 font-semibold text-[8px] flex items-center shadow-md no-underline hover:from-[#128C7E] hover:to-[#25D366] transition-colors duration-200 select-none"
            title="Chat with Executive on WhatsApp"
          >
            Chat with Executive
          </a>
          {/* Delete chat history button */}
          <div className="flex">
            <button
              onClick={() => {
                setMessages([initialAIMessage]);
                localStorage.setItem(
                  STORAGE_KEY,
                  JSON.stringify([initialAIMessage])
                );
                setShowNurtureMenu(true);
                setMenuSelected(false);
              }}
              className=" rounded-full hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-150"
              aria-label="Delete chat history"
              title="Delete chat history"
              type="button"
            >
              {/* TrashIcon SVG from Heroicons */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 7.5V19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.5M4 7.5h16M9.75 11.25v4.5M14.25 11.25v4.5M10.5 3h3a.75.75 0 0 1 .75.75V6h-4.5V3.75A.75.75 0 0 1 10.5 3z"
                />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="bg-transparent border-none text-white text-center items-center justify-center mb-1 cursor-pointer font-bold leading-none  rounded-full ps-1 focus:outline-none "
              aria-label="Close chat"
              title="Close chat"
              type="button"
            >
              ×
            </button>
          </div>
        </div>
      </div>
      {/* Message List */}
      <div className="flex-1 overflow-y-auto p-5 bg-[#f2fbff] flex flex-col gap-3.5">
        {(() => {
          let lastDate: string | null = null;
          return messages.map((msg, idx) => {
            const isUser = msg.sender === "user";
            const curDate = formatDate(msg.timestamp);
            const showDateDivider = curDate !== lastDate;
            lastDate = curDate;
            return (
              <React.Fragment key={msg._id}>
                {showDateDivider && (
                  <div className="w-full flex items-center my-2">
                    <div className="flex-grow border-t border-[#b3d1f7]" />
                    <span className="mx-3 text-xs text-[#4a90e2] bg-[#e6f1fb] px-3 py-1 rounded-full font-semibold shadow">
                      {curDate}
                    </span>
                    <div className="flex-grow border-t border-[#b3d1f7]" />
                  </div>
                )}
                <div
                  className={`flex ${
                    isUser ? "flex-row-reverse" : "flex-row"
                  } items-end gap-2`}
                >
                  {!isUser && (
                    <img
                      src={robotImage}
                      alt="NurtureBot"
                      className="w-[34px] h-[34px] rounded-full"
                    />
                  )}
                  <div
                    className={`
                      max-w-[75%]
                      ${
                        isUser
                          ? "bg-[#50a7f9] text-white shadow-[0_1px_4px_rgba(80,167,249,0.5)]"
                          : "bg-[#d3e9ff] text-[#1a1a1a] shadow-[0_1px_4px_rgba(83,144,213,0.3)]"
                      }
                      rounded-2xl px-4 py-2.5 text-[15px] leading-snug whitespace-pre-wrap
                    `}
                  >
                    {msg.content}
                    <div
                      className={`text-[11px] mt-1.5 select-none text-right ${
                        isUser ? "text-white/70" : "text-black/35"
                      }`}
                    >
                      {formatTime(msg.timestamp)}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          });
        })()}
        <div ref={messagesEndRef} />
      </div>
      {/* Typing indicator */}
      {isTyping && (
        <div className="italic py-1  text-[#4a90e2] text-[15px] px-[22px]  flex items-center gap-2">
          <img
            src={robotImage}
            alt="NurtureBot"
            className="w-6 h-6 rounded-full"
          />
          <span>
            NurtureBot is typing
            <span className="tracking-wider">...</span>
          </span>
        </div>
      )}
      {/* Minimal floating Show Suggested Questions button */}
      {menuSelected && !showNurtureMenu && (
        <button
          onClick={() => setShowNurtureMenu(true)}
          className="absolute z-20 right-2 bottom-[82px] w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#4a90e2] to-[#50a7f9] shadow-lg flex items-center text-center pe-2 justify-center text-white hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="button"
          aria-label="Show Suggested Questions"
          style={{ boxShadow: "0 3px 12px 0 rgba(80,167,249,0.25)" }}
        >
          <ChevronUpIcon />
        </button>
      )}
      {/* Nurture Menu Options */}
      {showNurtureMenu && (
        <div className="bg-transparent py-3 px-5 relative">
          {/* Minimal floating Hide Suggested Questions button */}
          {menuSelected && (
            <button
              onClick={() => setShowNurtureMenu(false)}
              className="absolute right-2 top-3 w-[38px] h-[38px] rounded-full bg-gradient-to-br from-[#4a90e2] to-[#50a7f9] shadow-lg flex items-center pe-2 justify-center text-white hover:scale-110 transition-transform duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 z-10"
              type="button"
              aria-label="Hide Suggested Questions"
              style={{ boxShadow: "0 3px 12px 0 rgba(80,167,249,0.25)" }}
            >
              <ChevronDownIcon />
            </button>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {nurtureMenuOptions.map((optionObj, idx) => (
              <button
                key={optionObj.value}
                onClick={() => handleNurtureOption(optionObj)}
                className="bg-white border border-[#b3d1f7] rounded-2xl p-1 px-2 font-semibold text-[10px] shadow-md hover:shadow-xl hover:scale-[1.04] transition-all duration-200 flex flex-col items-start text-left gap-1 hover:bg-[#e6f1fb] focus:outline-none"
                type="button"
              >
                <span>{optionObj.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Input Bar - only show after menu selection */}
      {menuSelected && (
        <div className="py-3 px-4 bg-[#e6f1fb] border-t border-[#b3d1f7] flex items-center gap-3 relative">
          <input
            value={input}
            disabled={loading}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message…"
            className="flex-1 min-w-0 w-full py-3 px-5 rounded-full border-2 border-[#4a90e2] text-[16px] font-medium bg-white text-[#1a1a1a] shadow-[0_1px_6px_#4a90e233] outline-none transition-colors duration-200 focus:border-[#357ABD]"
            spellCheck={false}
          />
          <button
            disabled={loading}
            onClick={() => sendMessage()}
            className={`
              w-12 h-12 rounded-full
              bg-gradient-to-br from-[#4a90e2] to-[#50a7f9]
              border-none text-white text-[22px] font-bold flex items-center justify-center
              shadow-md transition-all duration-200
              ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
            `}
            type="button"
          >
            {loading ? "…" : "➤"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatPopup;
