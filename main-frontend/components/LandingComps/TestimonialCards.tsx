// import { motion } from "framer-motion";
// import { formatDistanceToNow } from "date-fns";

// type Testimonial = {
//   name: string;
//   review: string;
//   rating: number; // 1 to 5
//   date: string; // ISO format
//   avatar?: string;
// };

// function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
//   const { name, review, rating, date, avatar } = testimonial;

//   return (
//     <motion.div
//       whileHover={{ y: -10 }}
//       transition={{ type: "spring", stiffness: 150 }}
//       className="relative w-full max-w-sm p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 shadow-xl text-blue-900"
//     >
//       <div className="flex items-center gap-4 mb-4">
//         <img
//           src={avatar || "https://i.pravatar.cc/100?img=12"}
//           alt={name}
//           className="w-12 h-12 rounded-full border-2 border-blue-300 shadow-sm"
//         />
//         <div>
//           <p className="font-semibold text-lg">{name}</p>
//           <p className="text-sm text-blue-700">
//             {formatDistanceToNow(new Date(date), { addSuffix: true })}
//           </p>
//         </div>
//       </div>

//       {/* Stars */}
//       <div className="flex items-center mb-3">
//         {[...Array(5)].map((_, i) => (
//           <svg
//             key={i}
//             className={`w-5 h-5 ${
//               i < rating ? "text-yellow-400" : "text-blue-300"
//             }`}
//             fill="currentColor"
//             viewBox="0 0 20 20"
//           >
//             <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.954c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.785.57-1.84-.196-1.54-1.118l1.286-3.954a1 1 0 00-.364-1.118L2.05 9.382c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.955z" />
//           </svg>
//         ))}
//       </div>

//       {/* Review */}
//       <p className="text-sm leading-relaxed text-blue-800 italic">“{review}”</p>

//       {/* Decorative glow */}
//       <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-radial from-blue-300 to-transparent rounded-full opacity-30 blur-xl pointer-events-none" />
//     </motion.div>
//   );
// }



// export default TestimonialCard;



import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

type Testimonial = {
  name: string;
  review: string;
  rating: number;
  date: string;
  avatar?: string;
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  const { name, review, rating, date, avatar } = testimonial;
  console.log("TestimonialName", testimonial.name);
  // console.log("TestimonialAvatar", testimonial.avatar);
  console.log("TestimonialDate", testimonial.date);
  console.log("TestimonialReview", testimonial.review);

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 150 }}
      className="relative w-[20rem] h-[12rem] max-w-sm p-6 rounded-2xl bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200 shadow-xl text-blue-900"
    >
      <div className="flex items-center gap-4 mb-4">
        <img
          src={avatar }
          alt={name}
          className="w-12 h-12 rounded-full border-2 border-blue-300 shadow-sm"
        />
        <div>
          <p className="font-semibold text-lg">{name}</p>
          <p className="text-sm text-blue-700">
            {formatDistanceToNow(new Date(date), { addSuffix: true })}
          </p>
        </div>
      </div>

      <div className="flex items-center mb-3">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className={`w-5 h-5 ${
              i < rating ? "text-yellow-400" : "text-blue-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.286 3.954c.3.922-.755 1.688-1.54 1.118l-3.38-2.455a1 1 0 00-1.175 0l-3.38 2.455c-.785.57-1.84-.196-1.54-1.118l1.286-3.954a1 1 0 00-.364-1.118L2.05 9.382c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.955z" />
          </svg>
        ))}
      </div>

      <p className="text-sm leading-relaxed text-blue-800 italic">“{review}”</p>

      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-radial from-blue-300 to-transparent rounded-full opacity-30 blur-xl pointer-events-none" />
    </motion.div>
  );
}

export default TestimonialCard;
