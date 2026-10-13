"use client";

import Image from "next/image";
import { Gift, Sparkles } from "lucide-react";

export interface CatLevelItem {
  level: 1 | 2 | 3 | 4;
  name: string;
  image: string;
}

export interface PrizeItem {
  image?: string;
  title: string;
  desc: string;
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

export const DEFAULT_PRIZES: PrizeItem[] = [
  {
    image: "/whac-a-mole/icon-ticket.png",
    title: "Voucher giảm dịch vụ nail",
    desc: "5% · 7% · 10%",
  },
  {
    image: "/whac-a-mole/icon-coins.png",
    title: "Giảm trực tiếp hóa đơn",
    desc: "10K · 15K · 20K",
  },
  {
    image: "/whac-a-mole/icon-gift.png",
    title: "Charm, sticker & phụ kiện xinh",
    desc: "Quà tặng tại salon",
  },
  {
    image: "/whac-a-mole/icon-gem.png",
    title: "Voucher đặc biệt",
    desc: "Theo điều kiện chương trình",
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
  prizes = DEFAULT_PRIZES,
}: RewardCardProps) => {
  return (
    <div
      className={`reward-card mt-3 rounded-2xl sm:rounded-3xl border border-[#eed3bd] bg-[#fffaf4]/90 p-3.5 sm:p-4 md:p-5 backdrop-blur-md ${className}`}
    >
      <h2 className="flex items-center justify-center gap-1.5 text-base sm:text-lg font-bold font-['Fredoka',sans-serif] text-[#8e523f] tracking-wide">
        <Sparkles size={17} className="text-[#d88775]" /> Phân loại mèo
      </h2>

      <div className="mt-2.5 grid grid-cols-4 gap-1.5 sm:gap-2">
        {cats.map((cat) => (
          <div
            key={cat.level}
            className="rounded-xl border border-[#f5dfcd] bg-white/70 p-1.5 text-center"
          >
            <div className="relative mx-auto aspect-square w-full max-w-14 sm:max-w-16">
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                sizes="70px"
                className="object-contain"
              />
            </div>
            <span
              className={`level-tag-static level-${cat.level} text-[10px] sm:text-xs py-0.5 px-1 font-['Fredoka',sans-serif]`}
            >
              ★ {cat.level} điểm
            </span>
          </div>
        ))}
      </div>

      <h3 className="mt-3 flex items-center gap-1.5 font-bold font-['Fredoka',sans-serif] text-xs sm:text-sm text-[#8e523f] tracking-wide">
        <Gift size={16} className="text-[#d88775]" /> Quà tặng từ Night Nail
      </h3>

      <div className="mt-1 divide-y divide-[#f0dac8]">
        {prizes.map((item) => (
          <div key={item.title} className="flex items-center gap-2.5 py-1.5">
            <div className="relative size-8 shrink-0">
              {item.image && (
                <Image
                  src={
                    item.image.startsWith("/")
                      ? item.image
                      : `/whac-a-mole/${item.image}`
                  }
                  fill
                  alt=""
                  sizes="32px"
                  className="object-contain"
                />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs sm:text-sm font-semibold text-[#895443] truncate">
                {item.title}
              </p>
              <p className="text-[10px] sm:text-xs text-[#bd8877] truncate">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="mt-2 text-center text-[10px] sm:text-xs text-[#ad7566]">
        🌸 Event Night Nail · Chơi thả ga săn quà xinh!
      </p>
    </div>
  );
};
