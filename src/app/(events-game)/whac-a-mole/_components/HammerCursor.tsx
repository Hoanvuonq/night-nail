"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

type HammerCursorProps = {
  visible: boolean;
  idleVisible?: boolean;
  smashing: boolean;
  x: number;
  y: number;
  src?: string;
};

export default function HammerCursor({
  visible,
  idleVisible = false,
  smashing,
  x,
  y,
  src = "/whac-a-mole/hammer.png",
}: HammerCursorProps) {
  return (
    <>
      <AnimatePresence>
        {visible && (
          <div
            key="hammer-active"
            aria-hidden
            className="pointer-events-none absolute z-50 w-[24%]"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              transform: "translate(-67%, -23%)",
            }}
          >
            <motion.div
              className="origin-[67%_23%]"
              initial={{ scale: 0.95, rotate: -15 }}
              animate={
                smashing
                  ? { rotate: [-15, 30, -15], scale: [1, 0.92, 1] }
                  : { rotate: -15, scale: 1 }
              }
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
            >
              <Image
                src={src}
                alt="Hammer"
                width={320}
                height={430}
                priority
                draggable={false}
                className="hammer-image h-auto w-full drop-shadow-[0_18px_18px_rgba(87,52,43,.28)]"
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {!visible && idleVisible && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-[1%] -left-[3%] z-40 w-[23%] drop-shadow-xl"
          initial={{ rotate: -21 }}
          animate={{ rotate: [-21, -15, -21], y: [0, -4, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src={src}
            alt="Hammer Idle"
            width={320}
            height={430}
            priority
            className="h-auto w-full"
          />
        </motion.div>
      )}
    </>
  );
}
