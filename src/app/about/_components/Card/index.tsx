"use client";
import Image from "next/image";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";
import Link from "next/link";

export const PolicyCard = ({ title, text, img, href, className }: any) => {
  return (
    <motion.div
      whileHover={{ y: -15 }} // Hiệu ứng bay bổng khi hover
      className={cn(
        "relative w-[340px] aspect-3/4 overflow-hidden rounded-t-[170px] border-4 border-[#fff0f3] group shadow-[0_20px_50px_rgba(255,123,169,0.1)]",
        className
      )}
    >
      {/* Hình ảnh chính */}
      <Image
        src={img}
        alt={title}
        fill
        className="object-cover transition-transform duration-1000 group-hover:scale-110"
        priority
      />

      {/* Lớp phủ Gradient chuẩn Luxury để làm nổi chữ */}
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent" />

      {/* Nội dung: Hiển thị tiêu đề sẵn, chỉ ẩn text chi tiết */}
      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end min-h-[160px] transition-all duration-500">
        <h3 className="text-2xl font-serif italic text-[#ff7ba9] mb-2 drop-shadow-md">
          {title}
        </h3>

        {/* Phần mô tả: Sẽ trượt nhẹ lên khi hover */}
        <div className="max-h-0 opacity-0 group-hover:max-h-40 group-hover:opacity-100 transition-all duration-500 ease-in-out">
          <p className="text-sm text-white/90 font-light leading-relaxed mb-4 line-clamp-3 italic">
            {text}
          </p>
          <Link
            href={href}
            className="inline-flex items-center text-[10px] font-bold uppercase tracking-[0.2em] text-[#ff7ba9] border-b border-[#ff7ba9]/50 pb-1 hover:border-[#ff7ba9]"
          >
            Tìm hiểu thêm →
          </Link>
        </div>
      </div>

      {/* Trang trí: Một vòng tròn sáng nhỏ ở góc card cho "cute" */}
      <div className="absolute top-6 right-10 w-3 h-3 bg-[#ff7ba9] rounded-full animate-pulse shadow-[0_0_15px_#ff7ba9]" />
    </motion.div>
  );
};