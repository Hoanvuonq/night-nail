"use client";

import React from "react";
import { motion } from "framer-motion";

export interface PrizeItem {
  id: number;
  title: string;
  subtitle: string;
  iconType: "percent" | "gift" | "nail" | "heart";
  color: string;
}

export const PRIZES: PrizeItem[] = [
  {
    id: 1,
    title: "Giảm 10%",
    subtitle: "Dịch vụ nail",
    iconType: "percent",
    color: "#FFFFFF",
  },
  {
    id: 2,
    title: "Giảm 7%",
    subtitle: "Dịch vụ nail",
    iconType: "percent",
    color: "#FFE8EE",
  },
  {
    id: 3,
    title: "Giảm 5%",
    subtitle: "Dịch vụ nail",
    iconType: "percent",
    color: "#FFFFFF",
  },
  {
    id: 4,
    title: "Giảm 10K",
    subtitle: "Hóa đơn nail",
    iconType: "gift",
    color: "#FFE8EE",
  },
  {
    id: 5,
    title: "Giảm 15K",
    subtitle: "Hóa đơn nail",
    iconType: "gift",
    color: "#FFFFFF",
  },
  {
    id: 6,
    title: "Giảm 20K",
    subtitle: "Hóa đơn nail",
    iconType: "gift",
    color: "#FFE8EE",
  },
  {
    id: 7,
    title: "Tặng 2 sticker",
    subtitle: "Dán móng xinh",
    iconType: "heart",
    color: "#FFFFFF",
  },
  {
    id: 8,
    title: "Tặng 1 charm lớn",
    subtitle: "Phụ kiện nail",
    iconType: "nail",
    color: "#FFE8EE",
  },
  {
    id: 9,
    title: "Tặng 2 charm bé",
    subtitle: "Đổ khuôn xinh",
    iconType: "nail",
    color: "#FFFFFF",
  },
  {
    id: 10,
    title: "Tặng 5%",
    subtitle: "Cho lần sau",
    iconType: "percent",
    color: "#FFE8EE",
  },
];

const SPARKLE_CONFIGS = [
  [
    { x: -25, y: -15, size: 0.8, color: "#FFFFFF", opacity: 0.9 },
    { x: 25, y: -12, size: 0.9, color: "#FEBCC8", opacity: 0.65 },
  ],
  [
    { x: -22, y: -14, size: 0.85, color: "#FFE4EC", opacity: 0.75 },
    { x: 26, y: -16, size: 0.7, color: "#FFFFFF", opacity: 0.9 },
  ],
  [
    { x: -26, y: -14, size: 0.75, color: "#FFFFFF", opacity: 0.85 },
    { x: 22, y: -12, size: 1.0, color: "#FEBCC8", opacity: 0.6 },
  ],
  [
    { x: -20, y: -16, size: 0.9, color: "#FEBCC8", opacity: 0.7 },
    { x: 24, y: -12, size: 0.75, color: "#FFFFFF", opacity: 0.9 },
  ],
  [
    { x: -22, y: -14, size: 0.7, color: "#FFFFFF", opacity: 0.95 },
    { x: 22, y: -15, size: 0.85, color: "#FFE4EC", opacity: 0.75 },
  ],
  [
    { x: -24, y: -12, size: 0.8, color: "#FEBCC8", opacity: 0.6 },
    { x: 24, y: -16, size: 0.75, color: "#FFFFFF", opacity: 0.85 },
  ],
  [
    { x: -20, y: -15, size: 0.8, color: "#FFFFFF", opacity: 0.9 },
    { x: 25, y: -12, size: 0.95, color: "#FEBCC8", opacity: 0.65 },
  ],
  [
    { x: -24, y: -14, size: 0.75, color: "#FFE4EC", opacity: 0.75 },
    { x: 22, y: -16, size: 0.7, color: "#FFFFFF", opacity: 0.9 },
  ],
  [
    { x: -22, y: -12, size: 0.85, color: "#FFFFFF", opacity: 0.85 },
    { x: 24, y: -14, size: 0.9, color: "#FEBCC8", opacity: 0.6 },
  ],
  [
    { x: -20, y: -16, size: 0.8, color: "#FEBCC8", opacity: 0.7 },
    { x: 22, y: -12, size: 0.75, color: "#FFFFFF", opacity: 0.9 },
  ],
];

interface Props {
  rotationAngle: number;
  isSpinning: boolean;
  spinDuration?: number;
  prizes?: PrizeItem[];
  isMysteryMode?: boolean;
  onSpinClick: () => void;
}

export const LuckyWheelCanvas: React.FC<Props> = ({
  rotationAngle,
  isSpinning,
  spinDuration = 2.5,
  prizes = PRIZES,
  isMysteryMode = true,
  onSpinClick,
}) => {
  const numPrizes = prizes.length;
  const sliceAngle = 360 / numPrizes;

  // Draw pie slices inside 400x400 SVG canvas
  const renderSlices = () => {
    return prizes.map((prize, i) => {
      // 12 o'clock is -90 deg. Center slice 0 at -90 deg.
      const midAngle = -90 + i * sliceAngle;
      const startAngle = midAngle - sliceAngle / 2;
      const endAngle = midAngle + sliceAngle / 2;

      const r = 196; // radius to fit inner ring
      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = 200 + r * Math.cos(startRad);
      const y1 = 200 + r * Math.sin(startRad);
      const x2 = 200 + r * Math.cos(endRad);
      const y2 = 200 + r * Math.sin(endRad);

      const pathData = `M 200 200 L ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2} Z`;

      // Text position (moved closer to the outer rim)
      const textR = 138;
      const midRad = (midAngle * Math.PI) / 180;
      const textX = 200 + textR * Math.cos(midRad);
      const textY = 200 + textR * Math.sin(midRad);

      // Clear alternating soft white and soft pastel pink slice backgrounds
      const isEven = i % 2 === 0;
      const fillColor = isEven ? "#FFFFFF" : "#FFF7FA";
      const strokeColor = "#FEDBE5";

      // Covered mystery text & icon or revealed actual prize
      const sliceTitle = isMysteryMode ? `Hộp Quà ${i + 1}` : prize.title;
      const sliceSubtitle = isMysteryMode ? "Quay để mở ✨" : prize.subtitle;

      // Alternating cute mystery icons when covered
      const mysteryIcons = ["gift", "heart", "percent", "nail"];
      const activeIconType = isMysteryMode
        ? mysteryIcons[i % mysteryIcons.length]
        : prize.iconType;

      return (
        <g key={prize.id}>
          {/* Slice Background */}
          <path
            d={pathData}
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.2"
          />

          {/* Slice Content Group (Always 100% Upright & Horizontal regardless of wheel rotation angle) */}
          <g
            transform={`translate(${textX}, ${textY}) rotate(${-rotationAngle})`}
            className="select-none pointer-events-none"
            style={{ fontFamily: "'Quicksand', 'Playpen Sans', sans-serif" }}
          >
            {/* Soft Organic Background Sparkles inside slice */}
            {SPARKLE_CONFIGS[i % SPARKLE_CONFIGS.length].map((sparkle, idx) => (
              <g
                key={idx}
                transform={`translate(${sparkle.x}, ${sparkle.y}) scale(${sparkle.size})`}
              >
                <path
                  d="M0 -6 C0 -1 1 0 6 0 C1 0 0 1 0 6 C0 1 -1 0 -6 0 C-1 0 0 -1 0 -6 Z"
                  fill="#FEDBE5"
                  opacity={0.65}
                />
              </g>
            ))}

            {/* PNG Icons */}
            {activeIconType === "percent" && (
              <image
                href="/images/icon-02.png"
                x="-12"
                y="-29"
                width="24"
                height="19"
                preserveAspectRatio="xMidYMid meet"
              />
            )}

            {activeIconType === "gift" && (
              <image
                href="/images/icon-01.png"
                x="-11"
                y="-29"
                width="22"
                height="20"
                preserveAspectRatio="xMidYMid meet"
              />
            )}

            {activeIconType === "nail" && (
              <image
                href="/images/icon-03.png"
                x="-9"
                y="-30"
                width="18"
                height="22"
                preserveAspectRatio="xMidYMid meet"
              />
            )}

            {activeIconType === "heart" && (
              <image
                href="/images/icon-04.png"
                x="-11"
                y="-29"
                width="22"
                height="20"
                preserveAspectRatio="xMidYMid meet"
              />
            )}

            {/* Title - Soft Romantic Rose Pink */}
            <text
              x="0"
              y="0"
              fill="#D94876"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
              style={{ fontFamily: "'Quicksand', 'Playpen Sans', sans-serif" }}
            >
              {sliceTitle}
            </text>

            {/* Subtitle - Soft Blush Tone */}
            <text
              x="0"
              y="11"
              fill="#E27B9B"
              fontSize="8"
              fontWeight="500"
              textAnchor="middle"
              style={{ fontFamily: "'Quicksand', 'Playpen Sans', sans-serif" }}
            >
              {sliceSubtitle}
            </text>
          </g>
        </g>
      );
    });
  };

  return (
    <div className="relative w-[480px] h-[489px] sm:w-[580px] sm:h-[590px] md:w-[680px] md:h-[692px] lg:w-[760px] lg:h-[773px] flex items-center justify-center select-none">
      {/* Soft Glow aura behind wheel */}
      <div className="absolute inset-6 bg-[#FEBCC8]/30 rounded-full blur-2xl animate-pulse z-0" />

      {/* Main Wheel Frame Background Image (banner2.png) */}
      <img
        src="/images/banner2.png"
        alt="Vòng quay may mắn"
        className="absolute inset-0 w-full h-full object-contain pointer-events-none z-10 drop-shadow-lg"
      />

      {/* Rotating Wheel Slices positioned precisely inside banner2.png's circle frame */}
      <div
        className="absolute z-20 flex items-center justify-center pointer-events-auto"
        style={{
          width: "77%",
          height: "77%",
          top: "50.8%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.div
          animate={{ rotate: rotationAngle }}
          transition={{
            duration: isSpinning ? spinDuration : 0,
            ease: [0.15, 0.99, 0.35, 1.0],
          }}
          className="w-full h-full"
        >
          <svg
            viewBox="0 0 400 400"
            className="w-full h-full drop-shadow-sm rounded-full overflow-hidden"
            fill="none"
          >
            {renderSlices()}
          </svg>
        </motion.div>
      </div>

      {/* Top Pointer Tip */}
      <div
        className="absolute z-25 pointer-events-none flex flex-col items-center justify-center"
        style={{
          top: "14%",
          left: "50%",
          transform: "translate(-50%, 0)",
        }}
      >
        <div
          className="relative w-7 h-7 sm:w-9 sm:h-9 flex items-center justify-center filter drop-shadow-sm"
          style={{
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            background: "linear-gradient(180deg, #FFE4EC 0%, #FFB6C8 100%)",
          }}
        >
          <span className="text-[#E85D88] text-[9px] sm:text-[11px] font-bold mb-1.5 drop-shadow-xs select-none">
            ♥
          </span>
        </div>
      </div>

      {/* Center Custom Pointer Triangle (pointing UP from top of center button) */}
      <div
        className="absolute z-25 pointer-events-none"
        style={{
          top: "42.5%",
          left: "50%",
          transform: "translate(-50%, -100%)",
        }}
      >
        <div
          className="w-5 h-6 sm:w-5.5 sm:h-6.5 filter drop-shadow-xs"
          style={{
            clipPath: "polygon(50% 0, 0 100%, 100% 100%)",
            background: "linear-gradient(0deg, #FFAEC2 0%, #F47FA0 100%)",
          }}
        />
      </div>

      {/* Top Ribbon Bow with Pointer (nơ.png) */}
      <motion.div
        animate={
          isSpinning
            ? { y: [0, -5, 0], scale: [1, 1.05, 1], rotate: [0, -2, 2, 0] }
            : { y: [0, -4, 0] }
        }
        transition={{
          duration: isSpinning ? 0.6 : 2.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-7 sm:-top-0 z-30 w-[42%] sm:w-[26%] pointer-events-none drop-shadow-sm flex justify-center"
      >
        <img
          src={encodeURI("/images/nơ.png")}
          alt="Nơ vòng quay"
          className="w-full h-auto object-contain"
        />
      </motion.div>

      {/* Center Spin Button (Nút QUAY pastel dịu ngọt) */}
      <div
        className="absolute z-30 flex items-center justify-center"
        style={{
          top: "50.8%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <motion.button
          whileHover={{ scale: isSpinning ? 1 : 1.06 }}
          whileTap={{ scale: isSpinning ? 1 : 0.95 }}
          onClick={onSpinClick}
          disabled={isSpinning}
          className={`relative w-18 h-18 sm:w-22 sm:h-22 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-all duration-300 border-[3.5px] border-white ${
            isSpinning
              ? "bg-[#FED5DF] cursor-not-allowed opacity-90"
              : "bg-gradient-to-b from-[#FEDBE5] via-[#FFAEC4] to-[#F2789B] hover:shadow-[#FEBCC8]/70 hover:shadow-xl cursor-pointer"
          }`}
          style={{
            boxShadow:
              "0 0 16px rgba(254, 188, 200, 0.7), inset 0 2px 4px rgba(255,255,255,0.9)",
          }}
        >
          {/* White Paw Print Icon */}
          <img
            src="/images/icon-05.png"
            alt="Spin Paw Icon"
            className="w-5 h-5 object-contain mb-0.5 drop-shadow-xs"
          />

          <span className="text-white font-extrabold text-[11px] sm:text-xs tracking-widest uppercase drop-shadow-xs">
            QUAY
          </span>
        </motion.button>
      </div>
    </div>
  );
};
