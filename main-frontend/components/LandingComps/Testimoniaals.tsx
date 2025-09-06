// "use client";


// import { useState } from "react";
// import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

// export default function TestimonialsSection() {
//   const testimonials = [
//     {
//       id: 1,
//       name: "Sarah Johnson",
//       role: "Marketing Director",
//       company: "TechVision Inc.",
//       avatar:
//         "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740",
//       content:
//         "Working with this team has transformed our digital presence completely. The attention to detail and creative approach exceeded our expectations.",
//       rating: 5,
//     },
//     {
//       id: 2,
//       name: "David Chen",
//       role: "CEO",
//       company: "Innovate Solutions",
//       avatar:
//         "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740",
//       content:
//         "The level of professionalism and expertise is unmatched. Our project was delivered on time and the results have been tremendous for our business.",
//       rating: 5,
//     },
//     {
//       id: 3,
//       name: "Emma Rodriguez",
//       role: "Product Manager",
//       company: "GlobalTech",
//       avatar:
//         "https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg?semt=ais_hybrid&w=740",
//       content:
//         "I've worked with many agencies before, but none have delivered the quality and strategic thinking that this team provides consistently.",
//       rating: 5,
//     },
//   ];

//   const [activeIndex, setActiveIndex] = useState(0);

//   const nextTestimonial = () => {
//     setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
//   };

//   const prevTestimonial = () => {
//     setActiveIndex(
//       (prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length
//     );
//   };

//   return (
//     <section className="w-full py-4 relative overflow-hidden">
//       {/* Background elements */}
//       <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-animation opacity-20"></div>
//         <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-gradient-radial rounded-full blur-3xl opacity-20 -translate-y-1/2 translate-x-1/4"></div>
//         <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-gradient-radial rounded-full blur-3xl opacity-20 translate-y-1/4 -translate-x-1/4"></div>
//       </div>

//       {/* Content container */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
//         {/* Section heading */}
//         <div className="text-center mb-7">
//           <h2 className="text-4xl font-bold mb-4">
//             What Our <span className="text-gradient">Clients</span> Say
//           </h2>
//           <p className="text-text-muted max-w-2xl mx-auto">
//             Don't just take our word for it. Here's what our clients have to say
//             about their experience working with us.
//           </p>
//         </div>

//         {/* Testimonials carousel */}
//         <div className="relative">
//           <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8 relative shadow-glow">
//             <div className="absolute -top-6 left-8 text-primary-500">
//               <Quote size={48} className="opacity-80" />
//             </div>

//             <div className="grid md:grid-cols-5 gap-8 items-center">
//               {/* Avatar and info - 1 column on mobile, 2 columns on desktop */}
//               <div className="md:col-span-2 flex flex-col items-center md:items-start text-center md:text-left">
//                 <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-primary-light">
//                   <img
//                     src={testimonials[activeIndex].avatar}
//                     alt={testimonials[activeIndex].name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <h3 className="text-xl font-bold text-primary-dark">
//                   {testimonials[activeIndex].name}
//                 </h3>
//                 <p className="text-text-muted">
//                   {testimonials[activeIndex].role}
//                 </p>
//                 <p className="text-sm font-medium text-primary-500">
//                   {testimonials[activeIndex].company}
//                 </p>
//                 <div className="flex mt-3">
//                   {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
//                     <Star
//                       key={i}
//                       size={18}
//                       className="text-primary-500 fill-primary-500"
//                     />
//                   ))}
//                 </div>
//               </div>

//               {/* Testimonial content - 1 column on mobile, 3 columns on desktop */}
//               <div className="md:col-span-3">
//                 <p className="text-lg italic leading-relaxed">
//                   "{testimonials[activeIndex].content}"
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Navigation buttons */}
//           <div className="flex justify-center gap-4">
//             <button
//               onClick={prevTestimonial}
//               className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-accent-soft hover:border-primary-500"
//             >
//               <ChevronLeft className="text-primary-dark" />
//             </button>

//             <div className="flex gap-2 items-center">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setActiveIndex(index)}
//                   className={`w-3 h-3 rounded-full transition-all ${
//                     index === activeIndex
//                       ? "bg-primary-500 w-6"
//                       : "bg-accent-soft hover:bg-primary-dark/50"
//                   }`}
//                   aria-label={`Go to testimonial ${index + 1}`}
//                 />
//               ))}
//             </div>

//             <button
//               onClick={nextTestimonial}
//               className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:shadow-lg transition-all border border-accent-soft hover:border-primary-500"
//             >
//               <ChevronRight className="text-primary-dark" />
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import TestimonialCard from "./TestimonialCards"; // Assuming this is in the same directory

type Testimonial = {
  _id: string;
  name: string;
  message: string;
  photo: string;
  createdAt: string;
};

export default function TestimonialsSection() {
  const [alltestimonials, setAllTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/testimonials", );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setAllTestimonials(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  return (
    <section className="w-full py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto text-center mb-12">
        <h2 className="text-4xl font-bold mb-4">
          What Our <span className="text-gradient">Clients</span> Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Here’s what our clients have to say about working with us.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading testimonials...</p>
      ) : alltestimonials.length === 0 ? (
        <p className="text-center text-gray-500">No testimonials available.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {alltestimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial._id}
              testimonial={{
                name: testimonial.name,
                review: testimonial.message,
                rating: 5, // static or derive from data if available
                date: testimonial.createdAt,
                avatar: testimonial.photo,
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
