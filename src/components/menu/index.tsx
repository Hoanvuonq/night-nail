"use client";

import { navItems } from "@/contants/menu";
import { cn } from "@/utils/cn";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../button";

interface IMenu {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuComponent = ({ isOpen, onClose }: IMenu) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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
        "fixed inset-0 z-40 lg:hidden",
        "transition-opacity duration-500 ease-in-out",
        isOpen
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      )}
    >
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 bg-opacity-70 backdrop-blur-sm"
      />
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "fixed top-0 bottom-0 right-0 z-50",
          "w-full max-w-[40%] sm:max-w-sm md:max-w-md",
          "bg-[#0a0a0a] text-white shadow-2xl",
          "transform transition-transform duration-500 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex justify-end p-6">
          <button
            onClick={onClose}
            className="text-3xl text-white cursor-pointer hover:text-red-500"
          >
            <X size={32} />
          </button>
        </div>

        <nav className="flex flex-col items-center gap-8 p-8 pt-0">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={onClose}
              className="text-2xl underline-slide font-bold tracking-wide capitalize text-main-color transition duration-300 w-full border-b border-gray-700 pb-2"
            >
              {item.name}
            </Link>
          ))}
          <div onClick={handleOpenModal} className="">
            <Button label="Đặt Lịch Ngay" />
          </div>
        </nav>
      </div>
    </div>
  );
};
