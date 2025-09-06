"use client";

import React, { useEffect, useState, useMemo } from "react";
import {
  CalendarIcon,
  Share2Icon,
  FacebookIcon,
  TwitterIcon,
  TagIcon,
} from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { Search } from "lucide-react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";

type Blog = {
  title: string;
  content: string;
  tags: string[];
  images: string[];
  createdAt: string;
};

type Post = {
  id: string;
  title: string;
  imageUrl: string;
  url: string;
  tags: string[];
};

export default function BlogDetail({ blog }: { blog: Blog }) {
  //search state
  const [query, setQuery] = useState("");

  // post fetched from API
  const [posts, setPosts] = useState<Post[]>([]);
  const [loadingPosts, setLoadingPosts] = useState(true);

  useEffect(() => {
    //fetch all blogs for the sidebar
    async function loadPosts() {
      try {
        const res = await fetch("http://localhost:5000/api/blogs");
        const data: (Blog & { _id: string; images: string[] })[] =
          await res.json();
        const list = data.map((b) => ({
          id: b._id,
          title: b.title,
          imageUrl: b.images[0] || "/placeholder.png",
          url: `/blog/${b._id}`,
          tags: b.tags || [],
        }));
        setPosts(list);
        setPosts(list);
      } catch (err) {
        console.error(err);
        setPosts([]); // fallback to empty
      } finally {
        setLoadingPosts(false);
      }
    }
    loadPosts();
  }, []);

  //filter for both title and tags
  const filteredPosts = useMemo(() => {
    if (!query.trim()) return posts;

    const q = query.toLowerCase();
    return posts.filter((p) => {
      // match title
      if (p.title.toLowerCase().includes(q)) return true;
      // match any tag
      return p.tags?.some((tag) => tag.toLowerCase().includes(q));
    });
  }, [posts, query]);

  // Loading blogs by popular tags name
  const allTags = useMemo(() => {
    const set = new Set<string>();
    posts.forEach((p) => p.tags?.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [posts]);

  const tagToUrl = useMemo(() => {
    const map: Record<string, string> = {};
    posts.forEach((p) =>
      p.tags?.forEach((t) => {
        if (!map[t]) map[t] = p.url;
      })
    );
    return map;
  }, [posts]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const [animateShapes, setAnimateShapes] = useState(true);
  const [animateShapes2, setAnimateShapes2] = useState(false);

  // Animation for floating shapes - alternating cycles
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

  const shapes = [
    {
      top: "5%",
      left: "10%",
      size: "w-32 h-32",
      opacity: "opacity-10",
      type: "circle",
    },
    {
      top: "15%",
      right: "5%",
      size: "w-40 h-40",
      opacity: "opacity-5",
      type: "square",
    },
    {
      top: "70%",
      left: "5%",
      size: "w-24 h-24",
      opacity: "opacity-20",
      type: "circle",
    },
    {
      top: "60%",
      right: "10%",
      size: "w-48 h-48",
      opacity: "opacity-10",
      type: "square",
    },
    {
      top: "40%",
      left: "25%",
      size: "w-36 h-36",
      opacity: "opacity-5",
      type: "circle",
    },
  ];

  // //////////////////////////////////////////

  const pulseShapeVariants = {
    animate: {
      scale: [1, 1.05, 1],
      opacity: [0.4, 0.7, 0.4],
      transition: {
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
      },
    },
  };
  // //////////////////////////////////////////

  return (
    // bg color
    <div className="bg-white text-gray-800 relative overflow-hidden mt-7 ">
      <div className="absolute inset-0 overflow-hidden ">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-[#e8eff1] opacity-5 blur-3xl duration-5000"
          variants={pulseShapeVariants}
          animate="animate"
        />
        {/* Primary animated shapes */}
        <div
          className={`absolute bottom-5 left-10  w-32 h-32 rounded-full bg-[#3fb5dd] opacity-25 transition-all duration-5000  ${
            animateShapes ? "translate-x-15" : "-translate-x-15"
          }`}
        ></div>
        <div
          className={`absolute top-40 right-15  w-40 h-40 rounded-full bg-[#3fb5dd] opacity-20 transition-all duration-5000 delay-1000 ${
            animateShapes ? "-translate-y-10" : "translate-y-10"
          }`}
        ></div>
        <div
          className={`absolute top-1/3 right-96  w-60 h-60 rounded-full bg-[#3fb5dd] opacity-15 transition-all duration-5000 delay-2000  ${
            animateShapes ? "translate-y-8" : "-translate-y-8"
          }`}
        ></div>

        {/* Additional animated shapes */}
        <div
          className={`absolute top-[5rem] left-[47rem] w-3 h-3 rounded-full bg-[#3fb5dd] z-20  transition-all duration-7000 ${
            animateShapes2 ? "translate-x-5" : "-translate-x-5"
          }`}
        ></div>
        <div
          className={`absolute top-3/4 left-2/3 w-32 h-32 rounded-full bg-[#3fb5dd] opacity-25 transition-all duration-7000 delay-2000 b ${
            animateShapes2 ? "scale-110" : "scale-90"
          }`}
        ></div>

        {/* Animated polygons */}
        {/* <div
          className={`absolute top-[15rem] left-[15rem] w-7 h-7 bg-[#3fb5dd]  z-20 rotate-45 rounded- `}
        ></div> */}
        <div
          className={`absolute top-[100px] rounded-xl right-2/3 w-10 h-10 bg-[#3fb5dd] opacity-15 rotate-12 z-20 transition-all duration-8000 delay-1500 ${
            animateShapes2 ? "rotate-45" : "rotate-12"
          }`}
        ></div>
        {/* <div
          className={`absolute bottom-1/3 left-0 w-96 h-96 bg-[#4ac5ed] opacity-30 blur-xl rounded-br-full transition-all duration-8000 delay-1500 ${
            animateShapes ? "translate-y-8" : "-translate-y-8"
          }`}
        ></div> */}

        {/* Static Shapes */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-[#3fb5dd] opacity-20 blur-2xl rounded-br-full"></div>

        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#3fb5dd] opacity-20 blur-2xl rounded-tl-full"></div>
        <div className="relative  top-1/3 left-3/4 w-24 h-24 bg-[#3fb5dd] opacity-50 blur-xl  z-20 rotate-45 border-4 "></div>
      </div>

      {/* Main content */}
      <div className="flex flex-col lg:flex-row lg:mx-15 mx-2 my-20 p-4 lg:gap-10 gap-8 ">
        {/* Left Section (Blog Content) */}
        <div className="lg:w-[65%] bg-gradient-to-tl from-[#bce4f2] to-[#ffffff] relative border-zinc-200 h-fit rounded-xl p-6 shadow-md shadow-gray-200">
          {/* Image */}
          {blog.images?.[0] && (
            <div className="relative mb-8 rounded-lg overflow-hidden group shadow-md shadow-gray-400">
              <div className="relative z-10 overflow-hidden rounded-lg">
                <img
                  src={blog.images[0]}
                  alt={blog.title}
                  className="w-full h-[25rem] lg:h-[30 rem] object-cover  transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-6">
            {blog.title}
          </h1>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {blog.tags.map((tag, index) => (
              <div
                key={index}
                className="flex items-center font-medium bg-blue-100 text-blue-800 border border-blue-800 px-3 py-1 rounded-full text-sm transition-transform transform hover:scale-105 hover:shadow-md hover:shadow-gray-400"
              >
                <TagIcon className="w-3 h-3 mr-1" />
                {tag}
              </div>
            ))}
          </div>

          {/* Content */}
          <div className="max-w-none text-[#092337] relative">
            <div className="absolute -left-10 top-0 w-1 h-full" />
            <div className="text-lg mb-4 letter-spacing-wide">
              <ReactMarkdown>{blog.content}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Right Section (Sidebar) */}
        <div className="lg:w-[35%] p-4 relative">
          {/* Search Bar */}
          <div className="bg-blue-900 text-white p-4 rounded-lg mb-6">
            <label htmlFor="search" className="sr-only">
              Search blogs
            </label>
            <div className="relative">
              <input
                type="text"
                id="search"
                placeholder="Search blogs..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-white text-white"
              />
              <Search className="w-5 h-5 text-white absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {/* Placeholder for Related/Latest Posts */}
          <div className="bg-gradient-to-tr from-[#bce4f2] to-[#ffffff] relative border-zinc-200 mb-6 p-5 rounded-lg">
            <h2 className="text-xl text-blue-800 font-bold mb-3">
              Recent Posts
            </h2>

            {loadingPosts ? (
              <p className="font-semibold">Loading...</p>
            ) : filteredPosts.length > 0 ? (
              <ul className="space-y-4">
                {filteredPosts.map((post) => (
                  <li
                    key={post.id}
                    className="transition-transform transform hover:scale-105 hover:shadow-md rounded-md"
                  >
                    <a
                      href={post.url}
                      className="flex items-center space-x-4 hover:bg-blue-200/50 p-2 rounded-lg transition"
                    >
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-12 h-12 rounded-md object-cover"
                      />
                      <span className="text-blue-800 font-medium">
                        {post.title}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-red-600 font-semibold">
                No posts match your search.
              </p>
            )}
          </div>

          {/* Placeholder for Popular Tags */}
          <div className="bg-gradient-to-t from-[#a2d1e2] to-[#ffffff] relative border-zinc-200 mb-6 p-5 rounded-lg">
            <h2 className="text-lg font-semibold mb-3">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {allTags.map((tag) =>
                tagToUrl[tag] ? (
                  <Link
                    key={tag}
                    href={tagToUrl[tag]}
                    className="bg-blue-100 text-blue-800 border border-blue-800 px-3 py-1 rounded-full text-sm transition-transform transform hover:scale-105 hover:shadow-md"
                  >
                    {tag}
                  </Link>
                ) : (
                  <span
                    key={tag}
                    className="bg-gray-200 text-gray-600 border border-gray-400 px-3 py-1 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// {/* Background animated blob */}
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
//       {/* Background Shapes */}
//       <motion.div
//         className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-blue-700 opacity-10 blur-3xl"
//         variants={pulseShapeVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute top-32 left-10 w-6 h-6 rounded-full bg-blue-700 opacity-20"
//         variants={floatingShapeVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute top-60 right-24 w-4 h-4 rounded-full bg-blue-700 opacity-30"
//         variants={randomMoveVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute bottom-40 left-20 w-32 h-32 rounded-lg bg-blue-700 opacity-15 rotate-45"
//         variants={rotatingShapeVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute top-1/3 -right-40 w-64 h-64 rounded-full  bg-white opacity-20"
//         variants={pulseShapeVariants}
//         animate="animate"
//       />
//       <motion.div
//         className="absolute bottom-20 right-10 w-20 h-20 rounded-md bg-blue-800 opacity-15 rotate-12"
//         variants={floatingShapeVariants}
//         animate="animate"
//       />
