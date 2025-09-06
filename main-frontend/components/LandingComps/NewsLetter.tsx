// "use client";

// import { useState } from "react";
// import { Send, Mail, CheckCircle, AlertCircle } from "lucide-react";

// export default function NewsletterSection() {
//   const [email, setEmail] = useState("");
//   const [submissionState, setSubmissionState] = useState("idle"); // idle, success, error
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleSubmit = (e: { preventDefault: () => void; }) => {
//     e.preventDefault();

//     // Basic validation
//     if (!email || !email.includes("@") || !email.includes(".")) {
//       setSubmissionState("error");
//       setErrorMessage("Please enter a valid email address");
//       return;
//     }

//     // Simulate form submission
//     setSubmissionState("loading");

//     // Mock API call with timeout
//     setTimeout(() => {
//       setSubmissionState("success");
//       setEmail("");
//     }, 1000);
//   };

//   return (
//     <section className="w-full py-4 relative overflow-hidden">
//       {/* Dynamic background elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//         {/* Animated gradient background with low opacity */}
//         <div className="absolute inset-0 bg-gradient-animation opacity-10"></div>

//         {/* Decorative circles */}
//         <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-radial rounded-full blur-3xl opacity-20"></div>
//         <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-radial rounded-full blur-3xl opacity-20 -translate-y-1/4 -translate-x-1/4"></div>

//         {/* Subtle grid pattern */}
//         <div
//           className="absolute inset-0 bg-white bg-opacity-30"
//           style={{
//             backgroundImage: `radial-gradient(rgba(57, 164, 216, 0.1) 1px, transparent 1px)`,
//             backgroundSize: "20px 20px",
//           }}
//         ></div>
//       </div>

//       {/* Content container */}
//       <div className="max-w-6xl mx-auto px-4 relative">
//         <div className="rounded-3xl overflow-hidden shadow-glow">
//           <div className="grid md:grid-cols-2">
//             {/* Left column: Decorative element */}
//             <div className="bg-gradient-animation p-12 text-white relative hidden md:flex flex-col justify-center">
//               {/* Decorative mail icon with glow */}
//               <div className="absolute inset-0 flex items-center justify-center opacity-20">
//                 <Mail size={240} strokeWidth={1} />
//               </div>

//               <h2 className="text-3xl font-bold mb-6 relative z-10">
//                 Stay Ahead of the Curve
//               </h2>
//               <ul className="space-y-4 relative z-10">
//                 <li className="flex items-center gap-3">
//                   <CheckCircle size={20} className="text-white" />
//                   <span>Exclusive industry insights</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <CheckCircle size={20} className="text-white" />
//                   <span>Product updates and announcements</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <CheckCircle size={20} className="text-white" />
//                   <span>Expert tips and best practices</span>
//                 </li>
//                 <li className="flex items-center gap-3">
//                   <CheckCircle size={20} className="text-white" />
//                   <span>Special offers and event invitations</span>
//                 </li>
//               </ul>
//             </div>

//             {/* Right column: Newsletter form */}
//             <div className="bg-white p-8 md:p-12 flex flex-col justify-center">
//               <div className="max-w-md mx-auto w-full">
//                 {/* Mobile heading (shows only on mobile) */}
//                 <div className="md:hidden mb-8">
//                   <h2 className="text-2xl font-bold mb-4">
//                     Stay <span className="text-gradient">Ahead</span> of the
//                     Curve
//                   </h2>
//                   <p className="text-text-muted text-sm mb-4">
//                     Join our newsletter for exclusive insights and updates
//                   </p>
//                 </div>

//                 {/* Desktop heading */}
//                 <div className="hidden md:block">
//                   <h3 className="text-2xl font-bold mb-2">
//                     Subscribe to Our{" "}
//                     <span className="text-gradient">Newsletter</span>
//                   </h3>
//                   <p className="text-text-muted mb-6">
//                     Get the latest updates delivered straight to your inbox
//                   </p>
//                 </div>

//                 {submissionState === "success" ? (
//                   <div className="bg-success bg-opacity-10 border border-success text-success rounded-lg p-4 flex items-center gap-3">
//                     <CheckCircle size={20} />
//                     <span>
//                       Thank you for subscribing! Check your inbox soon.
//                     </span>
//                   </div>
//                 ) : (
//                   <form onSubmit={handleSubmit} className="space-y-4">
//                     <div>
//                       <label
//                         htmlFor="email"
//                         className="block text-sm font-medium text-text-strong mb-1"
//                       >
//                         Email Address
//                       </label>
//                       <div className="relative">
//                         <input
//                           type="email"
//                           id="email"
//                           value={email}
//                           onChange={(e) => {
//                             setEmail(e.target.value);
//                             if (submissionState === "error")
//                               setSubmissionState("idle");
//                           }}
//                           placeholder="your@email.com"
//                           className={`w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 transition-all ${
//                             submissionState === "error"
//                               ? "border-danger focus:ring-danger/20"
//                               : "border-accent-soft focus:ring-primary-500/20 focus:border-primary-500"
//                           }`}
//                           required
//                         />
//                         <Mail
//                           className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted"
//                           size={20}
//                         />
//                       </div>
//                       {submissionState === "error" && (
//                         <p className="mt-1 text-danger text-sm flex items-center gap-1">
//                           <AlertCircle size={14} />
//                           <span>{errorMessage}</span>
//                         </p>
//                       )}
//                     </div>

//                     <div className="flex flex-col sm:flex-row gap-3">
//                       <button
//                         type="submit"
//                         disabled={submissionState === "loading"}
//                         className="flex-1 bg-primary-500 hover:bg-primary-dark text-white font-medium py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
//                       >
//                         {submissionState === "loading" ? (
//                           <>
//                             <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
//                             <span>Subscribing...</span>
//                           </>
//                         ) : (
//                           <>
//                             <span>Subscribe Now</span>
//                             <Send size={18} />
//                           </>
//                         )}
//                       </button>

//                       {/* Mobile view displays benefits here */}
//                       <div className="md:hidden">
//                         <button
//                           type="button"
//                           className="w-full border border-accent-soft hover:border-primary-500 text-text-strong font-medium py-3 px-6 rounded-lg transition-all"
//                         >
//                           Learn More
//                         </button>
//                       </div>
//                     </div>
//                   </form>
//                 )}

//                 <div className="mt-6 text-xs text-text-muted">
//                   <p>
//                     By subscribing, you agree to our{" "}
//                     <a href="#" className="text-primary-500 hover:underline">
//                       Privacy Policy
//                     </a>{" "}
//                     and{" "}
//                     <a href="#" className="text-primary-500 hover:underline">
//                       Terms of Service
//                     </a>
//                     .
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Optional: Frequency note */}
//         <div className="text-center mt-6 text-sm text-text-muted">
//           <p>
//             We send newsletters twice a month. No spam, just valuable content.
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }




"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Newsletter {
  name: string;
  // message: string;
  pdfUrl: string;
  createdAt: string;
}

const NewsletterSection = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect(() => {
    const fetchNewsletters = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/newsletters");
        const data = await res.json();

        const sorted = data
          .sort(
            (a: Newsletter, b: Newsletter) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .slice(0, 3);

        setNewsletters(sorted);
      } catch (error) {
        console.error("Failed to fetch newsletters:", error);
      }
    };

    fetchNewsletters();
  }, []);

  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Creative background elements */}
      <div className="absolute inset-0 opacity-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#39A4D8] opacity-80 blur-3xl animate-float-slow"></div>
        <div className="absolute -top-30 -right-30 w-80 h-80 rounded-full bg-[#1C6B99] opacity-50 border blur-2xl animate-float-medium"></div>
        <div className="absolute top-3/4 left-1/3 w-48 h-48 rounded-full bg-[#39A4D8] opacity-50 blur-2xl animate-float-fast"></div>
        <svg
          className="absolute inset-0 w-full h-full opacity-40"
          viewBox="0 0 1000 1000"
          preserveAspectRatio="none"
        >
          <path
            d="M0,1000 C150,800 350,900 500,750 C650,600 850,700 1000,500 L1000,1000 L0,1000 Z"
            fill="#39A4D8"
          />
          <path
            d="M0,1000 C250,900 350,800 500,850 C650,900 750,800 1000,700 L1000,1000 L0,1000 Z"
            fill="#1C6B99"
            opacity="0.5"
          />
        </svg>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzM5QTREOCIgc3Ryb2tlLXdpZHRoPSIwLjUiIG9wYWNpdHk9IjAuMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14 md:mb-10 relative"
      >
        <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl md:text-5xl">
          Latest <span className="py-4 text-gradient">Newsletter</span>
        </h2>
        <p className="mt-2 max-w-2xl text-xl mx-auto text-gray-600">
          The core values that drive our approach to childcare and education.
        </p>
        <div className="w-24 h-1 bg-gradient-animation rounded-full mx-auto mt-6"></div>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {newsletters.map((newsletter, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl p-6 flex flex-col justify-between group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] shadow-md hover:shadow-xl"
            style={{
              borderLeft: "4px solid #39A4D8",
            }}
          >
            <div className="absolute top-0 left-0 w-0 h-full bg-blue-50 -z-10 transition-all duration-500 ease-out group-hover:w-full"></div>
            <div>
              <div className="flex items-center mb-3">
                <div className="h-8 w-2 bg-[#39A4D8] rounded-full mr-3 transform transition-transform duration-300 group-hover:scale-y-125"></div>
                <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#39A4D8] transition-colors duration-300">
                  {newsletter.name}
                </h3>
              </div>
              <p className="text-gray-600 mb-4 pl-5">
                {newsletter.createdAt.slice(0, 10)}
              </p>
            </div>
            <div className="mt-4 text-right">
              <a
                href={newsletter.pdfUrl}
                className="inline-flex items-center px-4 py-2 rounded-full text-white  font-medium transition-all duration-300  transform group-hover:-translate-y-1"
                style={{
                  backgroundColor: "linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))",
                  boxShadow:"0 4px 12px rgba(124, 58, 237, 0.25)",
                  background:"linear-gradient(135deg, var(--gradient-purple-start), var(--gradient-blue-end))"
                }}
                download
              >
                <span>Download PDF</span>
                <svg
                  className="ml-2 w-5 h-5 transform transition-transform duration-300 group-hover:translate-y-[-2px] group-hover:translate-x-[2px]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </a>
            </div>
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-r-[40px] border-t-transparent border-r-[#39A4D8] opacity-20 transition-opacity duration-300 group-hover:opacity-80"></div>
          </div>
        ))}
      </div>

      {/* Animations */}
      <style jsx>{`
        @keyframes float-slow {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-15px) translateX(10px);
          }
        }
        @keyframes float-medium {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(15px) translateX(-10px);
          }
        }
        @keyframes float-fast {
          0%,
          100% {
            transform: translateY(0) translateX(0);
          }
          50% {
            transform: translateY(-10px) translateX(-5px);
          }
        }
        .animate-float-slow {
          animation: float-slow 15s ease-in-out infinite;
        }
        .animate-float-medium {
          animation: float-medium 12s ease-in-out infinite;
        }
        .animate-float-fast {
          animation: float-fast 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default NewsletterSection;
