"use client";

import { motion } from "framer-motion";

type ImpactFXProps = {
  left: string;
  top: string;
  points: number;
};

export default function ImpactFX({ left, top, points }: ImpactFXProps) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute z-30"
      style={{ left, top }}
    >
      <motion.span
        className="impact-ring"
        initial={{ opacity: 0, scale: 0.35, x: "-50%", y: "-50%" }}
        animate={{ opacity: [0, 0.75, 0], scale: [0.4, 1.15, 1.5] }}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <motion.span
        className="impact-core"
        initial={{ opacity: 0, scale: 0.25, x: "-50%", y: "-50%" }}
        animate={{ opacity: [0, 1, 0], scale: [0.25, 1.1, 0.65] }}
        transition={{ duration: 0.28, ease: "easeOut" }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => {
        const angle = i * 60;
        return (
          <motion.span
            key={i}
            className="impact-spark"
            style={{ left: "-2px", top: "-2px", rotate: `${angle}deg` }}
            initial={{ opacity: 0, scaleY: 0.4, x: "-50%", y: "-50%" }}
            animate={{
              opacity: [0, 1, 0],
              scaleY: [0.4, 1, 0.65],
              x: ["-50%", "-50%", "-50%"],
              y: ["-50%", "-50%", "-50%"],
            }}
            transition={{ duration: 0.28, delay: i * 0.012, ease: "easeOut" }}
          />
        );
      })}
      <motion.span
        className="point-burst"
        initial={{ opacity: 0, y: 3, scale: 0.6, x: "-10%" }}
        animate={{ opacity: 1, y: -30, scale: 1.18, x: "-10%" }}
        exit={{ opacity: 0, y: -62 }}
        transition={{ duration: 0.55 }}
      >
        +{points} ✨
      </motion.span>
    </div>
  );
}
