"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Clock3, Trophy } from "lucide-react";
import React from "react";
import HammerCursor from "./HammerCursor";
import ImpactFX from "./ImpactFX";
import CatActor from "./CatActor";

export interface Cat {
  id: number;
  level: 1 | 2 | 3 | 4;
  nonce: number;
}

export interface HitFlash {
  hole: number;
  level: number;
  nonce: number;
}

export type Phase = "ready" | "playing" | "finished";

export const HOLES = [
  { x: 24, y: 39 },
  { x: 49, y: 40 },
  { x: 75, y: 39 },
  { x: 22, y: 52 },
  { x: 49, y: 52 },
  { x: 76, y: 53 },
  { x: 20, y: 67 },
  { x: 49, y: 67 },
  { x: 79, y: 67 },
];

export const CAT_SPRITES: Record<1 | 2 | 3 | 4, string> = {
  1: "/whac-a-mole/cat-1.png",
  2: "/whac-a-mole/cat-2.png",
  3: "/whac-a-mole/cat-3.png",
  4: "/whac-a-mole/cat-4.png",
};

export const CAT_NAMES: Record<1 | 2 | 3 | 4, string> = {
  1: "Mèo bông",
  2: "Mèo nơ",
  3: "Mèo quý tộc",
  4: "Mèo kim cương",
};

interface GameBoardProps {
  phase: Phase;
  seconds: number;
  score: number;
  hits: number;
  played?: boolean;
  cats: Cat[];
  flash: HitFlash | null;
  hitNonces?: number[];
  boardRef: React.RefObject<HTMLDivElement | null>;
  pointerIn: boolean;
  cursor: { x: number; y: number };
  hammerDown: boolean;
  boardShakeTick?: number;
  onHit: (holeIndex: number) => void;
  onSwing?: () => void;
  onPointerMove: (e: React.PointerEvent<HTMLDivElement>) => void;
  onPointerEnter: () => void;
  onPointerLeave: () => void;
}

export const GameBoard = ({
  phase,
  seconds,
  score,
  hits,
  played = false,
  cats,
  flash,
  hitNonces = [],
  boardRef,
  pointerIn,
  cursor,
  hammerDown,
  boardShakeTick = 0,
  onHit,
  onSwing,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
}: GameBoardProps) => {
  return (
    <section
      aria-label="Bàn đập mèo chín lỗ"
      className="relative mx-auto w-full max-w-200"
    >
      <motion.div
        className="board-wrap"
        animate={
          boardShakeTick > 0
            ? { x: [0, -2, 2, 0], y: [0, 1, 0] }
            : { x: 0, y: 0 }
        }
        transition={{ duration: 0.16, ease: "easeOut" }}
      >
        <div
          ref={boardRef}
          onPointerDown={(e) => {
            if (phase === "playing" && e.target === e.currentTarget) {
              onSwing?.();
            }
          }}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          className={`relative aspect-[790/760] w-full touch-manipulation select-none ${
            phase === "playing" ? "cursor-none [&_*]:cursor-none" : ""
          }`}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-[8%] -top-[15%] z-30 w-[30%] sm:-left-[12%] sm:w-[36%] drop-shadow-xl"
            animate={{ rotate: [-1.5, 1.5, -1.5] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Image
              src="/whac-a-mole/night-nail-logo.png"
              alt="Night Nail Logo"
              width={1254}
              height={1254}
              priority
              className="h-auto w-full object-contain"
            />
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-[10%] top-[22%] z-30 w-[24%] sm:-left-[15%] sm:top-[14%] sm:w-[25%] drop-shadow-xl"
            animate={{ rotate: [-2, 2, -2] }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5,
            }}
          >
            <div className="relative w-full">
              <Image
                src="/whac-a-mole/status-signs-01.png"
                alt="Thời gian 30s"
                width={687}
                height={806}
                priority
                className="h-auto w-full object-contain"
              />
              {phase === "playing" && (
                <span className="absolute bottom-[20%] right-[18%] text-xs sm:text-base md:text-lg font-black text-[#5c3426] tracking-tight bg-[#fff3e8]/95 px-1.5 py-0.5 rounded shadow-xs">
                  {seconds}s
                </span>
              )}
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-[10%] top-[22%] z-0 w-[24%] sm:-right-[10%] sm:-top-[15%] sm:w-[30%] drop-shadow-xl"
            animate={{ rotate: [2, -2, 2] }}
            transition={{
              duration: 4.8,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.2,
            }}
          >
            <div className="relative w-full">
              <Image
                src="/whac-a-mole/status-signs-02.png"
                alt="Sự kiện Night Nail"
                width={684}
                height={815}
                priority
                className="h-auto w-full object-contain"
              />
              <span className="absolute bottom-[20%] right-[16%] text-[10px] sm:text-xs font-black text-[#8a4b3d] bg-[#fff3e8]/95 px-1.5 py-0.5 rounded shadow-xs">
                EVENT
              </span>
            </div>
          </motion.div>

          <Image
            src="/whac-a-mole/game-board-empty.png"
            alt="Bàn game chín lỗ hoàn toàn trống, trang trí nơ hồng và viền champagne"
            fill
            priority
            draggable={false}
            sizes="(max-width:1024px) 100vw, 55vw"
            className="pointer-events-none object-contain drop-shadow-[0_22px_22px_rgba(136,90,63,.15)]"
          />

          {HOLES.map((p, index) => {
            const cat = cats.find((c) => c.id === index);
            return (
              <button
                type="button"
                key={index}
                disabled={phase !== "playing"}
                onClick={(e) => {
                  e.stopPropagation();
                  onHit(index);
                }}
                aria-label={`Lỗ số ${index + 1}${
                  cat
                    ? `: ${CAT_NAMES[cat.level]}, ${cat.level} điểm`
                    : ": trống"
                }`}
                className="hole-hit group"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
              >
                <AnimatePresence mode="popLayout">
                  {cat && (
                    <CatActor
                      key={cat.nonce}
                      level={cat.level}
                      nonce={cat.nonce}
                      isHit={hitNonces.includes(cat.nonce)}
                    />
                  )}
                </AnimatePresence>
              </button>
            );
          })}

          <AnimatePresence>
            {flash && (
              <ImpactFX
                key={flash.nonce}
                left={`${HOLES[flash.hole].x}%`}
                top={`${HOLES[flash.hole].y}%`}
                points={flash.level}
              />
            )}
          </AnimatePresence>

          <HammerCursor
            visible={phase === "playing"}
            idleVisible={phase !== "playing"}
            smashing={hammerDown}
            x={cursor.x}
            y={cursor.y}
            src="/whac-a-mole/hammer.png"
          />
        </div>
      </motion.div>

      <div className="mx-auto mt-2 flex w-fit flex-wrap items-center justify-center gap-x-4 gap-y-1 rounded-full border border-[#f1cfb9] bg-[#fffaf4]/90 px-4 py-1.5 text-xs sm:text-sm font-bold text-[#92624c] shadow-md backdrop-blur-sm">
        <span className="flex items-center gap-1.5">
          <Clock3 size={15} /> {seconds}s
        </span>
        <span className="flex items-center gap-1.5">
          <Trophy size={15} /> {score} điểm
        </span>
        <span>🐾 {hits} lượt trúng</span>
      </div>
    </section>
  );
};
