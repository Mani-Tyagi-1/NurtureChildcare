"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import TestimonialCard from "./TestimonialCards";

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
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/testimonials");
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

  // autoplay
  useEffect(() => {
    if (alltestimonials.length > 0 && !paused) {
      intervalRef.current = setInterval(() => {
        setIndex((prev) => (prev + 1) % alltestimonials.length);
      }, 4000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [alltestimonials, paused]);

  // handle drag end → update index manually
  const handleDragEnd = (_: any, info: any) => {
    const offset = info.offset.x;
    if (offset < -50) {
      // swipe left → next
      setIndex((prev) => (prev + 1) % alltestimonials.length);
    } else if (offset > 50) {
      // swipe right → previous
      setIndex(
        (prev) =>
          (prev - 1 + alltestimonials.length) % alltestimonials.length
      );
    }
  };

  return (
    <section className="w-full py-12 px-4 bg-gray-50 overflow-hidden md:hidden">
      <div className="max-w-6xl mx-auto text-center mb-8">
        <h2 className="text-3xl font-bold mb-2">
          What Our <span className="text-gradient">Clients</span> Say
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto text-sm">
          Here’s what our clients have to say about working with us.
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading testimonials...</p>
      ) : alltestimonials.length === 0 ? (
        <p className="text-center text-gray-500">No testimonials available.</p>
      ) : (
        <div className="relative w-full flex justify-center items-center  pl-3">
          <motion.div
            key={alltestimonials[index]._id}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={handleDragEnd}
            onPointerDown={() => setPaused(true)} // pause when pressed
            onPointerUp={() => setPaused(false)} // resume when released
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm  cursor-grab active:cursor-grabbing"
          >
            <TestimonialCard
              testimonial={{
                name: alltestimonials[index].name,
                review: alltestimonials[index].message,
                rating: 5,
                date: alltestimonials[index].createdAt,
                avatar: alltestimonials[index].photo,
              }}
            />
          </motion.div>
        </div>
      )}
    </section>
  );
}
