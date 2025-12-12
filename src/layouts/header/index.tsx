"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/cn";
import Button from "@/components/button";
import { navItems } from "@/contants/menu";
import { useState } from "react";
import BookingModal from "@/app/(home)/_components/Booking";
import {MenuComponent} from "@/components/menu";
import { Menu, X } from 'lucide-react'; 




export const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className={cn(
      "flex items-center justify-between px-4 py-4 md:px-8 md:py-6 w-full",
      "sticky top-0 z-30 bg-[#0a0a0a] shadow-sm"
    )}>
      <Link href="/">
        <div className="relative w-[100px] h-[60px] md:w-[140px] md:h-[90px]"> 
          <Image
            src="/images/logo/logo.png"
            alt="Flora Nail Studio logo"
            fill
            sizes="(max-width: 768px) 100px, 140px"
            className="object-contain"
          />
        </div>
      </Link>

      <nav className="hidden lg:flex items-center gap-8">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={cn(
              "text-lg font-bold tracking-wide capitalize",
              "hover:opacity-100 transition duration-300",
              "underline-slide text-main-color"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div onClick={handleOpenModal} className="hidden md:block">
          <Button label="Đặt Lịch Ngay" />
        </div>

        <button 
          onClick={toggleMenu} 
          className="lg:hidden text-main-color"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      <MenuComponent isOpen={isMenuOpen} onClose={toggleMenu} />
      {isModalOpen && (
        <BookingModal serviceTitle={""} onClose={handleCloseModal} />
      )}
    </header>
  );
};