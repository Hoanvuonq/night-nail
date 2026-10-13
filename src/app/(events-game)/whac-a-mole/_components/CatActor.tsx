"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export type CatLevel = 1 | 2 | 3 | 4;
export type CatMood =
  | "appear-a"
  | "appear-b"
  | "idle"
  | "hit"
  | "down-1"
  | "down-2";

type Props = {
  level: CatLevel;
  nonce: number;
  isHit: boolean;
  isExpired?: boolean;
  onFinished?: (nonce: number) => void;
  className?: string;
};

// Each new nonce gets a different, deterministic pseudo-random visual variant.
// Chọn ngẫu nhiên 1 trong 3 biểu cảm: appear-a, appear-b hoặc idle
function selectAppearance(
  nonce: number,
  level: CatLevel,
): "appear-a" | "appear-b" | "idle" {
  const x = Math.sin(nonce * 127.1 + level * 311.7) * 43758.5453;
  const frac = x - Math.floor(x);
  return frac < 0.33 ? "appear-a" : frac < 0.66 ? "appear-b" : "idle";
}

const ASSET_ROOT = "/whac-a-mole/cat";

export default function CatActor({
  level,
  nonce,
  isHit,
  isExpired = false,
  onFinished,
  className = "",
}: Props) {
  const [mood, setMood] = useState<CatMood>(() =>
    selectAppearance(nonce, level),
  );
  const [finished, setFinished] = useState(false);
  const finishedOnce = useRef(false);
  const onFinishedRef = useRef(onFinished);

  useEffect(() => {
    onFinishedRef.current = onFinished;
  }, [onFinished]);

  // Khi spawn mới, chọn ngẫu nhiên 1 trong 3 dáng (appear-a, appear-b, idle) và giữ nguyên
  useEffect(() => {
    finishedOnce.current = false;
    setFinished(false);
    setMood(selectAppearance(nonce, level));
  }, [nonce, level]);

  // A hit always takes precedence over timeout/escape.
  useEffect(() => {
    if (finishedOnce.current || finished) return;
    if (isHit) {
      setMood((current) =>
        current === "hit" || current.startsWith("down-") ? current : "hit",
      );
    } else if (isExpired) {
      setMood((current) =>
        current === "hit" || current.startsWith("down-") ? current : "down-1",
      );
    }
  }, [isHit, isExpired, finished]);

  // Xử lý chuỗi animation khi hit hoặc lặn xuống (down-1 -> down-2 -> finished)
  // Không đổi appear sang idle nữa để tránh giật nhấp nháy
  useEffect(() => {
    if (finished) return;
    const duration: Partial<Record<CatMood, number>> = {
      hit: 320,
      "down-1": 150,
      "down-2": 150,
    };
    const ms = duration[mood];
    if (ms === undefined) return;

    const timer = window.setTimeout(() => {
      switch (mood) {
        case "hit":
          setMood("down-1");
          break;
        case "down-1":
          setMood("down-2");
          break;
        case "down-2":
          if (!finishedOnce.current) {
            finishedOnce.current = true;
            setFinished(true);
            onFinishedRef.current?.(nonce);
          }
          break;
      }
    }, ms);
    return () => window.clearTimeout(timer);
  }, [mood, finished, nonce]);

  const source = `${ASSET_ROOT}/cat-${String(level).padStart(2, "0")}/icon-cat-${mood}.png`;
  const down = mood === "down-1" || mood === "down-2";

  return (
    <AnimatePresence>
      {!finished && (
        <motion.span
          key={nonce}
          className={`cat-actor pointer-events-none absolute block ${className}`}
          initial={{ opacity: 0, y: "65%", scale: 0.82 }}
          animate={
            mood === "hit"
              ? {
                  opacity: 1,
                  y: ["0%", "8%", "0%"],
                  rotate: [0, -7, 7, 0],
                  scale: [1, 0.91, 1],
                }
              : down
                ? {
                    opacity: 1,
                    y: mood === "down-1" ? "24%" : "63%",
                    scale: mood === "down-1" ? 0.93 : 0.82,
                    rotate: 0,
                  }
                : { opacity: 1, y: "0%", scale: 1, rotate: 0 }
          }
          exit={{ opacity: 0, y: "95%", scale: 0.75 }}
          transition={{
            duration: mood === "hit" ? 0.3 : 0.28,
            ease: "easeOut",
          }}
        >
          <span className="absolute inset-0 block">
            <Image
              src={source}
              alt={`Mèo cấp ${level}: ${mood}`}
              fill
              sizes="(max-width: 768px) 110px, 165px"
              draggable={false}
              className="object-contain object-bottom"
            />
          </span>
          <span className={`level-tag level-${level}`}>★ {level}</span>
          {mood === "hit" && (
            <motion.span
              aria-hidden
              className="absolute -top-[30%] left-[50%] text-2xl"
              animate={{ rotate: [-20, 18, -20], y: [0, -6, 0] }}
              transition={{ duration: 0.2, repeat: 1 }}
            >
              💫
            </motion.span>
          )}
        </motion.span>
      )}
    </AnimatePresence>
  );
}
