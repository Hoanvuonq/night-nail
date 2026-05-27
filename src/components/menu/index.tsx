"use client";

import { navItems } from "@/contants/menu";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "../button";

interface IMenu {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuComponent = ({ isOpen, onClose }: IMenu) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const pathname = usePathname();
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      const timer = setTimeout(() => {
        document.body.style.overflow = "unset";
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-100 lg:hidden",
        "transition-opacity duration-500 ease-in-out",
        isOpen
          ? "opacity-100 visible pointer-events-auto"
          : "opacity-0 invisible pointer-events-none"
      )}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-[#f4c7cc]/20 bg-opacity-40 backdrop-blur-sm"
      />
      <div
        className={cn(
          "fixed top-0 bottom-0 right-0 z-50",
          "w-full max-w-[80%] sm:max-w-sm md:max-w-md",
          "bg-[#fff5f4] shadow-2xl border-l border-white/50",
          "transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="text-3xl text-zinc-400 cursor-pointer hover:text-[#ff4d79] transition-colors"
          >
            <X size={32} />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-8 p-8 pt-0">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={`text-2xl text-title underline-slide font-bold tracking-wide capitalize transition duration-300 w-full border-b border-[#f4c7cc]/50 pb-3 ${isActive ? 'text-[#ff4d79]' : 'text-zinc-600 hover:text-[#ff7ba9]'}`}
              >                {item.name}
              </Link>
            );
          })}
          <div onClick={handleOpenModal} className="">
            <Button label="Đặt Lịch Ngay" />
          </div>
        </nav>
      </div>
    </div >
  );
};
