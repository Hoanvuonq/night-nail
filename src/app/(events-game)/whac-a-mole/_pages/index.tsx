"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Cat, HitFlash, Phase } from "../_components";
import { GameBoard, RewardCard } from "../_components";

const DURATION = 30;
const DEMO_PRIZES = [
  "Voucher giảm 5%",
  "Voucher giảm 7%",
  "Giảm 10K",
  "Tặng sticker nail",
];
const today = () => new Date().toLocaleDateString("en-CA");
const pickLevel = (): Cat["level"] => {
  const n = Math.random();
  return n < 0.48 ? 1 : n < 0.77 ? 2 : n < 0.94 ? 3 : 4;
};

const ALL_9_HOLES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
const createAllCats = (nonceStart = 0): Cat[] =>
  ALL_9_HOLES.map((id) => ({
    id,
    level: ((id % 4) + 1) as 1 | 2 | 3 | 4,
    nonce: nonceStart + id + 1,
  }));

export const WhacAMoleScreen = () => {
  const [phase, setPhase] = useState<Phase>("ready");
  const [seconds, setSeconds] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [hits, setHits] = useState(0);
  const [cats, setCats] = useState<Cat[]>(() => [
    { id: 1, level: 2, nonce: 1 },
    { id: 4, level: 1, nonce: 2 },
    { id: 7, level: 4, nonce: 3 },
  ]);
  const [flash, setFlash] = useState<HitFlash | null>(null);
  const [hitNonces, setHitNonces] = useState<number[]>([]);
  const [hammerDown, setHammerDown] = useState(false);
  const [cursor, setCursor] = useState({ x: 50, y: 70 });
  const [pointerIn, setPointerIn] = useState(false);
  const [sound, setSound] = useState(false);
  const [played, setPlayed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [prize, setPrize] = useState("");
  const [session, setSession] = useState(0);
  const [boardShakeTick, setBoardShakeTick] = useState(0);
  const phaseRef = useRef<Phase>("ready");
  const catsRef = useRef<Cat[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const hitGuard = useRef<Set<number>>(new Set());
  const audioRef = useRef<AudioContext | null>(null);
  const hammerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scoreRef = useRef(0);
  const nonceRef = useRef(10);

  useEffect(() => {
    catsRef.current = cats;
  }, [cats]);
  useEffect(
    () => () => {
      if (hammerTimer.current) clearTimeout(hammerTimer.current);
      audioRef.current?.close();
    },
    [],
  );

  useEffect(() => {
    if (phase !== "playing") return;
    const handleGlobalPointerMove = (e: PointerEvent) => {
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      setCursor({ x, y });
      setPointerIn(true);
    };
    window.addEventListener("pointermove", handleGlobalPointerMove);
    return () =>
      window.removeEventListener("pointermove", handleGlobalPointerMove);
  }, [phase]);

  const makeSound = useCallback(() => {
    if (!sound) return;
    try {
      const ctx = audioRef.current ?? new AudioContext();
      audioRef.current = ctx;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(680, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(280, ctx.currentTime + 0.12);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.13);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.14);
    } catch {}
  }, [sound]);

  const endGame = useCallback(() => {
    if (phaseRef.current !== "playing") return;
    phaseRef.current = "finished";
    setPhase("finished");
    setCats([]);
    catsRef.current = [];
    setPrize(DEMO_PRIZES[Math.floor(Math.random() * DEMO_PRIZES.length)]);
    setShowResult(true);
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;
    const ticker = window.setInterval(
      () =>
        setSeconds((old) => {
          if (old <= 1) {
            window.clearInterval(ticker);
            queueMicrotask(endGame);
            return 0;
          }
          return old - 1;
        }),
      1000,
    );
    return () => window.clearInterval(ticker);
  }, [phase, endGame]);

  useEffect(() => {
    if (phase !== "playing") return;
    const spawn = () => {
      const left = Math.floor(Math.random() * 9);
      let right = Math.floor(Math.random() * 8);
      if (right >= left) right += 1;
      hitGuard.current.clear();
      setHitNonces([]);
      const batch = [left, right].map((id) => ({
        id,
        level: pickLevel(),
        nonce: ++nonceRef.current,
      }));
      catsRef.current = batch;
      setCats(batch);
    };
    spawn();
    const timer = window.setInterval(spawn, 1150);
    return () => window.clearInterval(timer);
  }, [phase, session]);

  function start() {
    if (phaseRef.current === "playing") return;
    phaseRef.current = "playing";
    setPhase("playing");
    setPointerIn(true);
    setCursor({ x: 50, y: 70 });
    scoreRef.current = 0;
    setScore(0);
    setHits(0);
    setSeconds(DURATION);
    setPrize("");
    setShowResult(false);
    setFlash(null);
    setHitNonces([]);
    setCats([]);
    hitGuard.current.clear();
    setSession((v) => v + 1);
  }
  function swing() {
    setHammerDown(false);
    requestAnimationFrame(() => setHammerDown(true));
    if (hammerTimer.current) clearTimeout(hammerTimer.current);
    hammerTimer.current = setTimeout(() => setHammerDown(false), 230);
  }
  function hit(hole: number) {
    if (phaseRef.current !== "playing") return;
    swing();
    const cat = catsRef.current.find((c) => c.id === hole);
    if (!cat || hitGuard.current.has(cat.nonce)) return;
    hitGuard.current.add(cat.nonce);
    // Keep cat visible for hit animation, prevent repeated scoring.
    catsRef.current = catsRef.current.filter((c) => c.nonce !== cat.nonce);
    setHitNonces((old) => [...old, cat.nonce]);
    window.setTimeout(
      () => setCats((old) => old.filter((c) => c.nonce !== cat.nonce)),
      430,
    );
    scoreRef.current += cat.level;
    setScore(scoreRef.current);
    setHits((v) => v + 1);
    setFlash({ hole, level: cat.level, nonce: cat.nonce });
    setBoardShakeTick((v) => v + 1);
    window.setTimeout(
      () => setFlash((v) => (v?.nonce === cat.nonce ? null : v)),
      560,
    );
    makeSound();
  }
  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const rect = boardRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }

  return (
    <main className="scene h-screen max-h-screen overflow-hidden flex flex-col justify-center select-none">
      <div className="scene-wash" aria-hidden />

      {/* Nút bật/tắt âm thanh góc phải màn hình */}
      <button
        type="button"
        onClick={() => setSound((v) => !v)}
        aria-label={sound ? "Tắt âm thanh" : "Bật âm thanh"}
        className="fixed top-3 right-4 z-40 rounded-full border border-white/90 bg-white/75 p-2.5 text-[#9d6e5d] shadow-md backdrop-blur-md transition-colors hover:bg-white"
      >
        {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      <div className="relative z-10 mx-auto w-full max-w-[1550px] px-4 py-2 sm:px-6 lg:px-8">
        <div className="grid items-center gap-5 lg:grid-cols-[1.18fr_.82fr] xl:gap-9">
          <GameBoard
            phase={phase}
            seconds={seconds}
            score={score}
            hits={hits}
            played={played}
            cats={cats}
            flash={flash}
            hitNonces={hitNonces}
            boardRef={boardRef}
            pointerIn={pointerIn}
            cursor={cursor}
            hammerDown={hammerDown}
            boardShakeTick={boardShakeTick}
            onHit={hit}
            onSwing={swing}
            onPointerMove={onPointerMove}
            onPointerEnter={() => setPointerIn(true)}
            onPointerLeave={() => setPointerIn(false)}
          />
          <section className="mx-auto w-full max-w-[480px]">
            <div className="text-center">
              <h1 className="headline great-vibes-regular text-4xl sm:text-5xl leading-tight text-[#9b6049]">
                Đập Mèo Nhận Quà ♡
              </h1>
              <div className="mt-1.5 inline-block rounded-full bg-linear-to-r from-[#e6b7a4] via-[#e9a89f] to-[#d89f87] px-3.5 py-1 text-xs font-bold text-white shadow-xs">
                ✦ HAI MÈO XUẤT HIỆN · SĂN QUÀ MAY MẮN ✦
              </div>
              <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-[#895d50]">
                Trong 30 giây, mỗi lần sẽ xuất hiện <strong>2 bé mèo</strong>.
                Đập càng nhiều mèo cấp cao, điểm càng lớn!
              </p>
            </div>
            <RewardCard />
            <motion.button
              type="button"
              onClick={start}
              disabled={phase === "playing"}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              className="play-button mt-3 sm:mt-3.5 w-full rounded-full px-5 py-3 sm:py-3.5 text-lg sm:text-xl font-black tracking-wide text-white disabled:opacity-75 shadow-md"
            >
              🐾 {phase === "playing" ? "ĐANG CHƠI..." : "BẮT ĐẦU CHƠI"} ❯
            </motion.button>
            <p className="mt-1.5 text-center text-[11px] sm:text-xs font-medium text-[#ae7867]">
              🎀 Chào mừng đến với Event Night Nail · Chúc bạn may mắn 🎀
            </p>
          </section>
        </div>
      </div>
      <AnimatePresence>
        {showResult && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            role="dialog"
            aria-modal="true"
            aria-label="Kết quả mini game"
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#523b32]/50 p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 30, scale: 0.85 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-4xl border-4 border-white bg-linear-to-b from-[#fffaf4] to-[#ffe9e3] p-8 text-center shadow-2xl"
            >
              <button
                aria-label="Đóng"
                onClick={() => setShowResult(false)}
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-[#925b4c]"
              >
                <X size={20} />
              </button>
              <p className="text-5xl">🎁</p>
              <h2 className="headline mt-3 text-4xl text-[#9a5e48]">
                Chúc mừng!
              </h2>
              <p className="mt-4 text-[#946656]">
                Bạn đã đạt {score} điểm với {hits} lần đập trúng!
              </p>
              {prize && (
                <div className="mt-4 rounded-2xl border-2 border-dashed border-[#ecc2ad] bg-white/70 p-5 text-xl font-extrabold text-[#bc776b]">
                  {prize}
                </div>
              )}
              <p className="mt-4 text-xs leading-6 text-[#9a766c]">
                Chúc mừng bạn đã nhận được phần quà may mắn từ Night Nail!
              </p>
              <div className="mt-5 flex flex-col gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setShowResult(false);
                    start();
                  }}
                  className="play-button w-full rounded-full py-3.5 text-lg font-bold text-white shadow-md transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  CHƠI LẠI NGAY 🐾
                </button>
                <button
                  type="button"
                  onClick={() => setShowResult(false)}
                  className="w-full rounded-full border border-[#eed3bd] bg-white/70 py-2.5 text-sm font-semibold text-[#925b4c] hover:bg-white transition-colors"
                >
                  ĐÓNG ♡
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};
