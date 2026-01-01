"use client";
import { motion } from "framer-motion";

export const MarqueeBanner = () => {
  return (
    <div className="mt-12 w-full overflow-hidden whitespace-nowrap opacity-10 pointer-events-none select-none">
      <motion.div
        className="flex"
        animate={{
          x: [0, "-50%"],
        }}
        transition={{
          duration: 30,
          ease: "linear",
          repeat: Infinity,
        }}
      >
        {[1, 2].map((group) => (
          <div
            key={group}
            className="flex flex-nowrap items-center pacifico-regular-font"
          >
            <span className="text-[120px] font-black  tracking-tighter text-white mx-10">
              Night Nail • Night Nail • Night Nail • Night Nail • Night Nail •
              Night Nail • Night Nail • Night Nail •
            </span>
            <span className="text-[120px] font-black  tracking-tighter text-white mx-10">
              Night Nail • Night Nail • Night Nail • Night Nail • Night Nail •
              Night Nail • Night Nail • Night Nail •
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
