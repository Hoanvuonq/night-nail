"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
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

export type Phase = "ready" | "countdown" | "playing" | "finished";

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
  swingTick?: number;
  boardShakeTick?: number;
  countdownText?: string | null;
  onHit: (holeIndex: number, clickPos?: { x: number; y: number }) => void;
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
  swingTick = 0,
  boardShakeTick = 0,
  countdownText = null,
  onHit,
  onSwing,
  onPointerMove,
  onPointerEnter,
  onPointerLeave,
}: GameBoardProps) => {
  return (
    <section
      aria-label="Bàn đập mèo chín lỗ"
      className="relative mx-auto w-full max-w-[min(calc(100%-28px),450px,54vh)] sm:max-w-[min(calc(100%-36px),480px,56vh)] md:max-w-[min(540px,60vh)] lg:max-w-[min(560px,68vh)] xl:max-w-[min(640px,72vh)]"
    >
      <div className="relative mx-auto mb-1 sm:mb-2 w-full max-w-40 sm:max-w-56 md:max-w-68 lg:max-w-76 select-none drop-shadow-md z-20">
        <Image
          src="/whac-a-mole/final-grading-spreadsheet.png"
          alt="Bảng điểm Night Nail"
          width={2172}
          height={724}
          priority
          className="h-auto w-full object-contain"
        />
        <div
          className="absolute flex items-center justify-center pointer-events-none"
          style={{
            left: "53.5%",
            top: "43%",
            width: "27%",
            height: "27%",
          }}
        >
          <motion.span
            key={score}
            initial={{ scale: 1.25 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="score-number text-xl sm:text-2xl md:text-3xl lg:text-4xl leading-none inline-block text-center"
          >
            {score}
          </motion.span>
        </div>
      </div>

      <motion.div
        className="board-wrap mt-0.5 sm:mt-1.5"
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
            if (phase !== "playing") return;
            onSwing?.();
            const rect = boardRef.current?.getBoundingClientRect();
            if (rect) {
              let cx = e.clientX;
              let cy = e.clientY;
              const anyEvent = e.nativeEvent as unknown as { touches?: TouchList; changedTouches?: TouchList };
              if ((!cx && !cy) && anyEvent.touches?.[0]) {
                cx = anyEvent.touches[0].clientX;
                cy = anyEvent.touches[0].clientY;
              } else if ((!cx && !cy) && anyEvent.changedTouches?.[0]) {
                cx = anyEvent.changedTouches[0].clientX;
                cy = anyEvent.changedTouches[0].clientY;
              }
              const clickX = Math.max(0, Math.min(100, ((cx - rect.left) / rect.width) * 100));
              const clickY = Math.max(0, Math.min(100, ((cy - rect.top) / rect.height) * 100));
              onHit(-1, { x: clickX, y: clickY });
            }
          }}
          onPointerEnter={onPointerEnter}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          className={`relative aspect-[790/760] w-full touch-none select-none ${
            phase === "playing" ? "cursor-none [&_*]:cursor-none" : ""
          }`}
        >
          <motion.div
            aria-hidden
            className="pointer-events-none absolute -left-[7%] -top-[1%] z-30 w-[27%] sm:-left-[10%] sm:-top-[2%] sm:w-[32%] drop-shadow-xl"
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
            className="pointer-events-none absolute -left-[8%] top-[14%] z-20 w-[22%] sm:-left-[12%] sm:top-[28%] sm:w-[24%] drop-shadow-xl"
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
                alt="Thời gian"
                width={687}
                height={806}
                priority
                className="h-auto w-full object-contain"
              />
              <span
                className="timer-number absolute select-none text-right"
                style={{
                  right: "28%",
                  bottom: "16.5%",
                  lineHeight: 1,
                }}
              >
                {seconds}
              </span>
            </div>
          </motion.div>

          <motion.div
            aria-hidden
            className="pointer-events-none absolute -right-[8%] top-[18%] z-0 w-[22%] sm:-right-[9%] sm:-top-[2%] sm:w-[27%] drop-shadow-xl"
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
                onPointerDown={(e) => {
                  e.stopPropagation();
                  const rect = boardRef.current?.getBoundingClientRect();
                  let cx = e.clientX;
                  let cy = e.clientY;
                  const anyEvent = e.nativeEvent as unknown as { touches?: TouchList; changedTouches?: TouchList };
                  if ((!cx && !cy) && anyEvent.touches?.[0]) {
                    cx = anyEvent.touches[0].clientX;
                    cy = anyEvent.touches[0].clientY;
                  } else if ((!cx && !cy) && anyEvent.changedTouches?.[0]) {
                    cx = anyEvent.changedTouches[0].clientX;
                    cy = anyEvent.changedTouches[0].clientY;
                  }
                  const clickPos = rect
                    ? {
                        x: Math.max(0, Math.min(100, ((cx - rect.left) / rect.width) * 100)),
                        y: Math.max(0, Math.min(100, ((cy - rect.top) / rect.height) * 100)),
                      }
                    : { x: p.x, y: p.y };
                  onHit(index, clickPos);
                }}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                aria-label={`Lỗ số ${index + 1}${
                  cat
                    ? `: ${CAT_NAMES[cat.level]}, ${cat.level} điểm`
                    : ": trống"
                }`}
                className="hole-hit group touch-none select-none"
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

          {/* Đếm ngược 3 - 2 - 1 - BẮT ĐẦU */}
          <AnimatePresence>
            {countdownText && (
              <motion.div
                key={countdownText}
                initial={{ scale: 0.25, opacity: 0 }}
                animate={{ scale: [0.35, 1.22, 1], opacity: 1 }}
                exit={{ scale: 1.45, opacity: 0 }}
                transition={{ duration: 0.65, ease: "easeOut" }}
                className="pointer-events-none absolute inset-0 z-40 flex items-center justify-center select-none"
              >
                <div className="flex flex-col items-center justify-center rounded-2xl sm:rounded-3xl border-2 border-white/90 bg-white/85 px-4 py-2.5 sm:px-7 sm:py-4 shadow-2xl backdrop-blur-md">
                  <span className="headline text-5xl sm:text-7xl md:text-8xl font-black tracking-wider text-[#985844] drop-shadow-sm">
                    {countdownText}
                  </span>
                  {countdownText !== "BẮT ĐẦU!" ? (
                    <span className="mt-1 text-[11px] sm:text-xs md:text-sm font-black text-[#bc7d6d] tracking-widest uppercase">
                      Chuẩn bị sẵn sàng...
                    </span>
                  ) : (
                    <span className="mt-1 text-[11px] sm:text-xs md:text-sm font-black text-[#a65d49] tracking-widest uppercase">
                      🐾 ĐẬP THẬT NHIỀU MÈO NÀO!
                    </span>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <HammerCursor
            visible={phase === "playing" || phase === "countdown"}
            idleVisible={phase === "ready" || phase === "finished"}
            smashing={hammerDown}
            swingTick={swingTick}
            x={cursor.x}
            y={cursor.y}
            src="/whac-a-mole/hammer.png"
          />
        </div>
      </motion.div>
    </section>
  );
};
