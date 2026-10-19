"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Volume2, VolumeX, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import type { Cat, HitFlash, Phase } from "../_components";
import { GameBoard, HOLES, RewardCard } from "../_components";
import { PRIZES, type PrizeItem } from "../../vong-quay/_components/LuckyWheelCanvas";

const DURATION = 15;
const today = () => new Date().toLocaleDateString("en-CA");
const pickLevel = (): Cat["level"] => {
  const n = Math.random();
  return n < 0.28 ? 1 : n < 0.6 ? 2 : n < 0.85 ? 3 : 4;
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
  const [cats, setCats] = useState<Cat[]>([]);
  const [flash, setFlash] = useState<HitFlash | null>(null);
  const [hitNonces, setHitNonces] = useState<number[]>([]);
  const [hammerDown, setHammerDown] = useState(false);
  const [swingTick, setSmashTick] = useState(0);
  const [cursor, setCursor] = useState({ x: 50, y: 70 });
  const [pointerIn, setPointerIn] = useState(false);
  const [sound, setSound] = useState(false);
  const [played, setPlayed] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [prize, setPrize] = useState("");
  const [wonPrize, setWonPrize] = useState<PrizeItem | null>(null);
  const [session, setSession] = useState(0);
  const [boardShakeTick, setBoardShakeTick] = useState(0);
  const [countdownText, setCountdownText] = useState<string | null>(null);
  const [showRewardsDrawer, setShowRewardsDrawer] = useState(false);
  const phaseRef = useRef<Phase>("ready");
  const catsRef = useRef<Cat[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);
  const hitGuard = useRef<Set<number>>(new Set());
  const audioRef = useRef<AudioContext | null>(null);
  const hammerTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const countdownTimers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const scoreRef = useRef(0);
  const hitsRef = useRef(0);
  const nonceRef = useRef(10);
  const lastHitTime = useRef(0);

  useEffect(() => {
    catsRef.current = cats;
  }, [cats]);
  useEffect(
    () => () => {
      if (hammerTimer.current) clearTimeout(hammerTimer.current);
      countdownTimers.current.forEach(clearTimeout);
      audioRef.current?.close();
    },
    [],
  );

  // Theo dõi cử chỉ di chuyển và chạm cảm ứng trên iPhone, iPad & PC
  useEffect(() => {
    if (phase !== "playing" && phase !== "countdown") return;

    const updateCursorFromCoords = (clientX: number, clientY: number) => {
      const rect = boardRef.current?.getBoundingClientRect();
      if (!rect) return;
      const x = Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
      const y = Math.max(2, Math.min(98, ((clientY - rect.top) / rect.height) * 100));
      setCursor({ x, y });
      setPointerIn(true);
    };

    const handlePointerMove = (e: PointerEvent) => {
      updateCursorFromCoords(e.clientX, e.clientY);
    };

    const handlePointerDown = (e: PointerEvent) => {
      updateCursorFromCoords(e.clientX, e.clientY);
    };

    window.addEventListener("pointermove", handlePointerMove, { capture: true, passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { capture: true, passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove, { capture: true });
      window.removeEventListener("pointerdown", handlePointerDown, { capture: true });
    };
  }, [phase]);

  // Ngăn chạm vuốt trên bàn cờ làm cuộn trang trên iOS/iPad Safari, đồng thời di chuyển búa theo ngón tay mượt mà
  useEffect(() => {
    if (phase !== "playing") return;
    const boardEl = boardRef.current;
    if (!boardEl) return;

    const handleTouchMove = (e: TouchEvent) => {
      if (e.cancelable) {
        e.preventDefault();
      }
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = boardEl.getBoundingClientRect();
        const x = Math.max(2, Math.min(98, ((touch.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(2, Math.min(98, ((touch.clientY - rect.top) / rect.height) * 100));
        setCursor({ x, y });
        setPointerIn(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = boardEl.getBoundingClientRect();
        const x = Math.max(2, Math.min(98, ((touch.clientX - rect.left) / rect.width) * 100));
        const y = Math.max(2, Math.min(98, ((touch.clientY - rect.top) / rect.height) * 100));
        setCursor({ x, y });
        setPointerIn(true);
      }
    };

    boardEl.addEventListener("touchmove", handleTouchMove, { passive: false });
    boardEl.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      boardEl.removeEventListener("touchmove", handleTouchMove);
      boardEl.removeEventListener("touchstart", handleTouchStart);
    };
  }, [phase]);

  const playBeepSound = useCallback(
    (freq: number, isFinal = false) => {
      if (!sound) return;
      try {
        const ctx = audioRef.current ?? new AudioContext();
        audioRef.current = ctx;
        if (ctx.state === "suspended") {
          ctx.resume().catch(() => {});
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.18, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(
          0.001,
          ctx.currentTime + (isFinal ? 0.38 : 0.2),
        );
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (isFinal ? 0.4 : 0.22));
      } catch {}
    },
    [sound],
  );

  const makeSound = useCallback(() => {
    if (!sound) return;
    try {
      const ctx = audioRef.current ?? new AudioContext();
      audioRef.current = ctx;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
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

    // Luôn đảm bảo 100% có quà theo danh sách 10 PRIZES bên game vòng quay
    const finalHits = hitsRef.current;
    let pool = PRIZES;
    if (finalHits >= 10) {
      // Đập tốt (>= 10 hits): cơ hội cao nhận các quà giá trị cao như Giảm 10%, Giảm 20K, Giảm 15K, Tặng 1 charm lớn
      pool = PRIZES.filter((p) => [1, 2, 5, 6, 8].includes(p.id));
    } else if (finalHits >= 5) {
      // Điểm khá (5-9 hits): nhóm quà vừa như Giảm 7%, Giảm 10K, Giảm 15K, Tặng 2 sticker, Tặng 2 charm bé
      pool = PRIZES.filter((p) => [2, 3, 4, 5, 7, 9].includes(p.id));
    } else {
      // Auto chơi / ít hits (0-4 hits): các quà vui vẻ như Giảm 5%, Giảm 10K, Tặng 2 sticker, Tặng 5% cho lần sau
      pool = PRIZES.filter((p) => [3, 4, 7, 9, 10].includes(p.id));
    }

    const chosen = pool[Math.floor(Math.random() * pool.length)] || PRIZES[0];
    setWonPrize(chosen);
    setPrize(`${chosen.title} (${chosen.subtitle})`);
    setShowResult(true);
  }, []);

  // Đếm ngược 15s khi đang chơi
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

  // Màn hình mặc định (ready): random mèo ngoi lên lặn xuống nhẹ nhàng cho đỡ chán
  useEffect(() => {
    if (phase !== "ready") return;
    const idleSpawn = () => {
      const count = Math.random() < 0.5 ? 1 : 2;
      const shuffled = [...ALL_9_HOLES].sort(() => Math.random() - 0.5);
      const chosen = shuffled.slice(0, count);
      setCats(
        chosen.map((id) => ({
          id,
          level: pickLevel(),
          nonce: ++nonceRef.current,
        })),
      );
    };
    idleSpawn();
    const timer = window.setInterval(idleSpawn, 2400);
    return () => window.clearInterval(timer);
  }, [phase]);

  // Khi đang chơi: spawn mèo đập tính điểm
  useEffect(() => {
    if (phase !== "playing") return;
    const spawn = () => {
      // 40% khả năng xuất hiện 3 bé mèo, 60% xuất hiện 2 bé mèo để dễ đập và nhiều mục tiêu
      const count = Math.random() < 0.4 ? 3 : 2;
      const shuffled = [...ALL_9_HOLES].sort(() => Math.random() - 0.5);
      const chosen = shuffled.slice(0, count);

      hitGuard.current.clear();
      setHitNonces([]);
      const batch = chosen.map((id) => ({
        id,
        level: pickLevel(),
        nonce: ++nonceRef.current,
      }));
      catsRef.current = batch;
      setCats(batch);
    };
    spawn();
    // 1500ms xuất hiện đợt mèo mới, phù hợp với game 15s để người chơi dễ quan sát và đập trúng
    const timer = window.setInterval(spawn, 1500);
    return () => window.clearInterval(timer);
  }, [phase, session]);

  function start() {
    if (phaseRef.current === "playing" || phaseRef.current === "countdown")
      return;
    phaseRef.current = "countdown";
    setPhase("countdown");
    setPointerIn(true);
    setCursor({ x: 50, y: 70 });
    scoreRef.current = 0;
    hitsRef.current = 0;
    setScore(0);
    setHits(0);
    setSeconds(DURATION);
    setPrize("");
    setWonPrize(null);
    setShowResult(false);
    setFlash(null);
    setHitNonces([]);
    setCats([]);
    catsRef.current = [];
    hitGuard.current.clear();

    countdownTimers.current.forEach(clearTimeout);
    countdownTimers.current = [];

    // Bắt đầu đếm ngược 3 - 2 - 1 - BẮT ĐẦU!
    setCountdownText("3");
    playBeepSound(460);

    const t1 = setTimeout(() => {
      setCountdownText("2");
      playBeepSound(540);
    }, 850);

    const t2 = setTimeout(() => {
      setCountdownText("1");
      playBeepSound(620);
    }, 1700);

    const t3 = setTimeout(() => {
      setCountdownText("BẮT ĐẦU!");
      playBeepSound(880, true);
    }, 2550);

    const t4 = setTimeout(() => {
      setCountdownText(null);
      phaseRef.current = "playing";
      setPhase("playing");
      setSession((v) => v + 1);
    }, 3350);

    countdownTimers.current = [t1, t2, t3, t4];
  }
  function swing() {
    setSmashTick((v) => v + 1);
    setHammerDown(false);
    requestAnimationFrame(() => setHammerDown(true));
    if (hammerTimer.current) clearTimeout(hammerTimer.current);
    hammerTimer.current = setTimeout(() => setHammerDown(false), 220);
  }
  function hit(hole: number, clickPos?: { x: number; y: number }) {
    if (phaseRef.current !== "playing") return;

    // Luôn cập nhật vị trí búa đến ngay điểm vừa click/chạm trên iPhone, iPad & PC
    if (clickPos) {
      setCursor(clickPos);
      setPointerIn(true);
    } else if (hole >= 0 && HOLES[hole]) {
      setCursor({ x: HOLES[hole].x, y: HOLES[hole].y });
      setPointerIn(true);
    }

    swing();

    const now = Date.now();
    if (now - lastHitTime.current < 90) return;

    let targetCat =
      hole >= 0 ? catsRef.current.find((c) => c.id === hole) : undefined;

    if (!targetCat && clickPos) {
      let closestDist = Infinity;
      catsRef.current.forEach((c) => {
        const hPos = HOLES[c.id];
        const dist = Math.hypot(clickPos.x - hPos.x, clickPos.y - (hPos.y - 3));
        if (dist < 15 && dist < closestDist) {
          closestDist = dist;
          targetCat = c;
        }
      });
    }

    if (!targetCat || hitGuard.current.has(targetCat.nonce)) return;

    // Ghi nhận thời gian trúng để chặn triệt để đập 1 trúng 2 con
    lastHitTime.current = now;
    const cat = targetCat;
    const hitHole = cat.id;

    hitGuard.current.add(cat.nonce);
    catsRef.current = catsRef.current.filter((c) => c.nonce !== cat.nonce);
    setHitNonces((old) => [...old, cat.nonce]);
    window.setTimeout(
      () => setCats((old) => old.filter((c) => c.nonce !== cat.nonce)),
      430,
    );
    scoreRef.current += cat.level;
    hitsRef.current += 1;
    setScore(scoreRef.current);
    setHits(hitsRef.current);
    setFlash({ hole: hitHole, level: cat.level, nonce: cat.nonce });
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
      x: Math.max(2, Math.min(98, ((e.clientX - rect.left) / rect.width) * 100)),
      y: Math.max(2, Math.min(98, ((e.clientY - rect.top) / rect.height) * 100)),
    });
  }

  return (
    <main className="scene min-h-[100dvh] h-[100dvh] overflow-x-hidden overflow-y-auto lg:overflow-hidden flex flex-col justify-center select-none touch-none scrollbar-hide py-2 sm:py-3 lg:py-0">
      <div className="scene-wash" aria-hidden />

      <button
        type="button"
        onClick={() => setSound((v) => !v)}
        aria-label={sound ? "Tắt âm thanh" : "Bật âm thanh"}
        className="fixed top-3 right-3 sm:right-4 z-40 rounded-full border border-white/90 bg-white/75 p-2 sm:p-2.5 text-[#9d6e5d] shadow-md backdrop-blur-md transition-colors hover:bg-white"
      >
        {sound ? <Volume2 size={18} /> : <VolumeX size={18} />}
      </button>

      {phase !== "playing" && phase !== "countdown" && (
        <>
          <button
            type="button"
            onClick={() => setShowRewardsDrawer(true)}
            className="fixed top-3 left-3 sm:left-4 z-40 lg:hidden flex items-center gap-1.5 rounded-full border border-white/90 bg-white/80 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-bold text-[#9d6e5d] shadow-md backdrop-blur-md transition-all hover:bg-white active:scale-95"
          >
            <span>🎁</span>
            <span>Quà tặng</span>
          </button>

          <button
            type="button"
            onClick={() => setShowRewardsDrawer(true)}
            aria-label="Xem quà tặng"
            className="fixed right-0 top-1/2 -translate-y-1/2 z-30 lg:hidden flex flex-col items-center gap-1 rounded-l-2xl border-l-2 border-y-2 border-white/95 bg-[#fff8f2]/95 py-2.5 px-1.5 text-[#9d6e5d] shadow-lg backdrop-blur-md active:scale-95 transition-transform"
          >
            <span className="text-base">🎁</span>
            <span className="text-[10px] font-black tracking-wider [writing-mode:vertical-rl] rotate-180 text-[#9b6049]">
              QUÀ TẶNG
            </span>
          </button>
        </>
      )}

      <div className="relative z-10 mx-auto w-full max-w-360 sm:max-w-380 px-2 sm:px-4 md:px-6 lg:px-8">
        <div className="grid items-center gap-2.5 sm:gap-4 lg:grid-cols-[1.12fr_.88fr] xl:grid-cols-[1.18fr_.82fr] lg:gap-6 xl:gap-9">
          <div className="flex flex-col items-center w-full">
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
              swingTick={swingTick}
              boardShakeTick={boardShakeTick}
              countdownText={countdownText}
              onHit={hit}
              onSwing={swing}
              onPointerMove={onPointerMove}
              onPointerEnter={() => setPointerIn(true)}
              onPointerLeave={() => setPointerIn(false)}
            />
            <div className="mt-1 sm:mt-2 flex flex-col items-center gap-1 sm:gap-1.5 w-full max-w-65 sm:max-w-80 md:max-w-90 lg:hidden">
              <motion.button
                type="button"
                onClick={start}
                disabled={phase === "playing" || phase === "countdown"}
                whileTap={{ scale: 0.96 }}
                whileHover={{ scale: 1.02 }}
                className="play-button w-full rounded-full px-4 py-2 sm:py-2.5 text-base sm:text-lg font-black tracking-wide text-white disabled:opacity-75 shadow-md"
              >
                🐾{" "}
                {phase === "countdown"
                  ? `CHUẨN BỊ... (${countdownText ?? "..."})`
                  : phase === "playing"
                    ? "ĐANG CHƠI..."
                    : "BẮT ĐẦU CHƠI"}{" "}
                ❯
              </motion.button>
              <button
                type="button"
                onClick={() => setShowRewardsDrawer(true)}
                disabled={phase === "playing" || phase === "countdown"}
                className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#a06857] hover:text-[#783e30] py-0.5 active:scale-95 transition-all disabled:opacity-50"
              >
                <span>🎁 Xem quà tặng & phân loại mèo</span>
                <span>❯</span>
              </button>
            </div>
          </div>
          <section className="hidden lg:block mx-auto w-full max-w-115 xl:max-w-125">
            <div className="text-center">
              <h1 className="headline great-vibes-regular text-3xl sm:text-4xl xl:text-5xl leading-tight text-[#9b6049]">
                Đập Mèo Nhận Quà ♡
              </h1>
              <div className="mt-1 inline-block rounded-full bg-linear-to-r from-[#e6b7a4] via-[#e9a89f] to-[#d89f87] px-3 py-0.5 xl:px-3.5 xl:py-1 text-[11px] xl:text-xs font-bold text-white shadow-xs">
                ✦ BÉ MÈO XUẤT HIỆN · AUTO CHƠI LÀ CÓ QUÀ ✦
              </div>
              <p className="mt-1 text-xs xl:text-sm leading-relaxed text-[#895d50]">
                Trong 15 giây, các bé mèo đáng yêu sẽ liên tục xuất hiện. Đập
                càng nhiều mèo cấp cao, điểm càng lớn!
              </p>
            </div>
            <RewardCard />
            <motion.button
              type="button"
              onClick={start}
              disabled={phase === "playing" || phase === "countdown"}
              whileTap={{ scale: 0.96 }}
              whileHover={{ scale: 1.02 }}
              className="play-button mt-2.5 xl:mt-3.5 w-full rounded-full px-5 py-2.5 xl:py-3.5 text-base xl:text-xl font-black tracking-wide text-white disabled:opacity-75 shadow-md"
            >
              🐾{" "}
              {phase === "countdown"
                ? `CHUẨN BỊ... (${countdownText ?? "..."})`
                : phase === "playing"
                  ? "ĐANG CHƠI..."
                  : "BẮT ĐẦU CHƠI"}{" "}
              ❯
            </motion.button>
            <p className="mt-1 text-center text-[10px] xl:text-[11px] font-medium text-[#ae7867]">
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#523b32]/50 p-3 sm:p-4 backdrop-blur-md"
          >
            <motion.div
              initial={{ y: 30, scale: 0.85 }}
              animate={{ y: 0, scale: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-[min(calc(100%-24px),440px)] max-h-[92dvh] overflow-y-auto rounded-3xl sm:rounded-4xl border-3 sm:border-4 border-white bg-linear-to-b from-[#fffaf4] to-[#ffe9e3] p-5 sm:p-7 md:p-8 text-center shadow-2xl scrollbar-hide"
            >
              <button
                aria-label="Đóng"
                onClick={() => {
                  setShowResult(false);
                  phaseRef.current = "ready";
                  setPhase("ready");
                }}
                className="absolute right-4 top-4 rounded-full bg-white p-2 text-[#925b4c]"
              >
                <X size={20} />
              </button>
              <p className="text-5xl">🎁</p>
              <h2 className="headline mt-3 text-4xl text-[#9a5e48]">
                Chúc mừng!
              </h2>
              <div className="mt-2 inline-block rounded-full bg-linear-to-r from-[#ffe9e3] via-[#ffd6cc] to-[#ffded6] px-3.5 py-1 text-xs font-bold text-[#b65844] shadow-xs">
                ✦ AUTO CHƠI LÀ CÓ QUÀ 100% ✦
              </div>
              <p className="mt-3 text-sm text-[#946656]">
                {hits > 0 ? (
                  <>
                    Bạn đã đạt{" "}
                    <b className="text-[#a54c38] text-base">{score}</b> điểm với{" "}
                    <b className="text-[#a54c38] text-base">{hits}</b> lần đập
                    trúng!
                  </>
                ) : (
                  "Bạn đã hoàn thành 15 giây tham gia sự kiện!"
                )}
              </p>
              {wonPrize ? (
                <div className="mt-3.5 sm:mt-4 rounded-2xl border-2 border-dashed border-[#ecc2ad] bg-white/90 p-3.5 sm:p-4 text-center shadow-xs">
                  <span className="text-[11px] font-bold text-[#b87667] uppercase tracking-wider block mb-0.5">
                    Phần quà may mắn của bạn:
                  </span>
                  <div className="text-2xl sm:text-3xl font-black text-[#b75a46] tracking-tight">
                    {wonPrize.title}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-[#8e523f] mt-0.5">
                    {wonPrize.subtitle}
                  </div>
                  <div className="mt-2.5 inline-flex items-center gap-1.5 px-3 py-1 bg-[#fff2ea] rounded-full text-[11px] font-mono text-[#a85844] border border-[#f5d7c5]">
                    <span>MÃ ƯU ĐÃI:</span>
                    <strong className="text-[#8e3f2d]">NIGHTNAILS2026</strong>
                  </div>
                  <p className="mt-2 text-[10px] sm:text-[11px] text-[#9a766c]">
                    Chụp màn hình đưa cho nhân viên salon để áp dụng nhé ♡
                  </p>
                </div>
              ) : prize ? (
                <div className="mt-4 rounded-2xl border-2 border-dashed border-[#ecc2ad] bg-white/80 p-4 text-center shadow-xs">
                  <span className="text-[11px] font-bold text-[#b87667] uppercase tracking-wider block mb-1">
                    Phần quà may mắn của bạn:
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#b75a46]">
                    {prize}
                  </div>
                  <p className="mt-1 text-[11px] text-[#9a766c]">
                    Chụp màn hình đưa cho nhân viên salon để áp dụng nhé ♡
                  </p>
                </div>
              ) : null}
              <p className="mt-3 text-xs leading-5 text-[#9a766c]">
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
                  onClick={() => {
                    setShowResult(false);
                    phaseRef.current = "ready";
                    setPhase("ready");
                  }}
                  className="w-full rounded-full border border-[#eed3bd] bg-white/70 py-2.5 text-sm font-semibold text-[#925b4c] hover:bg-white transition-colors"
                >
                  ĐÓNG ♡
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawer trượt hiển thị thông tin & phần thưởng trên Mobile */}
      <AnimatePresence>
        {showRewardsDrawer && (
          <div className="fixed inset-0 z-50 lg:hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowRewardsDrawer(false)}
              className="absolute inset-0 bg-[#523b32]/50 backdrop-blur-xs"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              drag="x"
              dragConstraints={{ left: 0, right: 300 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x > 80 || info.velocity.x > 300) {
                  setShowRewardsDrawer(false);
                }
              }}
              transition={{ type: "spring", damping: 26, stiffness: 260 }}
              className="relative z-10 h-full w-[88%] max-w-sm bg-linear-to-b from-[#fffaf4] to-[#fdede7] p-4 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-[#eed3bd]">
                  <span className="font-['Fredoka',sans-serif] text-base font-bold text-[#8e523f] flex items-center gap-1.5">
                    🎀 Thông tin sự kiện
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowRewardsDrawer(false)}
                    className="rounded-full bg-white/90 p-1.5 text-[#925b4c] hover:bg-white shadow-xs"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div className="mt-2.5 text-center">
                  <h2 className="headline great-vibes-regular text-3xl text-[#9b6049]">
                    Đập Mèo Nhận Quà ♡
                  </h2>
                  <p className="mt-1 text-xs leading-relaxed text-[#895d50]">
                    Trong 15 giây, các bé mèo đáng yêu sẽ liên tục xuất hiện.
                    Đập càng nhiều mèo cấp cao, điểm càng lớn!
                  </p>
                </div>
                <RewardCard />
              </div>
              <button
                type="button"
                onClick={() => setShowRewardsDrawer(false)}
                className="play-button mt-3 w-full rounded-full py-2.5 text-sm font-bold text-white shadow-xs"
              >
                ĐÃ HIỂU · ĐÓNG ♡
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
};
