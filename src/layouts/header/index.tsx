"use client";
import { Button } from "@/components/button";
import { MenuComponent } from "@/components/menu";
import { navItems } from "@/contants/menu";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          width: scrolled ? "90%" : "100%",
          maxWidth: scrolled ? "1000px" : "1280px",
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.7)"
            : "rgba(255, 255, 255, 0.1)",
          backdropFilter: scrolled ? "blur(15px)" : "blur(0px)",
          y: scrolled ? 10 : 0,
          border: scrolled
            ? "1px solid rgba(233, 178, 184, 0.2)"
            : "1px solid transparent",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between px-6 py-2 rounded-full pointer-events-auto shadow-xl"
      >
        <Link href="/" aria-label="Trang chủ">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="relative w-14 h-14 md:w-20 md:h-20 border-2 border-[#f3d5df] shadow-custom rounded-full"
          >
            <Image
              src="/images/logo/logo1.png"
              alt="Night Nail Logo"
              fill
              className="object-contain rounded-full"
            />
          </motion.div>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className="group relative px-4 py-2"
              >
                <span className={`relative text-title z-10 text-xs font-bold uppercase tracking-[0.2em] transition-colors ${isActive ? 'text-[#d81b60]' : 'text-[#8c5963] group-hover:text-[#d81b60]'}`}>
                  {item.name}
                </span>
                <motion.div className={`absolute inset-0 bg-[#fff5f4] rounded-full transition-transform duration-300 ${isActive ? 'scale-100' : 'scale-0 group-hover:scale-100'}`} />
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block text-title">
            <Link href={"tel:0942153511"}>
              <Button label="Gọi 094 215 3511" />
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Đóng menu" : "Mở menu"}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#fff5f4] text-[#d81b60] relative z-101"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      <MenuComponent isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};
