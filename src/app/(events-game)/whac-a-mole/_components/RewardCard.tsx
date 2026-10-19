"use client";

import Image from "next/image";
import { Gift, Heart, Percent, Sparkles } from "lucide-react";
import { PRIZES, type PrizeItem } from "../../vong-quay/_components/LuckyWheelCanvas";

export { PRIZES, type PrizeItem };

export interface CatLevelItem {
  level: 1 | 2 | 3 | 4;
  name: string;
  image: string;
}

export const CAT_LEVEL_LIST: CatLevelItem[] = [
  {
    level: 1,
    name: "Mèo bông",
    image: "/whac-a-mole/icon-cat-01point.png",
  },
  {
    level: 2,
    name: "Mèo nơ",
    image: "/whac-a-mole/icon-cat-02point.png",
  },
  {
    level: 3,
    name: "Mèo quý tộc",
    image: "/whac-a-mole/icon-cat-03point.png",
  },
  {
    level: 4,
    name: "Mèo kim cương",
    image: "/whac-a-mole/icon-cat-04point.png",
  },
];

interface RewardCardProps {
  className?: string;
  cats?: CatLevelItem[];
  prizes?: PrizeItem[];
}

export const RewardCard = ({
  className = "",
  cats = CAT_LEVEL_LIST,
  prizes = PRIZES,
}: RewardCardProps) => {
  return (
    <div
      className={`reward-card mt-2 xl:mt-3 rounded-2xl sm:rounded-3xl border border-[#eed3bd] bg-[#fffaf4]/90 p-3 sm:p-4 xl:p-5 backdrop-blur-md ${className}`}
    >
      <h2 className="flex items-center justify-center gap-1.5 text-sm sm:text-base xl:text-lg font-bold font-['Fredoka',sans-serif] text-[#8e523f] tracking-wide">
        <Sparkles size={16} className="text-[#d88775]" /> Phân loại mèo
      </h2>

      <div className="mt-2 grid grid-cols-4 gap-1 sm:gap-2">
        {cats.map((cat) => (
          <div
            key={cat.level}
            className="rounded-xl border border-[#f5dfcd] bg-white/70 p-1 sm:p-1.5 text-center"
          >
            <div className="relative mx-auto aspect-square w-full max-w-11 sm:max-w-14 xl:max-w-16">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="70px"
                className="object-contain"
              />
            </div>
            <span
              className={`level-tag-static level-${cat.level} text-[9px] sm:text-[10px] xl:text-xs py-0.5 px-1 font-['Fredoka',sans-serif]`}
            >
              ★ {cat.level} điểm
            </span>
          </div>
        ))}
      </div>

      <h3 className="mt-2.5 xl:mt-3 flex items-center justify-between font-bold font-['Fredoka',sans-serif] text-xs sm:text-sm text-[#8e523f] tracking-wide">
        <span className="flex items-center gap-1.5">
          <Gift size={15} className="text-[#d88775]" /> Quà tặng từ Night Nail
        </span>
        <span className="text-[10px] sm:text-[11px] font-bold text-[#b66c50] bg-[#fff0f3] px-2 py-0.5 rounded-full border border-[#fedbe5]">
          {prizes.length} giải thưởng
        </span>
      </h3>

      <div className="mt-1.5 grid grid-cols-2 gap-1 sm:gap-1.5">
        {prizes.map((item) => (
          <div
            key={item.id}
            className="flex items-center gap-1.5 rounded-xl border border-[#f5dfcd] bg-white/75 p-1.5 shadow-2xs hover:bg-white transition-colors"
          >
            <div className="flex items-center justify-center size-6 sm:size-6.5 rounded-lg bg-[#fff0f3] text-[#d94876] shrink-0 border border-[#fedbe5]">
              {item.iconType === "percent" && (
                <Percent size={12} className="text-[#e85d88]" />
              )}
              {item.iconType === "gift" && (
                <Gift size={12} className="text-[#e85d88]" />
              )}
              {item.iconType === "nail" && (
                <Sparkles size={12} className="text-[#e85d88]" />
              )}
              {item.iconType === "heart" && (
                <Heart size={12} className="text-[#e85d88] fill-[#ffd1dc]" />
              )}
            </div>
            <div className="min-w-0 flex-1 leading-tight">
              <p className="text-[11px] sm:text-xs font-bold text-[#895443] truncate">
                {item.title}
              </p>
              <p className="text-[9px] sm:text-[10px] text-[#bd8877] truncate">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-center text-[10px] xl:text-xs text-[#ad7566]">
        🌸 Event Night Nail · Chơi thả ga săn quà xinh!
      </p>
    </div>
  );
};
