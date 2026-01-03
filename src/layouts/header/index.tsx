"use client";
import { Button } from "@/components/button";
import { navItems } from "@/contants/menu";
import { motion } from "framer-motion";
import { Menu, X } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MenuComponent } from "@/components/menu";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 md:p-6 pointer-events-none">
      <motion.div
        initial={false}
        animate={{
          width: scrolled ? "90%" : "100%",
          maxWidth: scrolled ? "1000px" : "1280px",
          backgroundColor: scrolled ? "rgba(255, 255, 255, 0.7)" : "rgba(255, 255, 255, 0.1)",
          backdropFilter: scrolled ? "blur(15px)" : "blur(0px)",
          y: scrolled ? 10 : 0,
          border: scrolled ? "1px solid rgba(245, 158, 11, 0.2)" : "1px solid transparent",
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center justify-between px-6 py-2 rounded-full pointer-events-auto shadow-2xl shadow-black/3"
      >
        <Link href="/">
          <motion.div whileHover={{ scale: 1.05 }} className="relative w-24 h-12 md:w-32 md:h-16">
            <Image src="/images/logo/logo.png" alt="Logo" fill className="object-contain" />
          </motion.div>
        </Link>

        <nav className="hidden lg:flex items-center gap-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="group relative px-4 py-2">
              <span className="relative z-10 text-xs font-black uppercase tracking-[0.2em] text-amber-900/80 group-hover:text-amber-600 transition-colors">
                {item.name}
              </span>
              <motion.div 
                className="absolute inset-0 bg-amber-50 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" 
              />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="hidden md:block">
            <Button label="Booking Now" />
          </div>
          
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-amber-100 text-amber-600 relative z-101"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.div>

      <MenuComponent isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </header>
  );
};