// "use client";

// import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
// import { format } from "date-fns";
// import { CalendarIcon, UserIcon, ArrowRightIcon } from "lucide-react";
// import Link from "next/link";





// export default function BlogCards() {

//   const GradientBlobBackgroundFlipped = () => {
//   return (
//     <>
//       {/* Gradient Blobs - Mirrored */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-30 pointer-events-none">
//         <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform -translate-x-1/4 -translate-y-1/4" />
//         <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-gradient-animation opacity-30 blur-3xl transform translate-x-1/4 translate-y-1/4" />
//         <div className="absolute top-2/3 left-1/2 w-80 h-80 rounded-full bg-gradient-radial opacity-20 blur-2xl transform -translate-x-1/2 -translate-y-1/2" />
//       </div>

//       {/* Animated Dots Grid */}
//       <div className="absolute inset-0 opacity-20 pointer-events-none">
//         <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
//           <defs>
//             <pattern id="dotPatternFlipped" width="30" height="30" patternUnits="userSpaceOnUse">
//               <circle cx="5" cy="5" r="1.5" fill="var(--color-accent-glow)" />
//             </pattern>
//           </defs>
//           <rect width="100%" height="100%" fill="url(#dotPatternFlipped)" />
//         </svg>
//       </div>
//     </>
//   );
// };

// const blogPosts = [
//   {
//     id: 1,
//     title: "The Art of Mindful Parenting",
//     excerpt:
//       "Discover how practicing mindfulness can transform your relationship with your children and create a more peaceful home environment.",
//     image:
//       "https://images.pexels.com/photos/4473796/pexels-photo-4473796.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     author: "Emma Johnson",
//     date: new Date("2025-03-15"),
//     slug: "art-of-mindful-parenting",
//   },
//   {
//     id: 2,
//     title: "Nutritional Habits for Growing Children",
//     excerpt:
//       "Learn about essential nutrients and healthy eating patterns that support your child's physical and mental development.",
//     image:
//       "https://images.pexels.com/photos/1660030/pexels-photo-1660030.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     author: "Dr. Michael Chen",
//     date: new Date("2025-03-10"),
//     slug: "nutritional-habits-growing-children",
//   },
//   {
//     id: 3,
//     title: "Building Emotional Intelligence in Kids",
//     excerpt:
//       "Practical strategies for helping children recognize, understand, and manage their emotions effectively from an early age.",
//     image:
//       "https://images.pexels.com/photos/3662667/pexels-photo-3662667.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     author: "Sarah Williams",
//     date: new Date("2025-03-05"),
//     slug: "building-emotional-intelligence",
//   },
//   {
//     id: 4,
//     title: "The Power of Play in Childhood Development",
//     excerpt:
//       "Explore how different types of play contribute to cognitive, social, and emotional growth in children of all ages.",
//     image:
//       "https://images.pexels.com/photos/3933022/pexels-photo-3933022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     author: "James Peterson",
//     date: new Date("2025-02-28"),
//     slug: "power-of-play-development",
//   },
//   {
//     id: 5,
//     title: "Creating Healthy Sleep Routines",
//     excerpt:
//       "A comprehensive guide to establishing sleep patterns that promote restful nights for both children and parents.",
//     image:
//       "https://images.pexels.com/photos/4260325/pexels-photo-4260325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     author: "Dr. Lisa Taylor",
//     date: new Date("2025-02-20"),
//     slug: "healthy-sleep-routines",
//   },
//   {
//     id: 6,
//     title: "Navigating the Digital World with Kids",
//     excerpt:
//       "Strategies for managing screen time and guiding children to use technology in healthy, productive ways.",
//     image:
//       "https://images.pexels.com/photos/4260325/pexels-photo-4260325.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
//     author: "David Martinez",
//     date: new Date("2025-02-15"),
//     slug: "navigating-digital-world",
//   },
// ];


//   return (
    
//     <section className="relative z-10 px-4 pb-20 mt-4 md:mt-8 max-w-7xl mx-auto">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
//         {blogPosts.map((post) => {
//           const formattedDate = format(post.date, "MMM d, yyyy");

//           return (
//             <div key={post.id} className="h-full">
//               <CardContainer className="inter-var">
//                 <CardBody className="bg-gradient-to-br from-[#39A4D8] to-[#2C3E94] relative group/card  border-zinc-200 h-full rounded-xl p-6 border shadow-md hover:shadow-xl hover:shadow-slate-400 transition-all duration-300">
//                   <CardItem
//                     translateZ="50"
//                     className="text-2xl font-bold text-slate-950 "
//                   >
//                     {post.title}
//                   </CardItem>
//                   <CardItem
//                     as="p"
//                     translateZ="60"
//                     className="text-slate-800 text-sm max-w-sm mt-2 "
//                   >
//                     {post.excerpt}
//                   </CardItem>
//                   <CardItem translateZ="100" className="w-full mt-4">
//                     <div className="h-60 w-full overflow-hidden rounded-xl">
//                       <img
//                         src={post.image}
//                         height="1000"
//                         width="1000"
//                         className="h-full w-full object-cover transition-all duration-500 group-hover/card:scale-105"
//                         alt={post.title}
//                       />
//                     </div>
//                   </CardItem>
//                   <div className="mt-6">
//                     <CardItem
//                       translateZ="40"
//                       className="flex items-center text-slate-800 text-xs gap-2 "
//                     >
//                       <UserIcon size={14} />
//                       <span>{post.author}</span>
//                       <span className="mx-1">•</span>
//                       <CalendarIcon size={14} />
//                       <span>{formattedDate}</span>
//                     </CardItem>
//                   </div>
//                   <CardItem
//                     translateZ={20}
//                     as={Link}
//                     href={`/blog/${post.slug}`}
//                     className="flex items-center gap-1 text-sm font-medium text-white/80 mt-4 group/link"
//                   >
//                     <span>Read more</span>
//                     <ArrowRightIcon
//                       size={14}
//                       className="transform transition-transform duration-300 group-hover/link:translate-x-1"
//                     />
//                   </CardItem>
//                 </CardBody>
//               </CardContainer>
//             </div>
//           );
//         })}
//       </div>
//     </section>
//   );
// }








"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { CardContainer, CardBody, CardItem } from "../ui/3d-card";
import { format } from "date-fns";
import { CalendarIcon, UserIcon, ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from 'react-markdown';
import remarkGfm      from 'remark-gfm';     // for tables, task‑lists, etc.

// helper: strip markdown and grab first N words
function teaser(md: string, wordCount = 4) {
  const plain = md
    .replace(/#+\s*/g, "")                       // strip headings
    .replace(/\*\*?/g, "")                       // strip bold/italic
    .replace(/`+/g, "")                          // strip code ticks
    .replace(/!\[.*?\]\(.*?\)/g, "")             // strip images
    .replace(/\[([^\]]+)\]\(.*?\)/g, "$1")       // keep link text
    .trim();
  const words = plain.split(/\s+/).slice(0, wordCount);
  return words.join(" ") + (words.length >= wordCount ? "…" : "");
}

// Define the shape of blog data
interface BlogPost {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  images: string[];
  createdAt: string;
}

export default function BlogCards() {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(response.data);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section className="relative z-10 px-4  max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {blogs.map(post => {
          const formattedDate = format(new Date(post.createdAt), "MMM d, yyyy");
          return (
            <div key={post._id} className="h-full">
              <CardContainer className="inter-var">
                <CardBody className="bg-gradient-to-tl from-[#bce4f2] to-[#ffffff] relative group/card border-zinc-200 h-full rounded-xl p-8 border shadow-md hover:shadow-xl hover:shadow-slate-400 transition-all duration-300">

                  {/* Title */}
                  <CardItem translateZ="50" className="text-2xl font-bold text-[#03045e]">
                    {post.title}
                  </CardItem>

                  {/* Teaser: first 4 words only */}
                  {/* <CardItem as="p" translateZ="60" className="text-sm mt-2 text-[#000814]">
                    {teaser(post.content, 4)}
                  </CardItem> */}

                  {/* Image */}
                  <CardItem translateZ="100" className="w-full mt-4">
                    <div className="aspect-w-16 aspect-h-9 overflow-hidden rounded-xl">
                      <img
                        src={post.images?.[0] || "/placeholder.jpg"}
                        alt={post.title}
                        className="h-full w-full object-fill rounded-lg transition-all duration-500 group-hover/card:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to- from-blue-950/40 via-black/30 to-transparent mix-blend-multiply shadow-lg shadow-black rounded-lg"></div>
                    </div>
                  </CardItem>

                  {/* Meta */}
                  <div className="mt-5">
                    <CardItem translateZ="40" className="flex items-center text-[#000814] text-xs gap-2">
                      <UserIcon size={14} /><span>Admin</span><span className="mx-1">•</span>
                      <CalendarIcon size={14} /><span>{formattedDate}</span>
                    </CardItem>
                  </div>

                  {/* Read more */}
                  <CardItem
                    translateZ={20}
                    as={Link}
                    href={`/blog/${post._id}`}
                    className="flex items-center gap-1 text-sm font-semibold text-[#000814] mt-4 group/link"
                  >
                    <span>Read more</span>
                    <ArrowRightIcon size={14} className="transform transition-transform duration-300 group-hover/link:translate-x-1" />
                  </CardItem>

                </CardBody>
              </CardContainer>
            </div>
          );
        })}
      </div>
    </section>
  );
}
