// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   CalendarIcon,
//   Share2Icon,
//   FacebookIcon,
//   TwitterIcon,
//   TagIcon,
// } from "lucide-react";

// export default function BlogDetail() {
//   const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

//   useEffect(() => {
//     const handleMouseMove = (e: { clientX: any; clientY: any; }) => {
//       setMousePosition({ x: e.clientX, y: e.clientY });
//     };

//     window.addEventListener("mousemove", handleMouseMove);
//     return () => {
//       window.removeEventListener("mousemove", handleMouseMove);
//     };
//   }, []);

//   // Generate random shape positions
//   const shapes = [
//     {
//       top: "5%",
//       left: "10%",
//       size: "w-32 h-32",
//       opacity: "opacity-10",
//       type: "circle",
//     },
//     {
//       top: "15%",
//       right: "5%",
//       size: "w-40 h-40",
//       opacity: "opacity-5",
//       type: "square",
//     },
//     {
//       top: "70%",
//       left: "5%",
//       size: "w-24 h-24",
//       opacity: "opacity-20",
//       type: "circle",
//     },
//     {
//       top: "60%",
//       right: "10%",
//       size: "w-48 h-48",
//       opacity: "opacity-10",
//       type: "square",
//     },
//     {
//       top: "40%",
//       left: "25%",
//       size: "w-36 h-36",
//       opacity: "opacity-5",
//       type: "circle",
//     },
//   ];

//   // Tags for the blog post
//   const tags = [
//     "Happiness",
//     "Self-Care",
//     "Mindfulness",
//     "Wellness",
//     "Lifestyle",
//   ];

//   return (
//     <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen text-[#092337] relative overflow-hidden mt-10">
//       {/* Background animated blob */}
//       <div
//         className="absolute w-96 h-96 rounded-full bg-blue-200 opacity-20 blur-3xl"
//         style={{
//           left: `${mousePosition.x / 20}px`,
//           top: `${mousePosition.y / 20}px`,
//           transition: "left 3s ease-out, top 3s ease-out",
//         }}
//       />

//       {/* Static decorative shapes */}
//       {shapes.map((shape, index) => (
//         <div
//           key={index}
//           className={`absolute ${shape.size} ${shape.opacity} blur-lg`}
//           style={{
//             top: shape.top,
//             left: shape.left,
//             right: shape.right,
//             backgroundColor: shape.type === "circle" ? "#3fb5dd" : "#092337",
//             borderRadius: shape.type === "circle" ? "50%" : "15%",
//           }}
//         />
//       ))}

//       {/* Main content container */}
//       <div className="max-w-6xl mx-auto px-4 py-16 relative z-10">
//         {/* Title */}
//         <h1 className="text-4xl md:text-5xl font-bold text-[#3fb5dd] mb-6 leading-tight">
//           How to Be Happy: 27 Habits to Add to Your Routine
//         </h1>

//         {/* Author and Meta */}
//         {/* <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm mb-6">
//           <div className="flex items-center gap-3 text-blue-800">
//             <img
//               src="/api/placeholder/40/40"
//               alt="Author"
//               className="w-9 h-9 rounded-full object-cover border-2 border-blue-300"
//             />
//             <div>
//               <p className="font-semibold">Arya Stark</p>
//               <div className="flex items-center gap-1 text-xs text-blue-600">
//                 <CalendarIcon className="w-4 h-4" />
//                 <span>Jan 13, 2022</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex items-center gap-3 text-[#3fb5dd] mt-4 md:mt-0">
//             <FacebookIcon className="w-5 h-5 cursor-pointer hover:text-blue-800 transition-colors" />
//             <TwitterIcon className="w-5 h-5 cursor-pointer hover:text-blue-800 transition-colors" />
//             <Share2Icon className="w-5 h-5 cursor-pointer hover:text-blue-800 transition-colors" />
//           </div>
//         </div> */}

//         {/* Tags */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           {tags.map((tag, index) => (
//             <div
//               key={index}
//               className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
//             >
//               <TagIcon className="w-3 h-3 mr-1" />
//               {tag}
//             </div>
//           ))}
//         </div>

//         {/* Image with animated border */}
//         <div className="relative mb-8 rounded-lg overflow-hidden group">
//           <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 animate-pulse rounded-lg -m-1 z-0 group-hover:animate-none transition-all duration-300" />
//           <div className="relative z-10 overflow-hidden rounded-lg">
//             <img
//               src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
//               alt="Meditation"
//               className="w-full h-[25rem] object-cover transition-transform duration-700 group-hover:scale-105"
//             />
//           </div>
         
//         </div>

//         {/* Blog Content */}
//         <div className="prose max-w-none text-[#092337] relative">
//           <div className="absolute -left-10 top-0 w-1 h-full bg-gradient-to-b from-blue-300 to-blue-100 rounded-full opacity-70" />
//           <p className="text-lg">
//             Habits matter. If you've ever tried breaking a bad habit, you know
//             all too well how engrained they are.
//           </p>
//           <p>
//             Here's a look at some daily, monthly, and yearly habits to help
//             kickstart your quest. Just remember that everyone's version of
//             happiness is a little different, and so is their path to achieving
//             it.
//           </p>
//           <p>
//             If some of these habits create added stress or just don't fit your
//             lifestyle, ditch them. With a little time and practice, you'll
//             figure out what does and doesn't work for you.
//           </p>

//           {/* Decorative quote section */}
//           <div className="my-8 relative">
//             <div className="absolute -left-6 top-0 bottom-0 w-1 bg-blue-400 rounded-full"></div>
//             <blockquote className="pl-6 italic text-blue-800 text-lg">
//               "Happiness is not something ready-made. It comes from your own
//               actions."
//               <footer className="text-sm text-blue-600 mt-2">
//                 — Dalai Lama
//               </footer>
//             </blockquote>
//           </div>

//           <p>
//             Remember that happiness looks different for everyone, so if some of
//             these habits create more stress than joy, feel free to leave them
//             behind and focus on what truly brings you peace.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }







// app/blog/[id]/page.tsx
//fully dynamic no-caching (always loading fresh posts)
export const dynamic = "force-dynamic";
export const revalidate = 0;


import BlogDetail from "../../../components/BlogComps/BlogDetail";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // 1) await params
  const { id } = await params;

  // 2) now safe to use id
  const res = await fetch(`http://localhost:5000/api/blogs/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return (
      <div className="text-center py-20 text-red-500">
        Failed to load blog post.
      </div>
    );
  }

  const blog = await res.json();
  return <BlogDetail blog={blog} />;
}


// export default async function BlogPage({ params }: { params: { id: string } }) {
//   const res = await fetch(`http://localhost:5000/api/blogs/${params.id}`, {
//     cache: "no-store", // Always fetch fresh
//   });

//   if (!res.ok) {
//     return (
//       <div className="text-center py-20 text-red-500">
//         Failed to load blog post.
//       </div>
//     );
//   }

//   const blog = await res.json();

//   return <BlogDetail blog={blog} />;
// }
