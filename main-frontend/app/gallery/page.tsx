// "use client";

// import Footer from "@/components/LandingComps/Footer";
// import Navbar from "@/components/LandingComps/Navbar";
// import React, { useEffect, useState } from "react";
// import { ParallaxScroll } from "../../components/ui/parallax-scroll";

// const page = () => {
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [isLoaded, setIsLoaded] = useState(false);

//   // const galleryItems = [
//   //   {
//   //     id: 1,
//   //     title: "Project Alpha",
//   //     category: "design",
//   //     image: "/api/placeholder/600/400",
//   //     description: "Modern UI design exploration",
//   //   },
//   //   {
//   //     id: 2,
//   //     title: "Brand Evolution",
//   //     category: "branding",
//   //     image: "/api/placeholder/600/400",
//   //     description: "Corporate identity redesign",
//   //   },
//   //   {
//   //     id: 3,
//   //     title: "Mobile Application",
//   //     category: "development",
//   //     image: "/api/placeholder/600/400",
//   //     description: "iOS app development",
//   //   },
//   //   {
//   //     id: 4,
//   //     title: "E-commerce Platform",
//   //     category: "development",
//   //     image: "/api/placeholder/600/400",
//   //     description: "Full-stack shopping solution",
//   //   },
//   //   {
//   //     id: 5,
//   //     title: "Brand Guidelines",
//   //     category: "branding",
//   //     image: "/api/placeholder/600/400",
//   //     description: "Style guide and assets",
//   //   },
//   //   {
//   //     id: 6,
//   //     title: "Website Redesign",
//   //     category: "design",
//   //     image: "/api/placeholder/600/400",
//   //     description: "Full UX/UI overhaul",
//   //   },
//   // ];

//   // Animation on mount

//   // useEffect(() => {
//   //   setIsLoaded(true);
//   // }, []);

//   // // Filter gallery items
//   // const filteredItems =
//   //   activeFilter === "all"
//   //     ? galleryItems
//   //     : galleryItems.filter((item) => item.category === activeFilter);

//   const images = [
//     "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//     "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
//     "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//     "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//     "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
//     "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//     "https://images.unsplash.com/photo-1682686581854-5e71f58e7e3f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//     "https://images.unsplash.com/photo-1510784722466-f2aa9c52fff6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//     "https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//     "https://images.unsplash.com/photo-1439853949127-fa647821eba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2640&q=80",
//     "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//     "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
//     "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//     "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//     "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
//     "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//     "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
//     "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//     "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//     "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
//     "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//     "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
//     "https://images.unsplash.com/photo-1470252649378-9c29740c9fa8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
//     "https://images.unsplash.com/photo-1554080353-a576cf803bda?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
//     "https://images.unsplash.com/photo-1505144808419-1957a94ca61e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3070&q=80",
//   ];

//   return (
//     <>
//       <Navbar />
//       <section className="relative py-20 px-6 overflow-hidden">
//         {/* Background decorative elements */}
//         <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 bg-gradient-radial -translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 bg-gradient-radial translate-x-1/3 translate-y-1/3"></div>
//         <div className="absolute top-1/4 right-1/4 w-32 h-32 rounded-full opacity-10 bg-gradient-animation"></div>

//         {/* SVG decorative shapes */}
//         <svg
//           className="absolute top-10 right-10 w-32 h-32 text-primary-500 opacity-5"
//           viewBox="0 0 200 200"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill="currentColor"
//             d="M42.7,-57.2C56.1,-45.7,68.1,-32.5,73.2,-16.9C78.3,-1.3,76.5,16.8,69,32C61.4,47.2,48,59.6,32.7,65.3C17.4,71.1,0.1,70.3,-16.9,66.8C-33.8,63.4,-50.5,57.4,-62.3,45.3C-74.1,33.2,-81.1,15.1,-79.5,-1.6C-78,-18.3,-67.9,-33.6,-55.1,-45.2C-42.2,-56.8,-26.6,-64.8,-10.8,-64C5,-63.3,29.3,-68.8,42.7,-57.2Z"
//             transform="translate(100 100)"
//           />
//         </svg>
//         <svg
//           className="absolute bottom-20 left-10 w-24 h-24 text-primary-dark opacity-5"
//           viewBox="0 0 200 200"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill="currentColor"
//             d="M45.3,-51.2C59.2,-35.9,71.3,-18,73.4,2.1C75.4,22.2,67.4,44.5,53.5,57.9C39.7,71.4,19.8,76.1,0.9,75.2C-18.1,74.3,-36.1,67.8,-53.2,54.4C-70.2,41,-86.2,20.5,-88.4,-1.2C-90.5,-23,-78.7,-46,-62.1,-61.3C-45.5,-76.6,-22.7,-84.1,-2.7,-81.2C17.4,-78.2,31.4,-66.5,45.3,-51.2Z"
//             transform="translate(100 100)"
//           />
//         </svg>

//         <div className="container mx-auto max-w-6xl relative z-10">
//           {/* Section heading */}
//           <div className="text-center mb-12">
//             <h2
//               className="text-4xl md:text-5xl font-bold mb-4"
//               style={{ color: "var(--color-primary-dark)" }}
//             >
//               Our <span className="text-gradient">Gallery</span>
//             </h2>
//             <p
//               className="text-lg max-w-xl mx-auto"
//               style={{ color: "var(--color-text-muted)" }}
//             >
//               Explore our latest works and creative projects showcasing our
//               expertise and innovation
//             </p>
//           </div>
//           {/* Images */}
//           <ParallaxScroll images={images} />;
//         </div>
//       </section>

//       <Footer />
//     </>
//   );
// };

// export default page;

// {
//   /* Filter tabs */
// }
// {
//   /* <div className="flex flex-wrap justify-center mb-10 gap-2">
//       {["all", "design", "development", "branding"].map((filter) => (
//         <button
//           key={filter}
//           onClick={() => setActiveFilter(filter)}
//           className={`px-6 py-2 rounded-full transition-all duration-300 ${
//             activeFilter === filter
//               ? "shadow-glow font-medium"
//               : "hover:bg-white"
//           }`}
//           style={{
//             backgroundColor:
//               activeFilter === filter
//                 ? "var(--color-primary-500)"
//                 : "var(--color-accent-soft)",
//             color:
//               activeFilter === filter
//                 ? "var(--color-white)"
//                 : "var(--color-text-strong)",
//           }}
//         >
//           {filter.charAt(0).toUpperCase() + filter.slice(1)}
//         </button>
//       ))}
//     </div> */
// }

// {
//   /* Gallery grid */
// }
// {
//   /* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//       {filteredItems.map((item) => (
//         <div
//           key={item.id}
//           className={`bg-white rounded-lg overflow-hidden transform transition-all duration-500 shadow hover:shadow-glow ${
//             isLoaded ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
//           }`}
//           style={{
//             transitionDelay: `${item.id * 100}ms`,
//             borderColor: "var(--color-accent-soft)",
//             borderWidth: "1px",
//           }}
//         >
//           <div className="relative overflow-hidden group">
//             <img
//               src={item.image}
//               alt={item.title}
//               className="w-full h-64 object-cover transition-transform duration-700 group-hover:scale-110"
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
//               <span className="text-white text-sm uppercase tracking-wider">
//                 {item.category}
//               </span>
//             </div>
//           </div>
//           <div className="p-6">
//             <h3
//               className="text-xl font-bold mb-2"
//               style={{ color: "var(--color-primary-dark)" }}
//             >
//               {item.title}
//             </h3>
//             <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
//               {item.description}
//             </p>
//             <div className="mt-4">
//               <a
//                 href="#"
//                 className="inline-flex items-center text-sm font-medium transition-all duration-300"
//                 style={{ color: "var(--color-primary-500)" }}
//               >
//                 View Project
//                 <svg
//                   className="w-4 h-4 ml-1 transform translate-x-0 transition-transform group-hover:translate-x-1"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth="2"
//                     d="M14 5l7 7m0 0l-7 7m7-7H3"
//                   ></path>
//                 </svg>
//               </a>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div> */
// }

// {
//   /* View More button */
// }
// {
//   /* <div className="text-center mt-16">
//       <button
//         className="px-8 py-3 rounded-full font-medium transition-all duration-300 hover:shadow-glow"
//         style={{
//           background:
//             "linear-gradient(90deg, var(--gradient-blue-start), var(--gradient-blue-end))",
//           color: "var(--color-white)",
//         }}
//       >
//         View More Projects
//       </button>
//     </div> */
// }

// "use client";

// import React from "react";
// import { Timeline } from "@/components/ui/timeline";
// import Footer from "@/components/LandingComps/Footer";
// import Navbar from "@/components/LandingComps/Navbar";

// const ImageGrid = ({
//   images,
//   onImageClick,
// }: {
//   images: string[];
//   onImageClick?: (src: string) => void;
// }) => (
//   <div className="grid grid-cols-4 gap-4 mb-16">
//     {images.map((src, index) => (
//       <img
//         key={index}
//         src={src}
//         alt="gallery"
//         onClick={() => onImageClick?.(src)}
//         className="h-20 md:h-44 lg:h-60 w-full rounded-lg object-cover cursor-pointer shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
//       />
//     ))}
//   </div>
// );

// export default function TimelineDemo() {
//   const commonImages = [
//     "https://img.theweek.in/content/dam/week/news/sci-tech/2019/June/children-play-nature-kids-free-run-shut.jpg",
//     "https://i.pinimg.com/474x/a1/71/b7/a171b70d08e23407122eecef27d6a01d.jpg",
//     "https://st2.depositphotos.com/3243153/8048/i/950/depositphotos_80482382-stock-photo-kids-playing-in-a-park.jpg",
//   ];

//   const data = [
//     {
//       title: "Marathon 2025",
//       content: <ImageGrid images={Array(16).fill(commonImages[0])} />,
//     },
//     {
//       title: "Picnic 2024",
//       content: <ImageGrid images={Array(16).fill(commonImages[1])} />,
//     },
//     {
//       title: "Contest 2023",
//       content: <ImageGrid images={Array(16).fill(commonImages[2])} />,
//     },
//   ];

//   return (
//     <div className="relative w-full overflow-clip mt-16">
//       <Navbar />
//       <section className="relative py-10 px-6 overflow-hidden">
//         <div className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-10 bg-gradient-radial -translate-x-1/2 -translate-y-1/2"></div>
//         <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-10 bg-gradient-radial translate-x-1/3 translate-y-1/3"></div>

//         <svg
//           className="absolute top-10 right-10 w-32 h-32 text-primary-500 opacity-5"
//           viewBox="0 0 200 200"
//           xmlns="http://www.w3.org/2000/svg"
//         >
//           <path
//             fill="currentColor"
//             d="M42.7,-57.2C56.1,-45.7,68.1,-32.5,73.2,-16.9C78.3,-1.3,76.5,16.8,69,32C61.4,47.2,48,59.6,32.7,65.3C17.4,71.1,0.1,70.3,-16.9,66.8C-33.8,63.4,-50.5,57.4,-62.3,45.3C-74.1,33.2,-81.1,15.1,-79.5,-1.6C-78,-18.3,-67.9,-33.6,-55.1,-45.2C-42.2,-56.8,-26.6,-64.8,-10.8,-64C5,-63.3,29.3,-68.8,42.7,-57.2Z"
//             transform="translate(100 100)"
//           />
//         </svg>

//         <div className="container mx-auto max-w-9xl relative z-10">
//           <div className="text-center">
//             <h2
//               className="text-4xl md:text-5xl font-bold mb-4"
//               style={{ color: "var(--color-primary-dark)" }}
//             >
//               Our <span className="text-gradient">Gallery</span>
//             </h2>
//             <p
//               className="text-lg max-w-xl mx-auto mb-4"
//               style={{ color: "var(--color-text-muted)" }}
//             >
//               Explore our latest works and creative projects showcasing our
//               expertise and innovation
//             </p>
//           </div>
//           <Timeline data={data} />
//         </div>
//       </section>
//       <Footer />
//     </div>
//   );
// }




// app/gallery/page.tsx

// "use client";
// import React, { useEffect, useState } from "react";
// import { Timeline } from "@/components/ui/timeline";
// import Footer from "@/components/LandingComps/Footer";
// import { motion } from "framer-motion";
// import ImageGrid from "@/components/ui/ImageGrid";
// import VideoGrid from "@/components/ui/VideoGrid";

// type MediaItem = {
//   type: "image" | "video";
//   url: string;
// };

// type Album = {
//   _id: string;
//   name: string;
//   media: MediaItem[];
// };

// export default function GalleryPage() {
//   const [albums, setAlbums] = useState<Album[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchAlbums = async () => {
//       try {
//         const res = await fetch(`http://localhost:5000/api/albums`);
//         const data = await res.json();
//         setAlbums(data);
//       } catch (err) {
//         console.error("Failed to load albums", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchAlbums();
//   }, []);

//   const generateTimelineData = () => {
//     return albums.map((album) => {
//       const images = album.media
//         .filter((item) => item.type === "image")
//         .map((m) => m.url);
//       const videos = album.media
//         .filter((item) => item.type === "video")
//         .map((m) => m.url);
//       return {
//         title: album.name,
//         content: (
//           <div className="space-y-4">
//             {images.length > 0 && (
//               <div className=" rounded-xl px-4">
//                 <ImageGrid images={images} />
//               </div>
//             )}
//             {videos.length > 0 && (
//               <div className=" rounded-xl px-4 ">
//                 <VideoGrid videos={videos} />
//               </div>
//             )}
//           </div>
//         ),
//       };
//     });
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-b from-blue-100 via-blue-300 to-blue-100 flex items-center justify-center">
//         <motion.div
//           animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
//           transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
//           className="text-xl font-medium text-blue-600"
//         >
//           Loading gallery...
//         </motion.div>
//       </div>
//     );
//   }

//   return (
//     <div className="relative overflow-hidden min-h-screen mt-16  bg-gradient-to-b from-blue-100 via-blue-300 to-blue-100">
//       {/* Background Shapes */}
//       <motion.div
//         className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-700 opacity-10 blur-3xl"
//         animate={{ scale: [1, 1.1, 1] }}
//         transition={{ repeat: Infinity, duration: 8 }}
//       />
//       <motion.div
//         className="absolute top-32 left-10 w-6 h-6 rounded-full bg-blue-700 opacity-20"
//         animate={{ y: [0, -15, 0] }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute top-60 right-24 w-4 h-4 rounded-full bg-blue-700 opacity-30"
//         animate={{ x: [0, 10, -5, 10, 0], y: [0, -10, 5, -15, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute bottom-40 left-20 w-32 h-32 rounded-lg bg-blue-700 opacity-15 rotate-45"
//         animate={{ rotate: 360 }}
//         transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
//       />
//       <motion.div
//         className="absolute top-1/3 -right-40 w-64 h-64 rounded-full bg-white opacity-20"
//         animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
//         transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
//       />
//       <motion.div
//         className="absolute bottom-20 right-10 w-20 h-20 rounded-md bg-blue-800 opacity-15 rotate-12"
//         animate={{ y: [0, -15, 0] }}
//         transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
//       />

//       <svg
//         className="absolute top-1/4 left-12 opacity-5 w-24 h-24"
//         viewBox="0 0 100 100"
//       >
//         <motion.path
//           d="M50 15 L90 85 L10 85 Z"
//           fill="rgba(147, 197, 253, 0.3)"
//           animate={{ x: [0, 10, -5, 10, 0], y: [0, -10, 5, -15, 0] }}
//           transition={{ duration: 12, repeat: Infinity }}
//         />
//       </svg>

//       <svg
//         className="absolute bottom-1/3 right-1/4 opacity-40 w-40 h-40"
//         viewBox="0 0 100 100"
//       >
//         <motion.line
//           x1="10"
//           y1="10"
//           x2="90"
//           y2="90"
//           stroke="rgba(147, 197, 253, 0.5)"
//           strokeWidth="2"
//           animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
//           transition={{ duration: 8, repeat: Infinity }}
//         />
//         <motion.line
//           x1="90"
//           y1="10"
//           x2="10"
//           y2="90"
//           stroke="rgba(147, 197, 253, 0.5)"
//           strokeWidth="2"
//           animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
//           transition={{ duration: 8, repeat: Infinity }}
//         />
//       </svg>

//       <div className="relative max-w-7xl mx-auto mb-4 z-10">
//         <div className="text-center mt-8 mb-8">
//           <motion.div
//             className="inline-block relative"
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.8, ease: "easeOut" }}
//           >
//             <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl md:text-5xl">
//               Our <span className="py-4 text-gradient">Gallery</span>
//             </h2>

//             <motion.div
//               className="absolute -top-6 -left-8 text-blue-400 opacity-50"
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 0.5, scale: 1 }}
//               transition={{ delay: 0.5, duration: 0.5 }}
//             >
//               <svg width="36" height="36" viewBox="0 0 24 24" fill="none">
//                 <circle cx="12" cy="12" r="4" fill="currentColor" />
//               </svg>
//             </motion.div>

//             <motion.div
//               className="absolute -bottom-2 -right-6 text-blue-400 opacity-50"
//               initial={{ opacity: 0, scale: 0 }}
//               animate={{ opacity: 0.5, scale: 1 }}
//               transition={{ delay: 0.7, duration: 0.5 }}
//             >
//               <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
//                 <path
//                   d="M12 3L14.5 8.5L21 9.5L16.5 14L18 20.5L12 17.5L6 20.5L7.5 14L3 9.5L9.5 8.5L12 3Z"
//                   fill="currentColor"
//                 />
//               </svg>
//             </motion.div>
//           </motion.div>

//           <motion.div
//             className="mt-2 mx-auto w-24 h-1 bg-gradient-to-r from-[#2C3E94] via-[#39A4D8] to-[#2C3E94] rounded-full"
//             initial={{ width: "0%" }}
//             animate={{ width: "50%" }}
//             transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
//           />

//           <motion.p
//             className="mt-6 text-lg text-cyan-800 max-w-xl mx-auto"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.8, duration: 0.8 }}
//           >
//             Explore photos and videos from our past events and memories.
//           </motion.p>
//         </div>

//         <motion.div
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.7, delay: 0.3 }}
//           className=""
//         >
//           <Timeline data={generateTimelineData()} />
//         </motion.div>
//       </div>

//       <Footer />
//     </div>
//   );
// }






"use client";
import React, { useEffect, useState } from "react";
import { Timeline } from "@/components/ui/timeline";
import Footer from "@/components/LandingComps/Footer";
import { motion } from "framer-motion";
import ImageGrid from "@/components/ui/ImageGrid";
import VideoGrid from "@/components/ui/VideoGrid";

type MediaItem = {
  type: "image" | "video";
  url: string;
};

type Album = {
  _id: string;
  name: string;
  media: MediaItem[];
};

export default function GalleryPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const [animateShapes, setAnimateShapes] = useState(true);
  const [animateShapes2, setAnimateShapes2] = useState(false);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/albums`);
        const data = await res.json();
        setAlbums(data);
      } catch (err) {
        console.error("Failed to load albums", err);
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
  }, []);

   useEffect(() => {
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

  const generateTimelineData = () => {
    return albums.map((album) => {
      const images = album.media
        .filter((item) => item.type === "image")
        .map((m) => m.url);
      const videos = album.media
        .filter((item) => item.type === "video")
        .map((m) => m.url);
      return {
        title: album.name,
        content: (
          <div className="space-y-4">
            {images.length > 0 && (
              <div className="rounded-xl px-4">
                <ImageGrid images={images} />
              </div>
            )}
            {videos.length > 0 && (
              <div className="rounded-xl px-4">
                <VideoGrid videos={videos} />
              </div>
            )}
          </div>
        ),
      };
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="text-xl font-medium text-[#39A4D8]"
        >
          Loading gallery...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative overflow-hidden min-h-screen mt-7  bg-white text-gray-800 p-6 flex justify-center">
      {/* Background Shapes like Contact Page */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className={`absolute bottom-10 left-20 w-32 h-32 rounded-full bg-[#3fb5dd] opacity-20  transition-all duration-7000 delay-2000 ${
            animateShapes ? "translate-x-15" : "-translate-x-15"
          }`}
        ></div>
        <div
          className={`absolute top-110 left-100 w-40 h-40 rounded-full bg-[#3fb5dd] opacity-20 transition-all duration-7000 delay-2000 ${
            animateShapes2 ? "scale-110" : "scale-90"
          }`}
        ></div>
        <div className="absolute top-1/3 right-1/4 w-52 h-52 rounded-full bg-[#3fb5dd] opacity-15 blur-2xl"></div>
        <div className="absolute top-[60px] right-2/3 w-10 h-10 bg-[#3fb5dd] opacity-15 rotate-45 z-20 "></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#3fb5dd] opacity-20 blur-2xl  rounded-full"></div>
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#3fb5dd] opacity-20 blur-2xl  rounded-full"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3fb5dd] opacity-20 blur-2xl rounded-full"></div>
        <div
          className={`absolute top-[70px] left-3/4 w-24 h-24 bg-[#3fb5dd] opacity-20 rounded-full z-20 rotate-45  transition-all duration-7000 delay-1000 ${
            animateShapes ? "translate-x-15" : "-translate-x-15"
          }`}
        ></div>
        <div
          className={`absolute top-3/4 left-2/3 w-20 h-20 rounded-full bg-[#3fb5dd] opacity-25 transition-all duration-7000 delay-2000 ${
            animateShapes2 ? "scale-110" : "scale-90"
          }`}
        ></div>
      </div>

      <div className="w-full max-w-7xl z-10">
        <div className="text-center mt-8 ">
          <motion.div
            className="inline-block relative"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl md:text-5xl">
              Our <span className="py-4 text-gradient">Gallery</span>
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
            className="mt-3 text-lg text-[#0A2463] max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Explore photos and videos from our past events and memories.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="rounded-2xl z-0 p-6 "
        >
          <Timeline data={generateTimelineData()} />
        </motion.div>
      </div>
    </div>
  );
}
